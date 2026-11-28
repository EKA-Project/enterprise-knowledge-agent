import { db } from './mockDb.js';

// Blueprint 4.8: cited / opened counts over the last N days, grouped by document.
export async function getDocumentActivityCounts({ days = 30 } = {}) {
  const since = Date.now() - days * 86400000;
  const counts = {};
  for (const e of db.activityEvents) { // CHECK: table name in mockDb.js
    if (!e.documentId || Date.parse(e.occurredAt) < since) continue;
    const c = (counts[e.documentId] ??= { cited: 0, viewed: 0 });
    if (e.type === 'cited') c.cited += 1;
    else if (e.type === 'opened') c.viewed += 1;
  }
  return counts;
}