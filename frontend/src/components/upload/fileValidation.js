import {
  ACCEPTED_EXTENSIONS,
  ACCEPTED_LABEL,
  MAX_FILE_SIZE_BYTES,
  MAX_FILE_SIZE_MB,
} from "./uploadConstants.js";

// "Report.Final.PDF" -> "pdf"; "README" -> ""
export function getFileExtension(name = "") {
  const dot = name.lastIndexOf(".");
  return dot > 0 ? name.slice(dot + 1).toLowerCase() : "";
}

// 1536 -> "1.5 KB"
export function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Returns { ok: true, format } for a usable file, or
 * { ok: false, code: "type" | "empty" | "size", message }.
 * We check the extension, not file.type, because browsers report
 * unreliable MIME types for .md and .csv.
 */
export function validateFile(file) {
  const format = ACCEPTED_EXTENSIONS[getFileExtension(file.name)];

  if (!format) {
    return {
      ok: false,
      code: "type",
      message: `"${file.name}" isn't supported. Use ${ACCEPTED_LABEL}.`,
    };
  }

  if (file.size === 0) {
    return {
      ok: false,
      code: "empty",
      message: `"${file.name}" is empty, so there is nothing to ingest.`,
    };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      ok: false,
      code: "size",
      message: `"${file.name}" is ${formatFileSize(file.size)}. The limit is ${MAX_FILE_SIZE_MB}MB.`,
    };
  }

  return { ok: true, format };
}