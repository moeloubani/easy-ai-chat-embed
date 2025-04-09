# Easy AI Chat Embed

**Contributors:** Your Name or Company
**Tags:** chat, chatbot, ai, artificial intelligence, gpt, openai, claude, anthropic, gemini, google, gutenberg, block, shortcode, elementor
**Requires at least:** 6.0
**Tested up to:** 6.5
**Requires PHP:** 7.4
**Stable tag:** 1.0.0
**License:** GPLv2 or later
**License URI:** https://www.gnu.org/licenses/gpl-2.0.html

Embeds an AI-powered chat interface (supporting OpenAI, Anthropic, and Google models) into your WordPress site via Gutenberg block, shortcode, or Elementor widget.

## Description

Easy AI Chat Embed provides a flexible way to add interactive AI chat functionality to your posts, pages, or widget areas. Configure API keys once, select your desired model, and embed the chat using your preferred method.

**Features:**

*   Supports multiple AI providers: OpenAI (GPT models), Anthropic (Claude models), Google (Gemini models).
*   Embed via Gutenberg Block, Shortcode, or Elementor Widget.
*   Global settings page for API Keys and default model/prompt.
*   Override default model and initial system prompt per instance (Block/Elementor).
*   Secure AJAX handling for chat interactions.

## Installation

1.  Upload the `easy-ai-chat-embed` folder to the `/wp-content/plugins/` directory.
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

`[easy_ai_chat_embed]`

This will use the default model and prompt configured in the plugin settings.

*(Note: Currently, overriding settings via shortcode attributes is not implemented.)*

### Elementor Widget

1.  Edit a page or template using Elementor.
2.  In the widgets panel, search for "AI Chat Embed".
3.  Drag the widget into your desired section/column.
4.  In the widget settings (Content tab):
    *   Select a specific **AI Model** to override the default.
    *   Enter an **Initial System Prompt** to override the default.
5.  Save the page/template.

## Frequently Asked Questions

*   **(Add relevant FAQs here if any)**

## Changelog

### 1.0.0
*   Initial release.
*   Features: Gutenberg block, shortcode, Elementor widget, settings page, OpenAI/Anthropic/Google API integration.

## TODO / Future Enhancements

*   Implement conversation history handling.
*   Allow overriding settings via shortcode attributes.
*   Refine styling and theme compatibility.
*   Add option for users to select model on the frontend (if desired).
*   Improve asset enqueuing logic for multiple instances.
*   Add more robust error display options.
*   Add unit/integration tests.
