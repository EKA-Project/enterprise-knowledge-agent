import { Link } from 'react-router-dom';
import { summarizeThread } from './chatMock';
import {
  ChevronRight as ChevronRightIcon,
  Clock as ClockIcon,
  MessageSquare as MessageIcon,
  Plus as PlusIcon,
  Trash2 as TrashIcon,
} from 'lucide-react';
import { MONO } from './ChatUtils';

export default function ChatHistoryDrawer({
  open,
  threads,
  activeThreadId,
  onClose,
  onSelect,
  onDelete,
  onNewThread,
  onOpenArchive,
}) {
  return (
    <aside
      aria-hidden={!open}
      className={`flex h-full min-h-0 shrink-0 overflow-hidden transition-[width,flex-basis,opacity,margin] duration-300 ease-out ${
        open
          ? 'visible mr-3 w-[240px] basis-[240px] opacity-100'
          : 'invisible mr-0 w-0 basis-0 opacity-0'
      }`}
    >
      <div className="flex h-full min-h-0 w-[240px] min-w-[240px] flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] [box-shadow:var(--shadow-sm)]">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-[var(--border-subtle)] px-3 py-2.5">
          <h2 className={`${MONO} m-0 inline-flex items-center rounded-full bg-[var(--primary-light)] px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--primary)]`}>
            Threads ({threads.length})
          </h2>

          <button
            type="button"
            onClick={() => onNewThread?.()}
            aria-label="New thread"
            title="New thread"
            className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full bg-[var(--primary)] text-white shadow-sm transition-all duration-200 hover:scale-105 hover:bg-[var(--primary-hover)] hover:shadow-md active:scale-95"          >
            <PlusIcon size={13} />
          </button>
        </div>

        {/* Scrollable thread list */}
        <div className="min-h-0 flex-1 overflow-y-auto p-2.5">
          {threads.length === 0 && (
            <p className="m-0 px-2 py-5 text-center text-[11px] text-[var(--text-muted)]">No saved threads yet.</p>
          )}

          {threads.map((thread) => {
            const { title, snippet } = summarizeThread(thread);
            const isActive = thread.id === activeThreadId;

            return (
              <div
                key={thread.id}
                className={`group relative mb-2.5 rounded-xl border px-3 py-3 transition-all duration-200 ${ 
                    isActive
                    ? 'border-[var(--primary)] bg-[var(--primary-light)]'
                    : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--border-medium)] hover:bg-[var(--bg-surface-subtle)]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => onSelect(thread.id)}
                  className="flex w-full min-w-0 cursor-pointer items-start gap-2.5 pr-8 text-left"
                >
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-[var(--primary-light)] text-[var(--primary)]">
                    <MessageIcon size={14} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[12px] font-bold text-[var(--text-primary)]" title={title}>
                      {title}
                    </span>
                    <span className="mt-0.5 block truncate text-[10.5px] text-[var(--text-muted)]">{snippet}</span>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => onDelete(thread.id)}
                  aria-label={`Delete ${title}`}
                  title="Delete thread"
                  className="absolute right-2 top-2.5 grid h-6 w-6 cursor-pointer place-items-center rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface-subtle)] text-[var(--text-muted)] transition-all duration-150 hover:scale-105 hover:border-[#fca5a5] hover:bg-[#fee2e2] hover:text-[var(--status-danger)]"
                >
                  <TrashIcon size={12} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom control */}
        <div className="shrink-0 border-t border-[var(--border-subtle)] p-2.5">
          <Link
            to="/ask-eka/history"
            onClick={() => {
              onOpenArchive?.();
              onClose?.();
            }}
            className={`${MONO} flex items-center justify-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-2 py-1.5 text-center text-[10.5px] font-semibold text-[var(--text-primary)] transition-all duration-150 hover:-translate-y-0.5 hover:border-[var(--primary)] hover:bg-[var(--primary-light)] hover:text-[var(--primary)]`}
          >
            <ClockIcon size={12} /> Open Chat History <ChevronRightIcon size={11} />
          </Link>
        </div>
      </div>
    </aside>
  );
}