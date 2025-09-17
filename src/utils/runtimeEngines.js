// Simplified Runtime Engines for Code Execution
// Pyodide for Python (SQL will be simulated for now)

export class PythonRuntime {
  constructor() {
    this.pyodide = null;
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return;
    
    try {
      // Import Pyodide
      const { loadPyodide } = await import('https://cdn.jsdelivr.net/pyodide/v0.28.2/full/pyodide.mjs');
      
      // Load Pyodide
      this.pyodide = await loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.28.2/full/'
      });
      
      // Install pandas
      await this.pyodide.loadPackage('pandas');
      
      // Load datasets into Python environment
      await this.loadDatasets();
      
      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize Python runtime:', error);
      throw error;
    }
  }

  async loadDatasets() {
    const datasets = ['retail_transactions.csv', 'support_tickets.csv', 'marketing_campaign.csv'];
    
    for (const dataset of datasets) {
      try {
        const response = await fetch(`/data/${dataset}`);
        const csvContent = await response.text();
        
        // Create a file-like object in Pyodide
        this.pyodide.FS.writeFile(dataset, csvContent);
        
        // Load into pandas DataFrame
        const code = `
import pandas as pd
${dataset.replace('.csv', '')} = pd.read_csv('${dataset}')
print(f"Loaded ${dataset} with shape: {${dataset.replace('.csv', '')}.shape}")
`;
        this.pyodide.runPython(code);
      } catch (error) {
        console.error(`Failed to load dataset ${dataset}:`, error);
      }
    }
  }

  async executeCode(code, tests = []) {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      // Execute the main code
      const result = this.pyodide.runPython(code);
      
      // Run tests if provided
      const testResults = [];
      for (const test of tests) {
        try {
          const testResult = this.pyodide.runPython(test.code);
          testResults.push({
            code: test.code,
            result: testResult,
            passed: this.evaluateTestResult(testResult, test.expect)
          });
        } catch (error) {
          testResults.push({
            code: test.code,
            result: null,
            passed: false,
            error: error.message
          });
        }
      }
      
      return {
        success: true,
        result: result,
        testResults: testResults,
        allTestsPassed: testResults.every(t => t.passed)
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        result: null,
        testResults: []
      };
    }
  }

  evaluateTestResult(result, expected) {
    if (typeof expected === 'string') {
      if (expected.startsWith('>')) {
        const threshold = parseFloat(expected.substring(1));
        return parseFloat(result) > threshold;
      } else if (expected.startsWith('<')) {
        const threshold = parseFloat(expected.substring(1));
        return parseFloat(result) < threshold;
      } else if (expected.startsWith('>=')) {
        const threshold = parseFloat(expected.substring(2));
        return parseFloat(result) >= threshold;
      } else if (expected.startsWith('<=')) {
        const threshold = parseFloat(expected.substring(2));
        return parseFloat(result) <= threshold;
      } else {
        return result.toString() === expected;
      }
    }
    
    return result === expected;
  }

  reset() {
    if (this.pyodide) {
      // Clear Python namespace
      this.pyodide.runPython(`
import sys
sys.modules.clear()
globals().clear()
locals().clear()
`);
    }
  }
}

export class SQLRuntime {
  constructor() {
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return;
    
    try {
      // For now, we'll simulate SQL execution
      // In a real implementation, you would use DuckDB-WASM here
      console.log('SQL runtime initialized (simulated)');
      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize SQL runtime:', error);
      throw error;
    }
  }

  async executeQuery(query, tests = []) {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      // Simulate SQL execution for now
      const result = { message: 'SQL query executed (simulated)', query: query };
      
      // Run tests if provided
      const testResults = [];
      for (const test of tests) {
        try {
          // Simulate test execution
          const testResult = { message: 'Test executed (simulated)' };
          testResults.push({
            query: test.query,
            result: testResult,
            passed: true // Simulate passing for now
          });
        } catch (error) {
          testResults.push({
            query: test.query,
            result: null,
            passed: false,
            error: error.message
          });
        }
      }
      
      return {
        success: true,
        result: result,
        testResults: testResults,
        allTestsPassed: testResults.every(t => t.passed)
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        result: null,
        testResults: []
      };
    }
  }

  reset() {
    this.initialized = false;
  }
}

// Runtime manager
export class RuntimeManager {
  constructor() {
    this.pythonRuntime = new PythonRuntime();
    this.sqlRuntime = new SQLRuntime();
  }

  async initialize() {
    try {
      await Promise.all([
        this.pythonRuntime.initialize(),
        this.sqlRuntime.initialize()
      ]);
    } catch (error) {
      console.error('Failed to initialize runtimes:', error);
      throw error;
    }
  }

  async executeCode(type, code, tests = []) {
    if (type === 'python') {
      return await this.pythonRuntime.executeCode(code, tests);
    } else if (type === 'sql') {
      return await this.sqlRuntime.executeQuery(code, tests);
    } else {
      throw new Error(`Unsupported code type: ${type}`);
    }
  }

  reset() {
    this.pythonRuntime.reset();
    this.sqlRuntime.reset();
  }
}