
import React, { useState, useCallback, useEffect } from 'react';
import { Email } from '../types';
import { generateReply } from '../services/geminiService';
import { FAQ_KNOWLEDGE_BASE } from '../constants';
import Message from './Message';
import { SparkleIcon, CopyIcon, RefreshIcon } from './icons';

interface EmailDetailProps {
  email: Email;
}

const SkeletonLoader: React.FC = () => (
    <div className="animate-pulse space-y-3">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
    </div>
);

const EmailDetail: React.FC<EmailDetailProps> = ({ email }) => {
  const [userPrompt, setUserPrompt] = useState('Draft a helpful reply based on the FAQ.');
  const [generatedReply, setGeneratedReply] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Reset state when a new email is selected
    setGeneratedReply(null);
    setError(null);
    setIsLoading(false);
    setUserPrompt('Draft a helpful reply based on the FAQ.');
  }, [email]);

  const handleGenerateReply = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedReply(null);

    const reply = await generateReply(email.messages, FAQ_KNOWLEDGE_BASE, userPrompt);
    
    if (reply.startsWith("An error occurred")) {
        setError(reply);
    } else {
        setGeneratedReply(reply);
    }
    setIsLoading(false);
  }, [email.messages, userPrompt]);

  const handleCopy = () => {
    if (generatedReply) {
      navigator.clipboard.writeText(generatedReply);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">{email.subject}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">From: {email.senderName} &lt;{email.senderEmail}&gt;</p>
      </div>

      <div className="flex-grow overflow-y-auto p-4 md:p-6 space-y-4">
        {email.messages.map(msg => <Message key={msg.id} message={msg} />)}
      </div>

      <div className="p-4 md:p-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
        <div className="space-y-4">
          <div>
            <label htmlFor="user-prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Instruction for AI:</label>
            <textarea
              id="user-prompt"
              rows={2}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500"
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              placeholder="e.g., Politely decline the request."
            />
          </div>
          <button
            onClick={handleGenerateReply}
            disabled={isLoading}
            className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed dark:focus:ring-offset-gray-900"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
                <>
                    <SparkleIcon className="w-5 h-5 mr-2" />
                    Generate Reply
                </>
            )}
          </button>
        </div>
        
        {(isLoading || generatedReply || error) && (
            <div className="mt-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Suggested Reply:</h3>
                {isLoading && <SkeletonLoader />}
                {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
                {generatedReply && (
                    <div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{generatedReply}</p>
                        <div className="flex items-center gap-2 mt-3">
                            <button onClick={handleCopy} className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 dark:border-gray-600 text-xs font-medium rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900">
                                <CopyIcon className="w-4 h-4 mr-1.5" />
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                             <button onClick={handleGenerateReply} disabled={isLoading} className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 dark:border-gray-600 text-xs font-medium rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900">
                                <RefreshIcon className={`w-4 h-4 mr-1.5 ${isLoading ? 'animate-spin' : ''}`} />
                                Regenerate
                            </button>
                        </div>
                    </div>
                )}
            </div>
        )}
      </div>
    </div>
  );
};

export default EmailDetail;
   