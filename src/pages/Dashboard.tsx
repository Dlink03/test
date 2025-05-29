import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Inbox, Send, Archive, Clock, AlertCircle, CheckCircle, BarChart3, Zap } from 'lucide-react';
import EmailStats from '../components/dashboard/EmailStats';
import ActivityChart from '../components/dashboard/ActivityChart';
import RecentEmails from '../components/dashboard/RecentEmails';
import AiUsageStats from '../components/dashboard/AiUsageStats';

const Dashboard = () => {
  const navigate = useNavigate();

  // Sample data - would come from an API in a real app
  const stats = [
    { label: 'Unread', value: 23, icon: <Inbox size={20} />, color: 'bg-blue-500' },
    { label: 'Sent Today', value: 12, icon: <Send size={20} />, color: 'bg-green-500' },
    { label: 'Archived', value: 148, icon: <Archive size={20} />, color: 'bg-purple-500' },
    { label: 'Scheduled', value: 5, icon: <Clock size={20} />, color: 'bg-yellow-500' },
  ];

  const aiStats = [
    { label: 'Emails Analyzed', value: 1248, icon: <BarChart3 size={20} />, color: 'bg-indigo-500' },
    { label: 'AI Replies Sent', value: 289, icon: <Zap size={20} />, color: 'bg-teal-500' },
    { label: 'Time Saved', value: '32hrs', icon: <Clock size={20} />, color: 'bg-pink-500' },
    { label: 'Accuracy Rate', value: '96.5%', icon: <CheckCircle size={20} />, color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex space-x-4">
          <button 
            onClick={() => navigate('/inbox')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-200"
          >
            <Inbox size={18} className="mr-2" />
            Inbox
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg flex items-center transition-colors duration-200">
            <Zap size={18} className="mr-2" />
            Run AI Analysis
          </button>
        </div>
      </div>

      {/* Alert if needed */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 text-yellow-700 dark:text-yellow-300 p-4 rounded-lg flex items-start">
        <AlertCircle size={20} className="mr-2 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Attention Required</p>
          <p className="text-sm">You have 3 important emails that require your attention.</p>
        </div>
      </div>

      {/* Email Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <EmailStats 
            key={index}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Email Activity</h2>
          <ActivityChart />
        </div>

        {/* Recent Emails */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Priority Inbox</h2>
          <RecentEmails />
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-8">AI Performance</h2>

      {/* AI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {aiStats.map((stat, index) => (
          <EmailStats 
            key={index}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">AI Usage Analytics</h2>
        <AiUsageStats />
      </div>
    </div>
  );
};

export default Dashboard;