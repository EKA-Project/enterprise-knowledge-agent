/**
 * Collection Insights step 7 (blueprint 10.2/10.3): add up keyword weights per
 * lowercase term across the READY insights the viewer may read, then keep the
 * top few. Nothing is stored, so it can't go stale or leak unreadable documents.
 *
 * @param {import('../types').DocumentInsight[]} readyInsights
 * @param {number} [limit]
 * @returns {import('../types').Keyword[]}  `weight` here is a sum, so it can exceed 1
 */
export function aggregateKeywords(readyInsights, limit = 6) {
  const totals = new Map();
  for (const insight of readyInsights) {
    for (const { term, weight, kind } of insight.keywords) {
      const key = term.toLowerCase();
      const entry = totals.get(key) ?? { term, weight: 0, kind };
      entry.weight += weight;
      totals.set(key, entry);
    }
  }
  return [...totals.values()]
    .sort((a, b) => b.weight - a.weight || a.term.localeCompare(b.term))
    .slice(0, limit);
}