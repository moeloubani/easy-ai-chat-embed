<?php
/**
 * API Utilities for Easy AI Chat Embed plugin.
 *
 * @package Easy_AI_Chat_Embed
 * @since 1.0.0
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Log API errors for admin review.
 *
 * @since 1.0.0
 * @param WP_Error $error         The error object.
 * @param string   $selected_model The model that was being used.
 * @return void
 */
function easy_ai_chat_embed_log_api_error( $error, $selected_model ) {
	// Get existing error logs or initialize empty array
	$error_logs = get_option( 'easy_ai_chat_embed_error_logs', [] );
	
	// Add new error with timestamp and context
	$error_logs[] = [
		'timestamp' => current_time( 'mysql' ),
		'model'     => $selected_model,
		'code'      => $error->get_error_code(),
		'message'   => $error->get_error_message(),
		'data'      => $error->get_error_data(),
	];
	
	// Keep only the last 50 errors to prevent option bloat
	if ( count( $error_logs ) > 50 ) {
		$error_logs = array_slice( $error_logs, -50 );
	}
	
	// Save updated logs
	update_option( 'easy_ai_chat_embed_error_logs', $error_logs );
	
	// Set a transient flag for admin notice - expires after 1 day
	set_transient( 'easy_ai_chat_embed_has_errors', true, DAY_IN_SECONDS );
}

/**
 * Display admin notice about API errors if they exist.
 *
 * @since 1.0.0
 * @return void
 */
function easy_ai_chat_embed_display_api_error_notice() {
	// Only show to administrators
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}
	
	// Check if we have errors
	if ( ! get_transient( 'easy_ai_chat_embed_has_errors' ) ) {
		return;
	}
	
	// Get error logs
	$error_logs = get_option( 'easy_ai_chat_embed_error_logs', [] );
	if ( empty( $error_logs ) ) {
		return;
	}
	
	// Count errors in the last 24 hours
	$recent_errors = 0;
	$day_ago = strtotime( '-1 day' );
	
	foreach ( $error_logs as $error ) {
		if ( strtotime( $error['timestamp'] ) > $day_ago ) {
			$recent_errors++;
		}
	}
	
	if ( $recent_errors === 0 ) {
		return;
	}
	
	?>
	<div class="notice notice-error is-dismissible">
		<p>
			<?php
			echo sprintf(
				/* translators: %1$d: number of errors, %2$s: settings page URL */
				esc_html__( 'Easy AI Chat Embed has encountered %1$d API errors in the last 24 hours. Please check your API keys and settings on the %2$s.', 'easy-ai-chat-embed' ),
				esc_html( $recent_errors ),
				'<a href="' . esc_url( admin_url( 'options-general.php?page=easy-ai-chat-embed-settings-page' ) ) . '">' . esc_html__( 'settings page', 'easy-ai-chat-embed' ) . '</a>'
			);
			?>
		</p>
	</div>
	<?php
}

// Add admin notice for errors
add_action( 'admin_notices', 'easy_ai_chat_embed_display_api_error_notice' ); 