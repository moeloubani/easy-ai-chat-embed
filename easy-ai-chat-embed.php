<?php
/**
 * Plugin Name:       Easy AI Chat Embed
 * Plugin URI:        #
 * Description:       Embeds a chat interface powered by various AI models (ChatGPT, Claude, Gemini) via shortcode, block, or Elementor widget.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Author:            Your Name or Company
 * Author URI:        #
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       easy-ai-chat-embed
 * Domain Path:       /languages
 *
 * @package Easy_AI_Chat_Embed
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Define constants
define( 'EASY_AI_CHAT_EMBED_VERSION', '1.0.0' );
define( 'EASY_AI_CHAT_EMBED_PATH', plugin_dir_path( __FILE__ ) );
define( 'EASY_AI_CHAT_EMBED_URL', plugin_dir_url( __FILE__ ) );

// Uncomment when ready for translation support
// function easy_ai_chat_embed_load_textdomain() {
// 	load_plugin_textdomain( 'easy-ai-chat-embed', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
// }
// add_action( 'plugins_loaded', 'easy_ai_chat_embed_load_textdomain' );

// Include necessary files
require_once EASY_AI_CHAT_EMBED_PATH . 'includes/api/handler.php';
require_once EASY_AI_CHAT_EMBED_PATH . 'admin/settings.php'; // Include admin settings

/**
 * Load Elementor integration if Elementor is active.
 *
 * @since 1.0.0
 * @return void
 */
function easy_ai_chat_embed_maybe_load_elementor() {
    // Check if Elementor is loaded and its widgets manager is available
    if ( did_action( 'elementor/loaded' ) && class_exists( '\Elementor\Widget_Base' ) ) {
        require_once EASY_AI_CHAT_EMBED_PATH . 'includes/elementor/loader.php';
    }
}
// Use plugins_loaded hook to check for Elementor early
add_action( 'plugins_loaded', 'easy_ai_chat_embed_maybe_load_elementor' );

// Also add a backup hook with late priority to ensure it runs after Elementor is fully loaded
add_action( 'init', 'easy_ai_chat_embed_maybe_load_elementor', 20 );

/**
 * Register the Gutenberg block and enqueue frontend assets via render_callback.
 *
 * @since 1.0.0
 * @return void
 */
function easy_ai_chat_embed_register_block() {
	// Register the block type using metadata from block.json
	register_block_type(
		EASY_AI_CHAT_EMBED_PATH . 'build',
		[
			'render_callback' => 'easy_ai_chat_embed_render_block' // Re-added render_callback
		]
	);
}
add_action( 'init', 'easy_ai_chat_embed_register_block' );

/**
 * Register the shortcode and enqueue frontend assets.
 *
 * @since 1.0.0
 * @return void
 */
function easy_ai_chat_embed_register_shortcode() {
    add_shortcode( 'easy_ai_chat_embed', 'easy_ai_chat_embed_shortcode_handler' );
}
add_action( 'init', 'easy_ai_chat_embed_register_shortcode' );

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

    // Update attributes array passed to JS to include the final chatbot name
    $attributes_for_js = $attributes;
    $attributes_for_js['chatbotName'] = $chatbot_name;

	// Flag that assets need to be enqueued
	wp_add_inline_script( 'wp-hooks', 'window.easyAiChatEmbedShouldEnqueue = true;', 'before' );

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

    // Flag that assets need to be enqueued
    wp_add_inline_script( 'wp-hooks', 'window.easyAiChatEmbedShouldEnqueue = true;', 'before' );

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
 * @since 1.0.0
 * @return void
 */
function easy_ai_chat_embed_enqueue_frontend_assets() {
    $script_handle = 'easy-ai-chat-embed-frontend'; // Use a consistent handle

    // Only enqueue if the handle hasn't been enqueued yet
    if ( ! wp_script_is( $script_handle, 'enqueued' ) ) {
        $script_asset_path = EASY_AI_CHAT_EMBED_PATH . 'build/index.asset.php';
        $style_path = EASY_AI_CHAT_EMBED_PATH . 'build/index.css';

        if ( file_exists( $script_asset_path ) ) {
            $script_asset = require $script_asset_path;
            wp_enqueue_script(
                $script_handle,
                EASY_AI_CHAT_EMBED_URL . 'build/index.js',
                array_merge( $script_asset['dependencies'], array( 'wp-element', 'wp-i18n', 'wp-dom-ready', 'react' ) ),
                $script_asset['version'],
                true // Load in footer.
            );

            // Enqueue style if it exists
            if ( file_exists( $style_path ) ) {
                wp_enqueue_style(
                    $script_handle, // Use same handle for style for simplicity
                    EASY_AI_CHAT_EMBED_URL . 'build/index.css',
                    [],
                    $script_asset['version']
                );
            }

            // Localize script ONCE with common data
            wp_localize_script(
                $script_handle,
                'easyAiChatEmbedGlobalData', // Single global object
                [
                    'ajaxUrl' => admin_url( 'admin-ajax.php' ),
                    'nonce'   => wp_create_nonce( 'easy_ai_chat_embed_nonce' ),
                    // Add any other truly global settings here if needed later
                ]
            );
        }
    }
}
add_action( 'wp_enqueue_scripts', 'easy_ai_chat_embed_enqueue_frontend_assets' );

/**
 * Add the admin menu item for the settings page.
 *
 * @since 1.0.0
 * @return void
 */
function easy_ai_chat_embed_add_admin_menu() {
    add_options_page(
        __( 'Easy AI Chat Embed Settings', 'easy-ai-chat-embed' ), // Page Title
        __( 'AI Chat Embed', 'easy-ai-chat-embed' ),           // Menu Title
        'manage_options',                                      // Capability required
        'easy-ai-chat-embed-settings-page',                    // Menu Slug (matches settings page slug)
        'easy_ai_chat_embed_render_settings_page'              // Function to render the page content
    );
}
add_action( 'admin_menu', 'easy_ai_chat_embed_add_admin_menu' );