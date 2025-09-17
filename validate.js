// Validation script for Data Analysis Baseline Assessment
// Run with: node validate.js

import fs from 'fs';
import path from 'path';

console.log('🔍 Validating Data Analysis Baseline Assessment...\n');

// Check required files
const requiredFiles = [
  'package.json',
  'vite.config.js',
  'tailwind.config.js',
  'index.html',
  'src/main.jsx',
  'src/App.jsx',
  'src/index.css',
  'src/data/itemPool.js',
  'src/data/itemPoolExtended.js',
  'src/utils/adaptiveTesting.js',
  'src/utils/runtimeEngines.js',
  'src/utils/scoringSystem.js',
  'src/components/WelcomeScreen.jsx',
  'src/components/TestInterface.jsx',
  'src/components/ResultsScreen.jsx',
  'src/components/AdminPanel.jsx',
  'src/components/CodeEditor.jsx',
  'src/components/ProgressBar.jsx',
  'src/components/LoadingScreen.jsx',
  'public/data/retail_transactions.csv',
  'public/data/support_tickets.csv',
  'public/data/marketing_campaign.csv',
  'README.md'
];

let allFilesExist = true;

console.log('📁 Checking required files...');
for (const file of requiredFiles) {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allFilesExist = false;
  }
}

// Check package.json
console.log('\n📦 Validating package.json...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  const requiredDeps = ['react', 'react-dom', 'pyodide', 'duckdb', 'lucide-react', 'uuid'];
  const requiredDevDeps = ['@vitejs/plugin-react', 'tailwindcss', 'vite'];
  
  let depsValid = true;
  
  for (const dep of requiredDeps) {
    if (!packageJson.dependencies[dep]) {
      console.log(`❌ Missing dependency: ${dep}`);
      depsValid = false;
    } else {
      console.log(`✅ Dependency: ${dep}`);
    }
  }
  
  for (const dep of requiredDevDeps) {
    if (!packageJson.devDependencies[dep]) {
      console.log(`❌ Missing dev dependency: ${dep}`);
      depsValid = false;
    } else {
      console.log(`✅ Dev dependency: ${dep}`);
    }
  }
  
  if (depsValid) {
    console.log('✅ All dependencies present');
  }
} catch (error) {
  console.log(`❌ Error reading package.json: ${error.message}`);
  allFilesExist = false;
}

// Check item pool
console.log('\n📝 Validating item pool...');
try {
  const itemPoolContent = fs.readFileSync('src/data/itemPool.js', 'utf8');
  
  // Check for required exports
  const requiredExports = ['itemPool', 'allItems', 'domainWeights', 'bossTask'];
  let exportsValid = true;
  
  for (const exportName of requiredExports) {
    if (itemPoolContent.includes(`export const ${exportName}`) || 
        itemPoolContent.includes(`export { ${exportName}`)) {
      console.log(`✅ Export: ${exportName}`);
    } else {
      console.log(`❌ Missing export: ${exportName}`);
      exportsValid = false;
    }
  }
  
  // Check for domain weights
  if (itemPoolContent.includes('data_literacy: 0.10') &&
      itemPoolContent.includes('stats: 0.15') &&
      itemPoolContent.includes('sql: 0.25') &&
      itemPoolContent.includes('python: 0.25') &&
      itemPoolContent.includes('viz: 0.10') &&
      itemPoolContent.includes('ethics: 0.15')) {
    console.log('✅ Domain weights configured correctly');
  } else {
    console.log('❌ Domain weights not configured correctly');
    exportsValid = false;
  }
  
  if (exportsValid) {
    console.log('✅ Item pool structure valid');
  }
} catch (error) {
  console.log(`❌ Error reading item pool: ${error.message}`);
  allFilesExist = false;
}

// Check datasets
console.log('\n📊 Validating datasets...');
const datasets = [
  'public/data/retail_transactions.csv',
  'public/data/support_tickets.csv',
  'public/data/marketing_campaign.csv'
];

let datasetsValid = true;
for (const dataset of datasets) {
  try {
    const content = fs.readFileSync(dataset, 'utf8');
    const lines = content.split('\n').filter(line => line.trim());
    
    if (lines.length < 10) {
      console.log(`❌ ${dataset} - Too few rows (${lines.length})`);
      datasetsValid = false;
    } else {
      console.log(`✅ ${dataset} - ${lines.length} rows`);
    }
  } catch (error) {
    console.log(`❌ ${dataset} - Error reading file`);
    datasetsValid = false;
  }
}

// Check README
console.log('\n📖 Validating README...');
try {
  const readmeContent = fs.readFileSync('README.md', 'utf8');
  
  const requiredSections = [
    '# Data Analysis Baseline Assessment',
    '## Features',
    '## Quick Start',
    '## Configuration',
    '## Technical Architecture'
  ];
  
  let readmeValid = true;
  for (const section of requiredSections) {
    if (readmeContent.includes(section)) {
      console.log(`✅ Section: ${section}`);
    } else {
      console.log(`❌ Missing section: ${section}`);
      readmeValid = false;
    }
  }
  
  if (readmeValid) {
    console.log('✅ README structure valid');
  }
} catch (error) {
  console.log(`❌ Error reading README: ${error.message}`);
  allFilesExist = false;
}

// Final summary
console.log('\n🎯 Validation Summary:');
if (allFilesExist && datasetsValid) {
  console.log('✅ All validations passed!');
  console.log('🚀 Ready for deployment');
  console.log('\n📋 Next steps:');
  console.log('1. Run: npm install');
  console.log('2. Run: npm run dev');
  console.log('3. Open: http://localhost:3000');
  console.log('4. Test the assessment flow');
} else {
  console.log('❌ Some validations failed');
  console.log('🔧 Please fix the issues above before proceeding');
  process.exit(1);
}
