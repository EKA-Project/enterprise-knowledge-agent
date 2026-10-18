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
    
    // Knowledge Base articles linked to this document
  connectedArticles: [
    {
      id: 'wfa-90-day',
      title: 'Work from Anywhere (WFA) 90-Day Policy Rules',
      excerpt:
        'Employees may work remotely outside their primary tax country for up to 90 days per rolling calendar year. Submit travel requests at least 14 days in advance via HR Portal.',
      verified: true,
    },
    {
      id: 'data-encryption',
      title: 'Data Encryption & Zero-Training Guarantees',
      excerpt:
        'All document embeddings and conversational inputs in EKA are encrypted with tenant KMS keys using AES-256 at rest and TLS 1.3 in transit. Data is never used for training.',
      verified: true,
    },
  ],
  // Other documents related to this one
  sisterDocuments: [
    {
      id: 3,
      title: '2026 Global Remote Work, Travel & Flexible Hours Policy',
      format: 'PDF',
      category: 'People & HR Operations',
      author: 'Sophia Sterling (VP People & Culture)',
    },
    {
      id: 2,
      title: 'SOC 2 Type II Security & Data Governance Compliance Report',
      format: 'PDF',
      category: 'Security & Compliance',
      author: 'Nadia Al-Mansoor (Chief Information Security Officer)',
    },
  ],

  // Served by the backend later (a signed/static URL of the original file)
  pdfUrl: '/sample/enterprise_policy.pdf',
  // Reader pages. `text` keeps the raw "###" markdown, shown as-is in the video.
  readerPages: [
    {
      page: 1, title: '1. Corporate Governance & Ethics',
      text: 'This document outlines the operational frameworks, compliance mandates, and corporate governance protocols for Northstar Studio Inc. (the "Company"). As a modern, remote-first organization operating across multiple jurisdictions, these rules ensure operational integrity, regulatory compliance, and consistent behavior globally.\n\n### 1.1 Code of Conduct & Workplace Standards The Company is dedicated to providing a professional, respectful, and safe environment for all employees, contractors, and partners. All members are expected to conduct business with honesty, fairness, and the highest standards of professional ethics. Harassment, discrimination, or retaliation of any kind will not be tolerated and represents grounds for immediate termination.\n\n### 1.2 Whistleblower Protection Protocols We encourage open dialogue and encourage reporting of any unethical behavior. The Company provides anonymous reporting channels where suspected violations of law, regulations, or policies can be submitted without fear of retaliation. Investigations will be handled with strict confidentiality by the Legal Operations Committee.',
    },
    {
      page: 2, title: '2. Information Security & Data Protection',
      text: "Data security is paramount to the trust our customers place in Northstar Studio. EKA's cloud infrastructure utilizes strict multi-tenant database isolation, advanced cryptographic keys, and mandatory threat modeling. All members must adhere to strict protection guidelines.\n\n### 2.1 Encryption Standards & KMS Management All data ingested into the EKA enterprise assistant must be encrypted at rest using AES-256 with unique tenant KMS keys. Data in transit requires TLS 1.3 encryption. Key rotation occurs automatically every 90 days. Decryption keys are isolated within a secure vault, inaccessible to model-training pipelines.\n\n### 2.2 Device & IAM Access Controls Workstations must run corporate MDM profiles, enforce full disk encryption (BitLocker/FileVault), and require phishing-resistant Multi-Factor Authentication (MFA) via hardware keys or certified authenticator apps. Password strength must be 16-character minimum passphrases.",
    },
    {
      page: 3, title: '3. Remote Work & Global Travel',
      text: 'Northstar Studio operates as a high-autonomy, remote-first workplace. While flexibility is core to our operations, specific legal, tax, and collaborative structures must be maintained to ensure seamless business continuity across multiple timezones.\n\n### 3.1 Work From Anywhere (WFA) Policy Employees are permitted to work outside their primary tax residency state or country for up to 90 calendar days per rolling calendar year. WFA requests require 14 days advance notification via HR portals to evaluate potential permanent establishment tax risks.\n\n### 3.2 Reimbursements & Travel Allowances The Company subsidizes co-working memberships up to $300 USD per month. Approved corporate travel reimbursements are managed via Navan Expense. Lodging thresholds are capped at $250 USD/night for Tier 1 cities, and daily meal allowances are capped at $75 USD per day.',
    },
    {
      page: 4, title: '4. Intellectual Property & AI Usage',
      text: 'Proprietary knowledge is our core competitive advantage. Employees must protect intellectual assets, ensure correct usage of AI assistance, and guarantee that no client data leaks into public domains.\n\n### 4.1 Ownership of Inventions & Works All software code, graphic designs, vectors, and documentation developed during employment remain the sole intellectual property of Northstar Studio. Departing employees must surrender access to all repositories and return all corporate devices immediately upon termination.\n\n### 4.2 Zero Model-Training & AI Governance Agreements To comply with enterprise security agreements, EKA integrations operate on zero-training LLM APIs. All queries, indexes, and document content remain strictly localized to the tenant container. No user prompts or document vectors may be used for model fine-tuning or training purposes.',
    },
    {
      page: 5, title: '5. Incident Command & SRE SLAs',
      text: 'Sustaining platform availability is vital. In the event of system outages or degraded performance, the Site Reliability Engineering (SRE) team will coordinate response metrics under the Incident Command System (ICS) to restore target levels.\n\n### 5.1 Response SLAs & Notification Schedules For Sev-1 outages, an Incident Commander must be assigned within 4 minutes. Ingress routing failover triggers automatically if packet loss exceeds 15% for 3 minutes. Public status page logs must be updated within 10 minutes, with subsequent progress reports posted every 20 minutes.\n\n### 5.2 Blameless Post-Mortems Following resolution, technical leads must schedule a blameless post-mortem within 48 hours. The objective is to analyze timeline events, identify root causes, and log preventative software or infrastructure tickets in Jira, ensuring continuous reliability improvements.',
    },
  ],
};

export async function getDocumentSummary() {
  // id is ignored until the backend exists
  return mockSummary;
}


// Mock write actions. Replace each body with a fetch/PATCH call later.
export async function setDocumentFlag(id, flag, value) {
  return { id, [flag]: value };
}
export async function setDocumentArchived(id, archived) {
  return { id, archived };
}
export async function reindexDocument(id) {
  return { id, status: 'queued' };
}
