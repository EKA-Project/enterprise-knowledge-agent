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
