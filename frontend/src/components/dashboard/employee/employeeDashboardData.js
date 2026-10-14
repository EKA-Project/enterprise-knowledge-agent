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
  legendLabel: "Queries / Day",
  unit: "queries",
  subtext:
    "Query volume over last 14 days • 64 queries resolved (+18.4% vs last week)",
  // oldest -> today
  values: [3, 5, 4, 6, 4, 1, 2, 5, 8, 6, 7, 4, 3, 6],
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
  subtext: "Most frequently queried knowledge categories",
  badge: "76 Total Queries",
  unit: "Queries",
  items: [
    { id: "hr", icon: "📋", label: "HR Policies", count: 24, percent: 31, color: "#7c3aed" },
    { id: "finance", icon: "💳", label: "Finance", count: 18, percent: 23, color: "#0d9488" },
    { id: "engineering", icon: "⚙️", label: "Engineering", count: 15, percent: 19, color: "#2563eb" },
    { id: "company", icon: "🏢", label: "Company Policies", count: 11, percent: 14, color: "#ea580c" },
    { id: "benefits", icon: "🎁", label: "Benefits", count: 8, percent: 10, color: "#db2777" },
  ],
  footer: {
    label: "Top Category:",
    highlight: "HR Policies (31%)",
    highlightColor: "#7c3aed",
    note: "99.1% Answer Accuracy",
  },
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

// Semantic Search Grounding
export const semanticSearches = [
  {
    id: "semantic-1",
    query: "Home office setup & desk stipend",
    document: "Global Remote Work Policy 2026",
    match: 98,
  },
  {
    id: "semantic-2",
    query: "Vacation carryover rules",
    document: "Employee Leave & PTO Guidelines",
    match: 96,
  },
  {
    id: "semantic-3",
    query: "Office Wi-Fi & VPN setup",
    document: "IT Infrastructure Access Runbook",
    match: 92,
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