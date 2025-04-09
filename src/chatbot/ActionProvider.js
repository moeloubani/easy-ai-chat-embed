/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * External dependencies
 */
import { createClientMessage, createChatBotMessage } from 'react-chatbot-kit';

class ActionProvider {
	constructor(createChatBotMessage, setStateFunc, createClientMessage) {
		this.createChatBotMessage = createChatBotMessage;
		this.setState = setStateFunc;
		this.createClientMessage = createClientMessage;
	}

	// Handle user messages and API calls
	handleUserMessage = async (userMessage) => {
		// Get instance data from global object
		const instances = window.easyAiChatInstances || {};
		const instanceKeys = Object.keys(instances);
		
		if (instanceKeys.length === 0) {
			console.error('No chat instances found in global storage');
			const errorMessage = this.createChatBotMessage(
				"I'm sorry, but there was an error processing your request. No configuration found."
			);
			this.addMessageToState(errorMessage);
			return;
		}
		
		// Use the first instance (this is a simplification - ideally would match the current instance)
		const instance = instances[instanceKeys[0]];
		const { instanceId, selectedModel, initialPrompt, ajaxUrl, nonce } = instance;
		
		// Add a loading message
		const loadingMessage = this.createChatBotMessage('Thinking...');
		this.addMessageToState(loadingMessage);
		
		// Prepare AJAX request
		const requestData = {
			action: 'easy_ai_chat_embed_send_message',
			_ajax_nonce: nonce,
			message: userMessage,
			instanceId: instanceId,
			selectedModel: selectedModel,
			initialPrompt: initialPrompt,
			// We're not passing conversation history here for simplicity
			// This can be added back if needed
			conversationHistory: '[]'
		};
		
		try {
			const response = await fetch(ajaxUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: new URLSearchParams(requestData).toString()
			});
			
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			
			const result = await response.json();
			
			// Remove loading message
			this.removeLastMessage();
			
			// Display response or error message
			if (result.success && result.data.message) {
				const botResponse = this.createChatBotMessage(result.data.message);
				this.addMessageToState(botResponse);
			} else {
				const errorMessage = result.data?.message || 'Sorry, I could not process your request.';
				const botError = this.createChatBotMessage(
					__('[Error]', 'easy-ai-chat-embed') + ' ' + errorMessage
				);
				this.addMessageToState(botError);
			}
		} catch (error) {
			console.error('Error calling backend API:', error);
			this.removeLastMessage();
			const botError = this.createChatBotMessage(
				__('[Error] Sorry, something went wrong while contacting the AI. Please try again later.', 'easy-ai-chat-embed')
			);
			this.addMessageToState(botError);
		}
	};
	
	// Helper to add messages to state
	addMessageToState = (message) => {
		this.setState((prevState) => ({
			...prevState,
			messages: [...prevState.messages, message]
		}));
	};
	
	// Helper to remove the last message
	removeLastMessage = () => {
		this.setState(prevState => ({
			...prevState,
			messages: prevState.messages.slice(0, -1)
		}));
	};
}

export default ActionProvider;