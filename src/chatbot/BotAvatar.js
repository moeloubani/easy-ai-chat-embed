/**
 * External dependencies
 */
import { ReactComponent as UserIcon } from 'react-chatbot-kit/src/assets/icons/user-alt.svg'; // Corrected icon path

const BotAvatar = () => {
  return (
    <div className="react-chatbot-kit-bot-avatar">
      <div className="react-chatbot-kit-user-avatar-container">
        <UserIcon className="react-chatbot-kit-user-avatar-icon" />
      </div>
    </div>
  );
};

export default BotAvatar; 