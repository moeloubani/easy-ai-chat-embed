/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @param {Object} props            Properties passed to the function.
 * @param {Object} props.attributes Available block attributes.
 * @return {Element} Element to render.
 */
export default function save( { attributes } ) {
	const blockProps = useBlockProps.save();
	const { selectedModel, initialPrompt, instanceId } = attributes;

	// Combine blockProps className with our specific instance class
	const divClass = `${ blockProps.className ? blockProps.className + ' ' : '' }easy-ai-chat-embed-instance`;

	// We render a simple div container. The actual chat interface
	// will be mounted client-side by a separate script that finds this div.
	return (
		<div
			{ ...blockProps }
			className={ divClass }
			data-selected-model={ selectedModel }
			data-initial-prompt={ initialPrompt }
			data-instance-id={ instanceId }
		>
			{ /* Chat interface will load here */ }
      {/* Adding anoscript fallback or simple text might be good */}
      <noscript>
        { __( 'Please enable JavaScript to use the AI Chat.', 'easy-ai-chat-embed' ) }
      </noscript>
		</div>
	);
} 