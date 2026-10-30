import { formatFileSize } from "./formatFileSize.js";

// What one dashboard document row needs. Every value shown is derived from the
// stored document (blueprint rule 6): nothing here is typed by hand.
// `departmentNames` is a Map of departmentId -> name, because documents store
// ids, never names (blueprint rule 3).
export function toDocumentRow(doc, departmentNames) {
  const department = departmentNames.get(doc.departmentId) ?? "Unknown department";
  return {
    id: doc.id,
    type: doc.format, // the row shows it uppercase and picks the tile colour from it
    title: doc.title,
    meta: `${department} • ${formatFileSize(doc.sizeBytes)}`,
  };
}