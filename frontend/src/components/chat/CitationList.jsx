import { useState } from 'react';
import CitationChip from './CitationChip';
import { MONO, dedupeCitations } from './ChatUtils';

const MAX_VISIBLE = 3;

// Same document + page shows once, highest score first, "+N more" when there are many.
export default function CitationList({ citations, onOpen, showEmptyNote = false }) {
  const [expanded, setExpanded] = useState(false);
  const unique = dedupeCitations(citations);

  if (unique.length === 0) {
    return showEmptyNote ? <p className={`${MONO} m-0 mt-3 text-[11px] text-[var(--text-muted)]`}>No sources found</p> : null;
  }

  const visible = expanded ? unique : unique.slice(0, MAX_VISIBLE);
  const hidden = unique.length - visible.length;

  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      {visible.map((c) => (
        <CitationChip key={`${c.document_id}:${c.page}`} citation={c} onOpen={onOpen} />
      ))}
      {hidden > 0 && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className={`${MONO} cursor-pointer rounded-full border border-dashed border-[var(--border-medium)] px-3 py-1.5 text-[11px] font-semibold text-[var(--text-secondary)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]`}
        >
          +{hidden} more
        </button>
      )}
    </div>
  );
}