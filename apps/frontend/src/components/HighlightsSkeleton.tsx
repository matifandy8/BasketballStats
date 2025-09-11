import React from 'react';

interface HighlightsSkeletonProps {
  count?: number;
}

const HighlightsSkeleton: React.FC<HighlightsSkeletonProps> = ({ count = 5 }) => {
  return (
    <div className="bg-gradient-to-t from-black to-transparent flex gap-6 overflow-hidden px-4 py-4 -mx-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex flex-col gap-3 flex-shrink-0 w-[300px] bg-gray-800/50">
          <div className="w-full h-40 bg-stone-800 rounded-lg animate-pulse" />
          <div className="h-4 bg-stone-800 rounded animate-pulse" />
          <div className="h-3 bg-stone-800 rounded animate-pulse w-3/4" />
        </div>
      ))}
    </div>
  );
};

export default HighlightsSkeleton;
