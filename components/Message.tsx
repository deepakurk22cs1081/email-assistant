
import React from 'react';
import { Message as MessageType } from '../types';

interface MessageProps {
  message: MessageType;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const isAssistant = message.sender === 'assistant';

  const baseClasses = "p-4 rounded-lg max-w-xl";
  const assistantClasses = "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200";
  const userClasses = "bg-blue-500 dark:bg-blue-600 text-white";
  const containerClasses = `flex mb-4 ${isAssistant ? 'justify-start' : 'justify-end'}`;

  return (
    <div className={containerClasses}>
      <div className={`${baseClasses} ${isAssistant ? assistantClasses : userClasses}`}>
        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
        <p className={`text-xs mt-2 ${isAssistant ? 'text-gray-500 dark:text-gray-400 text-left' : 'text-blue-200 text-right'}`}>
          {message.timestamp}
        </p>
      </div>
    </div>
  );
};

export default Message;
   