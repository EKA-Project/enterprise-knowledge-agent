// Dummy data for the Knowledge Base page.
// Shape is designed to mirror what a future documentService.js API call
// would return, so swapping this for a real fetch later won't require
// changing the components that consume it.


// Icon components imported directly (same pattern as navigation.js),
// so each category object can hold the icon as a component reference.
import {
  SlidersVertical,
  Users,
  Notebook,
  Shield,
  Tag,
  FileText,
} from 'lucide-react';
// Top stats row (values taken from the reference design)
export const knowledgeStats = [
  {
    id: 'total-docs',
    label: 'Total Documents',
    value: 19,
    caption: 'Indexed in EKA'
  },
  {
    id: 'collections',
    label: 'Collections',
    value: 6,
    caption: 'Department Hubs'
  },
  {
    id: 'glossary',
    label: 'Glossary Terms',
    value: 24,
    caption: 'Defined Terms',
    highlight: true
  },
  {
    id: 'updated',
    label: 'Updated This Week',
    value: 5,
    caption: 'Recent Amendments'
  },
];

// documentCategory = exact category value used by the Documents page filter
export const knowledgeCategories = [
  {
    id: 'engineering',
    title: 'Engineering & DevOps',
    documentCategory: 'Engineering & DevOps',
    icon: SlidersVertical,
    iconTheme: 'lavender',
    docCount: 10,
    sourceCount: 14,
    insights: {
    domainLead: 'Elena Rostova (Head of Infrastructure)',
    updatedLabel: 'Updated 2 days ago',
    overview:
        'Microservices architecture across containerized Kubernetes clusters with Istio service mesh, strict mTLS between namespaces, ArgoCD GitOps pipelines, Patroni PostgreSQL HA failover under 10 seconds, and 4-minute Sev-1 Incident Commander SLAs.',
    },
  },


  {
    id: 'people',
    title: 'People & HR Operations',
    documentCategory: 'People & HR Operations',
    icon: Users,
    iconTheme: 'mint',
    docCount: 3,
    sourceCount: 9
  },
  {
    id: 'product',
    title: 'Product Strategy & Design',
    documentCategory: 'Product Strategy & Design',
    icon: Notebook,
    iconTheme: 'gold',
    docCount: 3,
    sourceCount: 8
  },
  {
    id: 'security',
    title: 'Security & Compliance',
    documentCategory: 'Security & Compliance',
    icon: Shield,
    iconTheme: 'teal',
    docCount: 1,
    sourceCount: 12
  },
  {
    id: 'sales',
    title: 'Sales & Go-To-Market',
    documentCategory: 'Sales & GTM',
    icon: Tag,
    iconTheme: 'rose',
    docCount: 1,
    sourceCount: 7
  },
  {
    id: 'legal',
    title: 'Legal & Finance',
    documentCategory: 'Legal & Finance',
    icon: FileText,
    iconTheme: 'gold',
    docCount: 1,
    sourceCount: 6
  },
];
// Colour themes shared by the category card and the insights modal
export const categoryThemes = {
  lavender: { accent: 'border-t-(--cat-lavender)', icon: 'bg-(--cat-lavender-bg) text-(--cat-lavender)' },
  mint: { accent: 'border-t-(--cat-mint)', icon: 'bg-(--cat-mint-bg) text-(--cat-mint)' },
  gold: { accent: 'border-t-(--cat-gold)', icon: 'bg-(--cat-gold-bg) text-(--cat-gold)' },
  teal: { accent: 'border-t-(--cat-teal)', icon: 'bg-(--cat-teal-bg) text-(--cat-teal)' },
  rose: { accent: 'border-t-(--cat-rose)', icon: 'bg-(--cat-rose-bg) text-(--cat-rose)' },
};