<?php
/**
 * Server-side rendering of the `easy-ai-chat-embed/chat-embed` block.
 *
 * @package Easy_AI_Chat_Embed
 */

/**
 * Renders the `easy-ai-chat-embed/chat-embed` block on the server.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block default content.
 * @param WP_Block $block      Block instance.
 * @return string Returns the chat embed HTML.
 */
function render_block_simple_ai_chat_embed( $attributes, $content, $block ) {
	// Get global settings
	$settings = get_option( 'simple_ai_chat_embed_settings', [] );
	$default_chatbot_name = isset( $settings['default_chatbot_name'] ) && ! empty( trim( $settings['default_chatbot_name'] ) ) 
						? $settings['default_chatbot_name'] 
						: 'AIChatBot';

	// Get attributes with defaults
	$selected_model = isset( $attributes['selectedModel'] ) ? $attributes['selectedModel'] : '';
	$initial_prompt = isset( $attributes['initialPrompt'] ) ? $attributes['initialPrompt'] : '';
	$instance_id = isset( $attributes['instanceId'] ) ? $attributes['instanceId'] : uniqid( 'eace-' );
    $chatbot_name = isset( $attributes['chatbotName'] ) && ! empty( trim( $attributes['chatbotName'] ) ) 
                      ? $attributes['chatbotName'] 
                      : $default_chatbot_name;

	// Enqueue frontend assets (this is handled by the render_callback in the main plugin file)
	
	// Return HTML
	$wrapper_attributes = get_block_wrapper_attributes( array(
		'class' => 'easy-ai-chat-embed-instance',
		'data-selected-model' => esc_attr( $selected_model ),
		'data-initial-prompt' => esc_attr( $initial_prompt ),
		'data-instance-id' => esc_attr( $instance_id ),
        'data-chatbot-name' => esc_attr( $chatbot_name ),
	) );
    
	return sprintf(
		'<div %1$s>
			<noscript>%2$s</noscript>
		</div>',
		$wrapper_attributes,
		esc_html__( 'This chat interface requires JavaScript to be enabled.', 'easy-ai-chat-embed' )
	);
} 