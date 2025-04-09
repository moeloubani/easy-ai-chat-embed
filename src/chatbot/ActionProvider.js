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

	// Main handler for user messages - now delegates to smaller functions
	handleUserMessage = async (userMessage, currentState) => {
		// 1. Get the appropriate instance
		const instance = this.getAppropriateInstance(currentState);
		if (!instance) {
			return; // Error already handled in getAppropriateInstance
		}
		
		const { instanceId, selectedModel, initialPrompt, ajaxUrl, nonce } = instance;
		
		// 2. Show loading indicator
		this.showLoadingIndicator();
		
		// 3. Format conversation history
		const conversationHistory = this.formatConversationHistory(currentState);

		// 4. Prepare request data
		const requestData = {
			action: 'easy_ai_chat_embed_send_message',
			_ajax_nonce: nonce,
			message: userMessage,
			instanceId: instanceId,
			selectedModel: selectedModel,
			initialPrompt: initialPrompt,
			conversationHistory: JSON.stringify(conversationHistory)
		};
		
		// 5. Send the request and handle response
		try {
			const result = await this.sendApiRequest(ajaxUrl, requestData);
			this.handleApiResponse(result);
		} catch (error) {
			this.handleApiError(error);
		}
	};
	
	// Get the appropriate instance based on current state
	getAppropriateInstance = (currentState) => {
		// Get current instance ID from state if available
		let currentInstanceId = '';
		if (currentState && currentState.instanceId) {
			currentInstanceId = currentState.instanceId;
		}
		
		// Get instance data from global object
		const instances = window.easyAiChatInstances || {};
		
		// No instances found
		if (Object.keys(instances).length === 0) {
			console.error('No chat instances found in global storage');
			const errorMessage = this.createChatBotMessage(
				__("I'm unable to process your request at this time. Please try again later.", 'easy-ai-chat-embed')
			);
			this.addMessageToState(errorMessage);
			return null;
		}
		
		// First try to find the matching instance by ID from state
		let instance = null;
		if (currentInstanceId && instances[currentInstanceId]) {
			instance = instances[currentInstanceId];
		} else {
			// Fallback to the first instance as before
			const instanceKeys = Object.keys(instances);
			instance = instances[instanceKeys[0]];
			console.warn('Using fallback instance selection mechanism');
		}
		
		return instance;
	};
	
	// Show the loading indicator
	showLoadingIndicator = () => {
		const loadingMessage = this.createChatBotMessage('Thinking...');
		this.addMessageToState(loadingMessage);
	};
	
	// Format conversation history from current state
	formatConversationHistory = (currentState) => {
		let conversationHistory = [];
		if (currentState && Array.isArray(currentState.messages)) {
			conversationHistory = currentState.messages.map(message => ({
				type: message.type, // 'bot' or 'user'
				message: message.message
			}));
		} else {
			// Only log warning, don't expose to user
			console.warn('ActionProvider: currentState or currentState.messages not available for history.');
		}
		return conversationHistory;
	};
	
	// Send API request and get response
	sendApiRequest = async (ajaxUrl, requestData) => {
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
		
		return await response.json();
	};
	
	// Handle successful API response
	handleApiResponse = (result) => {
		// Remove loading message
		this.removeLastMessage();
		
		// Display response or error message
		if (result.success && result.data.message) {
			const botResponse = this.createChatBotMessage(result.data.message);
			this.addMessageToState(botResponse);
		} else {
			// Log detailed error for debugging
			console.error('API Error:', result.data?.message || 'Unknown error');
			// Show generic message to user
			const botError = this.createChatBotMessage(
				__('Sorry, I encountered a problem processing your request. Please try again later.', 'easy-ai-chat-embed')
			);
			this.addMessageToState(botError);
		}
	};
	
	// Handle API errors
	handleApiError = (error) => {
		// Log the full error to console for debugging
		console.error('Error calling backend API:', error);
		// Remove loading message
		this.removeLastMessage();
		// Show generic message to users
		const botError = this.createChatBotMessage(
			__('Sorry, I was unable to connect to the AI service. Please try again later.', 'easy-ai-chat-embed')
		);
		this.addMessageToState(botError);
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