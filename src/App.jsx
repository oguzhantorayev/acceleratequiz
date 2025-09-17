import React, { useState, useEffect, useCallback } from 'react';
import { AdaptiveTestingEngine } from './utils/adaptiveTesting.js';
import { RuntimeManager } from './utils/runtimeEngines.js';
import { ScoringSystem } from './utils/scoringSystem.js';
import { v4 as uuidv4 } from 'uuid';

// Components
import SimpleWelcomeScreen from './components/SimpleWelcomeScreen.jsx';
import TestInterface from './components/TestInterface.jsx';
import CompletionScreen from './components/CompletionScreen.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';
import sheet3Service from './services/sheet3Service.js';

function App() {
  // Core state
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [testEngine, setTestEngine] = useState(null);
  const [runtimeManager, setRuntimeManager] = useState(null);
  const [scoringSystem, setScoringSystem] = useState(null);
  const [testSession, setTestSession] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Test state
  const [currentItem, setCurrentItem] = useState(null);
  const [testProgress, setTestProgress] = useState({});
  const [testResults, setTestResults] = useState(null);

  // Gamification state
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [badges, setBadges] = useState([]);

  // Student data
  const [studentData, setStudentData] = useState({
    name: '',
    email: ''
  });

  // Initialize systems
  useEffect(() => {
    const initializeSystems = async () => {
      try {
        setIsLoading(true);
        
        // Initialize runtime manager
        const runtime = new RuntimeManager();
        await runtime.initialize();
        setRuntimeManager(runtime);
        
        // Initialize scoring system
        const scoring = new ScoringSystem();
        setScoringSystem(scoring);
        
        // Initialize test engine
        const engine = new AdaptiveTestingEngine({
          timeLimit: 30 * 60 * 1000 // 30 minutes
        });
        setTestEngine(engine);
        
        // Initialize Sheet3 service
        try {
          await sheet3Service.setupHeaders();
        } catch (error) {
          console.warn('Sheet3 initialization failed:', error);
          // Continue without Sheet3
        }
        
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    initializeSystems();
  }, []);

  // Handle test start
  const handleTestStart = useCallback(async (studentInfo) => {
    if (!testEngine || !runtimeManager) return;
    
    try {
      setIsLoading(true);
      
      // Store student data
      setStudentData(studentInfo);
      
      // Create test session
      const session = {
        id: uuidv4(),
        studentName: studentInfo.name,
        studentEmail: studentInfo.email,
        startTime: new Date().toISOString()
      };
      
      setTestSession(session);
      
      // Initialize test
      const testState = testEngine.initializeTest();
      setCurrentItem(testState.currentItem);
      setTestProgress({
        stage: testState.stage,
        currentItem: testState.currentItem,
        totalItems: testState.totalItems,
        timeRemaining: testState.timeRemaining,
        currentItemIndex: 0
      });
      
      setCurrentScreen('test');
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }, [testEngine, runtimeManager]);

  // Handle response submission
  const handleResponseSubmit = useCallback(async (response) => {
    if (!testEngine || !runtimeManager || !scoringSystem) return;
    
    try {
      // For conceptual questions, we don't need code execution
      // response.correct will be determined by the adaptive engine
      
      // Process response
      const nextState = testEngine.processResponse(response);
      
      // Update gamification
      if (response.correct) {
        setXp(prev => prev + 10);
        setStreak(prev => prev + 1);
      } else {
        setStreak(0);
      }
      
      // Check if test is complete
      if (nextState.stage === 'complete') {
        // Calculate final results
        const scoreReport = scoringSystem.generateScoreReport(
          nextState.responses,
          {
            totalTime: nextState.totalTime,
            studentName: testSession.studentName,
            studentEmail: testSession.studentEmail
          }
        );
        
        // Check for completion badge
        if (nextState.responses.length >= 40) {
          setBadges(prev => [...prev, 'completion_badge']);
        }
        
        // Submit results to Sheet3
        console.log('=== STARTING SHEET3 SUBMISSION ===');
        console.log('Student Data:', studentData);
        console.log('Score Report:', scoreReport);
        console.log('Score Report Metadata:', scoreReport.metadata);
        console.log('Score Report Responses:', scoreReport.metadata?.responses);
        console.log('Number of Responses:', scoreReport.metadata?.responses?.length);
        
        try {
          const submissionResult = await sheet3Service.appendResults(studentData, scoreReport);
          if (submissionResult === false) {
            console.log('Sheet3 submission skipped - credentials not configured');
          } else {
            console.log('Results successfully submitted to Sheet3');
          }
        } catch (error) {
          console.error('Failed to submit to Sheet3:', error);
          console.error('Error details:', error.message);
          console.error('Error stack:', error.stack);
        }
        console.log('=== END SHEET3 SUBMISSION ===');
        
        setTestResults(scoreReport);
        setCurrentScreen('completion');
      } else {
        // Continue with next item
        setCurrentItem(nextState.currentItem);
        setTestProgress({
          stage: nextState.stage,
          currentItem: nextState.currentItem,
          totalItems: nextState.totalItems,
          progress: nextState.progress,
          timeRemaining: nextState.timeRemaining,
          currentItemIndex: nextState.currentItemIndex || 0
        });
      }
    } catch (err) {
      setError(err.message);
    }
  }, [testEngine, runtimeManager, scoringSystem, currentItem, testSession]);

  // Handle test reset
  const handleTestReset = useCallback(() => {
    setCurrentScreen('welcome');
    setCurrentItem(null);
    setTestProgress({});
    setTestResults(null);
    setXp(0);
    setStreak(0);
    setBadges([]);
    setTestSession(null);
    setError(null);
    
    if (runtimeManager) {
      runtimeManager.reset();
    }
  }, [runtimeManager]);


  // Render loading screen
  if (isLoading) {
    return <LoadingScreen message="Initializing assessment systems..." />;
  }

  // Render error screen
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
              Error
            </h2>
            <p className="text-red-600 dark:text-red-300 mb-4">{error}</p>
            <button
              onClick={handleTestReset}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render current screen
  switch (currentScreen) {
    case 'welcome':
      return (
        <SimpleWelcomeScreen
          onTestStart={handleTestStart}
        />
      );
    
    case 'test':
      return (
        <TestInterface
          currentItem={currentItem}
          progress={testProgress}
          onResponseSubmit={handleResponseSubmit}
          onTestReset={handleTestReset}
          xp={xp}
          streak={streak}
          badges={badges}
        />
      );
    
    case 'completion':
      return (
        <CompletionScreen
          results={testResults}
          onRestart={handleTestReset}
        />
      );
    
    default:
      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Data Analysis Baseline Assessment
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Loading...
            </p>
          </div>
        </div>
      );
  }
}

export default App;