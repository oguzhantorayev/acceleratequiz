// Adaptive Testing System for Data Analysis Baseline Assessment
// Implements 3-stage adaptive testing: warm-up, core, boss

import { conceptualItems as allItems, conceptualDomainWeights as domainWeights } from '../data/conceptualItemPool.js';

export class AdaptiveTestingEngine {
  constructor(settings = {}) {
    this.settings = {
      timeLimit: 30 * 60 * 1000, // 30 minutes in milliseconds
      warmUpItems: 10,
      coreItemsMin: 40,
      coreItemsMax: 40,
      confidenceAdjustment: 0.05,
      ...settings
    };
    
    this.currentStage = 'warmup';
    this.stageItems = [];
    this.currentItemIndex = 0;
    this.responses = [];
    this.startTime = null;
    this.abilityEstimate = 0; // Initial ability estimate
    this.difficultyHistory = [];
  }

  // Initialize the test with warm-up items
  initializeTest() {
    this.startTime = Date.now();
    this.currentStage = 'warmup';
    this.stageItems = this.selectWarmUpItems();
    this.currentItemIndex = 0;
    this.responses = [];
    this.abilityEstimate = 0;
    this.difficultyHistory = [];
    
    return {
      stage: this.currentStage,
      currentItem: this.stageItems[0],
      totalItems: this.stageItems.length,
      timeRemaining: this.settings.timeLimit
    };
  }

  // Select warm-up items (mix of easy/medium across domains)
  selectWarmUpItems() {
    const warmUpItems = [];
    const domains = Object.keys(domainWeights);
    
    // Select 1-2 items per domain for warm-up
    domains.forEach(domain => {
      const domainItems = allItems.filter(item => item.domain === domain);
      const easyItems = domainItems.filter(item => item.difficulty === 1);
      const mediumItems = domainItems.filter(item => item.difficulty === 2);
      
      // Add 1 easy item if available
      if (easyItems.length > 0) {
        warmUpItems.push(this.selectRandomItem(easyItems));
      }
      
      // Add 1 medium item if we need more items
      if (warmUpItems.length < this.settings.warmUpItems && mediumItems.length > 0) {
        warmUpItems.push(this.selectRandomItem(mediumItems));
      }
    });
    
    // Shuffle and limit to warmUpItems count
    return this.shuffleArray(warmUpItems).slice(0, this.settings.warmUpItems);
  }

  // Process response and move to next item
  processResponse(response) {
    const currentItem = this.stageItems[this.currentItemIndex];
    const responseTime = Date.now() - this.startTime;
    
    // Store response with metadata
    const responseData = {
      itemId: currentItem.id,
      domain: currentItem.domain,
      difficulty: currentItem.difficulty,
      response: response.answer,
      confidence: response.confidence,
      timeMs: responseTime,
      correct: this.evaluateResponse(currentItem, response.answer),
      timestamp: new Date().toISOString()
    };
    
    console.log('Processing response:', responseData);
    console.log('Current item:', currentItem);
    console.log('Response answer:', response.answer);
    
    this.responses.push(responseData);
    this.difficultyHistory.push(currentItem.difficulty);
    
    // Update ability estimate based on performance
    this.updateAbilityEstimate(responseData);
    
    // Move to next item or stage
    this.currentItemIndex++;
    
    if (this.currentItemIndex >= this.stageItems.length) {
      return this.advanceToNextStage();
    }
    
    return {
      stage: this.currentStage,
      currentItem: this.stageItems[this.currentItemIndex],
      totalItems: this.stageItems.length,
      progress: this.currentItemIndex / this.stageItems.length,
      timeRemaining: this.settings.timeLimit - responseTime,
      currentItemIndex: this.currentItemIndex
    };
  }

  // Advance to next stage (core only)
  advanceToNextStage() {
    if (this.currentStage === 'warmup') {
      this.currentStage = 'core';
      this.stageItems = this.selectCoreItems();
      this.currentItemIndex = 0;
      
      return {
        stage: this.currentStage,
        currentItem: this.stageItems[0],
        totalItems: this.stageItems.length,
        progress: 0,
        timeRemaining: this.settings.timeLimit - (Date.now() - this.startTime),
        currentItemIndex: 0
      };
    } else {
      // Test complete
      return this.completeTest();
    }
  }

  // Select core items based on ability estimate
  selectCoreItems() {
    const coreItems = [];
    const domains = Object.keys(domainWeights);
    
    // Use exactly 40 core items (10 warmup + 40 core = 50 total)
    const totalCoreItems = 40;
    
    domains.forEach(domain => {
      const weight = domainWeights[domain];
      const itemsForDomain = Math.max(1, Math.floor(totalCoreItems * weight));
      
      const domainItems = allItems.filter(item => item.domain === domain);
      const selectedItems = this.selectAdaptiveItems(domainItems, itemsForDomain);
      coreItems.push(...selectedItems);
    });
    
    // Ensure we have exactly 40 items
    const shuffled = this.shuffleArray(coreItems);
    return shuffled.slice(0, 40);
  }

  // Select items adaptively based on ability estimate
  selectAdaptiveItems(domainItems, count) {
    // Sort items by difficulty
    const easyItems = domainItems.filter(item => item.difficulty === 1);
    const mediumItems = domainItems.filter(item => item.difficulty === 2);
    const hardItems = domainItems.filter(item => item.difficulty === 3);
    
    const selected = [];
    
    // Adaptive selection based on ability estimate
    if (this.abilityEstimate < -0.5) {
      // Low ability: mostly easy, some medium
      selected.push(...this.selectRandomItems(easyItems, Math.min(count, easyItems.length)));
      if (selected.length < count) {
        selected.push(...this.selectRandomItems(mediumItems, count - selected.length));
      }
    } else if (this.abilityEstimate > 0.5) {
      // High ability: mostly medium/hard
      selected.push(...this.selectRandomItems(mediumItems, Math.min(count, mediumItems.length)));
      if (selected.length < count) {
        selected.push(...this.selectRandomItems(hardItems, count - selected.length));
      }
    } else {
      // Medium ability: balanced mix
      const easyCount = Math.floor(count * 0.3);
      const mediumCount = Math.floor(count * 0.5);
      const hardCount = count - easyCount - mediumCount;
      
      selected.push(...this.selectRandomItems(easyItems, easyCount));
      selected.push(...this.selectRandomItems(mediumItems, mediumCount));
      selected.push(...this.selectRandomItems(hardItems, hardCount));
    }
    
    return selected;
  }

  // Evaluate response correctness
  evaluateResponse(item, answer) {
    if (item.type === 'mcq') {
      return answer === item.correct;
    } else if (item.type === 'msq') {
      if (!Array.isArray(answer) || !Array.isArray(item.correct)) {
        return false;
      }
      // Partial credit for multiple select
      const correctAnswers = item.correct.length;
      const correctSelected = answer.filter(a => item.correct.includes(a)).length;
      const incorrectSelected = answer.filter(a => !item.correct.includes(a)).length;
      
      // Score: (correct - incorrect) / total correct
      return Math.max(0, (correctSelected - incorrectSelected) / correctAnswers);
    } else if (item.type === 'sql' || item.type === 'python') {
      // Code execution will be handled by runtime engines
      return false; // Placeholder - will be updated by code execution
    }
    
    return false;
  }

  // Update ability estimate using simple IRT-like approach
  updateAbilityEstimate(responseData) {
    const difficulty = responseData.difficulty;
    const correct = responseData.correct;
    const confidence = responseData.confidence;
    
    // Simple ability update based on performance
    let performance = correct ? 1 : 0;
    
    // Adjust for confidence
    if (confidence === 'High' && !correct) {
      performance -= 0.2; // Penalty for high confidence wrong answers
    } else if (confidence === 'Low' && correct) {
      performance += 0.1; // Bonus for low confidence correct answers
    }
    
    // Update ability estimate (simple moving average)
    const learningRate = 0.1;
    this.abilityEstimate += learningRate * (performance - this.abilityEstimate);
  }

  // Complete the test and return results
  completeTest() {
    const totalTime = Date.now() - this.startTime;
    
    console.log('=== ADAPTIVE TESTING COMPLETE ===');
    console.log('Total responses:', this.responses.length);
    console.log('Responses:', this.responses);
    console.log('Total time:', totalTime);
    
    return {
      stage: 'complete',
      totalTime,
      responses: this.responses,
      abilityEstimate: this.abilityEstimate,
      domainScores: this.calculateDomainScores(),
      overallScore: this.calculateOverallScore(),
      recommendations: this.generateRecommendations()
    };
  }

  // Calculate domain-specific scores
  calculateDomainScores() {
    const domainScores = {};
    const domains = Object.keys(domainWeights);
    
    domains.forEach(domain => {
      const domainResponses = this.responses.filter(r => r.domain === domain);
      if (domainResponses.length > 0) {
        const totalScore = domainResponses.reduce((sum, r) => sum + (r.correct ? 1 : 0), 0);
        domainScores[domain] = totalScore / domainResponses.length;
      } else {
        domainScores[domain] = 0;
      }
    });
    
    return domainScores;
  }

  // Calculate overall score
  calculateOverallScore() {
    const domainScores = this.calculateDomainScores();
    let weightedScore = 0;
    
    Object.keys(domainWeights).forEach(domain => {
      weightedScore += domainScores[domain] * domainWeights[domain];
    });
    
    return weightedScore;
  }

  // Generate learning recommendations
  generateRecommendations() {
    const domainScores = this.calculateDomainScores();
    const recommendations = [];
    
    // Find domains with lowest scores
    const sortedDomains = Object.keys(domainScores)
      .sort((a, b) => domainScores[a] - domainScores[b])
      .slice(0, 3);
    
    sortedDomains.forEach(domain => {
      if (domainScores[domain] < 0.7) {
        recommendations.push(`module_${domain}_fundamentals`);
      }
    });
    
    return recommendations;
  }

  // Utility functions
  selectRandomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  selectRandomItems(items, count) {
    const shuffled = this.shuffleArray([...items]);
    return shuffled.slice(0, count);
  }

  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Get current test status
  getStatus() {
    return {
      stage: this.currentStage,
      currentItemIndex: this.currentItemIndex,
      totalItems: this.stageItems.length,
      timeElapsed: this.startTime ? Date.now() - this.startTime : 0,
      timeRemaining: this.startTime ? this.settings.timeLimit - (Date.now() - this.startTime) : this.settings.timeLimit,
      abilityEstimate: this.abilityEstimate
    };
  }
}