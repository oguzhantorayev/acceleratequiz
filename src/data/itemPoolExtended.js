// Extended Item Pool - Python, Visualization, and Ethics items

export const pythonItems = [
  // PYTHON + PANDAS (25% - 20 items)
  {
    id: "python_01",
    domain: "python",
    difficulty: 1,
    stem: "What does df.head() do in pandas?",
    type: "mcq",
    options: [
      "Shows the last 5 rows",
      "Shows the first 5 rows",
      "Shows column names",
      "Shows data types"
    ],
    correct: 1,
    explanation: "head() displays the first 5 rows by default.",
    confidence: true
  },
  {
    id: "python_02",
    domain: "python",
    difficulty: 2,
    stem: "Write Python code to filter a DataFrame for rows where 'price' is greater than 50.",
    type: "python",
    assets: {
      schema: "DataFrame with columns: date, store, sku, qty, price, promo_flag",
      csv: "retail_transactions.csv"
    },
    generator: "function(seed) { return { threshold: 50 }; }",
    solution: {
      python: "df[df['price'] > 50]",
      tests: [
        { code: "result = df[df['price'] > 50]; print(len(result))", expect: ">0" }
      ]
    },
    explanation: "Boolean indexing with df[condition] filters rows.",
    confidence: true
  },
  {
    id: "python_03",
    domain: "python",
    difficulty: 1,
    stem: "What does df.info() show?",
    type: "msq",
    options: [
      "Column names and data types",
      "Number of non-null values per column",
      "Memory usage",
      "First few rows of data"
    ],
    correct: [0, 1, 2],
    explanation: "info() shows structure, data types, and memory usage, not actual data.",
    confidence: true
  },
  {
    id: "python_04",
    domain: "python",
    difficulty: 2,
    stem: "Write code to group by 'store' and calculate total revenue (qty * price) for each store.",
    type: "python",
    assets: {
      schema: "DataFrame with columns: date, store, sku, qty, price, promo_flag",
      csv: "retail_transactions.csv"
    },
    generator: "function(seed) { return {}; }",
    solution: {
      python: "df['revenue'] = df['qty'] * df['price']; df.groupby('store')['revenue'].sum()",
      tests: [
        { code: "df['revenue'] = df['qty'] * df['price']; result = df.groupby('store')['revenue'].sum(); print(len(result))", expect: ">0" }
      ]
    },
    explanation: "Create revenue column, then group by store and sum revenue.",
    confidence: true
  },
  {
    id: "python_05",
    domain: "python",
    difficulty: 3,
    stem: "Write code to find the top 3 stores by total revenue, including stores with zero revenue.",
    type: "python",
    assets: {
      schema: "DataFrame with columns: date, store, sku, qty, price, promo_flag",
      csv: "retail_transactions.csv"
    },
    generator: "function(seed) { return {}; }",
    solution: {
      python: "df['revenue'] = df['qty'] * df['price']; all_stores = df['store'].unique(); store_revenue = df.groupby('store')['revenue'].sum().reindex(all_stores, fill_value=0); store_revenue.nlargest(3)",
      tests: [
        { code: "df['revenue'] = df['qty'] * df['price']; all_stores = df['store'].unique(); store_revenue = df.groupby('store')['revenue'].sum().reindex(all_stores, fill_value=0); result = store_revenue.nlargest(3); print(len(result))", expect: "3" }
      ]
    },
    explanation: "Use reindex to include all stores and fill missing values with 0.",
    confidence: true
  },
  {
    id: "python_06",
    domain: "python",
    difficulty: 1,
    stem: "What does df.describe() return?",
    type: "mcq",
    options: [
      "Column names only",
      "Statistical summary of numeric columns",
      "Data types of all columns",
      "First 5 rows"
    ],
    correct: 1,
    explanation: "describe() provides count, mean, std, min, max, and quartiles for numeric columns.",
    confidence: true
  },
  {
    id: "python_07",
    domain: "python",
    difficulty: 2,
    stem: "Write code to merge two DataFrames on a common column 'id'.",
    type: "python",
    assets: {
      schema: "Two DataFrames with 'id' column",
      csv: "retail_transactions.csv"
    },
    generator: "function(seed) { return {}; }",
    solution: {
      python: "pd.merge(df1, df2, on='id')",
      tests: [
        { code: "df1 = df.copy(); df2 = df.copy(); result = pd.merge(df1, df2, on='store'); print(len(result))", expect: ">0" }
      ]
    },
    explanation: "pd.merge() combines DataFrames on specified columns.",
    confidence: true
  },
  {
    id: "python_08",
    domain: "python",
    difficulty: 2,
    stem: "What does df.value_counts() do?",
    type: "mcq",
    options: [
      "Counts the number of rows",
      "Counts unique values in a column",
      "Counts missing values",
      "Counts data types"
    ],
    correct: 1,
    explanation: "value_counts() returns counts of unique values in a Series.",
    confidence: true
  },
  {
    id: "python_09",
    domain: "python",
    difficulty: 3,
    stem: "Write code to create a pivot table showing total revenue by store and month.",
    type: "python",
    assets: {
      schema: "DataFrame with columns: date, store, sku, qty, price, promo_flag",
      csv: "retail_transactions.csv"
    },
    generator: "function(seed) { return {}; }",
    solution: {
      python: "df['revenue'] = df['qty'] * df['price']; df['month'] = pd.to_datetime(df['date']).dt.month; df.pivot_table(values='revenue', index='store', columns='month', aggfunc='sum', fill_value=0)",
      tests: [
        { code: "df['revenue'] = df['qty'] * df['price']; df['month'] = pd.to_datetime(df['date']).dt.month; result = df.pivot_table(values='revenue', index='store', columns='month', aggfunc='sum', fill_value=0); print(result.shape[0])", expect: ">0" }
      ]
    },
    explanation: "Create revenue and month columns, then use pivot_table with proper aggregation.",
    confidence: true
  },
  {
    id: "python_10",
    domain: "python",
    difficulty: 1,
    stem: "How do you read a CSV file into a pandas DataFrame?",
    type: "mcq",
    options: [
      "pd.read_csv('filename.csv')",
      "pd.load_csv('filename.csv')",
      "pd.import_csv('filename.csv')",
      "pd.open_csv('filename.csv')"
    ],
    correct: 0,
    explanation: "pd.read_csv() is the correct function to read CSV files.",
    confidence: true
  },
  {
    id: "python_11",
    domain: "python",
    difficulty: 2,
    stem: "Write code to handle missing values by filling them with the mean of each column.",
    type: "python",
    assets: {
      schema: "DataFrame with potential missing values",
      csv: "retail_transactions.csv"
    },
    generator: "function(seed) { return {}; }",
    solution: {
      python: "df.fillna(df.mean())",
      tests: [
        { code: "df_with_nulls = df.copy(); df_with_nulls.loc[0, 'price'] = None; result = df_with_nulls.fillna(df_with_nulls.mean()); print(result.isnull().sum().sum())", expect: "0" }
      ]
    },
    explanation: "fillna() with mean() fills missing values with column means.",
    confidence: true
  },
  {
    id: "python_12",
    domain: "python",
    difficulty: 2,
    stem: "What does df.dropna() do?",
    type: "mcq",
    options: [
      "Fills missing values with zeros",
      "Removes rows or columns with missing values",
      "Counts missing values",
      "Replaces missing values with the mean"
    ],
    correct: 1,
    explanation: "dropna() removes rows or columns containing missing values.",
    confidence: true
  },
  {
    id: "python_13",
    domain: "python",
    difficulty: 3,
    stem: "Write code to create a simple bar chart of total revenue by store.",
    type: "python",
    assets: {
      schema: "DataFrame with columns: date, store, sku, qty, price, promo_flag",
      csv: "retail_transactions.csv"
    },
    generator: "function(seed) { return {}; }",
    solution: {
      python: "import matplotlib.pyplot as plt; df['revenue'] = df['qty'] * df['price']; store_revenue = df.groupby('store')['revenue'].sum(); store_revenue.plot(kind='bar'); plt.title('Revenue by Store'); plt.show()",
      tests: [
        { code: "df['revenue'] = df['qty'] * df['price']; store_revenue = df.groupby('store')['revenue'].sum(); print(len(store_revenue))", expect: ">0" }
      ]
    },
    explanation: "Group by store, sum revenue, then use plot(kind='bar') for visualization.",
    confidence: true
  },
  {
    id: "python_14",
    domain: "python",
    difficulty: 1,
    stem: "What does df.shape return?",
    type: "mcq",
    options: [
      "Column names",
      "Data types",
      "Number of rows and columns",
      "Memory usage"
    ],
    correct: 2,
    explanation: "shape returns a tuple of (rows, columns).",
    confidence: true
  },
  {
    id: "python_15",
    domain: "python",
    difficulty: 2,
    stem: "Write code to sort a DataFrame by 'price' in descending order.",
    type: "python",
    assets: {
      schema: "DataFrame with 'price' column",
      csv: "retail_transactions.csv"
    },
    generator: "function(seed) { return {}; }",
    solution: {
      python: "df.sort_values('price', ascending=False)",
      tests: [
        { code: "result = df.sort_values('price', ascending=False); print(result.iloc[0]['price'] >= result.iloc[-1]['price'])", expect: "True" }
      ]
    },
    explanation: "sort_values() with ascending=False sorts in descending order.",
    confidence: true
  },
  {
    id: "python_16",
    domain: "python",
    difficulty: 2,
    stem: "What does df.duplicated() return?",
    type: "mcq",
    options: [
      "The number of duplicate rows",
      "A boolean Series indicating duplicate rows",
      "The duplicate rows themselves",
      "A list of duplicate values"
    ],
    correct: 1,
    explanation: "duplicated() returns a boolean Series marking duplicate rows as True.",
    confidence: true
  },
  {
    id: "python_17",
    domain: "python",
    difficulty: 3,
    stem: "Write code to calculate the rolling 7-day average revenue.",
    type: "python",
    assets: {
      schema: "DataFrame with columns: date, store, sku, qty, price, promo_flag",
      csv: "retail_transactions.csv"
    },
    generator: "function(seed) { return {}; }",
    solution: {
      python: "df['revenue'] = df['qty'] * df['price']; df['date'] = pd.to_datetime(df['date']); daily_revenue = df.groupby('date')['revenue'].sum(); daily_revenue.rolling(window=7).mean()",
      tests: [
        { code: "df['revenue'] = df['qty'] * df['price']; df['date'] = pd.to_datetime(df['date']); daily_revenue = df.groupby('date')['revenue'].sum(); result = daily_revenue.rolling(window=7).mean(); print(len(result.dropna()))", expect: ">0" }
      ]
    },
    explanation: "Group by date, sum revenue, then use rolling() with window=7 for moving average.",
    confidence: true
  },
  {
    id: "python_18",
    domain: "python",
    difficulty: 1,
    stem: "What does df.columns return?",
    type: "mcq",
    options: [
      "The number of columns",
      "A list of column names",
      "Column data types",
      "Column statistics"
    ],
    correct: 1,
    explanation: "columns returns an Index object with column names.",
    confidence: true
  },
  {
    id: "python_19",
    domain: "python",
    difficulty: 2,
    stem: "Write code to select only numeric columns from a DataFrame.",
    type: "python",
    assets: {
      schema: "DataFrame with mixed data types",
      csv: "retail_transactions.csv"
    },
    generator: "function(seed) { return {}; }",
    solution: {
      python: "df.select_dtypes(include=['number'])",
      tests: [
        { code: "result = df.select_dtypes(include=['number']); print(len(result.columns))", expect: ">0" }
      ]
    },
    explanation: "select_dtypes() with include=['number'] selects only numeric columns.",
    confidence: true
  },
  {
    id: "python_20",
    domain: "python",
    difficulty: 3,
    stem: "Write code to create a histogram of price distribution with 20 bins.",
    type: "python",
    assets: {
      schema: "DataFrame with 'price' column",
      csv: "retail_transactions.csv"
    },
    generator: "function(seed) { return {}; }",
    solution: {
      python: "import matplotlib.pyplot as plt; df['price'].hist(bins=20); plt.title('Price Distribution'); plt.xlabel('Price'); plt.ylabel('Frequency'); plt.show()",
      tests: [
        { code: "print(df['price'].min(), df['price'].max())", expect: ">0" }
      ]
    },
    explanation: "Use hist() method with bins parameter to create histogram.",
    confidence: true
  }
];

export const visualizationItems = [
  // VISUALIZATION LITERACY (10% - 8 items)
  {
    id: "viz_01",
    domain: "viz",
    difficulty: 1,
    stem: "Which chart type is most appropriate for showing the distribution of a single continuous variable?",
    type: "mcq",
    options: [
      "Bar chart",
      "Line chart",
      "Histogram",
      "Scatter plot"
    ],
    correct: 2,
    explanation: "Histograms show the distribution of continuous variables by grouping values into bins.",
    confidence: true
  },
  {
    id: "viz_02",
    domain: "viz",
    difficulty: 2,
    stem: "What is the main problem with this chart? [Shows a bar chart with y-axis starting at 50 instead of 0]",
    type: "mcq",
    options: [
      "Wrong chart type",
      "Misleading y-axis scale",
      "Poor color choice",
      "Missing title"
    ],
    correct: 1,
    explanation: "Truncated y-axis can make small differences appear much larger than they are.",
    confidence: true
  },
  {
    id: "viz_03",
    domain: "viz",
    difficulty: 1,
    stem: "Which chart type is best for showing trends over time?",
    type: "mcq",
    options: [
      "Pie chart",
      "Bar chart",
      "Line chart",
      "Scatter plot"
    ],
    correct: 2,
    explanation: "Line charts effectively show trends and changes over time.",
    confidence: true
  },
  {
    id: "viz_04",
    domain: "viz",
    difficulty: 2,
    stem: "What's wrong with using a pie chart for 15 different categories?",
    type: "mcq",
    options: [
      "Pie charts are always wrong",
      "Too many slices make it hard to compare values",
      "Pie charts can't show 15 categories",
      "Pie charts are too colorful"
    ],
    correct: 1,
    explanation: "Too many slices make pie charts cluttered and difficult to interpret.",
    confidence: true
  },
  {
    id: "viz_05",
    domain: "viz",
    difficulty: 3,
    stem: "When should you use a dual-axis chart?",
    type: "mcq",
    options: [
      "Always, when you have two variables",
      "When the two variables have different scales and units",
      "Never, they're always misleading",
      "When you want to show correlation"
    ],
    correct: 1,
    explanation: "Dual-axis charts are appropriate when variables have different scales/units, but use carefully.",
    confidence: true
  },
  {
    id: "viz_06",
    domain: "viz",
    difficulty: 2,
    stem: "What color accessibility issue should you consider when creating charts?",
    type: "msq",
    options: [
      "Colorblind-friendly palettes",
      "Sufficient contrast ratios",
      "Not relying solely on color to convey information",
      "Using only primary colors"
    ],
    correct: [0, 1, 2],
    explanation: "Accessibility requires colorblind-friendly palettes, good contrast, and not relying solely on color.",
    confidence: true
  },
  {
    id: "viz_07",
    domain: "viz",
    difficulty: 1,
    stem: "What is the primary purpose of chart titles and axis labels?",
    type: "mcq",
    options: [
      "To make charts look professional",
      "To provide context and clarity for interpretation",
      "To fill empty space",
      "To make charts colorful"
    ],
    correct: 1,
    explanation: "Titles and labels provide essential context for understanding the data.",
    confidence: true
  },
  {
    id: "viz_08",
    domain: "viz",
    difficulty: 3,
    stem: "What's the main issue with this visualization? [Shows a 3D bar chart with perspective distortion]",
    type: "mcq",
    options: [
      "Wrong data",
      "3D perspective makes accurate comparison difficult",
      "Poor color choice",
      "Missing legend"
    ],
    correct: 1,
    explanation: "3D perspective can distort the visual representation of data values.",
    confidence: true
  }
];

export const ethicsItems = [
  // PROBLEM FRAMING & ETHICS/PRIVACY (15% - 12 items)
  {
    id: "ethics_01",
    domain: "ethics",
    difficulty: 1,
    stem: "What is Personally Identifiable Information (PII)?",
    type: "mcq",
    options: [
      "Any data that can identify an individual",
      "Only names and addresses",
      "Data that is always public",
      "Information that cannot be shared"
    ],
    correct: 0,
    explanation: "PII is any information that can be used to identify a specific individual.",
    confidence: true
  },
  {
    id: "ethics_02",
    domain: "ethics",
    difficulty: 2,
    stem: "What are appropriate methods for anonymizing data?",
    type: "msq",
    options: [
      "Removing direct identifiers (names, SSNs)",
      "Aggregating data to group level",
      "Adding random noise to sensitive values",
      "Simply changing names to numbers",
      "Using differential privacy techniques"
    ],
    correct: [0, 1, 2, 4],
    explanation: "Proper anonymization requires removing identifiers, aggregation, noise, or differential privacy.",
    confidence: true
  },
  {
    id: "ethics_03",
    domain: "ethics",
    difficulty: 1,
    stem: "What is data leakage in machine learning?",
    type: "mcq",
    options: [
      "Data getting lost during processing",
      "Future information accidentally included in training data",
      "Data being stolen by hackers",
      "Data being corrupted"
    ],
    correct: 1,
    explanation: "Data leakage occurs when future or external information is used inappropriately in training.",
    confidence: true
  },
  {
    id: "ethics_04",
    domain: "ethics",
    difficulty: 2,
    stem: "What is algorithmic bias?",
    type: "mcq",
    options: [
      "When algorithms are always wrong",
      "When algorithms produce systematically prejudiced results",
      "When algorithms are too slow",
      "When algorithms use too much memory"
    ],
    correct: 1,
    explanation: "Algorithmic bias occurs when systems produce systematically prejudiced outcomes.",
    confidence: true
  },
  {
    id: "ethics_05",
    domain: "ethics",
    difficulty: 3,
    stem: "What should you do if you discover bias in your analysis results?",
    type: "msq",
    options: [
      "Ignore it if the results are otherwise good",
      "Document the bias and its potential impact",
      "Investigate the source of the bias",
      "Report findings transparently to stakeholders",
      "Adjust the analysis to reduce bias"
    ],
    correct: [1, 2, 3, 4],
    explanation: "Bias should be documented, investigated, reported transparently, and addressed.",
    confidence: true
  },
  {
    id: "ethics_06",
    domain: "ethics",
    difficulty: 1,
    stem: "What is informed consent in data collection?",
    type: "mcq",
    options: [
      "Getting permission after collecting data",
      "Getting clear permission with full understanding of data use",
      "Getting verbal permission only",
      "Getting permission from family members"
    ],
    correct: 1,
    explanation: "Informed consent requires clear understanding of how data will be used.",
    confidence: true
  },
  {
    id: "ethics_07",
    domain: "ethics",
    difficulty: 2,
    stem: "What is the difference between correlation and causation?",
    type: "mcq",
    options: [
      "They are the same thing",
      "Correlation shows relationship; causation shows one causes the other",
      "Causation is always stronger than correlation",
      "Correlation is always misleading"
    ],
    correct: 1,
    explanation: "Correlation shows association; causation shows one variable directly causes another.",
    confidence: true
  },
  {
    id: "ethics_08",
    domain: "ethics",
    difficulty: 3,
    stem: "What are potential sources of bias in data analysis?",
    type: "msq",
    options: [
      "Selection bias in data collection",
      "Confirmation bias in interpretation",
      "Survivorship bias in sampling",
      "Measurement bias in data quality",
      "Temporal bias in time-based data"
    ],
    correct: [0, 1, 2, 3, 4],
    explanation: "Multiple types of bias can affect data analysis at different stages.",
    confidence: true
  },
  {
    id: "ethics_09",
    domain: "ethics",
    difficulty: 2,
    stem: "What is the purpose of data governance?",
    type: "mcq",
    options: [
      "To make data processing faster",
      "To ensure data quality, privacy, and ethical use",
      "To reduce storage costs",
      "To make data more colorful"
    ],
    correct: 1,
    explanation: "Data governance ensures proper management of data quality, privacy, and ethics.",
    confidence: true
  },
  {
    id: "ethics_10",
    domain: "ethics",
    difficulty: 1,
    stem: "What should you do with data after completing an analysis?",
    type: "msq",
    options: [
      "Delete it immediately",
      "Store it securely according to retention policies",
      "Share it publicly",
      "Document how it was used",
      "Ensure proper access controls"
    ],
    correct: [1, 3, 4],
    explanation: "Data should be stored securely, documented, and access-controlled according to policies.",
    confidence: true
  },
  {
    id: "ethics_11",
    domain: "ethics",
    difficulty: 3,
    stem: "What is the difference between privacy and confidentiality?",
    type: "mcq",
    options: [
      "They are the same concept",
      "Privacy is about control over personal information; confidentiality is about protecting shared information",
      "Privacy is about data security; confidentiality is about data quality",
      "Privacy is about individuals; confidentiality is about organizations"
    ],
    correct: 1,
    explanation: "Privacy is about individual control; confidentiality is about protecting shared information.",
    confidence: true
  },
  {
    id: "ethics_12",
    domain: "ethics",
    difficulty: 2,
    stem: "What should you consider when presenting analysis results to stakeholders?",
    type: "msq",
    options: [
      "Only show positive results",
      "Be transparent about limitations and uncertainties",
      "Use appropriate visualizations for the audience",
      "Provide context and methodology",
      "Avoid technical jargon when appropriate"
    ],
    correct: [1, 2, 3, 4],
    explanation: "Transparent, contextual, audience-appropriate communication is essential.",
    confidence: true
  }
];

// Boss Task - Final comprehensive question
export const bossTask = {
  id: "boss_task_01",
  domain: "mixed",
  difficulty: 3,
  stem: "You are analyzing customer satisfaction data. The dataset contains support tickets with creation dates, categories, priorities, resolution times, and CSAT scores. Your task is to identify which support category has the highest average CSAT score for high-priority tickets resolved within 24 hours in January 2024. Choose either Python or SQL to solve this problem. Provide a brief explanation of your approach.",
  type: "boss",
  assets: {
    schema: "support_tickets table: created_at, category, priority, resolved_at, csat",
    csv: "support_tickets.csv"
  },
  generator: "function(seed) { return { year: 2024, month: 1, hours: 24 }; }",
  solution: {
    sql: "SELECT category, AVG(csat) as avg_csat FROM support_tickets WHERE priority = 'High' AND created_at >= '2024-01-01' AND created_at < '2024-02-01' AND resolved_at IS NOT NULL AND (resolved_at - created_at) <= INTERVAL '24 hours' GROUP BY category ORDER BY avg_csat DESC LIMIT 1;",
    python: "import pandas as pd; df = pd.read_csv('support_tickets.csv'); df['created_at'] = pd.to_datetime(df['created_at']); df['resolved_at'] = pd.to_datetime(df['resolved_at']); df['resolution_time'] = df['resolved_at'] - df['created_at']; jan_high = df[(df['created_at'].dt.year == 2024) & (df['created_at'].dt.month == 1) & (df['priority'] == 'High') & (df['resolution_time'] <= pd.Timedelta(hours=24))]; result = jan_high.groupby('category')['csat'].mean().sort_values(ascending=False).head(1); print(result)",
    tests: [
      { query: "SELECT COUNT(*) FROM support_tickets WHERE priority = 'High' AND created_at >= '2024-01-01' AND created_at < '2024-02-01'", expect: ">0" }
    ]
  },
  explanation: "This task tests data filtering, time calculations, grouping, and aggregation across multiple domains.",
  confidence: true,
  rubric: {
    correctness: 0.7,
    method_clarity: 0.2,
    communication: 0.1
  }
};
