import { useState } from 'react';
import CitationList from './CitationList';
import FeedbackButtons from './FeedbackButtons';
import { AlertIcon, CheckIcon, CopyIcon, EditIcon, RefreshIcon, ShareIcon, SparkleIcon } from './ChatIcons';
import { MONO, SERIF, contentToLines, contentToPlainText, revealLines } from './ChatUtils';

// ---------------- user message: the question (or its inline editor) ----------------
function UserEntry({ message, editing, onSaveEdit, onCancelEdit }) {
  const [draft, setDraft] = useState(message.content);

  function save() {
    const next = draft.trim();
    if (next) onSaveEdit(next);
  }
  function cancel() {
    setDraft(message.content);
    onCancelEdit();
  }

  if (!editing) {
    return (
      <h3 className={`${SERIF} m-0 mb-4 text-[26px] font-semibold italic leading-tight text-[var(--text-primary)]`}>
        “{message.content}”
      </h3>
    );
  }

  return (
    <div className="mb-4 rounded-2xl border border-[var(--badge-border)] bg-[var(--primary-light)] p-4">
      <div className="mb-2.5 flex items-center justify-between gap-3">
        <p className={`${MONO} m-0 flex items-center gap-1.5 text-[10.5px] font-bold tracking-[0.12em] text-[var(--primary)]`}>
          <EditIcon size={12} /> EDIT QUESTION PROMPT
        </p>
        <p className={`${MONO} m-0 text-[10.5px] text-[var(--text-muted)]`}>Modifying prompt re-synthesizes answer</p>
      </div>

      <textarea
        autoFocus
        rows={2}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onFocus={(e) => e.target.setSelectionRange(e.target.value.length, e.target.value.length)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); save(); }
          if (e.key === 'Escape') cancel();
        }}
        className={`${SERIF} w-full resize-none rounded-xl border border-[var(--primary)] bg-[var(--bg-surface)] px-3.5 py-2.5 text-[18px] font-semibold italic leading-snug text-[var(--text-primary)] outline-none focus:[box-shadow:0_0_0_3px_var(--primary-glow)]`}
      />

      <div className="mt-3 flex items-center justify-end gap-2">
        <button type="button" onClick={cancel} className="cursor-pointer rounded-full border border-[var(--border-medium)] bg-[var(--bg-surface)] px-3.5 py-1.5 text-[12px] font-semibold text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-surface-subtle)]">
          Cancel
        </button>
        <button type="button" onClick={save} disabled={!draft.trim()} className="cursor-pointer rounded-full bg-[var(--primary)] px-3.5 py-1.5 text-[12px] font-bold text-[var(--primary-contrast)] transition-colors hover:bg-[var(--primary-hover)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50">
          Save &amp; Regenerate
        </button>
      </div>
    </div>
  );
}

// ---------------- assistant message: action row ----------------
function ActionBar({ message, question, isRetrying, onRetry, onRate, onCopied, onShare }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try { await navigator.clipboard.writeText(contentToPlainText(message.content)); } catch { /* ignore */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
    onCopied?.();
  }
  async function handleShare() {
    try { await navigator.clipboard.writeText(`${question}\n\n${contentToPlainText(message.content)}`); } catch { /* ignore */ }
    onShare?.();
  }

const btn =
  'group grid h-8 w-8 cursor-pointer place-items-center rounded-lg border border-transparent text-[var(--text-muted)] transition-all duration-200 ease-out hover:-translate-y-1 hover:scale-110 hover:border-[var(--badge-border)] hover:bg-[var(--primary-light)] hover:text-[var(--primary)] active:translate-y-0 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40';

  return (
    <div className="mt-3 flex items-center gap-1">
      <button type="button" onClick={handleCopy} title={copied ? 'Copied' : 'Copy'} className={`${btn} ${copied ? 'border-[var(--badge-border)] bg-[var(--primary-light)] text-[var(--primary)]' : ''}`}>
        {copied ? <CheckIcon size={15} /> : <CopyIcon size={15} />}
      </button>

      <FeedbackButtons feedback={message.feedback} disabled={isRetrying} onRate={(rating) => onRate(message.id, rating)} />

      <button type="button" onClick={handleShare} title="Share" className={btn}>
        <ShareIcon size={15} />
      </button>

      <button type="button" disabled={isRetrying} onClick={() => onRetry(message.turn_id)} title="Regenerate" className={btn}>
        <RefreshIcon size={15} className="transition-transform duration-500 ease-out group-hover:rotate-180" />
      </button>
    </div>
  );
}

// ---------------- assistant message: answer + sources + actions ----------------
function AssistantEntry({ message, question, reveal, isRetrying, onRetry, onRate, onCopied, onShare, onOpenSource }) {
  const allLines = contentToLines(message.content);
  const lines = reveal ? revealLines(allLines, reveal.revealed) : allLines;
  const isTyping = Boolean(reveal) && !reveal.paused;
  const failed = message.status === 'failed';
  const settled = !failed && !reveal && !isRetrying;

  return (
    <>
      <div
        className={`rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-subtle)] px-5 py-4 text-[12.5px] leading-[1.5] text-[var(--text-secondary)] transition-opacity duration-300 ${
          isTyping || isRetrying ? 'ask-eka-streaming' : ''
        } ${isRetrying ? 'opacity-60' : ''}`}
      >
        {failed ? (
          <div className="flex items-center justify-between gap-3">
            <p className="m-0 flex items-center gap-2 font-semibold text-[var(--status-danger)]">
              <AlertIcon size={15} /> EKA couldn't produce an answer for this question.
            </p>
            <button
              type="button"
              disabled={isRetrying}
              onClick={() => onRetry(message.turn_id)}
              className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full bg-[var(--primary)] px-3.5 py-1.5 text-[12px] font-bold text-[var(--primary-contrast)] transition-all duration-200 hover:bg-[var(--primary-hover)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RefreshIcon size={13} className={isRetrying ? 'animate-spin' : ''} /> Retry
            </button>
          </div>
        ) : (
          <>
            {lines.length === 0 && (
              <p className="m-0 italic text-[var(--text-muted)]">Generation paused before any text was produced.</p>
            )}
            {lines.map((line, i) => (
              <p key={i} className="m-0 mb-1.5 last:mb-0">
                {line.map((seg, j) =>
                  seg.bold ? (
                    <strong key={j} className="font-bold text-[var(--text-primary)]">{seg.text}</strong>
                  ) : (
                    <span key={j}>{seg.text}</span>
                  )
                )}
                {isTyping && i === lines.length - 1 && <span className="ask-eka-cursor" />}
              </p>
            ))}
          </>
        )}
      </div>

      {/* sources show as soon as text starts; never on a failed answer */}
      {!failed && lines.length > 0 && (
        <CitationList citations={message.citations} onOpen={onOpenSource} showEmptyNote={settled} />
      )}

      {settled && (
        <ActionBar
          message={message}
          question={question}
          isRetrying={isRetrying}
          onRetry={onRetry}
          onRate={onRate}
          onCopied={onCopied}
          onShare={onShare}
        />
      )}
    </>
  );
}

// ---------------- one message ----------------
export default function ChatEntry({ message, ...rest }) {
  return message.role === 'user' ? (
    <UserEntry message={message} {...rest} />
  ) : (
    <AssistantEntry message={message} {...rest} />
  );
}