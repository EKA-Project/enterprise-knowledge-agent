import { Link } from 'react-router-dom';
import { ChevronRightIcon, ClockIcon, MessageIcon, PlusIcon, TrashIcon } from './ChatIcons';
import { MONO } from './ChatUtils';

/**
 * conversations: [{ id, title, preview, updated_at }]  (already without archived ones)
 * Shows past conversations, starts a new chat, selects a chat. Calls no API.
 */
export default function ChatSidebar({ open, conversations, activeConversationId, onClose, onSelect, onDelete, onNewThread, onOpenArchive }) {
  return (
    <aside
      aria-hidden={!open}
      className={`flex h-full min-h-0 shrink-0 overflow-hidden transition-[width,flex-basis,opacity,margin] duration-300 ease-out ${
        open ? 'visible mr-3 w-[240px] basis-[240px] opacity-100' : 'invisible mr-0 w-0 basis-0 opacity-0'
      }`}
    >
      <div className="flex h-full min-h-0 w-[240px] min-w-[240px] flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] [box-shadow:var(--shadow-sm)]">
        <div className="flex shrink-0 items-center justify-between border-b border-[var(--border-subtle)] px-3 py-2.5">
          <h2 className={`${MONO} m-0 text-[10.5px] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]`}>
            Threads ({conversations.length})
          </h2>
          <button
            type="button"
            onClick={() => onNewThread?.()}
            aria-label="New thread"
            title="New thread"
            className="grid h-7 w-7 shrink-0 cursor-pointer place-items-center rounded-lg bg-[var(--primary)] text-[var(--primary-contrast)] transition-all duration-200 hover:scale-105 hover:bg-[var(--primary-hover)] active:scale-95"
          >
            <PlusIcon size={13} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-2">
          {conversations.length === 0 && (
            <p className="m-0 px-2 py-5 text-center text-[11px] text-[var(--text-muted)]">No saved threads yet.</p>
          )}

          {conversations.map((c) => {
            const isActive = c.id === activeConversationId;
            return (
              <div
                key={c.id}
                className={`group relative mb-2 rounded-xl border px-2.5 py-2.5 transition-all duration-150 ${
                  isActive
                    ? 'border-[var(--primary)] bg-[var(--primary-light)]'
                    : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--border-medium)] hover:bg-[var(--bg-surface-subtle)]'
                }`}
              >
                <button type="button" onClick={() => onSelect(c.id)} className="flex w-full min-w-0 cursor-pointer items-start gap-2 pr-7 text-left">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-[var(--primary-light)] text-[var(--primary)]">
                    <MessageIcon size={12} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[12px] font-bold text-[var(--text-primary)]" title={c.title}>{c.title}</span>
                    <span className="mt-0.5 block truncate text-[10.5px] text-[var(--text-muted)]">{c.preview}</span>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => onDelete(c.id)}
                  aria-label={`Delete ${c.title}`}
                  title="Delete thread"
                  className="absolute right-2 top-2.5 grid h-6 w-6 cursor-pointer place-items-center rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface-subtle)] text-[var(--text-muted)] transition-all duration-150 hover:scale-105 hover:border-[var(--status-danger-border)] hover:bg-[var(--status-danger-bg)] hover:text-[var(--status-danger)]"
                >
                  <TrashIcon size={12} />
                </button>
              </div>
            );
          })}
        </div>

        <div className="shrink-0 border-t border-[var(--border-subtle)] p-2.5">
          <Link
            to="/ask-eka/history"
            onClick={() => { onOpenArchive?.(); onClose?.(); }}
            className={`${MONO} flex items-center justify-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-2 py-1.5 text-center text-[10.5px] font-semibold text-[var(--text-primary)] transition-all duration-150 hover:-translate-y-0.5 hover:border-[var(--primary)] hover:bg-[var(--primary-light)] hover:text-[var(--primary)]`}
          >
            <ClockIcon size={12} /> Open Chat History <ChevronRightIcon size={11} />
          </Link>
        </div>
      </div>
    </aside>
  );
}