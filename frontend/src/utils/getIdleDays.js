// EKA-EDIT: new file. "Not opened recently" = days since lastOpenedAt, or since uploadedAt if never opened (blueprint 4.3).
/** @param {{lastOpenedAt?: string|null, uploadedAt: string}} doc */
export function getIdleDays(doc, now = Date.now()) {
  const ref = Date.parse(doc.lastOpenedAt ?? doc.uploadedAt);
  return Math.max(0, Math.floor((now - ref) / 86400000));
}