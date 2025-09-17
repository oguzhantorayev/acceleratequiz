# Data Analysis Baseline Assessment

A comprehensive, gamified 30-minute baseline knowledge test for Data Analysis students. This single-page web application accurately measures theoretical and hands-on skills across core data analysis domains with minimal instructor overhead and clean exportable analytics.

## Features

### 🎯 **Comprehensive Assessment**
- **6 Core Domains**: Data Literacy (10%), Statistics (15%), SQL (25%), Python/Pandas (25%), Visualization (10%), Ethics/Privacy (15%)
- **50+ Assessment Items**: Multiple choice, multiple select, code execution, and scenario-based questions
- **Adaptive Testing**: 3-stage system (warm-up, core, boss) that adjusts difficulty based on performance

### 🚀 **Code Execution**
- **Python Runtime**: Pyodide-powered in-browser Python execution with pandas preloaded
- **SQL Runtime**: DuckDB-WASM for client-side SQL query execution
- **Real Datasets**: 3 synthetic but realistic datasets (retail transactions, support tickets, marketing campaigns)

### 🎮 **Gamification**
- **XP System**: Earn experience points for correct answers
- **Streak Tracking**: Consecutive correct answers earn streak bonuses
- **Boss Badge**: Special achievement for completing the final comprehensive task
- **Progress Visualization**: Real-time progress bars and stage indicators

### 📊 **Advanced Scoring**
- **Partial Credit**: Multi-select questions with partial credit scoring
- **Confidence Adjustment**: ±5% score adjustment based on confidence levels
- **Reliability Estimates**: KR-20 coefficient for assessment reliability
- **Domain-Specific Scores**: Detailed breakdown by skill area

### 🔒 **Privacy & Security**
- **Client-Side Only**: No server required, runs entirely in browser
- **Local Storage**: All data stays on user's device
- **Anti-Cheat**: Randomized item order and values, disabled back-navigation
- **Open-Book Tolerant**: Designed for honest self-assessment

### 📈 **Analytics & Export**
- **JSON Export**: Complete results with telemetry data
- **CSV Export**: Simplified format for spreadsheet analysis
- **Webhook Integration**: Optional POST to external systems
- **Detailed Reports**: Proficiency levels, misconceptions, and recommendations

## Quick Start

### Prerequisites
- Node.js 16+ and npm
- Modern web browser with ES6+ support

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd data-analysis-baseline-test
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

### Production Build

```bash
npm run build
npm run preview
```

## Usage

### For Students

1. **Start Assessment**: Enter optional alias and click "Start Assessment"
2. **Complete Questions**: Answer questions across all domains
3. **Code Execution**: Write and run Python/SQL code in the browser
4. **View Results**: Get detailed score breakdown and recommendations
5. **Export Results**: Download results in JSON or CSV format

### For Instructors

1. **Admin Access**: Click "Admin Access" and enter password `admin123`
2. **Configure Settings**: Adjust time limits, webhook URLs, and domain weights
3. **Manage Item Pool**: Upload/download custom question sets
4. **Preview Assessment**: Review current configuration

## Configuration

### Adding Items to the Pool

Items are defined in `src/data/itemPool.js` and `src/data/itemPoolExtended.js`. Each item follows this structure:

```javascript
{
  id: "unique_item_id",
  domain: "sql|python|stats|viz|ethics|data_literacy",
  difficulty: 1|2|3, // Easy|Medium|Hard
  stem: "Question text",
  type: "mcq|msq|sql|python|rank",
  options: ["Option 1", "Option 2", ...], // For MCQ/MSQ
  correct: 0|1|2|3, // For MCQ
  correct: [0, 2, 3], // For MSQ
  solution: {
    sql: "SELECT ...", // For SQL items
    python: "df.groupby()...", // For Python items
    tests: [
      { query: "SELECT COUNT(*) FROM result", expect: ">0" }
    ]
  },
  explanation: "Why this answer is correct",
  confidence: true // Whether to ask for confidence level
}
```

### Changing Time Limits and Adaptivity

Modify settings in the Admin Panel or directly in `src/utils/adaptiveTesting.js`:

```javascript
const settings = {
  timeLimit: 30 * 60 * 1000, // 30 minutes
  warmUpItems: 5,
  coreItemsMin: 12,
  coreItemsMax: 16,
  bossTaskWeight: 0.20,
  confidenceAdjustment: 0.05
};
```

### Mapping Domain Scores to Remediation

The scoring system automatically generates recommendations based on domain performance. Customize in `src/utils/scoringSystem.js`:

```javascript
const moduleMap = {
  'data_literacy': 'module_data_quality_fundamentals',
  'stats': 'module_descriptive_statistics',
  'sql': 'module_sql_joins_and_aggregation',
  'python': 'module_pandas_data_manipulation',
  'viz': 'module_visualization_best_practices',
  'ethics': 'module_data_ethics_and_privacy'
};
```

## Data Model

### Result Export Format (JSON)

```json
{
  "attemptId": "uuid",
  "studentAlias": "string",
  "timestamp": "ISO-8601",
  "durationSec": 0,
  "overallScore": 0.0,
  "level": "Novice|Developing|Proficient|Advanced",
  "domainScores": {
    "data_literacy": 0.0,
    "stats": 0.0,
    "sql": 0.0,
    "python": 0.0,
    "viz": 0.0,
    "ethics": 0.0
  },
  "confidenceAdjustmentApplied": true,
  "bossPassed": true,
  "recommendations": ["module_sql_joins", "module_pandas_groupby"],
  "telemetry": [
    {
      "itemId": "sql_joins_03",
      "timeMs": 142000,
      "tries": 1,
      "confidence": "High",
      "correct": true
    }
  ]
}
```

## Technical Architecture

### Core Components

- **AdaptiveTestingEngine**: Manages 3-stage adaptive testing flow
- **RuntimeManager**: Handles Python (Pyodide) and SQL (DuckDB-WASM) execution
- **ScoringSystem**: Calculates scores with partial credit and confidence adjustment
- **ItemPool**: 50+ questions across 6 domains with proper JSON structure

### Key Technologies

- **Frontend**: React 18 + Vite + Tailwind CSS
- **Python Runtime**: Pyodide 0.25.2 with pandas
- **SQL Runtime**: DuckDB-WASM 1.9.2
- **State Management**: React hooks and context
- **Build Tool**: Vite with optimized chunking

### Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Accessibility

- **WCAG AA Compliant**: Proper color contrast and keyboard navigation
- **Screen Reader Support**: ARIA labels and semantic HTML
- **Mobile Responsive**: Works on tablets and mobile devices
- **Dark Mode**: Toggle between light and dark themes

## Performance

- **Fast Loading**: Optimized bundle with code splitting
- **Offline Capable**: Works without internet after initial load
- **Memory Efficient**: Proper cleanup of runtime engines
- **Responsive UI**: Smooth animations and transitions

## Security Considerations

- **No External Dependencies**: All code execution happens locally
- **Input Sanitization**: Code execution is sandboxed
- **No Data Transmission**: Results stay local unless webhook is configured
- **Anti-Cheat Measures**: Randomized questions and disabled navigation

## Troubleshooting

### Common Issues

1. **Python Runtime Fails to Load**
   - Check internet connection for Pyodide CDN
   - Verify browser supports WebAssembly
   - Clear browser cache and reload

2. **SQL Queries Not Executing**
   - Ensure DuckDB-WASM loaded successfully
   - Check query syntax for DuckDB compatibility
   - Verify dataset files are accessible

3. **Export Not Working**
   - Check browser download permissions
   - Ensure sufficient disk space
   - Try different export format

### Debug Mode

Enable debug logging by setting `localStorage.debug = 'true'` in browser console.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure accessibility compliance
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For technical support or feature requests, please open an issue in the repository.

---

**Built with ❤️ for data analysis education**
