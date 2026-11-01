import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useChat from '../hooks/useChat';
import useToastStack from '../hooks/useToastStack';
import ChatMessageList from '../components/chat/ChatMessageList';
import ChatInputBox from '../components/chat/ChatInputBox';
import ChatSidebar from '../components/chat/ChatSidebar';
import ToastStack from '../components/chat/ToastStack';
import { ClockIcon, FileIcon, FlaskIcon, PanelIcon, PlusIcon, ShieldCheckIcon } from '../components/chat/ChatIcons';
import { EYEBROW, MONO, SERIF, getDocumentLink } from '../components/chat/ChatUtils';
import '../styles/chat.css'; // hard animations live here

// ===================== header (page-specific, stays local) =====================
function AskEkaHeader({ historyOpen, onToggleHistory, onNewThread,  onToggleDeepResearch }) {
  const badge = `${MONO} inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-2.5 py-1 text-[10.5px] font-semibold text-[var(--text-secondary)]`;
  const pill = 'flex cursor-pointer items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12px] font-semibold transition-all duration-200 hover:-translate-y-0.5 active:scale-95';

  return (
    <header className="flex shrink-0 flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-3">
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-2">
        <button
          type="button"
          onClick={onToggleHistory}
          aria-label="Toggle history"
          aria-pressed={historyOpen}
          className={`grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-lg border transition ${
            historyOpen
              ? 'border-[var(--primary)] bg-[var(--primary-light)] text-[var(--primary)]'
              : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-subtle)]'
          }`}
        >
          <PanelIcon size={17} />
        </button>

        <h1 className={`${SERIF} m-0 text-[24px] font-bold leading-tight text-[var(--text-primary)]`}>Talk to your organization.</h1>

        <div className="flex flex-wrap items-center gap-2">
          <span className={badge}>
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--status-verified)]" />
            24 docs (148k vectors)
          </span>
          <span className={badge}>
            <ShieldCheckIcon size={12} />
            100% Tenant-Grounded
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2.5">

<Link
  to="/ask-eka/history"
  className={`${pill} border-[var(--border-medium)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--primary-deep)] hover:bg-[var(--bg-surface-subtle)] hover:text-[var(--primary-deep)] hover:shadow-[var(--shadow-md)]`}
>
  <ClockIcon size={14} /> Chat History
</Link>

<button type="button" onClick={onNewThread} className={`${pill} border-[var(--primary-deep)] bg-[var(--primary)] font-bold text-[var(--primary-contrast)] hover:border-[var(--primary-deep)] hover:bg-[var(--primary-deep)] hover:shadow-[var(--shadow-md)]`}>
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
            type="button"
            onClick={() => onPick(q)}
            className={`${MONO} cursor-pointer rounded-md border border-dashed border-[var(--border-medium)] bg-[var(--bg-surface)] px-4 py-2.5 text-[12.5px] text-[var(--text-primary)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--primary)] hover:bg-[var(--bg-surface-subtle)]`}
          >
            <span className="mr-1.5 text-[var(--primary)]">✦</span>
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

// ===================== page (ChatPage): owns state through useChat =====================
export default function AskEkaPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toasts, push, dismiss } = useToastStack();
  const chat = useChat({ notify: push });

  const [inputValue, setInputValue] = useState(''); // the typed text
  const [historyOpen, setHistoryOpen] = useState(false);
  const [activeSource, setActiveSource] = useState(null); // citation shown in SourcePanel

  // "Resume Thread" from the history page arrives with { conversationId } in router state.
  useEffect(() => {
    const id = location.state?.conversationId;
    if (id) {
      chat.openConversation(id);
      navigate(location.pathname, { replace: true, state: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSend() {
    if (chat.busy) return;
    if (chat.handleSend(inputValue)) setInputValue('');
  }

  function handleNewThread() {
    chat.newChat();
    setInputValue('');
    push('Started new chat session');
  }

  function handleToggleDeepResearch() {
    push(chat.deepResearch ? 'Deep Research Agent disabled' : 'Deep Research Agent enabled');
    chat.toggleDeepResearch();
  }
  return (
    // h-full fills AppLayout's <main>. If main isn't height-constrained in your shell,
    // use h-[calc(100dvh-8.5rem)] instead (4.5rem topbar + 4rem main vertical padding).
    <div className="ask-eka-page flex h-full min-h-0 flex-col overflow-hidden">
      <div className="flex min-h-0 min-w-0 flex-1 overflow-hidden">
        <ChatSidebar
          open={historyOpen}
          conversations={chat.conversations.filter((c) => !c.archived)}
          activeConversationId={chat.conversationId}
          onClose={() => setHistoryOpen(false)}
          onSelect={chat.openConversation}
          onDelete={chat.deleteConversation}
          onNewThread={handleNewThread}
          onOpenArchive={() => setHistoryOpen(false)}
        />

        <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-4 overflow-hidden">
          <AskEkaHeader
            historyOpen={historyOpen}
            onToggleHistory={() => setHistoryOpen(!historyOpen)}
            onNewThread={handleNewThread}
            deepResearch={chat.deepResearch}
            onToggleDeepResearch={handleToggleDeepResearch}
          />

          <section className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
            <ChatMessageList
              messages={chat.messages}
              typing={chat.typing}
              isLoading={chat.isLoading}
              retryingMessageId={chat.retryingMessageId}
              error={chat.error}
              isHistoryLoading={chat.isHistoryLoading}
              busy={chat.busy}
              emptyState={<EmptyState onPick={chat.handleSend} />}
              onEditQuestion={chat.editQuestion}
              onResume={chat.resumeTyping}
              onRetry={chat.handleRetry}
              onRate={chat.handleFeedback}
              onResend={chat.resend}
              onReload={chat.reloadHistory}
              onCopied={() => push('📋 Answer copied to clipboard!')}
              onShare={() => push('🔗 Share summary copied to clipboard')}
              onCanvas={() => push('✦ Canvas workspace is coming soon')}
            />

            <div className="relative z-10 shrink-0 bg-[var(--bg-app)] pt-2">
              <ChatInputBox
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onSend={handleSend}
                entryNumber={Math.floor(chat.messages.length / 2) + 1}
                isBusy={chat.busy}
                onStop={chat.stop}
                deepResearch={chat.deepResearch}
                onToggleDeepResearch={handleToggleDeepResearch}
              />
            </div>
          </section>
        </div>
      </div>

      <ToastStack toasts={toasts} onDismiss={dismiss} />
    </div>
  );
}