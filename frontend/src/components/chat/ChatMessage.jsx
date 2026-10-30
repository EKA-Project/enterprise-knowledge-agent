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
