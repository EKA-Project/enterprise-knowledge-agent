import {
  MessageSquare as MessageIcon,
  Plus as PlusIcon,
} from 'lucide-react';
import { SERIF } from './ChatUtils';

const CONTENT = {
  archived: {
    emoji: '📦',
    title: 'No archived threads',
    text: 'You have not archived any conversations yet. When you archive a thread, it will appear here safely for future reference.',
    action: 'View Active Threads',
  },
  active: {
    emoji: '💬',
    title: 'No conversation threads found',
    text: 'You have not created any active conversation threads yet. Start asking questions to populate your intelligence archives.',
    action: 'Start New Conversation',
  },
};

/**
 * variant: 'archived' | 'active'
 * onAction: () => void  (archived: go to Active tab, active: open Ask EKA)
 */
export default function HistoryEmptyState({ variant, onAction }) {
  const c = CONTENT[variant];
  const isArchived = variant === 'archived';

  return (
    <div className="chat-pop flex flex-col items-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-6 py-12 text-center [box-shadow:var(--shadow-sm)]">
      <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-[var(--primary-light)] text-[22px]" aria-hidden="true">
        {c.emoji}
      </div>
      <h3 className={`${SERIF} m-0 mb-2 text-[20px] font-bold text-[var(--text-primary)]`}>{c.title}</h3>
      <p className="m-0 mb-5 max-w-[440px] text-[13px] leading-relaxed text-[var(--text-secondary)]">{c.text}</p>

      <button
        type="button"
        onClick={onAction}
        className={`flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 text-[12.5px] font-bold transition-all duration-200 hover:-translate-y-0.5 active:scale-95 ${
          isArchived
            ? 'border border-[var(--border-medium)] bg-[var(--bg-surface)] text-[var(--primary)] hover:border-[var(--primary)] hover:bg-[var(--primary-light)]'
            : 'bg-[var(--primary)] text-[var(--primary-contrast)] hover:bg-[var(--primary-hover)]'
        }`}
      >
        {isArchived ? <MessageIcon size={13} /> : <PlusIcon size={13} />} {c.action}
      </button>
    </div>
  );
}