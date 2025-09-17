// Conceptual Item Pool for Data Analysis Baseline Assessment
// 50 questions focused on concepts and abstractions, not technical implementation

export const conceptualItems = [
  // DATA LITERACY & CONCEPTS (10 questions)
  {
    id: "concept_01",
    domain: "data_literacy",
    difficulty: 1,
    stem: "What is the primary purpose of data exploration in the early stages of analysis?",
    type: "mcq",
    options: [
      "To prove a hypothesis",
      "To understand patterns and relationships in the data",
      "To create visualizations",
      "To clean the data",
      "I don't know"
    ],
    correct: 1,
    explanation: "Data exploration helps analysts understand what the data contains before making any conclusions."
  },
  {
    id: "concept_02",
    domain: "data_literacy",
    difficulty: 2,
    stem: "When you discover outliers in your dataset, what should be your first approach?",
    type: "mcq",
    options: [
      "Remove them immediately",
      "Investigate their cause and context",
      "Replace them with the mean",
      "Ignore them completely",
      "I don't know"
    ],
    correct: 1,
    explanation: "Outliers might be errors or important insights - understanding their context is crucial."
  },
  {
    id: "concept_03",
    domain: "data_literacy",
    difficulty: 1,
    stem: "What does 'data quality' primarily refer to?",
    type: "mcq",
    options: [
      "The size of the dataset",
      "The accuracy, completeness, and reliability of data",
      "The speed of data processing",
      "The format of the data",
      "I don't know"
    ],
    correct: 1,
    explanation: "Data quality encompasses accuracy, completeness, consistency, and reliability."
  },
  {
    id: "concept_04",
    domain: "data_literacy",
    difficulty: 2,
    stem: "What is the main difference between structured and unstructured data?",
    type: "mcq",
    options: [
      "Structured data is always larger",
      "Structured data has a predefined format; unstructured data doesn't",
      "Structured data is always more accurate",
      "There is no difference",
      "I don't know"
    ],
    correct: 1,
    explanation: "Structured data follows a schema (like databases), while unstructured data (like text) doesn't."
  },
  {
    id: "concept_05",
    domain: "data_literacy",
    difficulty: 3,
    stem: "What is the primary risk of using data that was collected for a different purpose?",
    type: "mcq",
    options: [
      "It will be too large to process",
      "It may not be suitable for your research question",
      "It will be too expensive",
      "It will be outdated",
      "I don't know"
    ],
    correct: 1,
    explanation: "Data collected for one purpose may have biases or limitations that make it inappropriate for other uses."
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
    stem: "What does the mean tell you about a dataset?",
    type: "mcq",
    options: [
      "The most common value",
      "The average value",
      "The middle value when sorted",
      "The range of values",
      "I don't know"
    ],
    correct: 1,
    explanation: "The mean is the arithmetic average of all values in the dataset."
  },
  {
    id: "concept_12",
    domain: "stats",
    difficulty: 2,
    stem: "When would you use the median instead of the mean?",
    type: "mcq",
    options: [
      "When you have a small dataset",
      "When your data has extreme outliers",
      "When you have categorical data",
      "When you need faster calculations",
      "I don't know"
    ],
    correct: 1,
    explanation: "The median is less affected by outliers than the mean."
  },
  {
    id: "concept_13",
    domain: "stats",
    difficulty: 1,
    stem: "What does standard deviation measure?",
    type: "mcq",
    options: [
      "The average value",
      "How spread out the data points are",
      "The most common value",
      "The range of the data",
      "I don't know"
    ],
    correct: 1,
    explanation: "Standard deviation measures the average distance of data points from the mean."
  },
  {
    id: "concept_14",
    domain: "stats",
    difficulty: 2,
    stem: "What is the difference between correlation and causation?",
    type: "mcq",
    options: [
      "They are the same thing",
      "Correlation shows relationship; causation shows one causes the other",
      "Correlation is stronger than causation",
      "Causation is easier to prove",
      "I don't know"
    ],
    correct: 1,
    explanation: "Correlation indicates a relationship; causation means one variable directly causes another."
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
    stem: "What is the first step in any data analysis project?",
    type: "mcq",
    options: [
      "Create visualizations",
      "Define the problem and objectives",
      "Clean the data",
      "Run statistical tests",
      "I don't know"
    ],
    correct: 1,
    explanation: "Clearly defining the problem and objectives guides all subsequent analysis steps."
  },
  {
    id: "concept_22",
    domain: "analysis",
    difficulty: 2,
    stem: "What is the purpose of exploratory data analysis (EDA)?",
    type: "mcq",
    options: [
      "To prove hypotheses",
      "To understand data patterns and generate hypotheses",
      "To create final reports",
      "To clean data",
      "I don't know"
    ],
    correct: 1,
    explanation: "EDA helps understand data characteristics and identify patterns that might lead to hypotheses."
  },
  {
    id: "concept_23",
    domain: "analysis",
    difficulty: 3,
    stem: "What is the difference between supervised and unsupervised learning?",
    type: "mcq",
    options: [
      "Supervised is faster",
      "Supervised uses labeled data; unsupervised finds patterns without labels",
      "Unsupervised is more accurate",
      "There is no difference",
      "I don't know"
    ],
    correct: 1,
    explanation: "Supervised learning uses known outcomes to train models; unsupervised learning finds hidden patterns."
  },
  {
    id: "concept_24",
    domain: "analysis",
    difficulty: 2,
    stem: "What is overfitting in data analysis?",
    type: "mcq",
    options: [
      "When models are too simple",
      "When models perform well on training data but poorly on new data",
      "When data is too large",
      "When analysis takes too long",
      "I don't know"
    ],
    correct: 1,
    explanation: "Overfitting occurs when a model learns training data too well and fails to generalize."
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
    stem: "What is the primary purpose of data visualization?",
    type: "mcq",
    options: [
      "To make data look pretty",
      "To communicate insights and patterns effectively",
      "To reduce data size",
      "To speed up analysis",
      "I don't know"
    ],
    correct: 1,
    explanation: "Visualization helps communicate data insights and patterns to audiences effectively."
  },
  {
    id: "concept_32",
    domain: "viz",
    difficulty: 2,
    stem: "When should you use a bar chart versus a line chart?",
    type: "mcq",
    options: [
      "Bar charts are always better",
      "Bar charts for categories; line charts for trends over time",
      "Line charts are always better",
      "It doesn't matter",
      "I don't know"
    ],
    correct: 1,
    explanation: "Bar charts compare categories; line charts show trends and changes over time."
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
    stem: "What is personally identifiable information (PII)?",
    type: "mcq",
    options: [
      "Any data about people",
      "Information that can identify a specific individual",
      "Only names and addresses",
      "Only financial data",
      "I don't know"
    ],
    correct: 1,
    explanation: "PII is any information that can be used to identify a specific individual."
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
    stem: "What is algorithmic bias?",
    type: "mcq",
    options: [
      "When algorithms are too slow",
      "When algorithms produce systematically prejudiced results",
      "When algorithms use too much memory",
      "When algorithms are too complex",
      "I don't know"
    ],
    correct: 1,
    explanation: "Algorithmic bias occurs when systems produce systematically unfair or prejudiced outcomes."
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
