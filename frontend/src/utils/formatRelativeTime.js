// "2 hours ago", "yesterday". Timestamps are stored as ISO 8601 UTC strings;
// the label is derived each time, never stored.
const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

// Largest unit first; the first one that fits wins.
const STEPS = [
  { unit: "year", seconds: 31536000 },
  { unit: "month", seconds: 2592000 },
  { unit: "day", seconds: 86400 },
  { unit: "hour", seconds: 3600 },
  { unit: "minute", seconds: 60 },
];

/**
 * @param {string|null|undefined} timestamp  ISO 8601 string
 * @param {number} [now]  Injectable clock, so results are predictable in checks
 * @returns {string|null}  null when the timestamp is missing or invalid, so the
 *                         caller decides the wording ("Never opened", "—", ...)
 */
export function formatRelativeTime(timestamp, now = Date.now()) {
  if (!timestamp) return null;
  const then = new Date(timestamp).getTime();
  if (Number.isNaN(then)) return null;

  const diffSeconds = Math.round((then - now) / 1000); // negative = in the past
  const abs = Math.abs(diffSeconds);
  if (abs < 60) return "just now";

  const { unit, seconds } = STEPS.find((step) => abs >= step.seconds);
  return rtf.format(Math.trunc(diffSeconds / seconds), unit);
}