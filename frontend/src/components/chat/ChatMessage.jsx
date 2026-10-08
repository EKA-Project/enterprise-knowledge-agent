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
