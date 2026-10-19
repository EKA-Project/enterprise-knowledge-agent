// Dummy document data for the Documents page.
// Shape is kept ready for future documentService/API integration.
//
// Totals follow the reference video: 20 docs, 13 PDF, 5 saved, 3 pinned.
// Docs 1-8 and 9-14 are named in the video; docs 15-20 are filler written
// by us (not in the video) so the totals match.

const uploadDescription = (name, area) =>
  `Official document regarding ${name}. Vectorized and indexed for ${area} enterprise search and citations.`;

export const documents = [
  {
    id: 'doc-1',
    title: 'Corporate Governance & Compliance Policy',
    format: 'PDF',
    category: 'People & HR Operations',
    description:
      'Official binding charter detailing corporate governance, whistleblower rules, information security...',
    readTime: '8 min read',
    size: '2.4 MB',
    pages: 14,
    status: 'Outdated',
    author: 'Legal & Compliance',
    chunks: 42,
    isPinned: true,
    isBookmarked: true,
  },
  {
    id: 'doc-2',
    title: 'Kubernetes Microservices & Service Mesh Architecture Guide',
    format: 'DOCX',
    category: 'Engineering & DevOps',
    description:
      'Technical architecture specifications for containerized services using Istio service mesh, mutual TLS (mTLS)...',
    readTime: '12 min read',
    size: '1.1 MB',
    pages: 11,
    status: 'Indexed',
    author: 'Platform Engineering',
    chunks: 58,
    isBookmarked: true,
  },
  {
    id: 'doc-3',
    title: '2026 Global Remote Work, Travel & Flexible Hours Policy',
    format: 'PDF',
    category: 'People & HR Operations',
    description:
      'Official workplace guidelines governing remote work across 18 countries. Covers home office equipment...',
    readTime: '6 min read',
    size: '1.8 MB',
    pages: 8,
    status: 'Indexed',
    author: 'People Operations',
    chunks: 31,
    isPinned: true,
    isBookmarked: true,
  },
  {
    id: 'doc-4',
    title: 'Employee Benefits, Health Insurance & Equity Playbook',
    format: 'DOCX',
    category: 'People & HR Operations',
    description:
      'Comprehensive guide to health, vision, dental plans, 401(k) matching (100% match up to 6%), annual stock...',
    readTime: '10 min read',
    size: '3.2 MB',
    pages: 13,
    status: 'Indexed',
    author: 'People Operations',
    chunks: 47,
  },
  {
    id: 'doc-5',
    title: 'SOC 2 Type II Security & Data Governance Compliance Report',
    format: 'PDF',
    category: 'Security & Compliance',
    description:
      'Annual independent audit report evaluating security controls, confidentiality, processing integrity,...',
    readTime: '15 min read',
    size: '4.7 MB',
    pages: 19,
    status: 'Indexed',
    author: 'Security & Compliance',
    chunks: 76,
  },
  {
    id: 'doc-6',
    title: 'Enterprise UX Design System & Component Guidelines',
    format: 'TXT',
    category: 'Product Strategy & Design',
    description:
      'Editorial design principles, 5 core atmospheres (Sunlit Paper, Lagoon Glass, Orchid Dusk, Citrus Studio, ...',
    readTime: '7 min read',
    size: '1.6 MB',
    pages: 8,
    status: 'Indexed',
    author: 'Product Design',
    chunks: 36,
  },
  {
    id: 'doc-7',
    title: 'Enterprise Sales Playbook & Discounting Matrix 2026',
    format: 'PDF',
    category: 'Sales & Go-To-Market',
    description:
      'Outbound and inbound sales motions, ICP definitions, discount approval thresholds, and competitive positioning...',
    readTime: '9 min read',
    size: '2.1 MB',
    pages: 12,
    status: 'Indexed',
    author: 'Revenue Operations',
    chunks: 39,
    isBookmarked: true,
  },
  {
    id: 'doc-8',
    title: 'Q1 2024 Product Strategy & Strategic Roadmap',
    format: 'PDF',
    category: 'Product Strategy & Design',
    description:
      'Quarterly product strategy, roadmap themes, success metrics, and cross-team dependencies for the new fiscal year...',
    readTime: '8 min read',
    size: '2.6 MB',
    pages: 10,
    status: 'Indexed',
    author: 'Product Management',
    chunks: 44,
    isPinned: true,
    isBookmarked: true,
  },

  // ---- Uploaded documents (names, formats, sizes as in the video) ----
  {
    id: 'doc-9',
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
    id: 'doc-10',
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
    id: 'doc-11',
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
    id: 'doc-12',
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
    id: 'doc-13',
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
    id: 'doc-14',
    title: 'Final_chatArchitecture',
    format: 'PDF',
    category: 'Engineering & DevOps',
    description: uploadDescription('Final_chatArchitecture', 'Engineering & DevOps'),
    readTime: '4 min read',
    size: '2.1 MB',
    pages: 7,
    status: 'Indexed',
    author: 'Platform Engineering', // not in video
    chunks: 16, // not in video
  },

  // ---- Filler documents (NOT in the video: added to reach 20 / 13 PDF) ----
  {
    id: 'doc-15',
    title: 'Vendor Contracts & Financial Compliance Manual',
    format: 'DOCX',
    category: 'Legal & Finance',
    description:
      'Standard vendor agreement templates, procurement approval thresholds, and financial reporting compliance requirements...',
    readTime: '11 min read',
    size: '2.9 MB',
    pages: 16,
    status: 'Indexed',
    author: 'Legal & Finance',
    chunks: 51,
  },
  {
    id: 'doc-16',
    title: 'Data Retention & Records Management Policy',
    format: 'PDF',
    category: 'Legal & Finance',
    description:
      'Retention schedules, legal hold procedures, and secure disposal rules for company records and customer data...',
    readTime: '7 min read',
    size: '1.3 MB',
    pages: 9,
    status: 'Indexed',
    author: 'Legal & Finance',
    chunks: 28,
  },
  {
    id: 'doc-17',
    title: 'Incident Response & Disaster Recovery Runbook',
    format: 'PDF',
    category: 'Security & Compliance',
    description:
      'Severity levels, escalation paths, communication templates, and recovery objectives for production incidents...',
    readTime: '9 min read',
    size: '2.2 MB',
    pages: 12,
    status: 'Indexed',
    author: 'Security & Compliance',
    chunks: 37,
  },
  {
    id: 'doc-18',
    title: 'Engineering On-Call & Escalation Handbook',
    format: 'DOCX',
    category: 'Engineering & DevOps',
    description:
      'On-call rotations, paging policies, handoff checklists, and post-incident review practices for engineering teams...',
    readTime: '6 min read',
    size: '1.4 MB',
    pages: 9,
    status: 'Indexed',
    author: 'Platform Engineering',
    chunks: 25,
  },
  {
    id: 'doc-19',
    title: 'New Hire Onboarding Checklist',
    format: 'TXT',
    category: 'People & HR Operations',
    description:
      'First-week checklist covering accounts, equipment, security training, and introductions for new employees...',
    readTime: '3 min read',
    size: '24 KB',
    pages: 4,
    status: 'Processing',
    author: 'People Operations',
    chunks: 0,
  },
  {
    id: 'doc-20',
    title: 'Q3 Infrastructure Cost Review',
    format: 'PDF',
    category: 'Engineering & DevOps',
    description:
      'Cloud spend breakdown by service and team, savings opportunities, and reserved-capacity recommendations...',
    readTime: '8 min read',
    size: '3.0 MB',
    pages: 11,
    status: 'Failed',
    author: 'Platform Engineering',
    chunks: 0,
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
// value = what is stored on each document's `format` field (and the card chip)
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