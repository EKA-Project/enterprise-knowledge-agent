
import { Link } from 'react-router-dom';
import { summarizeThread } from '../../../services/chatService';
import { ArrowRightIcon, PlusIcon, TrashIcon } from './ChatIcons';
import { MONO, SERIF } from './ChatUtils';

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
          ? 'visible mr-3 w-[224px] basis-[224px] opacity-100'
          : 'invisible mr-0 w-0 basis-0 opacity-0'
      }`}
    >
      <div className="flex h-full min-h-0 w-[224px] min-w-[224px] flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] [box-shadow:var(--shadow-sm)]">

        {/* Compact header */}
        <div className="flex shrink-0 items-center justify-between border-b border-[var(--border-subtle)] px-3 py-2.5">
          <h2
            className={`${MONO} m-0 text-[10.5px] font-bold tracking-[0.14em] uppercase text-[var(--text-muted)]`}
          >
            Threads ({threads.length})
          </h2>

          <button
            type="button"
            onClick={() => onNewThread?.()}
            aria-label="New thread"
            title="New thread"
              className="grid h-7 w-7 shrink-0 cursor-pointer place-items-center rounded-md border border-[var(--primary)] bg-[var(--primary)] text-white transition-all duration-200 hover:scale-105 hover:bg-[var(--primary-hover)] active:scale-95"          >
            <PlusIcon size={13} />
          </button>
        </div>

        {/* Scrollable thread list */}
        <div className="min-h-0 flex-1 overflow-y-auto p-1.5">
          {threads.length === 0 && (
            <p className="m-0 px-2 py-5 text-center text-[11px] text-[var(--text-muted)]">
              No saved threads yet.
            </p>
          )}

          {threads.map((thread) => {
            const { title, snippet, messageCount } =
              summarizeThread(thread);
            const isActive = thread.id === activeThreadId;

            return (
              <div
                key={thread.id}
                className={`group relative mb-1.5 rounded-xl border px-2.5 py-2 transition-all duration-150 ${
                  isActive
                  ? 'border-[var(--primary)] bg-[var(--primary-light)]'
                  : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--border-medium)] hover:bg-[var(--bg-surface-subtle)]'
          }`}
              >
                <button
                  type="button"
                  onClick={() => onSelect(thread.id)}
                  className="block w-full min-w-0 cursor-pointer text-left"
                >
                  <p
                    className={`${SERIF} m-0 mb-1 line-clamp-1 pr-5 text-[12.5px] font-semibold italic leading-snug text-[var(--text-primary)]`}
                    title={title}
                  >
                    {title}
                  </p>

                  <p className="m-0 mb-1.5 line-clamp-2 text-[11px] leading-snug text-[var(--text-secondary)]">
                    {snippet}
                  </p>

                  <p
                    className={`${MONO} m-0 text-[9.5px] leading-relaxed text-[var(--text-muted)]`}
                  >
                    {messageCount} msgs · {thread.updated}
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => onDelete(thread.id)}
                  aria-label={`Delete ${title}`}
                  title="Delete thread"
                  className="absolute right-1.5 top-1.5 grid h-5 w-5 cursor-pointer place-items-center rounded text-[var(--text-muted)] opacity-60 transition-all duration-150 hover:scale-110 hover:bg-[var(--status-danger-bg)] hover:text-[var(--status-danger)] hover:opacity-100 focus:opacity-100"
                >
                  <TrashIcon size={12} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom archive control */}
        <div className="shrink-0 border-t border-[var(--border-subtle)] p-2.5">
          <Link
            to="/ask-eka/history"
            onClick={() => {
              onOpenArchive?.();
              onClose?.();
            }}
            className={`${MONO} flex items-center justify-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-2 py-1.5 text-center text-[10px] font-semibold text-[var(--primary)] transition-all duration-150 hover:-translate-y-0.5 hover:border-[var(--primary)] hover:bg-[var(--primary-light)]`}
          >
            Open History Archive
            <ArrowRightIcon size={11} />
          </Link>
        </div>
      </div>
    </aside>
  );
}