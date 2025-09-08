import React from 'react';

interface ErrorComponentProps {
  error: Error | string;
  onRetry?: () => void;
  className?: string;
  retryButtonText?: string;
}

export const ErrorComponent: React.FC<ErrorComponentProps> = ({
  error,
  onRetry,
  className = '',
  retryButtonText = 'Retry',
}) => {
  const errorMessage = typeof error === 'string' ? error : error.message;

  return (
    <div
      className={`container mx-auto p-6 rounded-lg shadow-md text-left flex flex-col justify-center items-center h-[50vh] space-y-4 ${className}`}
    >
      <div className="text-red-500 text-xl font-medium">Error: {errorMessage}</div>
      {(onRetry || typeof window !== 'undefined') && (
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          onClick={onRetry || (() => window.location.reload())}
        >
          {retryButtonText}
        </button>
      )}
    </div>
  );
};

export const PageError: React.FC<{ error: Error | string; className?: string }> = ({
  error,
  className = '',
}) => <ErrorComponent error={error} className={className} />;
