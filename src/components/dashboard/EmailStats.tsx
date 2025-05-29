import React from 'react';

interface EmailStatsProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

const EmailStats: React.FC<EmailStatsProps> = ({ label, value, icon, color }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 flex items-center">
      <div className={`${color} p-3 rounded-lg mr-4`}>
        <div className="text-white">{icon}</div>
      </div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </div>
  );
};

export default EmailStats;