<?php
/**
 * Frontend rendering functions for Easy AI Chat Embed plugin.
 *
 * @package Easy_AI_Chat_Embed
 * @since 1.0.0
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Render callback for the AI Chat Embed block.
 *
 * Enqueues frontend script & style and passes data, then returns block content.
 *
 * @since 1.0.0
 * @param array    $attributes Block attributes.
 * @param string   $content    Block default content.
 * @param WP_Block $block      Block instance.
 * @return string Block HTML content.
 */
function easy_ai_chat_embed_render_block( $attributes, $content, $block ) {
    // Get global settings for fallback
    $settings = get_option( 'easy_ai_chat_embed_settings', [] );
    $default_chatbot_name = isset( $settings['default_chatbot_name'] ) && ! empty( trim( $settings['default_chatbot_name'] ) ) 
                            ? $settings['default_chatbot_name'] 
                            : 'AIChatBot';

    // Determine the final chatbot name for this instance
    $chatbot_name = isset( $attributes['chatbotName'] ) && ! empty( trim( $attributes['chatbotName'] ) ) 
                      ? $attributes['chatbotName'] 
                      : $default_chatbot_name;

    // Enqueue required assets for this block instance
    easy_ai_chat_embed_enqueue_assets();

    // Return the block content wrapper
    // Ensure the wrapper has the necessary data attributes for the JS to find
    // Add the common instance class
    $wrapper_attributes = get_block_wrapper_attributes(
        [
            'class' => 'easy-ai-chat-embed-instance', // Ensure common class
            'data-instance-id' => esc_attr( $attributes['instanceId'] ),
            'data-selected-model' => esc_attr( $attributes['selectedModel'] ),
            'data-initial-prompt' => esc_attr( $attributes['initialPrompt'] ),
            'data-chatbot-name' => esc_attr( $chatbot_name ),
            'data-is-block' => 'true' // Add flag for JS if needed
        ]
    );
    return sprintf(
        '<div %s><noscript>%s</noscript></div>',
        $wrapper_attributes,
        esc_html__( 'This chat interface requires JavaScript to be enabled.', 'easy-ai-chat-embed' )
    );
}

/**
 * Handler function for the [easy_ai_chat_embed] shortcode.
 *
 * Enqueues the main script & style and passes data, then returns the HTML container.
 *
 * @since 1.0.0
 * @param array $atts Shortcode attributes.
 * @return string HTML content for the shortcode.
 */
function easy_ai_chat_embed_shortcode_handler( $atts ) {
    $atts = array_change_key_case( (array) $atts, CASE_LOWER );
    
    // Get saved settings
    $settings = get_option( 'easy_ai_chat_embed_settings', [] );
    $default_model = isset( $settings['default_model'] ) ? $settings['default_model'] : '';
    $default_prompt = isset( $settings['default_initial_prompt'] ) ? $settings['default_initial_prompt'] : '';
    $default_chatbot_name = isset( $settings['default_chatbot_name'] ) ? $settings['default_chatbot_name'] : 'AIChatBot';

    // Determine final values, allowing shortcode attributes to override defaults
    $selected_model = isset( $atts['model'] ) ? $atts['model'] : $default_model;
    $initial_prompt = isset( $atts['prompt'] ) ? $atts['prompt'] : $default_prompt;
    $chatbot_name = isset( $atts['name'] ) ? $atts['name'] : $default_chatbot_name; // Use 'name' attribute for shortcode
    $instance_id = uniqid( 'easy-ai-chat-embed-shortcode-' ); // Generate unique ID for shortcode instance

    // Enqueue required assets for this shortcode instance
    easy_ai_chat_embed_enqueue_assets();

    // Return the placeholder div where the React app will mount
    return sprintf(
        '<div id="easy-ai-chat-embed-%1$s" class="easy-ai-chat-embed-instance" data-is-shortcode="true" data-instance-id="%1$s" data-selected-model="%2$s" data-initial-prompt="%3$s" data-chatbot-name="%4$s"><noscript>%5$s</noscript></div>',
        esc_attr( $instance_id ),
        esc_attr( $selected_model ),
        esc_attr( $initial_prompt ),
        esc_attr( $chatbot_name ),
        esc_html__( 'This chat interface requires JavaScript to be enabled.', 'easy-ai-chat-embed' )
    );
}

/**
 * Centralized function to enqueue frontend assets.
 * 
 * Called directly from render_callback and shortcode handler
 * rather than being hooked to wp_enqueue_scripts to avoid loading
 * assets on pages where they're not needed.
 *
 * @since 1.0.0
 * @return void
 */
function easy_ai_chat_embed_enqueue_assets() {
    static $assets_loaded = false;
    
    // Only load assets once per page
    if ($assets_loaded) {
        return;
    }
    
    $script_handle = 'easy-ai-chat-embed-frontend';
    
    $script_asset_path = EASY_AI_CHAT_EMBED_PATH . 'build/index.asset.php';
    $style_path = EASY_AI_CHAT_EMBED_PATH . 'build/index.css';

    if (file_exists($script_asset_path)) {
        $script_asset = require $script_asset_path;
        
        wp_enqueue_script(
            $script_handle,
            EASY_AI_CHAT_EMBED_URL . 'build/index.js',
            array_merge($script_asset['dependencies'], array('wp-element', 'wp-i18n', 'wp-dom-ready', 'react')),
            $script_asset['version'],
            true // Load in footer.
        );

        // Enqueue style if it exists
        if (file_exists($style_path)) {
            wp_enqueue_style(
                $script_handle, // Use same handle for style for simplicity
                EASY_AI_CHAT_EMBED_URL . 'build/index.css',
                [],
                $script_asset['version']
            );
        }

        // Localize script with common data
        wp_localize_script(
            $script_handle,
            'easyAiChatEmbedGlobalData',
            [
                'ajaxUrl' => admin_url('admin-ajax.php'),
                'nonce'   => wp_create_nonce('easy_ai_chat_embed_nonce'),
            ]
        );
        
        // Mark assets as loaded to prevent duplicate loading
        $assets_loaded = true;
    }
} 