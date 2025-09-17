// Conceptual Item Pool for Data Analysis Baseline Assessment
// 50 questions focused on concepts and abstractions, not technical implementation

export const conceptualItems = [
  // DATA LITERACY & CONCEPTS (10 questions)
  {
    id: "concept_01",
    domain: "data_literacy",
    difficulty: 1,
    stem: "You're analyzing customer purchase data for an e-commerce company. The dataset contains 50,000 transactions from the last quarter. What should be your first step when you receive this data?",
    type: "mcq",
    options: [
      "Immediately start building predictive models",
      "Explore the data to understand its structure, quality, and patterns",
      "Create visualizations right away",
      "Export the data to Excel for easier analysis",
      "I don't know"
    ],
    correct: 1,
    explanation: "Data exploration is crucial first step to understand data structure, identify quality issues, and discover patterns before any analysis or modeling."
  },
  {
    id: "concept_02",
    domain: "data_literacy",
    difficulty: 2,
    stem: "While analyzing sales data for a retail chain, you notice that one store has sales figures 300% higher than all other locations. The data shows consistent high sales across all months. What should you do first?",
    type: "mcq",
    options: [
      "Remove this store's data as it's clearly an error",
      "Investigate the store's location, size, and business context to understand why it's performing differently",
      "Replace the high values with the average of other stores",
      "Assume it's a flagship store and continue with analysis",
      "I don't know"
    ],
    correct: 1,
    explanation: "Outliers often represent important business insights. This could be a flagship store, tourist location, or have unique characteristics that explain the performance."
  },
  {
    id: "concept_03",
    domain: "data_literacy",
    difficulty: 1,
    stem: "You're working with a customer database for a subscription service. You notice that 15% of customer records have missing email addresses, some phone numbers are in different formats, and birth dates include impossible values like '1990-13-45'. What is the main issue here?",
    type: "mcq",
    options: [
      "The dataset is too small",
      "Data quality problems including missing values, inconsistent formats, and invalid data",
      "The data processing is too slow",
      "The data format is incorrect",
      "I don't know"
    ],
    correct: 1,
    explanation: "This scenario shows classic data quality issues: missing values (emails), inconsistent formats (phone numbers), and invalid data (impossible dates)."
  },
  {
    id: "concept_04",
    domain: "data_literacy",
    difficulty: 2,
    stem: "A marketing team wants to analyze customer feedback. They have two data sources: (1) a CSV file with customer ratings (1-5) and purchase amounts, and (2) thousands of customer review comments like 'Great product, fast shipping!' and 'Terrible experience, will not buy again.' How would you categorize these data types?",
    type: "mcq",
    options: [
      "Both are structured data",
      "CSV file is structured (predefined format), review comments are unstructured (free-form text)",
      "Both are unstructured data",
      "The CSV is unstructured, reviews are structured",
      "I don't know"
    ],
    correct: 1,
    explanation: "Structured data has a predefined schema (CSV with specific columns), while unstructured data (review text) has no fixed format and requires different analysis techniques."
  },
  {
    id: "concept_05",
    domain: "data_literacy",
    difficulty: 3,
    stem: "A healthcare company wants to analyze patient satisfaction using data from their appointment booking system. The booking system was designed to track appointment scheduling, not patient satisfaction. What is the main concern with using this data?",
    type: "mcq",
    options: [
      "The data will be too large to analyze",
      "The data may not capture what you need to measure (satisfaction) and could be biased toward certain patient types",
      "The data will be too expensive to access",
      "The data will be outdated",
      "I don't know"
    ],
    correct: 1,
    explanation: "Data collected for one purpose (scheduling) may not be suitable for another (satisfaction analysis) and could have systematic biases that affect your conclusions."
  },
  {
    id: "concept_06",
    domain: "data_literacy",
    difficulty: 1,
    stem: "What is the main purpose of data validation?",
    type: "mcq",
    options: [
      "To make data look better",
      "To ensure data meets quality standards and business rules",
      "To speed up processing",
      "To reduce storage costs",
      "I don't know"
    ],
    correct: 1,
    explanation: "Data validation ensures data is accurate, complete, and follows expected formats."
  },
  {
    id: "concept_07",
    domain: "data_literacy",
    difficulty: 2,
    stem: "What is the primary concern when dealing with missing data?",
    type: "mcq",
    options: [
      "It slows down processing",
      "It may introduce bias or affect analysis validity",
      "It takes up too much storage",
      "It's difficult to visualize",
      "I don't know"
    ],
    correct: 1,
    explanation: "Missing data can bias results and affect the validity of conclusions."
  },
  {
    id: "concept_08",
    domain: "data_literacy",
    difficulty: 3,
    stem: "What is the difference between data and information?",
    type: "mcq",
    options: [
      "Data is always numerical",
      "Information is data that has been processed and given context",
      "Data is always more accurate",
      "There is no difference",
      "I don't know"
    ],
    correct: 1,
    explanation: "Data are raw facts; information is data that has been processed and contextualized."
  },
  {
    id: "concept_09",
    domain: "data_literacy",
    difficulty: 2,
    stem: "What is the primary purpose of data profiling?",
    type: "mcq",
    options: [
      "To make data more secure",
      "To understand data characteristics, quality, and structure",
      "To reduce file sizes",
      "To create backups",
      "I don't know"
    ],
    correct: 1,
    explanation: "Data profiling helps understand what you're working with before analysis."
  },
  {
    id: "concept_10",
    domain: "data_literacy",
    difficulty: 1,
    stem: "What does 'data lineage' refer to?",
    type: "mcq",
    options: [
      "The age of the data",
      "The path data takes from source to final use",
      "The size of the dataset",
      "The format of the data",
      "I don't know"
    ],
    correct: 1,
    explanation: "Data lineage tracks how data flows and transforms through systems."

  },

  // STATISTICS & PROBABILITY CONCEPTS (10 questions)
  {
    id: "concept_11",
    domain: "stats",
    difficulty: 1,
    stem: "You're analyzing the salaries of 100 employees at a tech company. The salaries range from $40,000 to $200,000, with most employees earning between $60,000-$80,000. What does the mean salary tell you?",
    type: "mcq",
    options: [
      "The most common salary amount",
      "The average salary across all employees",
      "The middle salary when sorted from lowest to highest",
      "The difference between highest and lowest salary",
      "I don't know"
    ],
    correct: 1,
    explanation: "The mean is the arithmetic average of all salaries, giving you the typical salary when all amounts are summed and divided by the number of employees."
  },
  {
    id: "concept_12",
    domain: "stats",
    difficulty: 2,
    stem: "You're analyzing household income in a neighborhood. Most families earn $50,000-$70,000, but there are a few families earning over $500,000. The mean income is $85,000, but the median is $62,000. Which measure better represents the typical family income?",
    type: "mcq",
    options: [
      "The mean, because it includes all values",
      "The median, because it's not distorted by the few very high earners",
      "Both are equally representative",
      "Neither, you need more data",
      "I don't know"
    ],
    correct: 1,
    explanation: "The median is less affected by extreme outliers (high earners) and better represents the typical family income in this scenario."
  },
  {
    id: "concept_13",
    domain: "stats",
    difficulty: 1,
    stem: "You're comparing two sales teams. Team A has consistent monthly sales between $45,000-$55,000. Team B's sales vary widely from $20,000 to $80,000. Both teams average $50,000. What statistic would best capture this difference in consistency?",
    type: "mcq",
    options: [
      "The mean sales amount",
      "Standard deviation, which measures how spread out the sales numbers are",
      "The highest sales amount",
      "The total sales amount",
      "I don't know"
    ],
    correct: 1,
    explanation: "Standard deviation measures the spread or variability of data points around the mean, showing how consistent (low deviation) or variable (high deviation) the sales are."
  },
  {
    id: "concept_14",
    domain: "stats",
    difficulty: 2,
    stem: "A study finds a strong correlation between ice cream sales and drowning incidents. Both increase during summer months. A news headline claims 'Ice cream causes drowning!' What's the real issue here?",
    type: "mcq",
    options: [
      "The correlation is wrong",
      "This confuses correlation (both related to summer) with causation (ice cream causing drowning)",
      "The data is unreliable",
      "The study sample was too small",
      "I don't know"
    ],
    correct: 1,
    explanation: "This is a classic example of confusing correlation with causation. Both ice cream sales and drowning increase in summer due to weather, not because one causes the other."
  },
  {
    id: "concept_15",
    domain: "stats",
    difficulty: 3,
    stem: "What is sampling bias?",
    type: "mcq",
    options: [
      "When samples are too small",
      "When the sample doesn't represent the population",
      "When samples are too large",
      "When samples are random",
      "I don't know"
    ],
    correct: 1,
    explanation: "Sampling bias occurs when the sample systematically differs from the population."
  },
  {
    id: "concept_16",
    domain: "stats",
    difficulty: 1,
    stem: "What does a normal distribution look like?",
    type: "mcq",
    options: [
      "A straight line",
      "A bell-shaped curve",
      "A U-shape",
      "A flat line",
      "I don't know"
    ],
    correct: 1,
    explanation: "A normal distribution has a characteristic bell-shaped curve."
  },
  {
    id: "concept_17",
    domain: "stats",
    difficulty: 2,
    stem: "What is the Central Limit Theorem?",
    type: "mcq",
    options: [
      "All data becomes normal with large samples",
      "Sample means approach normal distribution with large samples",
      "All distributions are normal",
      "Small samples are always better",
      "I don't know"
    ],
    correct: 1,
    explanation: "The CLT states that sample means become normally distributed as sample size increases."
  },
  {
    id: "concept_18",
    domain: "stats",
    difficulty: 3,
    stem: "What is the difference between descriptive and inferential statistics?",
    type: "mcq",
    options: [
      "Descriptive is for samples; inferential is for populations",
      "Descriptive summarizes data; inferential makes predictions about populations",
      "Descriptive is qualitative; inferential is quantitative",
      "There is no difference",
      "I don't know"
    ],
    correct: 1,
    explanation: "Descriptive statistics summarize what you have; inferential statistics make conclusions about what you don't have."
  },
  {
    id: "concept_19",
    domain: "stats",
    difficulty: 2,
    stem: "What does a confidence interval tell you?",
    type: "mcq",
    options: [
      "The exact value of a parameter",
      "A range of likely values for a parameter",
      "The probability of an event",
      "The sample size needed",
      "I don't know"
    ],
    correct: 1,
    explanation: "A confidence interval provides a range of values within which the true parameter likely falls."
  },
  {
    id: "concept_20",
    domain: "stats",
    difficulty: 1,
    stem: "What is the difference between a population and a sample?",
    type: "mcq",
    options: [
      "Population is always larger",
      "Population is the entire group; sample is a subset",
      "Sample is always more accurate",
      "There is no difference",
      "I don't know"
    ],
    correct: 1,
    explanation: "Population is the complete set of interest; sample is a representative subset."

  },

  // DATA ANALYSIS CONCEPTS (10 questions)
  {
    id: "concept_21",
    domain: "analysis",
    difficulty: 1,
    stem: "A restaurant chain wants to understand why some locations are more profitable than others. They've given you access to their sales data, customer demographics, and location information. What should you do first?",
    type: "mcq",
    options: [
      "Start creating charts and graphs immediately",
      "Clearly define what 'profitable' means and what specific questions you're trying to answer",
      "Begin cleaning the data right away",
      "Run statistical tests on the raw data",
      "I don't know"
    ],
    correct: 1,
    explanation: "Before any analysis, you need to clearly define the problem: what makes a location 'profitable', what factors to investigate, and what decisions this analysis will inform."
  },
  {
    id: "concept_22",
    domain: "analysis",
    difficulty: 2,
    stem: "You're analyzing customer churn data for a subscription service. You have 6 months of data showing customer sign-ups, usage patterns, and cancellations. What should be your approach to understand why customers are leaving?",
    type: "mcq",
    options: [
      "Immediately build a predictive model",
      "Start with exploratory analysis to understand patterns in the data and generate hypotheses about churn factors",
      "Create a final report with conclusions",
      "Clean all the data first",
      "I don't know"
    ],
    correct: 1,
    explanation: "EDA helps you understand the data structure, identify patterns, and generate hypotheses about what might be causing churn before building models or drawing conclusions."
  },
  {
    id: "concept_23",
    domain: "analysis",
    difficulty: 3,
    stem: "A bank wants to improve their fraud detection. They have two approaches: (1) Train a model using historical data where each transaction is labeled as 'fraud' or 'legitimate', and (2) Analyze transaction patterns to find unusual clusters without knowing which are fraudulent. Which approach is which?",
    type: "mcq",
    options: [
      "Both are supervised learning",
      "Approach 1 is supervised (uses labeled data), Approach 2 is unsupervised (finds patterns without labels)",
      "Both are unsupervised learning",
      "Approach 1 is unsupervised, Approach 2 is supervised",
      "I don't know"
    ],
    correct: 1,
    explanation: "Supervised learning uses labeled data (fraud/legitimate), while unsupervised learning finds patterns in data without knowing the correct answers."
  },
  {
    id: "concept_24",
    domain: "analysis",
    difficulty: 2,
    stem: "You've built a model to predict house prices using 1000 historical sales. The model achieves 98% accuracy on the training data but only 65% accuracy on new house sales. What's happening?",
    type: "mcq",
    options: [
      "The model is too simple",
      "The model is overfitting - it memorized the training data but can't generalize to new data",
      "The training data is too large",
      "The analysis is taking too long",
      "I don't know"
    ],
    correct: 1,
    explanation: "This is classic overfitting - the model learned the training data too well (98% accuracy) but can't generalize to new, unseen data (65% accuracy)."
  },
  {
    id: "concept_25",
    domain: "analysis",
    difficulty: 1,
    stem: "What is the purpose of data segmentation?",
    type: "mcq",
    options: [
      "To reduce file sizes",
      "To divide data into meaningful groups for analysis",
      "To speed up processing",
      "To create backups",
      "I don't know"
    ],
    correct: 1,
    explanation: "Segmentation divides data into groups with similar characteristics for targeted analysis."
  },
  {
    id: "concept_26",
    domain: "analysis",
    difficulty: 3,
    stem: "What is the curse of dimensionality?",
    type: "mcq",
    options: [
      "When datasets are too small",
      "When high-dimensional data becomes sparse and analysis becomes difficult",
      "When data is too old",
      "When analysis is too complex",
      "I don't know"
    ],
    correct: 1,
    explanation: "As dimensions increase, data becomes sparse and distances between points become similar."
  },
  {
    id: "concept_27",
    domain: "analysis",
    difficulty: 2,
    stem: "What is the difference between accuracy and precision?",
    type: "mcq",
    options: [
      "Accuracy is faster",
      "Accuracy is correctness; precision is consistency",
      "Precision is more important",
      "There is no difference",
      "I don't know"
    ],
    correct: 1,
    explanation: "Accuracy measures how close to the truth; precision measures consistency of results."
  },
  {
    id: "concept_28",
    domain: "analysis",
    difficulty: 1,
    stem: "What is the purpose of feature engineering?",
    type: "mcq",
    options: [
      "To reduce data size",
      "To create new variables that improve model performance",
      "To speed up analysis",
      "To create visualizations",
      "I don't know"
    ],
    correct: 1,
    explanation: "Feature engineering creates new variables from existing data to improve analysis."
  },
  {
    id: "concept_29",
    domain: "analysis",
    difficulty: 3,
    stem: "What is cross-validation used for?",
    type: "mcq",
    options: [
      "To clean data",
      "To assess how well a model will generalize to new data",
      "To speed up training",
      "To reduce overfitting",
      "I don't know"
    ],
    correct: 1,
    explanation: "Cross-validation tests model performance on unseen data to estimate generalization ability."
  },
  {
    id: "concept_30",
    domain: "analysis",
    difficulty: 2,
    stem: "What is the difference between classification and regression?",
    type: "mcq",
    options: [
      "Classification is faster",
      "Classification predicts categories; regression predicts continuous values",
      "Regression is more accurate",
      "There is no difference",
      "I don't know"
    ],
    correct: 1,
    explanation: "Classification predicts discrete categories; regression predicts continuous numerical values."

  },

  // VISUALIZATION CONCEPTS (10 questions)
  {
    id: "concept_31",
    domain: "viz",
    difficulty: 1,
    stem: "You've analyzed quarterly sales data and discovered that Q4 sales are consistently 40% higher than other quarters. You need to present this finding to the executive team. What's the best approach?",
    type: "mcq",
    options: [
      "Create the most colorful chart possible",
      "Use clear, simple visualizations that effectively communicate the seasonal pattern and its business implications",
      "Compress the data to save space",
      "Skip visualization and just show the numbers",
      "I don't know"
    ],
    correct: 1,
    explanation: "The primary purpose of data visualization is to communicate insights clearly and effectively to your audience, helping them understand patterns and make decisions."
  },
  {
    id: "concept_32",
    domain: "viz",
    difficulty: 2,
    stem: "You need to present data to show: (1) Sales by product category for this month, and (2) Monthly sales trends over the past year. Which chart types should you use?",
    type: "mcq",
    options: [
      "Line charts for both",
      "Bar chart for product categories (comparing categories), line chart for monthly trends (showing change over time)",
      "Bar charts for both",
      "Pie charts for both",
      "I don't know"
    ],
    correct: 1,
    explanation: "Bar charts are best for comparing categories (product sales), while line charts effectively show trends and changes over time (monthly sales progression)."
  },
  {
    id: "concept_33",
    domain: "viz",
    difficulty: 1,
    stem: "What is the main problem with using too many colors in a chart?",
    type: "mcq",
    options: [
      "It's slower to load",
      "It can confuse the audience and reduce clarity",
      "It uses more memory",
      "It's harder to print",
      "I don't know"
    ],
    correct: 1,
    explanation: "Too many colors can overwhelm viewers and make charts harder to interpret."
  },
  {
    id: "concept_34",
    domain: "viz",
    difficulty: 3,
    stem: "What is the main issue with truncated y-axes in bar charts?",
    type: "mcq",
    options: [
      "They load slower",
      "They can mislead viewers about the magnitude of differences",
      "They use more colors",
      "They're harder to read",
      "I don't know"
    ],
    correct: 1,
    explanation: "Truncated axes can make small differences appear much larger than they actually are."
  },
  {
    id: "concept_35",
    domain: "viz",
    difficulty: 2,
    stem: "What is the purpose of a scatter plot?",
    type: "mcq",
    options: [
      "To show trends over time",
      "To show relationships between two variables",
      "To compare categories",
      "To show distributions",
      "I don't know"
    ],
    correct: 1,
    explanation: "Scatter plots reveal relationships and correlations between two continuous variables."
  },
  {
    id: "concept_36",
    domain: "viz",
    difficulty: 1,
    stem: "What makes a good chart title?",
    type: "mcq",
    options: [
      "It's short",
      "It clearly describes what the chart shows",
      "It's colorful",
      "It's in large font",
      "I don't know"
    ],
    correct: 1,
    explanation: "A good title clearly communicates the chart's main message or finding."
  },
  {
    id: "concept_37",
    domain: "viz",
    difficulty: 3,
    stem: "What is the main problem with 3D charts?",
    type: "mcq",
    options: [
      "They're too colorful",
      "They can distort data perception and make accurate comparison difficult",
      "They load slowly",
      "They're hard to print",
      "I don't know"
    ],
    correct: 1,
    explanation: "3D effects can distort visual perception and make accurate data comparison difficult."
  },
  {
    id: "concept_38",
    domain: "viz",
    difficulty: 2,
    stem: "When should you use a pie chart?",
    type: "mcq",
    options: [
      "For any categorical data",
      "For showing parts of a whole with few categories",
      "For time series data",
      "For continuous data",
      "I don't know"
    ],
    correct: 1,
    explanation: "Pie charts work best for showing proportions of a whole with a small number of categories."
  },
  {
    id: "concept_39",
    domain: "viz",
    difficulty: 1,
    stem: "What is the purpose of axis labels in charts?",
    type: "mcq",
    options: [
      "To make charts look professional",
      "To clearly identify what each axis represents",
      "To add color",
      "To fill space",
      "I don't know"
    ],
    correct: 1,
    explanation: "Axis labels help viewers understand what each axis represents and the scale being used."
  },
  {
    id: "concept_40",
    domain: "viz",
    difficulty: 2,
    stem: "What is the main principle of effective data visualization?",
    type: "mcq",
    options: [
      "Use as many colors as possible",
      "Clarity and simplicity in communicating the message",
      "Make charts as large as possible",
      "Use 3D effects",
      "I don't know"
    ],
    correct: 1,
    explanation: "Effective visualization prioritizes clear, simple communication of the data's message."

  },

  // ETHICS & PRIVACY CONCEPTS (10 questions)
  {
    id: "concept_41",
    domain: "ethics",
    difficulty: 1,
    stem: "A healthcare app collects user data including names, email addresses, birth dates, and health symptoms. The company wants to share this data with researchers. Which of these would be considered personally identifiable information (PII)?",
    type: "mcq",
    options: [
      "Only the health symptoms",
      "Names, email addresses, and birth dates - information that can identify specific individuals",
      "Only names and addresses",
      "Only financial information",
      "I don't know"
    ],
    correct: 1,
    explanation: "PII includes any information that can be used to identify a specific individual, such as names, email addresses, and birth dates. Health symptoms alone might not be identifiable."
  },
  {
    id: "concept_42",
    domain: "ethics",
    difficulty: 2,
    stem: "What is the primary purpose of data anonymization?",
    type: "mcq",
    options: [
      "To make data smaller",
      "To protect individual privacy while preserving data utility",
      "To speed up processing",
      "To reduce storage costs",
      "I don't know"
    ],
    correct: 1,
    explanation: "Anonymization removes identifying information while keeping data useful for analysis."
  },
  {
    id: "concept_43",
    domain: "ethics",
    difficulty: 3,
    stem: "A company uses an AI system to screen job applications. The system was trained on historical hiring data and consistently rejects applications from certain demographic groups, even when they're qualified. What is this an example of?",
    type: "mcq",
    options: [
      "The algorithm is too slow",
      "Algorithmic bias - the system learned and perpetuates unfair discrimination from historical data",
      "The algorithm uses too much memory",
      "The algorithm is too complex",
      "I don't know"
    ],
    correct: 1,
    explanation: "This is algorithmic bias - the AI system learned discriminatory patterns from historical hiring data and now systematically produces unfair outcomes for certain groups."
  },
  {
    id: "concept_44",
    domain: "ethics",
    difficulty: 2,
    stem: "What is informed consent in data collection?",
    type: "mcq",
    options: [
      "Getting permission after collecting data",
      "Getting clear permission with full understanding of data use",
      "Getting verbal permission only",
      "Getting permission from family members",
      "I don't know"
    ],
    correct: 1,
    explanation: "Informed consent requires clear understanding of how data will be used before collection."
  },
  {
    id: "concept_45",
    domain: "ethics",
    difficulty: 1,
    stem: "What is the main concern with data aggregation?",
    type: "mcq",
    options: [
      "It's too slow",
      "It might still reveal individual information",
      "It uses too much storage",
      "It's too expensive",
      "I don't know"
    ],
    correct: 1,
    explanation: "Even aggregated data can sometimes be used to identify individuals."
  },
  {
    id: "concept_46",
    domain: "ethics",
    difficulty: 3,
    stem: "What is the difference between privacy and confidentiality?",
    type: "mcq",
    options: [
      "They are the same",
      "Privacy is about control over personal information; confidentiality is about protecting shared information",
      "Privacy is about data security",
      "Confidentiality is about data quality",
      "I don't know"
    ],
    correct: 1,
    explanation: "Privacy concerns individual control; confidentiality concerns protecting shared information."
  },
  {
    id: "concept_47",
    domain: "ethics",
    difficulty: 2,
    stem: "What should you do if you discover bias in your analysis?",
    type: "mcq",
    options: [
      "Ignore it if results are otherwise good",
      "Document it and investigate its impact",
      "Hide it from stakeholders",
      "Continue with the analysis",
      "I don't know"
    ],
    correct: 1,
    explanation: "Bias should be documented, investigated, and addressed transparently."
  },
  {
    id: "concept_48",
    domain: "ethics",
    difficulty: 1,
    stem: "What is data minimization?",
    type: "mcq",
    options: [
      "Making data files smaller",
      "Collecting only the data necessary for the stated purpose",
      "Reducing data processing time",
      "Using fewer variables",
      "I don't know"
    ],
    correct: 1,
    explanation: "Data minimization means collecting only what's necessary for the stated purpose."
  },
  {
    id: "concept_49",
    domain: "ethics",
    difficulty: 3,
    stem: "What is the main risk of data re-identification?",
    type: "mcq",
    options: [
      "Slower processing",
      "Privacy violations and loss of anonymity",
      "Higher storage costs",
      "More complex analysis",
      "I don't know"
    ],
    correct: 1,
    explanation: "Re-identification can compromise privacy and violate anonymity promises."
  },
  {
    id: "concept_50",
    domain: "ethics",
    difficulty: 2,
    stem: "What is the primary responsibility of a data analyst regarding ethical considerations?",
    type: "mcq",
    options: [
      "To complete analysis quickly",
      "To ensure analysis is fair, transparent, and respects privacy",
      "To use the most advanced techniques",
      "To minimize costs",
      "I don't know"
    ],
    correct: 1,
    explanation: "Analysts must ensure their work is ethical, fair, transparent, and respects privacy rights."
  }
];

// Domain weights for conceptual assessment
export const conceptualDomainWeights = {
  data_literacy: 0.20,
  stats: 0.20,
  analysis: 0.20,
  viz: 0.20,
  ethics: 0.20
};

export default conceptualItems;
