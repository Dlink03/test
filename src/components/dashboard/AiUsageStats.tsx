import React from 'react';

const AiUsageStats = () => {
  // This is a placeholder for a real chart component
  
  return (
    <div className="h-64 flex items-center justify-center">
      <div className="text-center w-full">
        <div className="flex justify-between text-gray-500 dark:text-gray-400 mb-2 px-4">
          <div>Jan</div>
          <div>Feb</div>
          <div>Mar</div>
          <div>Apr</div>
          <div>May</div>
          <div>Jun</div>
        </div>
        
        {/* Fake line chart */}
        <div className="relative h-40 w-full">
          <div className="absolute inset-0 flex items-end">
            <svg className="w-full h-full" viewBox="0 0 600 160">
              {/* Grid lines */}
              <line x1="0" y1="40" x2="600" y2="40" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="0" y1="80" x2="600" y2="80" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="0" y1="120" x2="600" y2="120" stroke="#e5e7eb" strokeWidth="1" />
              
              {/* Line for AI Usage */}
              <path 
                d="M0,120 L100,100 L200,80 L300,90 L400,60 L500,40 L600,30" 
                fill="none" 
                stroke="#8b5cf6" 
                strokeWidth="3"
              />
              
              {/* Line for Accuracy */}
              <path 
                d="M0,80 L100,90 L200,70 L300,60 L400,50 L500,40 L600,30" 
                fill="none" 
                stroke="#ef4444" 
                strokeWidth="3" 
                strokeDasharray="5,5"
              />
              
              {/* Data points */}
              <circle cx="0" cy="120" r="4" fill="#8b5cf6" />
              <circle cx="100" cy="100" r="4" fill="#8b5cf6" />
              <circle cx="200" cy="80" r="4" fill="#8b5cf6" />
              <circle cx="300" cy="90" r="4" fill="#8b5cf6" />
              <circle cx="400" cy="60" r="4" fill="#8b5cf6" />
              <circle cx="500" cy="40" r="4" fill="#8b5cf6" />
              <circle cx="600" cy="30" r="4" fill="#8b5cf6" />
              
              <circle cx="0" cy="80" r="4" fill="#ef4444" />
              <circle cx="100" cy="90" r="4" fill="#ef4444" />
              <circle cx="200" cy="70" r="4" fill="#ef4444" />
              <circle cx="300" cy="60" r="4" fill="#ef4444" />
              <circle cx="400" cy="50" r="4" fill="#ef4444" />
              <circle cx="500" cy="40" r="4" fill="#ef4444" />
              <circle cx="600" cy="30" r="4" fill="#ef4444" />
            </svg>
          </div>
        </div>
        
        <div className="flex justify-center space-x-6 mt-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">AI Usage</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">Accuracy</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiUsageStats;