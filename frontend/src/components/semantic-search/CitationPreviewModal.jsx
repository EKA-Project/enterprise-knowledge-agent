import { useEffect, useRef } from "react";
import { X, ShieldCheck, Bookmark, Activity, ListTree } from "lucide-react";
import HighlightedText from "./HighlightedText";

export default function CitationPreviewModal({ result, terms, onClose, onFollowUp, onOpenReader }) {
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  // ↑ Focuses the close button on open. Esc closes the dialog.

  const { citation } = result;

  return (
    <div
      className="ssp-fade fixed inset-0 z-50 grid place-items-center bg-(--sidebar-bg)/45 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="citation-title"
        onClick={(e) => e.stopPropagation()}
        className="ssp-pop w-full max-w-lg rounded-2xl border border-(--border-medium) bg-(--bg-surface) p-6 shadow-(--shadow-lg)"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-(--primary) px-2 py-0.5 font-(family-name:--font-mono) text-[9.5px] font-bold uppercase tracking-wider text-(--primary-contrast)">
                {result.verified ? "Verified" : "Unverified"}
              </span>
              <span className="rounded-full border border-(--border-medium) px-2.5 py-0.5 text-[11px] font-semibold text-(--text-secondary)">
                {result.category}
              </span>
            </div>
            <h2
              id="citation-title"
              className="mt-3 font-(family-name:--font-serif) text-[20px] font-bold leading-snug text-(--text-primary)"
            >
              {result.title}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close citation preview"
            className="grid size-8 shrink-0 place-items-center rounded-full border border-(--border-medium) text-(--text-secondary) transition hover:border-(--primary) hover:text-(--primary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus)"
          >
            <X size={15} />
          </button>
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-4 rounded-xl border border-(--border-subtle) bg-(--bg-app) p-4">
          <div>
            <dt className="flex items-center gap-1.5 font-(family-name:--font-mono) text-[9px] uppercase tracking-widest text-(--text-muted)">
              <Bookmark size={10} aria-hidden="true" /> Citation reference
            </dt>
            <dd className="mt-1 text-[13px] font-bold text-(--text-primary)">
              Page {citation.page} • Lines {citation.lines.replace("-", "–")}
            </dd>
          </div>
          <div>
            <dt className="flex items-center gap-1.5 font-(family-name:--font-mono) text-[9px] uppercase tracking-widest text-(--text-muted)">
              <Activity size={10} aria-hidden="true" /> Vector relevance
            </dt>
            <dd className="mt-1 text-[13px] font-bold text-(--text-primary)">{result.matchPercent}% Match Confidence</dd>
          </div>
          <div className="col-span-2">
            <dt className="flex items-center gap-1.5 font-(family-name:--font-mono) text-[9px] uppercase tracking-widest text-(--text-muted)">
              <ListTree size={10} aria-hidden="true" /> Section heading
            </dt>
            <dd className="mt-1 text-[13px] text-(--text-secondary)">{citation.section}</dd>
          </div>
        </dl>

        <div className="mt-5 flex items-center justify-between">
          <p className="flex items-center gap-1.5 font-(family-name:--font-mono) text-[10px] uppercase tracking-widest text-(--text-secondary)">
            <ShieldCheck size={12} aria-hidden="true" /> Verified document excerpt
          </p>
          <span className="rounded-full bg-(--status-success-bg) px-2 py-0.5 text-[10px] font-semibold text-(--status-success)">
            Grounded Source
          </span>
        </div>
        <p className="mt-2 rounded-xl border border-(--border-subtle) bg-(--bg-app) px-4 py-3.5 text-[13.5px] leading-7 text-(--text-secondary)">
          <HighlightedText text={result.excerpt} terms={terms} />
        </p>

        <div className="mt-5 flex flex-wrap justify-end gap-2.5">
          <button
            type="button"
            onClick={onFollowUp}
            className="rounded-full border border-(--border-subtle-nav) px-4 py-2 text-[12.5px] font-semibold text-(--text-primary) transition hover:border-(--primary) hover:text-(--primary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus)"
          >
            Ask AI Follow-up →
          </button>
          <button
            type="button"
            onClick={onOpenReader}
            className="rounded-full bg-(--primary) px-4 py-2 text-[12.5px] font-bold text-(--primary-contrast) transition hover:bg-(--primary-hover) active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus)"
          >
            Open Full Reader (Page {citation.page}) →
          </button>
        </div>
      </div>
    </div>
  );
}