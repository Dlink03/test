import React, { useState } from 'react';
import { Zap, Copy, Edit, Send, Check, X, MessageSquare } from 'lucide-react';
import { Email } from '../../types';
import { useNotifications } from '../../contexts/NotificationsContext';

interface AiResponseGeneratorProps {
  email: Email;
}

const AiResponseGenerator: React.FC<AiResponseGeneratorProps> = ({ email }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedResponse, setEditedResponse] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('professional');
  const { addNotification } = useNotifications();

  // Sample templates
  const templates = [
    { id: 'professional', name: 'Professional' },
    { id: 'friendly', name: 'Friendly' },
    { id: 'concise', name: 'Concise' },
    { id: 'detailed', name: 'Detailed' },
  ];

  const generateResponse = () => {
    setIsGenerating(true);
    
    // Simulate API call to generate response
    setTimeout(() => {
      // This would be replaced with actual API call to your AI backend
      const responses = {
        professional: `Dear ${email.sender.name},\n\nThank you for your email. I appreciate you bringing this matter to my attention.\n\nI've reviewed the details you provided and would like to address your concerns. [Response based on email context]\n\nIf you have any further questions, please don't hesitate to reach out.\n\nBest regards,\n[Your Name]`,
        friendly: `Hi ${email.sender.name}!\n\nThanks so much for your message. I'm glad you reached out about this.\n\n[Friendly response addressing their email]\n\nLet me know if you need anything else!\n\nCheers,\n[Your Name]`,
        concise: `${email.sender.name},\n\nThanks for your email. [Brief, direct response]\n\nRegards,\n[Your Name]`,
        detailed: `Dear ${email.sender.name},\n\nThank you for your comprehensive email regarding [subject]. I appreciate the time you've taken to provide these details.\n\n[Detailed, point-by-point response addressing all aspects of their email with thorough explanations]\n\nPlease let me know if you would like me to elaborate on any points or if you have additional questions.\n\nBest regards,\n[Your Name]`
      };
      
      setAiResponse(responses[selectedTemplate as keyof typeof responses]);
      setEditedResponse(responses[selectedTemplate as keyof typeof responses]);
      setIsGenerating(false);
    }, 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(isEditing ? editedResponse : aiResponse);
    addNotification('success', 'Response copied to clipboard');
  };

  const handleSend = () => {
    // This would send the email response
    addNotification('success', 'Response sent successfully');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div className="flex items-center">
          <Zap size={20} className="mr-2 text-indigo-600 dark:text-indigo-400" />
          <h3 className="font-medium text-gray-900 dark:text-white">AI Response Generator</h3>
        </div>
        <div className="flex items-center space-x-3">
          <div>
            <label htmlFor="template" className="sr-only">Template</label>
            <select
              id="template"
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm py-1 px-3"
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              disabled={isGenerating}
            >
              {templates.map((template) => (
                <option key={template.id} value={template.id}>{template.name}</option>
              ))}
            </select>
          </div>
          <button
            onClick={generateResponse}
            disabled={isGenerating}
            className={`px-3 py-1 rounded-md text-sm flex items-center ${
              isGenerating 
                ? 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-b-transparent border-white mr-2"></div>
                Generating...
              </>
            ) : (
              <>
                <Zap size={14} className="mr-1" />
                Generate
              </>
            )}
          </button>
        </div>
      </div>

      <div className="px-6 py-4">
        {!aiResponse && !isGenerating ? (
          <div className="flex flex-col items-center justify-center py-8 text-center text-gray-500 dark:text-gray-400">
            <MessageSquare size={40} className="mb-3 opacity-50" />
            <p className="mb-2">Generate an AI response based on the email content</p>
            <p className="text-sm">Select a template and click "Generate" to create a response</p>
          </div>
        ) : isGenerating ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-b-transparent border-indigo-600 dark:border-indigo-400 mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Analyzing email and generating response...</p>
          </div>
        ) : (
          <div>
            {isEditing ? (
              <div className="mb-4">
                <textarea
                  value={editedResponse}
                  onChange={(e) => setEditedResponse(e.target.value)}
                  className="w-full min-h-[200px] p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            ) : (
              <div className="bg-gray-50 dark:bg-gray-750 p-4 rounded-md mb-4 whitespace-pre-wrap">
                {aiResponse}
              </div>
            )}

            <div className="flex justify-between">
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    if (isEditing) {
                      setIsEditing(false);
                    } else {
                      setIsEditing(true);
                    }
                  }}
                  className="flex items-center px-3 py-1.5 rounded-md text-sm border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {isEditing ? (
                    <>
                      <X size={14} className="mr-1" />
                      Cancel
                    </>
                  ) : (
                    <>
                      <Edit size={14} className="mr-1" />
                      Edit
                    </>
                  )}
                </button>
                {isEditing && (
                  <button
                    onClick={() => {
                      setAiResponse(editedResponse);
                      setIsEditing(false);
                    }}
                    className="flex items-center px-3 py-1.5 rounded-md text-sm bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Check size={14} className="mr-1" />
                    Save Changes
                  </button>
                )}
                <button
                  onClick={handleCopy}
                  className="flex items-center px-3 py-1.5 rounded-md text-sm border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Copy size={14} className="mr-1" />
                  Copy
                </button>
              </div>
              <button
                onClick={handleSend}
                className="flex items-center px-4 py-1.5 rounded-md text-sm bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Send size={14} className="mr-1" />
                Send Reply
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiResponseGenerator;