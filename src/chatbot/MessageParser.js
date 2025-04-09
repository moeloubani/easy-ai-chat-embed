// src/chatbot/MessageParser.js
class MessageParser {
	constructor( actionProvider, state ) {
		this.actionProvider = actionProvider;
		this.state = state || {}; // Add fallback for undefined state
	}

	parse( message ) {
		// console.log( 'User message:', message ); // Log user input
		// console.log( 'Current state:', this.state ); // Log state for debugging

		// Simple implementation: pass every non-empty message to the action provider
		if ( message.trim() !== '' ) {
			// Attempt to get the container the chatbot is running in
			// This helps with finding the correct instance ID
			let instanceId = '';
			
			try {
				// Try to find the instance ID from the DOM
				const container = document.querySelector('[data-eace-current-instance]');
				if (container) {
					instanceId = container.getAttribute('data-eace-current-instance');
				}
				
				// If we still don't have an ID from the DOM and this.state exists,
				// try to get it from state
				if (!instanceId && this.state && this.state.instanceId) {
					instanceId = this.state.instanceId;
				}
				
				// Create a minimal state object if none exists
				const safeState = this.state || {};
				
				// Override the instanceId in the state if we found one in the DOM
				if (instanceId) {
					safeState.instanceId = instanceId;
				}
				
				// Pass the message and safe state to the action provider
				this.actionProvider.handleUserMessage( message, safeState );
			} catch (error) {
				console.error('Error in MessageParser.parse:', error);
				// Even on error, try to pass the message to avoid a broken UX
				this.actionProvider.handleUserMessage( message, { instanceId } );
			}
		}
	}
}

export default MessageParser;

