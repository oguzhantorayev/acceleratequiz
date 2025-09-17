import React, { useState } from 'react';
import { Play, Settings, Shield, Clock, Target, Users } from 'lucide-react';

const WelcomeScreen = ({ onTestStart, onSettingsChange, onAdminToggle, settings }) => {
  const [studentAlias, setStudentAlias] = useState(settings.studentAlias || '');
  const [showSettings, setShowSettings] = useState(false);
  const [localSettings, setLocalSettings] = useState(settings);

  const handleStartTest = () => {
    onTestStart(studentAlias);
  };

  const handleSettingsSave = () => {
    onSettingsChange(localSettings);
    setShowSettings(false);
  };

  const handleAdminAccess = () => {
    const password = prompt('Enter admin password:');
    if (password === 'admin123') { // Simple password for demo
      onAdminToggle();
    } else {
      alert('Invalid password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Data Analysis Baseline Assessment
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A 30-minute gamified assessment to measure your current data analysis skills across 
            SQL, Python, statistics, visualization, and data ethics.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="card p-6 text-center">
              <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">30 Minutes</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Quick assessment designed to fit your schedule
              </p>
            </div>
            
            <div className="card p-6 text-center">
              <Target className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Adaptive Testing</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Questions adjust to your skill level for accurate results
              </p>
            </div>
            
            <div className="card p-6 text-center">
              <Shield className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Privacy First</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your data stays local, no external tracking
              </p>
            </div>
          </div>

          {/* Assessment Domains */}
          <div className="card p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Assessment Domains</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  <span className="font-medium">Data Literacy & CSV Hygiene (10%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="font-medium">Descriptive Statistics (15%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                  <span className="font-medium">SQL Queries (25%)</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                  <span className="font-medium">Python & Pandas (25%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                  <span className="font-medium">Visualization Literacy (10%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full mr-3"></div>
                  <span className="font-medium">Ethics & Privacy (15%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Start Test Section */}
          <div className="card p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Ready to Begin?</h2>
            
            <div className="max-w-md mx-auto space-y-6">
              {/* Student Alias Input */}
              <div>
                <label htmlFor="studentAlias" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Student Alias (Optional)
                </label>
                <input
                  type="text"
                  id="studentAlias"
                  value={studentAlias}
                  onChange={(e) => setStudentAlias(e.target.value)}
                  placeholder="Enter your name or alias"
                  className="input-field"
                />
              </div>

              {/* Important Notice */}
              <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Shield className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                      Important Notice
                    </h3>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                      This assessment is designed for placement purposes. Honest responses help us 
                      provide you with the most appropriate learning path.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleStartTest}
                  className="btn-primary flex-1 flex items-center justify-center"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Assessment
                </button>
                
                <button
                  onClick={() => setShowSettings(true)}
                  className="btn-secondary flex items-center justify-center"
                >
                  <Settings className="w-5 h-5 mr-2" />
                  Settings
                </button>
              </div>

              {/* Admin Access */}
              <div className="text-center">
                <button
                  onClick={handleAdminAccess}
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Admin Access
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Assessment Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Time Limit (minutes)
                </label>
                <input
                  type="number"
                  value={localSettings.timeLimit / 60000}
                  onChange={(e) => setLocalSettings({
                    ...localSettings,
                    timeLimit: parseInt(e.target.value) * 60000
                  })}
                  min="15"
                  max="60"
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Webhook URL (Optional)
                </label>
                <input
                  type="url"
                  value={localSettings.webhookUrl}
                  onChange={(e) => setLocalSettings({
                    ...localSettings,
                    webhookUrl: e.target.value
                  })}
                  placeholder="https://your-webhook-url.com"
                  className="input-field"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="darkMode"
                  checked={localSettings.darkMode}
                  onChange={(e) => setLocalSettings({
                    ...localSettings,
                    darkMode: e.target.checked
                  })}
                  className="mr-2"
                />
                <label htmlFor="darkMode" className="text-sm text-gray-700 dark:text-gray-300">
                  Dark Mode
                </label>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowSettings(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleSettingsSave}
                className="btn-primary"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomeScreen;
