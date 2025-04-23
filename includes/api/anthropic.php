<?php
/**
 * Anthropic API Integration for Simple AI Chat Embed plugin.
 *
 * @package Simple_AI_Chat_Embed
 * @since 1.0.0
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
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
function simple_ai_chat_embed_call_anthropic( $api_key, $user_message, $initial_prompt, $selected_model, $history = [] ) {
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
			__( 'Failed to encode request data for Anthropic.', 'simple-ai-chat-embed' ) . ' ' . json_last_error_msg() 
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
			__( 'Failed to connect to Anthropic API:', 'simple-ai-chat-embed' ) . ' ' . $response->get_error_message() 
		);
	}

	$response_code = wp_remote_retrieve_response_code( $response );
	$response_body = wp_remote_retrieve_body( $response );
	$result = json_decode( $response_body, true );

	if ( $response_code !== 200 ) {
		$error_type = isset( $result['error']['type'] ) ? $result['error']['type'] : 'unknown_error';
		$error_message = isset( $result['error']['message'] ) ? $result['error']['message'] : __( 'Unknown error occurred.', 'simple-ai-chat-embed' );
		return new WP_Error(
			'anthropic_api_error',
			/* translators: 1: HTTP response code (e.g., 400), 2: Error type string (e.g., 'invalid_request_error'), 3: Error message from API. */
			sprintf( __( 'Anthropic API Error (%1$d - %2$s): %3$s', 'simple-ai-chat-embed' ), $response_code, $error_type, $error_message ),
			[ 'status' => $response_code ]
		);
	}

	if ( json_last_error() !== JSON_ERROR_NONE ) {
		return new WP_Error( 
			'anthropic_json_decode_error', 
			__( 'Failed to decode Anthropic response.', 'simple-ai-chat-embed' ) . ' ' . json_last_error_msg() 
		);
	}

	// Anthropic returns content in an array, usually the first item is the text
	if ( ! empty( $result['content'][0]['text'] ) ) {
		return trim( $result['content'][0]['text'] );
	} else {
		return new WP_Error( 
			'anthropic_empty_response', 
			__( 'Received an empty or unexpected response from Anthropic.', 'simple-ai-chat-embed' ) 
		);
	}
} 