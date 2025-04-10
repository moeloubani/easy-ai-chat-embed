<?php
/**
 * Plugin Name:       Easy AI Chat Embed
 * Plugin URI:        #
 * Description:       Embeds a chat interface powered by various AI models (ChatGPT, Claude, Gemini) via shortcode, block, or Elementor widget.
 * Version:           1.0.1
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Author:            Moe Loubani
 * Author URI:        https://moe.ca
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
define( 'EASY_AI_CHAT_EMBED_VERSION', '1.0.1' );
define( 'EASY_AI_CHAT_EMBED_PATH', plugin_dir_path( __FILE__ ) );
define( 'EASY_AI_CHAT_EMBED_URL', plugin_dir_url( __FILE__ ) );

// Load textdomain
function easy_ai_chat_embed_load_textdomain() {
	load_plugin_textdomain( 'easy-ai-chat-embed', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
}
add_action( 'plugins_loaded', 'easy_ai_chat_embed_load_textdomain' );

// Include necessary files
require_once EASY_AI_CHAT_EMBED_PATH . 'includes/api/handler.php';
require_once EASY_AI_CHAT_EMBED_PATH . 'includes/frontend.php';
require_once EASY_AI_CHAT_EMBED_PATH . 'admin/settings.php';

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
			'render_callback' => 'easy_ai_chat_embed_render_block'
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