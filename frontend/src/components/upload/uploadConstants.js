// Upload limits and accepted file types for the "Ingest New Enterprise Document" modal.

export const MAX_FILE_SIZE_MB = 20;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

// extension -> format key (same keys used by documents: PDF, DOCX, MD, CSV, TXT)
export const ACCEPTED_EXTENSIONS = {
  pdf: "PDF",
  docx: "DOCX",
  md: "MD",
  markdown: "MD",
  csv: "CSV",
  txt: "TXT",
};

// For <input type="file" accept="...">
export const FILE_INPUT_ACCEPT = Object.keys(ACCEPTED_EXTENSIONS)
  .map((ext) => `.${ext}`)
  .join(",");

// Human-readable list for hints and error messages
export const ACCEPTED_LABEL = "PDF, DOCX, Markdown, CSV, TXT";