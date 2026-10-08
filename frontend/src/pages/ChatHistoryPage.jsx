import { useMemo, useState } from 'react';
import { deleteThread, getThreads, summarizeThread, toggleArchiveThread } from '../../services/chatService';
import { Link, useNavigate } from 'react-router-dom';
import { ArchiveIcon, ArrowLeftIcon, ArrowRightIcon, MessageIcon, SearchIcon, ShieldCheckIcon, TrashIcon } from '../components/chat/ChatIcons';
import { EYEBROW, MONO, SERIF } from '../components/chat/ChatUtils';

function ThreadCard({ thread, onResume, onArchive, onDelete }) {
  const { title, snippet, messageCount } = summarizeThread(thread);
  const iconBtn =
    'grid h-8 w-8 place-items-center rounded-lg border border-[var(--border-subtle)] text-[var(--text-muted)] transition hover:bg-[var(--bg-surface-subtle)]';

  return (
    <article className="flex items-start gap-5 rounded-[22px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 transition [box-shadow:var(--shadow-sm)] hover:[box-shadow:var(--shadow-md)]">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[var(--sidebar-bg)] text-[var(--sidebar-text)]">
        <MessageIcon size={18} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <h3 className={`${SERIF} m-0 truncate text-[19px] font-semibold italic text-[var(--text-primary)]`}>{title}</h3>
          {thread.archived && (
            <span className={`${MONO} rounded-full bg-[var(--bg-surface-subtle)] px-2 py-0.5 text-[10px] font-bold uppercase text-[var(--text-muted)]`}>
              Archived
            </span>
          )}
        </div>
        <p className="m-0 mb-3 line-clamp-2 text-[13.5px] leading-relaxed text-[var(--text-secondary)]">{snippet}</p>

        <div className={`${MONO} flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-[var(--text-muted)]`}>
          <span>{messageCount} messages</span>
          <span>{thread.updated}</span>
          <span className="flex items-center gap-1.5 text-[var(--badge-text)]">
            <ShieldCheckIcon size={12} /> Tenant-Grounded
          </span>
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-2">
        <button
          onClick={() => onResume(thread.id)}
          className="flex items-center gap-2 rounded-full bg-[var(--primary)] px-4 py-2 text-[12.5px] font-bold text-[var(--primary-contrast)] transition hover:bg-[var(--primary-hover)] active:scale-95"
        >
          Resume Thread <ArrowRightIcon size={13} />
        </button>
        <div className="flex gap-1.5">
          <button onClick={() => onArchive(thread.id)} title={thread.archived ? 'Unarchive' : 'Archive'} className={iconBtn}>
            <ArchiveIcon size={14} />
          </button>
          <button
            onClick={() => onDelete(thread.id)}
            title="Delete"
            className={`${iconBtn} hover:!bg-[var(--status-danger-bg)] hover:!text-[var(--status-danger)]`}
          >
            <TrashIcon size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}
//Chat history page, separate from the main AskEkaPage. This is a full-page view of all threads, with search and filtering.
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

   return ( 
  <div className="mx-auto w-full max-w-[960px]">

    <Link 
      to="/ask-eka" 
      className="mb-5 inline-flex items-center gap-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3.5 py-2 text-[12.5px] font-semibold text-[var(--text-primary)] transition hover:bg-[var(--bg-surface-subtle)]"
    >
      <ArrowLeftIcon size={14} />
      Back to Ask EKA
    </Link>

    <p className={`${EYEBROW} m-0 mb-2`}>THREAD ARCHIVE</p>
      <h1 className={`${SERIF} m-0 mb-2 text-[36px] font-bold text-[var(--text-primary)]`}>Chat History &amp; Archives</h1>
      <p className="m-0 mb-6 max-w-[600px] text-[14.5px] leading-relaxed text-[var(--text-secondary)]">
        Every conversation is logged, grounded in your documents, and isolated to your tenant. Search past threads or pick
        up exactly where you left off.
      </p>

      <label className="mb-6 flex items-center gap-3 rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface)] px-4 py-3 transition focus-within:border-[var(--primary)]">
        <SearchIcon size={16} className="text-[var(--text-muted)]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search threads by question or answer..."
          className="min-w-0 flex-1 border-none bg-transparent text-[14px] text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
        />
        <span className={`${MONO} text-[11px] text-[var(--text-muted)]`}>{filtered.length} threads</span>
      </label>

      <div className="flex flex-col gap-4 pb-6">
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