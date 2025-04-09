/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const domReady = wp.domReady;
const { createRoot, render } = wp.element;

/**
 * External dependencies 
 * Import manually to avoid ES module issues
 */
import { Chatbot, createChatBotMessage } from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';

/**
 * Internal dependencies
 */
import configFn from './chatbot/config';
import MessageParserClass from './chatbot/MessageParser';
import ActionProvider from './chatbot/ActionProvider';
import './frontend.scss'; // For custom frontend styles

// Create global storage for chatbot instances
window.easyAiChatInstances = window.easyAiChatInstances || {};

/**
 * Find all chat embed containers and mount the chatbot component.
 */
domReady( () => {
	const chatContainers = document.querySelectorAll(
		'.easy-ai-chat-embed-instance' // Target all instances by the common class
	);

	// Check if React 18's createRoot is available (WP 6.2+)
	const useCreateRoot = typeof createRoot === 'function';

	// Get global data (should be available if script was enqueued)
	const globalData = window.easyAiChatEmbedGlobalData;

	if (!globalData) {
		console.error('Easy AI Chat Embed: Global data object (easyAiChatEmbedGlobalData) not found. Assets might not have been enqueued correctly.');
		// Optionally, update container innerHTML to show an error
		chatContainers.forEach(container => {
			if (!container.innerHTML.includes('noscript')) { // Avoid overwriting noscript tag if JS is disabled
				 container.innerHTML = '<p>Error: Chatbot global data missing.</p>';
			}
		});
		return; // Stop execution if global data is missing
	}

	chatContainers.forEach( ( container ) => {
		// Get all instance-specific data directly from data attributes
		const instanceId = container.dataset.instanceId;
		const selectedModel = container.dataset.selectedModel;
		const initialPrompt = container.dataset.initialPrompt;
		const chatbotName = container.dataset.chatbotName || 'AIChatBot'; // Default if somehow missing
		const isBlock = container.dataset.isBlock === 'true';
		const isShortcode = container.dataset.isShortcode === 'true';
		const isElementor = container.dataset.isElementor === 'true';

		// Use global data for ajaxUrl and nonce
		const ajaxUrl = globalData.ajaxUrl;
		const nonce = globalData.nonce;

		// Basic validation (ensure we have necessary data)
		if ( ! instanceId || ! selectedModel || !ajaxUrl || !nonce || !chatbotName ) {
			console.error(
				'Easy AI Chat Embed: Missing required data for instance.',
				container,
				{ instanceId, selectedModel, chatbotName, ajaxUrl, nonce }
			);
			// Update container HTML only if it doesn't already contain the noscript message
			if (!container.querySelector('noscript')) {
				 container.innerHTML = '<p>Error: Chatbot configuration missing or incomplete.</p>';
			}
			return; // Skip this container
		}

		// Store essential data in global window object
		window.easyAiChatInstances[instanceId] = {
			ajaxUrl,
			nonce,
			instanceId,
			selectedModel,
			initialPrompt,
			chatbotName // Store chatbot name
		};

		// Build state object
		const initialState = {
			messages: [],
			instanceId: instanceId,
			selectedModel: selectedModel,
			initialPrompt: initialPrompt,
			chatbotName: chatbotName, // Add chatbot name to state
		};

		try {
			// Get configuration with instance details, ajax info, initial state, and type flag
			// Pass chatbotName instead of botName directly if config expects it
			const botConfig = configFn(instanceId, initialPrompt, selectedModel, chatbotName, ajaxUrl, nonce, initialState, isBlock, isShortcode, isElementor);

			// Log the ActionProvider before passing it
			console.log('Typeof ActionProvider:', typeof ActionProvider);
			console.log('ActionProvider value:', ActionProvider);

			// Setup chatbot props - pass CLASSES/constructors directly, not instances or factory functions
			const chatbotProps = {
				config: botConfig,
				messageParser: MessageParserClass,
				actionProvider: ActionProvider,
			};

			// Clear the noscript message / placeholder content
			const noscriptElement = container.querySelector('noscript');
			if (noscriptElement) {
				noscriptElement.remove();
			}
			// Clear any other potential placeholder text
			container.innerHTML = '';

			// Create a wrapper div to target
			const chatElement = wp.element.createElement(
				'div',
				{ className: 'easy-ai-chat-widget-container' }, // Outer wrapper for potential styling
				wp.element.createElement(Chatbot, chatbotProps)
			);

			if ( useCreateRoot ) {
				const root = createRoot( container );
				root.render( chatElement );
			} else {
				render( chatElement, container );
			}
		} catch (error) {
			console.error('Error initializing chatbot:', error);
			container.innerHTML = '<p>Error initializing chat interface. See console for details.</p>';
		}
	} );
} ); 