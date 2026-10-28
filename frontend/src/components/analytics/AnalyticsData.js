// Mock data for the Analytics page. Replace with API data later.

export const RANGE_OPTIONS = [
  { id: "7d", label: "7 Days" },
  { id: "30d", label: "30 Days" },
  { id: "90d", label: "90 Days" },
];

export const METRICS_BY_RANGE = {
  "7d": { accuracy: "99.9%", freshness: "95.1%", freshnessNote: "+0.8% this week", utilization: "88.9%" },
  "30d": { accuracy: "99.8%", freshness: "94.2%", freshnessNote: "+3.1% this quarter", utilization: "88.4%" },
  "90d": { accuracy: "99.6%", freshness: "92.7%", freshnessNote: "+6.4% vs prior", utilization: "86.9%" },
};

export const INGEST_CATEGORIES = [
  "Engineering & DevOps",
  "People & HR Operations",
  "Security & Compliance",
  "Product & Strategy",
  "Legal & Compliance",
];

export const INITIAL_FAILURES = [
  {
    id: "fail-1",
    fileName: "Kubernetes Cluster Auto-Healing Runbook.pdf",
    fileType: "PDF",
    size: "2.4 MB",
    failedAgo: "10 mins ago",
    department: "Engineering & DevOps",
    manager: "Elena Rostova",
    uploader: "Alex Morgan",
    cause: "Embedding Generation Rate Limit (OpenAI HTTP 429)",
    step: "Step 2/3: Semantic Vector Embeddings",
    log: [
      "chunker    214 chunks created",
      "embedder   request 2/3 rejected (HTTP 429)",
      "embedder   retry budget exhausted",
    ],
  },
];

export const INITIAL_CONTRADICTIONS = [
  {
    id: "c1",
    title: "Conflicting Remote Work Wellness Stipend Amount",
    severity: "High",
    sourceA: "2025 Employee Handbook",
    lead: "lists the annual home office stipend as",
    valueA: "$1,000 USD",
    middle: "whereas the newly ingested",
    sourceB: "2026 Global Remote Work Policy",
    verb: "designates",
    valueB: "$1,500 USD",
    affects: "2026 Global Remote Work Policy.pdf",
    action: "Deprecate 2025 Snippet",
  },
  {
    id: "c2",
    title: "Kubernetes Multi-Region Failover DNS TTL Mismatch",
    severity: "Medium",
    sourceA: "Microservices Architecture Guide",
    lead: "states failover TTL is",
    valueA: "120 seconds",
    middle: "while the",
    sourceB: "Corporate Governance & Compliance Policy",
    verb: "specifies",
    valueB: "45 seconds",
    affects: "Corporate Governance & Compliance Policy.pdf",
    action: "Sync with Elena Rostova",
  },
];

export const QUALITY_STATS = [
  { label: "Quality index", value: "98.6%" },
  { label: "Grounding rate", value: "99.2%" },
  { label: "Total citations", value: "4,820" },
];

export const MONTHLY_CONFLICTS = [
  { label: "Jul", value: 18 },
  { label: "Aug", value: 22 },
  { label: "Sep", value: 28 },
  { label: "Oct", value: 25 },
  { label: "Nov", value: 31 },
  { label: "Dec", value: 36 },
];

export const TOTAL_CITATIONS = 4820;

export const KNOWLEDGE_MASS = [
  { id: "hr", label: "HR & Remote", value: 38, color: "#1f6b4a" },
  { id: "sec", label: "Security & SOC2", value: 28, color: "#2e8b57" },
  { id: "eng", label: "Engineering SRE", value: 20, color: "#7fbf9f" },
  { id: "prod", label: "Product & Sales", value: 14, color: "#bfe0cd" },
];

export const GAP_STATS = [
  { label: "Unanswered queries", value: 4, note: "No source found", tone: "text-(--status-failure)" },
  { label: "Low-confidence queries", value: 12, note: "<70% confidence", tone: "text-(--status-warning)" },
  { label: "Missing knowledge topics", value: 3, note: "Recurring gaps", tone: "text-(--text-primary)" },
];

export const GAP_DISTRIBUTION = [
  { id: "security", label: "Security", value: 8, color: "#166534" },
  { id: "engineering", label: "Engineering", value: 5, color: "#16a34a" },
  { id: "hr", label: "HR Ops", value: 4, color: "#d97706" },
  { id: "legal", label: "Legal", value: 2, color: "#dc2626" },
];

export const GAP_QUERIES = [
  {
    id: "g1", query: "Salesforce CRM Webhook Pipeline Sync",
    sub: "Unanswered — Zero matching source documents", volume: 48,
    status: "24% (Unanswered)", tone: "failure", cluster: "Engineering & DevOps", action: "+ Ingest Source RFC",
  },
  {
    id: "g2", query: "Singapore APAC Work-From-Anywhere Tax Residency",
    sub: "Low Confidence — Missing APAC guidelines", volume: 32,
    status: "18% (Low Conf)", tone: "warning", cluster: "People & HR Operations", action: "+ Ingest APAC Guide",
  },
  {
    id: "g3", query: "SOC 2 Key Rotation Break-Glass Procedure",
    sub: "Low Confidence — Missing KMS runbook", volume: 19,
    status: "57% (Missing Topic)", tone: "warning", cluster: "Security & Compliance", action: "+ Draft Article",
  },
  {
    id: "g4", query: "GDPR Data Subject Request Turnaround",
    sub: "Unanswered — No retention policy found", volume: 14,
    status: "21% (Unanswered)", tone: "failure", cluster: "Legal & Compliance", action: "+ Ingest Policy",
  },
];

export const SENTIMENT = [
  { id: "helpful", label: "Helpful", emoji: "👍", count: 4048, pct: 84, color: "#16a34a" },
  { id: "refined", label: "Refined", emoji: "✏️", count: 530, pct: 11, color: "#2563eb" },
  { id: "disliked", label: "Disliked", emoji: "👎", count: 242, pct: 5, color: "#d97706" },
];

export const DOCUMENT_MATRIX = [
  { id: "d1", type: "PDF", name: "Corporate Governance & Compliance Policy", owner: "Legal Operations Committee", category: "People & HR Operations", grounding: "99.4%", chunks: 312, cited: 128 },
  { id: "d2", type: "MD", name: "Kubernetes Microservices Architecture Guide", owner: "Marcus Chen (Staff Architect)", category: "Engineering & DevOps", grounding: "99.4%", chunks: 268, cited: 97 },
  { id: "d3", type: "PDF", name: "2026 Global Remote Work Policy", owner: "Sophia Sterling (VP People & Culture)", category: "People & HR Operations", grounding: "99.4%", chunks: 154, cited: 211 },
  { id: "d4", type: "DOCX", name: "Employee Benefits, Health Insurance & Equity Playbook", owner: "David Vance (Head of Total Rewards)", category: "People & HR Operations", grounding: "99.4%", chunks: 340, cited: 176 },
  { id: "d5", type: "PDF", name: "Customer Interview Synthesis Report", owner: "Maya Narang (Lead Designer)", category: "Product & Strategy", grounding: "99.2%", chunks: 121, cited: 64 },
  { id: "d6", type: "FIG", name: "Brand Voice & Visual Guidelines", owner: "Maya Narang (Lead Designer)", category: "Product & Brand", grounding: "99.1%", chunks: 88, cited: 52 },
];

export const USAGE_STATS = [
  { label: "Total queries", value: "14,950" },
  { label: "Active users", value: "42" },
  { label: "Documents accessed", value: "1,284" },
  { label: "Avg queries / user", value: "114.7" },
];

// Builds the CSV text used by the Export Report button.
export function buildReportCsv({ range, metrics, alertCount }) {
  const rows = [
    ["Metric", "Value"],
    ["Range", range],
    ["Grounding accuracy", metrics.accuracy],
    ["Knowledge freshness", metrics.freshness],
    ["Contradictions flagged", alertCount],
    ["Knowledge utilization", metrics.utilization],
    ["Quality index", "98.6%"],
    ["Total citations", TOTAL_CITATIONS],
  ];
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}