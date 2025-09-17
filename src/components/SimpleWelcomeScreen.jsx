import React, { useState } from 'react';
import { Play, User, Mail } from 'lucide-react';

const SimpleWelcomeScreen = ({ onTestStart }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isStarting, setIsStarting] = useState(false);

  const handleStart = async () => {
    if (!name.trim() || !email.trim()) {
      alert('Please enter both name and email address');
      return;
    }

    setIsStarting(true);
    await onTestStart({ name: name.trim(), email: email.trim() });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Data Analysis Assessment
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Test your knowledge of data analysis concepts
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>

            {/* Start Button */}
            <button
              onClick={handleStart}
              disabled={isStarting || !name.trim() || !email.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              {isStarting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Starting Assessment...</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  <span>Start Assessment</span>
                </>
              )}
            </button>
          </div>

          {/* Info */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This assessment takes approximately 30 minutes and includes 50 conceptual questions about data analysis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleWelcomeScreen;
