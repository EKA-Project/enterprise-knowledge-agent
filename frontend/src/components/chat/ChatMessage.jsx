import CitationPill from './CitationPill';

// ChatMessage — renders ONE full turn: the user's question, the grounded
// answer, and (optionally) the source citation. Turn-based, not message-based —
// question + answer + citation are one atomic unit, matching the ENTRY-style UI.
export default function ChatMessage({ entryNumber, question, answer, citation }) {
  return (
    <div className="relative flex gap-4 pl-1 pb-10 ml-2 border-l border-[var(--border-subtle)]">
      {/* timeline dot marker */}
      <span
        className="absolute -left-[7px] top-0 w-[13px] h-[13px] rounded-full
                   border-2 border-[var(--primary)] bg-[var(--bg-surface)]"
      />

      <div className="flex-1 pl-6">
        {/* entry label, e.g. "ENTRY 01" */}
        <p className="m-0 mb-1.5 text-[10.5px] font-extrabold tracking-wide uppercase
                       text-[var(--text-muted)]">
          ENTRY {String(entryNumber).padStart(2, '0')}
        </p>

        {/* the question — uses the serif font via scoped CSS class below */}
        <h3 className="ask-eka-serif m-0 mb-3.5 text-xl italic text-[var(--text-primary)]">
          "{question}"
        </h3>

        {/* the grounded answer, built from the answer object's fields */}
        <p className="m-0 mb-3 text-[14.5px] leading-7 max-w-[760px] text-[var(--text-secondary)]">
          {answer.intro}
        </p>
        <p className="m-0 mb-3 text-[14.5px] leading-7 max-w-[760px] text-[var(--text-secondary)]">
          1. <strong>Document Grounding</strong>: {answer.grounding} 2.{' '}
          <strong>Security Standard</strong>: {answer.security} 3.{' '}
          <strong>Recommended Reference</strong>: {answer.reference}
        </p>

        {/* optional citation card */}
        {citation && <CitationPill title={citation.title} meta={citation.meta} />}
      </div>
    </div>
  );
}