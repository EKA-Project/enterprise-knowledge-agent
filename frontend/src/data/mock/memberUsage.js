// @ts-check
// MOCK-ONLY: per-member usage. Not a blueprint table (there is no "question
// asked" event yet), so it is deleted with src/data/mock/ in Phase C. Only
// usageService reads this file.
//
// Every total the dashboard shows (7, 14 and 30 days, weekly bars, department
// velocity, growth %) is calculated from dailyQueries, never typed.
// 60 days = two 30-day periods, so "growth vs previous period" is real.
// Covers the active Engineering & DevOps users only; the admin dashboard issue
// adds the other departments.

// lastActiveAt is relative to "now" so the roster never says "3 weeks ago".
/** @param {number} hours */
const hoursAgo = (hours) => new Date(Date.now() - hours * 3_600_000).toISOString();

/** @type {import('../../types/usage.js').MemberUsage[]} */
export const memberUsage = [
  {
    userId: "usr_003", // Aryaan Raza (manager)
    dailyQueries: [
      2,3,3,4,2,0,1,3,4,3,2,4,0,1,3,3,4,2,3,1,
      0,2,3,4,3,2,3,0,1,3,3,4,3,4,3,1,0,3,4,4,
      3,5,1,0,3,4,3,4,3,0,1,4,3,5,4,3,1,0,3,2,
    ],
    searches: 28,
    lastActiveAt: hoursAgo(1),
  },
  {
    userId: "usr_005", // Alex Morgan
    dailyQueries: [
      3,4,5,4,3,1,0,4,5,4,3,5,1,0,4,4,5,3,4,1,
      0,3,4,5,4,3,4,1,0,4,5,4,5,4,4,1,1,4,5,5,
      4,6,1,0,4,5,4,5,4,1,0,5,4,6,5,4,1,0,4,3,
    ],
    searches: 35,
    lastActiveAt: hoursAgo(26),
  },
  {
    userId: "usr_009", // Ben Carter
    dailyQueries: [
      1,2,2,3,2,0,0,2,3,2,1,3,0,0,2,2,3,1,2,0,
      0,1,2,3,2,1,2,0,0,2,2,3,2,3,2,0,0,2,3,3,
      2,3,0,0,2,3,2,3,2,0,0,3,2,3,3,2,0,0,2,1,
    ],
    searches: 14,
    lastActiveAt: hoursAgo(70),
  },
  {
    userId: "usr_010", // Nina Patel
    dailyQueries: [
      2,3,3,3,2,1,0,3,3,3,2,4,0,1,3,3,3,2,3,1,
      0,2,3,3,3,2,3,0,1,3,3,4,3,3,3,1,0,3,4,3,
      3,4,1,0,3,3,3,4,3,0,1,4,3,4,4,3,1,0,3,2,
    ],
    searches: 22,
    lastActiveAt: hoursAgo(5),
  },
  {
    userId: "usr_019", // Liam O'Connor
    dailyQueries: [
      4,5,6,5,4,1,1,5,6,5,4,6,1,0,5,5,6,4,5,1,
      1,4,5,6,5,4,5,1,1,5,6,5,6,5,5,1,1,5,6,6,
      5,7,1,1,5,6,5,6,5,1,1,6,5,7,6,5,1,0,5,4,
    ],
    searches: 48,
    lastActiveAt: hoursAgo(0.25),
  },
  {
    userId: "usr_020", // Vikram Shah
    dailyQueries: [
      2,2,3,2,2,0,0,2,3,2,2,3,0,0,2,2,2,2,3,0,
      0,2,2,3,2,2,2,0,0,2,3,2,3,2,2,0,0,2,3,2,
      2,3,0,0,2,3,2,3,2,0,0,3,2,3,3,2,0,0,2,2,
    ],
    searches: 18,
    lastActiveAt: hoursAgo(3),
  },
  {
    userId: "usr_021", // Tariq Al-Hassan
    dailyQueries: [
      3,4,4,5,3,1,0,4,4,4,3,5,0,1,4,4,4,3,4,1,
      0,3,4,4,4,3,4,0,1,4,4,5,4,4,4,1,0,4,5,4,
      4,5,1,0,4,4,4,5,4,0,1,5,4,5,5,4,1,0,4,3,
    ],
    searches: 31,
    lastActiveAt: hoursAgo(6),
  },
  {
    userId: "usr_022", // Noah Becker
    dailyQueries: [
      1,2,2,2,1,0,0,2,2,2,1,2,0,0,2,2,2,1,2,0,
      0,1,2,2,2,1,2,0,0,2,2,2,2,2,2,0,0,2,2,2,
      1,2,0,0,2,2,1,2,2,0,0,2,1,2,2,1,0,0,2,1,
    ],
    searches: 9,
    lastActiveAt: hoursAgo(52),
  },
  {
    userId: "usr_023", // Ananya Iyer
    dailyQueries: [
      2,3,3,4,2,1,0,3,3,3,2,3,0,1,3,3,3,2,3,1,
      0,2,3,3,3,2,3,0,1,3,3,4,3,3,3,1,0,3,4,3,
      3,5,1,0,4,3,4,4,3,0,1,4,4,4,5,3,1,0,3,3,
    ],
    searches: 20,
    lastActiveAt: hoursAgo(2),
  },
];