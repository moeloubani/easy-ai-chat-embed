<?php
/**
 * Elementor Widget Loader for Simple AI Chat Embed
 *
 * @package Easy_AI_Chat_Embed
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register the custom Elementor widget.
 *
 * @param \Elementor\Widgets_Manager $widgets_manager Elementor widgets manager.
 * @return void
 */
function simple_ai_chat_embed_register_elementor_widget( $widgets_manager ) {
	// Include the widget class file.
	$widget_file = SIMPLE_AI_CHAT_EMBED_PATH . 'includes/elementor/class-easy-ai-chat-embed-elementor-widget.php';
	
	require_once $widget_file;

	// Make sure the class exists before registering
	if (class_exists('\Easy_AI_Chat_Embed\Includes\Elementor\Easy_AI_Chat_Embed_Elementor_Widget')) {
		// Create widget instance
		$widget = new \Easy_AI_Chat_Embed\Includes\Elementor\Easy_AI_Chat_Embed_Elementor_Widget();
		
		// Support both old and new Elementor versions
		// Check which method to use for registering the widget
		if (method_exists($widgets_manager, 'register')) {
			// Elementor 3.5.0+
			$widgets_manager->register($widget);
		} else {
			// Pre Elementor 3.5.0
			$widgets_manager->register_widget_type($widget);
		}
	}
}
add_action( 'elementor/widgets/register', 'simple_ai_chat_embed_register_elementor_widget' );

// Legacy support for older Elementor versions
add_action( 'elementor/widgets/widgets_registered', function( $widgets_manager ) {
	// Only run if the widget isn't already registered
	if (!$widgets_manager->get_widget_types('easy-ai-chat-embed')) {
		simple_ai_chat_embed_register_elementor_widget($widgets_manager);
	}
});