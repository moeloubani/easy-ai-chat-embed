/**
 * External dependencies
 */
import { createChatBotMessage } from 'react-chatbot-kit';

/**
 * Internal dependencies
 */
import BotAvatar from './BotAvatar'; // Import the UserAvatar component

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

// const botName = 'AIChatBot'; // No longer needed as a fixed constant here

// Basic config for the chatbot
const configFn = ( instanceId, initialPrompt, selectedModel, chatbotName, ajaxUrl, nonce, initialState, isBlock, isShortcode, isElementor ) => ( {
	botName: chatbotName, // Use the passed chatbotName
	lang: 'en',
	initialMessages: [
		createChatBotMessage(
			`Hello! I am ${chatbotName}. How can I help you today? (Using ${selectedModel})` // Use dynamic chatbot name
		),
		// You could add the initialPrompt as a system message here if desired,
		// but typically it's handled server-side before sending to the AI API.
	],
	state: {
		instanceId: instanceId, // Store instance ID for API calls
		initialPrompt: initialPrompt, // Store initial prompt
		selectedModel: selectedModel,
		ajaxUrl: ajaxUrl,         // Add ajaxUrl to state
		nonce: nonce,             // Add nonce to state
		isBlock: isBlock,           // Add isBlock flag
		isShortcode: isShortcode,   // Add isShortcode flag
		isElementor: isElementor,   // Add isElementor flag
		chatbotName: chatbotName, // Store chatbotName in state too
		...initialState         // Merge the rest of the initial state
	},
	// Add custom header component and replace BotAvatar with UserAvatar
	customComponents: {
		header: () => <div className="react-chatbot-kit-chat-header">Conversation with {chatbotName}</div>,
		botAvatar: ( props ) => <BotAvatar { ...props } />,
	},
	// Define custom components or widgets here if needed later
	// widgets: [],
	customStyles: {
		// Optional: Adjust basic styling
		// botMessageBox: {
		//   backgroundColor: '#376B7E',
		// },
		// chatButton: {
		//   backgroundColor: '#5ccc9d',
		// },
	},
} );

export default configFn;

