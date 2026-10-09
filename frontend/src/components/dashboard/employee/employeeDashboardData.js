import { MessageCircle, CheckCircle2, Bookmark, Search } from "lucide-react";

const employeeMetrics = [
  {
    label: "QUESTIONS ASKED",

    value: "47",

    supportingText: "+8 this week",

    supportingType: "positive",

    icon: MessageCircle,

    iconColor: "orange",
  },

  {
    label: "ANSWERS RECEIVED",

    value: "42",

    supportingText: "89% answered",

    supportingType: "positive",

    icon: CheckCircle2,

    iconColor: "green",
  },

  {
    label: "SAVED ANSWERS",

    value: "12",

    supportingText: "3 this week",

    supportingType: "positive",

    icon: Bookmark,

    iconColor: "purple",
  },

  {
    label: "SEARCH CONFIDENCE",

    value: "94%",

    supportingText: "Excellent",

    supportingType: "positive",

    icon: Search,

    iconColor: "amber",
  },
];

export const velocityChartData = {
  title: "14-Day Activity Velocity",
  badgeText: "Trending up",
  badgeIcon: "↗",
  defaultSubtext:
    "Query volume over last 14 days • 61 queries resolved (+18.4% vs last week)",
  legendLabel: "Queries / Day",

  axisLabels: [
    "Aug 18",
    "Aug 20",
    "Aug 22",
    "Aug 24",
    "Aug 26",
    "Aug 28",
    "Today",
  ],

  points: [
    { date: "Aug 18", value: 3, x: 25, y: 83.2 },
    { date: "Aug 19", value: 5, x: 75, y: 62.1 },
    { date: "Aug 20", value: 4, x: 125, y: 72.6 },
    { date: "Aug 21", value: 6, x: 175, y: 51.5 },
    { date: "Aug 22", value: 4, x: 225, y: 72.6 },
    { date: "Aug 23", value: 1, x: 275, y: 104.4 },
    { date: "Aug 24", value: 2, x: 325, y: 93.8 },
    { date: "Aug 25", value: 5, x: 375, y: 62.1 },
    { date: "Aug 26", value: 8, x: 425, y: 30.3 },
    { date: "Aug 27", value: 6, x: 475, y: 51.5 },
    { date: "Aug 28", value: 7, x: 525, y: 40.9 },
    { date: "Aug 29", value: 4, x: 575, y: 72.6 },
    { date: "Aug 30", value: 3, x: 625, y: 83.2 },
    { date: "Today", value: 6, x: 675, y: 51.5 },
  ],

  svgPath:
    "M 25.0 83.2 C 33.3 79.7, 58.3 65.6, 75.0 62.1 C 91.7 58.6, 108.3 70.8, 125.0 72.6 C 141.7 74.4, 158.3 55.0, 175.0 51.5 C 191.7 48.0, 208.3 69.1, 225.0 72.6 C 241.7 76.1, 258.3 99.1, 275.0 104.4 C 291.7 109.7, 308.3 99.1, 325.0 93.8 C 341.7 88.5, 358.3 67.4, 375.0 62.1 C 391.7 56.8, 408.3 33.8, 425.0 30.3 C 441.7 26.8, 458.3 48.0, 475.0 51.5 C 491.7 55.0, 508.3 39.1, 525.0 40.9 C 541.7 42.7, 558.3 67.4, 575.0 72.6 C 591.7 77.9, 608.3 81.4, 625.0 83.2 C 641.7 85.0, 666.7 56.8, 675.0 51.5",
};

export const myEkaUsageData = {
  7: {
    label: "7 Days",
    maxValue: 22,
    subtext: "Personal activity breakdown over past 7 days",
    totalText: "Total Activity: 24 Questions • 18 Docs • 42 Searches",
    data: [
      { label: "Day 1", questions: 2, documents: 1, searches: 4 },
      { label: "Day 2", questions: 3, documents: 2, searches: 6 },
      { label: "Day 3", questions: 4, documents: 3, searches: 7 },
      { label: "Day 4", questions: 3, documents: 2, searches: 5 },
      { label: "Day 5", questions: 5, documents: 4, searches: 8 },
      { label: "Day 6", questions: 4, documents: 3, searches: 6 },
      { label: "Today", questions: 6, documents: 4, searches: 9 },
    ],
  },

  30: {
    label: "30 Days",
    maxValue: 120,
    subtext: "Personal activity breakdown over past 30 days",
    totalText: "Total Activity: 98 Questions • 74 Docs • 165 Searches",
    data: [
      { label: "Wk 1", questions: 18, documents: 12, searches: 32 },
      { label: "Wk 2", questions: 24, documents: 18, searches: 42 },
      { label: "Wk 3", questions: 28, documents: 22, searches: 45 },
      { label: "Wk 4", questions: 28, documents: 22, searches: 46 },
    ],
  },

  90: {
    label: "90 Days",
    maxValue: 380,
    subtext: "Personal activity breakdown over past 90 days",
    totalText: "Total Activity: 285 Questions • 210 Docs • 490 Searches",
    data: [
      { label: "Month 1", questions: 82, documents: 60, searches: 140 },
      { label: "Month 2", questions: 95, documents: 72, searches: 165 },
      { label: "Month 3", questions: 108, documents: 78, searches: 185 },
    ],
  },
};

export const myQueryTopicsData = {
  title: "My Query Topics",
  defaultSubtext: "Most frequently queried knowledge categories",
  totalBadge: "76 Total Queries",
  topCategory: "HR Policies",
  topCategoryPercent: 31,
  accuracyMetric: "99.1% Answer Accuracy",
  topics: [
    {
      id: "hr",
      icon: "📋",
      topic: "HR Policies",
      count: 24,
      percent: 31,
      widthPct: 100,
    },
    {
      id: "finance",
      icon: "💳",
      topic: "Finance",
      count: 18,
      percent: 23,
      widthPct: 75,
    },
    {
      id: "engineering",
      icon: "⚙️",
      topic: "Engineering",
      count: 15,
      percent: 19,
      widthPct: 62.5,
    },
    {
      id: "company",
      icon: "🏢",
      topic: "Company Policies",
      count: 11,
      percent: 14,
      widthPct: 45.8,
    },
    {
      id: "benefits",
      icon: "🎁",
      topic: "Benefits",
      count: 8,
      percent: 10,
      widthPct: 33.3,
    },
  ],
};

export const savedBookmarks = [
  {
    id: "doc-1",
    title: "Corporate Governance & Compliance Policy",
    category: "People & HR Operations",
    format: "PDF",
    pages: 4,
  },
  {
    id: "doc-2",
    title: "Kubernetes Microservices & Service Mesh Architecture Guide",
    category: "Engineering & DevOps",
    format: "MD",
    pages: 4,
  },
  {
    id: "doc-3",
    title: "2026 Global Remote Work, Travel & Flexible Hours Policy",
    category: "People & HR Operations",
    format: "PDF",
    pages: 4,
  },
];

// Recent Search Confidence
export const recentSearches = [
  {
    id: "search-1",
    query: "Work from home policy 90-day tax limits",
    timestamp: "Queried 10 mins ago",
    groundingDetail: "3 sources verified",
    confidenceLevel: "high",
  },
  {
    id: "search-2",
    query: "Kubernetes failover DNS TTL settings",
    timestamp: "Queried 2 hours ago",
    groundingDetail: "2 sources verified",
    confidenceLevel: "high",
  },
  {
    id: "search-3",
    query: "Navan travel stipend roll forward rules",
    timestamp: "Queried Yesterday",
    groundingDetail: "Partial policy match",
    confidenceLevel: "medium",
  },
];

// Frequently Asked Questions
export const employeeFaqs = [
  {
    id: "faq-wifi",
    question: "What is the office Wi-Fi password and VPN certificate link?",
    targetQuery:
      "What is the branch office Wi-Fi password and VPN download URL?",
    actionLabel: "Click to query EKA →",
  },
  {
    id: "faq-okr",
    question: "How do I submit quarterly OKRs and peer reviews in Lattice?",
    targetQuery:
      "How do I submit quarterly OKRs and peer reviews in Lattice?",
    actionLabel: "Click to query EKA →",
  },
  {
    id: "faq-holidays",
    question: "What are the official paid company holidays for 2026?",
    targetQuery:
      "What are the official paid company holidays for 2026?",
    actionLabel: "Click to query EKA →",
  },
];

export { employeeMetrics };