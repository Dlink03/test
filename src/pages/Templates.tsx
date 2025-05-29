import React, { useState } from 'react';
import { Edit, Plus, Trash, Copy, Check } from 'lucide-react';
import { useNotifications } from '../contexts/NotificationsContext';

// Sample templates data
const initialTemplates = [
  {
    id: '1',
    name: 'Professional Response',
    content: 'Dear {{name}},\n\nThank you for your email regarding {{subject}}.\n\n{{response}}\n\nIf you have any further questions, please don\'t hesitate to reach out.\n\nBest regards,\n{{signature}}',
    category: 'General',
    created: '2025-03-15T10:00:00Z',
    lastUsed: '2025-04-28T14:23:00Z',
    usageCount: 43
  },
  {
    id: '2',
    name: 'Meeting Follow-up',
    content: 'Hi {{name}},\n\nThank you for the meeting today regarding {{subject}}.\n\nAs discussed, here are the next steps:\n{{action_items}}\n\nI\'ll follow up with the team and update you by {{date}}.\n\nBest,\n{{signature}}',
    category: 'Meetings',
    created: '2025-02-10T09:30:00Z',
    lastUsed: '2025-04-26T11:15:00Z',
    usageCount: 28
  },
  {
    id: '3',
    name: 'Support Response',
    content: 'Hello {{name}},\n\nThank you for contacting our support team about {{subject}}.\n\n{{response}}\n\nPlease let us know if this resolves your issue. If you need further assistance, reply to this email and we\'ll be happy to help.\n\nRegards,\n{{signature}}\nSupport Team',
    category: 'Support',
    created: '2025-01-05T16:45:00Z',
    lastUsed: '2025-04-29T09:10:00Z',
    usageCount: 67
  },
  {
    id: '4',
    name: 'Thank You',
    content: 'Dear {{name}},\n\nThank you for {{action}}. We greatly appreciate your {{contribution/feedback/support}}.\n\n{{custom_message}}\n\nSincerely,\n{{signature}}',
    category: 'General',
    created: '2025-03-20T13:20:00Z',
    lastUsed: '2025-04-22T15:40:00Z',
    usageCount: 19
  }
];

const Templates = () => {
  const [templates, setTemplates] = useState(initialTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showNewTemplate, setShowNewTemplate] = useState(false);
  const [editedTemplate, setEditedTemplate] = useState({
    id: '',
    name: '',
    content: '',
    category: 'General'
  });
  const { addNotification } = useNotifications();

  const handleEditTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setEditedTemplate({
        id: template.id,
        name: template.name,
        content: template.content,
        category: template.category
      });
      setIsEditing(true);
    }
  };

  const handleNewTemplate = () => {
    setEditedTemplate({
      id: 'new',
      name: '',
      content: '',
      category: 'General'
    });
    setShowNewTemplate(true);
  };

  const handleSaveTemplate = () => {
    if (editedTemplate.id === 'new') {
      // Add new template
      const newTemplate = {
        ...editedTemplate,
        id: Date.now().toString(),
        created: new Date().toISOString(),
        lastUsed: '',
        usageCount: 0
      };
      setTemplates([...templates, newTemplate]);
      addNotification('success', 'Template created successfully');
    } else {
      // Update existing template
      setTemplates(templates.map(t => 
        t.id === editedTemplate.id ? { ...t, ...editedTemplate } : t
      ));
      addNotification('success', 'Template updated successfully');
    }
    setIsEditing(false);
    setShowNewTemplate(false);
  };

  const handleDeleteTemplate = (templateId: string) => {
    setTemplates(templates.filter(t => t.id !== templateId));
    addNotification('success', 'Template deleted');
  };

  const handleCopyTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      navigator.clipboard.writeText(template.content);
      addNotification('success', 'Template copied to clipboard');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Response Templates</h1>
        <button 
          onClick={handleNewTemplate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-200"
        >
          <Plus size={18} className="mr-2" />
          New Template
        </button>
      </div>

      {/* Template List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map(template => (
          <div 
            key={template.id}
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border ${
              selectedTemplate === template.id 
                ? 'border-blue-500 dark:border-blue-400' 
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{template.name}</h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">{template.category}</span>
              </div>
              <div className="flex space-x-1">
                <button 
                  onClick={() => handleEditTemplate(template.id)}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Edit size={16} className="text-gray-600 dark:text-gray-400" />
                </button>
                <button 
                  onClick={() => handleCopyTemplate(template.id)}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Copy size={16} className="text-gray-600 dark:text-gray-400" />
                </button>
                <button 
                  onClick={() => handleDeleteTemplate(template.id)}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Trash size={16} className="text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <pre className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-sans h-32 overflow-y-auto">
                {template.content}
              </pre>
            </div>
            <div className="bg-gray-50 dark:bg-gray-750 p-3 text-xs text-gray-500 dark:text-gray-400 flex justify-between">
              <span>Used {template.usageCount} times</span>
              <span>Last used: {template.lastUsed ? new Date(template.lastUsed).toLocaleDateString() : 'Never'}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Edit/New Template Modal */}
      {(isEditing || showNewTemplate) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-medium text-lg">
                {isEditing ? 'Edit Template' : 'New Template'}
              </h3>
              <button 
                onClick={() => {
                  setIsEditing(false);
                  setShowNewTemplate(false);
                }}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                &times;
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Template Name
                </label>
                <input 
                  type="text"
                  value={editedTemplate.name}
                  onChange={(e) => setEditedTemplate({...editedTemplate, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter template name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <select 
                  value={editedTemplate.category}
                  onChange={(e) => setEditedTemplate({...editedTemplate, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="General">General</option>
                  <option value="Meetings">Meetings</option>
                  <option value="Support">Support</option>
                  <option value="Sales">Sales</option>
                  <option value="Follow-up">Follow-up</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Template Content
                </label>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  Use variables like {'{{name}}'} that will be replaced with actual values
                </div>
                <textarea 
                  value={editedTemplate.content}
                  onChange={(e) => setEditedTemplate({...editedTemplate, content: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white h-40"
                  placeholder="Enter template content"
                />
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
              <button 
                onClick={() => {
                  setIsEditing(false);
                  setShowNewTemplate(false);
                }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveTemplate}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center"
              >
                <Check size={16} className="mr-2" />
                Save Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Templates;