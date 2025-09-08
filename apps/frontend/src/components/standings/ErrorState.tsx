import React from 'react';

type ErrorStateProps = {
  error?: Error | null;
  league?: string;
  onRetry?: () => void;
};

export const ErrorState: React.FC<ErrorStateProps> = ({ error, league, onRetry }) => (
  <div className="max-w-2xl mx-auto p-6 bg-red-50 dark:bg-red-900/20 rounded-lg">
    <h2 className="text-xl font-bold text-red-800 dark:text-red-200 mb-2">
      Error Loading {league?.toUpperCase()} Standings
    </h2>
    <p className="text-red-700 dark:text-red-300 mb-4">
      {error?.message || 'Failed to load standings data. Please try again later.'}
    </p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        Retry
      </button>
    )}
  </div>
);
