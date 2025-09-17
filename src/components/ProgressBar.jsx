import React from 'react';

const ProgressBar = ({ progress, stage }) => {
  const getStageColor = (stage) => {
    switch (stage) {
      case 'warmup': return 'bg-blue-500';
      case 'core': return 'bg-green-500';
      case 'boss': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getStageLabel = (stage) => {
    switch (stage) {
      case 'warmup': return 'Warm-up';
      case 'core': return 'Core Assessment';
      case 'boss': return 'Boss Task';
      default: return 'Assessment';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {getStageLabel(stage)}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {Math.round(progress * 100)}%
        </span>
      </div>
      
      <div className="progress-bar">
        <div
          className={`progress-fill ${getStageColor(stage)}`}
          style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
