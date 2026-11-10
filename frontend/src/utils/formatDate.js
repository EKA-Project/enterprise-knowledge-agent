// Formats an ISO timestamp as "Oct 27, 2026". Kept separate from
// formatRelativeTime, which produces "2 hours ago" style text.
const DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function formatDate(isoString) {
  if (!isoString) return "—";
  return DATE_FORMAT.format(new Date(isoString));
}