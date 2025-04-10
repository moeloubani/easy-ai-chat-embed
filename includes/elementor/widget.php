<?php
/**
 * Elementor AI Chat Embed Widget
 *
 * @package Easy_AI_Chat_Embed\Includes\Elementor
 */

namespace Easy_AI_Chat_Embed\Includes\Elementor;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Elementor Widget Class.
 */
class Easy_AI_Chat_Embed_Elementor_Widget extends \Elementor\Widget_Base {

    /**
     * Constructor.
     *
     * @param array $data Widget data.
     * @param array $args Widget arguments.
     */
    public function __construct( $data = [], $args = null ) {
        error_log('Easy AI Chat Embed: Widget class constructor called');
        parent::__construct( $data, $args );
    }

    /**
     * Get widget name.
     */
    public function get_name() {
        return 'easy-ai-chat-embed';
    }

    /**
     * Get widget title.
     */
    public function get_title() {
        return __( 'AI Chat Embed', 'easy-ai-chat-embed' );
    }

    /**
     * Get widget icon.
     */
    public function get_icon() {
        return 'eicon-comments'; // Robot icon for AI chat
    }

    /**
     * Get widget categories.
     */
    public function get_categories() {
        return [ 'general' ]; // Or create a custom category
    }

    /**
     * Get widget keywords.
     */
    public function get_keywords() {
        return [ 'chat', 'ai', 'chatbot', 'gpt', 'claude', 'gemini', 'embed' ];
    }

    /**
     * Register widget controls.
     */
    protected function register_controls() {
        error_log('Easy AI Chat Embed: Registering widget controls');

        $this->start_controls_section(
            'content_section',
            [
                'label' => __( 'Chat Settings', 'easy-ai-chat-embed' ),
                'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
            ]
        );

        // Get model options similar to the block editor
        // We might need to fetch these dynamically or redefine them here
        $model_options_raw = [
            [ 'value' => '', 'label' => __( 'Use Default Model', 'easy-ai-chat-embed' ) ],
            [ 'value' => 'gpt-4o-mini', 'label' => 'ChatGPT 4.0' ],
            [ 'value' => 'claude-3-7-sonnet-20250219', 'label' => 'Claude Sonnet 3.7' ],
            [ 'value' => 'gemini-2.0-flash-lite', 'label' => 'Google Gemini' ],
        ];
        $model_options = wp_list_pluck( $model_options_raw, 'label', 'value' );

        $this->add_control(
            'selected_model',
            [
                'label'   => __( 'Select AI Model', 'easy-ai-chat-embed' ),
                'type'    => \Elementor\Controls_Manager::SELECT,
                'default' => '', // Default to using the global setting
                'options' => $model_options,
                'description' => __( 'Overrides the default model set in global settings.', 'easy-ai-chat-embed' ),
            ]
        );

        $this->add_control(
            'initial_prompt',
            [
                'label'       => __( 'Initial System Prompt', 'easy-ai-chat-embed' ),
                'type'        => \Elementor\Controls_Manager::TEXTAREA,
                'rows'        => 4,
                'default'     => '', // Default to using the global setting or empty
                'placeholder' => __( 'Enter optional initial prompt...', 'easy-ai-chat-embed' ),
                'description' => __( 'Overrides the default initial prompt set in global settings.', 'easy-ai-chat-embed' ),
            ]
        );

        $this->add_control(
            'chatbot_name',
            [
                'label'       => __( 'Chatbot Name', 'easy-ai-chat-embed' ),
                'type'        => \Elementor\Controls_Manager::TEXT,
                'default'     => '', // Default to using the global setting
                'placeholder' => __( 'Enter optional chatbot name...', 'easy-ai-chat-embed' ),
                'description' => __( 'The name displayed at the top of the chat window. Overrides the default.', 'easy-ai-chat-embed' ),
            ]
        );

        $this->end_controls_section();
    }

    /**
     * Render widget output on the frontend.
     */
    protected function render() {
        $settings = $this->get_settings_for_display();

        // Get global settings for defaults
        $global_settings = get_option( 'easy_ai_chat_embed_settings', [] );
        $default_model = $global_settings['default_model'] ?? '';
        $default_prompt = $global_settings['default_initial_prompt'] ?? '';
        $default_chatbot_name = $global_settings['default_chatbot_name'] ?? 'AIChatBot';

        // Determine the final model, prompt, and name to use
        $selected_model = ! empty( $settings['selected_model'] ) ? $settings['selected_model'] : $default_model;
        $initial_prompt = ! empty( $settings['initial_prompt'] ) ? $settings['initial_prompt'] : $default_prompt;
        $chatbot_name = ! empty( $settings['chatbot_name'] ) ? $settings['chatbot_name'] : $default_chatbot_name;

        // Generate a unique ID for this instance
        $instance_id = 'eace-elementor-' . $this->get_id();

        // Enqueue assets directly using the new function
        if (function_exists('easy_ai_chat_embed_enqueue_assets')) {
            easy_ai_chat_embed_enqueue_assets();
        }

        // Output the container div for the React app to mount
        // Ensure it has the common class and all necessary data attributes
        printf(
            '<div id="%s" class="easy-ai-chat-embed-instance" data-selected-model="%s" data-initial-prompt="%s" data-instance-id="%s" data-chatbot-name="%s" data-is-elementor="true" data-eace-current-instance="%s"><noscript>%s</noscript></div>',
            esc_attr( $instance_id ), // Use the unique ID as the element ID
            esc_attr( $selected_model ),
            esc_attr( $initial_prompt ),
            esc_attr( $instance_id ),
            esc_attr( $chatbot_name ), // Add chatbot name
            esc_attr( $instance_id ), // Add the data-eace-current-instance attribute
            esc_html__( 'This chat interface requires JavaScript to be enabled.', 'easy-ai-chat-embed' ) // Add noscript
        );
    }

    /**
     * Render widget output in the editor (optional plain content template).
     *
     * Provides a basic visual representation in the Elementor editor.
     */
    // protected function _content_template() { ... }
    // Or simply rely on the live render preview
}