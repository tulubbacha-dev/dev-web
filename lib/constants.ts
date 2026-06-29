/**
 * Application constants and configuration
 * Centralized settings for colors, animations, and business data
 */

// Color palette
export const COLORS = {
  dark: '#0a0e27',
  navy: '#1a1f3a',
  blue: '#00d9ff',
  cyan: '#00f0ff',
  violet: '#9d4edd',
  purple: '#7b2cbf',
  white: '#ffffff',
  gray: '#888888',
  darkGray: '#444444',
} as const

// Animation defaults
export const ANIMATION_CONFIG = {
  defaultNodeCount: 80,
  defaultParticleCount: 200,
  connectionDistance: 150,
  baseSpeed: 0.5,
  targetFPS: 60,
  maxQualityNodes: 150,
  mediumQualityNodes: 100,
  lowQualityNodes: 50,
} as const

// Navigation menu
export const NAVIGATION_MENU = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Industries', href: '/industries' },
  { label: 'Services', href: '/services' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Research', href: '/research' },
  { label: 'Blog', href: '/blog' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
]

// Services
export const SERVICES = [
  {
    id: 'ai-consulting',
    title: 'AI Strategy & Consulting',
    description: 'Transform your organization with data-driven AI strategies that deliver measurable ROI.',
    features: ['AI Roadmap Development', 'Technology Assessment', 'Implementation Planning', 'Change Management'],
  },
  {
    id: 'ml-development',
    title: 'Machine Learning Development',
    description: 'Build production-ready ML solutions that scale across your enterprise infrastructure.',
    features: ['Model Architecture Design', 'Training & Optimization', 'MLOps Pipeline', 'Performance Monitoring'],
  },
  {
    id: 'generative-ai',
    title: 'Generative AI Solutions',
    description: 'Leverage LLMs and generative AI to automate complex tasks and enhance decision-making.',
    features: ['LLM Integration', 'RAG Systems', 'AI Agents', 'Fine-tuning & Optimization'],
  },
  {
    id: 'data-science',
    title: 'Data Science & Analytics',
    description: 'Extract actionable insights from your data with advanced analytics and predictive modeling.',
    features: ['Exploratory Analysis', 'Predictive Modeling', 'Statistical Analysis', 'Business Intelligence'],
  },
  {
    id: 'computer-vision',
    title: 'Computer Vision',
    description: 'Deploy intelligent visual recognition systems for automated analysis and insights.',
    features: ['Image Classification', 'Object Detection', 'Semantic Segmentation', 'Video Analytics'],
  },
  {
    id: 'nlp',
    title: 'Natural Language Processing',
    description: 'Process and understand human language at scale with advanced NLP techniques.',
    features: ['Text Classification', 'Named Entity Recognition', 'Sentiment Analysis', 'Language Understanding'],
  },
  {
    id: 'cloud-ai',
    title: 'Cloud AI Solutions',
    description: 'Deploy scalable, secure AI solutions in AWS, Azure, or GCP environments.',
    features: ['Cloud Architecture', 'Managed Services', 'Infrastructure Optimization', 'Security & Compliance'],
  },
  {
    id: 'mlops',
    title: 'MLOps & DevOps',
    description: 'Operationalize machine learning with robust DevOps practices and automation.',
    features: ['CI/CD Pipelines', 'Model Deployment', 'Monitoring & Observability', 'Infrastructure as Code'],
  },
]

// Industries
export const INDUSTRIES = [
  {
    id: 'government',
    name: 'Government & Defense',
    description: 'Secure, compliant AI solutions for federal, state, and defense organizations.',
    solutions: ['Threat Detection', 'Predictive Analytics', 'Resource Optimization', 'Intelligence Analysis'],
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'AI-powered diagnostics, treatment planning, and patient outcome optimization.',
    solutions: ['Medical Imaging', 'Drug Discovery', 'Patient Risk Prediction', 'Clinical Decision Support'],
  },
  {
    id: 'finance',
    name: 'Finance & Banking',
    description: 'Fraud detection, risk assessment, and algorithmic trading solutions.',
    solutions: ['Fraud Detection', 'Credit Risk', 'Trading Algorithms', 'Portfolio Optimization'],
  },
  {
    id: 'insurance',
    name: 'Insurance',
    description: 'Underwriting optimization and claims processing automation.',
    solutions: ['Risk Assessment', 'Claims Automation', 'Fraud Detection', 'Customer Segmentation'],
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    description: 'Predictive maintenance and production optimization through AI.',
    solutions: ['Predictive Maintenance', 'Quality Control', 'Supply Chain', 'Energy Optimization'],
  },
  {
    id: 'retail',
    name: 'Retail & E-commerce',
    description: 'Personalization, inventory optimization, and customer experience enhancement.',
    solutions: ['Recommendation Engines', 'Demand Forecasting', 'Pricing Optimization', 'Customer Analytics'],
  },
]

// Statistics
export const STATISTICS = [
  { label: 'Years of Expertise', value: '15+' },
  { label: 'Enterprise Clients', value: '200+' },
  { label: 'ML Models Deployed', value: '500+' },
  { label: 'Team Members', value: '150+' },
] as const
