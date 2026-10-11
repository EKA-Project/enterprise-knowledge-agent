const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// ↑ Makes characters like $ safe inside a regular expression.

export default function HighlightedText({ text, terms = [] }) {
  const cleaned = [...new Set(terms.map((t) => t.trim()).filter((t) => t.length >= 3))].sort(
    (a, b) => b.length - a.length,
  );
  // ↑ Longest first, so the full phrase wins over single words.

  if (!cleaned.length) return <>{text}</>;

  const pattern = new RegExp(`(${cleaned.map(escapeRegExp).join("|")})`, "gi");

  return text.split(pattern).map((part, i) =>
    i % 2 === 1 ? (
      <mark
        key={i}
        className="rounded-md bg-(--highlight-bg) px-1.5 py-0.5 font-semibold text-(--highlight-text) shadow-(--highlight-shadow)"
      >
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}
// ↑ Wraps matching words in a highlight, using your --highlight-* tokens.