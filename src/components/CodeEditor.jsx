import React, { useRef, useEffect } from 'react';
import { Play, RotateCcw } from 'lucide-react';

const CodeEditor = ({ value, onChange, language, placeholder, onExecute }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [value]);

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newValue);
      
      // Set cursor position after the inserted spaces
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2;
      }, 0);
    }
  };

  const handleExecute = () => {
    if (onExecute) {
      onExecute(value);
    }
  };

  const handleReset = () => {
    onChange('');
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="code-editor w-full font-mono text-sm"
          style={{ minHeight: '200px' }}
        />
        
        {/* Language indicator */}
        <div className="absolute top-2 right-2">
          <span className="px-2 py-1 text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
            {language.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <button
            onClick={handleExecute}
            disabled={!value.trim()}
            className="btn-success flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="w-4 h-4" />
            <span>Run</span>
          </button>
          
          <button
            onClick={handleReset}
            className="btn-secondary flex items-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          {value.length} characters
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
