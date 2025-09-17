import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, RefreshCw } from 'lucide-react';

const CompletionScreen = ({ results, onRestart }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Auto-submit results after a brief delay
    const timer = setTimeout(() => {
      handleSubmitResults();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmitResults = async () => {
    if (submitted) return;
    
    setIsSubmitting(true);
    try {
      // Results are automatically submitted via the App component
      setSubmitted(true);
    } catch (error) {
      console.error('Failed to submit results:', error);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Assessment Complete!
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Thank you for completing the data analysis assessment
            </p>
          </div>

          {/* Status */}
          <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-center space-x-3">
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-6 h-6 text-blue-600 dark:text-blue-400 animate-spin" />
                  <span className="text-blue-800 dark:text-blue-200 font-medium">
                    Reviewing your answers...
                  </span>
                </>
              ) : submitted ? (
                <>
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                  <span className="text-green-800 dark:text-green-200 font-medium">
                    Results submitted successfully!
                  </span>
                </>
              ) : (
                <>
                  <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <span className="text-blue-800 dark:text-blue-200 font-medium">
                    Preparing your results...
                  </span>
                </>
              )}
            </div>
          </div>


          {/* Actions */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={onRestart}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center space-x-2"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Take Assessment Again</span>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Your results have been automatically saved and will be reviewed by our team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletionScreen;
