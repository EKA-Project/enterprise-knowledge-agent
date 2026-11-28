// @ts-check
// MOCK-ONLY: per-member usage. Not a blueprint table (there is no "question
// asked" event yet), so it is deleted with src/data/mock/ in Phase C. Only
// usageService reads this file.
//
// Every total the dashboard shows (7, 14 and 30 days, weekly bars, department
// velocity, growth %) is calculated from dailyQueries, never typed.
// 60 days = two 30-day periods, so "growth vs previous period" is real.
// The Engineering & DevOps rows are typed by hand below. Every other active user
// (the admin included) gets generated rows at the end of the file, so every
// active user has usage and the admin dashboard can add everyone up.

// lastActiveAt is relative to "now" so the roster never says "3 weeks ago".
/** @param {number} hours */
const hoursAgo = (hours) => new Date(Date.now() - hours * 3_600_000).toISOString();

/** @type {import('../../types/usage.js').MemberUsage[]} */
const engineeringUsage = [
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

// ── Generated usage for every other active user ─────────────────────
// 13 more hand-typed arrays of 60 numbers would be long and hard to review, so
// these rows are generated. The generator is seeded (no Math.random): the same
// user always gets the same numbers, so the mock never changes between reloads
// and validate:mock stays stable.

// Must equal USAGE_DAYS in usageService.js (validate:mock checks the length).
const GENERATED_DAYS = 60;

/**
 * Small seeded random generator (mulberry32). It returns a function that gives
 * numbers from 0 up to (not including) 1, in the same order every time.
 * @param {number} seed
 */
function seededRandom(seed) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * 60 daily question counts, oldest first, in the same shape as the typed rows:
 * quiet days at positions 5 and 6 of every 7-day block, and usage growing about
 * 10% over the period so "vs previous period" is a believable positive number.
 * @param {string} userId       "usr_011" gives the generator its seed
 * @param {number} weekdayLevel typical questions on a normal day
 * @returns {number[]}
 */
function generateDailyQueries(userId, weekdayLevel) {
  const random = seededRandom(Number(userId.replace("usr_", "")) * 9973);
  return Array.from({ length: GENERATED_DAYS }, (_, day) => {
    if (day % 7 >= 5) return random() < 0.5 ? 0 : 1; // quiet days
    const growth = 0.9 + 0.2 * (day / (GENERATED_DAYS - 1)); // 0.9 -> 1.1
    const wobble = random() * 2 - 1; // -1 to +1 keeps days from looking identical
    return Math.max(0, Math.round(weekdayLevel * growth + wobble));
  });
}

// [userId, typical questions per weekday, searches in 30 days, hours since last active]
/** @type {[string, number, number, number][]} */
const GENERATED_ROWS = [
  ["usr_001", 2, 12, 2], // Raza (admin)
  ["usr_002", 3, 19, 4], // Priya Nair (HR manager)
  ["usr_004", 3, 21, 9], // Marcus Chen (PROD manager)
  ["usr_006", 2, 15, 30], // Sofia Alvarez (SEC manager)
  ["usr_007", 3, 24, 7], // Jordan Blake (GTM manager)
  ["usr_008", 2, 11, 55], // Helena Ortiz (LEGAL manager)
  ["usr_011", 3, 20, 3], // Tom Reyes
  ["usr_012", 2, 13, 28], // Aisha Khan
  ["usr_013", 4, 33, 1], // Leo Fischer
  ["usr_014", 3, 22, 12], // Mei Tanaka
  ["usr_015", 2, 10, 80], // Omar Haddad
  ["usr_016", 3, 17, 6], // Clara Dubois
  ["usr_017", 1, 8, 100], // Ravi Menon
];

/** @type {import('../../types/usage.js').MemberUsage[]} */
const generatedUsage = GENERATED_ROWS.map(
  ([userId, weekdayLevel, searches, hoursSinceActive]) => ({
    userId,
    dailyQueries: generateDailyQueries(userId, weekdayLevel),
    searches,
    lastActiveAt: hoursAgo(hoursSinceActive),
  }),
);

/** @type {import('../../types/usage.js').MemberUsage[]} */
export const memberUsage = [...engineeringUsage, ...generatedUsage];