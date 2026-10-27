// Capacity baseline (new reference: 14.2 GB, 22 documents)
export const storageSummary = { usedGb: 14.2, totalGb: 50, documents: 22 };

// "By Department" view (gb / share read from the video)
export const departments = [
  { key: 'Engineering & DevOps', docs: 10, gb: 5.9, share: 41.5, color: '#2563eb' },
  { key: 'Security & Compliance', docs: 3, gb: 4.5, share: 31.7, color: '#dc2626' },
  { key: 'Sales & Go-To-Market', docs: 1, gb: 1.0, share: 7.0, color: '#d97706' },
  { key: 'General Knowledge', docs: 3, gb: 1.4, share: 9.9, color: '#7c3aed' },
  { key: 'Legal & Finance', docs: 2, gb: 0.7, share: 4.9, color: '#0891b2' },
  { key: 'People & HR Operations', docs: 2, gb: 0.4, share: 2.8, color: '#0f9d6b' },
  { key: 'Product Strategy & Design', docs: 1, gb: 0.3, share: 2.1, color: '#c026d3' },
];

// "By File Format" view
export const formats = [
  { key: 'PDF', label: 'PDF Documents', files: 4, gb: 5.3, share: 37.3, color: '#ee4544' },
  { key: 'DOCX', label: 'Word Documents', files: 5, gb: 2.3, share: 16.2, color: '#2563eb' },
  { key: 'MD', label: 'Markdown Specs', files: 4, gb: 0.8, share: 5.6, color: '#08966a' },
  { key: 'CSV', label: 'CSV Data Tables', files: 5, gb: 4.8, share: 33.8, color: '#0c82c0' },
  { key: 'TXT', label: 'Text Transcripts', files: 4, gb: 1.0, share: 7.0, color: '#d87708' },
];

export const formatMb = (mb) => (mb >= 1024 ? `${(mb / 1024).toFixed(1)} GB` : `${mb.toFixed(1)} MB`);

// Duplicate groups (order = order shown in the Duplicates tab)
export const dupGroups = {
  es: {
    title: 'Enterprise Sales Battlecards & Objection Matrix',
    note: 'Exact duplicate copy found · Identical file content uploaded across multiple folders',
  },
  travel: {
    title: '2024 Travel & Remote Expense Guidelines',
    note: 'Outdated backup revision · Replaced by the 2025/2026 active expense policy',
  },
  pg: {
    title: 'PostgreSQL Production Telemetry & Database Dump',
    note: 'Redundant database snapshot · Duplicate export copy taking extra storage',
  },
};

// ---- Mock documents (names/sizes/dates read from the videos; file names partly guessed) ----
let _n = 0;
const mk = (type, name, file, dept, sizeMb, opened, cited, idleDays, status, extra = {}) => ({
  id: `sf-${++_n}`,
  type, name, file, dept, sizeMb, opened, cited, idleDays, status,
  isProtected: false,
  ...extra,
});

export const storageFiles = [
  mk('PDF', 'Global Compliance & Security Audit 2025 (Full Archive)', 'Global_Compliance_Audit_2025_Full_Archive.pdf', 'Security & Compliance', 148.0, '104 days ago', '112 days ago', 104, 'Ready'),
  mk('PDF', 'SOC 2 Type II Security & Data Governance Compliance Report', 'SOC_2_Type_II_Security_Governance_Report_2026.pdf', 'Security & Compliance', 82.0, 'Yesterday', '2 days ago', 1, 'Ready', { isProtected: true, note: 'Mandatory security compliance document' }),
  mk('CSV', 'PostgreSQL Production Telemetry & WAL Partition Metrics', 'PostgreSQL_WAL_Streaming_Replication_Database_Dump.csv', 'Engineering & DevOps', 74.0, 'Restored just now', 'Just now', 0, 'Ready'),
  mk('CSV', 'PostgreSQL Production Telemetry & WAL Partition Metrics', 'PostgreSQL_WAL_Streaming_Replication_Database_Dump.csv', 'Engineering & DevOps', 74.0, '85 days ago', '92 days ago', 85, 'Ready', { group: 'pg' }),
  mk('CSV', 'PostgreSQL Production Telemetry & WAL Partition Metrics (Duplicate Copy)', 'PostgreSQL_WAL_Streaming_Replication_Database_Dump_copy.csv', 'Engineering & DevOps', 74.0, '88 days ago', '95 days ago', 88, 'Ready', { group: 'pg' }),
  mk('DOCX', 'Enterprise Sales Battlecards & Objection Matrix (Master)', 'Enterprise_Sales_Battlecards_2026_Q3_Master.docx', 'Sales & Go-To-Market', 56.0, '4 days ago', '3 days ago', 4, 'Ready'),
  mk('DOCX', 'Enterprise Sales Battlecards & Objection Matrix (Duplicate Copy)', 'Enterprise_Sales_Battlecards_2026_Q3_Master_Copy(1).docx', 'Sales & Go-To-Market', 56.0, '45 days ago', '90 days ago', 45, 'Ready', { group: 'es' }),
  mk('PDF', 'Executive Q3 All-Hands Vision, OKRs & Strategy Keynote', 'Executive_Q3_All-Hands_Presentation_Deck.pdf', 'General Knowledge', 48.0, '6 days ago', '5 days ago', 6, 'Ready'),
  mk('PDF', 'Company Foundations & Operating Principles 2026', 'Company_Foundations_Handbook_v4_Final.pdf', 'General Knowledge', 38.0, '2 days ago', 'Yesterday', 2, 'Ready', { isProtected: true, note: 'Core mandatory company foundation document' }),
  mk('CSV', 'Kubernetes Cluster Node Crash Logs & High-Frequency Metrics', 'Kubernetes_Cluster_AutoHealing_Telemetry.csv', 'Engineering & DevOps', 31.0, '98 days ago', '128 days ago', 98, 'Ready'),
  mk('PDF', 'Kubernetes Cluster Auto-Healing & Incident Escalation Runbook', 'Kubernetes_Cluster_AutoHealing_Incident_Runbook.pdf', 'Engineering & DevOps', 28.0, 'Today, 10 mins ago', 'Never cited', 0, 'Failed'),
  mk('CSV', 'Vector Index Embedding Weights Shard #392', 'Vector_Index_Embeddings_Batch_Shard_392.csv', 'Engineering & DevOps', 24.0, 'Restored just now', 'Just now', 0, 'Ready'),
  mk('PDF', 'Corporate Governance & Whistleblower Charter (Binding Policy)', 'Corporate_Governance_Whistleblower_Charter.pdf', 'Legal & Finance', 24.0, '3 days ago', '2 days ago', 3, 'Ready', { isProtected: true, note: 'Binding legal policy document' }),
  mk('CSV', 'Q4 Financial Ledger & Procurement Reconciliation (Unparsed Logs)', 'Q4_Financial_Ledger_And_Procurement_Logs.csv', 'Legal & Finance', 22.0, '3 hours ago', 'Never cited', 0, 'Failed'),
  mk('DOCX', 'Kafka Event-Driven Architecture & Resiliency Guidelines', 'Kafka_Event_Streams_Architecture_Whitepaper.docx', 'Engineering & DevOps', 21.0, 'Restored just now', 'Just now', 0, 'Ready'),
  mk('TXT', 'Customer NPS Survey Transcripts & Speech Recognition Raw Data', 'Customer_Survey_Raw_Transcripts_Q2_Bulk.txt', 'General Knowledge', 19.0, '1 hour ago', 'Never cited', 0, 'Failed'),
  mk('TXT', 'Legacy Cisco VPN Bastion Authentication Protocols (Obsolete)', 'Legacy_VPN_Access_Protocols_2021_Obsolete.txt', 'Engineering & DevOps', 18.0, '142 days ago', '165 days ago', 142, 'Outdated'),
  mk('CSV', 'Global 3rd-Party Vendor Risk & Security Assessments', 'Global_Vendor_Risk_Assessment_Catalog.csv', 'Security & Compliance', 17.5, '2 hours ago', 'Never cited', 0, 'Failed'),
  mk('DOCX', '2024 Travel & Remote Expense Guidelines (v1 Backup)', '2024_Travel_Reimbursement_Guidelines_v1_backup.docx', 'People & HR Operations', 16.0, '140 days ago', '145 days ago', 140, 'Outdated', { group: 'travel' }),
  mk('DOCX', 'Standard Enterprise MSA Template & Vendor Terms (Draft)', 'Standard_Enterprise_MSA_Template_Draft_2025.docx', 'Legal & Finance', 15.0, '94 days ago', '102 days ago', 94, 'Outdated'),
  mk('MD', 'Enterprise UX Design Tokens & Component Stylesheet Raw Exports', 'Design_Tokens_And_Figma_Raw_Exports_v2.md', 'Product Strategy & Design', 14.0, '5 days ago', '4 days ago', 5, 'Ready'),
  mk('MD', 'Microservices gRPC Protocol Buffers & Proto Schema Contracts', 'Microservices_gRPC_Protocol_Buffers_Contracts.md', 'Engineering & DevOps', 12.0, '12 days ago', '8 days ago', 12, 'Ready'),
  mk('TXT', 'Serverless Edge Gateway Benchmark Latency Logs (2024)', 'Serverless_Worker_Gateway_Benchmark_Summary.txt', 'Engineering & DevOps', 11.0, '160 days ago', '175 days ago', 160, 'Outdated'),
  mk('MD', 'CI/CD Canary Deployment Prometheus Alert Rules & Runbook', 'CI_CD_Canary_Deployment_Prometheus_Alerts.md', 'Engineering & DevOps', 9.0, '112 days ago', '138 days ago', 112, 'Outdated'),
  mk('TXT', 'Employee Healthcare, Dental & 401k Benefits Guide (2024)', 'Employee_Onboarding_Benefits_Summary_2024.txt', 'People & HR Operations', 7.8, '183 days ago', '218 days ago', 183, 'Outdated'),
  // Already in the Recycle Bin when the page opens (video: 2FA purge demo file)
  mk('PDF', 'eka_departments_2026-10-12 (2)', 'eka_departments_2026-10-12__2_.pdf', 'General Knowledge', 2.4, '—', '—', 0, 'Ready', { startsInBin: true, deleted: 'Oct 14, 2026 (Just now)' }),
];

















