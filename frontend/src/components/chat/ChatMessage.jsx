import { useState } from 'react';
import CitationPill from './CitationPill';
import {
  CheckIcon, CopyIcon, EditIcon, PauseIcon, PlayIcon,
  RefreshIcon, ShareIcon, ThumbDownIcon, ThumbUpIcon,
} from './ChatIcons';
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

// ---- top-right status: Pause / Resume / Grounded ------------------------------
function StatusBadge({ status, onPause, onResume }) {
  const base = 'flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11.5px] font-semibold transition';

  if (status === 'generating') {
    return (
      <button onClick={onPause} className={`${base} border-amber-300 bg-amber-50 text-amber-600 hover:bg-amber-100`}>
        <PauseIcon size={11} /> Pause Generation
      </button>
    );
  }
  if (status === 'paused') {
    return (
      <button
        onClick={onResume}
        className={`${base} border-[var(--badge-border)] bg-[var(--status-info-bg)] text-[var(--status-info)] hover:brightness-95`}
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

// ---- copy / vote / share / regenerate (no Canvas) -----------------------------
function ActionBar({ answer, onRegenerate }) {
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
  }

  const btn = 'grid h-8 w-8 place-items-center rounded-lg transition hover:bg-[var(--bg-surface-subtle)]';
  const idle = 'text-[var(--text-muted)] hover:text-[var(--text-primary)]';
  const on = 'text-[var(--primary)]';

  return (
    <div className="mt-3 flex items-center gap-1">
      <button onClick={handleCopy} title={copied ? 'Copied' : 'Copy'} className={`${btn} ${copied ? on : idle}`}>
        {copied ? <CheckIcon size={15} /> : <CopyIcon size={15} />}
      </button>
      <button onClick={() => setVote(vote === 'up' ? null : 'up')} title="Helpful" className={`${btn} ${vote === 'up' ? on : idle}`}>
        <ThumbUpIcon size={15} />
      </button>
      <button onClick={() => setVote(vote === 'down' ? null : 'down')} title="Not helpful" className={`${btn} ${vote === 'down' ? on : idle}`}>
        <ThumbDownIcon size={15} />
      </button>
      <button title="Share" className={`${btn} ${idle}`}>
        <ShareIcon size={15} />
      </button>
      <button onClick={onRegenerate} title="Regenerate" className={`${btn} ${idle}`}>
        <RefreshIcon size={15} />
      </button>
    </div>
  );
}

// ---- one full ledger entry (question + answer + sources) ----------------------
export default function ChatMessage({ turn, entryNumber, onPause, onResume, onRegenerate, onEdit }) {
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
      <div className="min-w-0 flex-1 rounded-[22px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-5 py-3 [box-shadow:var(--shadow-md)]">
        <div className="mb-0 flex items-start justify-between gap-4">
          <p className={`${MONO} m-0 text-[11px] font-bold tracking-[0.1em] uppercase text-[var(--text-muted)]`}>
            <span className="text-[var(--primary)]">ENTRY {String(entryNumber).padStart(2, '0')}</span> · {when}
          </p>

          <div className="flex items-center gap-2">
            <StatusBadge status={status} onPause={() => onPause(id)} onResume={() => onResume(id)} />
            {!editing && (
              <button
                onClick={startEdit}
                className={`${MONO} flex items-center gap-1.5 rounded-md border border-[var(--border-subtle)] px-2.5 py-1 text-[10px] font-semibold text-[var(--text-muted)] transition hover:bg-[var(--bg-surface-subtle)] hover:text-[var(--text-primary)]`}
              >
                <EditIcon size={12} /> Edit
              </button>
            )}
          </div>
        </div>

        {/* question (or inline editor) */}
        {editing ? (
          <div className="mb-4 flex items-center gap-2">
            <input
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') saveEdit();
                if (e.key === 'Escape') setEditing(false);
              }}
              className={`${SERIF} min-w-0 flex-1 rounded-lg border border-[var(--primary)] bg-transparent px-3 py-2 text-[20px] font-semibold italic text-[var(--text-primary)] outline-none`}
            />
            <button onClick={saveEdit} className="rounded-full bg-[var(--primary)] px-3.5 py-1.5 text-[12px] font-bold text-[var(--primary-contrast)]">
              Save
            </button>
            <button onClick={() => setEditing(false)} className="rounded-full border border-[var(--border-subtle)] px-3.5 py-1.5 text-[12px] font-semibold text-[var(--text-secondary)]">
              Cancel
            </button>
          </div>
        ) : (
          <h3 className={`${SERIF} m-0 mb-2 text-[20px] font-semibold italic leading-tight text-[var(--text-primary)]`}>
            “{question}”
          </h3>
        )}

        {/* answer box, filled progressively */}
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-subtle)] px-5 py-4 text-[12.5px] leading-[1.5] text-[var(--text-secondary)]">
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
              <CitationPill key={c.title} title={c.title} meta={c.meta} />
            ))}
          </div>
        )}
        {status === 'done' && <ActionBar answer={answer} onRegenerate={() => onRegenerate(id)} />}
      </div>
    </article>
  );
}