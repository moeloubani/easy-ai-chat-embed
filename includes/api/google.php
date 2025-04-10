<?php
/**
 * Google AI API Integration for Easy AI Chat Embed plugin.
 *
 * @package Easy_AI_Chat_Embed
 * @since 1.0.0
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
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