// UI-only constants. No document records here (those come from the services).

// Filter dropdown. value = lowercase/uppercase as stored in doc.format (upper-cased in rows)
export const documentFormats = [
  { value: 'PDF', label: 'PDF' },
  { value: 'DOCX', label: 'DOCX' },
  { value: 'MD', label: 'Markdown' },
  { value: 'CSV', label: 'Sheet (CSV)' },
  { value: 'TXT', label: 'Text (TXT)' },
];

// Donut config only. Counts are computed from rows via buildHealth().
// "Outdated" hata diya: services me aisa status nahi hai (friend se poochna hai).
const HEALTH_META = [
  { key: 'indexed', label: 'Indexed', color: 'var(--status-success)' },
  { key: 'processing', label: 'Processing', color: 'var(--status-info)' },
  { key: 'failed', label: 'Failed', color: 'var(--status-danger)' },
];

// rows = documents list; row.status is 'Indexed' | 'Processing' | 'Failed'
const isOutdated = (r) => Boolean(r.isOutdated); // TODO: friend ka field/rule aate hi yahan badlo

export function buildHealth(rows = []) {
  return HEALTH_META.map((m) => ({
    ...m,
    count: rows.filter((r) => String(r.status).toLowerCase() === m.key).length,
  }));
}

// Static until friend's storageService exists (Pending #7)
export const documentStorage = { usedGb: 14.2, totalGb: 50 };