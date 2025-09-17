import React, { useState } from 'react';
import { Download, Trophy, Target, TrendingUp, Users, Clock, CheckCircle, XCircle } from 'lucide-react';

const ResultsScreen = ({ 
  results, 
  onExport, 
  onWebhookSubmit, 
  onTestReset, 
  xp, 
  streak, 
  badges, 
  webhookUrl 
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [exportFormat, setExportFormat] = useState('json');

  const handleExport = async (format) => {
    setIsExporting(true);
    try {
      await onExport(format);
    } finally {
      setIsExporting(false);
    }
  };

  const handleWebhookSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onWebhookSubmit();
    } finally {
      setIsSubmitting(false);
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Advanced': return 'text-green-600 bg-green-100';
      case 'Proficient': return 'text-blue-600 bg-blue-100';
      case 'Developing': return 'text-yellow-600 bg-yellow-100';
      case 'Novice': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 0.8) return 'text-green-600';
    if (score >= 0.6) return 'text-blue-600';
    if (score >= 0.4) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Assessment Complete!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Here are your results and recommendations
          </p>
        </div>

        {/* Gamification Summary */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <Trophy className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {xp} XP
            </h3>
            <p className="text-gray-600 dark:text-gray-400">Total Experience</p>
          </div>
          
          <div className="card p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {streak}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">Best Streak</p>
          </div>
          
          <div className="card p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <Target className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {badges.length}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">Badges Earned</p>
          </div>
        </div>

        {/* Overall Results */}
        <div className="card p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Overall Performance
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Overall Score</span>
                  <span className={`text-2xl font-bold ${getScoreColor(results.overallScore)}`}>
                    {Math.round(results.overallScore * 100)}%
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Proficiency Level</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(results.proficiencyLevel)}`}>
                    {results.proficiencyLevel}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Time</span>
                  <span className="text-gray-900 dark:text-gray-100">
                    {formatDuration(results.metadata.totalTime)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Items Completed</span>
                  <span className="text-gray-900 dark:text-gray-100">
                    {results.metadata.totalItems}
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Score Breakdown
              </h3>
              
              <div className="space-y-3">
                {Object.entries(results.domainScores).map(([domain, score]) => (
                  <div key={domain} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                      {domain.replace('_', ' ')}
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getScoreColor(score).replace('text-', 'bg-')}`}
                          style={{ width: `${score * 100}%` }}
                        />
                      </div>
                      <span className={`text-sm font-medium ${getScoreColor(score)}`}>
                        {Math.round(score * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        {results.recommendations && results.recommendations.length > 0 && (
          <div className="card p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Learning Recommendations
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Recommended Modules
                </h3>
                <ul className="space-y-2">
                  {results.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {rec.replace('module_', '').replace('_', ' ')}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {results.misconceptions && results.misconceptions.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Areas for Improvement
                  </h3>
                  <ul className="space-y-2">
                    {results.misconceptions.map((misconception, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <XCircle className="w-4 h-4 text-red-600" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {misconception}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Export and Actions */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Export Results
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Download Results
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <select
                    value={exportFormat}
                    onChange={(e) => setExportFormat(e.target.value)}
                    className="select-field"
                  >
                    <option value="json">JSON Format</option>
                    <option value="csv">CSV Format</option>
                  </select>
                  
                  <button
                    onClick={() => handleExport(exportFormat)}
                    disabled={isExporting}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isExporting ? 'Exporting...' : 'Export'}</span>
                  </button>
                </div>
              </div>
            </div>
            
            {webhookUrl && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Submit Results
                </h3>
                
                <button
                  onClick={handleWebhookSubmit}
                  disabled={isSubmitting}
                  className="btn-success flex items-center space-x-2"
                >
                  <Users className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting...' : 'Submit to System'}</span>
                </button>
              </div>
            )}
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onTestReset}
              className="btn-secondary"
            >
              Take Another Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;
