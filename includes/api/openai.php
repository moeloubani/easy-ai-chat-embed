<?php
/**
 * OpenAI API Integration for Easy AI Chat Embed plugin.
 *
 * @package Easy_AI_Chat_Embed
 * @since 1.0.0
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

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