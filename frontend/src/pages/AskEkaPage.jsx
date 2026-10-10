import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useChat from '../hooks/useChat';
import { deleteThread, getThreads } from '../../services/chatService';
import ChatMessage from '../components/chat/ChatMessage';
import ChatInput from '../components/chat/ChatInput';
import ChatHistoryDrawer from '../components/chat/ChatHistoryDrawer';
import { ArchiveIcon, FileIcon, PanelIcon, PlusIcon, ShieldCheckIcon } from '../components/chat/ChatIcons';
import { EYEBROW, MONO, SERIF } from '../components/chat/ChatUtils';
import '../styles/chat.css'; // scoped animations only

// ===================== header (page-specific, stays local) =====================
function AskEkaHeader({ historyOpen, onToggleHistory, onNewThread }) {
  const badge = `${MONO} inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-2.5 py-1 text-[10.5px] font-semibold text-[var(--text-secondary)]`;
  return (
    <header className="flex shrink-0 items-start justify-between gap-4 border-b border-[var(--border-subtle)] pb-3">
    <div className="flex min-w-0 flex-1 items-start gap-3">
        {/* opens the left history panel */}
        <button
          onClick={onToggleHistory}
          aria-label="Toggle history"
          aria-pressed={historyOpen}
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border transition ${
            historyOpen
              ? 'border-[var(--primary)] bg-[var(--primary-light)] text-[var(--primary)]'
              : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-subtle)]'
          }`}
        >
          <PanelIcon size={17} />
        </button>

        <div className="flex min-w-0 flex-col items-start gap-2">
  <h1 className={`${SERIF} m-0 text-[24px] font-bold leading-tight text-[var(--text-primary)]`}>
    Talk to your organization.
  </h1>

  <div className="flex flex-wrap items-center gap-2">
    <span className={badge}>
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
      24 docs (148k vectors)
    </span>

    <span className={badge}>
      <ShieldCheckIcon size={12} />
      100% Tenant-Grounded
    </span>
    </div>
  </div>
</div>

      <div className="flex shrink-0 items-center gap-2.5">
        <Link
          to="/ask-eka/history"
          className="flex cursor-pointer items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3.5 py-1.5 text-[12px] font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--border-medium)] hover:bg-[var(--bg-surface-subtle)]"
        >
          <ArchiveIcon size={14} /> History Archive
        </Link>
        <button
          onClick={onNewThread}
          className="flex cursor-pointer items-center gap-1.5 rounded-full bg-[var(--primary)] px-3.5 py-1.5 text-[12px] font-bold text-[var(--primary-contrast)] transition-colors hover:bg-[var(--primary-hover)] active:scale-95"
        >
          <PlusIcon size={14} /> New Thread
        </button>
      </div>
    </header>
  );
}

// ===================== empty state (page-specific, stays local) =====================
const SUGGESTED = [
  "What's our leave policy?",
  'How do I submit an expense claim?',
  "What's the onboarding checklist for new hires?",
  "What's our remote work policy?",
];

function EmptyState({ onPick }) {
  return (
    <div className="m-auto flex flex-col items-center px-3 py-4 text-center">
      <div className="mb-2 grid h-14 w-14 place-items-center rounded-xl border border-dashed border-[var(--primary)] text-[var(--primary)]">
        <FileIcon size={22} />
      </div>
      <p className={`${EYEBROW} m-0 mb-1.5`}>ENTRY 00 · EMPTY</p>
      <h2 className={`${SERIF} m-0 mb-1.5 text-[30px] font-bold italic text-[var(--text-primary)]`}>The ledger is empty</h2>
      <p className="m-0 mb-4 max-w-[520px] text-[13px] leading-relaxed text-[var(--text-secondary)]">
        Ask a question about your organization's documents and it will be logged here, with the exact source attached.
      </p>

      <p className={`${EYEBROW} m-0 mb-3`}>TRY ONE OF THESE</p>
      <div className="flex max-w-[580px] flex-wrap justify-center gap-2.5">
        {SUGGESTED.map((q) => (
          <button
            key={q}
            onClick={() => onPick(q)}
            className={`${MONO} rounded-md border border-dashed border-[var(--border-medium)] bg-[var(--bg-surface)] px-4 py-2.5 text-[12.5px] text-[var(--text-primary)] transition hover:border-[var(--primary)] hover:bg-[var(--bg-surface-subtle)]`}
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

// ===================== page =====================
export default function AskEkaPage() {
  const chat = useChat();
  const location = useLocation();
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState('');
  const [historyOpen, setHistoryOpen] = useState(false);
  const [threads, setThreads] = useState(() => getThreads().filter((t) => !t.archived));

  const scrollRef = useRef(null);
  const stickRef = useRef(true); // true while the user is near the bottom

  const refreshThreads = () => setThreads(getThreads().filter((t) => !t.archived));

  // "Resume Thread" from the archive page arrives with { threadId } in router state.
  useEffect(() => {
    const id = location.state?.threadId;
    if (id) {
      chat.loadThread(id);
      navigate(location.pathname, { replace: true, state: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the newest text in view while generating, unless the user scrolled up.
  function handleScroll() {
    const el = scrollRef.current;
    stickRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
  }
  useEffect(() => {
    const el = scrollRef.current;
    if (el && stickRef.current) el.scrollTo({ top: el.scrollHeight });
  }, [chat.turns]);

  function handleSend() {
    if (chat.isGenerating) return;
    stickRef.current = true;
    if (chat.submitQuestion(inputValue)) setInputValue('');
  }

  function handleSuggestion(question) {
    stickRef.current = true;
    chat.submitQuestion(question);
  }

  function handleNewThread() {
    chat.newThread();
    setInputValue('');
    refreshThreads();
  }

  function handleToggleHistory() {
    if (!historyOpen) refreshThreads();
    setHistoryOpen(!historyOpen);
  }

  function handleSelectThread(id) {
    chat.loadThread(id);
    refreshThreads();
  }

  function handleDeleteThread(id) {
    deleteThread(id);
    chat.detachThread(id);
    refreshThreads();
  }

  return (
    // h-full fills AppLayout's <main>. If main isn't height-constrained in your shell,
    // use h-[calc(100dvh-8.5rem)] instead (4.5rem topbar + 4rem main vertical padding).

      <div className="ask-eka-page flex h-full min-h-0 flex-col overflow-hidden">
        <div className="flex min-h-0 min-w-0 flex-1 overflow-hidden">
        <ChatHistoryDrawer
          open={historyOpen}
          threads={threads}
          activeThreadId={chat.threadId}
          onClose={() => setHistoryOpen(false)}
          onSelect={handleSelectThread}
          onDelete={handleDeleteThread}
          onNewThread={handleNewThread}
          onOpenArchive={() => setHistoryOpen(false)}
        />
        <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-4 overflow-hidden">          <AskEkaHeader
          historyOpen={historyOpen}
          onToggleHistory={handleToggleHistory}
          onNewThread={handleNewThread}
        />
        <section className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">          {/* only this area scrolls; header and input stay in place */}
          <div ref={scrollRef} onScroll={handleScroll} className="ask-eka-scroll flex min-h-0 flex-1 flex-col overflow-y-auto pr-1">
            {chat.turns.length === 0 ? (
              <EmptyState onPick={handleSuggestion} />
            ) : (
              <div className="flex flex-col gap-5 pb-6 pt-1">
                {chat.turns.map((turn, i) => (
                  <ChatMessage
                    key={turn.id}
                    turn={turn}
                    entryNumber={i + 1}
                    onPause={chat.pauseTurn}
                    onResume={chat.resumeTurn}
                    onRegenerate={chat.regenerateTurn}
                    onEdit={chat.editQuestion}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="relative z-10 shrink-0 bg-[var(--bg-app)] pt-2">   
              <ChatInput
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onSend={handleSend}
              entryNumber={chat.turns.length + 1}
              isGenerating={chat.isGenerating}
              onPause={chat.pauseActive}
            />
            
          </div>
        </section>
      </div>
      </div>
    </div>
  );
}