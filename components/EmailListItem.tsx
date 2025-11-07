
import React from 'react';
import { Email } from '../types';

interface EmailListItemProps {
  email: Email;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const EmailListItem: React.FC<EmailListItemProps> = ({ email, isSelected, onSelect }) => {
  const baseClasses = "w-full text-left p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-150";
  const selectedClasses = "bg-blue-100 dark:bg-blue-900/50";
  const unselectedClasses = "hover:bg-gray-50 dark:hover:bg-gray-800";

  return (
    <button
      onClick={() => onSelect(email.id)}
      className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`}
    >
      <div className="flex justify-between items-center mb-1">
        <p className="font-semibold text-sm text-gray-800 dark:text-gray-100 truncate">{email.senderName}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{email.messages[email.messages.length - 1].timestamp}</p>
      </div>
      <p className="text-sm font-medium text-gray-900 dark:text-gray-50 truncate">{email.subject}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">{email.snippet}</p>
    </button>
  );
};

export default EmailListItem;
   