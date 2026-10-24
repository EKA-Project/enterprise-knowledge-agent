const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// ↑ Makes characters like $ safe inside a regular expression.

export default function HighlightedText({ text, terms = [] }) {
  const cleaned = [...new Set(terms.map((t) => t.trim()).filter((t) => t.length >= 3))].sort(
    (a, b) => b.length - a.length,
  );
  // ↑ Longest first, so "time off work" wins over "time off" and "time".

  if (!cleaned.length) return <>{text}</>;

  const pattern = new RegExp(`((?<!\\w)(?:${cleaned.map(escapeRegExp).join("|")})\\w*)`, "gi");
  // ↑ A match must start at the beginning of a word and runs to the end of it,
  //   so "work" highlights all of "working", never half of it.

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