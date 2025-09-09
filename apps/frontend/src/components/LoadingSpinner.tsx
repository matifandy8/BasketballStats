interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-8 w-8 border-2',
    md: 'h-16 w-16 border-2',
    lg: 'h-32 w-32 border-b-2',
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className={`animate-spin rounded-full border-white ${sizeClasses[size]}`}></div>
    </div>
  );
};

export const PageLoading: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`container mx-auto p-6 rounded-lg shadow-md text-left flex justify-center items-center h-[50vh] ${className}`}
  >
    <LoadingSpinner size="lg" />
  </div>
);
