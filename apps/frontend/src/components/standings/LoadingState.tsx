import React from 'react';

export const LoadingState: React.FC = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-pulse flex flex-col items-center">
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-48 mb-2"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
    </div>
  </div>
);
