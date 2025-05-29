import React from 'react';

const ActivityChart = () => {
  // This is a placeholder for a real chart component
  // In a real application, you would use a library like Chart.js or Recharts
  
  return (
    <div className="h-64 flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-between text-gray-500 dark:text-gray-400 mb-2 px-8">
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
          <div>Sun</div>
        </div>
        
        {/* Fake bar chart */}
        <div className="flex items-end h-40 space-x-6 px-4">
          <div className="w-12 bg-blue-500 rounded-t-md" style={{ height: '30%' }}></div>
          <div className="w-12 bg-blue-500 rounded-t-md" style={{ height: '60%' }}></div>
          <div className="w-12 bg-blue-500 rounded-t-md" style={{ height: '45%' }}></div>
          <div className="w-12 bg-blue-500 rounded-t-md" style={{ height: '80%' }}></div>
          <div className="w-12 bg-blue-500 rounded-t-md" style={{ height: '65%' }}></div>
          <div className="w-12 bg-blue-500 rounded-t-md" style={{ height: '20%' }}></div>
          <div className="w-12 bg-blue-500 rounded-t-md" style={{ height: '40%' }}></div>
        </div>
        
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          Email volume for the past week
        </div>
      </div>
    </div>
  );
};

export default ActivityChart;