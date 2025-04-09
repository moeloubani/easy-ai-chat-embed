<?php
/**
 * Elementor Widget Loader for Easy AI Chat Embed
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
function easy_ai_chat_embed_register_elementor_widget( $widgets_manager ) {
	error_log('Easy AI Chat Embed: Attempting to register Elementor widget');

	// Include the widget class file.
	$widget_file = EASY_AI_CHAT_EMBED_PATH . 'includes/elementor/widget.php';
	error_log('Easy AI Chat Embed: Looking for widget file at: ' . $widget_file . ' - exists: ' . (file_exists($widget_file) ? 'yes' : 'no'));
	
	require_once $widget_file;

	// Make sure the class exists before registering
	if (class_exists('\\Easy_AI_Chat_Embed\\Includes\\Elementor\\Easy_AI_Chat_Embed_Elementor_Widget')) {
		error_log('Easy AI Chat Embed: Widget class found, registering with Elementor');
		
		// Create widget instance
		$widget = new \Easy_AI_Chat_Embed\Includes\Elementor\Easy_AI_Chat_Embed_Elementor_Widget();
		
		// Support both old and new Elementor versions
		// Check which method to use for registering the widget
		if (method_exists($widgets_manager, 'register')) {
			error_log('Easy AI Chat Embed: Using new Elementor register method');
			// Elementor 3.5.0+
			$widgets_manager->register($widget);
		} else {
			error_log('Easy AI Chat Embed: Using old Elementor register_widget_type method');
			// Pre Elementor 3.5.0
			$widgets_manager->register_widget_type($widget);
		}
	} else {
		error_log('Easy AI Chat Embed: ERROR - Widget class not found after including file');
	}
}
add_action( 'elementor/widgets/register', 'easy_ai_chat_embed_register_elementor_widget' );

// Legacy support for older Elementor versions
add_action( 'elementor/widgets/widgets_registered', function( $widgets_manager ) {
	error_log('Easy AI Chat Embed: Legacy hook elementor/widgets/widgets_registered triggered');
	// Only run if the widget isn't already registered
	if (!$widgets_manager->get_widget_types('easy-ai-chat-embed')) {
		easy_ai_chat_embed_register_elementor_widget($widgets_manager);
	}
});