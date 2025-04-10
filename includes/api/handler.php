<?php
/**
 * Handles AJAX requests for the Easy AI Chat Embed plugin.
 *
 * @package Easy_AI_Chat_Embed
 * @since 1.0.0
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * AJAX handler for sending messages to the AI.
 *
 * Handles the 'easy_ai_chat_embed_send_message' action.
 *
 * @since 1.0.0
 * @return void
 */
function easy_ai_chat_embed_ajax_send_message() {
	// 1. Verify the nonce with die on failure
	check_ajax_referer( 'easy_ai_chat_embed_nonce', '_ajax_nonce', true );

	// 2. Retrieve saved settings
	$settings = get_option( 'easy_ai_chat_embed_settings', [] );

	// 3. Sanitize incoming data
	$user_message    = isset( $_POST['message'] ) ? sanitize_textarea_field( wp_unslash( $_POST['message'] ) ) : '';
	$selected_model  = isset( $_POST['selectedModel'] ) ? sanitize_text_field( wp_unslash( $_POST['selectedModel'] ) ) : '';
	$initial_prompt  = isset( $_POST['initialPrompt'] ) ? sanitize_textarea_field( wp_unslash( $_POST['initialPrompt'] ) ) : '';
	$instance_id     = isset( $_POST['instanceId'] ) ? sanitize_text_field( wp_unslash( $_POST['instanceId'] ) ) : '';

	// Allow only specific, expected model formats for additional security
	$allowed_model_prefixes = array('gpt-', 'claude-', 'gemini-');
	$is_valid_model = false;
	foreach ($allowed_model_prefixes as $prefix) {
		if (strpos($selected_model, $prefix) === 0) {
			$is_valid_model = true;
			break;
		}
	}

	if (!$is_valid_model && !empty($selected_model)) {
		wp_send_json_error(
			[ 'message' => __( 'Invalid model format specified.', 'easy-ai-chat-embed' ) ],
			400
		);
	}

	// Handle conversation history
	$conversation_history = [];
	if ( isset( $_POST['conversationHistory'] ) ) {
		$conversation_history_raw = wp_unslash( $_POST['conversationHistory'] );
		$conversation_history = json_decode( $conversation_history_raw, true );
		if ( json_last_error() !== JSON_ERROR_NONE || ! is_array( $conversation_history ) ) {
			$conversation_history = []; // Reset if JSON is invalid or not an array
		}
	}

    // Basic sanitization/validation of history structure
    $sanitized_history = [];
    foreach ( $conversation_history as $msg ) {
        if ( isset( $msg['type'], $msg['message'] ) && is_string( $msg['type'] ) && is_string( $msg['message'] ) ) {
            // Map 'bot' type from react-chatbot-kit to 'assistant' for API consistency
            $role = ( $msg['type'] === 'user' ) ? 'user' : 'assistant';
            // Ensure we don't add empty messages potentially left by loading indicators etc.
            $content = trim( sanitize_textarea_field( $msg['message'] ) );
            if ( ! empty( $content ) ) {
                $sanitized_history[] = [
                    'role'    => $role,
                    'content' => $content // Use sanitized content
                ];
            }
        }
    }
    $conversation_history = $sanitized_history;
    // Limit history length if necessary (e.g., last 10 messages = 5 pairs)
    $conversation_history = array_slice( $conversation_history, -10 );

	if ( empty( $user_message ) || empty( $selected_model ) || empty( $instance_id ) ) {
		wp_send_json_error( 
			[ 'message' => __( 'Missing required data (message, model, or instance ID).', 'easy-ai-chat-embed' ) ], 
			400 
		);
	}

	// 4. Get the appropriate API key
	$api_key = '';
	if ( strpos( $selected_model, 'gpt-' ) === 0 && ! empty( $settings['openai_api_key'] ) ) {
		$api_key = $settings['openai_api_key'];
	} elseif ( strpos( $selected_model, 'claude-' ) === 0 && ! empty( $settings['anthropic_api_key'] ) ) {
		$api_key = $settings['anthropic_api_key'];
	} elseif ( strpos( $selected_model, 'gemini-' ) === 0 && ! empty( $settings['google_api_key'] ) ) {
		$api_key = $settings['google_api_key'];
	}

	// 5. Check if API key exists
	if ( empty( $api_key ) ) {
		wp_send_json_error( 
			[ 
				'message' => sprintf(
					/* translators: %s: The name of the selected AI model. */
					__( 'API key for the selected model (%s) is missing or not configured in settings.', 'easy-ai-chat-embed' ),
					esc_html( $selected_model )
				) 
			], 
			400 
		);
	}

	// 6. Call the appropriate API based on the model
	try {
		$ai_response = '';
		$error = null;

		if ( strpos( $selected_model, 'gpt-' ) === 0 ) {
			$ai_response = easy_ai_chat_embed_call_openai( $api_key, $user_message, $initial_prompt, $selected_model, $conversation_history );
		} elseif ( strpos( $selected_model, 'claude-' ) === 0 ) {
			$ai_response = easy_ai_chat_embed_call_anthropic( $api_key, $user_message, $initial_prompt, $selected_model, $conversation_history );
		} elseif ( strpos( $selected_model, 'gemini-' ) === 0 ) {
			$ai_response = easy_ai_chat_embed_call_google( $api_key, $user_message, $initial_prompt, $selected_model, $conversation_history );
		} else {
			$error = new WP_Error(
				'invalid_model', 
				sprintf(
					/* translators: %s: The name of the selected AI model. */
					__( 'Unsupported AI model selected: %s', 'easy-ai-chat-embed' ), 
					esc_html( $selected_model )
				)
			);
		}

		// Check if the helper function returned an error
		if ( is_wp_error( $ai_response ) ) {
			$error = $ai_response;
		} elseif ( empty( $ai_response ) && ! $error ) {
			// If no error but response is empty
			$error = new WP_Error( 'empty_response', __( 'AI service returned an empty response.', 'easy-ai-chat-embed' ) );
		}

		// Handle errors
		if ( $error ) {
			// Log the error for admins
			easy_ai_chat_embed_log_api_error( $error, $selected_model );
			throw new Exception( $error->get_error_message() );
		}

		// Send successful response
		wp_send_json_success( [ 'message' => $ai_response ] );

	} catch ( Exception $e ) {
		wp_send_json_error( 
			[ 'message' => __( 'Error contacting AI service:', 'easy-ai-chat-embed' ) . ' ' . $e->getMessage() ], 
			500 
		);
	}

	// Safety fallback
	wp_die();
}

// Register AJAX actions for logged-in users ONLY
add_action( 'wp_ajax_easy_ai_chat_embed_send_message', 'easy_ai_chat_embed_ajax_send_message' );
// Also enable for non-logged-in users (front-end visitors)
add_action( 'wp_ajax_nopriv_easy_ai_chat_embed_send_message', 'easy_ai_chat_embed_ajax_send_message' );

/**
 * Call OpenAI API to get a response.
 *
 * @since 1.0.0
 * @param string $api_key OpenAI API Key.
 * @param string $user_message The user's message.
 * @param string $initial_prompt System prompt.
 * @param string $selected_model The specific model selected.
 * @param array  $history Conversation history.
 * @return string|WP_Error AI response or WP_Error on failure.
 */
function easy_ai_chat_embed_call_openai( $api_key, $user_message, $initial_prompt, $selected_model, $history = [] ) {
	$api_endpoint = 'https://api.openai.com/v1/chat/completions';

	$messages = [];
	// Add initial system prompt if provided
	if ( ! empty( $initial_prompt ) ) {
		$messages[] = [ 'role' => 'system', 'content' => $initial_prompt ];
	}

	// Add conversation history
    foreach ( $history as $hist_msg ) {
        // Basic validation
        if ( ! empty( $hist_msg['role'] ) && ! empty( $hist_msg['content'] ) && in_array( $hist_msg['role'], ['user', 'assistant'], true ) ) {
            $messages[] = [ 
                'role' => $hist_msg['role'], 
                'content' => $hist_msg['content'] 
            ];
        }
    }

	// Add the current user message
	$messages[] = [ 'role' => 'user', 'content' => $user_message ];

	$request_body = wp_json_encode( [
		'model' => $selected_model,
		'messages' => $messages,
		// Add other parameters like temperature, max_tokens if needed
		// 'temperature' => 0.7,
		// 'max_tokens' => 150,
	] );

	if ( json_last_error() !== JSON_ERROR_NONE ) {
		return new WP_Error( 
			'json_encode_error', 
			__( 'Failed to encode request data for OpenAI.', 'easy-ai-chat-embed' ) . ' ' . json_last_error_msg() 
		);
	}

	$request_args = [
		'method'  => 'POST',
		'headers' => [
			'Content-Type'  => 'application/json',
			'Authorization' => 'Bearer ' . $api_key,
		],
		'body'    => $request_body,
		'timeout' => 60, // Increase timeout for potentially long AI responses
	];

	$response = wp_remote_post( $api_endpoint, $request_args );

	if ( is_wp_error( $response ) ) {
		return new WP_Error( 
			'openai_request_failed', 
			__( 'Failed to connect to OpenAI API:', 'easy-ai-chat-embed' ) . ' ' . $response->get_error_message() 
		);
	}

	$response_code = wp_remote_retrieve_response_code( $response );
	$response_body = wp_remote_retrieve_body( $response );
	$result = json_decode( $response_body, true );

	if ( $response_code !== 200 ) {
		$error_message = isset( $result['error']['message'] ) ? $result['error']['message'] : __( 'Unknown error occurred.', 'easy-ai-chat-embed' );
		return new WP_Error(
			'openai_api_error',
			/* translators: 1: HTTP response code (e.g., 400), 2: Error message from API. */
			sprintf( __( 'OpenAI API Error (%1$d): %2$s', 'easy-ai-chat-embed' ), $response_code, $error_message ),
			[ 'status' => $response_code ]
		);
	}

	if ( json_last_error() !== JSON_ERROR_NONE ) {
		return new WP_Error( 
			'openai_json_decode_error', 
			__( 'Failed to decode OpenAI response.', 'easy-ai-chat-embed' ) . ' ' . json_last_error_msg() 
		);
	}

	if ( ! empty( $result['choices'][0]['message']['content'] ) ) {
		return trim( $result['choices'][0]['message']['content'] );
	} else {
		return new WP_Error( 'openai_empty_response', __( 'Received an empty response from OpenAI.', 'easy-ai-chat-embed' ) );
	}
}

/**
 * Call Anthropic API to get a response.
 *
 * @since 1.0.0
 * @param string $api_key Anthropic API Key.
 * @param string $user_message The user's message.
 * @param string $initial_prompt System prompt.
 * @param string $selected_model The specific model selected.
 * @param array  $history Conversation history.
 * @return string|WP_Error AI response or WP_Error on failure.
 */
function easy_ai_chat_embed_call_anthropic( $api_key, $user_message, $initial_prompt, $selected_model, $history = [] ) {
	$api_endpoint = 'https://api.anthropic.com/v1/messages';
	$anthropic_version = '2023-06-01'; // Specify the required version

	$messages = [];
	// Add conversation history (ensure roles are user/assistant)
    foreach ( $history as $hist_msg ) {
        if ( ! empty( $hist_msg['role'] ) && ! empty( $hist_msg['content'] ) && in_array( $hist_msg['role'], ['user', 'assistant'], true ) ) {
            $messages[] = [ 
                'role' => $hist_msg['role'], 
                'content' => $hist_msg['content'] 
            ];
        }
    }

	// Add the current user message
	$messages[] = [ 'role' => 'user', 'content' => $user_message ];

	$request_data = [
		'model' => $selected_model,
		'messages' => $messages,
		'max_tokens' => 1024, // Anthropic requires max_tokens
	];

	// Add system prompt if provided
	if ( ! empty( $initial_prompt ) ) {
		$request_data['system'] = $initial_prompt;
	}

	$request_body = wp_json_encode( $request_data );

	if ( json_last_error() !== JSON_ERROR_NONE ) {
		return new WP_Error( 
			'json_encode_error', 
			__( 'Failed to encode request data for Anthropic.', 'easy-ai-chat-embed' ) . ' ' . json_last_error_msg() 
		);
	}

	$request_args = [
		'method'  => 'POST',
		'headers' => [
			'x-api-key'        => $api_key,
			'anthropic-version' => $anthropic_version,
			'Content-Type'     => 'application/json',
		],
		'body'    => $request_body,
		'timeout' => 60,
	];

	$response = wp_remote_post( $api_endpoint, $request_args );

	if ( is_wp_error( $response ) ) {
		return new WP_Error( 
			'anthropic_request_failed', 
			__( 'Failed to connect to Anthropic API:', 'easy-ai-chat-embed' ) . ' ' . $response->get_error_message() 
		);
	}

	$response_code = wp_remote_retrieve_response_code( $response );
	$response_body = wp_remote_retrieve_body( $response );
	$result = json_decode( $response_body, true );

	if ( $response_code !== 200 ) {
		$error_type = isset( $result['error']['type'] ) ? $result['error']['type'] : 'unknown_error';
		$error_message = isset( $result['error']['message'] ) ? $result['error']['message'] : __( 'Unknown error occurred.', 'easy-ai-chat-embed' );
		return new WP_Error(
			'anthropic_api_error',
			/* translators: 1: HTTP response code (e.g., 400), 2: Error type string (e.g., 'invalid_request_error'), 3: Error message from API. */
			sprintf( __( 'Anthropic API Error (%1$d - %2$s): %3$s', 'easy-ai-chat-embed' ), $response_code, $error_type, $error_message ),
			[ 'status' => $response_code ]
		);
	}

	if ( json_last_error() !== JSON_ERROR_NONE ) {
		return new WP_Error( 
			'anthropic_json_decode_error', 
			__( 'Failed to decode Anthropic response.', 'easy-ai-chat-embed' ) . ' ' . json_last_error_msg() 
		);
	}

	// Anthropic returns content in an array, usually the first item is the text
	if ( ! empty( $result['content'][0]['text'] ) ) {
		return trim( $result['content'][0]['text'] );
	} else {
		return new WP_Error( 
			'anthropic_empty_response', 
			__( 'Received an empty or unexpected response from Anthropic.', 'easy-ai-chat-embed' ) 
		);
	}
}

/**
 * Call Google AI API to get a response.
 *
 * @since 1.0.0
 * @param string $api_key Google AI API Key.
 * @param string $user_message The user's message.
 * @param string $initial_prompt System prompt.
 * @param string $selected_model The specific model selected.
 * @param array  $history Conversation history.
 * @return string|WP_Error AI response or WP_Error on failure.
 */
function easy_ai_chat_embed_call_google( $api_key, $user_message, $initial_prompt, $selected_model, $history = [] ) {
	// Google's API endpoint includes the model name and API key
	$api_endpoint = sprintf(
		'https://generativelanguage.googleapis.com/v1beta/models/%s:generateContent?key=%s', 
		urlencode( $selected_model ), // Use urlencode instead of esc_url_raw for the model name
		urlencode( $api_key )
	);

	$contents = [];
	// Format conversation history
    foreach ( $history as $hist_msg ) {
        // Map 'assistant' back to 'model' for Google API
        $role = ( $hist_msg['role'] === 'user' ) ? 'user' : 'model';
        if ( ! empty( $hist_msg['content'] ) ) {
            $contents[] = [
                'role' => $role,
                'parts' => [[ 'text' => $hist_msg['content'] ]]
            ];
        }
    }

	// Add the current user message directly
	$contents[] = [
		'role' => 'user',
		'parts' => [ [ 'text' => $user_message ] ] // Use $user_message directly
	];

	$request_data = [
		'contents' => $contents,
		// Add generationConfig if needed (temperature, maxOutputTokens, etc.)
		// 'generationConfig' => [
		//     'temperature' => 0.7,
		//     'maxOutputTokens' => 1000,
		// ]
	];

	// Add system instruction if provided
	if ( ! empty( $initial_prompt ) ) {
		$request_data['systemInstruction'] = [
			'parts' => [ [ 'text' => $initial_prompt ] ]
		];
	}

	$request_body = wp_json_encode( $request_data );

	if ( json_last_error() !== JSON_ERROR_NONE ) {
		return new WP_Error( 
			'json_encode_error', 
			__( 'Failed to encode request data for Google AI.', 'easy-ai-chat-embed' ) . ' ' . json_last_error_msg() 
		);
	}

	$request_args = [
		'method'  => 'POST',
		'headers' => [
			'Content-Type' => 'application/json',
		],
		'body'    => $request_body,
		'timeout' => 60,
	];

	$response = wp_remote_post( $api_endpoint, $request_args );

	if ( is_wp_error( $response ) ) {
		return new WP_Error( 
			'google_request_failed', 
			__( 'Failed to connect to Google AI API:', 'easy-ai-chat-embed' ) . ' ' . $response->get_error_message() 
		);
	}

	$response_code = wp_remote_retrieve_response_code( $response );
	$response_body = wp_remote_retrieve_body( $response );
	$result = json_decode( $response_body, true );

	if ( $response_code !== 200 ) {
		$error_message = isset( $result['error']['message'] ) ? $result['error']['message'] : __( 'Unknown error occurred.', 'easy-ai-chat-embed' );
		return new WP_Error(
			'google_api_error',
			/* translators: 1: HTTP response code (e.g., 400), 2: Error message from API. */
			sprintf( __( 'Google AI API Error (%1$d): %2$s', 'easy-ai-chat-embed' ), $response_code, $error_message ),
			[ 'status' => $response_code ]
		);
	}

	if ( json_last_error() !== JSON_ERROR_NONE ) {
		return new WP_Error( 
			'google_json_decode_error', 
			__( 'Failed to decode Google AI response.', 'easy-ai-chat-embed' ) . ' ' . json_last_error_msg() 
		);
	}

	// Extract text, checking structure carefully
	if ( isset( $result['candidates'][0]['content']['parts'][0]['text'] ) ) {
		return trim( $result['candidates'][0]['content']['parts'][0]['text'] );
	} elseif ( isset( $result['candidates'][0]['finishReason'] ) && $result['candidates'][0]['finishReason'] !== 'STOP' ) {
		/* translators: %s: Reason provided by API for stopping (e.g., 'SAFETY'). */
		return new WP_Error(
			'google_blocked_response',
			// translators: %s: Error message from the Google API.
			sprintf( __( 'Google AI response generation stopped due to: %s', 'easy-ai-chat-embed' ), $result['candidates'][0]['finishReason'] )
		);
	} else {
		return new WP_Error( 
			'google_empty_response', 
			__( 'Received an empty or unexpected response from Google AI.', 'easy-ai-chat-embed' ) 
		);
	}
}

/**
 * Log API errors for admin review.
 *
 * @since 1.0.0
 * @param WP_Error $error         The error object.
 * @param string   $selected_model The model that was being used.
 * @return void
 */
function easy_ai_chat_embed_log_api_error( $error, $selected_model ) {
	// Get existing error logs or initialize empty array
	$error_logs = get_option( 'easy_ai_chat_embed_error_logs', [] );
	
	// Add new error with timestamp and context
	$error_logs[] = [
		'timestamp' => current_time( 'mysql' ),
		'model'     => $selected_model,
		'code'      => $error->get_error_code(),
		'message'   => $error->get_error_message(),
		'data'      => $error->get_error_data(),
	];
	
	// Keep only the last 50 errors to prevent option bloat
	if ( count( $error_logs ) > 50 ) {
		$error_logs = array_slice( $error_logs, -50 );
	}
	
	// Save updated logs
	update_option( 'easy_ai_chat_embed_error_logs', $error_logs );
	
	// Set a transient flag for admin notice - expires after 1 day
	set_transient( 'easy_ai_chat_embed_has_errors', true, DAY_IN_SECONDS );
}

// Add admin notice for errors
add_action( 'admin_notices', 'easy_ai_chat_embed_display_api_error_notice' );

/**
 * Display admin notice about API errors if they exist.
 *
 * @since 1.0.0
 * @return void
 */
function easy_ai_chat_embed_display_api_error_notice() {
	// Only show to administrators
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}
	
	// Check if we have errors
	if ( ! get_transient( 'easy_ai_chat_embed_has_errors' ) ) {
		return;
	}
	
	// Get error logs
	$error_logs = get_option( 'easy_ai_chat_embed_error_logs', [] );
	if ( empty( $error_logs ) ) {
		return;
	}
	
	// Count errors in the last 24 hours
	$recent_errors = 0;
	$day_ago = strtotime( '-1 day' );
	
	foreach ( $error_logs as $error ) {
		if ( strtotime( $error['timestamp'] ) > $day_ago ) {
			$recent_errors++;
		}
	}
	
	if ( $recent_errors === 0 ) {
		return;
	}
	
	?>
	<div class="notice notice-error is-dismissible">
		<p>
			<?php
			echo sprintf(
				/* translators: %1$d: number of errors, %2$s: settings page URL */
				esc_html__( 'Easy AI Chat Embed has encountered %1$d API errors in the last 24 hours. Please check your API keys and settings on the %2$s.', 'easy-ai-chat-embed' ),
				esc_html( $recent_errors ),
				'<a href="' . esc_url( admin_url( 'options-general.php?page=easy-ai-chat-embed-settings-page' ) ) . '">' . esc_html__( 'settings page', 'easy-ai-chat-embed' ) . '</a>'
			);
			?>
		</p>
	</div>
	<?php
}