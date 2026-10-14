import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SquarePen, MessageSquare, Copy, Check, Pencil } from 'lucide-react';

// One glossary term card.
// canManage -> shows the edit icon (admin only; wired in a later step).
export default function GlossaryCard({ item, canManage = false }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${item.term} (${item.expansion}): ${item.definition}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked — ignore */
    }
  };

  const askUrl = `/ask-eka?q=${encodeURIComponent(`What does ${item.term} mean at our company?`)}`;

  return (
    <article className="flex flex-col rounded-2xl border border-(--border-subtle) bg-(--bg-surface) p-5 shadow-(--shadow-sm)">
      <div className="flex items-start justify-between gap-2">
        <span className="kb-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-(--text-muted)">
          {item.category}
        </span>
        {canManage && (
          <button
            type="button"
            aria-label={`Edit ${item.term}`}
            className="cursor-pointer text-(--text-muted) hover:text-(--primary)"
          >
            <SquarePen size={13} />
          </button>
        )}
      </div>

      <h4 className="kb-serif mt-2 text-lg font-bold text-(--text-primary)">{item.term}</h4>
      <p className="kb-mono mt-0.5 text-[10px] font-medium text-(--primary)">{item.expansion}</p>
      <p className="mt-3 text-xs leading-relaxed text-(--text-secondary)">{item.definition}</p>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-4">
        <div className="flex items-center gap-3 text-xs text-(--text-secondary)">
          <Link
            to={askUrl}
            className="inline-flex cursor-pointer items-center gap-1.5 hover:text-(--primary)"
          >
            <MessageSquare size={12} /> Ask EKA <Pencil size={9} className="text-(--text-muted)" />
          </Link>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex cursor-pointer items-center gap-1.5 hover:text-(--primary)"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <span className="kb-mono text-[9px] text-(--text-muted)">Rev. {item.revised}</span>
      </div>
    </article>
  );
}