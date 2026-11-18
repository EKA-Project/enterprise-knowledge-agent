// EKA-EDIT: new file. Storage page thresholds (frontend config, never in the DB).
// Quota = backend STORAGE_QUOTA_BYTES later (blueprint 4.10).

export const STORAGE_QUOTA_BYTES = 50 * 1024 ** 3; // 50 GB
export const STORAGE_WARNING_PERCENT = 80;

// Free up space tab filters (buttons only, never stored)
export const LARGE_FILE_CHIPS_MB = [10, 50, 100];
export const DEFAULT_LARGE_MB = 10;
export const CUSTOM_QUICK_MB = [15, 35, 75, 150];
export const IDLE_CHIPS_DAYS = [30, 60, 90];
export const DEFAULT_IDLE_DAYS = 90;

// Existing UI text already says 30 days
export const RECYCLE_BIN_RETENTION_DAYS = 30;
// EKA-EDIT: format label + color are UI-only (blueprint rule 5). Keys = documents.format enum.
export const FORMAT_META = {
  pdf: { label: 'PDF Documents', color: '#ee4544' },
  docx: { label: 'Word Documents', color: '#2563eb' },
  md: { label: 'Markdown Specs', color: '#08966a' },
  csv: { label: 'CSV Data Tables', color: '#0c82c0' },
  txt: { label: 'Text Transcripts', color: '#d87708' },
};