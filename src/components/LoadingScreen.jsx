import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingScreen = ({ message = 'Loading...' }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {message}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Please wait while we prepare your assessment...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
