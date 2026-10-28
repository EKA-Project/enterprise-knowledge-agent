import { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
  Share2,
  RefreshCw,
  FileText,
} from "lucide-react";
import HighlightedText from "./HighlightedText";

//feedback icons

const iconBtn =
  "grid size-8 place-items-center rounded-lg border bg-(--bg-surface) transition-all duration-200 ease-out hover:-translate-y-1.5 hover:scale-110 hover:shadow-md active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus)";
//status badge icons
function IconButton({ label, onClick, pressed, tone = "primary", className = "", children }) {
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
  pressed
    ? active
    : "border-(--border-medium) text-(--text-secondary) hover:border-(--primary) hover:text-(--primary)"
} ${className}`}

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
  const [copied, setCopied] = useState(false);

  const choose = (kind) => {
    const next = feedback === kind ? null : kind;
    setFeedback(next);
    if (next) onFeedback(next);
  };
  // ↑ Clicking the same thumb again clears it. The toast shows only when one is selected.

  return (
    <section
  aria-label="AI grounded answer"
  className="ssp-rise rounded-[20px] border border-l-4 border-(--border-subtle) border-l-[#2d6a4f] p-5 shadow-(--shadow-sm)"
  
style={{
  backgroundImage:
    "linear-gradient(110deg, #edf5fc 0%, #e8f2fb 48%, #eaf4fc 100%)",
}}
>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          
<span className="inline-flex items-center gap-1.5 rounded-full border border-[#b7ead8] bg-[#e3f7ee] px-2.5 py-1 text-[11px] font-semibold text-[#278567]">
  <Sparkles size={11} aria-hidden="true" />
  AI Grounded Answer
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
className={`mt-4 font-(family-name:--font-serif) text-[15px] leading-[1.55] text-(--text-primary) transition-opacity duration-300 ${          regenerating ? "opacity-30" : "opacity-100"
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
         
<IconButton
  label={copied ? "Copied" : "Copy answer"}
  onClick={async () => {
    await onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }}
  className={copied
    ? "text-green-600 hover:rotate-0"
    : "hover:rotate-6"
  }
>
  {copied ? <Check size={14} /> : <Copy size={14} />}
</IconButton>

         
<IconButton
  label="Mark as helpful"
  tone="success"
  pressed={feedback === "up"}
  onClick={() => choose("up")}
  className="hover:-rotate-12 hover:shadow-[0_5px_12px_rgba(34,197,94,0.25)]"
>
  <ThumbsUp size={14} />
</IconButton>

          <IconButton
  label="Mark as not helpful"
  tone="danger"
  pressed={feedback === "down"}
  onClick={() => choose("down")}
  className="hover:translate-y-1 hover:rotate-12 hover:shadow-[0_5px_12px_rgba(239,68,68,0.22)]"
>
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