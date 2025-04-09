/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextareaControl, TextControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import './editor.scss'; // We might add editor-specific styles later

// Define the available models
const modelOptions = [
	{ label: __( 'Select a Model', 'easy-ai-chat-embed' ), value: '' },
	{ label: 'ChatGPT 4.0', value: 'gpt-4o-mini' },
	{ label: 'Claude Sonnet 3.7', value: 'claude-3-7-sonnet-20250219' },
	{ label: 'Google Gemini', value: 'gemini-2.0-flash-lite' },
];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function to update block attributes.
 * @param {string}   props.clientId      Unique ID for the block instance.
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes, clientId } ) {
	const blockProps = useBlockProps();
	const { selectedModel, initialPrompt, chatbotName, instanceId } = attributes;

	// Ensure a unique instance ID is set for each block
	useEffect( () => {
		if ( ! instanceId ) {
			// Use clientId as a fallback if uuid generation fails or isn't available easily
			// A truly persistent ID might require a different approach if clientId changes often.
			// For now, relying on clientId and the attribute should suffice for initial setup.
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
					<TextControl
						label={ __( 'Chatbot Name', 'easy-ai-chat-embed' ) }
						help={ __( 'Optional name for this specific chat instance. Leave blank to use the default.', 'easy-ai-chat-embed' ) }
						value={ chatbotName }
						onChange={ ( newName ) =>
							setAttributes( { chatbotName: newName } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<p>
				{ __( 'AI Chat Embed Placeholder - Configure in sidebar.', 'easy-ai-chat-embed' ) }
			</p>
			{ /* We will add the actual chat preview here later */ }
		</div>
	);
} 