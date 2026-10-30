import {
  ArrowRight as ArrowRightIcon,
  CornerDownLeft as EnterIcon,
  FileText as FileIcon,
  FlaskConical as FlaskIcon,
  Square as StopIcon,
} from 'lucide-react';
import { MONO, SERIF } from './ChatUtils';

export default function ChatInput({
  value,
  onChange,
  onSend,
  entryNumber,
  isGenerating,
  onPause,
  deepResearch,
  onToggleDeepResearch,
}) {
  const req = String(entryNumber).padStart(2, '0');

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  }

  return (
    <div className="flex gap-4">
      {/* timeline marker */}
      <div className="shrink-0 pt-8">
        <span className="block h-[18px] w-[18px] rounded-full border-2 border-[var(--primary)] bg-[var(--bg-surface)]" />
      </div>

<div className="relative min-w-0 flex-1 rounded-[22px] border border-[var(--border-medium)] bg-[var(--bg-surface)] px-3 pb-1.5 pt-2 transition [box-shadow:var(--shadow-lg)] focus-within:border-[var(--primary)] focus-within:[box-shadow:var(--shadow-lg),0_0_0_3px_var(--primary-glow)]">
          {/* NEW ENTRY pill */}
        <span className={`${MONO} absolute -top-3 left-5 inline-flex items-center gap-1.5 rounded-full bg-[var(--primary)] px-2.5 py-1 text-[10px] font-bold tracking-[0.08em] text-[var(--primary-contrast)]`}>
          <FileIcon size={10} /> NEW ENTRY
        </span>

        {/* REQ number (left) + Autonomous Deep Research chip (right) */}
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pt-1.5 pb-1 mb-2">
          <span className={`${MONO} text-[10px] font-bold tracking-[0.1em] text-[var(--text-muted)]`}>REQ {req}</span>
        </div>

        {/* question line */}
<div className="flex w-full items-center gap-3 border-b border-[var(--border-subtle)] pb-2">
            <span className={`${SERIF} text-[17px] font-semibold italic text-[var(--text-muted)]`}>Q.</span>
          {isGenerating ? (
            <p className="m-0 text-[13px] text-[var(--text-muted)]">EKA is answering...</p>
          ) : (
            <input
              type="text"
              value={value}
              onChange={onChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask about remote policies, failover SLA, SOC 2 compliance..."
              className="min-w-0 flex-1 border-none bg-transparent text-[13px] text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
            />
          )}
        </div>

        {/* footer */}
        <div className="mt-2.5 flex items-center justify-between gap-3">
          {isGenerating ? (
            <p className={`${MONO} m-0 flex items-center gap-2 text-[10.5px] text-[var(--text-muted)]`}>
              <span className="ask-eka-blink h-1.5 w-1.5 rounded-full bg-[#f97316]" />
              EKA is generating...
            </p>
          ) : (
            <p className="m-0 text-[11.5px] text-[var(--text-muted)]">
              Every answer is checked against uploaded documents.
            </p>
          )}

          {isGenerating ? (
            <button
              type="button"
              onClick={onPause}
              aria-label="Stop generation"
              title="Stop generation"
              className="ask-eka-stop grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-[#fb923c] text-[#3b1d06] shadow-md transition hover:scale-105 active:scale-95"
            >
              <StopIcon size={12} />
            </button>
          ) : (
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onSend}
                className={`${MONO} flex cursor-pointer items-center gap-1.5 rounded-md border border-[var(--border-subtle)] px-2 py-1 text-[11px] text-[var(--text-muted)] transition hover:bg-[var(--bg-surface-subtle)]`}
              >
                <EnterIcon size={11} /> send
              </button>
              <button
                type="button"
                onClick={onSend}
                disabled={!value.trim()}
                className="flex cursor-pointer items-center gap-2 rounded-full bg-[var(--primary)] px-3 py-2 text-[12.5px] font-bold text-[var(--primary-contrast)] transition hover:bg-[var(--primary-hover)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ArrowRightIcon size={12} /> Log entry
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}