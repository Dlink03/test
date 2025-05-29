import React from 'react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({ 
  size = 'md', 
  color = 'text-blue-600 dark:text-blue-400' 
}) => {
  const sizeClass = 
    size === 'sm' ? 'h-5 w-5 border-2' : 
    size === 'lg' ? 'h-12 w-12 border-4' : 
    'h-8 w-8 border-3';

  return (
    <div className="flex justify-center items-center py-12">
      <div className={`animate-spin rounded-full ${sizeClass} border-t-transparent ${color}`}></div>
    </div>
  );
};

export default Loader;