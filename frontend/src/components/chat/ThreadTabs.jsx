import {
  Archive as ArchiveIcon,
  MessageSquare as MessageIcon,
} from 'lucide-react';

const pill = (on) =>
  `inline-flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-all duration-200 hover:-translate-y-0.5 ${
    on
      ? 'border-[var(--primary)] bg-[var(--primary-light)] text-[var(--primary)] shadow-sm'
      : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:border-[var(--border-medium)] hover:text-[var(--primary)]'
  }`;

const count = (on) =>
  `grid min-w-[20px] place-items-center rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
    on ? 'bg-[var(--primary)] text-white' : 'bg-[var(--bg-surface-subtle)] text-[var(--text-muted)]'
  }`;

/**
 * tab: 'active' | 'archived'
 * activeCount / archivedCount: numbers
 * onChange: (tab) => void
 */
export default function ThreadTabs({ tab, activeCount, archivedCount, onChange }) {
  return (
    <div role="tablist" aria-label="Thread type" className="flex flex-wrap items-center gap-2.5">
      <button type="button" role="tab" aria-selected={tab === 'active'} onClick={() => onChange('active')} className={pill(tab === 'active')}>
        <MessageIcon size={13} /> Active Threads <span className={count(tab === 'active')}>{activeCount}</span>
      </button>
      <button type="button" role="tab" aria-selected={tab === 'archived'} onClick={() => onChange('archived')} className={pill(tab === 'archived')}>
        <ArchiveIcon size={13} /> Archived Threads <span className={count(tab === 'archived')}>{archivedCount}</span>
      </button>
    </div>
  );
}