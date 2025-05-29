import React from 'react';
import { Star, Paperclip } from 'lucide-react';
import { Email } from '../../types';
import Avatar from '../ui/Avatar';

interface EmailItemProps {
  email: Email;
  isSelected: boolean;
  onSelect: () => void;
  onClick: () => void;
}

const EmailItem: React.FC<EmailItemProps> = ({ email, isSelected, onSelect, onClick }) => {
  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();
  };

  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Toggle star status
    console.log('Toggle star for:', email.id);
  };

  return (
    <div 
      className={`flex items-start px-4 py-3 transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-750 cursor-pointer ${
        email.unread ? 'bg-blue-50 dark:bg-blue-900/10' : ''
      } ${isSelected ? 'bg-blue-100 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/20' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center mr-4 space-x-3">
        <div onClick={handleCheckboxClick}>
          <input 
            type="checkbox" 
            checked={isSelected}
            onChange={() => {}}
            className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:border-gray-600"
          />
        </div>
        <button onClick={handleStarClick}>
          <Star 
            size={18} 
            className={`${
              email.starred 
                ? 'text-yellow-500 fill-yellow-500' 
                : 'text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400'
            }`} 
          />
        </button>
      </div>

      <div className="flex-shrink-0 mr-3">
        <Avatar name={email.sender.name} src={email.sender.avatar} size="sm" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center">
            <h3 className={`text-sm font-medium truncate mr-3 ${email.unread ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
              {email.sender.name}
            </h3>
            {email.labels && email.labels.map((label, index) => (
              <span 
                key={index} 
                className={`mr-2 px-1.5 py-0.5 rounded-full text-xs ${
                  label.color === 'red' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                  label.color === 'green' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                  label.color === 'blue' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                  label.color === 'yellow' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                  'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                {label.name}
              </span>
            ))}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-3">
            {email.time}
          </span>
        </div>
        <h4 className={`text-sm mb-1 truncate ${email.unread ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
          {email.subject}
        </h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
          {email.preview}
        </p>
        {email.attachments && email.attachments.length > 0 && (
          <div className="mt-1 flex items-center">
            <Paperclip size={12} className="text-gray-400 mr-1" />
            <span className="text-xs text-gray-500">{email.attachments.length} attachment{email.attachments.length !== 1 ? 's' : ''}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailItem;