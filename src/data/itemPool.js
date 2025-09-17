// Item Pool for Data Analysis Baseline Assessment
// 50+ items across 6 domains with proper JSON structure

// Import extended items
import { pythonItems, visualizationItems, ethicsItems, bossTask } from './itemPoolExtended.js';

export const itemPool = [
  // DATA LITERACY & CSV HYGIENE (10% - 8 items)
  {
    id: "data_literacy_01",
    domain: "data_literacy",
    difficulty: 1,
    stem: "You have a CSV file with missing values represented as 'N/A', 'NULL', and empty strings. Which approach is most appropriate for initial data exploration?",
    type: "mcq",
    options: [
      "Replace all missing values with zeros immediately",
      "First identify patterns in missing data, then decide on strategy",
      "Delete all rows with any missing values",
      "Fill missing values with the mean of each column"
    ],
    correct: 1,
    explanation: "Understanding missing data patterns is crucial before applying any imputation strategy.",
    confidence: true
  },
  {
    id: "data_literacy_02", 
    domain: "data_literacy",
    difficulty: 2,
    stem: "In a retail dataset, you notice that some product prices are negative. What should you do first?",
    type: "msq",
    options: [
      "Delete all rows with negative prices",
      "Investigate the business context (returns, refunds, etc.)",
      "Replace negative prices with absolute values",
      "Flag these as data quality issues for review",
      "Check if negative prices correlate with specific product categories"
    ],
    correct: [1, 3, 4],
    explanation: "Negative prices might be legitimate (refunds) or errors. Investigation and flagging are appropriate first steps.",
    confidence: true
  },
  {
    id: "data_literacy_03",
    domain: "data_literacy", 
    difficulty: 1,
    stem: "What is the primary purpose of data profiling in the initial stages of analysis?",
    type: "mcq",
    options: [
      "To make the data look more professional",
      "To understand data quality, structure, and content",
      "To reduce file size for faster processing",
      "To automatically fix all data quality issues"
    ],
    correct: 1,
    explanation: "Data profiling helps understand what you're working with before making any changes.",
    confidence: true
  },
  {
    id: "data_literacy_04",
    domain: "data_literacy",
    difficulty: 2,
    stem: "You're analyzing customer data and find duplicate records. Which factors should influence your deduplication strategy?",
    type: "msq", 
    options: [
      "The business rules for what constitutes a duplicate",
      "The cost of false positives vs false negatives",
      "The downstream impact on analysis results",
      "The file size reduction achieved",
      "The time required to implement the solution"
    ],
    correct: [0, 1, 2],
    explanation: "Business context and impact on analysis are more important than technical convenience.",
    confidence: true
  },
  {
    id: "data_literacy_05",
    domain: "data_literacy",
    difficulty: 3,
    stem: "A dataset contains timestamps in multiple formats: '2024-01-15', 'Jan 15, 2024', and '15/01/2024'. What's the best approach?",
    type: "mcq",
    options: [
      "Use the most common format and delete others",
      "Standardize all timestamps to ISO 8601 format",
      "Keep all formats for flexibility",
      "Convert to Unix timestamps only"
    ],
    correct: 1,
    explanation: "ISO 8601 (YYYY-MM-DD) is the international standard and ensures consistency.",
    confidence: true
  },
  {
    id: "data_literacy_06",
    domain: "data_literacy",
    difficulty: 2,
    stem: "When should you consider data sampling instead of using the full dataset?",
    type: "msq",
    options: [
      "When the dataset is too large for available computing resources",
      "When you need quick insights for exploratory analysis",
      "When the full dataset contains too many errors",
      "When you're building a prototype or proof of concept",
      "When you want to reduce processing time"
    ],
    correct: [0, 1, 3, 4],
    explanation: "Sampling is appropriate for resource constraints, exploration, and prototyping.",
    confidence: true
  },
  {
    id: "data_literacy_07",
    domain: "data_literacy",
    difficulty: 1,
    stem: "What does 'data lineage' refer to?",
    type: "mcq",
    options: [
      "The geographic location where data was collected",
      "The path data takes from source to final analysis",
      "The family tree of related datasets",
      "The chronological order of data collection"
    ],
    correct: 1,
    explanation: "Data lineage tracks how data flows and transforms through systems.",
    confidence: true
  },
  {
    id: "data_literacy_08",
    domain: "data_literacy",
    difficulty: 3,
    stem: "You discover that 30% of records in your dataset have missing values in a critical field. What's your next step?",
    type: "mcq",
    options: [
      "Proceed with analysis using only complete records",
      "Investigate why values are missing and assess impact on analysis",
      "Use mean imputation for all missing values",
      "Exclude this field from all analyses"
    ],
    correct: 1,
    explanation: "Understanding the mechanism of missingness is crucial for valid analysis.",
    confidence: true
  },

  // DESCRIPTIVE STATS & PROBABILITY (15% - 12 items)
  {
    id: "stats_01",
    domain: "stats",
    difficulty: 1,
    stem: "In a dataset of exam scores, the mean is 75 and the median is 80. What can you conclude about the distribution?",
    type: "mcq",
    options: [
      "The distribution is perfectly normal",
      "The distribution is left-skewed (tail on the left)",
      "The distribution is right-skewed (tail on the right)",
      "The distribution is symmetric"
    ],
    correct: 1,
    explanation: "When mean < median, the distribution is left-skewed with a tail extending toward lower values.",
    confidence: true
  },
  {
    id: "stats_02",
    domain: "stats",
    difficulty: 2,
    stem: "Which measures are most appropriate for describing the center and spread of a heavily skewed distribution?",
    type: "msq",
    options: [
      "Mean and standard deviation",
      "Median and interquartile range (IQR)",
      "Mode and range",
      "Median and mean absolute deviation",
      "Mean and variance"
    ],
    correct: [1, 3],
    explanation: "Median and IQR (or MAD) are robust to outliers and skewness.",
    confidence: true
  },
  {
    id: "stats_03",
    domain: "stats",
    difficulty: 1,
    stem: "What is the primary difference between a population and a sample?",
    type: "mcq",
    options: [
      "Population is always larger than sample",
      "Population is the entire group of interest; sample is a subset",
      "Sample is more accurate than population",
      "Population is theoretical; sample is practical"
    ],
    correct: 1,
    explanation: "Population is the complete set; sample is a representative subset used for inference.",
    confidence: true
  },
  {
    id: "stats_04",
    domain: "stats",
    difficulty: 2,
    stem: "A survey of 1000 customers shows 60% satisfaction. What factors affect the reliability of this estimate?",
    type: "msq",
    options: [
      "The sample size (1000)",
      "How representative the sample is of the population",
      "The wording of the satisfaction question",
      "The time period when the survey was conducted",
      "The response rate of the survey"
    ],
    correct: [0, 1, 2, 3, 4],
    explanation: "All these factors influence the reliability and generalizability of survey results.",
    confidence: true
  },
  {
    id: "stats_05",
    domain: "stats",
    difficulty: 3,
    stem: "The Central Limit Theorem states that:",
    type: "mcq",
    options: [
      "All distributions become normal with large sample sizes",
      "Sample means approach normal distribution regardless of population distribution",
      "Population means are always normally distributed",
      "Standard deviation decreases with sample size"
    ],
    correct: 1,
    explanation: "CLT applies to the distribution of sample means, not the original population distribution.",
    confidence: true
  },
  {
    id: "stats_06",
    domain: "stats",
    difficulty: 2,
    stem: "What is the difference between confidence and probability in statistical inference?",
    type: "mcq",
    options: [
      "They are the same concept",
      "Confidence refers to the method; probability refers to the parameter",
      "Confidence is about the interval; probability is about the parameter",
      "Confidence is subjective; probability is objective"
    ],
    correct: 2,
    explanation: "Confidence describes our method's reliability; probability describes parameter uncertainty.",
    confidence: true
  },
  {
    id: "stats_07",
    domain: "stats",
    difficulty: 1,
    stem: "Which of the following is NOT a measure of variability?",
    type: "mcq",
    options: [
      "Standard deviation",
      "Variance",
      "Mean",
      "Range"
    ],
    correct: 2,
    explanation: "Mean is a measure of central tendency, not variability.",
    confidence: true
  },
  {
    id: "stats_08",
    domain: "stats",
    difficulty: 2,
    stem: "In a normal distribution, approximately what percentage of values fall within 2 standard deviations of the mean?",
    type: "mcq",
    options: [
      "68%",
      "95%",
      "99.7%",
      "100%"
    ],
    correct: 1,
    explanation: "The 68-95-99.7 rule: 95% of values fall within 2 standard deviations.",
    confidence: true
  },
  {
    id: "stats_09",
    domain: "stats",
    difficulty: 3,
    stem: "What is sampling bias and how can it affect analysis?",
    type: "msq",
    options: [
      "It's when the sample doesn't represent the population",
      "It can lead to incorrect conclusions about the population",
      "It's always intentional and malicious",
      "It can be reduced by increasing sample size",
      "It affects the generalizability of results"
    ],
    correct: [0, 1, 4],
    explanation: "Sampling bias is systematic error that affects representativeness and generalizability.",
    confidence: true
  },
  {
    id: "stats_10",
    domain: "stats",
    difficulty: 1,
    stem: "What does the standard deviation tell you about a dataset?",
    type: "mcq",
    options: [
      "The average value of the data",
      "How spread out the data points are from the mean",
      "The most common value in the dataset",
      "The range of the data"
    ],
    correct: 1,
    explanation: "Standard deviation measures the average distance of data points from the mean.",
    confidence: true
  },
  {
    id: "stats_11",
    domain: "stats",
    difficulty: 2,
    stem: "When comparing two datasets, why might you use coefficient of variation instead of standard deviation?",
    type: "mcq",
    options: [
      "It's always more accurate",
      "It allows comparison when means are very different",
      "It's easier to calculate",
      "It's required for normal distributions"
    ],
    correct: 1,
    explanation: "CV = SD/Mean allows comparison of variability across datasets with different scales.",
    confidence: true
  },
  {
    id: "stats_12",
    domain: "stats",
    difficulty: 3,
    stem: "What is the difference between descriptive and inferential statistics?",
    type: "mcq",
    options: [
      "Descriptive is for samples; inferential is for populations",
      "Descriptive summarizes data; inferential makes predictions about populations",
      "Descriptive uses means; inferential uses medians",
      "Descriptive is qualitative; inferential is quantitative"
    ],
    correct: 1,
    explanation: "Descriptive summarizes what you have; inferential makes conclusions about what you don't have.",
    confidence: true
  },

  // SQL (25% - 20 items)
  {
    id: "sql_01",
    domain: "sql",
    difficulty: 1,
    stem: "Which SQL clause is used to filter rows after grouping?",
    type: "mcq",
    options: [
      "WHERE",
      "HAVING", 
      "FILTER",
      "GROUP BY"
    ],
    correct: 1,
    explanation: "HAVING filters groups after GROUP BY; WHERE filters rows before grouping.",
    confidence: true
  },
  {
    id: "sql_02",
    domain: "sql",
    difficulty: 2,
    stem: "What is the difference between INNER JOIN and LEFT JOIN?",
    type: "mcq",
    options: [
      "INNER JOIN is faster than LEFT JOIN",
      "INNER JOIN returns only matching rows; LEFT JOIN returns all rows from left table",
      "LEFT JOIN is more accurate than INNER JOIN",
      "INNER JOIN uses more memory than LEFT JOIN"
    ],
    correct: 1,
    explanation: "INNER JOIN returns only matching rows; LEFT JOIN preserves all left table rows.",
    confidence: true
  },
  {
    id: "sql_03",
    domain: "sql",
    difficulty: 1,
    stem: "Which SQL function counts the number of non-NULL values in a column?",
    type: "mcq",
    options: [
      "COUNT(*)",
      "COUNT(column_name)",
      "SUM(column_name)",
      "TOTAL(column_name)"
    ],
    correct: 1,
    explanation: "COUNT(column_name) counts non-NULL values; COUNT(*) counts all rows.",
    confidence: true
  },
  {
    id: "sql_04",
    domain: "sql",
    difficulty: 2,
    stem: "What does the following SQL query return? SELECT store, COUNT(*) FROM transactions GROUP BY store HAVING COUNT(*) > 100;",
    type: "mcq",
    options: [
      "All stores and their transaction counts",
      "Only stores with more than 100 transactions",
      "The first 100 transactions per store",
      "Stores with exactly 100 transactions"
    ],
    correct: 1,
    explanation: "HAVING filters groups, so this returns only stores with >100 transactions.",
    confidence: true
  },
  {
    id: "sql_05",
    domain: "sql",
    difficulty: 3,
    stem: "Write a SQL query to find the top 3 stores by total revenue in January 2024, including stores with zero revenue.",
    type: "sql",
    assets: {
      schema: "transactions table: date, store, sku, qty, price, promo_flag",
      csv: "retail_transactions.csv"
    },
    generator: "function(seed) { return { startDate: '2024-01-01', endDate: '2024-01-31' }; }",
    solution: {
      sql: "SELECT store, COALESCE(SUM(qty * price), 0) as total_revenue FROM (SELECT DISTINCT store FROM transactions) s LEFT JOIN transactions t ON s.store = t.store AND t.date >= '2024-01-01' AND t.date <= '2024-01-31' GROUP BY store ORDER BY total_revenue DESC LIMIT 3;",
      tests: [
        { query: "SELECT COUNT(*) FROM (SELECT store, COALESCE(SUM(qty * price), 0) as total_revenue FROM (SELECT DISTINCT store FROM transactions) s LEFT JOIN transactions t ON s.store = t.store AND t.date >= '2024-01-01' AND t.date <= '2024-01-31' GROUP BY store ORDER BY total_revenue DESC LIMIT 3);", expect: "3" }
      ]
    },
    explanation: "Uses LEFT JOIN to include all stores, COALESCE to handle zero revenue, and proper date filtering.",
    confidence: true
  },
  {
    id: "sql_06",
    domain: "sql",
    difficulty: 2,
    stem: "Which SQL window function assigns a unique sequential number to each row within a partition?",
    type: "mcq",
    options: [
      "RANK()",
      "DENSE_RANK()",
      "ROW_NUMBER()",
      "NTILE()"
    ],
    correct: 2,
    explanation: "ROW_NUMBER() assigns unique sequential numbers; RANK() can have ties.",
    confidence: true
  },
  {
    id: "sql_07",
    domain: "sql",
    difficulty: 1,
    stem: "What does the CASE statement do in SQL?",
    type: "mcq",
    options: [
      "Creates a new table",
      "Performs conditional logic like IF-THEN-ELSE",
      "Joins two tables",
      "Groups rows together"
    ],
    correct: 1,
    explanation: "CASE provides conditional logic for creating calculated columns.",
    confidence: true
  },
  {
    id: "sql_08",
    domain: "sql",
    difficulty: 2,
    stem: "Write a query to find customers who made purchases in both January and February 2024.",
    type: "sql",
    assets: {
      schema: "transactions table: date, store, sku, qty, price, promo_flag",
      csv: "retail_transactions.csv"
    },
    generator: "function(seed) { return { year: 2024 }; }",
    solution: {
      sql: "SELECT DISTINCT store FROM transactions WHERE date >= '2024-01-01' AND date < '2024-02-01' INTERSECT SELECT DISTINCT store FROM transactions WHERE date >= '2024-02-01' AND date < '2024-03-01';",
      tests: [
        { query: "SELECT COUNT(*) FROM (SELECT DISTINCT store FROM transactions WHERE date >= '2024-01-01' AND date < '2024-02-01' INTERSECT SELECT DISTINCT store FROM transactions WHERE date >= '2024-02-01' AND date < '2024-03-01');", expect: ">0" }
      ]
    },
    explanation: "Uses INTERSECT to find stores that appear in both January and February data.",
    confidence: true
  },
  {
    id: "sql_09",
    domain: "sql",
    difficulty: 3,
    stem: "What is the difference between RANK() and DENSE_RANK() window functions?",
    type: "mcq",
    options: [
      "RANK() is faster than DENSE_RANK()",
      "RANK() leaves gaps in ranking after ties; DENSE_RANK() doesn't",
      "DENSE_RANK() only works with numbers",
      "RANK() requires ORDER BY; DENSE_RANK() doesn't"
    ],
    correct: 1,
    explanation: "RANK() leaves gaps (1,2,2,4); DENSE_RANK() doesn't (1,2,2,3).",
    confidence: true
  },
  {
    id: "sql_10",
    domain: "sql",
    difficulty: 2,
    stem: "Which SQL clause is used to sort query results?",
    type: "mcq",
    options: [
      "SORT BY",
      "ORDER BY",
      "GROUP BY",
      "ARRANGE BY"
    ],
    correct: 1,
    explanation: "ORDER BY sorts the final result set.",
    confidence: true
  },
  {
    id: "sql_11",
    domain: "sql",
    difficulty: 1,
    stem: "What does the DISTINCT keyword do in SQL?",
    type: "mcq",
    options: [
      "Sorts the results",
      "Removes duplicate rows",
      "Groups similar data",
      "Filters out NULL values"
    ],
    correct: 1,
    explanation: "DISTINCT eliminates duplicate rows from the result set.",
    confidence: true
  },
  {
    id: "sql_12",
    domain: "sql",
    difficulty: 2,
    stem: "Write a query to calculate the running total of revenue by date for Store_A.",
    type: "sql",
    assets: {
      schema: "transactions table: date, store, sku, qty, price, promo_flag",
      csv: "retail_transactions.csv"
    },
    generator: "function(seed) { return { store: 'Store_A' }; }",
    solution: {
      sql: "SELECT date, SUM(qty * price) as daily_revenue, SUM(SUM(qty * price)) OVER (ORDER BY date) as running_total FROM transactions WHERE store = 'Store_A' GROUP BY date ORDER BY date;",
      tests: [
        { query: "SELECT COUNT(*) FROM (SELECT date, SUM(qty * price) as daily_revenue, SUM(SUM(qty * price)) OVER (ORDER BY date) as running_total FROM transactions WHERE store = 'Store_A' GROUP BY date ORDER BY date);", expect: ">0" }
      ]
    },
    explanation: "Uses window function with OVER clause to calculate cumulative sum.",
    confidence: true
  },
  {
    id: "sql_13",
    domain: "sql",
    difficulty: 3,
    stem: "What is the purpose of the OVER clause in SQL window functions?",
    type: "mcq",
    options: [
      "To filter rows before applying the function",
      "To define the window or partition for the function",
      "To join tables together",
      "To group rows for aggregation"
    ],
    correct: 1,
    explanation: "OVER defines the window frame for window functions.",
    confidence: true
  },
  {
    id: "sql_14",
    domain: "sql",
    difficulty: 2,
    stem: "Which SQL operator is used to combine results from multiple SELECT statements?",
    type: "msq",
    options: [
      "UNION",
      "INTERSECT",
      "EXCEPT",
      "JOIN"
    ],
    correct: [0, 1, 2],
    explanation: "UNION, INTERSECT, and EXCEPT combine result sets; JOIN combines tables.",
    confidence: true
  },
  {
    id: "sql_15",
    domain: "sql",
    difficulty: 1,
    stem: "What does the LIMIT clause do in SQL?",
    type: "mcq",
    options: [
      "Filters rows based on conditions",
      "Restricts the number of rows returned",
      "Groups rows together",
      "Sorts the results"
    ],
    correct: 1,
    explanation: "LIMIT restricts the number of rows in the result set.",
    confidence: true
  },
  {
    id: "sql_16",
    domain: "sql",
    difficulty: 2,
    stem: "Write a query to find the second highest revenue by store.",
    type: "sql",
    assets: {
      schema: "transactions table: date, store, sku, qty, price, promo_flag",
      csv: "retail_transactions.csv"
    },
    generator: "function(seed) { return {}; }",
    solution: {
      sql: "SELECT store, total_revenue FROM (SELECT store, SUM(qty * price) as total_revenue, DENSE_RANK() OVER (ORDER BY SUM(qty * price) DESC) as rn FROM transactions GROUP BY store) ranked WHERE rn = 2;",
      tests: [
        { query: "SELECT COUNT(*) FROM (SELECT store, total_revenue FROM (SELECT store, SUM(qty * price) as total_revenue, DENSE_RANK() OVER (ORDER BY SUM(qty * price) DESC) as rn FROM transactions GROUP BY store) ranked WHERE rn = 2);", expect: "1" }
      ]
    },
    explanation: "Uses DENSE_RANK() to find the second highest value, handling ties properly.",
    confidence: true
  },
  {
    id: "sql_17",
    domain: "sql",
    difficulty: 3,
    stem: "What is the difference between a correlated and non-correlated subquery?",
    type: "mcq",
    options: [
      "Correlated subqueries are always faster",
      "Correlated subqueries reference columns from the outer query",
      "Non-correlated subqueries can't use WHERE clauses",
      "Correlated subqueries can't return multiple rows"
    ],
    correct: 1,
    explanation: "Correlated subqueries depend on the outer query; non-correlated are independent.",
    confidence: true
  },
  {
    id: "sql_18",
    domain: "sql",
    difficulty: 2,
    stem: "Which SQL function returns the current date and time?",
    type: "mcq",
    options: [
      "NOW()",
      "CURRENT_TIMESTAMP",
      "GETDATE()",
      "SYSDATE()"
    ],
    correct: 1,
    explanation: "CURRENT_TIMESTAMP is the SQL standard function for current date/time.",
    confidence: true
  },
  {
    id: "sql_19",
    domain: "sql",
    difficulty: 1,
    stem: "What does the GROUP BY clause do in SQL?",
    type: "mcq",
    options: [
      "Sorts the results",
      "Groups rows with the same values in specified columns",
      "Filters rows based on conditions",
      "Joins multiple tables"
    ],
    correct: 1,
    explanation: "GROUP BY groups rows with identical values in specified columns.",
    confidence: true
  },
  {
    id: "sql_20",
    domain: "sql",
    difficulty: 3,
    stem: "Write a query to find stores with above-average revenue using a window function.",
    type: "sql",
    assets: {
      schema: "transactions table: date, store, sku, qty, price, promo_flag",
      csv: "retail_transactions.csv"
    },
    generator: "function(seed) { return {}; }",
    solution: {
      sql: "SELECT store, total_revenue FROM (SELECT store, SUM(qty * price) as total_revenue, AVG(SUM(qty * price)) OVER() as avg_revenue FROM transactions GROUP BY store) ranked WHERE total_revenue > avg_revenue;",
      tests: [
        { query: "SELECT COUNT(*) FROM (SELECT store, total_revenue FROM (SELECT store, SUM(qty * price) as total_revenue, AVG(SUM(qty * price)) OVER() as avg_revenue FROM transactions GROUP BY store) ranked WHERE total_revenue > avg_revenue);", expect: ">0" }
      ]
    },
    explanation: "Uses window function to calculate average revenue across all stores for comparison.",
    confidence: true
  }
];

// Combine all items
export const allItems = [
  ...itemPool,
  ...pythonItems,
  ...visualizationItems,
  ...ethicsItems
];

// Domain weights (sum to 100%)
export const domainWeights = {
  data_literacy: 0.10,
  stats: 0.15,
  sql: 0.25,
  python: 0.25,
  viz: 0.10,
  ethics: 0.15
};

// Difficulty levels
export const difficultyLevels = {
  1: 'Easy',
  2: 'Medium', 
  3: 'Hard'
};

// Item types
export const itemTypes = {
  mcq: 'Multiple Choice',
  msq: 'Multiple Select',
  sql: 'SQL Query',
  python: 'Python Code',
  rank: 'Ranking/Drag & Drop',
  boss: 'Boss Task'
};

export { bossTask };
