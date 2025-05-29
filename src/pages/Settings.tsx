import React, { useState } from 'react';
import { 
  User, 
  Shield, 
  Tag, 
  FileText, 
  MessageSquare, 
  Bell, 
  Moon, 
  Sun, 
  Zap, 
  Link, 
  Settings as SettingsIcon,
  Check
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useNotifications } from '../contexts/NotificationsContext';

const Settings = () => {
  const { mode, setMode } = useTheme();
  const { addNotification } = useNotifications();
  const [activeTab, setActiveTab] = useState('general');
  const [isEditing, setIsEditing] = useState(false);
  const [signature, setSignature] = useState(`<div>
    <p>Best regards,</p>
    <p><strong>John Doe</strong></p>
    <p style="color: #666; margin-top: 4px;">Marketing Manager</p>
    <p style="color: #666; margin: 0;">EmailAI Inc.</p>
    <p style="color: #666; margin: 0;">+1 (555) 123-4567</p>
  </div>`);
  
  const [settings, setSettings] = useState({
    // General
    autoAnalyzeEmails: true,
    sendReadReceipts: false,
    defaultResponseTime: 'Auto',
    
    // Notifications
    emailNotifications: true,
    desktopNotifications: true,
    notifyOnImportant: true,
    notifyOnMentions: true,
    
    // AI Settings
    defaultModel: 'mistral',
    localInference: false,
    includePreviousEmails: true,
    maxResponseLength: 'Medium',
    
    // API Integrations
    apiEndpoint: 'https://api.example.com',
    apiKey: '••••••••••••••••',
    webhookEnabled: false
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings({
      ...settings,
      [key]: value
    });
  };

  const handleSaveSignature = () => {
    setIsEditing(false);
    addNotification('success', 'Signature updated successfully');
  };

  const handleSaveSettings = () => {
    addNotification('success', 'Settings saved successfully');
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <h2 className="text-lg font-medium mb-4">General Settings</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Automatically analyze emails</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Use AI to analyze incoming emails for sentiment, intent, and entities</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={settings.autoAnalyzeEmails}
              onChange={() => handleSettingChange('autoAnalyzeEmails', !settings.autoAnalyzeEmails)}
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Send read receipts</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Notify senders when you've read their emails</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={settings.sendReadReceipts}
              onChange={() => handleSettingChange('sendReadReceipts', !settings.sendReadReceipts)}
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Default response time</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Set how quickly you typically respond to emails</p>
          <select 
            className="w-full max-w-xs px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={settings.defaultResponseTime}
            onChange={(e) => handleSettingChange('defaultResponseTime', e.target.value)}
          >
            <option value="Auto">Auto (based on history)</option>
            <option value="Fast">Fast (within hours)</option>
            <option value="Medium">Medium (within a day)</option>
            <option value="Slow">Slow (within days)</option>
          </select>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Theme</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Choose your preferred appearance</p>
          <div className="flex space-x-4">
            <button 
              onClick={() => setMode('light')}
              className={`px-4 py-2 rounded-md flex items-center ${
                mode === 'light' 
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-300 dark:border-blue-800' 
                  : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600'
              }`}
            >
              <Sun size={18} className="mr-2" />
              Light
            </button>
            <button 
              onClick={() => setMode('dark')}
              className={`px-4 py-2 rounded-md flex items-center ${
                mode === 'dark' 
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-300 dark:border-blue-800' 
                  : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600'
              }`}
            >
              <Moon size={18} className="mr-2" />
              Dark
            </button>
            <button 
              onClick={() => setMode('system')}
              className={`px-4 py-2 rounded-md flex items-center ${
                mode === 'system' 
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-300 dark:border-blue-800' 
                  : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600'
              }`}
            >
              <SettingsIcon size={18} className="mr-2" />
              System
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <h2 className="text-lg font-medium mb-4">Notification Settings</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Email notifications</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Receive email notifications for important updates</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={settings.emailNotifications}
              onChange={() => handleSettingChange('emailNotifications', !settings.emailNotifications)}
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Desktop notifications</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Show desktop notifications when new emails arrive</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={settings.desktopNotifications}
              onChange={() => handleSettingChange('desktopNotifications', !settings.desktopNotifications)}
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Notify on important emails</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Get notified when AI identifies an email as important</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={settings.notifyOnImportant}
              onChange={() => handleSettingChange('notifyOnImportant', !settings.notifyOnImportant)}
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Notify on mentions</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Get notified when you're mentioned in an email</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={settings.notifyOnMentions}
              onChange={() => handleSettingChange('notifyOnMentions', !settings.notifyOnMentions)}
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderSignatureSettings = () => (
    <div className="space-y-6">
      <h2 className="text-lg font-medium mb-4">Email Signature</h2>
      
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Default signature</h3>
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm flex items-center"
            >
              <Edit size={14} className="mr-1" />
              Edit
            </button>
          )}
        </div>
        
        {isEditing ? (
          <div className="space-y-4">
            <textarea 
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              className="w-full h-40 p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              You can use HTML to format your signature.
            </p>
            <div className="flex space-x-3">
              <button 
                onClick={handleSaveSignature}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center"
              >
                <Check size={16} className="mr-2" />
                Save Signature
              </button>
              <button 
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-700 rounded-md p-4">
            <div dangerouslySetInnerHTML={{ __html: signature }} />
          </div>
        )}
      </div>
    </div>
  );

  const renderAISettings = () => (
    <div className="space-y-6">
      <h2 className="text-lg font-medium mb-4">AI Settings</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">Default AI model</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Select the AI model to use for email analysis and response generation</p>
          <select 
            className="w-full max-w-xs px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={settings.defaultModel}
            onChange={(e) => handleSettingChange('defaultModel', e.target.value)}
          >
            <option value="gpt4">OpenAI GPT-4</option>
            <option value="claude">Anthropic Claude</option>
            <option value="gemini">Google Gemini</option>
            <option value="mistral">Mistral AI</option>
            <option value="llama">Meta Llama</option>
          </select>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Use local inference</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Run AI models locally for enhanced privacy</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={settings.localInference}
              onChange={() => handleSettingChange('localInference', !settings.localInference)}
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Include previous emails</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Include context from previous emails in the thread when generating responses</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={settings.includePreviousEmails}
              onChange={() => handleSettingChange('includePreviousEmails', !settings.includePreviousEmails)}
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Response length</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Set the default length for AI-generated responses</p>
          <select 
            className="w-full max-w-xs px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={settings.maxResponseLength}
            onChange={(e) => handleSettingChange('maxResponseLength', e.target.value)}
          >
            <option value="Concise">Concise (1-2 paragraphs)</option>
            <option value="Medium">Medium (2-3 paragraphs)</option>
            <option value="Detailed">Detailed (3+ paragraphs)</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderAPISettings = () => (
    <div className="space-y-6">
      <h2 className="text-lg font-medium mb-4">API Integration Settings</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">API Endpoint</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">The URL for your custom API integration</p>
          <input 
            type="text"
            value={settings.apiEndpoint}
            onChange={(e) => handleSettingChange('apiEndpoint', e.target.value)}
            className="w-full max-w-lg px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://api.example.com"
          />
        </div>
        
        <div>
          <h3 className="font-medium mb-2">API Key</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Authentication key for your API</p>
          <div className="flex max-w-lg">
            <input 
              type="password"
              value={settings.apiKey}
              onChange={(e) => handleSettingChange('apiKey', e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your API Key"
            />
            <button className="px-3 py-2 bg-gray-200 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-r-md hover:bg-gray-300 dark:hover:bg-gray-500">
              Show
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Enable webhook notifications</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Send webhook notifications for email events</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={settings.webhookEnabled}
              onChange={() => handleSettingChange('webhookEnabled', !settings.webhookEnabled)}
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <div className="pt-4">
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md flex items-center">
            <Link size={16} className="mr-2" />
            Test Connection
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            className={`px-4 py-3 text-sm font-medium flex items-center ${
              activeTab === 'general' 
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
            onClick={() => setActiveTab('general')}
          >
            <User size={18} className="mr-2" />
            General
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium flex items-center ${
              activeTab === 'notifications' 
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
            onClick={() => setActiveTab('notifications')}
          >
            <Bell size={18} className="mr-2" />
            Notifications
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium flex items-center ${
              activeTab === 'signature' 
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
            onClick={() => setActiveTab('signature')}
          >
            <FileText size={18} className="mr-2" />
            Signature
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium flex items-center ${
              activeTab === 'ai' 
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
            onClick={() => setActiveTab('ai')}
          >
            <Zap size={18} className="mr-2" />
            AI Settings
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium flex items-center ${
              activeTab === 'api' 
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
            onClick={() => setActiveTab('api')}
          >
            <Link size={18} className="mr-2" />
            API Integration
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'general' && renderGeneralSettings()}
          {activeTab === 'notifications' && renderNotificationSettings()}
          {activeTab === 'signature' && renderSignatureSettings()}
          {activeTab === 'ai' && renderAISettings()}
          {activeTab === 'api' && renderAPISettings()}
          
          {activeTab !== 'signature' && (
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button 
                onClick={handleSaveSettings}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center"
              >
                <Check size={18} className="mr-2" />
                Save Settings
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;