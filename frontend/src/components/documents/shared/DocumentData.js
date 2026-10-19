// Dummy document data for the Documents page.
// Shape is kept ready for future documentService/API integration.
//
// Order, titles, formats, sizes and the pin / save flags follow the reference
// video (20 docs: 13 PDF, 5 saved, 3 pinned). Comments mark values we could
// not read in the video.

const uploadDescription = (name, area) =>
  `Official document regarding ${name}. Vectorized and indexed for ${area} enterprise search and citations.`;

export const documents = [
  // ---- Uploaded documents ----
  {
    id: 'doc-1',
    title: 'eka_chat_architecture-withfeedback',
    format: 'PDF',
    category: 'Engineering & DevOps',
    description: uploadDescription('eka_chat_architecture-withfeedback', 'Engineering & DevOps'),
    readTime: '4 min read',
    size: '142 KB',
    pages: 7,
    status: 'Indexed',
    author: 'Platform Engineering', // not in video
    chunks: 18, // not in video
  },
  {
    id: 'doc-2',
    title: 'Final_chatArchitecture',
    format: 'TXT',
    category: 'Engineering & DevOps',
    description: uploadDescription('Final_chatArchitecture', 'Engineering & DevOps'),
    readTime: '4 min read',
    size: '38 KB',
    pages: 7,
    status: 'Indexed',
    author: 'Platform Engineering', // not in video
    chunks: 14, // not in video
  },
  {
    id: 'doc-3',
    title: 'eka_chat_architecture-withfeedback',
    format: 'PDF',
    category: 'Engineering & DevOps',
    description: uploadDescription('eka_chat_architecture-withfeedback', 'Engineering & DevOps'),
    readTime: '4 min read',
    size: '142 KB',
    pages: 7,
    status: 'Indexed',
    author: 'Platform Engineering', // not in video
    chunks: 18, // not in video
  },
  {
    id: 'doc-4',
    title: 'Enterprise Document',
    format: 'PDF',
    category: 'General Knowledge',
    description: uploadDescription('Enterprise Document', 'General Knowledge'),
    readTime: '5 min read',
    size: '2.1 MB',
    pages: 7,
    status: 'Indexed',
    author: 'EKA Admin', // not in video
    chunks: 22, // not in video
  },
  {
    id: 'doc-5',
    title: 'Enterprise Document',
    format: 'PDF',
    category: 'General Knowledge',
    description: uploadDescription('Enterprise Document', 'General Knowledge'),
    readTime: '5 min read',
    size: '2.1 MB',
    pages: 7,
    status: 'Indexed',
    author: 'EKA Admin', // not in video
    chunks: 22, // not in video
  },
  {
    id: 'doc-6',
    title: 'Final_chatArchitecture',
    format: 'PDF',
    category: 'Engineering & DevOps',
    description: uploadDescription('Final_chatArchitecture', 'Engineering & DevOps'),
    readTime: '5 min read',
    size: '2.1 MB',
    pages: 7,
    status: 'Indexed',
    author: 'Platform Engineering', // not in video
    chunks: 16, // not in video
  },

  // ---- Company documents ----
  {
    id: 'doc-7',
    title: 'Corporate Governance & Compliance Policy',
    format: 'PDF',
    category: 'People & HR Operations',
    description:
      'Official binding charter detailing corporate governance, whistleblower rules, information security...',
    readTime: '8 min read',
    size: '2.4 MB',
    pages: 14,
    status: 'Indexed',
    author: 'Legal Operations Committee',
    chunks: 84,
    isPinned: true,
    isBookmarked: true,
  },
  {
    id: 'doc-8',
    title: 'Kubernetes Microservices & Service Mesh Architecture Guide',
    format: 'MD',
    category: 'Engineering & DevOps',
    description:
      'Technical architecture specifications for containerized services using Istio service mesh, mutual TLS (mTLS)...',
    readTime: '12 min read',
    size: '1.1 MB',
    pages: 11,
    status: 'Indexed',
    author: 'Marcus Chen (Staff Architect)',
    chunks: 62,
    isBookmarked: true,
  },
  {
    id: 'doc-9',
    title: '2026 Global Remote Work, Travel & Flexible Hours Policy',
    format: 'PDF',
    category: 'People & HR Operations',
    description:
      'Official workplace guidelines governing remote work across 18 countries. Covers home office equipment...',
    readTime: '6 min read',
    size: '1.8 MB',
    pages: 8,
    status: 'Indexed',
    author: 'Sophia Sterling (VP People & Culture)',
    chunks: 45,
    isPinned: true,
    isBookmarked: true,
  },
  {
    id: 'doc-10',
    title: 'Employee Benefits, Health Insurance & Equity Playbook',
    format: 'DOCX',
    category: 'People & HR Operations',
    description:
      'Comprehensive guide to health, vision, dental plans, 401(k) matching (100% match up to 6%), annual stock...',
    readTime: '10 min read',
    size: '3.2 MB',
    pages: 13,
    status: 'Indexed',
    author: 'David Vance (Head of Total Rewards)', // role text cut off in video
    chunks: 78,
  },
  {
    id: 'doc-11',
    title: 'SOC 2 Type II Security & Data Governance Compliance Report',
    format: 'PDF',
    category: 'Security & Compliance',
    description:
      'Annual independent audit report evaluating security controls, confidentiality, processing integrity,...',
    readTime: '15 min read',
    size: '4.7 MB',
    pages: 19,
    status: 'Indexed',
    author: 'Security & Compliance', // not in video
    chunks: 76, // not in video
  },
  {
    id: 'doc-12',
    title: 'Enterprise UX Design System & Component Guidelines',
    format: 'MD',
    category: 'Product Strategy & Design',
    description:
      'Editorial design principles, 5 core atmospheres (Sunlit Paper, Lagoon Glass, Orchid Dusk, Citrus Studio, ...',
    readTime: '7 min read',
    size: '1.6 MB',
    pages: 8,
    status: 'Indexed',
    author: 'Product Design', // not in video
    chunks: 36, // not in video
  },
  {
    id: 'doc-13',
    title: 'CI/CD Deployment Pipelines & GitOps Automated Release Playbook', // title cut off in video
    format: 'PDF',
    category: 'Engineering & DevOps',
    description:
      'End-to-end specification for containerized deployment pipelines, GitOps reconciliation, and automated release gates...', // description cut off in video
    readTime: '9 min read',
    size: '2.8 MB',
    pages: 9,
    status: 'Indexed',
    author: 'Platform Engineering', // not in video
    chunks: 40, // not in video
  },
  {
    id: 'doc-14',
    title: 'Zero-Trust Infrastructure & IAM Security Architecture',
    format: 'DOCX', // format tile unclear in video
    category: 'Engineering & DevOps',
    description:
      'Identity and access management policies, SPIFFE/SPIRE workload identity, and least-privilege access controls...', // description cut off in video
    readTime: '8 min read',
    size: '1.9 MB',
    pages: 8,
    status: 'Indexed',
    author: 'Security & Compliance', // not in video
    chunks: 33, // not in video
  },
  {
    id: 'doc-15',
    title: 'PostgreSQL High Availability, Replication & Sharding Standards',
    format: 'PDF',
    category: 'Engineering & DevOps',
    description:
      'Fleet-managed PostgreSQL standards for streaming replication, automated failover, backups, and horizontal sharding...', // description cut off in video
    readTime: '11 min read',
    size: '3.1 MB',
    pages: 10,
    status: 'Indexed',
    author: 'Platform Engineering', // not in video
    chunks: 52, // not in video
  },
  {
    id: 'doc-16',
    title: 'Kubernetes Cluster Auto-Healing & Incident Escalation Runbook',
    format: 'PDF',
    category: 'Engineering & DevOps',
    description:
      'Disaster recovery playbooks for automated pod restart loops, OOMKilled worker nodes, and cross-AZ traffic evacuation.',
    readTime: '6 min read',
    size: '3.4 MB',
    pages: 8,
    status: 'Failed',
    author: 'Platform Engineering', // not in video
    chunks: 0,
  },
  {
    id: 'doc-17',
    title: 'Enterprise Sales Playbook & Discounting Matrix 2026',
    format: 'PDF',
    category: 'Sales & Go-To-Market',
    description:
      'Enterprise go-to-market framework, tiered ACV thresholds, legal approval matrix for non-standard discounting, and competitive battlecards against legacy...',
    readTime: '8 min read',
    size: '2.6 MB',
    pages: 9,
    status: 'Indexed',
    author: 'Revenue Operations', // not in video
    chunks: 39, // not in video
    isBookmarked: true,
  },
  {
    id: 'doc-18',
    title: 'Standard Master Services Agreement (MSA) & Vendor Contract Templates', // title cut off in video
    format: 'DOCX',
    category: 'Legal & Finance',
    description:
      'Standard enterprise customer MSA clauses, indemnification limits, IP protection terms, SaaS SLA commitments, and procurement authorization limits.',
    readTime: '10 min read',
    size: '1.7 MB',
    pages: 11,
    status: 'Indexed',
    author: 'Legal & Finance', // not in video
    chunks: 51, // not in video
  },
  {
    id: 'doc-19',
    title: 'Brand Voice, Language & Design Tokens Guide',
    format: 'FIG',
    category: 'Product Strategy & Design',
    description:
      'Company-wide product naming, editorial tone, typography tokens, Figma component libraries, and copywriting standards for customer-facing interfaces.',
    readTime: '5 min read',
    size: '1.2 MB',
    pages: 7,
    status: 'Indexed',
    author: 'Product Design', // not in video
    chunks: 29, // not in video
  },
  {
    id: 'doc-20',
    title: 'Q4 2024 Product Strategy & Strategic Roadmap',
    format: 'PDF',
    category: 'Product Strategy & Design',
    description:
      'Executive product vision detailing neural semantic search milestones, autonomous knowledge verification workflows, and enterprise scale targets.',
    readTime: '9 min read',
    size: '2.4 MB',
    pages: 12,
    status: 'Indexed',
    author: 'Product Management', // not in video
    chunks: 44, // not in video
    isPinned: true,
    isBookmarked: true,
  },
];

// Category options shown in the filter dropdown.
// value = what is stored on each document's `category` field (used for filtering)
// label = shorter text shown inside the dropdown and the "Filtered by" chip
export const documentCategories = [
  { value: 'People & HR Operations', label: 'People & HR' },
  { value: 'Engineering & DevOps', label: 'Engineering & DevOps' },
  { value: 'Security & Compliance', label: 'Security & Compliance' },
  { value: 'Product Strategy & Design', label: 'Product & Design' },
  { value: 'Sales & Go-To-Market', label: 'Sales & Go-To-Market' },
  { value: 'Legal & Finance', label: 'Legal & Finance' },
];

// Format options shown in the filter dropdown (as in the video).
// value = what is stored on each document's `format` field (and the card tile)
// label = text shown in the dropdown
export const documentFormats = [
  { value: 'PDF', label: 'PDF' },
  { value: 'DOCX', label: 'DOCX' },
  { value: 'MD', label: 'Markdown' },
  { value: 'CSV', label: 'Sheet (CSV)' },
  { value: 'NOTION', label: 'Notion' },
];

// Admin-only: repository health snapshot for the Document Health Overview.
// Order matters — the donut draws its segments clockwise from 12 o'clock
// in exactly this order.
export const documentHealth = [
  { key: 'indexed', label: 'Indexed', count: 531, color: 'var(--status-success)' },
  { key: 'processing', label: 'Processing', count: 23, color: 'var(--status-info)' },
  { key: 'outdated', label: 'Outdated', count: 10, color: 'var(--status-warning)' },
  { key: 'failed', label: 'Failed', count: 14, color: 'var(--status-danger)' },
];

// Admin-only: storage usage shown next to the Ingest button.
export const documentStorage = { usedGb: 14.2, totalGb: 50 };