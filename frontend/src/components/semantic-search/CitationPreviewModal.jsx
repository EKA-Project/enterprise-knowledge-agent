import Modal from "../common/Modal.jsx";
import Button from "../common/Button.jsx";
import HighlightedText from "./HighlightedText";

function InfoField({ icon, label, className = "", children }) {
  return (
    <div className={className}>
      <dt className="flex items-center gap-1.5 font-(family-name:--font-mono) text-[9px] font-bold uppercase tracking-widest text-(--text-muted)">
        <span aria-hidden="true">{icon}</span> {label}
      </dt>
      <dd className="mt-1">{children}</dd>
    </div>
  );
}

/**
 * result: a search result (title, fileType, category, matchPercent, excerpt, citation)
 * terms: words to highlight in the excerpt
 * onClose / onFollowUp / onOpenReader: () => void
 */
export default function CitationPreviewModal({ result, terms, onClose, onFollowUp, onOpenReader }) {
  const { citation } = result;

  return (
    <Modal
      size="md"
      onClose={onClose}
      eyebrow={
        <>
          <span className="rounded-md border border-[#b7ead8] bg-[#e3f7ee] px-2 py-0.5 text-[9.5px] font-bold tracking-wider text-[#278567]">
            {result.fileType}
          </span>
          <span className="rounded-full border border-(--border-medium) bg-(--bg-surface-subtle) px-2.5 py-0.5 text-[11px] font-semibold normal-case tracking-normal text-(--text-secondary)">
            {result.category}
          </span>
        </>
      }
      title={result.title}
      footer={(close) => (
        <div className="flex flex-wrap items-center justify-end gap-2">
          <Button
            size="md"
            onClick={() => {
              onFollowUp();
              close();
            }}
          >
            Ask AI Follow-up →
          </Button>
          <Button
            size="md"
            variant="solid"
            onClick={() => {
              onOpenReader();
              close();
            }}
          >
            Open Full Reader (Page {citation.page}) →
          </Button>
        </div>
      )}
    >
      <div className="space-y-4">
        {/* Reference details */}
        <dl className="grid grid-cols-2 gap-4 rounded-xl border border-(--border-medium) bg-(--bg-surface-subtle) p-4">
          <InfoField icon="📍" label="Citation reference">
            <span className="text-[13px] font-semibold text-(--text-primary)">
              Page {citation.page} • Lines {citation.lines.replace("-", "–")}
            </span>
          </InfoField>

          <InfoField icon="🎯" label="Vector relevance">
            <span className="text-[13px] font-bold text-(--primary)">
              ✦ {Number(result.matchPercent).toFixed(1)}% Match Confidence
            </span>
          </InfoField>

          <InfoField icon="📐" label="Section heading" className="col-span-2">
            <span className="text-[13px] text-(--text-secondary)">{citation.section}</span>
          </InfoField>
        </dl>

        {/* Excerpt */}
        <div>
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-1.5 font-(family-name:--font-mono) text-[10px] font-bold uppercase tracking-widest text-(--text-secondary)">
              <span aria-hidden="true">🛡️</span> Verified document excerpt
            </p>
            <span className="rounded-full border border-[#b7ead8] bg-[#e3f7ee] px-2 py-0.5 text-[10px] font-semibold text-[#278567]">
              ✓ Grounded Source
            </span>
          </div>

          <p className="mt-2 rounded-xl border border-(--border-medium) bg-(--bg-surface-subtle) px-4 py-3.5 text-[13.5px] leading-7 text-(--text-secondary)">
            <HighlightedText text={result.excerpt} terms={terms} />
          </p>
        </div>
      </div>
    </Modal>
  );
}