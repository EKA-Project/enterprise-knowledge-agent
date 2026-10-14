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
    keywords: [
      { term: 'ideal customer profile', score: 0.94 },
      { term: 'competitor comparison', score: 0.91 },
      { term: 'sales playbook', score: 0.88 },
      { term: 'outbound email templates', score: 0.84 },
      { term: 'go to market plan', score: 0.8 },
      { term: 'pricing and discounts', score: 0.76 },
    ],
    prompts: [
      'How does Patroni handle PostgreSQL failover?',
      'What is the Sev-1 incident escalation process?',
      'Explain our ArgoCD GitOps deployment flow',
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
        keywords: [
      { term: 'remote-work', score: 0.93 },
      { term: '401k-match', score: 0.89 },
      { term: 'whistleblower', score: 0.84 },
      { term: 'home-office-stipend', score: 0.8 },
      { term: 'equity-refresh', score: 0.76 },
    ],
    prompts: [
      'How many days can I work abroad each year?',
      'What is the 401(k) matching policy?',
      'What is the home office stipend amount?',
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
        keywords: [
      { term: 'neural-search', score: 0.92 },
      { term: 'design-tokens', score: 0.88 },
      { term: 'brand-voice', score: 0.85 },
      { term: 'roadmap-q4', score: 0.81 },
      { term: 'figma-library', score: 0.77 },
    ],
    prompts: [
      'What are the Q4 product roadmap milestones?',
      'Which typography tokens do we use?',
      'What is our brand voice guideline?',
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
    keywords: [
      { term: 'soc 2 audit report', score: 0.94 },
      { term: 'data encryption', score: 0.91 },
      { term: 'access control policy', score: 0.88 },
      { term: 'customer data privacy', score: 0.84 },
      { term: 'security compliance', score: 0.8 },
      { term: 'ai training on our data', score: 0.76 },
    ],
    prompts: [
      'What did the SOC 2 audit conclude?',
      'How is customer data encrypted?',
      'Do you train AI models on customer data?',
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
    keywords: [
      { term: 'ideal customer profile', score: 0.94 },
      { term: 'competitor comparison', score: 0.91 },
      { term: 'sales playbook', score: 0.88 },
      { term: 'outbound email templates', score: 0.84 },
      { term: 'go to market plan', score: 0.8 },
      { term: 'pricing and discounts', score: 0.76 },
    ],
    prompts: [
      'Who is our ideal customer profile?',
      'How often are competitive battlecards updated?',
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
    keywords: [
      { term: 'vendor contract template', score: 0.94 },
      { term: 'procurement approval limits', score: 0.91 },
      { term: 'expense reimbursement', score: 0.88 },
      { term: 'financial reporting rules', score: 0.84 },
      { term: 'nda and legal review', score: 0.8 },
      { term: 'purchase order process', score: 0.76 },
    ],
    prompts: [
      'When is Legal approval needed for a vendor?',
      'What are the procurement approval thresholds?',
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

// Glossary terms, kept alphabetical (the A–Z filter relies on the first letter).
// First 10 are from the reference design; the rest are placeholder terms.
export const glossaryTerms = [
  { id: 'gl-acv', term: 'ACV', expansion: 'Annual Contract Value', category: 'Sales & Go-To-Market', revised: '2026-08-02',
    definition: 'The annualized revenue value of a customer software subscription contract, excluding one-time professional services.' },
  { id: 'gl-arr', term: 'ARR', expansion: 'Annual Recurring Revenue', category: 'Sales & Go-To-Market', revised: '2026-07-20',
    definition: 'The normalized metric measuring predictable recurring subscription run-rate across all active enterprise accounts.' },
  { id: 'gl-cicd', term: 'CI/CD', expansion: 'Continuous Integration / Continuous Deployment', category: 'Engineering & DevOps', revised: '2026-08-04',
    definition: 'Automated pipelines that build, test, and release microservices to staging and production Kubernetes clusters via GitOps.' },
  { id: 'gl-dpa', term: 'DPA', expansion: 'Data Processing Addendum', category: 'Legal & Finance', revised: '2026-07-29',
    definition: 'A legally binding contract clause regulating the processing of personal and corporate data under GDPR and privacy frameworks.' },
  { id: 'gl-gdpr', term: 'GDPR', expansion: 'General Data Protection Regulation', category: 'Legal & Finance', revised: '2026-07-19',
    definition: 'European data privacy and governance regulation mandating strict customer consent, data residency, and Right to be Forgotten.' },
  { id: 'gl-hipaa', term: 'HIPAA', expansion: 'Health Insurance Portability and Accountability Act', category: 'Legal & Finance', revised: '2026-06-18',
    definition: 'Federal regulatory standard governing the protection, handling, and electronic storage of Protected Health Information (PHI).' },
  { id: 'gl-iam', term: 'IAM', expansion: 'Identity and Access Management', category: 'Security & Compliance', revised: '2026-07-19',
    definition: 'Framework of zero-trust role-based access policies and ephemeral bastion credentials for engineers accessing production systems.' },
  { id: 'gl-kms', term: 'KMS', expansion: 'Key Management Service', category: 'Security & Compliance', revised: '2026-07-19',
    definition: 'Cloud cryptographic service managing envelope master encryption keys, rotated automatically every 90 days.' },
  { id: 'gl-kpi', term: 'KPI', expansion: 'Key Performance Indicator', category: 'Product Strategy & Design', revised: '2026-07-10',
    definition: 'A measurable value used to track progress against product and business goals.' },
  { id: 'gl-ltv', term: 'LTV', expansion: 'Customer Lifetime Value', category: 'Sales & Go-To-Market', revised: '2026-07-05',
    definition: 'The total revenue a customer is expected to generate across the whole relationship with the company.' },
  { id: 'gl-meddpicc', term: 'MEDDPICC', expansion: 'Metrics, Economic Buyer, Decision Criteria, Decision Process, Paper Process, Identity Pain, Champion, Competition', category: 'Sales & Go-To-Market', revised: '2026-07-22',
    definition: 'Enterprise deal qualification methodology applied to all prospective opportunities exceeding $50k ACV.' },
  { id: 'gl-msa', term: 'MSA', expansion: 'Master Services Agreement', category: 'Legal & Finance', revised: '2026-08-08',
    definition: 'The governing enterprise contract specifying terms of service, payment schedules, intellectual property, and liability caps.' },
  { id: 'gl-mtls', term: 'mTLS', expansion: 'Mutual Transport Layer Security', category: 'Security & Compliance', revised: '2026-07-14',
    definition: 'Two-way certificate authentication enforced between services inside the Istio service mesh.' },
  { id: 'gl-mttr', term: 'MTTR', expansion: 'Mean Time To Recovery', category: 'Engineering & DevOps', revised: '2026-07-12',
    definition: 'Average time taken to restore a service after an incident, tracked against Sev-1 SLAs.' },
  { id: 'gl-nda', term: 'NDA', expansion: 'Non-Disclosure Agreement', category: 'Legal & Finance', revised: '2026-06-30',
    definition: 'A contract that legally restricts sharing of confidential information with third parties.' },
  { id: 'gl-okr', term: 'OKR', expansion: 'Objectives and Key Results', category: 'Product Strategy & Design', revised: '2026-07-01',
    definition: 'Quarterly goal-setting framework linking ambitious objectives to measurable key results.' },
  { id: 'gl-pii', term: 'PII', expansion: 'Personally Identifiable Information', category: 'Security & Compliance', revised: '2026-07-17',
    definition: 'Any data that can identify an individual, handled under strict access and retention rules.' },
  { id: 'gl-rag', term: 'RAG', expansion: 'Retrieval-Augmented Generation', category: 'Engineering & DevOps', revised: '2026-08-01',
    definition: 'AI technique that grounds model answers in retrieved enterprise documents with cited sources.' },
  { id: 'gl-rbac', term: 'RBAC', expansion: 'Role-Based Access Control', category: 'Security & Compliance', revised: '2026-07-08',
    definition: 'Access model granting permissions based on a user role such as Admin, Manager or Employee.' },
  { id: 'gl-sla', term: 'SLA', expansion: 'Service Level Agreement', category: 'Engineering & DevOps', revised: '2026-07-25',
    definition: 'A committed service standard, such as 4-minute Incident Commander response for Sev-1 incidents.' },
  { id: 'gl-soc2', term: 'SOC 2', expansion: 'System and Organization Controls 2', category: 'Security & Compliance', revised: '2026-07-03',
    definition: 'Independent audit report covering security, confidentiality and processing integrity controls.' },
  { id: 'gl-sso', term: 'SSO', expansion: 'Single Sign-On', category: 'Security & Compliance', revised: '2026-06-26',
    definition: 'Authentication method letting employees access every internal tool with one corporate login.' },
  { id: 'gl-tls', term: 'TLS', expansion: 'Transport Layer Security', category: 'Security & Compliance', revised: '2026-07-18',
    definition: 'Encryption protocol protecting data in transit; EKA enforces TLS 1.3.' },
  { id: 'gl-wfa', term: 'WFA', expansion: 'Work From Anywhere', category: 'People & HR Operations', revised: '2026-07-21',
    definition: 'Policy allowing employees to work remotely across supported countries for a limited number of days per year.' },
];