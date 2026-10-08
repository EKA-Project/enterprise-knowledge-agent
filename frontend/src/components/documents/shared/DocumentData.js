// Dummy document data for the Documents page.
// Shape is kept ready for future documentService/API integration.

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
  },
  {
    id: 'doc-2',
    title: 'Kubernetes Microservices & Service Mesh Architecture Guide',
    format: 'MD',
    category: 'Engineering & DevOps',
    description:
      'Technical architecture specifications for containerized services using Istio service mesh, mutual TLS (mTLS)...',
    readTime: '12 min read',
    size: '1.1 MB',
    pages: 11,
    status: 'Indexed',
    author: 'Platform Engineering',
    chunks: 58,
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
    format: 'MD',
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
     title: 'Q1 2026 Sales Playbook & GTM Strategy',
     format: 'PDF',
     category: 'Sales & GTM',
     description:
       'Outbound and inbound sales motions, ICP definitions, competitive positioning, and go-to-market timelines for the new fiscal year...',
     readTime: '9 min read',
     size: '2.1 MB',
     pages: 12,
     status: 'Indexed',
     author: 'Revenue Operations',
     chunks: 39,
   },
   {
     id: 'doc-8',
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
];

 // Category options shown in the filter dropdown.
 // value = matches the long-form text shown on document card badges
 //         (also what's stored on each document's `category` field, for filtering).
 // label = shorter text shown inside the dropdown itself (per reference design,
 //         the dropdown label and the card badge don't always match verbatim).
 export const documentCategories = [
   { value: 'People & HR Operations', label: 'People & HR' },
   { value: 'Engineering & DevOps', label: 'Engineering & DevOps' },
   { value: 'Security & Compliance', label: 'Security & Compliance' },
   { value: 'Product Strategy & Design', label: 'Product & Design' },
   { value: 'Sales & GTM', label: 'Sales & GTM' },
   { value: 'Legal & Finance', label: 'Legal & Finance' },
 ];
// Format options shown in the filter dropdown.
export const documentFormats = [
  
  'PDF',
  'DOCX',
  'TXT',
  'XLSX',
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