import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, XCircle, Clock, Zap, Trophy, Code, Database, Target } from 'lucide-react';
import CodeEditor from './CodeEditor.jsx';
import ProgressBar from './ProgressBar.jsx';

const TestInterface = ({ 
  currentItem, 
  progress, 
  onResponseSubmit, 
  onTestReset, 
  xp, 
  streak, 
  badges 
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [codeAnswer, setCodeAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(progress.timeRemaining || 0);
  const [showExplanation, setShowExplanation] = useState(false);
  
  const timerRef = useRef(null);

  // Timer effect
  useEffect(() => {
    if (timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1000) {
            // Time's up - auto submit
            handleSubmit();
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timeRemaining]);

  // Reset state when item changes
  useEffect(() => {
    setSelectedAnswer(null);
    setSelectedAnswers([]);
    setCodeAnswer('');
    setShowExplanation(false);
  }, [currentItem]);

  const handleSubmit = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    let answer;
    if (currentItem.type === 'mcq') {
      answer = selectedAnswer;
    } else if (currentItem.type === 'msq') {
      answer = selectedAnswers;
    } else if (currentItem.type === 'sql' || currentItem.type === 'python') {
      answer = codeAnswer;
    }
    
    if (answer !== null && answer !== undefined) {
      await onResponseSubmit({
        answer,
        timeSpent: progress.timeRemaining - timeRemaining
      });
    }
    
    setIsSubmitting(false);
  };

  const handleAnswerSelect = (index) => {
    if (currentItem.type === 'mcq') {
      setSelectedAnswer(index);
    } else if (currentItem.type === 'msq') {
      setSelectedAnswers(prev => {
        if (prev.includes(index)) {
          return prev.filter(i => i !== index);
        } else {
          return [...prev, index];
        }
      });
    }
  };

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getStageIcon = (stage) => {
    switch (stage) {
      case 'warmup': return <Zap className="w-5 h-5" />;
      case 'core': return <Target className="w-5 h-5" />;
      case 'boss': return <Trophy className="w-5 h-5" />;
      default: return <CheckCircle className="w-5 h-5" />;
    }
  };

  const getStageColor = (stage) => {
    switch (stage) {
      case 'warmup': return 'text-blue-600 bg-blue-100';
      case 'core': return 'text-green-600 bg-green-100';
      case 'boss': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (!currentItem) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading next question...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Stage Indicator */}
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getStageColor(progress.stage)}`}>
                {getStageIcon(progress.stage)}
                <span className="text-sm font-medium capitalize">{progress.stage}</span>
              </div>
              
              {/* Progress */}
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Question {progress.currentItemIndex + 1} of {progress.totalItems}
              </div>
            </div>

            {/* Gamification Stats */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-yellow-600">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-medium">{xp} XP</span>
              </div>
              
              {streak > 0 && (
                <div className="flex items-center space-x-2 text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">{streak} streak</span>
                </div>
              )}
              
              {badges.length > 0 && (
                <div className="flex items-center space-x-2 text-purple-600">
                  <Trophy className="w-4 h-4" />
                  <span className="text-sm font-medium">{badges.length} badge{badges.length > 1 ? 's' : ''}</span>
                </div>
              )}
            </div>

            {/* Timer */}
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className={`text-sm font-medium ${timeRemaining < 300000 ? 'text-red-600' : 'text-gray-600 dark:text-gray-400'}`}>
                {formatTime(timeRemaining)}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <ProgressBar 
              progress={progress.progress || 0} 
              stage={progress.stage}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Question Panel */}
          <div className="lg:col-span-2">
            <div className="card p-6">
              {/* Question Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  {currentItem.type === 'sql' && <Database className="w-6 h-6 text-blue-600" />}
                  {currentItem.type === 'python' && <Code className="w-6 h-6 text-green-600" />}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {currentItem.type === 'sql' ? 'SQL Query' : 
                       currentItem.type === 'python' ? 'Python Code' :
                       currentItem.type === 'msq' ? 'Multiple Select' : 'Multiple Choice'}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Difficulty: {currentItem.difficulty === 1 ? 'Easy' : 
                                  currentItem.difficulty === 2 ? 'Medium' : 'Hard'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Question Stem */}
              <div className="mb-6">
                <p className="text-gray-900 dark:text-gray-100 text-lg leading-relaxed">
                  {currentItem.stem}
                </p>
              </div>

              {/* Question Content */}
              {currentItem.type === 'mcq' && (
                <div className="space-y-3">
                  {currentItem.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                        selectedAnswer === index
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                          selectedAnswer === index
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300 dark:border-gray-600'
                        }`}>
                          {selectedAnswer === index && (
                            <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                          )}
                        </div>
                        <span className="text-gray-900 dark:text-gray-100">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {currentItem.type === 'msq' && (
                <div className="space-y-3">
                  {currentItem.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                        selectedAnswers.includes(index)
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded border-2 mr-3 ${
                          selectedAnswers.includes(index)
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300 dark:border-gray-600'
                        }`}>
                          {selectedAnswers.includes(index) && (
                            <CheckCircle className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <span className="text-gray-900 dark:text-gray-100">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {(currentItem.type === 'sql' || currentItem.type === 'python') && (
                <div className="space-y-4">
                  {/* Schema/Assets Info */}
                  {currentItem.assets && (
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                        Available Data:
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {currentItem.assets.schema}
                      </p>
                    </div>
                  )}

                  {/* Code Editor */}
                  <CodeEditor
                    value={codeAnswer}
                    onChange={setCodeAnswer}
                    language={currentItem.type}
                    placeholder={`Enter your ${currentItem.type.toUpperCase()} code here...`}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Submit Button */}
            <div className="card p-6">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || (currentItem.type === 'mcq' && selectedAnswer === null) || 
                         (currentItem.type === 'msq' && selectedAnswers.length === 0) ||
                         (currentItem.type === 'sql' && codeAnswer.trim() === '') ||
                         (currentItem.type === 'python' && codeAnswer.trim() === '')}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </div>
                ) : (
                  'Submit Answer'
                )}
              </button>
            </div>

            {/* Test Controls */}
            <div className="card p-6">
              <button
                onClick={onTestReset}
                className="w-full btn-secondary"
              >
                Exit Test
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestInterface;
