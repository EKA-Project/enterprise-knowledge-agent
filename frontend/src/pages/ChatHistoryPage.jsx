/// chat history/////
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  deleteConversation,
  deleteConversations,
  listConversations,
  setConversationArchived,
  subscribe,
} from '../components/chat/chatApi';
import useToastStack from '../hooks/useToastStack';
import ThreadTabs from '../components/chat/ThreadTabs';
import HistoryEmptyState from '../components/chat/HistoryEmptyState';
import ToastStack from '../components/chat/ToastStack';
import { ArchiveIcon, ArrowRightIcon, MessageIcon, PlusIcon, SearchIcon, TrashIcon } from '../components/chat/ChatIcons';
import { MONO, SERIF, formatUpdated } from '../components/chat/ChatUtils';
import '../styles/chat.css'; // hard animations live here

function ThreadCard({ conversation, index, onResume, onArchive, onDelete }) {
  const { title, preview, message_count: messageCount, archived } = conversation;

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
        <p className="m-0 mb-1 truncate text-[12.5px] text-[var(--text-secondary)]">{preview}</p>
        <p className={`${MONO} m-0 text-[10px] text-[var(--text-muted)]`}>{formatUpdated(conversation.updated_at, archived)}</p>
      </div>

      <button
        type="button"
        onClick={() => onResume(conversation.id)}
        className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full bg-[var(--primary)] px-3.5 py-1.5 text-[12px] font-bold text-[var(--primary-contrast)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--primary-deep)] active:scale-95"
      >
        {archived ? 'Open Thread' : 'Resume Thread'} <ArrowRightIcon size={12} />
      </button>

      <button type="button" onClick={() => onArchive(conversation)} className={outlineBtn}>
        <ArchiveIcon size={13} /> {archived ? 'Restore' : 'Archive'}
      </button>

      <button
        type="button"
        onClick={() => onDelete(conversation.id)}
        aria-label={`Delete ${title}`}
        title="Delete"
        className="grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-muted)] transition-all duration-200 hover:scale-105 hover:border-[var(--status-danger-border)] hover:bg-[var(--status-danger-bg)] hover:text-[var(--status-danger)] active:scale-95"
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
  const isArchived = tab === 'archived';

  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [query, setQuery] = useState('');

  // load the list, and reload after every change (mock notifications; refetch with a real API)
  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const list = await listConversations();
        if (!alive) return;
        setConversations(list);
        setLoadError('');
      } catch (e) {
        if (alive) setLoadError(e.message);
      } finally {
        if (alive) setIsLoading(false);
      }
    };
    load();
    const off = subscribe(load);
    return () => {
      alive = false;
      off();
    };
  }, []);

  const activeCount = conversations.filter((c) => !c.archived).length;
  const archivedCount = conversations.length - activeCount;

  const tabItems = useMemo(() => conversations.filter((c) => c.archived === isArchived), [conversations, isArchived]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tabItems;
    return tabItems.filter((c) => `${c.title} ${c.preview}`.toLowerCase().includes(q));
  }, [tabItems, query]);

  async function run(action, doneMessage, tone) {
    try {
      await action();
      push(doneMessage, tone);
    } catch (e) {
      push(e.message || 'Something went wrong. Please try again.');
    }
  }

  const handleClear = () =>
    tabItems.length > 0 &&
    run(
      () => deleteConversations({ archived: isArchived }),
      isArchived ? 'Archived chat history cleared' : 'Active chat history deleted'
    );

  const handleArchive = (conversation) =>
    run(
      () => setConversationArchived(conversation.id, !conversation.archived),
      conversation.archived ? '📂 Thread restored to Active' : '🗃️ Thread moved to Archive',
      'success'
    );

  const handleDelete = (id) => run(() => deleteConversation(id), 'Chat thread deleted');

  return (
    <div className="chat-history-page mx-auto w-full max-w-[960px]">
      {/* ---------- header ---------- */}
      <div className="chat-rise mb-5 flex items-end justify-between gap-6">
        <div className="min-w-0">
          <span className={`${MONO} mb-3 inline-flex rounded-md border border-[var(--badge-border)] bg-[var(--badge-bg)] px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.14em] text-[var(--badge-text)]`}>
            {isArchived ? 'Thread archives' : 'Active chat history'}
          </span>
          <h1 className={`${SERIF} m-0 mb-1.5 text-[38px] font-bold leading-tight text-[var(--text-primary)]`}>Pick up where you left off.</h1>
          <p className="m-0 max-w-[560px] text-[13.5px] leading-relaxed text-[var(--text-secondary)]">
            Revisit past reasoning traces, grounded answers, and active intelligence threads.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2.5">
          {tabItems.length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              className="flex cursor-pointer items-center gap-1.5 rounded-full border border-[var(--badge-border)] bg-[var(--primary-light)] px-3.5 py-1.5 text-[12px] font-semibold text-[var(--primary)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--status-danger-border)] hover:bg-[var(--status-danger-bg)] hover:text-[var(--status-danger)] active:scale-95"
            >
              <TrashIcon size={13} /> {isArchived ? 'Clear Archive' : 'Delete Active History'}
            </button>
          )}
          <button
            type="button"
            onClick={() => navigate('/ask-eka')}
            className="flex cursor-pointer items-center gap-1.5 rounded-full bg-[var(--primary)] px-3.5 py-1.5 text-[12px] font-bold text-[var(--primary-contrast)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--primary-deep)] active:scale-95"
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

      {/* ---------- list / loading / error / empty states ---------- */}
      {isLoading ? (
        <div className="flex flex-col gap-3 pb-6" aria-label="Loading conversations">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-[76px] animate-pulse rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]" />
          ))}
        </div>
      ) : loadError ? (
        <p className="m-0 rounded-2xl border border-[var(--status-danger-border)] bg-[var(--status-danger-bg)] px-6 py-5 text-center text-[13px] font-semibold text-[var(--status-danger)]">{loadError}</p>
      ) : tabItems.length === 0 ? (
        <HistoryEmptyState variant={isArchived ? 'archived' : 'active'} onAction={() => (isArchived ? setTab('active') : navigate('/ask-eka'))} />
      ) : (
        <div className="flex flex-col gap-3 pb-6">
          {filtered.map((conversation, i) => (
            <ThreadCard
              key={conversation.id}
              conversation={conversation}
              index={i}
              onResume={(id) => navigate('/ask-eka', { state: { conversationId: id } })}
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