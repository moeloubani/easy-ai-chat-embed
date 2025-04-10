<?php
/**
 * Admin Settings Page
 *
 * @package Easy_AI_Chat_Embed
 * @since 1.0.0
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Define model options (consistent with edit.js)
const EASY_AI_CHAT_EMBED_MODEL_OPTIONS = [
    [ 'value' => '',                        'label' => 'Select a Model' ],
    [ 'value' => 'gpt-4o-mini',             'label' => 'ChatGPT 4.0' ],
    [ 'value' => 'claude-3-7-sonnet-20250219', 'label' => 'Claude Sonnet 3.7' ],
    [ 'value' => 'gemini-2.0-flash-lite',   'label' => 'Google Gemini' ],
];

/**
 * Register the settings page and fields.
 *
 * @since 1.0.0
 * @return void
 */
function easy_ai_chat_embed_register_settings() {
    // Register the main settings group and option name
    register_setting(
        'easy_ai_chat_embed_options_group',    // Option group
        'easy_ai_chat_embed_settings',         // Option name (stores all settings as an array)
        'easy_ai_chat_embed_sanitize_settings' // Sanitization callback
    );

    // Add settings section
    add_settings_section(
        'easy_ai_chat_embed_api_keys_section',
        __( 'API Key Settings', 'easy-ai-chat-embed' ),
        'easy_ai_chat_embed_api_keys_section_callback',
        'easy-ai-chat-embed-settings-page' // Page slug
    );

    // Add API Key fields
    add_settings_field(
        'openai_api_key',
        __( 'OpenAI API Key', 'easy-ai-chat-embed' ),
        'easy_ai_chat_embed_render_api_key_field',
        'easy-ai-chat-embed-settings-page',
        'easy_ai_chat_embed_api_keys_section',
        [ 'key' => 'openai_api_key', 'label_for' => 'openai_api_key' ]
    );
    add_settings_field(
        'anthropic_api_key',
        __( 'Anthropic API Key', 'easy-ai-chat-embed' ),
        'easy_ai_chat_embed_render_api_key_field',
        'easy-ai-chat-embed-settings-page',
        'easy_ai_chat_embed_api_keys_section',
        [ 'key' => 'anthropic_api_key', 'label_for' => 'anthropic_api_key' ]
    );
    add_settings_field(
        'google_api_key',
        __( 'Google AI API Key', 'easy-ai-chat-embed' ),
        'easy_ai_chat_embed_render_api_key_field',
        'easy-ai-chat-embed-settings-page',
        'easy_ai_chat_embed_api_keys_section',
        [ 'key' => 'google_api_key', 'label_for' => 'google_api_key' ]
    );

    // Add Default Settings Section
    add_settings_section(
        'easy_ai_chat_embed_defaults_section',
        __( 'Default Chat Settings', 'easy-ai-chat-embed' ),
        'easy_ai_chat_embed_defaults_section_callback',
        'easy-ai-chat-embed-settings-page'
    );

    // Add Default Model field
    add_settings_field(
        'default_model',
        __( 'Default AI Model', 'easy-ai-chat-embed' ),
        'easy_ai_chat_embed_render_default_model_field',
        'easy-ai-chat-embed-settings-page',
        'easy_ai_chat_embed_defaults_section',
        [ 'label_for' => 'default_model' ]
    );

    // Add Default Initial Prompt field
    add_settings_field(
        'default_initial_prompt',
        __( 'Default Initial Prompt', 'easy-ai-chat-embed' ),
        'easy_ai_chat_embed_render_default_prompt_field',
        'easy-ai-chat-embed-settings-page',
        'easy_ai_chat_embed_defaults_section',
        [ 'label_for' => 'default_initial_prompt' ]
    );

    // Add Default Chatbot Name field
    add_settings_field(
        'default_chatbot_name',
        __( 'Default Chatbot Name', 'easy-ai-chat-embed' ),
        'easy_ai_chat_embed_render_default_chatbot_name_field',
        'easy-ai-chat-embed-settings-page',
        'easy_ai_chat_embed_defaults_section',
        [ 'label_for' => 'default_chatbot_name' ]
    );
}
add_action( 'admin_init', 'easy_ai_chat_embed_register_settings' );

/**
 * Sanitize settings before saving.
 *
 * @since 1.0.0
 * @param array $input Raw input data.
 * @return array Sanitized data.
 */
function easy_ai_chat_embed_sanitize_settings( $input ) {
    $sanitized_input = [];
    $options = get_option( 'easy_ai_chat_embed_settings', [] ); // Get existing options

    // Sanitize API keys (allow empty)
    $sanitized_input['openai_api_key']    = isset( $input['openai_api_key'] ) ? sanitize_text_field( $input['openai_api_key'] ) : '';
    $sanitized_input['anthropic_api_key'] = isset( $input['anthropic_api_key'] ) ? sanitize_text_field( $input['anthropic_api_key'] ) : '';
    $sanitized_input['google_api_key']    = isset( $input['google_api_key'] ) ? sanitize_text_field( $input['google_api_key'] ) : '';

    // Sanitize default model
    $allowed_models = wp_list_pluck( EASY_AI_CHAT_EMBED_MODEL_OPTIONS, 'value' );
    $sanitized_input['default_model'] = isset( $input['default_model'] ) && in_array( $input['default_model'], $allowed_models, true ) 
        ? $input['default_model'] 
        : '';

    // Sanitize default initial prompt (allow empty)
    $sanitized_input['default_initial_prompt'] = isset( $input['default_initial_prompt'] ) 
        ? sanitize_textarea_field( $input['default_initial_prompt'] ) 
        : '';

    // Sanitize default chatbot name (default to 'AIChatBot')
    $sanitized_input['default_chatbot_name'] = isset( $input['default_chatbot_name'] ) && ! empty( trim( $input['default_chatbot_name'] ) )
        ? sanitize_text_field( $input['default_chatbot_name'] )
        : 'AIChatBot'; // Default value if empty or not set

    // Preserve any other existing settings not included in this form
    return array_merge( $options, $sanitized_input );
}

/**
 * Callback for API keys section description.
 *
 * @since 1.0.0
 * @return void
 */
function easy_ai_chat_embed_api_keys_section_callback() {
    echo '<p>' . esc_html__( 'Enter the API keys for the AI services you want to enable.', 'easy-ai-chat-embed' ) . '</p>';
}

/**
 * Callback for defaults section description.
 *
 * @since 1.0.0
 * @return void
 */
function easy_ai_chat_embed_defaults_section_callback() {
    echo '<p>' . esc_html__( 'Set the default model and initial prompt for new chat instances (can be overridden per instance).', 'easy-ai-chat-embed' ) . '</p>';
}

/**
 * Render API Key input field.
 *
 * @since 1.0.0
 * @param array $args Field arguments (contains 'key').
 * @return void
 */
function easy_ai_chat_embed_render_api_key_field( $args ) {
    $options = get_option( 'easy_ai_chat_embed_settings' );
    $key_name = $args['key'];
    $value = isset( $options[ $key_name ] ) ? $options[ $key_name ] : '';
    
    printf(
        '<input type="password" id="%1$s" name="easy_ai_chat_embed_settings[%1$s]" value="%2$s" class="regular-text" />',
        esc_attr( $key_name ),
        esc_attr( $value )
    );
    echo '<p class="description">' . esc_html__( 'Leave blank if not using this service.', 'easy-ai-chat-embed' ) . '</p>';
}

/**
 * Render Default Model select field.
 *
 * @since 1.0.0
 * @return void
 */
function easy_ai_chat_embed_render_default_model_field() {
    $options = get_option( 'easy_ai_chat_embed_settings' );
    $selected_model = isset( $options['default_model'] ) ? $options['default_model'] : '';

    echo '<select id="default_model" name="easy_ai_chat_embed_settings[default_model]">';
    foreach ( EASY_AI_CHAT_EMBED_MODEL_OPTIONS as $model ) {
        printf(
            '<option value="%1$s" %2$s>%3$s</option>',
            esc_attr( $model['value'] ),
            selected( $selected_model, $model['value'], false ),
            esc_html( $model['label'] )
        );
    }
    echo '</select>';
}

/**
 * Render Default Initial Prompt textarea field.
 *
 * @since 1.0.0
 * @return void
 */
function easy_ai_chat_embed_render_default_prompt_field() {
    $options = get_option( 'easy_ai_chat_embed_settings' );
    $value = isset( $options['default_initial_prompt'] ) ? $options['default_initial_prompt'] : '';
    
    echo '<textarea id="default_initial_prompt" name="easy_ai_chat_embed_settings[default_initial_prompt]" rows="5" cols="50" class="large-text code">' . esc_textarea( $value ) . '</textarea>';
    echo '<p class="description">' . esc_html__( 'Optional text prepended to every user prompt to guide the AI by default.', 'easy-ai-chat-embed' ) . '</p>';
}

/**
 * Render Default Chatbot Name input field.
 *
 * @since 1.0.0
 * @return void
 */
function easy_ai_chat_embed_render_default_chatbot_name_field() {
    $options = get_option( 'easy_ai_chat_embed_settings' );
    $value = isset( $options['default_chatbot_name'] ) ? $options['default_chatbot_name'] : 'AIChatBot'; // Default display value
    
    printf(
        '<input type="text" id="default_chatbot_name" name="easy_ai_chat_embed_settings[default_chatbot_name]" value="%s" class="regular-text" />',
        esc_attr( $value )
    );
    echo '<p class="description">' . esc_html__( 'The default name displayed at the top of the chat window.', 'easy-ai-chat-embed' ) . '</p>';
}

/**
 * Render the main settings page HTML.
 *
 * @since 1.0.0
 * @return void
 */
function easy_ai_chat_embed_render_settings_page() {
    ?>
    <div class="wrap">
        <h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
        <form action="options.php" method="post">
            <?php
            // Output security fields for the registered setting group
            settings_fields( 'easy_ai_chat_embed_options_group' );
            // Output the sections and fields for the specified page slug
            do_settings_sections( 'easy-ai-chat-embed-settings-page' );
            // Output submit button
            submit_button( __( 'Save Settings', 'easy-ai-chat-embed' ) );
            ?>
        </form>
    </div>
    <?php
}
