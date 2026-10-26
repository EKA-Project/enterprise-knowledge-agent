// Capacity baseline (matches the video). Do not remove: CapacityCard / FormatCards read it.
export const storageSummary = {
  usedGb: 14.3,
  totalGb: 50,
  freeGb: 35.7,
  documents: 23,
  reclaimableGb: 0.7,
  softDeleted: 2,
};

// `share` = % of used space. Bar width = gb / totalGb.
export const storageFormats = [
  { key: 'PDF', gb: 7.2, files: 4, share: 50.3, color: '#ee4544', tile: 'bg-[#fde2e1] text-[#d9373f]' },
  { key: 'DOCX', gb: 3.4, files: 6, share: 23.8, color: '#2563eb', tile: 'bg-[#e0ecff] text-[#2563eb]' },
  { key: 'MD', gb: 1.6, files: 4, share: 11.2, color: '#08966a', tile: 'bg-[#d9f7ea] text-[#08966a]' },
  { key: 'CSV', gb: 1.2, files: 5, share: 8.4, color: '#0c82c0', tile: 'bg-[#e0f1fd] text-[#0c82c0]' },
  { key: 'TXT', gb: 0.8, files: 4, share: 5.6, color: '#d87708', tile: 'bg-[#fff0c0] text-[#b86b00]' },
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

// ---- Mock documents (names/sizes/dates read from the video; file names are partly guessed) ----
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
  mk('DOCX', 'Enterprise Sales Battlecards & Objection Matrix (Master)', 'Enterprise_Sales_Battlecards_2026_Q3_Master.docx', 'Sales & Go-To-Market', 56.0, 'Restored just now', 'Just now', 0, 'Ready'),
  mk('DOCX', 'Enterprise Sales Battlecards & Objection Matrix (Duplicate Copy)', 'Enterprise_Sales_Battlecards_2026_Q3_Master_Copy(1).docx', 'Sales & Go-To-Market', 56.0, '45 days ago', '90 days ago', 45, 'Ready', { group: 'es' }),
  mk('PDF', 'Company Foundations & Operating Principles 2026', 'Company_Foundations_Handbook_v4_Final.pdf', 'General Knowledge', 38.0, '2 days ago', 'Yesterday', 2, 'Ready', { isProtected: true, note: 'Core mandatory company foundation document' }),
  mk('PDF', 'Corporate Governance & Whistleblower Charter (Binding Policy)', 'Corporate_Governance_Whistleblower_Charter.pdf', 'Legal & Finance', 24.0, '3 days ago', '2 days ago', 3, 'Ready', { isProtected: true, note: 'Binding legal policy document' }),
  mk('CSV', 'Q4 Financial Ledger & Procurement Reconciliation (Unparsed Logs)', 'Q4_Financial_Ledger_And_Procurement_Logs.csv', 'Legal & Finance', 22.0, '3 hours ago', 'Never cited', 0, 'Failed'),
  mk('DOCX', 'Kafka Event-Driven Architecture & Resiliency Guidelines', 'Kafka_Event_Streams_Architecture_Whitepaper.docx', 'Engineering & DevOps', 21.0, '105 days ago', '115 days ago', 105, 'Outdated'),
  mk('TXT', 'Customer NPS Survey Transcripts & Speech Recognition Raw Data', 'Customer_Survey_Raw_Transcripts_Q2_Bulk.txt', 'General Knowledge', 19.0, '1 hour ago', 'Never cited', 0, 'Failed'),
  mk('DOCX', 'Candidate Hiring Scorecards & Legacy Interview Rubric', 'Candidate_Hiring_Scorecards_Old_Rubric.docx', 'General Knowledge', 18.0, 'Restored just now', 'Just now', 0, 'Ready'),
  mk('TXT', 'Legacy Cisco VPN Bastion Authentication Protocols (Obsolete)', 'Legacy_VPN_Access_Protocols_2021_Obsolete.txt', 'Engineering & DevOps', 18.0, '142 days ago', '165 days ago', 142, 'Outdated'),
  mk('CSV', 'Global 3rd-Party Vendor Risk & Security Assessments', 'Global_Vendor_Risk_Assessment_Catalog.csv', 'Security & Compliance', 17.5, '2 hours ago', 'Never cited', 0, 'Failed'),
  mk('DOCX', '2024 Travel & Remote Expense Guidelines (v1 Backup)', '2024_Travel_Reimbursement_Guidelines_v1_backup.docx', 'People & HR Operations', 16.0, '140 days ago', '145 days ago', 140, 'Outdated', { group: 'travel' }),
  mk('DOCX', 'Standard Enterprise MSA Template & Vendor Terms (Draft)', 'Standard_Enterprise_MSA_Template_Draft_2025.docx', 'Legal & Finance', 15.0, '94 days ago', '102 days ago', 94, 'Outdated'),
  mk('MD', 'Enterprise UX Design Tokens & Component Stylesheet Raw Exports', 'Design_Tokens_And_Figma_Raw_Exports_v2.md', 'Product Strategy & Design', 14.0, '5 days ago', '4 days ago', 5, 'Ready'),
  mk('MD', 'Microservices gRPC Protocol Buffers & Proto Schema Contracts', 'Microservices_gRPC_Protocol_Buffers_Contracts.md', 'Engineering & DevOps', 12.0, '12 days ago', '8 days ago', 12, 'Ready'),
  mk('TXT', 'Serverless Edge Gateway Benchmark Latency Logs (2024)', 'Serverless_Worker_Gateway_Benchmark_Summary.txt', 'Engineering & DevOps', 11.0, '160 days ago', '175 days ago', 160, 'Outdated'),
  mk('MD', 'CI/CD Canary Deployment Prometheus Alert Rules & Runbook', 'CI_CD_Canary_Deployment_Prometheus_Alerts.md', 'Engineering & DevOps', 9.0, '112 days ago', '138 days ago', 112, 'Outdated'),
  mk('TXT', 'Employee Healthcare, Dental & 401k Benefits Guide (2024)', 'Employee_Onboarding_Benefits_Summary_2024.txt', 'People & HR Operations', 7.8, '183 days ago', '218 days ago', 183, 'Outdated'),
  // Already in the Recycle Bin when the page opens
  mk('CSV', 'Vector Index Embedding Weights Shard #392', 'Vector_Index_Embeddings_Batch_Shard_392.csv', 'Engineering & DevOps', 24.0, '30 days ago', '30 days ago', 30, 'Ready', { startsInBin: true, deleted: 'Oct 14, 2026 (Just now)' }),
  mk('PDF', 'Kubernetes Cluster Auto-Healing & Incident Escalation Runbook', 'Kubernetes_Cluster_AutoHealing_Incident_Runbook.pdf', 'Engineering & DevOps', 28.0, '30 days ago', '30 days ago', 30, 'Ready', { startsInBin: true, deleted: 'Oct 14, 2026 (Just now)' }),
];