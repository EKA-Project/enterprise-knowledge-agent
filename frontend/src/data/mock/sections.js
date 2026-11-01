// @ts-check
// MOCK TABLE: document_sections. Disposable: deleted when the API is live.
// Shape: data-architecture.md section 4.4. One flat array holding the sections
// of ALL documents; pages filter by documentId and sort by index.
// This is the document's OWN text (not AI output). Only documentService reads it.
// Rich documents only: 001, 003, 015, 007, 009, 019. md/txt have no pages.

/** @type {import('../../types').DocumentSection[]} */
export const sections = [
  // ── doc_001 Corporate Governance & Compliance Policy ──
  { id: "sec_001_01", documentId: "doc_001", index: 1, title: "Code of Conduct & Whistleblower Protection", pageStart: 1, pageEnd: 2,
    content: "All employees must follow the Code of Conduct. Harassment and retaliation are grounds for termination. Reports made through the whistleblower channel are protected from retaliation." },
  { id: "sec_001_02", documentId: "doc_001", index: 2, title: "Information Security", pageStart: 3, pageEnd: 5,
    content: "Data at rest must be encrypted with AES-256 and data in transit must use TLS 1.3. Encryption keys follow a key rotation schedule of every 180 days. Access to production data follows the principle of least privilege." },
  { id: "sec_001_03", documentId: "doc_001", index: 3, title: "Remote Work (Work From Anywhere)", pageStart: 6, pageEnd: 7,
    content: "Employees may work from outside their home country for up to 90 days per rolling calendar year. Longer stays need written approval from People Operations." },
  { id: "sec_001_04", documentId: "doc_001", index: 4, title: "Audit & Review", pageStart: 7, pageEnd: 7,
    content: "This policy is reviewed annually by the Legal Operations Committee. Compliance audits sample records from every department." },

  // ── doc_003 Employee Handbook 2026 ──
  { id: "sec_003_01", documentId: "doc_003", index: 1, title: "Working Hours", pageStart: 1, pageEnd: 3,
    content: "Standard working hours are 9:00 to 17:30, with a flexible core window between 10:00 and 15:00. Overtime must be approved by a manager in advance." },
  { id: "sec_003_02", documentId: "doc_003", index: 2, title: "Leave & Time Off", pageStart: 4, pageEnd: 8,
    content: "Employees receive 24 days of paid annual leave per year. Sick leave is paid in full for up to 10 days per year." },
  { id: "sec_003_03", documentId: "doc_003", index: 3, title: "Benefits", pageStart: 9, pageEnd: 14,
    content: "The company provides health insurance, a pension contribution and an annual learning budget of $800 per employee." },
  { id: "sec_003_04", documentId: "doc_003", index: 4, title: "Home Office Stipend", pageStart: 15, pageEnd: 17,
    content: "The home office stipend is $1,500 per year. It covers a desk, chair, monitor and similar equipment, and must be claimed with receipts." },
  { id: "sec_003_05", documentId: "doc_003", index: 5, title: "Code of Conduct", pageStart: 18, pageEnd: 24,
    content: "All employees must follow the Code of Conduct described in the Corporate Governance & Compliance Policy." },

  // ── doc_015 Remote Work & Wellness Stipend Policy ──
  { id: "sec_015_01", documentId: "doc_015", index: 1, title: "Eligibility", pageStart: 1, pageEnd: 2,
    content: "Remote work is open to employees who have completed probation, for up to three days per week. Fully remote arrangements need approval from the department manager." },
  { id: "sec_015_02", documentId: "doc_015", index: 2, title: "Home Office Stipend", pageStart: 3, pageEnd: 4,
    content: "The annual home office stipend is $1,000. Unused amounts do not roll over to the following year." },
  { id: "sec_015_03", documentId: "doc_015", index: 3, title: "Wellness Programme", pageStart: 5, pageEnd: 6,
    content: "A separate wellness allowance of $300 per year covers gym memberships and fitness classes." },

  // ── doc_007 PostgreSQL High Availability Runbook (md: no pages) ──
  { id: "sec_007_01", documentId: "doc_007", index: 1, title: "Architecture", pageStart: null, pageEnd: null,
    content: "The PostgreSQL cluster runs one primary and two replicas managed by Patroni, with etcd storing cluster state. Applications connect through HAProxy, which always routes writes to the current primary." },
  { id: "sec_007_02", documentId: "doc_007", index: 2, title: "Automatic Failover", pageStart: null, pageEnd: null,
    content: "If the primary stops responding for 30 seconds, Patroni promotes the most up-to-date replica. Failover normally completes in under 60 seconds. Check replication lag before any manual switchover." },
  { id: "sec_007_03", documentId: "doc_007", index: 3, title: "Backups & Recovery", pageStart: null, pageEnd: null,
    content: "Base backups run nightly and WAL archiving is continuous, which allows point-in-time recovery to any second within the last 14 days." },
  { id: "sec_007_04", documentId: "doc_007", index: 4, title: "Manual Switchover", pageStart: null, pageEnd: null,
    content: "Use patronictl switchover during planned maintenance, and confirm with the team in the incident channel before running it." },

  // ── doc_009 Platform Architecture Overview ──
  { id: "sec_009_01", documentId: "doc_009", index: 1, title: "Service Architecture", pageStart: 1, pageEnd: 6,
    content: "The platform is built as microservices running on containerized Kubernetes clusters in three regions. Services communicate through an API gateway and an event bus." },
  { id: "sec_009_02", documentId: "doc_009", index: 2, title: "Zero-Trust Networking", pageStart: 7, pageEnd: 12,
    content: "Every service call is authenticated and authorized with mutual TLS, and no service is trusted because of its network location. This zero-trust architecture limits the impact of a compromised workload." },
  { id: "sec_009_03", documentId: "doc_009", index: 3, title: "Continuous Deployment", pageStart: 13, pageEnd: 18,
    content: "ArgoCD continuously reconciles each cluster with the configuration stored in Git. Changes reach production only through reviewed pull requests." },
  { id: "sec_009_04", documentId: "doc_009", index: 4, title: "Data Layer", pageStart: 19, pageEnd: 22,
    content: "Stateful data lives in managed PostgreSQL clusters, with Redis used for caching." },

  // ── doc_019 User Research Findings Q3 (txt: no pages) ──
  { id: "sec_019_01", documentId: "doc_019", index: 1, title: "Method", pageStart: null, pageEnd: null,
    content: "We ran 18 interviews with customers across three segments between July and September." },
  { id: "sec_019_02", documentId: "doc_019", index: 2, title: "Key Findings", pageStart: null, pageEnd: null,
    content: "Onboarding was the most common source of friction: 11 of 18 participants struggled to find their first document. Search was praised, but participants wanted clearer source citations." },
  { id: "sec_019_03", documentId: "doc_019", index: 3, title: "Recommendations", pageStart: null, pageEnd: null,
    content: "Simplify the first-run experience and show source citations next to every answer." },
];