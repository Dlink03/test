import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Archive, Clock, RefreshCw, Star, Tag, Trash, User, MoreHorizontal, ChevronDown } from 'lucide-react';
import { useEmails } from '../hooks/useEmails';
import EmailItem from '../components/email/EmailItem';
import Loader from '../components/ui/Loader';

const Inbox = () => {
  const navigate = useNavigate();
  const { emails, isLoading, error, refetch } = useEmails('inbox');
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(emails.map(email => email.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectEmail = (emailId: string) => {
    if (selectedEmails.includes(emailId)) {
      setSelectedEmails(selectedEmails.filter(id => id !== emailId));
    } else {
      setSelectedEmails([...selectedEmails, emailId]);
    }
  };

  const handleEmailClick = (emailId: string) => {
    navigate(`/email/${emailId}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-red-500 mb-4">Failed to load emails</p>
        <button 
          onClick={() => refetch()} 
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Inbox</h1>
        <button 
          onClick={() => refetch()} 
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          <RefreshCw size={18} className="mr-1" />
          Refresh
        </button>
      </div>

      {/* Email Actions Toolbar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <label className="inline-flex items-center">
              <input 
                type="checkbox" 
                checked={selectAll}
                onChange={handleSelectAll}
                className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:border-gray-600"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">
                {selectedEmails.length > 0 ? (
                  `${selectedEmails.length} selected`
                ) : (
                  <ChevronDown size={14} />
                )}
              </span>
            </label>

            {selectedEmails.length > 0 && (
              <div className="flex space-x-2 ml-4">
                <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700" title="Archive">
                  <Archive size={18} className="text-gray-600 dark:text-gray-400" />
                </button>
                <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700" title="Delete">
                  <Trash size={18} className="text-gray-600 dark:text-gray-400" />
                </button>
                <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700" title="Mark as read">
                  <Clock size={18} className="text-gray-600 dark:text-gray-400" />
                </button>
                <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700" title="Add label">
                  <Tag size={18} className="text-gray-600 dark:text-gray-400" />
                </button>
                <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700" title="More">
                  <MoreHorizontal size={18} className="text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center">
            <div className="text-sm text-gray-600 dark:text-gray-400 mr-4">
              1-50 of 143
            </div>
            <div className="flex">
              <button className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50" disabled>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Email List */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {emails.length > 0 ? (
            emails.map((email) => (
              <EmailItem
                key={email.id}
                email={email}
                isSelected={selectedEmails.includes(email.id)}
                onSelect={() => handleSelectEmail(email.id)}
                onClick={() => handleEmailClick(email.id)}
              />
            ))
          ) : (
            <div className="py-8 text-center text-gray-500 dark:text-gray-400">
              <p>Your inbox is empty</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;