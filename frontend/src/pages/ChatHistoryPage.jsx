import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  clearAllActiveThreads,
  clearAllArchivedThreads,
  deleteThread,
  getThreads,
  subscribeThreads,
  summarizeThread,
  toggleArchiveThread,
} from '../components/chat/chatMock';
import useToastStack from '../hooks/useToastStack';
import ThreadTabs from '../components/chat/ThreadTabs';
import HistoryEmptyState from '../components/chat/HistoryEmptyState';
import ToastStack from '../components/chat/ToastStack';
import {
  Archive as ArchiveIcon,
  ArrowRight as ArrowRightIcon,
  MessageSquare as MessageIcon, 
  Plus as PlusIcon,
  Search as SearchIcon,
  Trash2 as TrashIcon,
} from 'lucide-react';
import { MONO, SERIF } from '../components/chat/ChatUtils';
import '../styles/chat.css'; // hard animations live here

function ThreadCard({ thread, index, onResume, onArchive, onDelete }) {
  const { title, snippet, messageCount } = summarizeThread(thread);
  const archived = Boolean(thread.archived);
  const updatedLabel = archived ? thread.updated.replace('Updated', 'Archived') : thread.updated;

  const outlineBtn =
    'flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border border-[var(--border-medium)] bg-[var(--bg-surface)] px-3 py-1.5 text-[12px] font-semibold text-[var(--text-secondary)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--primary)] hover:bg-[var(--primary-light)] hover:text-[var(--primary)] active:scale-95';

  return (
    <article
      style={{ animationDelay: `${index * 60}ms` }}
      className="chat-rise group flex items-center gap-3.5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-3 transition-all duration-200 [box-shadow:var(--shadow-sm)] hover:-translate-y-0.5 hover:border-[var(--primary)] hover:[box-shadow:var(--shadow-md)]"
    >
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)] transition-transform duration-200 group-hover:scale-105">
        {archived ? <span className="text-[17px]" aria-hidden="true">📦</span> : <MessageIcon size={17} />}
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-0.5 flex items-center gap-2">
          <h3 className="m-0 truncate text-[15px] font-bold text-[var(--text-primary)]">{title}</h3>
          <span className={`${MONO} shrink-0 rounded-full border border-[var(--badge-border)] bg-[var(--badge-bg)] px-2 py-0.5 text-[9.5px] font-bold text-[var(--badge-text)]`}>
            {messageCount} messages
          </span>
        </div>
        <p className="m-0 mb-1 truncate text-[12.5px] text-[var(--text-secondary)]">{snippet}</p>
        <p className={`${MONO} m-0 text-[10px] text-[var(--text-muted)]`}>{updatedLabel}</p>
      </div>

      <button
        type="button"
        onClick={() => onResume(thread.id)}
        className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full bg-[var(--primary)] px-3.5 py-1.5 text-[12px] font-bold text-[var(--primary-contrast)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--primary-hover)] active:scale-95"
      >
        {archived ? 'Open Thread' : 'Resume Thread'} <ArrowRightIcon size={12} />
      </button>

      <button type="button" onClick={() => onArchive(thread.id)} className={outlineBtn}>
        <ArchiveIcon size={13} /> {archived ? 'Restore' : 'Archive'}
      </button>

      <button
        type="button"
        onClick={() => onDelete(thread.id)}
        aria-label={`Delete ${title}`}
        title="Delete"
        className="grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-muted)] transition-all duration-200 hover:scale-105 hover:border-[#fca5a5] hover:bg-[#fee2e2] hover:text-[var(--status-danger)] active:scale-95"
      >
        <TrashIcon size={14} />
      </button>
    </article>
  );
}

export default function ChatHistoryPage() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const { toasts, push, dismiss } = useToastStack();

  const tab = params.get('tab') === 'archived' ? 'archived' : 'active';
  const setTab = (next) => setParams(next === 'archived' ? { tab: 'archived' } : {}, { replace: true });

  const [threads, setThreads] = useState(getThreads);
  const [query, setQuery] = useState('');

  // Stay in sync with the thread store (archive, delete, save from Ask EKA).
  useEffect(() => {
    const sync = () => setThreads(getThreads());
    sync();
    return subscribeThreads(sync);
  }, []);

  const activeCount = threads.filter((t) => !t.archived).length;
  const archivedCount = threads.length - activeCount;

  // threads in the selected tab, before searching
  const tabThreads = useMemo(
    () => threads.filter((t) => Boolean(t.archived) === (tab === 'archived')),
    [threads, tab]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tabThreads;
    return tabThreads.filter((t) => {
      const { title, snippet } = summarizeThread(t);
      return `${title} ${snippet}`.toLowerCase().includes(q);
    });
  }, [tabThreads, query]);

  function handleClear() {
    if (tabThreads.length === 0) return;
    if (tab === 'archived') {
      clearAllArchivedThreads();
      push('Archived chat history cleared');
    } else {
      clearAllActiveThreads();
      push('Active chat history deleted');
    }
  }

  function handleArchive(id) {
    const wasArchived = threads.find((t) => t.id === id)?.archived;
    toggleArchiveThread(id);
    push(wasArchived ? '📂 Thread restored to Active' : '🗃️ Thread moved to Archive', 'success');
  }

  function handleDelete(id) {
    deleteThread(id);
    push('Chat thread deleted');
  }

  const isArchived = tab === 'archived';

  return (
    <div className="chat-history-page w-full">
        {/* ---------- header ---------- */}
      <div className="chat-rise mb-5 flex items-end justify-between gap-6">
        <div className="min-w-0">
          <span className={`${MONO} mb-3 inline-flex rounded-md border border-[var(--badge-border)] bg-[var(--badge-bg)] px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.14em] text-[var(--badge-text)]`}>
            {isArchived ? 'Thread archives' : 'Active chat history'}
          </span>
          <h1 className={`${SERIF} m-0 mb-1.5 text-[38px] font-bold leading-tight text-[var(--text-primary)]`}>
            Pick up where you left off.
          </h1>
          <p className="m-0 max-w-[560px] text-[13.5px] leading-relaxed text-[var(--text-secondary)]">
            Revisit past reasoning traces, grounded answers, and active intelligence threads.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2.5">
          {tabThreads.length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              className="flex cursor-pointer items-center gap-1.5 rounded-full border border-[var(--badge-border)] bg-[var(--primary-light)] px-3.5 py-1.5 text-[12px] font-semibold text-[var(--primary)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#fca5a5] hover:bg-[#fee2e2] hover:text-[var(--status-danger)] active:scale-95"
            >
              <TrashIcon size={13} /> {isArchived ? 'Clear Archive' : 'Delete Active History'}
            </button>
          )}
          <button
            type="button"
            onClick={() => navigate('/ask-eka')}
            className="flex cursor-pointer items-center gap-1.5 rounded-full bg-[var(--primary)] px-3.5 py-1.5 text-[12px] font-bold text-[var(--primary-contrast)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--primary-hover)] active:scale-95"
          >
            <PlusIcon size={13} /> Start New Thread
          </button>
        </div>
      </div>

      {/* ---------- tabs ---------- */}
      <div className="chat-rise mb-4" style={{ animationDelay: '60ms' }}>
        <ThreadTabs tab={tab} activeCount={activeCount} archivedCount={archivedCount} onChange={setTab} />
      </div>

      {/* ---------- search ---------- */}
      <div className="chat-rise mb-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3 [box-shadow:var(--shadow-sm)]" style={{ animationDelay: '120ms' }}>
        <label className="flex items-center gap-2.5 rounded-full border border-transparent bg-[var(--bg-surface-subtle)] px-3 py-2 transition-colors focus-within:border-[var(--primary)]">
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--bg-surface)] text-[var(--primary)]">
            <SearchIcon size={13} />
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search through conversation topics, questions, or keywords..."
            className={`${MONO} min-w-0 flex-1 border-none bg-transparent text-[12px] text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]`}
          />
        </label>
      </div>

      {/* ---------- list / empty states ---------- */}
      {tabThreads.length === 0 ? (
        <HistoryEmptyState
          variant={isArchived ? 'archived' : 'active'}
          onAction={() => (isArchived ? setTab('active') : navigate('/ask-eka'))}
        />
      ) : (
        <div className="flex flex-col gap-3 pb-6">
          {filtered.map((thread, i) => (
            <ThreadCard
              key={thread.id}
              thread={thread}
              index={i}
              onResume={(id) => navigate('/ask-eka', { state: { threadId: id } })}
              onArchive={handleArchive}
              onDelete={handleDelete}
            />
          ))}

          {filtered.length === 0 && (
            <p className="chat-pop m-0 rounded-2xl border border-dashed border-[var(--border-medium)] px-6 py-10 text-center text-[14px] text-[var(--text-muted)]">
              No threads match your search.
            </p>
          )}
        </div>
      )}

      <ToastStack toasts={toasts} onDismiss={dismiss} />
    </div>
  );
}