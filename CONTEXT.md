# Project Context: Easy AI Chat Embed

This file summarizes the current state of the codebase for context.

**Last Updated:** $(date +%Y-%m-%d %H:%M:%S)

## Goal

Build a WordPress plugin ('Easy AI Chat Embed') to embed an AI chat interface (supporting GPT-4o, Claude 3.7 Sonnet, Gemini 2.0 Flash Lite) via Gutenberg Block, Shortcode, and Elementor Widget. Includes per-instance and global settings (API Keys, default model/prompt).

## Current Status

- Basic plugin structure created (`easy-ai-chat-embed.php`, directories for admin, blocks, includes, src).
- Dependencies installed: `@wordpress/scripts`, `react-chatbot-kit`.
- Gutenberg block (`easy-ai-chat-embed/chat-embed`) structure created:
    - Registered via PHP (`register_block_type` in main plugin file).
    - `block.json` configured with attributes (`selectedModel`, `initialPrompt`, `instanceId`).
    - Basic `edit.js` implemented with InspectorControls for model selection and initial prompt.
    - Basic `save.js` implemented, outputting a div container with data attributes.
    - Basic `style.scss` and `editor.scss` created.
    - Build process (`npm run build`) configured and working.
- Shortcode `[easy_ai_chat_embed]` implemented:
    - Registered via PHP (`add_shortcode` in main plugin file).
    - Handler function enqueues assets and outputs the container div.
- Frontend assets (`frontend.js`, `frontend.css`):
    - Enqueued conditionally via block `render_callback` and shortcode handler.
    - `wp_localize_script` passes `ajaxUrl` and `nonce` to `frontend.js` via `easyAiChatEmbedData` object.
- Elementor Widget created (`includes/elementor/widget.php`):
    - Registered conditionally via `includes/elementor/loader.php`.
    - Provides controls for model selection and initial prompt.
    - Renders the necessary container div with `easy-ai-chat-embed-instance` class.
    - Enqueues/localizes scripts directly in render method (potential improvement area identified).
- Admin Settings page created (`admin/settings.php`):
    - Registered under Settings menu.
    - Uses Settings API to register `easy_ai_chat_embed_settings` option.
    - Includes fields for API keys (OpenAI, Anthropic, Google) and default model/prompt.
    - Basic sanitization callback implemented.

## Key Files State

### `easy-ai-chat-embed.php`

```php
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
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Define constants
define( 'EASY_AI_CHAT_EMBED_VERSION', '1.0.0' );
define( 'EASY_AI_CHAT_EMBED_PATH', plugin_dir_path( __FILE__ ) );
define( 'EASY_AI_CHAT_EMBED_URL', plugin_dir_url( __FILE__ ) );

// Include necessary files
require_once EASY_AI_CHAT_EMBED_PATH . 'includes/api/handler.php';
require_once EASY_AI_CHAT_EMBED_PATH . 'admin/settings.php'; // Include admin settings
// TODO: Include other files (admin settings, Elementor widget)

/**
 * Register the Gutenberg block.
 */
function easy_ai_chat_embed_register_block() {
	register_block_type(
		EASY_AI_CHAT_EMBED_PATH . 'blocks/chat-embed',
		[
			'render_callback' => 'easy_ai_chat_embed_render_block',
		]
	);
}
add_action( 'init', 'easy_ai_chat_embed_register_block' );

/**
 * Register the shortcode.
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
 * @param array    $attributes Block attributes.
 * @param string   $content    Block default content.
 * @param WP_Block $block      Block instance.
 * @return string Block HTML content.
 */
function easy_ai_chat_embed_render_block( $attributes, $content, $block ) {
	// Enqueue assets...
	$script_asset_path = EASY_AI_CHAT_EMBED_PATH . "build/frontend.asset.php";
	if ( file_exists( $script_asset_path ) ) {
		$script_asset = require $script_asset_path;
		wp_enqueue_script( /* ... */ );
    // Enqueue style (checking frontend.css / style-frontend.css)
    // ... wp_enqueue_style() ...

    // Pass data to script
    wp_localize_script(
      'easy-ai-chat-embed-frontend',
      'easyAiChatEmbedData',
      [
        'ajaxUrl' => admin_url( 'admin-ajax.php' ),
        'nonce'   => wp_create_nonce( 'easy_ai_chat_embed_nonce' ),
        'attributes' => $attributes, // Pass block attributes
      ]
    );
	} else {
    error_log( /* ... */ );
  }
  // Return the block's saved content ($content)
  return $content;
}

/**
 * Handler function for the [easy_ai_chat_embed] shortcode.
 *
 * Enqueues assets and returns the HTML container.
 *
 * @param array $atts Shortcode attributes.
 * @return string HTML content for the shortcode.
 */
function easy_ai_chat_embed_shortcode_handler( $atts ) {
    $atts = array_change_key_case( (array) $atts, CASE_LOWER );
    // TODO: Process $atts to override defaults
    $settings = get_option( 'easy_ai_chat_embed_settings', [] );
    $default_model = $settings['default_model'] ?? '';
    $default_prompt = $settings['default_initial_prompt'] ?? '';
    // ... Enqueue assets ...
    $script_asset_path = EASY_AI_CHAT_EMBED_PATH . "build/frontend.asset.php";
    if ( file_exists( $script_asset_path ) ) {
        $script_asset = require $script_asset_path;
        wp_enqueue_script( /* ... */ );
        // Enqueue style (checking frontend.css / style-frontend.css)
        // ... wp_enqueue_style() ...

        // Pass data to script
        wp_localize_script(
            'easy-ai-chat-embed-frontend',
            'easyAiChatEmbedData',
            [
                'ajaxUrl' => admin_url( 'admin-ajax.php' ),
                'nonce'   => wp_create_nonce( /* ... */ ),
                'defaultModel' => $default_model, // Pass defaults
                'defaultPrompt' => $default_prompt,
            ]
        );
    } else { /* ... error log ... */ }
    return '<div id="easy-ai-chat-embed-root"></div>';
}

// Add Admin Menu item (hooked to admin_menu)
function easy_ai_chat_embed_add_admin_menu() {
    add_options_page( /* ... */ );
}
add_action( 'admin_menu', 'easy_ai_chat_embed_add_admin_menu' );

// Maybe load Elementor integration (hooked to plugins_loaded)
function easy_ai_chat_embed_maybe_load_elementor() {
    if ( did_action( 'elementor/loaded' ) && class_exists('\Elementor\Widget_Base') ) {
        require_once EASY_AI_CHAT_EMBED_PATH . 'includes/elementor/loader.php';
    }
}
add_action( 'plugins_loaded', 'easy_ai_chat_embed_maybe_load_elementor' );

?>
```

### `blocks/chat-embed/block.json`

```json
{
	"$schema": "https://schemas.wp.org/trunk/block.json",
	"apiVersion": 3,
	"name": "easy-ai-chat-embed/chat-embed",
	"version": "0.1.0",
	"title": "AI Chat Embed",
	"category": "widgets",
	"icon": "format-chat",
	"description": "Embeds an AI-powered chat interface (ChatGPT, Claude, Gemini).",
	"keywords": [ "chat", "ai", "chatbot", "gpt", "claude", "gemini" ],
	"supports": {
		"html": false
	},
	"attributes": {
		"selectedModel": {
			"type": "string",
			"default": ""
		},
		"initialPrompt": {
			"type": "string",
			"default": ""
		},
    "instanceId": {
      "type": "string"
    }
	},
	"textdomain": "easy-ai-chat-embed",
	"editorScript": "file:./index.js",
	"editorStyle": "file:./index.css",
	"style": "file:./style-index.css",
  "render": "file:../render.php" // Using render_callback in main file instead
}
```
*Note: The `render` property in `block.json` might not be strictly necessary if using `render_callback` during registration, but is kept for clarity.* 

### `blocks/chat-embed/edit.js`

```javascript
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextareaControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import './editor.scss'; // We might add editor-specific styles later

// Define the available models
const modelOptions = [
	{ label: __( 'Select a Model', 'easy-ai-chat-embed' ), value: '' },
	{ label: 'ChatGPT 4o', value: 'gpt-4o' },
	{ label: 'Claude 3.7 Sonnet', value: 'claude-3-7-sonnet-20250219' },
	{ label: 'Gemini 2.0 Flash Lite', value: 'gemini-2.0-flash-lite' },
];

export default function Edit( { attributes, setAttributes, clientId } ) {
	const blockProps = useBlockProps();
	const { selectedModel, initialPrompt, instanceId } = attributes;

	useEffect( () => {
		if ( ! instanceId ) {
			setAttributes( { instanceId: `eace-${clientId}` } );
		}
	}, [ clientId, instanceId, setAttributes ] );

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody title={ __( 'AI Model Settings', 'easy-ai-chat-embed' ) }>
					<SelectControl
						label={ __( 'Select AI Model', 'easy-ai-chat-embed' ) }
						value={ selectedModel }
						options={ modelOptions }
						onChange={ ( newModel ) =>
							setAttributes( { selectedModel: newModel } )
						}
					/>
					<TextareaControl
						label={ __( 'Initial System Prompt', 'easy-ai-chat-embed' ) }
						help={ __( 'Optional text prepended to every user prompt to guide the AI.', 'easy-ai-chat-embed' ) }
						value={ initialPrompt }
						onChange={ ( newPrompt ) =>
							setAttributes( { initialPrompt: newPrompt } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<p>
				{ __( 'AI Chat Embed Placeholder - Configure in sidebar.', 'easy-ai-chat-embed' ) }
			</p>
		</div>
	);
}
```

### `blocks/chat-embed/save.js`

```javascript
import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const blockProps = useBlockProps.save();
	const { selectedModel, initialPrompt, instanceId } = attributes;

	return (
		<div
			{ ...blockProps }
			data-selected-model={ selectedModel }
			data-initial-prompt={ initialPrompt }
			data-instance-id={ instanceId }
		>
      <noscript>
        { __( 'Please enable JavaScript to use the AI Chat.', 'easy-ai-chat-embed' ) }
      </noscript>
		</div>
	);
}
```

### `src/frontend.js`

```javascript
// ... (Imports: domReady, createRoot/render, Chatbot, CSS, config, MessageParser, ActionProvider)

domReady( () => {
  // Selector targets block instances OR the shortcode's root div
	const chatContainers = document.querySelectorAll(
		'.easy-ai-chat-embed-instance, #easy-ai-chat-embed-root'
	);

	const useCreateRoot = typeof createRoot === 'function'; // WP 6.2+

	chatContainers.forEach( ( container ) => {
    // Determine if it's a block or shortcode and get data
    const isBlock = container.classList.contains('wp-block-easy-ai-chat-embed-chat-embed');
    const isShortcode = container.id === 'easy-ai-chat-embed-root';

    let selectedModel, initialPrompt, instanceId;

    if (isBlock) {
		  ({ selectedModel, initialPrompt, instanceId } = container.dataset);
    } else if (isShortcode) {
      selectedModel = window.easyAiChatEmbedData?.defaultModel || ''; // Use localized default
      initialPrompt = window.easyAiChatEmbedData?.defaultPrompt || ''; // Use localized default
      instanceId = /* ... generate ID ... */;
      // ... (Set dataset)
    } else { return; }

		// Basic validation (ensure model & ID exist)
		if ( ! instanceId || ! selectedModel ) {
			console.error( /* ... */ );
			container.innerHTML = '<p>Error: Chatbot configuration missing.</p>';
			return;
		}

    // Get AJAX info from localized data
		const ajaxUrl = window.easyAiChatEmbedData?.ajaxUrl;
		const nonce = window.easyAiChatEmbedData?.nonce;

    // Setup chatbot props
		const chatbotProps = {
			config: config(instanceId, initialPrompt, selectedModel),
			messageParser: MessageParser,
			actionProvider: ActionProvider(ajaxUrl, nonce), // Pass AJAX info
		};

		container.innerHTML = ''; // Clear placeholder

		// Render the chatbot using createRoot or render
    const chatElement = <div className="easy-ai-chat-widget-container"><Chatbot { ...chatbotProps } /></div>;
    if ( useCreateRoot ) {
			createRoot( container ).render( chatElement );
		} else {
			render( chatElement, container );
		}
	} );
} );
```

### `src/chatbot/config.js`

```javascript
import { createChatBotMessage } from 'react-chatbot-kit';

const botName = 'AIChatBot';

const config = (instanceId, initialPrompt, selectedModel) => ({
  botName: botName,
  lang: 'en',
  initialMessages: [
    createChatBotMessage(/* ... initial greeting ... */)
  ],
  state: {
    instanceId: instanceId,
    initialPrompt: initialPrompt,
    selectedModel: selectedModel,
  },
  // ... (widgets, custom components, styles)
});

export default config;
```

### `src/chatbot/MessageParser.js`

```javascript
class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    // Simple parsing: send the message directly to the action provider
    this.actionProvider.handleUserMessage(message, this.state);
  }
}

export default MessageParser;
```

### `src/chatbot/ActionProvider.js`

```javascript
import { createClientMessage, createChatBotMessage } from 'react-chatbot-kit';

// Factory function to create the ActionProvider instance
const ActionProvider = (ajaxUrl, nonce) => {
  const apiUrl = ajaxUrl;
  const apiNonce = nonce;

  // Inner function receives chatbot utilities
  return (createChatBotMessage, setStateFunc, createCustomMessage) => {

    const handleUserMessage = async (userMessage, state) => {
      // Display thinking message
      // Prepare data (action hook, nonce, message, state data)
      // Make fetch request to apiUrl
      // Handle response (success/error)
      // Update state with response or error message
      // ... (AJAX call logic as implemented)
    };

    // Helper to add message to state
    const addMessageToState = (message) => { /* ... */ };

    // Helper to remove last message
    const removeLastMessage = () => { /* ... */ };

    // Return action methods
    return {
      handleUserMessage,
    };
  };
};

export default ActionProvider;
```

### `package.json` (Relevant parts)

```json
{
  // ... (name, version, etc.)
  "scripts": {
    "build": "wp-scripts build src/frontend.js blocks/chat-embed/index.js --output-path=build",
    // ... other scripts
    "start": "wp-scripts start src/frontend.js blocks/chat-embed/index.js --output-path=build"
  },
  "devDependencies": {
    "@wordpress/scripts": "^28.6.0"
  },
  "dependencies": {
    "react-chatbot-kit": "^2.2.2"
  }
}
```
*Note: Build scripts updated to include `src/frontend.js` as an entry point.* 

## Next Steps (High Level)

1.  **Frontend Chat Logic:** Implement `react-chatbot-kit`'s `MessageParser` and `ActionProvider` in `src/chatbot/` to handle user input and AJAX calls to the backend API handler. Configure the chatbot's appearance and initial state in `src/chatbot/config.js`.
2.  **Backend API Handler:** Implement the PHP logic in `includes/api/handler.php` to verify nonce, receive messages, interact with AI APIs (using saved keys), and return responses.
3.  **Admin Settings:** Build the admin page to save API keys and default settings.
4.  **Elementor Widget:** Create the Elementor widget.
5.  **Refinement:** Styling, error handling, security hardening, i18n. 

### `includes/api/handler.php`

```php
<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) exit;

// AJAX Handler function (hooked to wp_ajax_ / wp_ajax_nopriv_)
function easy_ai_chat_embed_ajax_send_message() {
    // 1. Verify nonce
    if ( ! wp_verify_nonce( /* ... */ ) ) { /* ... error ... */ }

    // Add Capability Check
    if ( ! current_user_can( 'edit_posts' ) ) {
        wp_send_json_error( /* ... permission error ... */ );
    }

    // 2. Retrieve saved settings
    $settings = get_option( /* ... */ );

    // 3. Sanitize incoming data (message, selectedModel, initialPrompt, instanceId)
    $user_message    = sanitize_textarea_field( $_POST['message'] ?? '' );
    $selected_model  = sanitize_text_field( $_POST['selectedModel'] ?? '' );
    $initial_prompt  = sanitize_textarea_field( $_POST['initialPrompt'] ?? '' );
    $instance_id     = sanitize_text_field( $_POST['instanceId'] ?? '' );
    // TODO: Handle history

    // Basic validation
    if ( /* ... missing required data ... */ ) {
        wp_send_json_error( /* ... */ );
    }

    // 4. Get API key based on model
    $api_key = '';
    if ( strpos( $selected_model, 'gpt-' ) === 0 && ! empty( $settings['openai_api_key'] ) ) {
        $api_key = $settings['openai_api_key'];
    } elseif ( /* ... claude ... */ ) {
        // ... get anthropic key ...
    } elseif ( /* ... gemini ... */ ) {
        // ... get google key ...
    }

    // 5. Check if key exists
    if ( empty( $api_key ) ) {
        wp_send_json_error( /* ... */ );
    }

    // 6. Placeholder for actual API call
    // Call the appropriate helper function based on the model
    try {
        $ai_response = '';
        $error = null;

        if ( strpos( $selected_model, 'gpt-' ) === 0 ) {
            $ai_response = easy_ai_chat_embed_call_openai( $api_key, $user_message, $initial_prompt, $selected_model );
        } elseif ( /* ... other models ... */ ) {
            // ... call other helpers ...
        } else {
            $error = new WP_Error(/* ... */);
        }

        // Check for errors from helpers or unsupported model
        if ( is_wp_error( $ai_response ) ) { /* ... */ }
        elseif ( $error ) { /* ... */ }
        elseif ( empty( $ai_response ) && !$error ) { /* ... */ }

        // Handle errors
        if ( $error ) {
            throw new Exception( $error->get_error_message() );
        }

        // Send successful response
        wp_send_json_success( [ 'message' => $ai_response ] );

    } catch ( Exception $e ) {
        wp_send_json_error( [ 'message' => /* ... error message ... */ ], 500 );
    }

    wp_die(); // Safety exit
}
add_action( 'wp_ajax_easy_ai_chat_embed_send_message', 'easy_ai_chat_embed_ajax_send_message' );
// Note: wp_ajax_nopriv_ action removed for security.

// Placeholder functions for specific API calls
function easy_ai_chat_embed_call_openai( $api_key, $user_message, $initial_prompt, $selected_model, $history = [] ) {
    $api_endpoint = 'https://api.openai.com/v1/chat/completions';
    $messages = [];
    if ( ! empty( $initial_prompt ) ) { $messages[] = [ 'role' => 'system', 'content' => $initial_prompt ]; }
    // TODO: Add history
    $messages[] = [ 'role' => 'user', 'content' => $user_message ];

    $request_body = json_encode( [ 'model' => $selected_model, 'messages' => $messages ] );
    if ( /* JSON error */ ) { return new WP_Error(/* ... */); }

    $request_args = [
        'method'  => 'POST',
        'headers' => [ 'Content-Type' => 'application/json', 'Authorization' => 'Bearer ' . $api_key ],
        'body'    => $request_body,
        'timeout' => 60,
    ];

    $response = wp_remote_post( $api_endpoint, $request_args );

    if ( is_wp_error( $response ) ) { return new WP_Error(/* ... */); }

    $response_code = wp_remote_retrieve_response_code( $response );
    $response_body = wp_remote_retrieve_body( $response );
    $result = json_decode( $response_body, true );

    if ( $response_code !== 200 ) { return new WP_Error(/* ... API error ... */); }
    if ( /* JSON decode error */ ) { return new WP_Error(/* ... */); }

    if ( ! empty( $result['choices'][0]['message']['content'] ) ) {
        return trim( $result['choices'][0]['message']['content'] );
    } else {
        return new WP_Error(/* ... empty response ... */);
    }
}
function easy_ai_chat_embed_call_anthropic( $api_key, $user_message, $initial_prompt, $selected_model, $history = [] ) {
    $api_endpoint = 'https://api.anthropic.com/v1/messages';
    $anthropic_version = '2023-06-01';
    $messages = [];
    // TODO: Add history
    $messages[] = [ 'role' => 'user', 'content' => $user_message ];

    $request_data = [
        'model' => $selected_model,
        'messages' => $messages,
        'max_tokens' => 1024,
    ];
    if ( ! empty( $initial_prompt ) ) { $request_data['system'] = $initial_prompt; }

    $request_body = json_encode( $request_data );
    if ( /* JSON error */ ) { return new WP_Error(/* ... */); }

    $request_args = [
        'method'  => 'POST',
        'headers' => [
            'x-api-key'        => $api_key,
            'anthropic-version' => $anthropic_version,
            'Content-Type'     => 'application/json',
        ],
        'body'    => $request_body,
        'timeout' => 60,
    ];

    $response = wp_remote_post( $api_endpoint, $request_args );

    if ( is_wp_error( $response ) ) { return new WP_Error(/* ... */); }

    $response_code = wp_remote_retrieve_response_code( $response );
    $response_body = wp_remote_retrieve_body( $response );
    $result = json_decode( $response_body, true );

    if ( $response_code !== 200 ) { return new WP_Error(/* ... API error ... */); }
    if ( /* JSON decode error */ ) { return new WP_Error(/* ... */); }

    if ( ! empty( $result['content'][0]['text'] ) ) {
        return trim( $result['content'][0]['text'] );
    } else {
        return new WP_Error(/* ... empty/unexpected response ... */);
    }
}
function easy_ai_chat_embed_call_google( $api_key, $user_message, $initial_prompt, $selected_model, $history = [] ) {
    $model_name = 'gemini-1.5-pro'; // TODO: Use actual model
    $api_endpoint = sprintf('https://generativelanguage.googleapis.com/v1beta/models/%s:generateContent?key=%s', $model_name, $api_key);
    $contents = [];
    // TODO: Add history
    $current_message_content = ( ! empty( $initial_prompt ) && empty( $history ) ? $initial_prompt . "\n\n" : '' ) . $user_message;
    $contents[] = [ 'role' => 'user', 'parts' => [ [ 'text' => $current_message_content ] ] ];

    $request_body = json_encode( [ 'contents' => $contents ] );
    if ( /* JSON error */ ) { return new WP_Error(/* ... */); }

    $request_args = [
        'method'  => 'POST',
        'headers' => [ 'Content-Type' => 'application/json' ],
        'body'    => $request_body,
        'timeout' => 60,
    ];

    $response = wp_remote_post( $api_endpoint, $request_args );

    if ( is_wp_error( $response ) ) { return new WP_Error(/* ... */); }

    $response_code = wp_remote_retrieve_response_code( $response );
    $response_body = wp_remote_retrieve_body( $response );
    $result = json_decode( $response_body, true );

    if ( $response_code !== 200 ) { return new WP_Error(/* ... API error ... */); }
    if ( /* JSON decode error */ ) { return new WP_Error(/* ... */); }

    if ( isset( $result['candidates'][0]['content']['parts'][0]['text'] ) ) {
        return trim( $result['candidates'][0]['content']['parts'][0]['text'] );
    } elseif (isset($result['candidates'][0]['finishReason']) && $result['candidates'][0]['finishReason'] !== 'STOP') {
        return new WP_Error(/* ... blocked response ... */);
    } else {
        return new WP_Error(/* ... empty/unexpected response ... */);
    }
}

?>
```

### `admin/settings.php`

```php
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
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Define constants
define( 'EASY_AI_CHAT_EMBED_VERSION', '1.0.0' );
define( 'EASY_AI_CHAT_EMBED_PATH', plugin_dir_path( __FILE__ ) );
define( 'EASY_AI_CHAT_EMBED_URL', plugin_dir_url( __FILE__ ) );

// Include necessary files
require_once EASY_AI_CHAT_EMBED_PATH . 'includes/api/handler.php';
require_once EASY_AI_CHAT_EMBED_PATH . 'admin/settings.php'; // Include admin settings
// TODO: Include other files (admin settings, Elementor widget)

/**
 * Register the Gutenberg block.
 */
function easy_ai_chat_embed_register_block() {
	register_block_type(
		EASY_AI_CHAT_EMBED_PATH . 'blocks/chat-embed',
		[
			'render_callback' => 'easy_ai_chat_embed_render_block',
		]
	);
}
add_action( 'init', 'easy_ai_chat_embed_register_block' );

/**
 * Register the shortcode.
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
 * @param array    $attributes Block attributes.
 * @param string   $content    Block default content.
 * @param WP_Block $block      Block instance.
 * @return string Block HTML content.
 */
function easy_ai_chat_embed_render_block( $attributes, $content, $block ) {
	// Enqueue assets...
	$script_asset_path = EASY_AI_CHAT_EMBED_PATH . "build/frontend.asset.php";
	if ( file_exists( $script_asset_path ) ) {
		$script_asset = require $script_asset_path;
		wp_enqueue_script( /* ... */ );
    // Enqueue style (checking frontend.css / style-frontend.css)
    // ... wp_enqueue_style() ...

    // Pass data to script
    wp_localize_script(
      'easy-ai-chat-embed-frontend',
      'easyAiChatEmbedData',
      [
        'ajaxUrl' => admin_url( 'admin-ajax.php' ),
        'nonce'   => wp_create_nonce( 'easy_ai_chat_embed_nonce' ),
        'attributes' => $attributes, // Pass block attributes
      ]
    );
	} else {
    error_log( /* ... */ );
  }
  // Return the block's saved content ($content)
  return $content;
}

/**
 * Handler function for the [easy_ai_chat_embed] shortcode.
 *
 * Enqueues assets and returns the HTML container.
 *
 * @param array $atts Shortcode attributes.
 * @return string HTML content for the shortcode.
 */
function easy_ai_chat_embed_shortcode_handler( $atts ) {
    $atts = array_change_key_case( (array) $atts, CASE_LOWER );
    // TODO: Process $atts to override defaults
    $settings = get_option( 'easy_ai_chat_embed_settings', [] );
    $default_model = $settings['default_model'] ?? '';
    $default_prompt = $settings['default_initial_prompt'] ?? '';
    // ... Enqueue assets ...
    $script_asset_path = EASY_AI_CHAT_EMBED_PATH . "build/frontend.asset.php";
    if ( file_exists( $script_asset_path ) ) {
        $script_asset = require $script_asset_path;
        wp_enqueue_script( /* ... */ );
        // Enqueue style (checking frontend.css / style-frontend.css)
        // ... wp_enqueue_style() ...

        // Pass data to script
        wp_localize_script(
            'easy-ai-chat-embed-frontend',
            'easyAiChatEmbedData',
            [
                'ajaxUrl' => admin_url( 'admin-ajax.php' ),
                'nonce'   => wp_create_nonce( /* ... */ ),
                'defaultModel' => $default_model, // Pass defaults
                'defaultPrompt' => $default_prompt,
            ]
        );
    } else { /* ... error log ... */ }
    return '<div id="easy-ai-chat-embed-root"></div>';
}

// Add Admin Menu item (hooked to admin_menu)
function easy_ai_chat_embed_add_admin_menu() {
    add_options_page( /* ... */ );
}
add_action( 'admin_menu', 'easy_ai_chat_embed_add_admin_menu' );

?>
```

### `includes/elementor/widget.php`

```php
<?php
namespace Easy_AI_Chat_Embed\Includes\Elementor;

if ( ! defined( 'ABSPATH' ) ) exit;

class Easy_AI_Chat_Embed_Elementor_Widget extends \Elementor\Widget_Base {

    public function get_name() { return 'easy-ai-chat-embed'; }
    public function get_title() { return __( 'AI Chat Embed', /* ... */ ); }
    public function get_icon() { return 'eicon-chat'; }
    public function get_categories() { return [ 'general' ]; }
    public function get_keywords() { return [ 'chat', 'ai', /* ... */ ]; }

    protected function _register_controls() {
        $this->start_controls_section( /* ... */ );
        // Control for selected_model (SELECT)
        $this->add_control( 'selected_model', [ /* ... */ ] );
        // Control for initial_prompt (TEXTAREA)
        $this->add_control( 'initial_prompt', [ /* ... */ ] );
        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        $global_settings = get_option( 'easy_ai_chat_embed_settings', [] );

        // Determine final model/prompt (widget setting > global default)
        $selected_model = ! empty( $settings['selected_model'] ) ? $settings['selected_model'] : ( $global_settings['default_model'] ?? '' );
        $initial_prompt = ! empty( $settings['initial_prompt'] ) ? $settings['initial_prompt'] : ( $global_settings['default_initial_prompt'] ?? '' );
        $instance_id = 'eace-elementor-' . $this->get_id();

        // Enqueue and localize scripts directly (potential improvement needed)
        $script_asset_path = EASY_AI_CHAT_EMBED_PATH . "build/frontend.asset.php";
        if ( file_exists( $script_asset_path ) ) {
            // ... wp_enqueue_script()
            // ... wp_enqueue_style()
            // ... wp_localize_script() - Caution: may conflict if multiple instances
        }

        // Output container div
        printf(
            '<div id="%s" class="easy-ai-chat-embed-instance" data-selected-model="%s" data-initial-prompt="%s" data-instance-id="%s"></div>',
            esc_attr( $instance_id ),
            esc_attr( $selected_model ),
            esc_attr( $initial_prompt ),
            esc_attr( $instance_id )
        );
    }
}
```

### `includes/elementor/loader.php`

```php
<?php
if ( ! defined( 'ABSPATH' ) ) exit;

function easy_ai_chat_embed_register_elementor_widget( $widgets_manager ) {
	require_once EASY_AI_CHAT_EMBED_PATH . 'includes/elementor/widget.php';
	$widgets_manager->register( new \Easy_AI_Chat_Embed\Includes\Elementor\Easy_AI_Chat_Embed_Elementor_Widget() );
}
add_action( 'elementor/widgets/register', 'easy_ai_chat_embed_register_elementor_widget' );

?>