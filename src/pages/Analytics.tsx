import React, { useState } from 'react';
import { Calendar, BarChart3, Clock, Filter, Zap, Download, RefreshCw } from 'lucide-react';
import EmailStats from '../components/dashboard/EmailStats';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('month');
  
  // Sample data - would come from an API in a real app
  const aiStats = [
    { label: 'Total Emails Processed', value: '5,832', icon: <BarChart3 size={20} />, color: 'bg-blue-500' },
    { label: 'AI Responses Generated', value: '1,247', icon: <Zap size={20} />, color: 'bg-purple-500' },
    { label: 'AI Response Rate', value: '21.4%', icon: <BarChart3 size={20} />, color: 'bg-green-500' },
    { label: 'Time Saved (est.)', value: '148hrs', icon: <Clock size={20} />, color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="week">Past Week</option>
            <option value="month">Past Month</option>
            <option value="quarter">Past Quarter</option>
            <option value="year">Past Year</option>
          </select>
          <button className="p-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
            <Download size={18} />
          </button>
          <button className="p-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
            <RefreshCw size={18} />
          </button>
        </div>
      </div>
      
      {/* Stats Grid */}
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
      
      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Email Volume</h2>
            <button className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <Filter size={16} className="mr-1" />
              Filter
            </button>
          </div>
          <div className="h-64 flex items-center justify-center">
            {/* Placeholder for Email Volume Chart */}
            <div className="text-center w-full">
              <div className="flex justify-between text-gray-500 dark:text-gray-400 mb-2 px-4">
                {timeRange === 'week' ? (
                  <>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                    <div>Sun</div>
                  </>
                ) : (
                  <>
                    <div>Week 1</div>
                    <div>Week 2</div>
                    <div>Week 3</div>
                    <div>Week 4</div>
                  </>
                )}
              </div>
              
              {/* Fake bar chart */}
              <div className="relative h-40 w-full">
                <div className="absolute inset-0 flex items-end justify-around">
                  <div className="w-12 bg-blue-500 rounded-t-md animate-grow" style={{ height: '60%' }}></div>
                  <div className="w-12 bg-blue-500 rounded-t-md animate-grow" style={{ height: '80%', animationDelay: '0.1s' }}></div>
                  <div className="w-12 bg-blue-500 rounded-t-md animate-grow" style={{ height: '40%', animationDelay: '0.2s' }}></div>
                  <div className="w-12 bg-blue-500 rounded-t-md animate-grow" style={{ height: '70%', animationDelay: '0.3s' }}></div>
                  {timeRange === 'week' && (
                    <>
                      <div className="w-12 bg-blue-500 rounded-t-md animate-grow" style={{ height: '30%', animationDelay: '0.4s' }}></div>
                      <div className="w-12 bg-blue-500 rounded-t-md animate-grow" style={{ height: '20%', animationDelay: '0.5s' }}></div>
                      <div className="w-12 bg-blue-500 rounded-t-md animate-grow" style={{ height: '50%', animationDelay: '0.6s' }}></div>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                <div>Received: 423</div>
                <div>Sent: 256</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">AI Usage Metrics</h2>
            <button className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <Filter size={16} className="mr-1" />
              Filter
            </button>
          </div>
          <div className="h-64 flex items-center justify-center">
            {/* Placeholder for AI Usage Chart */}
            <div className="text-center w-full">
              <div className="relative h-40 w-full">
                <svg className="w-full h-full" viewBox="0 0 600 160">
                  {/* Grid lines */}
                  <line x1="0" y1="40" x2="600" y2="40" stroke="#e5e7eb" strokeWidth="1" />
                  <line x1="0" y1="80" x2="600" y2="80" stroke="#e5e7eb" strokeWidth="1" />
                  <line x1="0" y1="120" x2="600" y2="120" stroke="#e5e7eb" strokeWidth="1" />
                  
                  {/* Line for Responses */}
                  <path 
                    d="M0,120 L100,100 L200,80 L300,70 L400,40 L500,50 L600,30" 
                    fill="none" 
                    stroke="#8b5cf6" 
                    strokeWidth="3"
                    className="animate-draw-line"
                  />
                  
                  {/* Line for Accuracy */}
                  <path 
                    d="M0,90 L100,85 L200,75 L300,80 L400,70 L500,60 L600,65" 
                    fill="none" 
                    stroke="#ef4444" 
                    strokeWidth="3" 
                    strokeDasharray="5,5"
                    className="animate-draw-line"
                    style={{ animationDelay: '0.5s' }}
                  />
                  
                  {/* Data points */}
                  <circle cx="0" cy="120" r="4" fill="#8b5cf6" className="animate-fade-in" />
                  <circle cx="100" cy="100" r="4" fill="#8b5cf6" className="animate-fade-in" style={{ animationDelay: '0.1s' }} />
                  <circle cx="200" cy="80" r="4" fill="#8b5cf6" className="animate-fade-in" style={{ animationDelay: '0.2s' }} />
                  <circle cx="300" cy="70" r="4" fill="#8b5cf6" className="animate-fade-in" style={{ animationDelay: '0.3s' }} />
                  <circle cx="400" cy="40" r="4" fill="#8b5cf6" className="animate-fade-in" style={{ animationDelay: '0.4s' }} />
                  <circle cx="500" cy="50" r="4" fill="#8b5cf6" className="animate-fade-in" style={{ animationDelay: '0.5s' }} />
                  <circle cx="600" cy="30" r="4" fill="#8b5cf6" className="animate-fade-in" style={{ animationDelay: '0.6s' }} />
                  
                  <circle cx="0" cy="90" r="4" fill="#ef4444" className="animate-fade-in" style={{ animationDelay: '0.7s' }} />
                  <circle cx="100" cy="85" r="4" fill="#ef4444" className="animate-fade-in" style={{ animationDelay: '0.8s' }} />
                  <circle cx="200" cy="75" r="4" fill="#ef4444" className="animate-fade-in" style={{ animationDelay: '0.9s' }} />
                  <circle cx="300" cy="80" r="4" fill="#ef4444" className="animate-fade-in" style={{ animationDelay: '1s' }} />
                  <circle cx="400" cy="70" r="4" fill="#ef4444" className="animate-fade-in" style={{ animationDelay: '1.1s' }} />
                  <circle cx="500" cy="60" r="4" fill="#ef4444" className="animate-fade-in" style={{ animationDelay: '1.2s' }} />
                  <circle cx="600" cy="65" r="4" fill="#ef4444" className="animate-fade-in" style={{ animationDelay: '1.3s' }} />
                </svg>
              </div>
              
              <div className="flex justify-center space-x-6 mt-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">AI Responses</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">Response Quality</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Additional Stats */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Detailed Metrics</h2>
          <div className="flex items-center space-x-3">
            <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-650">
              Categories
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-650">
              Labels
            </button>
            <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-300 dark:border-blue-800 rounded-md">
              AI Stats
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 dark:bg-gray-750 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Metric
                </th>
                <th className="px-6 py-3 bg-gray-50 dark:bg-gray-750 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Count
                </th>
                <th className="px-6 py-3 bg-gray-50 dark:bg-gray-750 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  % of Total
                </th>
                <th className="px-6 py-3 bg-gray-50 dark:bg-gray-750 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  AI Analysis Performed
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  4,217
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  72.3%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400">
                  +12.7%
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  Auto-Replies Sent
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  867
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  14.9%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400">
                  +23.5%
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  Edit Rate of AI Responses
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  286
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  22.9%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 dark:text-red-400">
                  -4.2%
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  Auto-Categorized Emails
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  3,845
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  65.9%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400">
                  +8.3%
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  API Integration Calls
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  1,423
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  24.4%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400">
                  +31.7%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;