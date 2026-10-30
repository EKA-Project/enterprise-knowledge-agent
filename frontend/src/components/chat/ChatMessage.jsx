import { useState } from 'react';
import CitationPill from './CitationPill';
import {
  Check as CheckIcon,
  Copy as CopyIcon,
  Pencil as EditIcon,
  Play as PlayIcon,
  RefreshCw as RefreshIcon,
  Share2 as ShareIcon,
  Sparkles as SparkleIcon,
  ThumbsDown as ThumbDownIcon,
  ThumbsUp as ThumbUpIcon,
} from 'lucide-react';
import { MONO, SERIF, answerToLines, answerToPlainText, revealLines } from './ChatUtils';

// ---- "EKA is thinking" dots (Tailwind's built-in bounce, staggered) ----------
function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 py-1" aria-label="EKA is thinking">
      <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--primary)]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--primary)] [animation-delay:150ms]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--primary)] [animation-delay:300ms]" />
    </div>
  );
}

// ---- top-right status: typing pill / Resume / Grounded ------------------------
function StatusBadge({ status, onResume }) {
  const base = 'flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11.5px] font-semibold transition';

  if (status === 'generating') {
    return (
      <span className={`${base} ask-eka-typing-pill border-amber-200 bg-amber-50 text-amber-700`}>
        <SparkleIcon size={11} /> EKA is typing
        <span className="animate-pulse tracking-widest">...</span>
      </span>
    );
  }
  if (status === 'paused') {
    return (
      <button
        type="button"
        onClick={onResume}
        className={`${base} cursor-pointer border-[var(--badge-border)] bg-[var(--status-info-bg)] text-[var(--status-info)] hover:brightness-95`}
      >
        <PlayIcon size={11} /> Resume Generation
      </button>
    );
  }
  return (
    <span className={`${base} border-transparent bg-[var(--status-success-bg)] text-[var(--status-success)]`}>
      <CheckIcon size={12} /> Grounded
    </span>
  );
}

// ---- copy / vote / share / Canvas / regenerate --------------------------------
function ActionBar({ question, answer, onRegenerate, onCopied, onFeedback, onShare, onCanvas }) {
  const [copied, setCopied] = useState(false);
  const [vote, setVote] = useState(null); // 'up' | 'down' | null

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(answerToPlainText(answer));
    } catch {
      /* clipboard unavailable, ignore */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
    onCopied?.();
  }

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(`${question}\n\n${answerToPlainText(answer)}`);
    } catch {
      /* ignore */
    }
    onShare?.();
  }

  function handleVote(kind) {
    const next = vote === kind ? null : kind;
    setVote(next);
    if (next) onFeedback?.(next);
  }

  const btn =
  'group grid h-8 w-8 cursor-pointer place-items-center rounded-lg border border-transparent transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-105 hover:border-[var(--badge-border)] hover:bg-[var(--primary-light)] hover:text-[var(--primary)] active:translate-y-0 active:scale-95';

const voteBtn =
  'group grid h-8 w-8 cursor-pointer place-items-center rounded-lg border border-transparent transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-105 active:translate-y-0 active:scale-95';

const idle = 'text-[var(--text-muted)]';
const on = 'border-[var(--badge-border)] bg-[var(--primary-light)] text-[var(--primary)]';
const up =
  'scale-110 -translate-y-0.5 border-[#86efac] bg-[#dcfce7] text-[#166534] shadow-sm';

const down =
  'scale-110 -translate-y-0.5 border-[#fca5a5] bg-[#fee2e2] text-[#991b1b] shadow-sm';

  return (
    <div className="mt-3 flex items-center gap-1">
      <button type="button" onClick={handleCopy} title={copied ? 'Copied' : 'Copy'} className={`${btn} ${copied ? on : idle}`}>
        {copied ? <CheckIcon size={15} /> : <CopyIcon size={15} />}
      </button>
      <button
  type="button"
  onClick={() => handleVote('up')}
  title="Helpful"
  className={`${voteBtn} ${vote === 'up' ? up : `${idle} hover:border-[#86efac] hover:bg-[#dcfce7] hover:text-[#15803d]`}`}
>
  <ThumbUpIcon size={15} />
</button>
      <button
  type="button"
  onClick={() => handleVote('down')}
  title="Not helpful"
  className={`${voteBtn} ${vote === 'down' ? down : `${idle} hover:border-[#fca5a5] hover:bg-[#fee2e2] hover:text-[#b91c1c]`}`}
>
  <ThumbDownIcon size={15} />
</button>
      <button type="button" onClick={handleShare} title="Share" className={`${btn} ${idle}`}>
        <ShareIcon size={15} />
      </button>


      <button type="button" onClick={onRegenerate} title="Regenerate" className={`${btn} ${idle}`}>
        <RefreshIcon size={15} className="transition-transform duration-500 ease-out group-hover:rotate-180" />
      </button>
    </div>
  );
}

// ---- one full ledger entry (question + answer + sources) ----------------------
export default function ChatMessage({
  turn,
  entryNumber,
  onPause,
  onResume,
  onRegenerate,
  onEdit,
  onOpenSource,
  onCopied,
  onFeedback,
  onShare,
  onCanvas,
}) {
  const { id, question, answer, citation, status, thinking, revealed, when } = turn;
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(question);

  // Finished turns show everything; in-progress turns show only what's been revealed.
  const allLines = answerToLines(answer);
  const lines = status === 'done' ? allLines : revealLines(allLines, revealed);
  const showDots = status === 'generating' && thinking;
  const isStreaming = status === 'generating' && !thinking;

  function startEdit() {
    if (status === 'generating') onPause(id); // pause before editing
    setDraft(question);
    setEditing(true);
  }

  function cancelEdit() {
    setDraft(question);
    setEditing(false);
  }

  function saveEdit() {
    const next = draft.trim();
    setEditing(false);
    if (next && next !== question) onEdit(id, next); // regenerates the answer
  }

  return (
    <article className="ask-eka-rise flex gap-4">
      {/* timeline marker */}
      <div className="shrink-0 pt-7">
        <span className="block h-[18px] w-[18px] rounded-full border-2 border-[var(--primary)] bg-[var(--bg-surface)]" />
      </div>

{/* entry card */}
<div className="min-w-0 flex-1 rounded-[22px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-2.5 [box-shadow:var(--shadow-md)]">

  {/* Header */}
  <div className="mb-1 flex items-start justify-between gap-4">
    <p className={`${MONO} m-0 flex items-center gap-2 text-[11px] font-bold tracking-[0.08em] text-[var(--text-muted)]`}>
      <span className="rounded-md bg-[var(--primary-light)] px-2 py-0.5 text-[var(--primary)]">
        REQ {String(entryNumber).padStart(2, '0')}
      </span>
      <span>• {when}</span>
    </p>

    <div className="flex items-center gap-2">
      <StatusBadge status={status} onResume={() => onResume(id)} />
      {!editing && (
        <button
          type="button"
          onClick={startEdit}
          className={`${MONO} flex cursor-pointer items-center gap-1.5 rounded-md border border-[var(--border-subtle)] px-2.5 py-1 text-[10px] font-semibold text-[var(--text-muted)] transition hover:bg-[var(--bg-surface-subtle)] hover:text-[var(--text-primary)]`}
        >
          <EditIcon size={12} /> Edit
        </button>
      )}
    </div>
  </div>
        {/* question (or inline editor) */}
        {editing ? (
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
                if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); saveEdit(); }
                if (e.key === 'Escape') cancelEdit();
              }}
              className={`${SERIF} w-full resize-none rounded-xl border border-[var(--primary)] bg-[var(--bg-surface)] px-3.5 py-2.5 text-[18px] font-semibold italic leading-snug text-[var(--text-primary)] outline-none focus:[box-shadow:0_0_0_3px_var(--primary-glow)]`}
            />

            <div className="mt-3 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={cancelEdit}
                className="cursor-pointer rounded-full border border-[var(--border-medium)] bg-[var(--bg-surface)] px-3.5 py-1.5 text-[12px] font-semibold text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-surface-subtle)]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveEdit}
                disabled={!draft.trim()}
                className="cursor-pointer rounded-full bg-[var(--primary)] px-3.5 py-1.5 text-[12px] font-bold text-[var(--primary-contrast)] transition-colors hover:bg-[var(--primary-hover)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Save &amp; Regenerate
              </button>
            </div>
          </div>
        ) : (
          <h3 className={`${SERIF} m-0 mb-4 text-[26px] font-semibold italic leading-tight text-[var(--text-primary)]`}>
            “{question}”
          </h3>
        )}

        {/* answer box, filled progressively (green glow line while generating) */}
        <div
          className={`rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-subtle)] px-4 py-3 text-[12.5px] leading-[1.5] text-[var(--text-secondary)] ${
            status === 'generating' ? 'ask-eka-streaming' : ''
          }`}
        >
          {showDots && <TypingDots />}
          {!showDots && lines.length === 0 && (
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
              {isStreaming && i === lines.length - 1 && <span className="ask-eka-cursor" />}
            </p>
          ))}
        </div>

        {/* sources appear as soon as text starts; actions only when finished */}
        {!showDots && (
          <div className="mt-4 flex flex-wrap gap-3">
            {citation.map((c) => (
              <CitationPill key={c.title} {...c} onOpen={onOpenSource} />
            ))}
          </div>
        )}
        {status === 'done' && (
          <ActionBar
            question={question}
            answer={answer}
            onRegenerate={() => onRegenerate(id)}
            onCopied={onCopied}
            onFeedback={onFeedback}
            onShare={onShare}
            onCanvas={onCanvas}
          />
        )}
      </div>
    </article>
  );
}