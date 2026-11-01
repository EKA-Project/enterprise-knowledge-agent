/**
 * The "why related" line: keywords two documents have in common, highest
 * weight (from the first document) first.
 *
 * @param {import('../types').DocumentInsight} a
 * @param {import('../types').DocumentInsight} b
 * @param {number} [limit]
 * @returns {string[]}
 */
export function sharedKeywords(a, b, limit = 3) {
  const other = new Set(b.keywords.map((k) => k.term.toLowerCase()));
  return a.keywords
    .filter((k) => other.has(k.term.toLowerCase()))
    .sort((x, y) => y.weight - x.weight)
    .slice(0, limit)
    .map((k) => k.term);
}