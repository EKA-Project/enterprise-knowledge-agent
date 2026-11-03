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
      <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-[var(--primary-light)]" aria-hidden="true">
  {isArchived ? (
    <span className="text-[24px]">{c.emoji}</span>
  ) : (
    <MessageIcon
      size={20}
      strokeWidth={1.8}
      className="text-[var(--primary)]"
    />
  )}
</div>
      <h3 className={`${SERIF} m-0 mb-2 text-[20px] font-bold text-[var(--text-primary)]`}>{c.title}</h3>
      <p className="m-0 mb-5 max-w-[440px] text-[13px] leading-relaxed text-[var(--text-secondary)]">{c.text}</p>

     <button
  type="button"
  onClick={onAction}
  className={`group inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-full text-xs font-semibold transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-95 ${
    isArchived
      ? 'border border-[var(--border-medium)] bg-[var(--bg-surface)] px-3.5 text-[var(--primary)] hover:border-[var(--primary)] hover:bg-[var(--primary-light)]'
      : 'border border-(--accent-secondary) bg-(--accent-secondary) pl-1 pr-3 text-white hover:border-(--primary-deep) hover:bg-(--primary-deep) hover:shadow-(--shadow-md)'
  }`}
>
  {isArchived ? (
    <MessageIcon size={13} />
  ) : (
    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white transition-all duration-200 ease-out group-hover:scale-110 group-hover:bg-white/30">
      <PlusIcon
        size={13}
        className="transition-transform duration-300 ease-out group-hover:rotate-90"
      />
    </span>
  )}
  {c.action}
</button>
    </div>
  );
}