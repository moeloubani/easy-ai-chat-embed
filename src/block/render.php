<?php
/**
 * Server-side rendering of the `simple-ai-chat-embed/chat-embed` block.
 *
 * @package Simple_AI_Chat_Embed
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

echo wp_kses_post(simple_ai_chat_embed_render_block($attributes, $content, $block));