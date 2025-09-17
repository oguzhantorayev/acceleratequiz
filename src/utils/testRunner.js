// Test Runner for Data Analysis Baseline Assessment
// Validates core functionality and data integrity

export class TestRunner {
  constructor() {
    this.tests = [];
    this.results = [];
  }

  // Add a test
  addTest(name, testFunction) {
    this.tests.push({ name, testFunction });
  }

  // Run all tests
  async runAllTests() {
    console.log('🧪 Running Data Analysis Assessment Tests...\n');
    
    for (const test of this.tests) {
      try {
        console.log(`⏳ Running: ${test.name}`);
        const result = await test.testFunction();
        
        if (result) {
          console.log(`✅ PASSED: ${test.name}`);
          this.results.push({ name: test.name, status: 'PASSED', error: null });
        } else {
          console.log(`❌ FAILED: ${test.name}`);
          this.results.push({ name: test.name, status: 'FAILED', error: 'Test returned false' });
        }
      } catch (error) {
        console.log(`❌ ERROR: ${test.name} - ${error.message}`);
        this.results.push({ name: test.name, status: 'ERROR', error: error.message });
      }
    }
    
    this.printSummary();
    return this.results;
  }

  // Print test summary
  printSummary() {
    const passed = this.results.filter(r => r.status === 'PASSED').length;
    const failed = this.results.filter(r => r.status === 'FAILED').length;
    const errors = this.results.filter(r => r.status === 'ERROR').length;
    
    console.log('\n📊 Test Summary:');
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`🚨 Errors: ${errors}`);
    console.log(`📈 Total: ${this.results.length}`);
    
    if (failed > 0 || errors > 0) {
      console.log('\n🔍 Failed Tests:');
      this.results
        .filter(r => r.status !== 'PASSED')
        .forEach(r => console.log(`  - ${r.name}: ${r.error}`));
    }
  }
}

// Test functions
export const testItemPool = () => {
  try {
    // Import item pool
    const { allItems, domainWeights, bossTask } = require('../data/itemPool.js');
    
    // Check if we have enough items
    if (allItems.length < 50) {
      throw new Error(`Expected at least 50 items, got ${allItems.length}`);
    }
    
    // Check domain weights sum to 1
    const totalWeight = Object.values(domainWeights).reduce((sum, weight) => sum + weight, 0);
    if (Math.abs(totalWeight - 1) > 0.01) {
      throw new Error(`Domain weights should sum to 1, got ${totalWeight}`);
    }
    
    // Check boss task exists
    if (!bossTask || bossTask.type !== 'boss') {
      throw new Error('Boss task not found or invalid');
    }
    
    // Check each domain has items
    const domains = Object.keys(domainWeights);
    for (const domain of domains) {
      const domainItems = allItems.filter(item => item.domain === domain);
      if (domainItems.length < 5) {
        throw new Error(`Domain ${domain} has only ${domainItems.length} items, expected at least 5`);
      }
    }
    
    return true;
  } catch (error) {
    console.error('Item pool test failed:', error.message);
    return false;
  }
};

export const testAdaptiveEngine = () => {
  try {
    const { AdaptiveTestingEngine } = require('./adaptiveTesting.js');
    
    // Create engine
    const engine = new AdaptiveTestingEngine();
    
    // Test initialization
    const initialState = engine.initializeTest();
    if (!initialState || !initialState.currentItem) {
      throw new Error('Failed to initialize test');
    }
    
    // Test response processing
    const response = {
      answer: 0,
      confidence: 'Medium'
    };
    
    const nextState = engine.processResponse(response);
    if (!nextState) {
      throw new Error('Failed to process response');
    }
    
    return true;
  } catch (error) {
    console.error('Adaptive engine test failed:', error.message);
    return false;
  }
};

export const testScoringSystem = () => {
  try {
    const { ScoringSystem } = require('./scoringSystem.js');
    
    // Create scoring system
    const scoring = new ScoringSystem();
    
    // Test with sample responses
    const sampleResponses = [
      {
        domain: 'sql',
        correct: true,
        confidence: 'High',
        type: 'mcq'
      },
      {
        domain: 'python',
        correct: false,
        confidence: 'Low',
        type: 'python'
      }
    ];
    
    // Test score calculation
    const overallScore = scoring.calculateOverallScore(sampleResponses);
    if (typeof overallScore !== 'number' || overallScore < 0 || overallScore > 1) {
      throw new Error(`Invalid overall score: ${overallScore}`);
    }
    
    // Test domain scores
    const domainScores = scoring.calculateDomainScores(sampleResponses);
    if (!domainScores || typeof domainScores !== 'object') {
      throw new Error('Invalid domain scores');
    }
    
    return true;
  } catch (error) {
    console.error('Scoring system test failed:', error.message);
    return false;
  }
};

export const testDatasets = async () => {
  try {
    // Test if datasets are accessible
    const datasets = [
      'retail_transactions.csv',
      'support_tickets.csv',
      'marketing_campaign.csv'
    ];
    
    for (const dataset of datasets) {
      const response = await fetch(`/data/${dataset}`);
      if (!response.ok) {
        throw new Error(`Failed to load dataset: ${dataset}`);
      }
      
      const content = await response.text();
      if (!content || content.length < 100) {
        throw new Error(`Dataset ${dataset} appears to be empty or too small`);
      }
    }
    
    return true;
  } catch (error) {
    console.error('Dataset test failed:', error.message);
    return false;
  }
};

// Run all tests
export const runAllTests = async () => {
  const runner = new TestRunner();
  
  // Add tests
  runner.addTest('Item Pool Validation', testItemPool);
  runner.addTest('Adaptive Engine', testAdaptiveEngine);
  runner.addTest('Scoring System', testScoringSystem);
  runner.addTest('Dataset Accessibility', testDatasets);
  
  // Run tests
  return await runner.runAllTests();
};
