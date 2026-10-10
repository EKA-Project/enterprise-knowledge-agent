import { useMemo, useState } from 'react';
import {  clearAllArchivedThreads, deleteThread, getThreads, summarizeThread, toggleArchiveThread } from '../../services/chatService';
import { useNavigate } from 'react-router-dom';
import { ArchiveIcon,  ArrowRightIcon, MessageIcon, PlusIcon, SearchIcon, ShieldCheckIcon, TrashIcon } from '../components/chat/ChatIcons';
import { EYEBROW, MONO, SERIF } from '../components/chat/ChatUtils';
function ThreadCard({ thread, onResume, onArchive, onDelete }) {
  const { title, snippet, messageCount } = summarizeThread(thread);
  const iconBtn = 'grid h-7 w-7 cursor-pointer place-items-center rounded-full text-[var(--text-muted)] transition-colors';

  return (
    <article className="flex items-center gap-3.5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-3 transition [box-shadow:var(--shadow-sm)] hover:border-[var(--border-medium)] hover:[box-shadow:var(--shadow-md)]">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[var(--primary-light)] text-[var(--primary)]">
        <MessageIcon size={16} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-0.5 flex items-center gap-2">
          <h3 className={`${SERIF} m-0 truncate text-[15px] font-semibold text-[var(--text-primary)]`}>{title}</h3>
          <span className={`${MONO} shrink-0 rounded-full border border-[var(--badge-border)] bg-[var(--badge-bg)] px-2 py-0.5 text-[9.5px] font-bold text-[var(--badge-text)]`}>
            {messageCount} messages
          </span>
          {thread.archived && (
            <span className={`${MONO} shrink-0 rounded-full bg-[var(--bg-surface-subtle)] px-2 py-0.5 text-[9.5px] font-bold uppercase text-[var(--text-muted)]`}>
              Archived
            </span>
          )}
        </div>
        <p className="m-0 mb-1 truncate text-[12.5px] text-[var(--text-secondary)]">{snippet}</p>
        <div className={`${MONO} flex flex-wrap items-center gap-x-3 text-[10px] text-[var(--text-muted)]`}>
          <span>{thread.updated}</span>
          <span className="flex items-center gap-1 text-[var(--badge-text)]">
            <ShieldCheckIcon size={11} /> 100% Tenant Grounded
          </span>
        </div>
      </div>

      <button
        onClick={() => onResume(thread.id)}
        className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full bg-[var(--primary)] px-3.5 py-1.5 text-[12px] font-bold text-[var(--primary-contrast)] transition-colors hover:bg-[var(--primary-hover)] active:scale-95"
      >
        Resume Thread <ArrowRightIcon size={12} />
      </button>

      <div className="flex shrink-0 items-center gap-0.5">
        <button
          onClick={() => onArchive(thread.id)}
          title={thread.archived ? 'Unarchive' : 'Archive'}
          className={`${iconBtn} hover:bg-[var(--primary-light)] hover:text-[var(--primary)]`}
        >
          <ArchiveIcon size={14} />
        </button>
        <button
          onClick={() => onDelete(thread.id)}
          title="Delete"
          className={`${iconBtn} hover:bg-[var(--status-danger-bg)] hover:text-[var(--status-danger)]`}
        >
          <TrashIcon size={14} />
        </button>
      </div>
    </article>
  );
}

export default function ChatHistoryPage() {
  const navigate = useNavigate();
  const [threads, setThreads] = useState(getThreads);
  const [query, setQuery] = useState('');

  const refresh = () => setThreads(getThreads());

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return threads;
    return threads.filter((t) => {
      const { title, snippet } = summarizeThread(t);
      return `${title} ${snippet}`.toLowerCase().includes(q);
    });
  }, [threads, query]);

  function handleClearAll() {
    if (threads.length === 0) return;
    if (window.confirm('Clear all archived threads? This cannot be undone.')) {
      clearAllArchivedThreads();
      refresh();
    }
  }

  return (
    <div className="mx-auto w-full max-w-[960px]">
      <div className="mb-5 flex items-end justify-between gap-6">
        <div className="min-w-0">
          <p className={`${EYEBROW} m-0 mb-1.5`}>THREAD ARCHIVES</p>
          <h1 className={`${SERIF} m-0 mb-1.5 text-[32px] font-bold text-[var(--text-primary)]`}>Chat History &amp; Archives</h1>
          <p className="m-0 max-w-[560px] text-[13.5px] leading-relaxed text-[var(--text-secondary)]">
            Reopen, search, and manage your past AI intelligence discussions and grounded answers.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2.5">
          <button
            onClick={handleClearAll}
            className="cursor-pointer rounded-full border border-red-200 bg-[var(--bg-surface)] px-3.5 py-1.5 text-[12px] font-semibold text-[var(--status-danger)] transition-colors hover:bg-[var(--status-danger-bg)]"
          >
            Clear All Archives
          </button>
          <button
            onClick={() => navigate('/ask-eka')}
            className="flex cursor-pointer items-center gap-1.5 rounded-full bg-[var(--primary)] px-3.5 py-1.5 text-[12px] font-bold text-[var(--primary-contrast)] transition-colors hover:bg-[var(--primary-hover)] active:scale-95"
          >
            <PlusIcon size={13} /> Start New Thread
          </button>
        </div>
      </div>

      {/* outer card with a capsule search field inside */}
      <div className="mb-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3 [box-shadow:var(--shadow-sm)]">
        <label className="flex items-center gap-2.5 rounded-full border border-transparent bg-[var(--bg-surface-subtle)] px-4 py-2.5 transition-colors focus-within:border-[var(--primary)]">
          <SearchIcon size={15} className="shrink-0 text-[var(--text-muted)]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search through past conversation topics, questions, or keywords..."
            className={`${MONO} min-w-0 flex-1 border-none bg-transparent text-[12px] text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]`}
          />
          <span className={`${MONO} shrink-0 text-[10.5px] text-[var(--text-muted)]`}>{filtered.length} threads</span>
        </label>
      </div>

      <div className="flex flex-col gap-3 pb-6">
        {filtered.map((thread) => (
          <ThreadCard
            key={thread.id}
            thread={thread}
            onResume={(id) => navigate('/ask-eka', { state: { threadId: id } })}
            onArchive={(id) => { toggleArchiveThread(id); refresh(); }}
            onDelete={(id) => { deleteThread(id); refresh(); }}
          />
        ))}

        {filtered.length === 0 && (
          <p className="m-0 rounded-2xl border border-dashed border-[var(--border-medium)] px-6 py-10 text-center text-[14px] text-[var(--text-muted)]">
            No threads match your search.
          </p>
        )}
      </div>
    </div>
  );
}