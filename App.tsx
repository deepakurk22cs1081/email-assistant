
import React, { useState, useEffect } from 'react';
import EmailList from './components/EmailList';
import EmailDetail from './components/EmailDetail';
import { MOCK_EMAILS } from './constants';
import { Email } from './types';
import { SparkleIcon } from './components/icons';


const App: React.FC = () => {
  const [emails] = useState<Email[]>(MOCK_EMAILS);
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);

  useEffect(() => {
    // Select the first email by default on initial load
    if (emails.length > 0) {
      setSelectedEmailId(emails[0].id);
    }
  }, [emails]);

  const selectedEmail = emails.find(email => email.id === selectedEmailId) || null;

  return (
    <div className="h-screen w-screen flex flex-col font-sans text-gray-900 dark:text-gray-200">
        <header className="flex-shrink-0 bg-white dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-2">
                        <SparkleIcon className="h-8 w-8 text-blue-600"/>
                        <h1 className="text-xl font-bold tracking-tight text-gray-800 dark:text-gray-100">Gemini Email Assistant</h1>
                    </div>
                </div>
            </div>
        </header>
        <main className="flex-grow flex h-full min-h-0">
            <div className="w-full max-w-xs md:w-1/3 lg:w-1/4 xl:w-1/5 flex-shrink-0">
                <EmailList
                    emails={emails}
                    selectedEmailId={selectedEmailId}
                    onSelectEmail={setSelectedEmailId}
                />
            </div>
            <div className="flex-grow h-full">
                {selectedEmail ? (
                <EmailDetail email={selectedEmail} />
                ) : (
                <div className="flex items-center justify-center h-full bg-gray-50 dark:bg-gray-900">
                    <div className="text-center">
                    <h2 className="text-xl font-medium text-gray-500 dark:text-gray-400">Select an email to view</h2>
                    <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">Your intelligent assistant is ready to help.</p>
                    </div>
                </div>
                )}
            </div>
        </main>
    </div>
  );
};

export default App;
   