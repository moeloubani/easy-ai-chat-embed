=== Simple AI Chat Embed ===

Contributors: moeloubani1
Tags: chatbot, anthropic, gemini, chatgpt
Requires at least: 6.0
Tested up to: 6.8
Requires PHP: 7.4
Stable tag: 1.0.2
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Embeds an AI-powered chat interface into your WordPress site via Gutenberg block, shortcode, or Elementor widget.

## Description

Simple AI Chat Embed provides a flexible way to add interactive AI chat functionality to your posts, pages, or widget areas. Configure API keys once, select your desired model, and embed the chat using your preferred method.

**Features:**

*   Supports multiple AI providers: OpenAI (GPT models), Anthropic (Claude models), Google (Gemini models).
*   Embed via Gutenberg Block, Shortcode, or Elementor Widget.
*   Global settings page for API Keys and default model/prompt.
*   Override default model and initial system prompt per instance (Block/Elementor).
*   Secure AJAX handling for chat interactions.

## Installation

1.  Upload the `simple-ai-chat-embed` folder to the `/wp-content/plugins/` directory.
2.  Activate the plugin through the 'Plugins' menu in WordPress.
3.  Navigate to **Settings > AI Chat Embed** to configure the API keys and default settings.

## Configuration

Go to **Settings > AI Chat Embed** in your WordPress admin area.

1.  **API Key Settings:** Enter the API keys for the services you wish to use (OpenAI, Anthropic, Google). Leave blank any services you don't plan to use.
2.  **Default Chat Settings:**
    *   **Default AI Model:** Select the AI model to be used by default for new chat instances.
    *   **Default Initial Prompt:** Enter an optional system prompt that will be prepended to user messages by default.
3.  Click **Save Settings**.

## Usage

### Gutenberg Block

1.  Edit a post or page using the Gutenberg editor.
2.  Add a new block and search for "AI Chat Embed".
3.  Select the block to insert it.
4.  In the block sidebar (Inspector Controls), you can:
    *   Select a specific **AI Model** to override the default.
    *   Enter an **Initial System Prompt** to override the default.
5.  Save the post/page.

### Shortcode

Insert the following shortcode into any post, page, or text widget:

`[simple_ai_chat_embed]`

This will use the default model, prompt, and chatbot name configured in the plugin settings.

You can override the defaults using the following attributes:

*   `model`: Specify the AI model ID to use (e.g., `gpt-4`, `claude-3-opus-20240229`).
*   `prompt`: Provide a custom initial system prompt.
*   `name`: Set a custom name for the chatbot.

Example:
`[simple_ai_chat_embed model="gpt-4-turbo" prompt="You are a helpful assistant." name="Support Bot"]`

### Elementor Widget

1.  Edit a page or template using Elementor.
2.  In the widgets panel, search for "AI Chat Embed".
3.  Drag the widget into your desired section/column.
4.  In the widget settings (Content tab):
    *   Select a specific **AI Model** to override the default.
    *   Enter an **Initial System Prompt** to override the default.
5.  Save the page/template.

## Frequently Asked Questions

Where do I get an API key for this plugin?
   * You can find the API keys on the different AI language model websites.   

## Changelog

### 1.0.1
*   Updated bot avatar

### 1.0.0
*   Initial release.
*   Features: Gutenberg block, shortcode, Elementor widget, settings page, OpenAI/Anthropic/Google API integration.

### External Services Notice
This plugin uses external services (OpenAI, Anthropic, Google) to provide AI chat functionality. Data that may be sent
to these services includes user messages, chat history, and any other information necessary for the AI to generate responses.

You can find more information about these services and their privacy and usage policies on their respective websites:

*   [OpenAI](https://openai.com/policies/row-privacy-policy/)
*   [Anthropic](https://privacy.anthropic.com/en/articles/9190861-terms-of-service-updates)
*   [Google](https://support.google.com/gemini/answer/13594961?hl=en#privacy_notice)