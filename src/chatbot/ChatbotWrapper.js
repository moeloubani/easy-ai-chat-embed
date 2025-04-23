import React from 'react';
import { Chatbot } from 'react-chatbot-kit';
import configFn from './config';
import MessageParserClass from './MessageParser';
import ActionProvider from './ActionProvider';

const ChatbotWrapper = ({
  instanceId,
  initialPrompt,
  selectedModel,
  chatbotName = 'AIChatBot',
  ajaxUrl,
  nonce,
  initialState = {},
  isBlock = false,
  isShortcode = false,
  isElementor = false,
  isEditor = false
}) => {
  const config = configFn(
    instanceId,
    initialPrompt,
    selectedModel,
    chatbotName,
    ajaxUrl,
    nonce,
    initialState,
    isBlock,
    isShortcode,
    isElementor
  );

  return (
    <div className="simple-ai-chat-embed-instance">
      <Chatbot
        config={config}
        messageParser={MessageParserClass}
        actionProvider={ActionProvider}
        disableInput={isEditor}
      />
      {isEditor && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(255,255,255,0.7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none'
        }}>
          <span>Editor Preview</span>
        </div>
      )}
    </div>
  );
};

export default ChatbotWrapper;
