<?php
/**
 * Plugin Name:       Simple AI Chat Embed
 * Description:       Embeds a chat interface powered by various AI models (ChatGPT, Claude, Gemini) via shortcode, block, or Elementor widget.
 * Version:           1.0.2
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Author:            Moe Loubani
 * Author URI:        https://moe.ca
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       simple-ai-chat-embed
 * Domain Path:       /languages
 *
 * @package Simple_AI_Chat_Embed
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Define constants
define( 'SIMPLE_AI_CHAT_EMBED_VERSION', '1.0.2' );
define( 'SIMPLE_AI_CHAT_EMBED_PATH', plugin_dir_path( __FILE__ ) );
define( 'SIMPLE_AI_CHAT_EMBED_URL', plugin_dir_url( __FILE__ ) );

// Include necessary files
require_once SIMPLE_AI_CHAT_EMBED_PATH . 'includes/api/handler.php';
require_once SIMPLE_AI_CHAT_EMBED_PATH . 'includes/frontend.php';
require_once SIMPLE_AI_CHAT_EMBED_PATH . 'admin/settings.php';

/**
 * Load Elementor integration if Elementor is active.
 *
 * @since 1.0.0
 * @return void
 */
function simple_ai_chat_embed_maybe_load_elementor() {
    // Check if Elementor is loaded and its widgets manager is available
    if ( did_action( 'elementor/loaded' ) && class_exists( '\Elementor\Widget_Base' ) ) {
        require_once SIMPLE_AI_CHAT_EMBED_PATH . 'includes/elementor/loader.php';
    }
}
// Use plugins_loaded hook to check for Elementor early
add_action( 'plugins_loaded', 'simple_ai_chat_embed_maybe_load_elementor' );

// Also add a backup hook with late priority to ensure it runs after Elementor is fully loaded
add_action( 'init', 'simple_ai_chat_embed_maybe_load_elementor', 20 );

/**
 * Register the Gutenberg block and enqueue frontend assets via render_callback.
 *
 * @since 1.0.0
 * @return void
 */
function simple_ai_chat_embed_register_block() {
	// Register the block type using metadata from block.json
	register_block_type(
		SIMPLE_AI_CHAT_EMBED_PATH . 'build'
	);
}
add_action( 'init', 'simple_ai_chat_embed_register_block' );

/**
 * Register the shortcode and enqueue frontend assets.
 *
 * @since 1.0.0
 * @return void
 */
function simple_ai_chat_embed_register_shortcode() {
    add_shortcode( 'simple_ai_chat_embed', 'simple_ai_chat_embed_shortcode_handler' );
}
add_action( 'init', 'simple_ai_chat_embed_register_shortcode' );

/**
 * Add the admin menu item for the settings page.
 *
 * @since 1.0.0
 * @return void
 */
function simple_ai_chat_embed_add_admin_menu() {
    add_options_page(
        __( 'Simple AI Chat Embed Settings', 'simple-ai-chat-embed' ), // Page Title
        __( 'AI Chat Embed', 'simple-ai-chat-embed' ),           // Menu Title
        'manage_options',                                      // Capability required
        'simple-ai-chat-embed-settings-page',                    // Menu Slug (matches settings page slug)
        'simple_ai_chat_embed_render_settings_page'              // Function to render the page content
    );
}
add_action( 'admin_menu', 'simple_ai_chat_embed_add_admin_menu' );