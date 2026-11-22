// Shape for per-member usage. MOCK-ONLY for now: the blueprint has no
// "question asked" event yet, so the real backend will need one (see the issue).

/**
 * @typedef {Object} MemberUsage
 * @property {string} userId
 * @property {number[]} dailyQueries  Questions asked per day, 60 values, oldest first. The last value is today.
 * @property {number} searches        Knowledge searches in the last 30 days
 * @property {string} lastActiveAt    ISO timestamp
 */

export {};