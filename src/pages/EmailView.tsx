import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Archive, 
  Trash, 
  Reply, 
  Forward, 
  MoreHorizontal, 
  Tag, 
  Star, 
  Clock, 
  Paperclip, 
  Download, 
  ExternalLink, 
  Users, 
  Zap,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { useEmail } from '../hooks/useEmail';
import Loader from '../components/ui/Loader';
import AiResponseGenerator from '../components/email/AiResponseGenerator';
import Avatar from '../components/ui/Avatar';

const EmailView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { email, isLoading, error } = useEmail(id!);
  const [showAiResponseGenerator, setShowAiResponseGenerator] = useState(false);
  const [isStarred, setIsStarred] = useState(false);

  if (isLoading) {
    return <Loader />;
  }

  if (error || !email) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-red-500 mb-4">Failed to load email</p>
        <button 
          onClick={() => navigate('/inbox')} 
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to Inbox
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Email Actions */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          <ArrowLeft size={18} className="mr-1" />
          Back
        </button>
        <div className="flex space-x-2">
          <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
            <Archive size={18} />
          </button>
          <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
            <Trash size={18} />
          </button>
          <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
            <Tag size={18} />
          </button>
          <button 
            onClick={() => setIsStarred(!isStarred)} 
            className={`p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 ${
              isStarred ? 'text-yellow-500' : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            <Star size={18} />
          </button>
          <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* Email Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-6">
          {/* Email Header */}
          <div className="mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-xl font-bold mb-1">{email.subject}</h1>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  {email.labels && email.labels.map((label, index) => (
                    <span 
                      key={index} 
                      className={`mr-2 px-2 py-0.5 rounded-full text-xs ${
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
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(email.date).toLocaleString()}
              </div>
            </div>

            <div className="flex items-start">
              <Avatar 
                name={email.sender.name} 
                src={email.sender.avatar}
                size="md"
              />
              <div className="ml-3 flex-1">
                <div className="flex justify-between">
                  <div>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900 dark:text-white">{email.sender.name}</span>
                      {email.sender.verified && (
                        <span className="ml-1 bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5 rounded dark:bg-blue-900/30 dark:text-blue-300">
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                      <span>{email.sender.email}</span>
                      <span className="mx-1">•</span>
                      <span>To: me</span>
                      {email.cc && email.cc.length > 0 && (
                        <>
                          <span className="mx-1">•</span>
                          <div className="flex items-center">
                            <Users size={14} className="mr-1" />
                            <span>{email.cc.length} others</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Email Content */}
          <div className="prose dark:prose-invert max-w-none mb-6">
            <div dangerouslySetInnerHTML={{ __html: email.body }} />
          </div>

          {/* Attachments */}
          {email.attachments && email.attachments.length > 0 && (
            <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
              <h3 className="text-sm font-medium flex items-center mb-3">
                <Paperclip size={16} className="mr-2" />
                Attachments ({email.attachments.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {email.attachments.map((attachment, index) => (
                  <div 
                    key={index}
                    className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800"
                  >
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded mr-3">
                      {attachment.type.includes('image') ? (
                        <img 
                          src={attachment.thumbnail || 'https://via.placeholder.com/40'} 
                          alt={attachment.name}
                          className="w-10 h-10 object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                          <Paperclip size={20} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{attachment.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{attachment.size}</p>
                    </div>
                    <div className="flex">
                      <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                        <Download size={16} className="text-gray-600 dark:text-gray-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Analysis (if available) */}
          {email.aiAnalysis && (
            <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                <h3 className="text-sm font-medium flex items-center mb-2 text-indigo-800 dark:text-indigo-300">
                  <Zap size={16} className="mr-2" />
                  AI Analysis
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex">
                    <span className="font-medium w-24 text-gray-700 dark:text-gray-300">Intent:</span>
                    <span className="text-gray-800 dark:text-gray-200">{email.aiAnalysis.intent}</span>
                  </div>
                  <div className="flex">
                    <span className="font-medium w-24 text-gray-700 dark:text-gray-300">Sentiment:</span>
                    <span className="text-gray-800 dark:text-gray-200">{email.aiAnalysis.sentiment}</span>
                  </div>
                  <div className="flex">
                    <span className="font-medium w-24 text-gray-700 dark:text-gray-300">Priority:</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      email.aiAnalysis.priority === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                      email.aiAnalysis.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    }`}>
                      {email.aiAnalysis.priority}
                    </span>
                  </div>
                  {email.aiAnalysis.entities && email.aiAnalysis.entities.length > 0 && (
                    <div className="flex">
                      <span className="font-medium w-24 text-gray-700 dark:text-gray-300">Entities:</span>
                      <div className="flex flex-wrap gap-1">
                        {email.aiAnalysis.entities.map((entity, index) => (
                          <span 
                            key={index} 
                            className="px-2 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-xs"
                          >
                            {entity.type}: {entity.value}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-3 flex justify-between items-center">
                  <div className="flex space-x-2">
                    <button className="flex items-center text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                      <ThumbsUp size={14} className="mr-1" />
                      Accurate
                    </button>
                    <button className="flex items-center text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                      <ThumbsDown size={14} className="mr-1" />
                      Inaccurate
                    </button>
                  </div>
                  <button 
                    onClick={() => setShowAiResponseGenerator(true)}
                    className="text-xs flex items-center text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    <Zap size={14} className="mr-1" />
                    Generate AI Response
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Email Actions */}
        <div className="flex items-center justify-between px-6 py-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
              <Reply size={16} className="mr-2" />
              Reply
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center">
              <Forward size={16} className="mr-2" />
              Forward
            </button>
          </div>
          <div>
            <button 
              onClick={() => setShowAiResponseGenerator(!showAiResponseGenerator)}
              className={`px-4 py-2 rounded-lg flex items-center transition-colors duration-200 ${
                showAiResponseGenerator 
                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300'
                  : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              <Zap size={16} className="mr-2" />
              {showAiResponseGenerator ? 'Hide AI Response' : 'Generate AI Response'}
            </button>
          </div>
        </div>
      </div>

      {/* AI Response Generator */}
      {showAiResponseGenerator && (
        <AiResponseGenerator email={email} />
      )}
    </div>
  );
};

export default EmailView;