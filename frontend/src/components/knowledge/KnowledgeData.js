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
        sourceFiles: [
      { id: 'eng-1', title: 'Final_chatArchitecture', format: 'TXT', size: '10 KB', chunks: 22, author: 'Maya Narang',
        description: 'Official document regarding Final_chatArchitecture. Vectorized and indexed for Engineering & DevOps enterprise search and citations.',
        notes: ['Uploaded directly by Maya Narang', '100% encrypted with tenant KMS key'] },
      { id: 'eng-2', title: 'eka_chat_architecture-withfeedback', format: 'PDF', size: '142 KB', chunks: 39, author: 'Maya Narang',
        description: 'Official document regarding eka_chat_architecture-withfeedback. Vectorized and indexed for Engineering & DevOps enterprise search and citations.',
        notes: ['Uploaded directly by Maya Narang', '100% encrypted with tenant KMS key'] },
      { id: 'eng-3', title: 'Enterprise Document', format: 'PDF', size: '2.1 MB', chunks: 47, author: 'Maya Narang',
        description: 'Official document regarding Enterprise Document. Vectorized and indexed for General Knowledge enterprise search and citations.',
        notes: ['Uploaded directly by Maya Narang', '100% encrypted with tenant KMS key'] },
      { id: 'eng-4', title: 'Enterprise Document', format: 'PDF', size: '2.1 MB', chunks: 61, author: 'Maya Narang',
        description: 'Official document regarding Enterprise Document. Vectorized and indexed for General Knowledge enterprise search and citations.',
        notes: ['Uploaded directly by Maya Narang', '100% encrypted with tenant KMS key'] },
      { id: 'eng-5', title: 'Final_chatArchitecture', format: 'PDF', size: '2.1 MB', chunks: 78, author: 'Maya Narang',
        description: 'Official document regarding Final_chatArchitecture. Vectorized and indexed for Engineering & DevOps enterprise search and citations.',
        notes: ['Uploaded directly by Maya Narang', '100% encrypted with tenant KMS key'] },
      { id: 'eng-6', title: 'Kubernetes Microservices & Service Mesh Architecture Guide', format: 'MD', size: '1.1 MB', chunks: 92, author: 'Marcus Chen (Staff Architect)',
        description: 'Technical architecture specifications for containerized services using Istio service mesh, mutual TLS (mTLS) enforcement, eBPF telemetry, and GitOps deployments via ArgoCD.',
        notes: ['Zero-trust network architecture enforced via Istio STRICT mTLS between all namespace workloads.', 'ArgoCD continuously reconciles cluster states against github.com/northstar/gitops-infrastructure.'] },
      { id: 'eng-7', title: 'CI/CD Deployment Pipelines & GitOps Automated Release Workflow', format: 'PDF', size: '2.8 MB', chunks: 110, author: 'Elena Rostova (Head of Infrastructure)',
        description: 'End-to-end specifications for containerized microservice build matrices, ephemeral preview environments, automated canary deployments, and rollbacks via ArgoCD.',
        notes: ['Automated semantic versioning and artifact signing with Cosign.', 'Canary rollouts with automated latency-based rollback triggers in Argo Rollouts.'] },
      { id: 'eng-8', title: 'Zero-Trust Infrastructure & IAM Security Architecture', format: 'DOCX', size: '1.9 MB', chunks: 124, author: 'Marcus Chen (Staff Architect)',
        description: 'Identity and Access Management policies, SPIFFE/SPIRE workload attestation, dynamic secret rotation via HashiCorp Vault, and ephemeral developer bastion access.',
        notes: ['Ephemeral SSH certificate generation with 4-hour max lifespan.', 'Workload identity tokens automatically rotated every 60 minutes via SPIRE.'] },
      { id: 'eng-9', title: 'PostgreSQL High Availability, Replication & Sharding Standards', format: 'PDF', size: '3.1 MB', chunks: 138, author: 'DevOps Infrastructure Team',
        description: 'Patroni-managed PostgreSQL cluster setup with synchronous standby replication, pgBouncer connection pooling, and continuous WAL archiving to S3.',
        notes: ['Automatic failover consensus via etcd-backed Patroni nodes under 10 seconds.', 'pgBouncer connection pooling in transaction mode to support 10,000+ concurrent app connections.'] },
      { id: 'eng-10', title: 'Kubernetes Cluster Auto-Healing & Incident Escalation Runbook', format: 'PDF', size: '3.4 MB', chunks: 151, author: 'Alex Morgan (Senior Frontend Engineer)',
        description: 'Disaster recovery playbooks for automated pod restart loops, OOMKilled worker nodes, and cross-AZ traffic evacuation.',
        notes: ['Uploaded by Alex Morgan — pending vectorization retry.', 'Failure caused by OpenAI Embedding API 429 Token Rate Limit during batch upload.'] },
    ],
  },


  {
    id: 'people',
    title: 'People & HR Operations',
    documentCategory: 'People & HR Operations',
    icon: Users,
    iconTheme: 'mint',
    docCount: 3,
    sourceCount: 9,
        insights: {
      domainLead: 'Priya Sharma (VP, People Operations)',
      updatedLabel: 'Updated 1 week ago',
      overview: 'Governance, compliance and workplace policies covering whistleblower rules, remote work across 18 countries, health and equity benefits, and 401(k) matching up to 6%.',
    },
    sourceFiles: [
      { id: 'ppl-1', title: 'Corporate Governance & Compliance Policy', format: 'PDF', size: '2.4 MB', chunks: 42, author: 'Legal & Compliance',
        description: 'Official binding charter detailing corporate governance, whistleblower rules, information security and compliance obligations.',
        notes: ['Whistleblower reports are reviewed within 5 business days.', 'Annual compliance attestation required for all employees.'] },
      { id: 'ppl-2', title: '2026 Global Remote Work, Travel & Flexible Hours Policy', format: 'PDF', size: '1.8 MB', chunks: 31, author: 'People Operations',
        description: 'Official workplace guidelines governing remote work across 18 countries, covering home office equipment and flexible hours.',
        notes: ['Employees can work internationally outside their home tax residency for up to 90 calendar days per rolling year.', 'Annual home office wellness stipend is $1,500 USD, claimable through Navan Expense in Q1.'] },
      { id: 'ppl-3', title: 'Employee Benefits, Health Insurance & Equity Playbook', format: 'DOCX', size: '3.2 MB', chunks: 47, author: 'People Operations',
        description: 'Comprehensive guide to health, vision and dental plans, 401(k) matching (100% match up to 6%) and annual stock grants.',
        notes: ['401(k) match of 100% up to 6% of eligible salary.', 'Equity refresh grants are reviewed every January.'] },
    ],
  },
  {
    id: 'product',
    title: 'Product Strategy & Design',
    documentCategory: 'Product Strategy & Design',
    icon: Notebook,
    iconTheme: 'gold',
    docCount: 3,
    sourceCount: 8,
        insights: {
      domainLead: 'Maya Narang (Lead Product Designer)',
      updatedLabel: 'Updated 4 days ago',
      overview: 'Product vision, editorial design principles, brand voice and typography tokens guiding customer-facing interfaces and the neural search roadmap.',
    },
    sourceFiles: [
      { id: 'prod-1', title: 'Q4 2024 Product Strategy & Strategic Roadmap', format: 'PDF', size: '2.4 MB', chunks: 54, author: 'Maya Narang (Lead Product Designer)',
        description: 'Executive product vision detailing neural semantic search milestones, autonomous knowledge verification workflows, and enterprise scale targets.',
        notes: ['Neural search accuracy targeting 99.8% precision with hybrid dense-sparse vector indexing.', 'Autonomous document diffing and redlining engine release planned for Q4.'] },
      { id: 'prod-2', title: 'Enterprise UX Design System & Component Guidelines', format: 'MD', size: '1.6 MB', chunks: 36, author: 'Product Design',
        description: 'Editorial design principles, five core atmospheres and component guidelines for the enterprise UX design system.',
        notes: ['Design tokens are the single source for colour, type and spacing.', 'Components ship with documented accessibility standards.'] },
      { id: 'prod-3', title: 'Brand Voice, Language & Design Tokens Guide', format: 'FIG', size: '1.2 MB', chunks: 39, author: 'Rachel Green (Head of Product)',
        description: 'Company-wide product naming, editorial tone, typography tokens, Figma component libraries, and copywriting standards for customer-facing interfaces.',
        notes: ['Clarity over jargon across all user-facing microcopy.', 'Consistent typography scales anchored on Editorial Serif and Modern Grotesque sans.'] },
    ],
  },
  {
    id: 'security',
    title: 'Security & Compliance',
    documentCategory: 'Security & Compliance',
    icon: Shield,
    iconTheme: 'teal',
    docCount: 1,
    sourceCount: 12,
        insights: {
      domainLead: 'Daniel Okafor (CISO)',
      updatedLabel: 'Updated 3 days ago',
      overview: 'Independent SOC 2 Type II audit evidence covering security, confidentiality and processing integrity controls, with AES-256 encryption at rest, TLS 1.3 in transit and zero AI training on customer data.',
    },
    sourceFiles: [
      { id: 'sec-1', title: 'SOC 2 Type II Security & Data Governance Compliance Report', format: 'PDF', size: '4.7 MB', chunks: 76, author: 'Security & Compliance',
        description: 'Annual independent audit report evaluating security controls, confidentiality, processing integrity, encryption standards (AES-256 at rest, TLS 1.3 in transit), and zero AI training practices.',
        notes: ['Zero exceptions noted across all 5 Trust Services Criteria during the evaluation period.', 'All customer enterprise knowledge embeddings and documents are encrypted using tenant KMS keys.'] },
    ],
  },
  {
    id: 'sales',
    title: 'Sales & Go-To-Market',
    documentCategory: 'Sales & GTM',
    icon: Tag,
    iconTheme: 'rose',
    docCount: 1,
    sourceCount: 7,
        insights: {
      domainLead: 'Rahul Mehta (VP, Revenue Operations)',
      updatedLabel: 'Updated 5 days ago',
      overview: 'Outbound and inbound sales motions, ICP definitions, competitive positioning, and go-to-market timelines for the new fiscal year.',
    },
    sourceFiles: [
      { id: 'sales-1', title: 'Q1 2026 Sales Playbook & GTM Strategy', format: 'PDF', size: '2.1 MB', chunks: 39, author: 'Revenue Operations',
        description: 'Outbound and inbound sales motions, ICP definitions, competitive positioning, and go-to-market timelines for the new fiscal year.',
        notes: ['Outbound cadences defined for enterprise and mid-market segments.', 'Competitive battlecards are refreshed every quarter.'] },
    ],
  },
  {
    id: 'legal',
    title: 'Legal & Finance',
    documentCategory: 'Legal & Finance',
    icon: FileText,
    iconTheme: 'gold',
    docCount: 1,
    sourceCount: 6,
        insights: {
      domainLead: 'Sara Whitfield (General Counsel)',
      updatedLabel: 'Updated 1 week ago',
      overview: 'Standard vendor agreement templates, procurement approval thresholds, and financial reporting compliance requirements.',
    },
    sourceFiles: [
      { id: 'legal-1', title: 'Vendor Contracts & Financial Compliance Manual', format: 'DOCX', size: '2.9 MB', chunks: 51, author: 'Legal & Finance',
        description: 'Standard vendor agreement templates, procurement approval thresholds, and financial reporting compliance requirements.',
        notes: ['Vendor agreement templates are pre-approved by Legal.', 'Procurement approvals are required above defined spend thresholds.'] },
    ],
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