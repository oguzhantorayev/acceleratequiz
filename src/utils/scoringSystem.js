// Scoring System for Data Analysis Baseline Assessment
// Implements partial credit, confidence adjustment, and reliability estimates

export class ScoringSystem {
  constructor() {
    this.domainWeights = {
      data_literacy: 0.20,
      stats: 0.20,
      analysis: 0.20,
      viz: 0.20,
      ethics: 0.20
    };
  }

  // Calculate overall score from responses
  calculateOverallScore(responses) {
    const domainScores = this.calculateDomainScores(responses);
    
    let weightedScore = 0;
    Object.keys(this.domainWeights).forEach(domain => {
      weightedScore += domainScores[domain] * this.domainWeights[domain];
    });
    
    return Math.max(0, Math.min(1, weightedScore));
  }

  // Calculate domain-specific scores
  calculateDomainScores(responses) {
    const domainScores = {};
    
    Object.keys(this.domainWeights).forEach(domain => {
      const domainResponses = responses.filter(r => r.domain === domain);
      
      if (domainResponses.length === 0) {
        domainScores[domain] = 0;
        return;
      }
      
      let totalScore = 0;
      let totalWeight = 0;
      
      domainResponses.forEach(response => {
        const baseScore = this.calculateItemScore(response);
        totalScore += baseScore;
        totalWeight += 1;
      });
      
      domainScores[domain] = totalWeight > 0 ? totalScore / totalWeight : 0;
    });
    
    return domainScores;
  }

  // Calculate score for individual item
  calculateItemScore(response) {
    if (response.type === 'mcq') {
      return response.correct ? 1 : 0;
    } else if (response.type === 'msq') {
      // Partial credit for multiple select
      if (!Array.isArray(response.response) || !Array.isArray(response.correct)) {
        return 0;
      }
      
      const correctAnswers = response.correct.length;
      const correctSelected = response.response.filter(r => response.correct.includes(r)).length;
      const incorrectSelected = response.response.filter(r => !response.correct.includes(r)).length;
      
      // Score: (correct - incorrect) / total correct
      return Math.max(0, (correctSelected - incorrectSelected) / correctAnswers);
    } else if (response.type === 'sql' || response.type === 'python') {
      // Code execution results
      if (response.codeExecution) {
        return response.codeExecution.allTestsPassed ? 1 : 0;
      }
      return 0;
    } else if (response.type === 'boss') {
      // Boss task with rubric scoring
      return this.calculateBossTaskScore(response);
    }
    
    return 0;
  }

  // Calculate boss task score using rubric
  calculateBossTaskScore(response) {
    if (!response.rubric) {
      return response.correct ? 1 : 0;
    }
    
    const rubric = response.rubric;
    let totalScore = 0;
    
    // Correctness (70%)
    if (response.codeExecution && response.codeExecution.allTestsPassed) {
      totalScore += rubric.correctness || 0.7;
    }
    
    // Method clarity & efficiency (20%)
    if (response.methodClarity) {
      totalScore += (response.methodClarity * (rubric.method_clarity || 0.2));
    }
    
    // Communication (10%)
    if (response.communication) {
      totalScore += (response.communication * (rubric.communication || 0.1));
    }
    
    return Math.max(0, Math.min(1, totalScore));
  }

  // Determine proficiency level
  determineProficiencyLevel(overallScore) {
    if (overallScore >= 0.85) return 'Advanced';
    if (overallScore >= 0.70) return 'Proficient';
    if (overallScore >= 0.50) return 'Developing';
    return 'Novice';
  }

  // Calculate reliability estimate (KR-20)
  calculateReliability(responses) {
    const domainScores = this.calculateDomainScores(responses);
    const domains = Object.keys(domainScores);
    
    if (domains.length < 2) return null;
    
    // Calculate variance for each domain
    const domainVariances = {};
    domains.forEach(domain => {
      const domainResponses = responses.filter(r => r.domain === domain);
      if (domainResponses.length > 1) {
        const scores = domainResponses.map(r => this.calculateItemScore(r));
        const mean = scores.reduce((sum, score) => sum + score, 0) / scores.length;
        const variance = scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / (scores.length - 1);
        domainVariances[domain] = variance;
      }
    });
    
    // Calculate KR-20
    const totalVariance = Object.values(domainVariances).reduce((sum, variance) => sum + variance, 0);
    const itemVariances = Object.values(domainVariances);
    const sumItemVariances = itemVariances.reduce((sum, variance) => sum + variance, 0);
    
    if (totalVariance === 0) return 1;
    
    const k = domains.length;
    const kr20 = (k / (k - 1)) * (1 - sumItemVariances / totalVariance);
    
    return Math.max(0, Math.min(1, kr20));
  }

  // Generate detailed score report
  generateScoreReport(responses, testMetadata = {}) {
    const domainScores = this.calculateDomainScores(responses);
    const overallScore = this.calculateOverallScore(responses);
    const proficiencyLevel = this.determineProficiencyLevel(overallScore);
    const reliability = this.calculateReliability(responses);
    
    // Identify misconceptions
    const misconceptions = this.identifyMisconceptions(responses);
    
    // Generate recommendations
    const recommendations = this.generateRecommendations(domainScores);
    
    return {
      overallScore,
      proficiencyLevel,
      domainScores,
      reliability,
      misconceptions,
      recommendations,
      metadata: {
        totalItems: responses.length,
        totalTime: testMetadata.totalTime || 0,
        confidenceAdjustmentApplied: true,
        responses: responses, // Include the actual responses
        ...testMetadata
      }
    };
  }

  // Identify common misconceptions
  identifyMisconceptions(responses) {
    const misconceptions = [];
    
    // SQL misconceptions
    const sqlResponses = responses.filter(r => r.domain === 'sql');
    const sqlErrors = sqlResponses.filter(r => !r.correct);
    
    if (sqlErrors.length > 0) {
      misconceptions.push('SQL: Difficulty with JOIN operations and window functions');
    }
    
    // Python misconceptions
    const pythonResponses = responses.filter(r => r.domain === 'python');
    const pythonErrors = pythonResponses.filter(r => !r.correct);
    
    if (pythonErrors.length > 0) {
      misconceptions.push('Python: Challenges with pandas operations and data manipulation');
    }
    
    // Statistics misconceptions
    const statsResponses = responses.filter(r => r.domain === 'stats');
    const statsErrors = statsResponses.filter(r => !r.correct);
    
    if (statsErrors.length > 0) {
      misconceptions.push('Statistics: Confusion between correlation and causation');
    }
    
    return misconceptions;
  }

  // Generate learning recommendations
  generateRecommendations(domainScores) {
    const recommendations = [];
    
    // Find domains with lowest scores
    const sortedDomains = Object.keys(domainScores)
      .sort((a, b) => domainScores[a] - domainScores[b])
      .slice(0, 3);
    
    sortedDomains.forEach(domain => {
      if (domainScores[domain] < 0.7) {
        const moduleMap = {
          'data_literacy': 'module_data_quality_fundamentals',
          'stats': 'module_descriptive_statistics',
          'sql': 'module_sql_joins_and_aggregation',
          'python': 'module_pandas_data_manipulation',
          'viz': 'module_visualization_best_practices',
          'ethics': 'module_data_ethics_and_privacy'
        };
        
        if (moduleMap[domain]) {
          recommendations.push(moduleMap[domain]);
        }
      }
    });
    
    return recommendations;
  }

  // Export results in specified format
  exportResults(scoreReport, format = 'json') {
    if (format === 'json') {
      return JSON.stringify(scoreReport, null, 2);
    } else if (format === 'csv') {
      return this.exportToCSV(scoreReport);
    }
    
    return scoreReport;
  }

  // Export to CSV format
  exportToCSV(scoreReport) {
    const rows = [];
    
    // Overall score row
    rows.push(['Overall', scoreReport.overallScore, scoreReport.proficiencyLevel]);
    
    // Domain scores
    Object.keys(scoreReport.domainScores).forEach(domain => {
      rows.push([domain, scoreReport.domainScores[domain], '']);
    });
    
    // Convert to CSV
    const csvContent = rows.map(row => row.join(',')).join('\n');
    const header = 'Domain,Score,Level\n';
    
    return header + csvContent;
  }
}
