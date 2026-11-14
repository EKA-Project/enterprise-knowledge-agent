import { CornerDownLeft } from 'lucide-react';
import { ArrowRightIcon, FileIcon, FlaskIcon, StopIcon } from './ChatIcons';
import { MONO, SERIF } from './ChatUtils';

// Holds nothing but display: the typed text lives in the page, and it never calls the API.
export default function ChatInputBox({
  value, onChange, onSend, entryNumber, isBusy, onStop, deepResearch, onToggleDeepResearch,
}) {
  const req = String(entryNumber).padStart(2, '0');

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  }

  return (
    <div className="flex gap-3">
      {/* timeline marker */}
      <div className="shrink-0 pt-8">
        <span className="block h-[18px] w-[18px] rounded-full border-2 border-[var(--primary)] bg-[var(--bg-surface)]" />
      </div>

      <div className="relative min-w-0 flex-1 rounded-[22px] border-2 border-[var(--border-focus)] bg-[var(--bg-surface)] px-4 pb-2 pt-3 transition [box-shadow:var(--shadow-lg)] focus-within:border-[var(--primary)] focus-within:[box-shadow:var(--shadow-lg),0_0_0_3px_var(--primary-glow)]">
        <span className={`${MONO} absolute -top-3 left-5 inline-flex items-center gap-1.5 rounded-full bg-[var(--primary)] px-2.5 py-1 text-[10px] font-bold tracking-[0.08em] text-[var(--primary-contrast)]`}>
          <FileIcon size={11} /> NEW ENTRY
        </span>

        <div className="mb-1 flex items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-1">
            <span className={`${MONO} text-[10px] font-bold tracking-[0.1em] text-[var(--border-focus)]`}>REQ {req}</span>
        </div>

        <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] pb-2">
          <span className={`${SERIF} text-[15px] font-semibold italic text-[var(--text-muted)]`}>Q.</span>
          {isBusy ? (
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

        <div className="mt-2.5 flex items-center justify-between gap-3">
          {isBusy ? (
            <p className={`${MONO} m-0 flex items-center gap-2 text-[10.5px] text-[var(--text-muted)]`}>
              <span className="ask-eka-blink h-1.5 w-1.5 rounded-full bg-[var(--accent-orange-deep)]" />
              EKA is generating...
            </p>
          ) : (
            <p className="m-0 text-[11.5px] text-[var(--text-muted)]">Every answer is checked against uploaded documents.</p>
          )}

          {isBusy ? (
            <button
              type="button"
              onClick={onStop}
              aria-label="Stop generation"
              title="Stop generation"
              className="ask-eka-stop grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-[var(--accent-orange)] text-[var(--accent-orange-ink)] shadow-md transition hover:scale-105 active:scale-95"
            >
              <StopIcon size={12} />
            </button>
          ) : (
            <div className="flex items-center gap-2.5">
              
              <button
                type="button"
                onClick={onSend}
                disabled={!value.trim()}
                className="flex cursor-pointer items-center gap-2 rounded-full bg-[var(--primary)] px-2.5 py-1 text-[10px] font-bold text-[var(--primary-contrast)] transition hover:bg-[var(--primary-deep)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
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