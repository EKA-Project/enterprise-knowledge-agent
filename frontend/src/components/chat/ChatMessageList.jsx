import { useEffect, useRef, useState } from 'react';
import ChatEntry from './ChatEntry';
import LoadingBubble from './LoadingBubble';
import ErrorBubble from './ErrorBubble';
import { AlertIcon, CheckIcon, EditIcon, PlayIcon, SparkleIcon } from './ChatIcons';
import { MONO, formatWhen, groupTurns } from './ChatUtils';

// ---- top-right status of a turn: typing pill / Resume / Grounded / Failed ----
function StatusBadge({ kind, onResume }) {
  const base = 'flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10.5px] font-semibold transition';
  if (kind === 'typing') {
    return (
      <span className={`${base} ask-eka-typing-pill border-[var(--status-warning-border)] bg-[var(--status-warning-bg)] text-[var(--status-warning)]`}>
        <SparkleIcon size={11} /> EKA is typing <span className="animate-pulse tracking-widest">...</span>
      </span>
    );
  }
  if (kind === 'paused') {
    return (
      <button type="button" onClick={onResume} className={`${base} cursor-pointer border-[var(--badge-border)] bg-[var(--status-info-bg)] text-[var(--status-info)] hover:brightness-95`}>
        <PlayIcon size={11} /> Resume Generation
      </button>
    );
  }
  if (kind === 'failed') {
    return (
      <span className={`${base} border-[var(--status-danger-border)] bg-[var(--status-danger-bg)] text-[var(--status-danger)]`}>
        <AlertIcon size={12} /> Failed
      </span>
    );
  }
  return (
    <span className={`${base} border-transparent bg-[var(--status-success-bg)] text-[var(--status-success)]`}>
      <CheckIcon size={12} /> Grounded
    </span>
  );
}

// ---- one question + answer card (the two rows that share a turn_id) ----
function TurnCard({
  turn, number, busy, reveal, isRetrying, sendError,
  onEditQuestion, onResume, onRetry, onRate, onResend,
  onCopied, onShare, onOpenSource,
}) {
  const { user, assistant } = turn;
  const [editing, setEditing] = useState(false);

  let kind = 'grounded';
  if (!assistant) kind = sendError ? 'failed' : 'typing';
  else if (assistant.status === 'failed') kind = 'failed';
  else if (isRetrying) kind = 'typing';
  else if (reveal && !reveal.paused) kind = 'typing';
  else if (reveal && reveal.paused) kind = 'paused';

  return (
    <article className="ask-eka-rise flex gap-4">
      {/* timeline marker */}
      <div className="shrink-0 pt-7">
        <span className="block h-[18px] w-[18px] rounded-full border-2 border-[var(--primary)] bg-[var(--bg-surface)]" />
      </div>

      <div className="min-w-0 flex-1 rounded-[22px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-5 py-3 [box-shadow:var(--shadow-md)]">
        <div className="mb-1 flex items-start justify-between gap-4">
          <p className={`${MONO} m-0 flex items-center gap-2 text-[11px] font-bold tracking-[0.08em] text-[var(--text-muted)]`}>
            <span className="rounded-xl bg-[var(--primary-light)] px-2 py-0.5 text-[var(--primary)]">REQ {String(number).padStart(2, '0')}</span>
            <span>• {formatWhen(user.created_at)}</span>
          </p>

          <div className="flex items-center gap-2">
            <StatusBadge kind={kind} onResume={onResume} />
            {!editing && (
              <button
                type="button"
                disabled={busy}
                onClick={() => setEditing(true)}
                className={`${MONO} flex cursor-pointer items-center gap-1.5 rounded-xl border border-[var(--border-subtle)] px-2.5 py-1 text-[10px] font-semibold text-[var(--text-primary)] transition hover:bg-[var(--bg-surface-subtle)] hover:text-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-50`}
              >
                <EditIcon size={12} /> Edit
              </button>
            )}
          </div>
        </div>

        <ChatEntry
          message={user}
          editing={editing}
          onCancelEdit={() => setEditing(false)}
          onSaveEdit={(text) => {
            setEditing(false);
            if (text !== user.content) onEditQuestion(text); // becomes a new turn
          }}
        />

        {assistant ? (
          <ChatEntry
            message={assistant}
            question={user.content}
            reveal={reveal}
            isRetrying={isRetrying}
            onRetry={onRetry}
            onRate={onRate}
            onCopied={onCopied}
            onShare={onShare}
          />
        ) : sendError ? (
          <ErrorBubble message={sendError.message} actionLabel="Resend" onAction={onResend} />
        ) : (
          <LoadingBubble />
        )}
      </div>
    </article>
  );
}

function HistorySkeleton() {
  return (
    <div className="flex flex-col gap-5 pt-1" aria-label="Loading conversation">
      {[0, 1].map((i) => (
        <div key={i} className="flex gap-4">
          <div className="shrink-0 pt-7"><span className="block h-[18px] w-[18px] rounded-full border-2 border-[var(--border-medium)]" /></div>
          <div className="min-w-0 flex-1 animate-pulse rounded-[22px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-5 py-5">
            <div className="mb-4 h-5 w-24 rounded bg-[var(--bg-surface-subtle)]" />
            <div className="mb-4 h-7 w-2/3 rounded bg-[var(--bg-surface-subtle)]" />
            <div className="h-24 rounded-2xl bg-[var(--bg-surface-subtle)]" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Renders the conversation. It decides nothing about what a message contains.
 * emptyState: node shown for a new, empty chat.
 */
export default function ChatMessageList({
  messages, typing, isLoading, retryingMessageId, error, isHistoryLoading, busy, emptyState,
  onEditQuestion, onResume, onRetry, onRate, onResend, onReload,
  onCopied, onShare
}) {
  const scrollRef = useRef(null);
  const stickRef = useRef(true); // true while the user is near the bottom

  function handleScroll() {
    const el = scrollRef.current;
    stickRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
  }

  // auto-scroll to the newest content unless the user scrolled up
  useEffect(() => {
    const el = scrollRef.current;
    if (el && stickRef.current) el.scrollTo({ top: el.scrollHeight });
  }, [messages, typing?.revealed, isLoading, error]);

  // a newly sent question should always bring the view to the bottom
  useEffect(() => {
    if (isLoading) stickRef.current = true;
  }, [isLoading]);

  const turns = groupTurns(messages);
  const historyError = error?.kind === 'history' ? error : null;
  const sendError = error?.kind === 'send' ? error : null;

  return (
    <div ref={scrollRef} onScroll={handleScroll} className="ask-eka-scroll flex min-h-0 flex-1 flex-col overflow-y-auto pr-1">
      {isHistoryLoading ? (
        <HistorySkeleton />
      ) : historyError ? (
        <div className="m-auto w-full max-w-[520px]">
          <ErrorBubble message={historyError.message} actionLabel="Reload" onAction={onReload} />
        </div>
      ) : turns.length === 0 ? (
        emptyState
      ) : (
        <div className="flex flex-col gap-5 pb-6 pt-1">
          {turns.map((turn, i) => (
            <TurnCard
              key={turn.turnId}
              turn={turn}
              number={i + 1}
              busy={busy}
              reveal={turn.assistant && typing?.id === turn.assistant.id ? typing : null}
              isRetrying={Boolean(turn.assistant) && retryingMessageId === turn.assistant.id}
              sendError={sendError && sendError.tempId === turn.user?.tempId ? sendError : null}
              onEditQuestion={onEditQuestion}
              onResume={onResume}
              onRetry={onRetry}
              onRate={onRate}
              onResend={onResend}
              onCopied={onCopied}
              onShare={onShare}
            />
          ))}
        </div>
      )}
    </div>
  );
}