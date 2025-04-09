// src/chatbot/MessageParser.js
class MessageParser {
	constructor( actionProvider, state ) {
		this.actionProvider = actionProvider;
		this.state = state;
		console.log('MessageParser constructor state:', state); // Add log here
	}

	parse( message ) {
		// console.log( 'User message:', message ); // Log user input
		// console.log( 'Current state:', this.state ); // Log state for debugging

		// Simple implementation: pass every non-empty message to the action provider
		if ( message.trim() !== '' ) {
			console.log('MessageParser parse state:', this.state); // Add log here
			// Pass the current state along to the action provider
			this.actionProvider.handleUserMessage( message, this.state );
		}
	}
}

export default MessageParser;

