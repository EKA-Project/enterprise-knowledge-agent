// Shape for per-member usage. MOCK-ONLY for now: the blueprint has no
// "question asked" event yet, so the real backend will need one (see the issue).

/**
 * @typedef {Object} MemberUsage
 * @property {string} userId
 * @property {number[]} dailyQueries  Questions asked per day, 60 values, oldest first. The last value is today.
 * @property {number} searches        Knowledge searches in the last 30 days
 * @property {string} lastActiveAt    ISO timestamp
 */

/**
 * One row of GET /departments/{id}/usage: an active member's usage plus values
 * the API calculates for them.
 * @typedef {Object} DepartmentMemberUsage
 * @property {string} userId
 * @property {number[]} dailyQueries     60 values, oldest first, last = today
 * @property {number} searches           Knowledge searches in the last 30 days
 * @property {string|null} lastActiveAt  ISO timestamp, null if never active
 * @property {number} documentsUploaded  Non-archived documents this member uploaded
 */

/**
 * A department member as the manager overview uses them: the user record plus
 * their usage, merged by useManagerTeam.
 * @typedef {import('./users.js').User & DepartmentMemberUsage} TeamMember
 */

export {};