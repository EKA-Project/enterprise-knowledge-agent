// Dummy data for the Knowledge Base page.
// Shape is designed to mirror what a future documentService.js API call
// would return, so swapping this for a real fetch later won't require
// changing the components that consume it.

// Topic categories shown in the browse grid
export const knowledgeCategories = [
  {
    id: 'people-culture',
    title: 'People & Culture',
    icon: '👥',
    iconTheme: 'mint',
    docCount: 24,
    updatedLabel: 'Updated this week',
  },
  {
    id: 'product-engineering',
    title: 'Product & Engineering',
    icon: '🎚️',
    iconTheme: 'lavender',
    docCount: 18,
    updatedLabel: 'Updated this week',
  },
  {
    id: 'finance-legal',
    title: 'Finance & Legal',
    icon: '📄',
    iconTheme: 'gold',
    docCount: 12,
    updatedLabel: 'Updated this week',
  },
  {
    id: 'sales-marketing',
    title: 'Sales & Marketing',
    icon: '🏷️',
    iconTheme: 'pink',
    docCount: 16,
    updatedLabel: 'Updated this week',
  },
  {
    id: 'security-it',
    title: 'Security & IT',
    icon: '🛡️',
    iconTheme: 'blue',
    docCount: 9,
    updatedLabel: 'Updated this week',
  },
  {
    id: 'company-foundations',
    title: 'Company foundations',
    icon: '📖',
    iconTheme: 'tan',
    docCount: 7,
    updatedLabel: 'Updated this week',
  },
];

// Documents shown in the "Recently surfaced" list
export const recentlySurfacedDocs = [
  {
    id: 'doc-1',
    title: 'Q4 2024 Product Strategy',
    fileType: 'PDF',
    updatedLabel: 'Updated today, 9:42 am',
    size: '2.4 MB',
    status: 'indexed',
  },
  {
    id: 'doc-2',
    title: 'Remote work principles',
    fileType: 'DOCX',
    updatedLabel: 'Updated yesterday',
    size: '840 KB',
    status: 'indexed',
  },
  {
    id: 'doc-3',
    title: 'Customer interview synthesis',
    fileType: 'PDF',
    updatedLabel: 'Updated nov 18, 2024',
    size: '5.1 MB',
    status: 'indexed',
  },
];
