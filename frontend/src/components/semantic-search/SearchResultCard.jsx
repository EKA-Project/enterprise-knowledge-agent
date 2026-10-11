import { CheckCircle2 } from "lucide-react";
import HighlightedText from "./HighlightedText";

export default function SearchResultCard({ result, index, terms, delay = 0, onPreview }) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <article
      style={{ animationDelay: `${delay}ms` }}
      className="ssp-rise rounded-2xl border border-(--border-medium) bg-(--bg-surface) p-5 shadow-(--shadow-sm) transition duration-200 hover:-translate-y-0.5 hover:border-(--border-subtle-nav) hover:shadow-(--shadow-md)"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="pt-1 font-(family-name:--font-mono) text-[11px] text-(--text-muted)">{number}</span>
          <span className="mt-0.5 rounded-md border border-(--border-medium) bg-(--bg-app) px-2 py-0.5 font-(family-name:--font-mono) text-[10px] font-bold uppercase tracking-wider text-(--text-primary)">
            {result.fileType}
          </span>
          <div>
            <h3 className="text-[15px] font-bold leading-snug text-(--text-primary)">{result.title}</h3>
            <p className="mt-0.5 font-(family-name:--font-mono) text-[10.5px] text-(--text-muted)">
              Page {result.page} • {result.category}
            </p>
          </div>
        </div>

        <span className="shrink-0 rounded-full bg-(--status-success-bg) px-2.5 py-1 font-(family-name:--font-mono) text-[10.5px] font-semibold text-(--status-success)">
          {result.matchPercent}% match
        </span>
      </div>

      <p className="mt-4 rounded-xl border border-(--border-subtle) bg-(--bg-app) px-4 py-3.5 text-[13.5px] leading-7 text-(--text-secondary)">
        <HighlightedText text={result.excerpt} terms={terms} />
      </p>

      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-(--status-success)">
          <CheckCircle2 size={13} aria-hidden="true" />
          {result.verified ? "Verified source" : "Unverified source"} • Click to preview citation
        </span>
        <button
          type="button"
          onClick={() => onPreview(result)}
          className="rounded-full border border-(--border-subtle-nav) bg-(--bg-surface) px-4 py-1.5 text-[12px] font-semibold text-(--text-primary) transition hover:border-(--primary) hover:bg-(--primary) hover:text-(--primary-contrast) active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus)"
        >
          Preview Citation →
        </button>
      </div>
    </article>
  );
}