import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, MessageCircle } from 'lucide-react';
import Avatar from '../ui/Avatar';

// Sample data - would come from an API in a real app
const recentEmails = [
  {
    id: '1',
    subject: 'Urgent: Project Update Required',
    sender: {
      name: 'Alex Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    preview: 'We need to update the project timeline...',
    time: '10:45 AM',
    priority: 'high'
  },
  {
    id: '2',
    subject: 'Meeting Rescheduled',
    sender: {
      name: 'Sarah Williams',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    preview: 'The team meeting has been moved to...',
    time: 'Yesterday',
    priority: 'medium'
  },
  {
    id: '3',
    subject: 'New Feature Suggestion',
    sender: {
      name: 'Michael Chen',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg'
    },
    preview: 'I think we should consider adding...',
    time: '2 days ago',
    priority: 'medium'
  },
  {
    id: '4',
    subject: 'Quarterly Report',
    sender: {
      name: 'Jessica Miller',
      avatar: 'https://randomuser.me/api/portraits/women/17.jpg'
    },
    preview: 'Please find attached the quarterly...',
    time: '3 days ago',
    priority: 'low'
  }
];

const RecentEmails = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      {recentEmails.length > 0 ? (
        <>
          {recentEmails.map((email) => (
            <div 
              key={email.id}
              onClick={() => navigate(`/email/${email.id}`)}
              className="flex items-start p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 cursor-pointer border-l-2 transition-colors duration-150
                ${email.priority === 'high' ? 'border-red-500' : 
                  email.priority === 'medium' ? 'border-yellow-500' : 
                  'border-transparent'}"
            >
              <Avatar 
                name={email.sender.name} 
                src={email.sender.avatar}
                size="sm"
              />
              <div className="ml-3 flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {email.subject}
                  </h4>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 whitespace-nowrap">
                    {email.time}
                  </span>
                </div>
                <div className="flex justify-between">
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {email.sender.name}: {email.preview}
                  </p>
                  {email.priority === 'high' && (
                    <span className="ml-2 flex-shrink-0">
                      <AlertCircle size={14} className="text-red-500" />
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          <div className="text-center pt-2">
            <button 
              onClick={() => navigate('/inbox')}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              View all emails
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-center text-gray-500 dark:text-gray-400">
          <MessageCircle size={40} className="mb-3 opacity-50" />
          <p>No priority emails at the moment</p>
        </div>
      )}
    </div>
  );
};

export default RecentEmails;