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
    id: "doc-leave", topic: "leave", title: "Employee_Leave_Policy_2026.pdf",
    fileType: "PDF", category: "People & HR Operations", verified: true, page: 4, baseMatch: 94,
    keywords: ["time off", "leave", "vacation", "holiday", "pto", "days off", "annual leave", "sick"],
    excerpt: "Full-time employees accrue 24 days of paid annual leave per calendar year. Requests should be submitted at least two weeks in advance through the HR portal and approved by the line manager.",
    citation: { page: 4, lines: "98-116", section: "§4.2 Annual Leave Entitlement" },
  },
  {
    id: "doc-absence", topic: "leave", title: "Attendance_and_Absence_Guidelines.docx",
    fileType: "DOCX", category: "People & HR Operations", verified: true, page: 2, baseMatch: 86,
    keywords: ["absence", "sick", "time off", "leave", "attendance"],
    excerpt: "Unplanned absence, including sick leave of up to 10 days, must be reported to the line manager before the start of the working day. A medical certificate is needed after three consecutive days.",
    citation: { page: 2, lines: "22-29", section: "§2.1 Reporting an Absence" },
  },
  {
    id: "doc-handbook", topic: "onboarding", title: "New_Joiner_Handbook.pdf",
    fileType: "PDF", category: "People Ops", verified: true, page: 6, baseMatch: 93,
    keywords: ["first week", "new joiner", "onboarding", "orientation", "induction", "joining", "okta", "sso"],
    excerpt: "On Day 1 you receive Okta SSO access, your laptop and system accounts, then meet your team lead and complete the mandatory security and compliance training modules.",
    citation: { page: 6, lines: "31-40", section: "§6.1 Your First Week" },
  },
  {
    id: "doc-checklist", topic: "onboarding", title: "Onboarding_Checklist.docx",
    fileType: "DOCX", category: "People Ops", verified: true, page: 1, baseMatch: 85,
    keywords: ["first week", "onboarding", "checklist", "new joiner", "induction"],
    excerpt: "Day one: collect your building pass and laptop. Day two: complete security awareness training. By Friday: schedule a 30-day goals conversation with your manager.",
    citation: { page: 1, lines: "8-14", section: "§1.0 Week One Checklist" },
  },
  {
    id: "doc-remote", topic: "remote", title: "Remote_Work_Policy.pdf",
    fileType: "PDF", category: "People & HR Operations", verified: true, page: 3, baseMatch: 95,
    keywords: ["working from home", "work from home", "remote", "wfh", "hybrid", "home office", "stipend"],
    excerpt: "Employees may work from home up to three days per week with manager approval. A $1,500 annual home-office stipend covers ergonomic equipment, and core hours of 10:00 to 15:00 apply on remote days.",
    citation: { page: 3, lines: "44-58", section: "§3.1 Eligibility for Remote Work" },
  },
  {
    id: "doc-travel", topic: "travel", title: "Travel_and_Expense_Policy.pdf",
    fileType: "PDF", category: "Finance", verified: true, page: 5, baseMatch: 94,
    keywords: ["travel", "expenses", "reimbursement", "flights", "hotel", "claim"],
    excerpt: "Economy airfare and standard hotel accommodation are reimbursable. Meals are covered up to the daily limit, and receipts must be uploaded within 30 days of travel.",
    citation: { page: 5, lines: "60-72", section: "§5.3 Reimbursable Expenses" },
  },
  {
    id: "doc-laptop", topic: "laptop", title: "Acceptable_Use_and_Laptop_Policy.docx",
    fileType: "DOCX", category: "IT Security", verified: true, page: 2, baseMatch: 92,
    keywords: ["company laptop", "laptop", "device", "acceptable use", "equipment"],
    excerpt: "Company laptops must have disk encryption enabled and may not be used to install personal software. Loss or theft must be reported to IT Security within 24 hours.",
    citation: { page: 2, lines: "17-26", section: "§2.4 Company Devices" },
  },
  {
    id: "doc-health", topic: "health", title: "Health_Benefits_Guide.pdf",
    fileType: "PDF", category: "Benefits", verified: true, page: 8, baseMatch: 93,
    keywords: ["health benefits", "insurance", "medical", "dental", "wellness", "benefits"],
    excerpt: "All employees are covered by the group medical plan from their first day, with dependants eligible after enrolment. Dental and vision cover are optional add-ons.",
    citation: { page: 8, lines: "12-21", section: "§8.1 Medical Coverage" },
  },
  {
    id: "doc-failover", topic: "infra", title: "Emergency_Multi_Region_Failover_Runbook.pdf",
    fileType: "PDF", category: "Engineering & DevOps", verified: true, page: 4, baseMatch: 90,
    keywords: ["kubernetes", "failover", "dns", "ttl", "runbook", "outage"],
    excerpt: "To initiate an emergency multi-region failover, lower the DNS TTL to 45 seconds, promote the standby cluster and confirm health checks before shifting traffic.",
    citation: { page: 4, lines: "98-116", section: "§4.2 Failover Procedure" },
  },
  {
    id: "doc-soc2", topic: "security", title: "SOC2_Type_II_Security_Report.pdf",
    fileType: "PDF", category: "Security & Compliance", verified: true, page: 7, baseMatch: 91,
    keywords: ["soc 2", "soc2", "key rotation", "encryption", "compliance", "audit"],
    excerpt: "Encryption keys are rotated every 90 days under the SOC 2 Type II control framework, and every rotation is logged for audit review.",
    citation: { page: 7, lines: "20-26", section: "§7.3 Key Management" },
  },
];
