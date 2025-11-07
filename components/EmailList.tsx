
import React from 'react';
import { Email } from '../types';
import EmailListItem from './EmailListItem';
import { InboxIcon } from './icons';

interface EmailListProps {
  emails: Email[];
  selectedEmailId: string | null;
  onSelectEmail: (id: string) => void;
}

const EmailList: React.FC<EmailListProps> = ({ emails, selectedEmailId, onSelectEmail }) => {
  return (
    <div className="h-full bg-white dark:bg-gray-800/50 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <InboxIcon className="w-6 h-6"/>
            Inbox
        </h2>
      </div>
      <div className="overflow-y-auto flex-grow">
        {emails.map(email => (
          <EmailListItem
            key={email.id}
            email={email}
            isSelected={email.id === selectedEmailId}
            onSelect={onSelectEmail}
          />
        ))}
      </div>
    </div>
  );
};

export default EmailList;
   