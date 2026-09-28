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
    status: 'Indexed & Ready',
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
    status: 'Indexed & Ready',
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
    status: 'Indexed & Ready',
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
    status: 'Indexed & Ready',
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
    status: 'Indexed & Ready',
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
    status: 'Indexed & Ready',
    author: 'Product Design',
    chunks: 36,
  },
];

// Category options shown in the filter dropdown.
// Four distinct categories are visible across the six reference documents.
export const documentCategories = [
  'All Categories',
  'People & HR Operations',
  'Engineering & DevOps',
  'Security & Compliance',
  'Product Strategy & Design',
];

// Format options shown in the filter dropdown.
export const documentFormats = [
  'All Formats',
  'PDF',
  'DOCX',
  'Markdown (MD)',
];