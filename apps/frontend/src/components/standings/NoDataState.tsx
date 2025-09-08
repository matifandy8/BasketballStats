import React from 'react';

type NoDataStateProps = {
  league?: string;
  seasonYear?: number | string;
};

export const NoDataState: React.FC<NoDataStateProps> = ({ league, seasonYear }) => (
  <div className="text-center p-8">
    <div className="text-gray-500 dark:text-gray-400 text-lg mb-4">
      No standings data available for {league?.toUpperCase()} {seasonYear || ''}
    </div>
    <p className="text-sm text-gray-400 dark:text-gray-500">
      The season may not have started yet or data is currently unavailable.
    </p>
  </div>
);
