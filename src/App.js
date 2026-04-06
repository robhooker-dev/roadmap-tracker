import { useState, useEffect, useCallback } from "react";

const PHASES = [
  {
    id: "phase1", label: "Phase 1", title: "Foundations", months: "Months 1–3", color: "#1a4a7a",
    milestone: "Deploy a LangChain-powered chatbot using the Anthropic API that reads from a structured data source and returns formatted responses — published to GitHub with a README.",
    roleRelevance: "Establishes the Python and API fluency that underpins all Palantir AIP scripting and Quantexa pipeline work. Prompt engineering is a day-one requirement in NCA and BAE Systems AI tool evaluation and deployment roles.",
    sections: [
      { title: "AI Fundamentals", weeks: 1, items: [
        { label: "📚 Elements of AI (University of Helsinki — free, certificate)", cost: "free", topics: ["What is AI — history, definitions, and scope", "Machine learning basics in plain English", "Neural networks and deep learning concepts", "AI applications — real-world use cases", "AI ethics and societal implications"] },
        { label: "📚 Generative AI for Beginners (Microsoft — free, 18 lessons)", cost: "free", topics: ["How large language models work", "Prompt engineering basics", "Building generative AI applications", "Responsible AI principles"] },
        { label: "📚 Introduction to Generative AI (Google Cloud Skills Boost — free)", cost: "free", topics: ["Generative AI vs traditional AI — key differences", "How generative models are trained and used", "Google's GenAI tools and use cases"] },
      ]},
      { title: "Python", weeks: 4, items: [
        { label: "📚 Programming for Everybody — Getting Started with Python (Coursera)", cost: "medium", topics: ["Data types, variables, loops, conditionals, functions", "Virtual environments, pip, requirements.txt"] },
        { label: "📚 Python Data Structures (Coursera)", cost: "medium", topics: ["OOP basics — classes, methods, inheritance"] },
        { label: "📚 Using Python to Access Web Data (Coursera)", cost: "medium", topics: ["File I/O, working with JSON, error handling"] },
        { label: "📚 Using Databases with Python (Coursera)", cost: "medium", topics: [] },
        { label: "📚 Capstone — Retrieving, Processing & Visualising Data with Python (Coursera)", cost: "medium", topics: [] },
      ]},
      { title: "VS Code", weeks: 1, items: [
        { label: "📚 Visual Studio Code Crash Course (freeCodeCamp — YouTube, free)", cost: "free", topics: ["Interface and navigation — explorer, editor groups, command palette", "Extensions — Python, Pylance, GitLens, GitHub Copilot setup", "Integrated terminal and Git integration", "Debugging — breakpoints, watch variables, debug console", "Keyboard shortcuts and workspace productivity tips"] },
      ]},
      { title: "Prompt Engineering", weeks: 1, items: [
        { label: "📚 ChatGPT Prompt Engineering for Developers (DeepLearning.AI — free)", cost: "free", topics: ["Zero-shot, few-shot, chain-of-thought prompting", "System prompts and role definition", "Structured output (JSON mode)", "Prompt chaining and iterative refinement"] },
        { label: "📚 Anthropic Prompt Engineering Interactive Tutorial (Anthropic docs — free)", cost: "free", topics: ["Anthropic-specific guidance — Constitutional AI"] },
      ]},
      { title: "API Usage", weeks: 1, items: [
        { label: "📚 Building Systems with the ChatGPT API (DeepLearning.AI — free)", cost: "free", topics: ["REST API concepts — requests, responses, headers, auth", "Anthropic API — messages endpoint", "Handling rate limits and errors", "Streaming responses", "Managing conversation history / context windows"] },
      ]},
      { title: "LangChain", weeks: 1, items: [
        { label: "📚 LangChain for LLM Application Development (DeepLearning.AI — free)", cost: "free", topics: ["Chains — basic sequential chains", "Prompt templates", "Memory — conversation buffer, summary memory"] },
        { label: "📚 LangChain: Chat with Your Data (DeepLearning.AI — free)", cost: "free", topics: ["Agents and tools", "Document loaders and text splitters"] },
      ]},
      { title: "Applied Probability & Statistics", weeks: 1, items: [
        { label: "📅 Scheduled week: probability and statistics for ML", cost: null, topics: ["Probability basics — events, Bayes' theorem, conditional probability", "Distributions — normal, binomial, Poisson", "Descriptive statistics — mean, variance, standard deviation", "Hypothesis testing and p-values"] },
      ]},
    ],
  },
  {
    id: "phase2", label: "Phase 2", title: "Backend & Data", months: "Months 3–6", color: "#1e6b4a",
    milestone: "Build and deploy a full-stack REST API with JWT authentication, a PostgreSQL database, Docker containerisation, and an automated CI/CD pipeline via GitHub Actions — live on Azure.",
    roleRelevance: "Backend and data engineering are core to Palantir Foundry integration (API-driven pipelines, SQL-heavy ontology building) and Quantexa deployments (data ingestion, entity resolution). NCA and BAE Systems roles require secure API development and server deployment knowledge.",
    sections: [
      { title: "Node.js & Express", weeks: 2, items: [
        { label: "📚 The Complete Node.js Developer Course (Udemy — Andrew Mead)", cost: "low", topics: ["JavaScript fundamentals — async/await, promises, modules", "Building REST APIs with Express", "Middleware, routing, error handling", "Authentication — JWT, sessions", "Environment variables and secrets management"] },
      ]},
      { title: "Databases & SQL", weeks: 3, items: [
        { label: "📚 The Complete SQL Bootcamp (Udemy — Jose Portilla)", cost: "low", topics: ["SQL fundamentals — SELECT, JOIN, GROUP BY, indexes", "Subqueries, CTEs, and window functions", "Stored procedures and triggers", "Query optimisation and execution plans", "Transactions and ACID properties"] },
        { label: "📚 PostgreSQL for Everybody (Coursera — Dr. Chuck)", cost: "medium", topics: ["PostgreSQL — setup, querying, schema design", "Supabase — hosted Postgres, auth, row-level security", "Data modelling — relational design, normalisation"] },
      ]},
      { title: "Authentication & Security", weeks: 1, items: [
        { label: "📚 Web Application Security — OWASP Top 10 (OWASP.org — free)", cost: "free", topics: ["OAuth 2.0 concepts", "Supabase Auth or Auth0", "Role-based access control (RBAC)", "Securing API endpoints"] },
      ]},
      { title: "Deployment & DevOps", weeks: 2, items: [
        { label: "📚 Docker & Kubernetes: The Practical Guide (Udemy — Maximilian Schwarzmüller)", cost: "low", topics: ["Docker — containers, images, docker-compose", "Environment management — dev/staging/prod", "Azure cloud basics"] },
        { label: "📚 GitHub Actions — The Complete Guide (Udemy)", cost: "low", topics: ["CI/CD — GitHub Actions"] },
      ]},
      { title: "IT Networking", weeks: 1, items: [
        { label: "📚 Google IT Support Professional Certificate (Coursera)", cost: "medium", topics: ["OSI model and TCP/IP stack", "IP addressing, subnetting, CIDR notation", "DNS, DHCP, HTTP/HTTPS, SSH protocols", "Firewalls, VPNs, network security basics"] },
        { label: "📚 Professor Messer's CompTIA Network+ (YouTube — free)", cost: "free", topics: ["Network troubleshooting — ping, tracert, nslookup, netstat"] },
      ]},
      { title: "Scripting (Bash & PowerShell)", weeks: 1, items: [
        { label: "📚 The Linux Command Line Bootcamp (Udemy — Colt Steele)", cost: "low", topics: ["Bash — variables, loops, conditionals, functions", "File management scripts — copying, moving, archiving", "Scheduled tasks and cron job basics"] },
        { label: "📚 PowerShell Master Class (Udemy — John Savill)", cost: "low", topics: ["PowerShell — cmdlets, pipelines, scripts", "Automation scripts for system tasks"] },
      ]},
      { title: "Linux & Windows Servers", weeks: 1, items: [
        { label: "📚 The Linux Command Line Bootcamp (Udemy — Colt Steele)", cost: "low", topics: ["Linux command line — navigation, permissions, file management", "User and process management, services (systemd)", "Logs, monitoring, and basic troubleshooting"] },
        { label: "📚 Windows Server Administration (Microsoft Learn — free)", cost: "free", topics: ["Windows Server basics — Active Directory, Group Policy", "SSH, remote desktop, and server hardening basics"] },
      ]},
      { title: "Developer Tools", weeks: 1, items: [
        { label: "📚 Git & GitHub — The Complete Guide (Udemy — Maximilian Schwarzmüller)", cost: "low", topics: ["Git advanced — branching strategies, rebasing, stashing", "VS Code — extensions, debugging, keyboard shortcuts", "Postman / Insomnia for API testing", "Browser DevTools — network tab, console, performance", "Terminal productivity — aliases, dotfiles, shell customisation"] },
      ]},
      { title: "Application Development Skills", weeks: 2, items: [
        { label: "📚 Software Design & Architecture Specialization (Coursera — University of Alberta)", cost: "medium", topics: ["Software design patterns — MVC, repository, factory", "SOLID principles", "Unit testing, integration testing, TDD basics", "Code review practices and standards", "API design — RESTful conventions, versioning, documentation"] },
      ]},
    ],
  },
  {
    id: "phase3", label: "Phase 3", title: "AI Engineering Core", months: "Months 6–11", color: "#6b3a1e",
    milestone: "Build a working RAG pipeline that ingests a document set, stores embeddings in a vector database, and answers questions with cited sources — with a multi-step LangGraph agent layer and a LangSmith observability dashboard.",
    roleRelevance: "The core differentiator for all four target roles — RAG pipelines and agent systems are central to Palantir AIP and Quantexa's AI layer. LLM Ops and evaluation skills are directly applicable to NCA's responsible AI deployment requirements and BAE Systems AI integration programmes.",
    sections: [
      { title: "CompSci Algorithms & Data Structures", weeks: 3, items: [
        { label: "📚 CS50: Introduction to Computer Science (Harvard/edX — free)", cost: "free", topics: ["Big O notation — time and space complexity", "Data structures — arrays, linked lists, stacks, queues", "Sorting algorithms — merge sort, quick sort, binary search"] },
        { label: "📚 Algorithms Specialization (Coursera — Stanford)", cost: "medium", topics: ["Trees and graphs — traversal, BFS, DFS", "Dynamic programming basics"] },
      ]},
      { title: "Applied Linear Algebra", weeks: 1, items: [
        { label: "✅ Vectors and matrices checkpoint", cost: null, topics: ["Vectors — dot product, norms, cosine similarity", "Matrices — multiplication, transpose, inverse", "Eigenvalues and eigenvectors", "Applications to embeddings and neural networks"] },
      ]},
      { title: "Transformer Architecture & Attention", weeks: 2, items: [
        { label: "✅ Attention mechanism", cost: null, topics: ["Self-attention — query, key, value", "Multi-head attention", "Positional encoding"] },
        { label: "📄 Attention Is All You Need (Vaswani et al., 2017 — free)", cost: "free", topics: ["Original transformer paper"] },
        { label: "📖 The Illustrated Transformer (Jay Alammar — free)", cost: "free", topics: ["Visual walkthrough of transformer internals"] },
        { label: "📺 Intro to Large Language Models (Andrej Karpathy — YouTube, free)", cost: "free", topics: ["How LLMs are trained and how they work internally", "Tokens, context windows, and next-token prediction", "RLHF, scaling laws, and emergent capabilities", "Practical mental model for LLM behaviour"] },
      ]},
      { title: "RAG — Retrieval Augmented Generation", weeks: 3, items: [
        { label: "📚 Vector Databases: From Embeddings to Applications (DeepLearning.AI — free)", cost: "free", topics: ["Embeddings and vector representations", "Vector databases — Pinecone, Chroma, pgvector"] },
        { label: "📚 Building & Evaluating Advanced RAG (DeepLearning.AI — free)", cost: "free", topics: ["Chunking strategies for documents", "Retrieval pipelines — similarity search, hybrid search", "Build a document Q&A system"] },
      ]},
      { title: "Agents & Agentic Systems", weeks: 4, items: [
        { label: "📚 Functions, Tools and Agents with LangChain (DeepLearning.AI — free)", cost: "free", topics: ["Tool use / function calling", "ReAct pattern — reasoning + acting"] },
        { label: "📚 Safe and Reliable AI via Guardrails (DeepLearning.AI — free)", cost: "free", topics: ["Guardrails and output safety — validation, refusals, content filtering"] },
        { label: "📚 AI Agents in LangGraph (DeepLearning.AI — free)", cost: "free", topics: ["LangGraph — agent orchestration", "Multi-step agent workflows"] },
        { label: "📚 Multi AI Agent Systems with crewAI (DeepLearning.AI — free)", cost: "free", topics: ["Human-in-the-loop design"] },
        { label: "📚 Agent Memory: Building Memory-Aware Agents (DeepLearning.AI — free)", cost: "free", topics: [] },
      ]},
      { title: "LLM Ops", weeks: 3, items: [
        { label: "📚 LLMOps (DeepLearning.AI — free)", cost: "free", topics: ["Prompt versioning and management — tracking prompt changes alongside model versions", "Cost management and token optimisation", "Fine-tuning concepts"] },
        { label: "📚 Evaluating and Debugging Generative AI (DeepLearning.AI — free)", cost: "free", topics: ["Evaluation — measuring LLM output quality", "Logging and observability — LangSmith"] },
        { label: "📚 LLM Evaluation — Evidently AI (Evidently AI — free)", cost: "free", topics: ["Production monitoring — failure detection, latency alerts, quality regression dashboards"] },
      ]},
      { title: "Structured Outputs & Data Extraction", weeks: 2, items: [
        { label: "Getting reliable JSON from LLMs", cost: null, topics: [] },
        { label: "Pydantic for output validation", cost: null, topics: [] },
        { label: "Entity extraction pipelines", cost: null, topics: [] },
        { label: "End-to-end extraction workflows", cost: null, topics: [] },
      ]},
    ],
  },
  {
    id: "phase4", label: "Phase 4", title: "Domain Specialisation", months: "Months 11–15", color: "#5a1e6b",
    milestone: "Complete the Machine Learning Specialization (Andrew Ng) certificate and publish a documented Kaggle notebook with a full ML pipeline — feature engineering, model training, and evaluation metrics — on a real policing or financial crime dataset.",
    roleRelevance: "Directly maps to role-specific tooling — graph and network analysis mirrors Quantexa's entity resolution engine; ML fundamentals underpin Palantir's model deployment workflows; AI safety and governance is a hard requirement for NCA and BAE Systems in regulated, high-stakes AI contexts.",
    sections: [
      { title: "Data & Analytics", weeks: 2, items: [
        { label: "📚 Pandas & Data Visualisation (Kaggle Learn — free)", cost: "free", topics: ["Pandas — DataFrames, filtering, grouping, merging", "NumPy basics — arrays, numerical operations", "Data visualisation — Matplotlib, Plotly"] },
        { label: "📚 Data Analysis with Python (Coursera — IBM)", cost: "medium", topics: ["Working with unstructured data — PDFs, emails, documents"] },
      ]},
      { title: "Graph & Network Analysis", weeks: 2, items: [
        { label: "📚 Applied Social Network Analysis in Python (Coursera — University of Michigan)", cost: "medium", topics: ["Graph theory basics — nodes, edges, paths, centrality", "NetworkX — Python graph library", "Entity resolution — record linkage, deduplication", "Knowledge graphs — Neo4j intro"] },
      ]},
      { title: "Classical ML Fundamentals", weeks: 3, items: [
        { label: "📚 Machine Learning Crash Course (Google — free)", cost: "free", topics: ["Foundational ML concepts — features, labels, loss functions", "Linear regression and logistic regression", "Neural network intuition", "Interactive exercises with TensorFlow Playground"] },
        { label: "📚 Intro & Intermediate Machine Learning (Kaggle Learn — free)", cost: "free", topics: ["Scikit-learn — end-to-end ML pipelines", "Supervised learning — regression, decision trees, random forests, SVMs", "Unsupervised learning — k-means clustering, PCA", "Model evaluation — accuracy, precision, recall, F1, ROC-AUC"] },
        { label: "Train/test splits, cross-validation, and overfitting", cost: null, topics: [] },
        { label: "Feature engineering and preprocessing", cost: null, topics: [] },
      ]},
      { title: "Machine Learning Fundamentals", weeks: 3, items: [
        { label: "📚 Machine Learning Specialization (Coursera — Andrew Ng / DeepLearning.AI)", cost: "medium", topics: ["Supervised vs unsupervised learning", "Classification, clustering, anomaly detection", "Evaluation — precision, recall, F1, ROC curves"] },
      ]},
      { title: "AI Safety, Ethics & Governance", weeks: 1, items: [
        { label: "📚 AI Safety Fundamentals (BlueDot Impact — free)", cost: "free", topics: ["AI alignment concepts — goal misgeneralisation, reward hacking", "Bias and fairness in AI systems", "EU AI Act — risk tiers, prohibited uses, compliance obligations", "UK AI regulation landscape and ethics frameworks", "Responsible AI deployment — transparency, explainability, accountability"] },
        { label: "Model cards and datasheets for datasets", cost: null, topics: [] },
        { label: "Conducting a Data Protection Impact Assessment (DPIA) for AI", cost: null, topics: [] },
      ]},
      { title: "Security & Adversarial AI", weeks: 1, items: [
        { label: "📚 Red Teaming LLM Applications (DeepLearning.AI — free)", cost: "free", topics: ["Prompt injection attacks and mitigation", "AI red-teaming concepts"] },
      ]},
      { title: "Power BI & Data Visualisation for Stakeholders", weeks: 1, items: [
        { label: "Power BI Desktop — awareness level (Phase 4/5)", cost: null, topics: ["Building dashboards and reports for non-technical stakeholders", "Connecting to data sources — SQL, Excel, APIs", "DAX basics — calculated columns and measures", "Publishing to Power BI Service and sharing reports"] },
        { label: "Power BI as a bridge to enterprise platforms", cost: null, topics: ["Conceptual overlap with Palantir Foundry's Workshop layer — dashboards driven by ontology data", "Conceptual overlap with Quantexa's visualisation and decision intelligence layers", "Pattern to learn: build in Power BI first, then map concepts to Foundry/Quantexa when encountered in a role"] },
      ]},
      { title: "Production AI Systems", weeks: 3, items: [
        { label: "📚 Learn Docker (Boot.dev — free to start)", cost: "free", topics: ["Docker for AI deployment — containerising FastAPI + LLM services, docker-compose for local dev"] },
        { label: "Cost & latency optimisation — token budgeting, batching, async calls", cost: null, topics: [] },
        { label: "Caching strategies — semantic caching, prompt caching, response caching", cost: null, topics: [] },
        { label: "Streaming responses — SSE, chunked output, progressive UI updates", cost: null, topics: [] },
        { label: "Model routing — task-based routing, cost-tier routing, fallback chains", cost: null, topics: [] },
        { label: "Model monitoring and logging post-deployment", cost: null, topics: ["Structured logging — request/response capture, latency, token usage", "Drift detection — quality regression and input distribution shifts", "Alerting — failure rate thresholds, latency SLAs", "Observability tools — LangSmith, Evidently AI, custom dashboards"] },
      ]},
    ],
  },
  {
    id: "phase5", label: "Phase 5", title: "Portfolio & Job Readiness", months: "Months 15–18", color: "#1e3d6b",
    milestone: "Pass AZ-900 and AI-102 certification exams, make one merged open-source contribution, and publish a portfolio landing page linking all Phase 2–4 projects with writeups explaining the architectural decisions made.",
    roleRelevance: "Azure certifications (AZ-900, AI-102) are explicitly listed in Palantir, Quantexa, and BAE Systems job specs. A structured project portfolio with deployment evidence is the primary differentiator in Palantir Deployment Strategist interview panels.",
    sections: [
      { title: "Certifications", weeks: 4, items: [
        { label: "📚 AZ-900 Azure Fundamentals (Microsoft Learn — free)", cost: "high", topics: ["Foundation for Azure AI Engineer and Developer paths"] },
        { label: "📚 AI-102 Azure AI Engineer Associate (Microsoft Learn — free)", cost: "high", topics: ["Azure AI Engineer Associate (AI-102) certification"] },
        { label: "Azure Developer Associate (AZ-204)", cost: "high", topics: [] },
        { label: "📚 Kaggle Certifications (Kaggle Learn — free)", cost: "free", topics: ["Python, Pandas, ML certificates"] },
        { label: "DeepLearning.AI Specialisation certificates (on completion)", cost: "free", topics: [] },
      ]},
      { title: "Open Source & Community", weeks: 3, items: [
        { label: "Contribute to LangChain or related project", cost: null, topics: [] },
        { label: "Complete a Kaggle competition", cost: null, topics: [] },
        { label: "Clean GitHub profile — good READMEs, consistent commits", cost: null, topics: [] },
        { label: "Attend AI UK or PyData London", cost: null, topics: [] },
      ]},
      { title: "Interview Preparation", weeks: 3, items: [
        { label: "System design — RAG pipelines, agent systems at scale", cost: null, topics: [] },
        { label: "LLM questions — RAG vs fine-tuning, hallucination, safety", cost: null, topics: [] },
        { label: "Python coding — LeetCode easy/medium", cost: null, topics: [] },
        { label: "Domain Q&A — AI ethics, GDPR, DPIA, bias in policing AI", cost: null, topics: [] },
      ]},
      { title: "Project Management", weeks: 2, items: [
        { label: "📚 Google Project Management Certificate (Coursera)", cost: "medium", topics: ["Agile and Scrum fundamentals — sprints, standups, retros", "Kanban methodology and WIP limits", "Project scoping — requirements, timelines, risk management", "Stakeholder communication and reporting"] },
        { label: "📚 Agile with Atlassian Jira (Coursera — free)", cost: "free", topics: ["Tools — Jira, Trello, or GitHub Projects"] },
      ]},
    ],
  },
];

const PROJECTS = [
  { id: "p1",  title: "Two-Way Reporting App",        phase: "Phase 2/3", initStatus: "in-progress" },
  { id: "p2",  title: "Supervisor Toolkit",            phase: "Phase 2",   initStatus: "in-progress" },
  { id: "p3",  title: "Digital Forms & Workflow",      phase: "Phase 2",   initStatus: "not-started" },
  { id: "p4",  title: "Risk Assessment Tool",          phase: "Phase 3",   initStatus: "not-started" },
  { id: "p5",  title: "Document Intelligence Tool",    phase: "Phase 3",   initStatus: "not-started" },
  { id: "p6",  title: "Network / Association Mapper",  phase: "Phase 4",   initStatus: "not-started" },
  { id: "p7",  title: "OSINT Aggregator",              phase: "Phase 4",   initStatus: "not-started" },
  { id: "p8",  title: "Financial Pattern Analysis",    phase: "Phase 4",   initStatus: "not-started" },
  { id: "p9",  title: "Transcription & Analysis Tool", phase: "Phase 4",   initStatus: "not-started" },
  { id: "p10", title: "CCU Dashboard",                 phase: "Phase 4",   initStatus: "not-started" },
  { id: "p11", title: "CCU Case Management System",    phase: "Phase 5",   initStatus: "not-started" },
  { id: "p12", title: "Integrity Assessment Tool",     phase: "Phase 5",   initStatus: "not-started" },
  { id: "p13", title: "Disclosure Management Tool",    phase: "Phase 5",   initStatus: "not-started" },
  { id: "p14", title: "Scenario Training Simulator",   phase: "Phase 5",   initStatus: "not-started" },
  { id: "p15", title: "Secure Briefing Tool",          phase: "Phase 5",   initStatus: "not-started" },
];

const COURSE_URLS = {
  // Phase 1 — AI Fundamentals
  "📚 Elements of AI (University of Helsinki — free, certificate)": "https://www.elementsofai.com/",
  "📚 Generative AI for Beginners (Microsoft — free, 18 lessons)": "https://microsoft.github.io/generative-ai-for-beginners/",
  "📚 Introduction to Generative AI (Google Cloud Skills Boost — free)": "https://cloudskillsboost.google/course_templates/536",
  // Phase 1 — Python
  "📚 Programming for Everybody — Getting Started with Python (Coursera)": "https://www.coursera.org/learn/python",
  "📚 Python Data Structures (Coursera)": "https://www.coursera.org/learn/python-data",
  "📚 Using Python to Access Web Data (Coursera)": "https://www.coursera.org/learn/python-network-data",
  "📚 Using Databases with Python (Coursera)": "https://www.coursera.org/learn/python-databases",
  "📚 Capstone — Retrieving, Processing & Visualising Data with Python (Coursera)": "https://www.coursera.org/learn/python-data-visualization",
  // Phase 1 — VS Code
  "📚 Visual Studio Code Crash Course (freeCodeCamp — YouTube, free)": "https://www.youtube.com/watch?v=WPqXP_kLzpo",
  // Phase 1 — Prompt Engineering
  "📚 ChatGPT Prompt Engineering for Developers (DeepLearning.AI — free)": "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/",
  "📚 Anthropic Prompt Engineering Interactive Tutorial (Anthropic docs — free)": "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
  // Phase 1 — API Usage
  "📚 Building Systems with the ChatGPT API (DeepLearning.AI — free)": "https://www.deeplearning.ai/short-courses/building-systems-with-chatgpt/",
  // Phase 1 — LangChain
  "📚 LangChain for LLM Application Development (DeepLearning.AI — free)": "https://www.deeplearning.ai/short-courses/langchain-for-llm-application-development/",
  "📚 LangChain: Chat with Your Data (DeepLearning.AI — free)": "https://www.deeplearning.ai/short-courses/langchain-chat-with-your-data/",
  // Phase 1 — Scripting & Phase 2 — Linux (same course)
  "📚 The Linux Command Line Bootcamp (Udemy — Colt Steele)": "https://www.udemy.com/course/the-linux-command-line-bootcamp/",
  "📚 PowerShell Master Class (Udemy — John Savill)": "https://www.udemy.com/course/powershell-master-class/",
  // Phase 1 — IT Networking
  "📚 Google IT Support Professional Certificate (Coursera)": "https://www.coursera.org/professional-certificates/google-it-support",
  "📚 Professor Messer's CompTIA Network+ (YouTube — free)": "https://www.youtube.com/@professormesser",
  // Phase 1 — Algorithms
  "📚 CS50: Introduction to Computer Science (Harvard/edX — free)": "https://cs50.harvard.edu/x/",
  "📚 Algorithms Specialization (Coursera — Stanford)": "https://www.coursera.org/specializations/algorithms",
  // Phase 2 — Node.js
  "📚 The Complete Node.js Developer Course (Udemy — Andrew Mead)": "https://www.udemy.com/course/the-complete-nodejs-developer-course-2/",
  // Phase 2 — Databases
  "📚 The Complete SQL Bootcamp (Udemy — Jose Portilla)": "https://www.udemy.com/course/the-complete-sql-bootcamp/",
  "📚 PostgreSQL for Everybody (Coursera — Dr. Chuck)": "https://www.coursera.org/specializations/postgresql-for-everybody",
  // Phase 2 — Auth & Security
  "📚 Web Application Security — OWASP Top 10 (OWASP.org — free)": "https://owasp.org/www-project-top-ten/",
  // Phase 2 — DevOps
  "📚 Docker & Kubernetes: The Practical Guide (Udemy — Maximilian Schwarzmüller)": "https://www.udemy.com/course/docker-kubernetes-the-practical-guide/",
  "📚 GitHub Actions — The Complete Guide (Udemy)": "https://www.udemy.com/course/github-actions-the-complete-guide/",
  // Phase 2 — Servers
  "📚 Windows Server Administration (Microsoft Learn — free)": "https://learn.microsoft.com/en-us/training/paths/windows-server-fundamentals/",
  // Phase 2 — Developer Tools
  "📚 Git & GitHub — The Complete Guide (Udemy — Maximilian Schwarzmüller)": "https://www.udemy.com/course/git-github-practical-guide/",
  // Phase 2 — App Dev Skills
  "📚 Software Design & Architecture Specialization (Coursera — University of Alberta)": "https://www.coursera.org/specializations/software-design-architecture",
  // Phase 3 — Transformer & Attention
  "📄 Attention Is All You Need (Vaswani et al., 2017 — free)": "https://arxiv.org/abs/1706.03762",
  "📖 The Illustrated Transformer (Jay Alammar — free)": "https://jalammar.github.io/illustrated-transformer/",
  "📺 Intro to Large Language Models (Andrej Karpathy — YouTube, free)": "https://www.youtube.com/watch?v=zjkBMFhNj_g",
  // Phase 3 — RAG
  "📚 Vector Databases: From Embeddings to Applications (DeepLearning.AI — free)": "https://www.deeplearning.ai/short-courses/vector-databases-embeddings-applications/",
  "📚 Building & Evaluating Advanced RAG (DeepLearning.AI — free)": "https://www.deeplearning.ai/short-courses/building-evaluating-advanced-rag/",
  // Phase 3 — Agents
  "📚 Functions, Tools and Agents with LangChain (DeepLearning.AI — free)": "https://www.deeplearning.ai/short-courses/functions-tools-agents-langchain/",
  "📚 Safe and Reliable AI via Guardrails (DeepLearning.AI — free)": "https://www.deeplearning.ai/short-courses/safe-and-reliable-ai-via-guardrails/",
  "📚 AI Agents in LangGraph (DeepLearning.AI — free)": "https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/",
  "📚 Multi AI Agent Systems with crewAI (DeepLearning.AI — free)": "https://www.deeplearning.ai/short-courses/multi-ai-agent-systems-with-crewai/",
  "📚 Agent Memory: Building Memory-Aware Agents (DeepLearning.AI — free)": "https://www.deeplearning.ai/short-courses/",
  // Phase 3 — LLM Ops
  "📚 LLMOps (DeepLearning.AI — free)": "https://www.deeplearning.ai/short-courses/llmops/",
  "📚 Evaluating and Debugging Generative AI (DeepLearning.AI — free)": "https://www.deeplearning.ai/short-courses/evaluating-debugging-generative-ai/",
  "📚 LLM Evaluation — Evidently AI (Evidently AI — free)": "https://www.evidentlyai.com/llm-evaluation-course",
  // Phase 4 — Data & Analytics
  "📚 Pandas & Data Visualisation (Kaggle Learn — free)": "https://www.kaggle.com/learn/pandas",
  "📚 Data Analysis with Python (Coursera — IBM)": "https://www.coursera.org/learn/data-analysis-with-python",
  // Phase 4 — Graph & Network
  "📚 Applied Social Network Analysis in Python (Coursera — University of Michigan)": "https://www.coursera.org/learn/python-social-network-analysis",
  // Phase 4 — Classical ML
  "📚 Machine Learning Crash Course (Google — free)": "https://developers.google.com/machine-learning/crash-course",
  "📚 Intro & Intermediate Machine Learning (Kaggle Learn — free)": "https://www.kaggle.com/learn/intro-to-machine-learning",
  // Phase 4 — ML Fundamentals
  "📚 Machine Learning Specialization (Coursera — Andrew Ng / DeepLearning.AI)": "https://www.coursera.org/specializations/machine-learning-introduction",
  // Phase 4 — AI Safety
  "📚 AI Safety Fundamentals (BlueDot Impact — free)": "https://aisafetyfundamentals.com/",
  // Phase 4 — Security & Adversarial
  "📚 Red Teaming LLM Applications (DeepLearning.AI — free)": "https://www.deeplearning.ai/short-courses/red-teaming-llm-applications/",
  // Phase 4 — Production AI
  "📚 Learn Docker (Boot.dev — free to start)": "https://www.boot.dev/courses/learn-docker",
  // Phase 5 — Certifications
  "📚 AZ-900 Azure Fundamentals (Microsoft Learn — free)": "https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/",
  "📚 AI-102 Azure AI Engineer Associate (Microsoft Learn — free)": "https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-engineer/",
  "Azure Developer Associate (AZ-204)": "https://learn.microsoft.com/en-us/credentials/certifications/azure-developer/",
  "📚 Kaggle Certifications (Kaggle Learn — free)": "https://www.kaggle.com/learn",
  // Phase 5 — Project Management
  "📚 Google Project Management Certificate (Coursera)": "https://www.coursera.org/professional-certificates/google-project-management",
  "📚 Agile with Atlassian Jira (Coursera — free)": "https://www.coursera.org/learn/agile-atlassian-jira",
};

const STORAGE_KEY = "d2d-roadmap-state";
const STATUS_CYCLE = { "not-started": "in-progress", "in-progress": "complete", "complete": "not-started" };
const STATUS_STYLE = {
  "not-started": { bg: "#1e1e1e", color: "#555", label: "Not Started" },
  "in-progress":  { bg: "#0d2540", color: "#5ba3e0", label: "In Progress" },
  "complete":     { bg: "#0d2b1e", color: "#4caf82", label: "Complete" },
};

const COST_STYLE = {
  free:   { label: "free",    color: "#4caf82", bg: "#0d2b1e" },
  low:    { label: "~£12",    color: "#5ba3e0", bg: "#0d2540" },
  medium: { label: "~£35/mo", color: "#e0a030", bg: "#2a1e05" },
  high:   { label: "~£150+",  color: "#e05a5a", bg: "#2a0d0d" },
};

const TOPIC_STATUS_CYCLE = { "not-started": "in-progress", "in-progress": "complete", "complete": "not-started" };
const TOPIC_STATUS_DOT = {
  "not-started": { color: "#333",    title: "Not Started" },
  "in-progress": { color: "#e0a030", title: "In Progress" },
  "complete":    { color: "#4caf82", title: "Complete"    },
};

const SECTION_DEPS = {
  "LangChain":                          { requires: ["Python"] },
  "API Usage":                          { requires: ["Python"] },
  "Transformer Architecture & Attention": { requires: ["Applied Linear Algebra", "Applied Probability & Statistics"] },
  "Classical ML Fundamentals":          { requires: ["Applied Probability & Statistics"] },
  "Machine Learning Fundamentals":      { requires: ["Applied Probability & Statistics"] },
  "Production AI Systems":              { requires: ["Deployment & DevOps"] },
};

function ProgressBar({ pct, color }) {
  return (
    <div style={{ background: "#222", borderRadius: 99, height: 6, overflow: "hidden", flex: 1 }}>
      <div style={{ width: pct + "%", height: "100%", background: color, borderRadius: 99, transition: "width 0.4s ease" }} />
    </div>
  );
}

function Tick({ done, color }) {
  return (
    <div style={{
      width: 22, height: 22, borderRadius: 6, flexShrink: 0, cursor: "pointer",
      border: done ? "none" : "2px solid #383838",
      background: done ? color : "transparent",
      display: "flex", alignItems: "center", justifyContent: "center",
      transition: "all 0.15s",
    }}>
      {done && (
        <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
          <path d="M1 4.5L4.5 8L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}

export default function App() {
  const [checked, setChecked] = useState({});
  const [projStatus, setProjStatus] = useState({});
  const [topicStatus, setTopicStatus] = useState({});
  const [tab, setTab] = useState("learning");
  const [openPhase, setOpenPhase] = useState("phase1");
  const [openSection, setOpenSection] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setChecked(parsed.checked || {});
        setProjStatus(parsed.projStatus || {});
        setTopicStatus(parsed.topicStatus || {});
      }
    } catch (e) {}
    setLoaded(true);
  }, []);

  const persist = useCallback(function(c, p, t) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ checked: c, projStatus: p, topicStatus: t }));
    } catch (e) {}
  }, []);

  function toggleItem(key) {
    const next = Object.assign({}, checked, { [key]: !checked[key] });
    setChecked(next);
    persist(next, projStatus, topicStatus);
  }

  function cycleTopicStatus(key) {
    var current = topicStatus[key] || "not-started";
    var next = Object.assign({}, topicStatus, { [key]: TOPIC_STATUS_CYCLE[current] });
    setTopicStatus(next);
    persist(checked, projStatus, next);
  }

  function cycleProject(id) {
    const current = projStatus[id] || PROJECTS.find(function(p) { return p.id === id; }).initStatus;
    const next = Object.assign({}, projStatus, { [id]: STATUS_CYCLE[current] });
    setProjStatus(next);
    persist(checked, next, topicStatus);
  }

  function phaseProgress(phase) {
    var keys = [];
    phase.sections.forEach(function(s) {
      s.items.forEach(function(_, i) {
        keys.push(phase.id + "-" + s.title + "-" + i);
      });
    });
    var done = keys.filter(function(k) { return checked[k]; }).length;
    return { done: done, total: keys.length, pct: keys.length ? Math.round(done / keys.length * 100) : 0 };
  }

  function phaseTopicProgress(phase) {
    var total = 0;
    var complete = 0;
    phase.sections.forEach(function(s) {
      s.items.forEach(function(item, i) {
        (item.topics || []).forEach(function(_, ti) {
          total++;
          var k = phase.id + "-" + s.title + "-" + i + "-t" + ti;
          if ((topicStatus[k] || "not-started") === "complete") complete++;
        });
      });
    });
    return { complete: complete, total: total };
  }

  var totalItems = 0;
  PHASES.forEach(function(p) { p.sections.forEach(function(s) { totalItems += s.items.length; }); });
  var totalDone = Object.values(checked).filter(Boolean).length;
  var totalPct = Math.round(totalDone / totalItems * 100);

  var projComplete = PROJECTS.filter(function(p) { return (projStatus[p.id] || p.initStatus) === "complete"; }).length;
  var projInProgress = PROJECTS.filter(function(p) { return (projStatus[p.id] || p.initStatus) === "in-progress"; }).length;

  if (!loaded) {
    return (
      <div style={{ minHeight: "100vh", background: "#0f0f0f", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "#444", fontFamily: "monospace", fontSize: 13 }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f0f", color: "#e0e0e0", fontFamily: "Georgia, serif", paddingBottom: 60 }}>

      <div style={{ background: "linear-gradient(135deg, #0a1628 0%, #160a28 100%)", borderBottom: "1px solid #1a1a1a", padding: "28px 20px 20px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ fontSize: 10, letterSpacing: 4, color: "#5ba3e0", fontFamily: "monospace", marginBottom: 6 }}>DETECTIVE TO DEVELOPER</div>
          <h1 style={{ margin: "0 0 4px", fontSize: 24, fontWeight: 700, color: "#fff", letterSpacing: "-0.5px" }}>Learning Roadmap</h1>
          <p style={{ margin: "0 0 18px", color: "#555", fontSize: 12 }}>18-Month AI Engineering Programme</p>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <ProgressBar pct={totalPct} color="#5ba3e0" />
            <span style={{ fontSize: 12, color: "#5ba3e0", fontFamily: "monospace", whiteSpace: "nowrap" }}>{totalDone}/{totalItems}</span>
            <span style={{ fontSize: 11, padding: "2px 9px", borderRadius: 99, background: "#5ba3e015", border: "1px solid #5ba3e030", color: "#5ba3e0" }}>{totalPct}%</span>
          </div>
        </div>
      </div>

      <div style={{ background: "#0c0c0c", borderBottom: "1px solid #161616" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex" }}>
          {["learning", "projects"].map(function(t) {
            return (
              <button key={t} onClick={function() { setTab(t); }} style={{
                background: "none", border: "none", cursor: "pointer", padding: "13px 22px",
                fontSize: 13, fontFamily: "Georgia, serif",
                color: tab === t ? "#fff" : "#444",
                borderBottom: tab === t ? "2px solid #5ba3e0" : "2px solid transparent",
                transition: "all 0.2s",
              }}>
                {t === "learning" ? "Learning Topics" : "Projects"}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "20px 14px" }}>

        {tab === "learning" && PHASES.map(function(phase) {
          var prog = phaseProgress(phase);
          var topicProg = phaseTopicProgress(phase);
          var isPhaseOpen = openPhase === phase.id;
          return (
            <div key={phase.id} style={{ marginBottom: 10, border: "1px solid #1c1c1c", borderRadius: 12, overflow: "hidden", background: "#0f0f0f" }}>
              <div onClick={function() { setOpenPhase(isPhaseOpen ? null : phase.id); }} style={{ padding: "14px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, background: isPhaseOpen ? "#141414" : "#0f0f0f" }}>
                <div style={{ width: 42, height: 42, borderRadius: 9, background: phase.color, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <div style={{ fontSize: 8, color: "rgba(255,255,255,0.6)", letterSpacing: 1 }}>PHASE</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>{phase.label.split(" ")[1]}</div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 5 }}>
                    <span style={{ fontWeight: 600, fontSize: 14, color: "#fff" }}>{phase.title}</span>
                    <span style={{ fontSize: 11, color: "#444" }}>{phase.months}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                    <ProgressBar pct={prog.pct} color={phase.color} />
                    <span style={{ fontSize: 10, color: "#444", fontFamily: "monospace", whiteSpace: "nowrap" }}>{prog.done}/{prog.total} resources</span>
                  </div>
                  {topicProg.total > 0 && (
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: phase.roleRelevance ? 6 : 0 }}>
                      <div style={{ display: "flex", gap: 2 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: topicProg.complete > 0 ? "#4caf82" : "#222", display: "inline-block" }} />
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#222", display: "inline-block" }} />
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#222", display: "inline-block" }} />
                      </div>
                      <span style={{ fontSize: 10, color: topicProg.complete > 0 ? "#4caf82" : "#383838", fontFamily: "monospace" }}>{topicProg.complete}/{topicProg.total} topics complete</span>
                    </div>
                  )}
                  {phase.roleRelevance && (
                    <div style={{ fontSize: 11, color: "#484848", lineHeight: 1.5 }}>{phase.roleRelevance}</div>
                  )}
                </div>
                <span style={{ color: "#333", fontSize: 18, display: "inline-block", transform: isPhaseOpen ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}>›</span>
              </div>

              {isPhaseOpen && (
                <div style={{ borderTop: "1px solid #181818" }}>
                  {phase.milestone && (
                    <div style={{ margin: "14px 18px 0", padding: "11px 14px", background: "#0c0c0c", border: "1px solid #222", borderLeft: "3px solid " + phase.color, borderRadius: 8 }}>
                      <div style={{ fontSize: 9, letterSpacing: 2, color: phase.color, fontFamily: "monospace", marginBottom: 5 }}>PHASE MILESTONE</div>
                      <div style={{ fontSize: 12, color: "#666", lineHeight: 1.6 }}>{phase.milestone}</div>
                    </div>
                  )}
                  {phase.sections.map(function(section) {
                    var sKey = phase.id + "-" + section.title;
                    var isSectionOpen = openSection === sKey;
                    var secDone = section.items.filter(function(_, i) { return checked[phase.id + "-" + section.title + "-" + i]; }).length;
                    return (
                      <div key={section.title} style={{ borderBottom: "1px solid #141414" }}>
                        <div onClick={function() { setOpenSection(isSectionOpen ? null : sKey); }} style={{ padding: "11px 18px 11px 26px", cursor: "pointer", background: isSectionOpen ? "#121212" : "transparent" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ flex: 1, fontSize: 13, color: "#bbb", fontWeight: 600 }}>{section.title}</span>
                            {section.weeks && (
                              <span style={{ fontSize: 10, fontFamily: "monospace", color: "#383838", whiteSpace: "nowrap" }}>{section.weeks}w</span>
                            )}
                            <span style={{ fontSize: 10, fontFamily: "monospace", color: secDone === section.items.length ? "#4caf82" : "#444" }}>{secDone}/{section.items.length}</span>
                            <span style={{ color: "#2a2a2a", fontSize: 14, display: "inline-block", transform: isSectionOpen ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}>›</span>
                          </div>
                          {SECTION_DEPS[section.title] && (
                            <div style={{ marginTop: 3, fontSize: 10, color: "#383838", fontFamily: "monospace" }}>
                              ← requires: {SECTION_DEPS[section.title].requires.join(", ")}
                            </div>
                          )}
                        </div>
                        {isSectionOpen && (
                          <div style={{ padding: "2px 18px 10px 26px" }}>
                            {section.items.map(function(item, i) {
                              var key = phase.id + "-" + section.title + "-" + i;
                              var done = !!checked[key];
                              var hasTopics = item.topics && item.topics.length > 0;
                              var url = COURSE_URLS[item.label] || null;
                              var costStyle = item.cost ? COST_STYLE[item.cost] : null;
                              return (
                                <div key={i} style={{ borderBottom: i < section.items.length - 1 ? "1px solid #141414" : "none" }}>
                                  <div onClick={function() { toggleItem(key); }} style={{ display: "flex", alignItems: "flex-start", gap: 11, padding: "9px 0 6px", cursor: "pointer" }}>
                                    <div style={{ paddingTop: 1 }}><Tick done={done} color={phase.color} /></div>
                                    <span style={{ fontSize: 13, lineHeight: 1.5, color: done ? "#3a3a3a" : "#aaa", textDecoration: done ? "line-through" : "none", transition: "all 0.2s", flex: 1 }}>{item.label}</span>
                                    {costStyle && (
                                      <span style={{ flexShrink: 0, alignSelf: "center", fontSize: 10, fontFamily: "monospace", padding: "2px 6px", borderRadius: 99, background: done ? "#1a1a1a" : costStyle.bg, color: done ? "#2a2a2a" : costStyle.color, border: "1px solid " + (done ? "#222" : costStyle.color + "40"), whiteSpace: "nowrap", transition: "all 0.2s" }}>{costStyle.label}</span>
                                    )}
                                    {url && (
                                      <a href={url} target="_blank" rel="noreferrer" onClick={function(e) { e.stopPropagation(); }} title="Open course" style={{ flexShrink: 0, alignSelf: "center", marginLeft: 2, color: done ? "#2a2a2a" : "#3a6a9a", fontSize: 15, lineHeight: 1, textDecoration: "none", transition: "color 0.2s" }}>↗</a>
                                    )}
                                  </div>
                                  {hasTopics && (
                                    <div style={{ paddingLeft: 33, paddingBottom: 8 }}>
                                      {item.topics.map(function(topic, ti) {
                                        var tk = key + "-t" + ti;
                                        var ts = topicStatus[tk] || "not-started";
                                        var dot = TOPIC_STATUS_DOT[ts];
                                        return (
                                          <div key={ti} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "3px 0" }}>
                                            <button
                                              onClick={function(e) { e.stopPropagation(); cycleTopicStatus(tk); }}
                                              title={dot.title + " — click to change"}
                                              style={{ flexShrink: 0, marginTop: 4, width: 8, height: 8, borderRadius: "50%", background: done ? "#252525" : dot.color, border: "none", padding: 0, cursor: "pointer", transition: "background 0.2s" }}
                                            />
                                            <span style={{ fontSize: 12, color: done ? "#2a2a2a" : ts === "complete" ? "#4a4a4a" : ts === "in-progress" ? "#888" : "#4a4a4a", lineHeight: 1.5, textDecoration: ts === "complete" && !done ? "line-through" : "none", transition: "all 0.2s" }}>{topic}</span>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {tab === "projects" && (
          <div>
            <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
              {[
                { label: "Complete",    count: projComplete,                                    color: "#4caf82", bg: "#0d2b1e" },
                { label: "In Progress", count: projInProgress,                                  color: "#5ba3e0", bg: "#0d2540" },
                { label: "Remaining",   count: PROJECTS.length - projComplete - projInProgress, color: "#555",    bg: "#181818" },
              ].map(function(s) {
                return (
                  <div key={s.label} style={{ background: s.bg, border: "1px solid " + s.color + "25", borderRadius: 10, padding: "10px 16px", flex: 1, minWidth: 90 }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.count}</div>
                    <div style={{ fontSize: 11, color: "#444", marginTop: 2 }}>{s.label}</div>
                  </div>
                );
              })}
            </div>
            <div style={{ fontSize: 10, color: "#333", marginBottom: 10, fontFamily: "monospace", letterSpacing: 1 }}>TAP TO CYCLE STATUS</div>
            {PROJECTS.map(function(project, i) {
              var status = projStatus[project.id] || project.initStatus;
              var st = STATUS_STYLE[status];
              return (
                <div key={project.id} onClick={function() { cycleProject(project.id); }} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 14px", marginBottom: 7, background: "#0f0f0f", border: "1px solid #1c1c1c", borderRadius: 10, cursor: "pointer" }}>
                  <div style={{ width: 26, height: 26, borderRadius: 7, background: "#181818", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#333", fontFamily: "monospace", flexShrink: 0 }}>
                    {(i + 1) < 10 ? "0" + (i + 1) : "" + (i + 1)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: status === "complete" ? "#3a3a3a" : "#ccc", fontWeight: 500 }}>{project.title}</div>
                    <div style={{ fontSize: 11, color: "#333", marginTop: 2 }}>{project.phase}</div>
                  </div>
                  <div style={{ padding: "3px 10px", borderRadius: 99, background: st.bg, color: st.color, fontSize: 11, border: "1px solid " + st.color + "30", whiteSpace: "nowrap" }}>
                    {st.label}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
