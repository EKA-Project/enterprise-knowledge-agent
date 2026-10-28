const UNITS = ["B", "KB", "MB", "GB", "TB"];

// Stored value is raw bytes (documents.sizeBytes); the label is a UI decision.
// 1 KB = 1024 bytes, so 2516582 bytes -> "2.4 MB" as in the blueprint example.
export function formatFileSize(bytes) {
  if (!Number.isFinite(bytes) || bytes < 0) return "—";

  let value = bytes;
  let unit = 0;
  // Compare the ROUNDED value so 1023.96 KB becomes "1 MB", not "1024 KB".
  while (Math.round(value * 10) / 10 >= 1024 && unit < UNITS.length - 1) {
    value /= 1024;
    unit += 1;
  }

  const text =
    unit === 0 ? String(Math.round(value)) : value.toFixed(1).replace(/\.0$/, "");
  return `${text} ${UNITS[unit]}`;
}