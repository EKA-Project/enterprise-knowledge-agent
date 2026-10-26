// Mock storage numbers (backend later). Matches the reference video.
export const storageSummary = {
  usedGb: 14.3,
  totalGb: 50,
  freeGb: 35.7,
  documents: 23,
  reclaimableGb: 0.7,
  softDeleted: 2,
};

// `share` = % of used space. Bar width = gb / totalGb.
export const storageFormats = [
  { key: 'PDF', gb: 7.2, files: 4, share: 50.3, color: '#ee4544', tile: 'bg-[#fde2e1] text-[#d9373f]' },
  { key: 'DOCX', gb: 3.4, files: 6, share: 23.8, color: '#2563eb', tile: 'bg-[#e0ecff] text-[#2563eb]' },
  { key: 'MD', gb: 1.6, files: 4, share: 11.2, color: '#08966a', tile: 'bg-[#d9f7ea] text-[#08966a]' },
  { key: 'CSV', gb: 1.2, files: 5, share: 8.4, color: '#0c82c0', tile: 'bg-[#e0f1fd] text-[#0c82c0]' },
  { key: 'TXT', gb: 0.8, files: 4, share: 5.6, color: '#d87708', tile: 'bg-[#fff0c0] text-[#b86b00]' },
];
// ---- Free-up-space mock rows (MOCK: backend later) ----
let _n = 0;
const row = (type, name, file, dept, sizeMb, idleDays, cited, status, isProtected = false, group = null) => ({
  id: `sf-${++_n}`,
  type, name, file, dept, sizeMb, idleDays, cited, status, isProtected, group,
});

export const storageFiles = {
  large: [
    row('PDF', 'Annual Compliance Audit Report FY2025', 'annual_compliance_audit_fy2025.pdf', 'Legal', 148.2, 2, '5 days ago', 'Ready', true),
    row('PDF', 'Enterprise Security Architecture Handbook', 'security_architecture_handbook.pdf', 'Security', 121.7, 4, '1 day ago', 'Ready'),
    row('DOCX', 'Vendor Master Services Agreement Bundle', 'vendor_msa_bundle.docx', 'Legal', 96.4, 9, '12 days ago', 'Ready', true),
    row('PDF', 'Data Center Migration Playbook', 'dc_migration_playbook.pdf', 'Engineering', 84.0, 15, '3 weeks ago', 'Outdated'),
    row('CSV', 'Customer Churn Export Q2', 'customer_churn_q2.csv', 'Sales', 72.5, 21, 'Never', 'Ready'),
    row('PDF', 'Employee Benefits Guide 2025', 'employee_benefits_2025.pdf', 'HR', 64.9, 6, '2 days ago', 'Ready'),
    row('DOCX', 'Product Roadmap Narrative H2', 'product_roadmap_h2.docx', 'Product', 58.3, 3, '4 days ago', 'Ready'),
    row('MD', 'Platform Runbook Collection', 'platform_runbooks.md', 'Engineering', 51.6, 11, '1 week ago', 'Ready'),
    row('PDF', 'Financial Controls Testing Evidence', 'fin_controls_evidence.pdf', 'Finance', 47.2, 33, 'Never', 'Outdated'),
    row('CSV', 'Support Ticket Archive 2024', 'support_tickets_2024.csv', 'Operations', 43.8, 40, '2 months ago', 'Ready'),
    row('DOCX', 'Brand Guidelines Master', 'brand_guidelines_master.docx', 'Product', 39.5, 8, '6 days ago', 'Ready'),
    row('PDF', 'Incident Postmortem Compendium', 'incident_postmortems.pdf', 'Security', 34.1, 5, '3 days ago', 'Ready', true),
    row('TXT', 'Raw Crawl Log Dump', 'crawl_log_dump.txt', 'Engineering', 29.7, 60, 'Never', 'Ready'),
    row('PDF', 'Procurement Policy Manual', 'procurement_policy.pdf', 'Finance', 26.3, 12, '9 days ago', 'Ready'),
    row('DOCX', 'Onboarding Curriculum Pack', 'onboarding_curriculum.docx', 'HR', 22.8, 7, '5 days ago', 'Ready'),
    row('CSV', 'Sales Pipeline Snapshot', 'sales_pipeline_snapshot.csv', 'Sales', 19.4, 14, '2 weeks ago', 'Ready'),
    row('MD', 'API Design Standards', 'api_design_standards.md', 'Engineering', 16.9, 2, 'Today', 'Ready'),
    row('PDF', 'Facilities Safety Protocols', 'facilities_safety.pdf', 'Operations', 14.2, 18, '1 month ago', 'Outdated'),
    row('TXT', 'Legacy Migration Notes', 'legacy_migration_notes.txt', 'Operations', 12.6, 75, 'Never', 'Ready'),
    row('DOCX', 'Quarterly Board Briefing Draft', 'board_briefing_draft.docx', 'Finance', 10.8, 10, '8 days ago', 'Ready'),
  ],
  idle: [
    row('PDF', 'Legacy VPN Setup Guide', 'legacy_vpn_setup.pdf', 'Security', 8.4, 210, 'Never', 'Outdated'),
    row('DOCX', 'Office Relocation Checklist 2023', 'office_relocation_2023.docx', 'Operations', 3.2, 180, 'Never', 'Outdated'),
    row('MD', 'Deprecated Auth Service Notes', 'deprecated_auth_notes.md', 'Engineering', 1.1, 150, '5 months ago', 'Outdated'),
    row('CSV', 'Old Vendor Contact List', 'old_vendor_contacts.csv', 'Finance', 2.6, 120, 'Never', 'Ready'),
    row('PDF', 'Holiday Policy 2022', 'holiday_policy_2022.pdf', 'HR', 5.9, 100, '4 months ago', 'Outdated'),
    row('TXT', 'Scratch Meeting Notes', 'scratch_meeting_notes.txt', 'Product', 0.4, 75, 'Never', 'Ready'),
    row('DOCX', 'Campaign Brief Template v1', 'campaign_brief_v1.docx', 'Sales', 4.7, 55, '2 months ago', 'Ready'),
    row('PDF', 'Training Slides Export', 'training_slides_export.pdf', 'HR', 17.3, 40, 'Never', 'Ready'),
  ],
  failed: [
    row('PDF', 'Scanned Contract Batch 07', 'scanned_contracts_07.pdf', 'Legal', 18.6, 3, 'Never', 'Failed'),
    row('DOCX', 'Corrupted Pricing Sheet', 'pricing_sheet_corrupt.docx', 'Sales', 1.9, 6, 'Never', 'Failed'),
    row('CSV', 'Malformed Metrics Export', 'metrics_export_bad.csv', 'Operations', 0.9, 2, 'Never', 'Failed'),
  ],
  dupes: [
    row('PDF', 'Security Policy Handbook', 'security_policy_handbook.pdf', 'Security', 6.2, 5, '2 days ago', 'Ready', true, 'Security Policy Handbook'),
    row('PDF', 'Security Policy Handbook (copy)', 'security_policy_handbook_copy.pdf', 'Security', 6.2, 44, 'Never', 'Ready', false, 'Security Policy Handbook'),
    row('DOCX', 'Expense Reimbursement Form', 'expense_form.docx', 'Finance', 1.4, 9, '1 week ago', 'Ready', false, 'Expense Reimbursement Form'),
    row('DOCX', 'Expense Reimbursement Form (1)', 'expense_form_1.docx', 'Finance', 1.4, 90, 'Never', 'Ready', false, 'Expense Reimbursement Form'),
  ],
};
export const formatMb = (mb) => (mb >= 1024 ? `${(mb / 1024).toFixed(1)} GB` : `${mb.toFixed(1)} MB`);