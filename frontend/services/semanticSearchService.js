// ---------- UI options ----------
export const SEARCH_MODES = [
  { id: "semantic", label: "Semantic" },
  { id: "keyword", label: "Keyword" },
  { id: "hybrid", label: "Hybrid (Best)" },
];

export const SOURCE_FILTERS = [
  { id: "all", label: "All Sources" },
  { id: "PDF", label: "PDF" },
  { id: "DOCX", label: "DOCX" },
];

export const SUGGESTED_CONCEPTS = [
  "time off work",
  "first week at the company",
  "working from home",
  "travel expenses",
  "company laptop rules",
  "health benefits",
];

export const HYBRID_PROMPTS = [
  "2026 WFH Stipend $1500",
  "SOC 2 Key Rotation",
  "Sick leave 10 days quota",
  "Kubernetes DNS TTL 45s",
  "Okta SSO Day 1 onboarding",
];

export const DEFAULT_QUERY = "time off work";

export const BETTER_SEARCH_TIPS = [
  {
    id: "natural",
    title: "Ask complete questions",
    tag: "Natural language",
    description: "Phrasing queries as natural questions yields richer semantic context.",
    example: "What is the annual leave policy?",
  },
  {
    id: "intent",
    title: "Describe intent & context",
    tag: "Concept matching",
    description: "Focus on intent and conceptual meaning rather than single keywords.",
    example: "How do I claim home office stipend?",
  },
];
