import React, { useState } from 'react';
import { ArrowLeft, Settings, Upload, Download, Eye, Save } from 'lucide-react';

const AdminPanel = ({ onBack, settings, onSettingsChange }) => {
  const [activeTab, setActiveTab] = useState('settings');
  const [localSettings, setLocalSettings] = useState(settings);
  const [itemPool, setItemPool] = useState(null);

  const handleSettingsSave = () => {
    onSettingsChange(localSettings);
  };

  const handleItemPoolUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          setItemPool(data);
        } catch (error) {
          alert('Invalid JSON file');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleItemPoolDownload = () => {
    if (itemPool) {
      const dataStr = JSON.stringify(itemPool, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'item_pool.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="btn-secondary flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Admin Panel
            </h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'settings', label: 'Settings', icon: Settings },
              { id: 'items', label: 'Item Pool', icon: Upload },
              { id: 'preview', label: 'Preview', icon: Eye }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'settings' && (
          <div className="space-y-8">
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Assessment Settings
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
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
                      Webhook URL
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
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Student Alias
                    </label>
                    <input
                      type="text"
                      value={localSettings.studentAlias}
                      onChange={(e) => setLocalSettings({
                        ...localSettings,
                        studentAlias: e.target.value
                      })}
                      placeholder="Default student alias"
                      className="input-field"
                    />
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Difficulty Curve
                    </label>
                    <select
                      value={localSettings.difficultyCurve || 'steady'}
                      onChange={(e) => setLocalSettings({
                        ...localSettings,
                        difficultyCurve: e.target.value
                      })}
                      className="select-field"
                    >
                      <option value="steady">Steady</option>
                      <option value="aggressive">Aggressive</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Domains Enabled
                    </label>
                    <div className="space-y-2">
                      {[
                        'data_literacy',
                        'stats',
                        'sql',
                        'python',
                        'viz',
                        'ethics'
                      ].map((domain) => (
                        <label key={domain} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={localSettings.enabledDomains?.[domain] !== false}
                            onChange={(e) => setLocalSettings({
                              ...localSettings,
                              enabledDomains: {
                                ...localSettings.enabledDomains,
                                [domain]: e.target.checked
                              }
                            })}
                            className="mr-2"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                            {domain.replace('_', ' ')}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleSettingsSave}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Settings</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'items' && (
          <div className="space-y-8">
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Item Pool Management
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Upload Item Pool JSON
                  </label>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleItemPoolUpload}
                    className="input-field"
                  />
                </div>
                
                {itemPool && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      Current Item Pool
                    </h3>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Items loaded: {Array.isArray(itemPool) ? itemPool.length : 'Invalid format'}
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="flex space-x-4">
                  <button
                    onClick={handleItemPoolDownload}
                    disabled={!itemPool}
                    className="btn-secondary flex items-center space-x-2 disabled:opacity-50"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Pool</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'preview' && (
          <div className="space-y-8">
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Assessment Preview
              </h2>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      Current Settings
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Time Limit:</span>
                        <span className="text-gray-900 dark:text-gray-100">
                          {localSettings.timeLimit / 60000} minutes
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Webhook:</span>
                        <span className="text-gray-900 dark:text-gray-100">
                          {localSettings.webhookUrl ? 'Configured' : 'Not set'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Difficulty:</span>
                        <span className="text-gray-900 dark:text-gray-100">
                          {localSettings.difficultyCurve || 'Steady'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      Item Pool Status
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Items Loaded:</span>
                        <span className="text-gray-900 dark:text-gray-100">
                          {itemPool ? (Array.isArray(itemPool) ? itemPool.length : 'Invalid') : 'Default'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Domains:</span>
                        <span className="text-gray-900 dark:text-gray-100">
                          {Object.keys(localSettings.enabledDomains || {}).length} enabled
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                    Preview Mode
                  </h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    This preview shows the current configuration. To test the assessment, 
                    go back to the main screen and start a new assessment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
