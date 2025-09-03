export default function TeamSkeleton() {
  return (
    <div className="bg-gradient-to-t from-black to-transparent py-8 px-2 container mx-auto animate-pulse">
      <div className="h-8 bg-gray-700 rounded w-1/2 mx-auto mb-14"></div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-16">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex flex-col items-start rounded-2xl bg-gray-800/50 p-4">
            <div className="w-36 h-36 bg-gray-700 rounded-lg mb-4 self-center"></div>
            <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-1/6"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
