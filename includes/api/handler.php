<?php
/**
 * Handles AJAX requests for the Simple AI Chat Embed plugin.
 *
 * @package Simple_AI_Chat_Embed
 * @since 1.0.0
 */

// Exit if accessed directly.
use JetBrains\PhpStorm\NoReturn;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Include necessary model-specific handlers
require_once dirname( __FILE__ ) . '/openai.php';
require_once dirname( __FILE__ ) . '/anthropic.php';
require_once dirname( __FILE__ ) . '/google.php';

/**
 * AJAX handler for sending messages to the AI.
 *
 * Handles the 'simple_ai_chat_embed_send_message' action.
 *
 * @since 1.0.0
 * @return void
 */
function simple_ai_chat_embed_ajax_send_message() {
	// 1. Verify the nonce with die on failure
	check_ajax_referer( 'simple_ai_chat_embed_nonce', '_ajax_nonce', true );

	// 2. Retrieve saved settings
	$settings = get_option( 'simple_ai_chat_embed_settings', [] );

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
			[ 'message' => __( 'Invalid model format specified.', 'simple-ai-chat-embed' ) ],
			400
		);
	}

	// Handle conversation history
	$conversation_history = [];
	if ( isset( $_POST['conversationHistory'] ) ) {
		$conversation_history_raw = sanitize_textarea_field( wp_unslash( $_POST['conversationHistory'] ) );
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
			[ 'message' => __( 'Missing required data (message, model, or instance ID).', 'simple-ai-chat-embed' ) ], 
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
					__( 'API key for the selected model (%s) is missing or not configured in settings.', 'simple-ai-chat-embed' ),
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
			$ai_response = simple_ai_chat_embed_call_openai( $api_key, $user_message, $initial_prompt, $selected_model, $conversation_history );
		} elseif ( strpos( $selected_model, 'claude-' ) === 0 ) {
			$ai_response = simple_ai_chat_embed_call_anthropic( $api_key, $user_message, $initial_prompt, $selected_model, $conversation_history );
		} elseif ( strpos( $selected_model, 'gemini-' ) === 0 ) {
			$ai_response = simple_ai_chat_embed_call_google( $api_key, $user_message, $initial_prompt, $selected_model, $conversation_history );
		} else {
			$error = new WP_Error(
				'invalid_model', 
				sprintf(
					/* translators: %s: The name of the selected AI model. */
					__( 'Unsupported AI model selected: %s', 'simple-ai-chat-embed' ), 
					esc_html( $selected_model )
				)
			);
		}

		// Check if the helper function returned an error
		if ( is_wp_error( $ai_response ) ) {
			$error = $ai_response;
		} elseif ( empty( $ai_response ) && ! $error ) {
			// If no error but response is empty
			$error = new WP_Error( 'empty_response', __( 'AI service returned an empty response.', 'simple-ai-chat-embed' ) );
		}

		// Handle errors
		if ( $error ) {
			throw new Exception( $error->get_error_message() );
		}

		// Send successful response
		wp_send_json_success( [ 'message' => $ai_response ] );

	} catch ( Exception $e ) {
		wp_send_json_error( 
			[ 'message' => __( 'Error contacting AI service:', 'simple-ai-chat-embed' ) . ' ' . $e->getMessage() ], 
			500 
		);
	}

	// Safety fallback
	wp_die();
}

// Register AJAX actions for logged-in users ONLY
add_action( 'wp_ajax_simple_ai_chat_embed_send_message', 'simple_ai_chat_embed_ajax_send_message' );
// Also enable for non-logged-in users (front-end visitors)
add_action( 'wp_ajax_nopriv_simple_ai_chat_embed_send_message', 'simple_ai_chat_embed_ajax_send_message' );

// Endpoint to get the output for the chat embed block
add_action( 'rest_api_init', function () {
    register_rest_route( 'simple-ai-chat-embed/v1', '/fetch-output', array(
        'methods'  => 'POST',
        'callback' => 'simple_ai_chat_embed_get_chat_embed_html',
        'permission_callback' => 'simple_ai_chat_embed_rest_permission_callback'
    ) );
} );

/**
 * Callback function for the REST API endpoint.
 *
 * @param WP_REST_Request $request The request object.
 * @return void|null
 */
function simple_ai_chat_embed_get_chat_embed_html($request ) {
    // Get the chatbot name from the request
    $attributes = $request->get_param('attributes');

    $chat_html_output = simple_ai_chat_embed_render_block( $attributes, '', null);
    wp_send_json_success( $chat_html_output, 200 );
    exit;
}

/**
 * Checks if the current user has permission to access the REST API.
 *
 * This callback is used for the REST API endpoint at /simple-ai-chat-embed/v1/fetch-output.
 *
 * @since 1.0.0
 * @return bool True if the user has permission, false otherwise.
 */
function simple_ai_chat_embed_rest_permission_callback() {
    return current_user_can( 'publish_posts' );
}