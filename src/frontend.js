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
window.simpleAiChatInstances = window.simpleAiChatInstances || {};

/**
 * Find all chat embed containers and mount the chatbot component.
 */
export const initializeChatEmbeds = () => {
	const chatContainers = document.querySelectorAll(
		'.simple-ai-chat-embed-instance' // Target all instances by the common class
	);

	// Check if React 18's createRoot is available (WP 6.2+)
	const useCreateRoot = typeof createRoot === 'function';

	// Get global data (should be available if script was enqueued)
	const globalData = window.simpleAiChatEmbedGlobalData;

	if (!globalData) {
		// Keep critical error log
		console.error('Simple AI Chat Embed: Global data object missing. Assets might not have been enqueued correctly.');
		// Optionally, update container innerHTML to show an error
		chatContainers.forEach(container => {
			if (!container.innerHTML.includes('noscript')) { // Avoid overwriting noscript tag if JS is disabled
				container.innerHTML = '<p>Error: Chatbot global data missing.</p>';
			}
		});
		return; // Stop execution if global data is missing
	}

	console.log('chatContainers', chatContainers);

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
			// Keep critical error log
			console.error('Simple AI Chat Embed: Missing required data for instance.');

			// In non-production environments, log more details
			if (process.env.NODE_ENV !== 'production') {
				console.error('Missing values:', { instanceId, selectedModel, chatbotName, ajaxUrl, nonce });
			}

			// Update container HTML only if it doesn't already contain the noscript message
			if (!container.querySelector('noscript')) {
				container.innerHTML = '<p>Error: Chatbot configuration missing or incomplete.</p>';
			}
			return; // Skip this container
		}

		// Store essential data in global window object
		window.simpleAiChatInstances[instanceId] = {
			ajaxUrl,
			nonce,
			instanceId,
			selectedModel,
			initialPrompt,
			chatbotName // Store chatbot name
		};

		// Create a custom attribute to store the current instance ID
		// This will be used for targeting the specific instance later
		container.setAttribute('data-eace-current-instance', instanceId);

		// Build state object with instance identifier
		const initialState = {
			messages: [],
			instanceId: instanceId, // Include instance ID in the state
			selectedModel: selectedModel,
			initialPrompt: initialPrompt,
			chatbotName: chatbotName,
		};

		try {
			// Get configuration with instance details, ajax info, initial state, and type flag
			// Pass chatbotName instead of botName directly if config expects it
			const botConfig = configFn(instanceId, initialPrompt, selectedModel, chatbotName, ajaxUrl, nonce, initialState, isBlock, isShortcode, isElementor);

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
				{ className: 'simple-ai-chat-widget-container' }, // Outer wrapper for potential styling
				wp.element.createElement(Chatbot, chatbotProps)
			);

			if ( useCreateRoot ) {
				const root = createRoot( container );
				root.render( chatElement );
			} else {
				render( chatElement, container );
			}
		} catch (error) {
			// Keep critical error log
			console.error('Error initializing chatbot:', error);
			container.innerHTML = '<p>Error initializing chat interface. Please try again later.</p>';
		}
	} );
}

domReady( () => {
	initializeChatEmbeds();
} );