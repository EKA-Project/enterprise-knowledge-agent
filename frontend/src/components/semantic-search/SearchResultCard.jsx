import { CheckCircle2 } from "lucide-react";
import HighlightedText from "./HighlightedText";

export default function SearchResultCard({ result, index, terms, delay = 0, onPreview }) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <article
      style={{ animationDelay: `${delay}ms` }}
      className="ssp-rise flex w-full flex-col rounded-2xl border border-(--border-subtle) bg-(--bg-surface) p-5 shadow-(--shadow-sm) transition duration-200 hover:-translate-y-0.5 hover:border-(--border-medium) hover:shadow-(--shadow-md)"    >
        <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="grid h-6 w-10 shrink-0 place-items-center rounded-lg border border-(--border-medium) bg-(--bg-surface-subtle) font-(family-name:--font-mono) text-[10px] font-semibold text-(--text-muted)">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="grid h-6 w-10 shrink-0 place-items-center rounded-lg border border-(--status-verified-border) bg-(--status-verified-bg) font-(family-name:--font-mono) text-[10px] font-semibold tracking-wider text-(--status-verified)">
            {result.fileType}
          </span>
          <div>
            <h3 className="text-[15px] font-bold leading-snug text-(--text-primary)">
              <HighlightedText text={result.title} terms={terms} />
            </h3>
            <p className="mt-0.5 font-(family-name:--font-mono) text-[10.5px] text-(--text-muted)">
              Page {result.page} • {result.category}
            </p>
          </div>
        </div>

        <span className="shrink-0 rounded-full bg-(--status-success-bg) px-2.5 py-1 font-(family-name:--font-mono) text-[10.5px] font-semibold text-(--status-success)">
          {result.matchPercent}% match
        </span>
      </div>

<p className="mt-3 rounded-xl bg-(--bg-surface-subtle) px-4 py-3 text-[13px] leading-[1.6] text-(--text-secondary)">        <HighlightedText text={result.excerpt} terms={terms} />
      </p>
      {/* ↑ The text found in the document. */}

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-(--border-subtle) pt-3">        {/* ↑ border-t is the single line between the excerpt and the footer. */}
        <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-(--status-verified)">
            <CheckCircle2 size={13} aria-hidden="true" />
          {result.verified ? "Verified source" : "Unverified source"} • Click to preview citation
        </span>
        <button
          type="button"
          onClick={() => onPreview(result)}
          className="rounded-full border border-(--border-medium) bg-(--bg-surface) px-3 py-1 text-[11px] font-semibold text-(--text-primary) transition hover:border-(--accent-highlight) hover:bg-(--primary-light) active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus)"
        >
          Preview Citation →
        </button>
        {/* ↑ Smaller pill: px-3 py-1 text-[11px] (was px-4 py-1.5 text-[12px]). */}
      </div>
    </article>
  );
}