import { Sparkles, ArrowRight } from "lucide-react";
import HighlightedText from "./HighlightedText";
import ActionRating from "../common/ActionRating";

// Grounded answer card component
export default function GroundedAnswerCard({
  answer,
  sourceTitle,
  citation,
  terms,
  regenerating,
  onOpenCitation,
  onFollowUp,
  onCopy,
  onFeedback,
  onShare,
  onRegenerate,
}) {
  return (
    <section
      aria-label="AI grounded answer"
      className="ssp-rise rounded-[20px] border border-l-4 border-[#cfe8de] border-l-[#2d6a4f] p-5 shadow-(--shadow-sm)"
      style={{
        backgroundImage:
          "linear-gradient(110deg, #e6f3f5 0%, #e8f6f2 50%, #ebf8f1 100%)",
      }}
    >
      {/* Header: badge + source on the left, follow-up button on the right */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#b7ead8] bg-[#e3f7ee] px-2.5 py-1 text-[11px] font-bold text-[#278567]">
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
          className="inline-flex items-center gap-1.5 rounded-full border border-(--border-subtle-nav) bg-(--bg-surface) px-3 py-1 text-[12px] font-semibold text-(--text-primary) transition hover:border-(--primary) hover:text-(--primary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus)"
        >
          Ask Follow-up Question <ArrowRight size={13} aria-hidden="true" />
        </button>
      </div>

      {/* The answer */}
      <p
        className={`mt-4 font-(family-name:--font-serif) text-[15px] leading-[1.55] text-(--text-primary) transition-opacity duration-300 ${
          regenerating ? "opacity-30" : "opacity-100"
        }`}
      >
        "<HighlightedText text={answer} terms={terms} />"
      </p>

      {/* Bottom row: dashed line, citation link, and feedback icons */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-[#cfe5df] pt-3">
        <button
          type="button"
          onClick={onOpenCitation}
          className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#0f7a99] underline underline-offset-4 transition hover:text-(--primary-hover)"
        >
          <span aria-hidden="true">🔍</span>
          View Exact Citation &amp; Line Reference (Page {citation.page}) →
        </button>

        <ActionRating
          onCopy={onCopy}
          onFeedback={onFeedback}
          onShare={onShare}
          onRegenerate={onRegenerate}
          regenerating={regenerating}
        />
      </div>
    </section>
  );
}