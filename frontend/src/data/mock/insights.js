// @ts-check
// MOCK TABLE: document_insights. Disposable: deleted when the API is live.
// Shape: data-architecture.md section 4.5. Only insightService reads it.
// `embedding` is never part of the API shape, so it is not here.
//
// Honesty rules the data follows:
//  - every takeaway and section summary cites a section of the SAME document
//  - every keyword term literally appears in that document's section text
//  - pending rows have a null summary and empty lists (the UI says
//    "summary is being prepared"; it never shows invented text)
// Documents with no row here (e.g. doc_006) are treated as pending by the service.

/** @type {import('../../types').DocumentInsight[]} */
export const insights = [
  {
    documentId: "doc_001", status: "ready", generatedAt: "2026-10-22T11:12:00Z", model: "mock-model-v1",
    summary: "Defines conduct and whistleblower rules, encryption standards and the 90-day limit on working abroad.",
    takeaways: [
      { text: "Harassment and retaliation are grounds for termination.", sectionId: "sec_001_01" },
      { text: "Data at rest uses AES-256 and in transit uses TLS 1.3.", sectionId: "sec_001_02" },
      { text: "Working abroad is capped at 90 days per rolling year.", sectionId: "sec_001_03" },
    ],
    sectionSummaries: [
      { sectionId: "sec_001_01", summary: "Sets the Code of Conduct and protects whistleblowers from retaliation.", highlights: ["Harassment is a termination offence", "Whistleblower channel is protected"] },
      { sectionId: "sec_001_02", summary: "Sets encryption standards and a key rotation schedule.", highlights: ["AES-256 at rest", "TLS 1.3 in transit", "Keys rotate every 180 days"] },
      { sectionId: "sec_001_03", summary: "Limits on working outside the home country.", highlights: ["90 days per year", "Longer stays need approval"] },
      { sectionId: "sec_001_04", summary: "Explains who reviews the policy and how audits work.", highlights: ["Annual review", "Audits sample every department"] },
    ],
    keywords: [
      { term: "remote work", weight: 0.92, kind: "topic" },
      { term: "AES-256", weight: 0.81, kind: "entity" },
      { term: "Code of Conduct", weight: 0.78, kind: "entity" },
      { term: "whistleblower", weight: 0.7, kind: "topic" },
      { term: "TLS 1.3", weight: 0.66, kind: "entity" },
      { term: "key rotation", weight: 0.6, kind: "topic" },
    ],
    suggestedQuestions: ["How long can I work abroad?", "What encryption is required?", "Who is protected when reporting misconduct?"],
  },
  {
    documentId: "doc_003", status: "ready", generatedAt: "2026-10-05T10:20:00Z", model: "mock-model-v1",
    summary: "Covers working hours, leave, benefits and the home office stipend for all employees.",
    takeaways: [
      { text: "Employees receive 24 days of paid annual leave per year.", sectionId: "sec_003_02" },
      { text: "The home office stipend is $1,500 per year.", sectionId: "sec_003_04" },
      { text: "Core working hours are flexible between 10:00 and 15:00.", sectionId: "sec_003_01" },
    ],
    sectionSummaries: [
      { sectionId: "sec_003_01", summary: "Standard hours with a flexible core window.", highlights: ["9:00 to 17:30", "Overtime needs prior approval"] },
      { sectionId: "sec_003_02", summary: "Annual and sick leave entitlements.", highlights: ["24 days annual leave", "10 days sick leave"] },
      { sectionId: "sec_003_03", summary: "Benefits offered to employees.", highlights: ["Health insurance", "$800 learning budget"] },
      { sectionId: "sec_003_04", summary: "What the home office stipend covers and how to claim it.", highlights: ["$1,500 per year", "Receipts required"] },
      { sectionId: "sec_003_05", summary: "Points to the Code of Conduct in the governance policy.", highlights: ["Applies to all employees"] },
    ],
    keywords: [
      { term: "home office stipend", weight: 0.9, kind: "topic" },
      { term: "annual leave", weight: 0.85, kind: "topic" },
      { term: "sick leave", weight: 0.6, kind: "topic" },
      { term: "working hours", weight: 0.55, kind: "topic" },
      { term: "Code of Conduct", weight: 0.5, kind: "entity" },
    ],
    suggestedQuestions: ["How many days of annual leave do I get?", "How much is the home office stipend?"],
  },
  {
    documentId: "doc_015", status: "ready", generatedAt: "2026-10-10T09:15:00Z", model: "mock-model-v1",
    summary: "Sets who may work remotely, the annual home office stipend and the wellness allowance.",
    takeaways: [
      { text: "Remote work is allowed up to three days per week after probation.", sectionId: "sec_015_01" },
      { text: "The annual home office stipend is $1,000.", sectionId: "sec_015_02" },
      { text: "A separate wellness allowance of $300 per year is available.", sectionId: "sec_015_03" },
    ],
    sectionSummaries: [
      { sectionId: "sec_015_01", summary: "Who can work remotely and how often.", highlights: ["After probation", "Three days per week"] },
      { sectionId: "sec_015_02", summary: "The stipend amount and the no-rollover rule.", highlights: ["$1,000 per year", "No rollover"] },
      { sectionId: "sec_015_03", summary: "What the wellness allowance covers.", highlights: ["$300 per year", "Gym and fitness classes"] },
    ],
    keywords: [
      { term: "home office stipend", weight: 0.93, kind: "topic" },
      { term: "remote work", weight: 0.88, kind: "topic" },
      { term: "wellness allowance", weight: 0.7, kind: "topic" },
      { term: "probation", weight: 0.4, kind: "topic" },
    ],
    suggestedQuestions: ["How many days can I work remotely?", "How much is the home office stipend?"],
  },
  {
    documentId: "doc_007", status: "ready", generatedAt: "2026-10-10T09:18:00Z", model: "mock-model-v1",
    summary: "Explains how Patroni runs automatic PostgreSQL failover, backups and manual switchover.",
    takeaways: [
      { text: "Patroni promotes the most up-to-date replica when the primary stops responding for 30 seconds.", sectionId: "sec_007_02" },
      { text: "WAL archiving allows point-in-time recovery within the last 14 days.", sectionId: "sec_007_03" },
      { text: "Applications reach the primary through HAProxy.", sectionId: "sec_007_01" },
    ],
    sectionSummaries: [
      { sectionId: "sec_007_01", summary: "One primary and two replicas behind HAProxy.", highlights: ["Managed by Patroni", "etcd stores cluster state"] },
      { sectionId: "sec_007_02", summary: "How automatic failover is triggered and how long it takes.", highlights: ["30 second trigger", "Under 60 seconds to complete"] },
      { sectionId: "sec_007_03", summary: "Nightly backups with continuous WAL archiving.", highlights: ["14 day recovery window"] },
      { sectionId: "sec_007_04", summary: "Use patronictl for planned maintenance.", highlights: ["Confirm with the team first"] },
    ],
    keywords: [
      { term: "Patroni", weight: 0.9, kind: "entity" },
      { term: "failover", weight: 0.88, kind: "topic" },
      { term: "point-in-time recovery", weight: 0.7, kind: "topic" },
      { term: "replication lag", weight: 0.5, kind: "topic" },
      { term: "HAProxy", weight: 0.45, kind: "entity" },
      { term: "PostgreSQL", weight: 0.4, kind: "entity" },
    ],
    suggestedQuestions: ["How does Patroni handle PostgreSQL failover?", "How far back can we recover the database?"],
  },
  {
    documentId: "doc_009", status: "ready", generatedAt: "2026-10-02T09:20:00Z", model: "mock-model-v1",
    summary: "Describes the microservices platform, zero-trust networking and continuous deployment with ArgoCD.",
    takeaways: [
      { text: "Zero-trust network architecture authenticates every service call with mutual TLS.", sectionId: "sec_009_02" },
      { text: "ArgoCD continuously reconciles each cluster with the configuration stored in Git.", sectionId: "sec_009_03" },
      { text: "Services run as microservices on Kubernetes clusters in three regions.", sectionId: "sec_009_01" },
    ],
    sectionSummaries: [
      { sectionId: "sec_009_01", summary: "The platform is built from microservices on Kubernetes.", highlights: ["Three regions", "API gateway and event bus"] },
      { sectionId: "sec_009_02", summary: "No service is trusted by network location alone.", highlights: ["Mutual TLS on every call"] },
      { sectionId: "sec_009_03", summary: "Git is the source of truth for deployments.", highlights: ["Reviewed pull requests only"] },
      { sectionId: "sec_009_04", summary: "Where stateful data is kept.", highlights: ["Managed PostgreSQL", "Redis cache"] },
    ],
    keywords: [
      { term: "Kubernetes", weight: 0.9, kind: "entity" },
      { term: "zero-trust", weight: 0.85, kind: "topic" },
      { term: "ArgoCD", weight: 0.8, kind: "entity" },
      { term: "microservices", weight: 0.75, kind: "topic" },
      { term: "mutual TLS", weight: 0.5, kind: "topic" },
      { term: "PostgreSQL", weight: 0.4, kind: "entity" },
    ],
    suggestedQuestions: ["How does ArgoCD deploy changes?", "What does zero-trust mean for our services?"],
  },
  {
    documentId: "doc_019", status: "ready", generatedAt: "2026-10-16T09:14:00Z", model: "mock-model-v1",
    summary: "Interview findings show onboarding is the biggest friction point and users want clearer source citations.",
    takeaways: [
      { text: "11 of 18 participants struggled with onboarding.", sectionId: "sec_019_02" },
      { text: "Show source citations next to every answer.", sectionId: "sec_019_03" },
    ],
    sectionSummaries: [
      { sectionId: "sec_019_01", summary: "18 customer interviews across three segments.", highlights: ["July to September"] },
      { sectionId: "sec_019_02", summary: "Onboarding was the most common source of friction.", highlights: ["11 of 18 participants", "Search was praised"] },
      { sectionId: "sec_019_03", summary: "Simplify first-run and surface citations.", highlights: ["Citations beside answers"] },
    ],
    keywords: [
      { term: "onboarding", weight: 0.9, kind: "topic" },
      { term: "source citations", weight: 0.8, kind: "topic" },
      { term: "interviews", weight: 0.6, kind: "topic" },
    ],
    suggestedQuestions: ["What was the biggest onboarding problem?"],
  },

  // Pending: no summary yet, so the UI shows "summary is being prepared"
  { documentId: "doc_004", status: "pending", generatedAt: null, model: null, summary: null, takeaways: [], sectionSummaries: [], keywords: [], suggestedQuestions: [] },
  { documentId: "doc_008", status: "pending", generatedAt: null, model: null, summary: null, takeaways: [], sectionSummaries: [], keywords: [], suggestedQuestions: [] },
  { documentId: "doc_018", status: "pending", generatedAt: null, model: null, summary: null, takeaways: [], sectionSummaries: [], keywords: [], suggestedQuestions: [] },
];