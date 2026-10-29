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


// ---------- Mock documents (demo data only, no backend) ----------
const DOCUMENTS = [
    {
    id: "doc-leave", topic: "leave", title: "2025 Employee Handbook & Leave Policy",
    fileType: "PDF", category: "People & HR Operations", verified: true, page: 4, baseMatch: 96,
    keywords: ["time off", "leave", "vacation", "holiday", "pto", "days off", "annual leave", "sick"],
    excerpt: "Full-time employees accrue 20 days of paid annual leave plus 10 days of paid sick/wellness leave per calendar year. Time off requests should be submitted at least two weeks in advance through the HR portal and approved by the line manager.",
    citation: { page: 4, lines: "98-116", section: "§4.2 Annual Leave Entitlement" },
  },
  {
    id: "doc-remote", topic: "remote", title: "2026 Global Remote Work & Flexible Hours Policy",
    fileType: "PDF", category: "People & HR Operations", verified: true, page: 8, baseMatch: 95,
    keywords: ["time off", "working from home", "work from home", "remote", "wfh", "hybrid", "home office", "stipend", "flexible hours"],
    excerpt: "Employees may work from home up to three days per week with manager approval, supported by a $1,500 home-office stipend. Flexible hours do not replace formal time off, so record any full day away in the HR portal.",
    citation: { page: 8, lines: "44-58", section: "§8.1 Eligibility for Remote Work" },
  },
  {
    id: "doc-playbook", topic: "health", title: "Employee Benefits, Health Insurance & Equity Playbook",
    fileType: "DOCX", category: "People & HR Operations", verified: true, page: 12, baseMatch: 88,
    keywords: ["time off", "benefits", "health benefits", "insurance", "equity", "leave", "medical", "wellness"],
    excerpt: "Your benefits package includes group health insurance, equity vesting and paid time off. Health benefits start on your first day, and up to 5 days of unused time off can be carried over to the next year.",
    citation: { page: 12, lines: "18-30", section: "§12.3 Benefits Summary" },
  },
  {
    id: "doc-handbook", topic: "onboarding", title: "New Joiner Handbook",
    fileType: "PDF", category: "People Ops", verified: true, page: 6, baseMatch: 93,
    keywords: ["first week", "new joiner", "onboarding", "orientation", "induction", "joining", "okta", "sso"],
    excerpt: "On Day 1 you receive Okta SSO access, your laptop and system accounts, then meet your team lead and complete the mandatory security and compliance training modules.",
    citation: { page: 6, lines: "31-40", section: "§6.1 Your First Week" },
  },
  {
    id: "doc-checklist", topic: "onboarding", title: "Onboarding Checklist",
    fileType: "DOCX", category: "People Ops", verified: true, page: 1, baseMatch: 85,
    keywords: ["first week", "onboarding", "checklist", "new joiner", "induction"],
    excerpt: "Day one: collect your building pass and laptop. Day two: complete security awareness training. By Friday: schedule a 30-day goals conversation with your manager.",
    citation: { page: 1, lines: "8-14", section: "§1.0 Week One Checklist" },
  },
  {
    id: "doc-travel", topic: "travel", title: "Travel & Expense Reimbursement Policy",
    fileType: "PDF", category: "Finance", verified: true, page: 5, baseMatch: 94,
    keywords: ["travel", "expenses", "reimbursement", "flights", "hotel", "claim"],
    excerpt: "Economy airfare and standard hotel accommodation are reimbursable. Meals are covered up to the daily limit, and receipts must be uploaded within 30 days of travel.",
    citation: { page: 5, lines: "60-72", section: "§5.3 Reimbursable Expenses" },
  },
  {
    id: "doc-laptop", topic: "laptop", title: "Acceptable Use & Company Laptop Policy",
    fileType: "DOCX", category: "IT Security", verified: true, page: 2, baseMatch: 92,
    keywords: ["company laptop", "laptop", "device", "acceptable use", "equipment"],
    excerpt: "Company laptops must have disk encryption enabled and may not be used to install personal software. Loss or theft must be reported to IT Security within 24 hours.",
    citation: { page: 2, lines: "17-26", section: "§2.4 Company Devices" },
  },
  {
    id: "doc-health", topic: "health", title: "Group Health Benefits Guide",
    fileType: "PDF", category: "Benefits", verified: true, page: 8, baseMatch: 93,
    keywords: ["health benefits", "insurance", "medical", "dental", "wellness", "benefits"],
    excerpt: "All employees are covered by the group medical plan from their first day, with dependants eligible after enrolment. Dental and vision cover are optional add-ons.",
    citation: { page: 8, lines: "12-21", section: "§8.1 Medical Coverage" },
  },
  {
    id: "doc-failover", topic: "infra", title: "Emergency Multi-Region Failover Runbook",
    fileType: "PDF", category: "Engineering & DevOps", verified: true, page: 4, baseMatch: 90,
    keywords: ["kubernetes", "failover", "dns", "ttl", "runbook", "outage"],
    excerpt: "To initiate an emergency multi-region failover, lower the DNS TTL to 45 seconds, promote the standby cluster and confirm health checks before shifting traffic.",
    citation: { page: 4, lines: "98-116", section: "§4.2 Failover Procedure" },
  },
  {
    id: "doc-soc2", topic: "security", title: "SOC 2 Type II Security & Data Governance Report",
    fileType: "PDF", category: "Security & Compliance", verified: true, page: 7, baseMatch: 91,
    keywords: ["soc 2", "soc2", "key rotation", "encryption", "compliance", "audit"],
    excerpt: "Encryption keys are rotated every 90 days under the SOC 2 Type II control framework, and every rotation is logged for audit review.",
    citation: { page: 7, lines: "20-26", section: "§7.3 Key Management" },
  },
];
// ---------- Grounded answers for top-ranked topics ----------
const TOPIC_ANSWERS = {
  leave: "Full-time employees receive 20 days of paid annual leave plus 10 days of paid sick/wellness leave per calendar year. Leave requests over 3 consecutive days require 48 hours notice via HR Portal.",  remote: "You can work from home up to three days a week with manager approval, and a $1,500 annual home-office stipend covers ergonomic equipment. Core hours of 10:00 to 15:00 apply on every remote day.",
  onboarding: "On your first day you receive Okta SSO access, your laptop and system accounts, then meet your team lead and finish the mandatory security training. A 30-day goals conversation with your manager should be scheduled by Friday.",
  travel: "Economy airfare and standard hotels are reimbursable, and meals are covered up to the daily limit. Upload receipts within 30 days of travel.",
  laptop: "Company laptops must use disk encryption and cannot be used to install personal software. Report loss or theft to IT Security within 24 hours.",
  health: "The group medical plan covers all employees from day one, and dependants can be enrolled. Dental and vision cover are optional add-ons.",
  infra: "To start an emergency multi-region failover, lower the DNS TTL to 45 seconds, promote the standby cluster and confirm health checks before shifting traffic.",
  security: "Encryption keys are rotated every 90 days under SOC 2 Type II controls, and each rotation is logged for audit review.",
};

// ---------- Search helpers ----------
const STOP_WORDS = new Set([
  "work", "from", "with", "what", "does", "have", "need", "into", "your", "company",
  "about", "that", "this", "the", "and", "for", "how", "our", "policy", "policies",
  "guidelines", "handbook", "document", "documents",
]);

const HIGHLIGHT_SKIP = new Set([
  "with", "what", "does", "have", "that", "this", "your", "about", "into", "the", "and", "for", "how", "our",
]);

// Lowercase words of 4+ letters, without filler words.
function tokenize(query) {
  return query.toLowerCase().split(/[^a-z0-9]+/).filter((t) => t.length >= 4 && !STOP_WORDS.has(t));
}

// How well one document fits the query in the chosen mode.
function scoreDocument(doc, query, tokens, mode) {
  const q = query.toLowerCase();
  const text = `${doc.title} ${doc.excerpt}`.toLowerCase();
  const literalHits = tokens.filter((t) => text.includes(t)).length;
  const conceptHits = doc.keywords.filter(
    (k) => q.includes(k) || tokens.some((t) => t.length >= 5 && k.includes(t)),
  ).length;
  if (mode === "keyword") return literalHits;
  if (mode === "semantic") return conceptHits;
  return literalHits + conceptHits;
}

// Main search. Returns ranked results plus the grounded answer for the top topic.
export function searchDocuments(query, { mode = "hybrid", source = "all" } = {}) {
  const trimmed = query.trim();
  if (!trimmed) return { results: [], answer: null };
  const tokens = tokenize(trimmed);

  const results = DOCUMENTS.filter((d) => source === "all" || d.fileType === source)
    .map((doc) => {
      const score = scoreDocument(doc, trimmed, tokens, mode);
      const penalty = (score >= 3 ? 0 : score === 2 ? 2 : 5) + (mode === "keyword" ? 3 : 0);
      return { ...doc, score, matchPercent: Math.min(99, doc.baseMatch - penalty) };
    })
    .filter((d) => d.score > 0)
    .sort((a, b) => b.score - a.score || b.matchPercent - a.matchPercent);

  return { results, answer: results[0] ? TOPIC_ANSWERS[results[0].topic] : null };
}

// Words and phrases to highlight inside excerpts and the answer.
const FILLER = new Set([...HIGHLIGHT_SKIP, "is", "are", "of", "a", "an", "to", "in", "on", "do", "i", "it", "at", "by", "or", "my"]);

export function getHighlightTerms(query) {
  const phrase = query.trim();
  if (!phrase) return [];
  const all = phrase.toLowerCase().split(/[^a-z0-9$]+/).filter(Boolean);
  const pairs = all
    .slice(0, -1)
    .map((w, i) => [w, all[i + 1]])
    .filter(([a, b]) => !FILLER.has(a) && !FILLER.has(b))
    .map(([a, b]) => `${a} ${b}`);
  const words = all.filter((w) => w.length >= 4 && !HIGHLIGHT_SKIP.has(w));
  return [phrase, ...pairs, ...words];
}
// ↑ Full phrase, neighbouring word pairs (like "time off") and single words.

// ---------- Search Intelligence (illustrative demo metrics) ----------
const TOTAL_INDEXED_DOCS = 23;

const MODE_PROFILES = {
  semantic: {
    engine: "VECTOR HNSW", model: "e5-large HNSW Vector",
    details: [["Embedding dimensions", "1024"], ["Top-k retrieved", "10"], ["Similarity threshold", "0.62"]],
  },
  keyword: {
    engine: "KEYWORD BM25", model: "BM25 Inverted Index",
    details: [["Analyzer", "Standard + stemming"], ["Top-k retrieved", "10"], ["Minimum should match", "1 term"]],
  },
  hybrid: {
    engine: "HYBRID RAG", model: "e5-large + BM25 (RRF)",
    details: [["Fusion method", "Reciprocal rank fusion"], ["Top-k retrieved", "10 per retriever"], ["Reranker", "Cross-encoder (demo)"]],
  },
};

export function getSearchStats({ query, mode, results }) {
  const profile = MODE_PROFILES[mode] ?? MODE_PROFILES.hybrid;
  return {
    engine: profile.engine,
    model: profile.model,
    details: profile.details,
    scanned: TOTAL_INDEXED_DOCS,
    chunks: results.length * 9 + (query.trim().length % 7),
    topRelevance: results[0]?.matchPercent ?? 0,
    latencyMs: 18 + ((query.trim().length * 7) % 23),
  };
}

// ---------- Recent searches ----------
export function createSeedRecentSearches(now = Date.now()) {
  const min = 60_000;
  const hour = 60 * min;
  return [
    { id: "seed-1", query: "annual leave policy", at: now - 10 * min },
    { id: "seed-2", query: "information security requirements", at: now - hour },
    { id: "seed-3", query: "employee onboarding process", at: now - 3 * hour },
    { id: "seed-4", query: "work from home rules", at: now - 26 * hour },
    { id: "seed-5", query: "time off from work", at: now - 50 * hour },
  ];
}

export function formatRelativeTime(timestamp, now = Date.now()) {
  const minutes = Math.floor((now - timestamp) / 60_000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  if (hours < 48) return "Yesterday";
  return `${Math.floor(hours / 24)}d ago`;
}