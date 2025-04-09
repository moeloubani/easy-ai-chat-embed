// src/chatbot/MessageParser.js
class MessageParser {
	constructor( actionProvider, state ) {
		this.actionProvider = actionProvider;
		this.state = state;
	}

	parse( message ) {
		// console.log( 'User message:', message ); // Log user input
		// console.log( 'Current state:', this.state ); // Log state for debugging

		// Simple implementation: pass every non-empty message to the action provider
		if ( message.trim() !== '' ) {
			this.actionProvider.handleUserMessage( message );
		}
	}
}

export default MessageParser;

