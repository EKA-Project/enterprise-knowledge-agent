import { CheckCircle2 } from "lucide-react";
import HighlightedText from "./HighlightedText";

export default function SearchResultCard({ result, index, terms, delay = 0, onPreview }) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <article
      style={{ animationDelay: `${delay}ms` }}
className="ssp-rise flex w-full flex-col rounded-2xl border border-[#e0edf5] bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#c8e2f3] hover:shadow-md"    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-(--bg-app) font-(family-name:--font-mono) text-[11px] text-(--text-muted)">
            {number}
          </span>
          <span className="mt-1 rounded-md border border-(--border-medium) bg-(--bg-app) px-2 py-0.5 font-(family-name:--font-mono) text-[10px] font-bold uppercase tracking-wider text-(--text-primary)">
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

<p className="mt-3 rounded-xl bg-[#e0eff9] px-4 py-3 text-[13px] leading-[1.6] text-[#56718b]">        <HighlightedText text={result.excerpt} terms={terms} />
      </p>
      {/* ↑ The text found in the document. */}

<div className="mt-4 flex items-center justify-between gap-3 border-t border-[#e0edf5] pt-3">        {/* ↑ border-t is the single line between the excerpt and the footer. */}
<span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#48b99a]">          <CheckCircle2 size={13} aria-hidden="true" />
          {result.verified ? "Verified source" : "Unverified source"} • Click to preview citation
        </span>
        <button
          type="button"
          onClick={() => onPreview(result)}
          className="rounded-full border border-[#cfe5f5] bg-white px-3 py-1 text-[11px] font-semibold text-[#29445b] transition hover:border-[#8bcaf0] hover:bg-[#f3faff] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#68b8e8]"
        >
          Preview Citation →
        </button>
        {/* ↑ Smaller pill: px-3 py-1 text-[11px] (was px-4 py-1.5 text-[12px]). */}
      </div>
    </article>
  );
}