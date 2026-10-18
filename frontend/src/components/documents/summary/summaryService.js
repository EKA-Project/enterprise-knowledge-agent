// Mock API. Later replace the body with:
//   const res = await fetch(`/api/documents/${id}/summary`); return res.json();
const mockSummary = {
  id: 1,
  title: 'Corporate Governance & Compliance Policy',
  format: 'PDF',
  category: 'People & HR Operations',
  status: 'Indexed',
  size: '2.4 MB',
  readTime: '8 min read',
  pages: 14,
  author: 'Legal Operations Committee',
  uploaded: '2026-08-12',
  chunks: 84,
  executiveSummary:
    'Official binding charter detailing corporate governance, whistleblower rules, information security, WFA guidelines, IP ownership, and incident escalation protocols at Northstar Studio.',
  keyInsights: [
    'Standard Code of Conduct requires professional behavior and carries strict compliance SLA rules.',
    'Secure AES-256 and TLS 1.3 encryption required with isolated zero model-training vaults.',
    'Work from Anywhere (WFA) limited to 90 days globally per rolling calendar year.',
    'Incident responses mandate Commander assignment within 4 minutes on Sev-1 cases.',
  ],
  entities: ['Corporate Governance', 'AES-256', '90-Day WFA', 'Zero-Training Vaults', 'ICS Command'],
  sections: [
    {
      id: 1, page: 1, title: 'Corporate Governance & Ethics',
      summary: 'Establishes mandatory Code of Conduct rules, zero-tolerance harassment standards, and confidential whistleblower protection channels handled by Legal Ops.',
      keywords: ['Zero-tolerance harassment policy', 'Anonymous whistleblower channels', 'Managed by Legal Ops Committee'],
    },
    {
      id: 2, page: 2, title: 'Information Security & Data Protection',
      summary: 'Defines enterprise information security mandates including AES-256 encryption at rest, TLS 1.3 in transit, 90-day KMS key rotation, and 16-character MFA workstation controls.',
      keywords: ['AES-256 & TLS 1.3 Encryption', '90-day KMS key rotation', '16-character MFA passphrases'],
    },
    {
      id: 3, page: 3, title: 'Remote Work & Global Travel',
      summary: 'Governs remote-first operations, Work From Anywhere (WFA) limits up to 90 days internationally locally, $1,500 annual wellness stipends, and Novan travel expense caps.',
      keywords: ['90-day WFA international limit', '$1,500 annual home stipend', 'Novan travel expense caps'],
    },
    {
      id: 4, page: 4, title: 'Intellectual Property & AI Usage',
      summary: 'Outlines intellectual property ownership rules and enforces zero model-training agreements to ensure enterprise data is never used to train LLMs.',
      keywords: ['100% IP ownership retained', 'Zero LLM model-training guarantee', 'Isolated tenant container'],
    },
    {
      id: 5, page: 5, title: 'Incident Command & SRE SLAs',
      summary: 'Mandates Site Reliability Engineering response SLAs, requiring Incident Commander assignment within 4 minutes on Sev-1 cases.',
      keywords: ['4-minute Commander assignment', 'Sev-1 response SLAs', 'Blameless post-mortems'],
    },
  ],
  telemetry: {
    vectorChunks: '84 chunks',
    totalPages: '14 pages',
    encryption: 'AES-256 (KMS)',
    tenantIsolation: 'Active (0 Training)',
    indexLatency: '284 ms',
  },
  suggestedQuestions: ['Summarize top action items', 'What are the compliance rules?'],
};

export async function getDocumentSummary() {
  // id is ignored until the backend exists
  return mockSummary;
}