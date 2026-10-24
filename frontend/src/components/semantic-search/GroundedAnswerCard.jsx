import { useState } from "react";
import { Sparkles, ArrowRight, Copy, ThumbsUp, ThumbsDown, Share2, RefreshCw, FileText } from "lucide-react";
import HighlightedText from "./HighlightedText";

//feedback icons
const iconBtn =
  "grid size-8 place-items-center rounded-lg border bg-(--bg-surface) transition hover:-translate-y-0.5 active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus)";
//status badge icons
function IconButton({ label, onClick, pressed, tone = "primary", children }) {
  const active =
    tone === "success"
      ? "border-(--status-success) bg-(--status-success-bg) text-(--status-success)"
      : "border-(--status-danger) bg-(--status-danger-bg) text-(--status-danger)";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      aria-pressed={pressed}
      className={`${iconBtn} ${
        pressed ? active : "border-(--border-medium) text-(--text-secondary) hover:border-(--primary) hover:text-(--primary)"
      }`}
    >
      {children}
    </button>
  );
}
//grounded answer card component
export default function GroundedAnswerCard({
  answer, sourceTitle, citation, terms, regenerating,
  onOpenCitation, onFollowUp, onCopy, onFeedback, onShare, onRegenerate,
}) {
  const [feedback, setFeedback] = useState(null);

  const choose = (kind) => {
    const next = feedback === kind ? null : kind;
    setFeedback(next);
    if (next) onFeedback(next);
  };
  // ↑ Clicking the same thumb again clears it. The toast shows only when one is selected.

  return (
    <section
      aria-label="AI grounded answer"
      className="ssp-rise rounded-2xl border border-(--border-subtle-nav) bg-(image:--gradient-card) p-5 shadow-(--shadow-sm)"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-(--primary) px-2.5 py-1 font-(family-name:--font-mono) text-[10px] font-semibold uppercase tracking-widest text-(--primary-contrast)">
            <Sparkles size={11} aria-hidden="true" /> AI Grounded Answer
          </span>
          <span className="text-[12px] text-(--text-muted)">
            Source: <span className="font-semibold text-(--text-secondary)">{sourceTitle}</span>
          </span>
        </div>

        <button
          type="button"
          onClick={onFollowUp}
          className="inline-flex items-center gap-1.5 rounded-full border border-(--border-subtle-nav) bg-(--bg-surface) px-3.5 py-1.5 text-[12px] font-semibold text-(--text-primary) transition hover:border-(--primary) hover:text-(--primary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus)"
        >
          Ask Follow-up Question <ArrowRight size={13} aria-hidden="true" />
        </button>
      </div>

      <p
        className={`mt-4 text-[16px] leading-relaxed text-(--text-primary) transition-opacity duration-300 ${
          regenerating ? "opacity-30" : "opacity-100"
        }`}
      >
        “<HighlightedText text={answer} terms={terms} />”
      </p>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onOpenCitation}
          className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-(--primary) underline underline-offset-4 transition hover:text-(--primary-hover)"
        >
          <FileText size={13} aria-hidden="true" />
          View Exact Citation &amp; Line Reference (Page {citation.page}) →
        </button>

        <div className="flex gap-1.5">
          <IconButton label="Copy answer" onClick={onCopy}><Copy size={14} /></IconButton>
          <IconButton label="Mark as helpful" tone="success" pressed={feedback === "up"} onClick={() => choose("up")}>
            <ThumbsUp size={14} />
          </IconButton>
          <IconButton label="Mark as not helpful" tone="danger" pressed={feedback === "down"} onClick={() => choose("down")}>
            <ThumbsDown size={14} />
          </IconButton>
          <IconButton label="Share answer" onClick={onShare}><Share2 size={14} /></IconButton>
          <IconButton label="Regenerate answer" onClick={onRegenerate}>
            <RefreshCw size={14} className={regenerating ? "animate-spin" : ""} />
          </IconButton>
        </div>
      </div>
    </section>
  );
}