import { Link } from 'react-router-dom';
import { summarizeThread } from "../../../services/chatService";
import { ArchiveIcon, ArrowRightIcon, TrashIcon, XIcon } from './ChatIcons';
import { MONO, SERIF } from './ChatUtils';

// Left-side history panel. It's a flex sibling of the chat column, not an overlay:
// its width animates open and closed, so the chat area stays visible and slides over.
export default function ChatHistoryDrawer({ open, threads, activeThreadId, onClose, onSelect, onDelete }) {
  return (
    <aside
      aria-hidden={!open}
      className={`flex shrink-0 overflow-hidden transition-[width,opacity,margin,visibility] duration-300 ease-out ${
        open ? 'visible mr-6 w-[320px] opacity-100' : 'invisible mr-0 w-0 opacity-0'
      }`}
    >
      {/* fixed-width inner panel so content doesn't reflow while the width animates */}
      <div className="flex w-[320px] flex-col rounded-[22px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] [box-shadow:var(--shadow-md)]">
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-4 py-3.5">
          <h2 className={`${SERIF} m-0 text-[17px] font-bold text-[var(--text-primary)]`}>Chat History</h2>
          <button
            onClick={onClose}
            aria-label="Close history"
            className="grid h-7 w-7 place-items-center rounded-md text-[var(--text-muted)] transition hover:bg-[var(--bg-surface-subtle)]"
          >
            <XIcon size={14} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-2">
          {threads.length === 0 && (
            <p className="m-0 px-3 py-6 text-center text-[12.5px] text-[var(--text-muted)]">No saved threads yet.</p>
          )}

          {threads.map((thread) => {
            const { title, snippet, messageCount } = summarizeThread(thread);
            const isActive = thread.id === activeThreadId;
            return (
              <div
                key={thread.id}
                className={`group relative mb-1.5 rounded-xl border p-3 transition ${
                  isActive
                    ? 'border-[var(--primary)] bg-[var(--bg-surface-subtle)]'
                    : 'border-transparent hover:border-[var(--border-subtle)] hover:bg-[var(--bg-surface-subtle)]'
                }`}
              >
                <button onClick={() => onSelect(thread.id)} className="block w-full text-left">
                  <p className={`${SERIF} m-0 mb-1 line-clamp-2 pr-7 text-[14px] font-semibold italic text-[var(--text-primary)]`}>
                    {title}
                  </p>
                  <p className="m-0 mb-1.5 line-clamp-2 text-[12px] leading-snug text-[var(--text-secondary)]">{snippet}</p>
                  <p className={`${MONO} m-0 text-[10.5px] text-[var(--text-muted)]`}>
                    {messageCount} messages · {thread.updated}
                  </p>
                </button>

                <button
                  onClick={() => onDelete(thread.id)}
                  aria-label="Delete thread"
                  className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-md text-[var(--text-muted)] opacity-0 transition hover:bg-[var(--status-danger-bg)] hover:text-[var(--status-danger)] focus:opacity-100 group-hover:opacity-100"
                >
                  <TrashIcon size={14} />
                </button>
              </div>
            );
          })}
        </div>

        <Link
          to="/ask-eka/history"
          className="flex items-center justify-between border-t border-[var(--border-subtle)] px-4 py-3 text-[12.5px] font-semibold text-[var(--primary)] transition hover:bg-[var(--bg-surface-subtle)]"
        >
          <span className="flex items-center gap-2"><ArchiveIcon size={14} /> History Archive</span>
          <ArrowRightIcon size={14} />
        </Link>
      </div>
    </aside>
  );
}