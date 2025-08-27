import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-8 text-center bg-gradient-to-t from-black to-transparent">
      <AlertTriangle className="w-16 h-16 text-red-500 mb-6" />
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-400 mb-8 max-w-md">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-2 bg-white text-black rounded-md hover:bg-gray-500 transition-colors cursor-pointer"
      >
        Return to Home
      </button>
    </div>
  );
}
