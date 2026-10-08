import { ArrowRightIcon, EnterIcon, FileIcon, PauseIcon } from './ChatIcons';
import { MONO, SERIF } from './ChatUtils';

export default function ChatInput({ value, onChange, onSend, entryNumber, isGenerating, onPause }) {
  const entry = String(entryNumber).padStart(2, '0');
  const req = String(entryNumber).padStart(3, '0');

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

      <div
        className="relative min-w-0 flex-1 rounded-[22px] border border-[var(--border-medium)] bg-[var(--bg-surface)] px-4 pb-2 pt-3 transition [box-shadow:var(--shadow-lg)] focus-within:border-[var(--primary)] focus-within:[box-shadow:var(--shadow-lg),0_0_0_3px_var(--primary-glow)]"
      >
        {/* NEW ENTRY pill */}
        <span className={`${MONO} absolute -top-3 left-5 inline-flex items-center gap-1.5 rounded-full bg-[var(--primary)] px-2.5 py-1 text-[10px] font-bold tracking-[0.08em] text-[var(--primary-contrast)]`}>
          <FileIcon size={11} /> NEW ENTRY
        </span>

        {/* ENTRY / REQ numbers */}
        <div className={`${MONO} mb-2 flex items-center gap-3 text-[9px] font-bold tracking-[0.1em] text-[var(--text-muted)]`}>
          <span className="text-[var(--primary)]">ENTRY {entry}</span>
          <span className="h-3 w-px bg-[var(--border-medium)]" />
          <span>REQ · {req}</span>
        </div>

        {/* question line */}
        <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] pb-3">
          <span className={`${SERIF} text-[17px] font-semibold italic text-[var(--text-muted)]`}>Q.</span>
          {isGenerating ? (
            <p className="m-0 text-[15px] text-[var(--text-muted)]">
              EKA is answering... Click Pause to stop &amp; type again.
            </p>
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
            <p className="m-0 flex items-center gap-1.5 text-[11.5px] font-semibold text-amber-600">
              <PauseIcon size={11} /> EKA is answering... Click Pause to stop &amp; type again.
            </p>
          ) : (
            <p className="m-0 text-[11.5px] text-[var(--text-muted)]">
              Every answer is checked against uploaded documents.
            </p>
          )}

          {isGenerating ? (
            <button
              onClick={onPause}
              className="flex animate-pulse items-center gap-2 rounded-full bg-amber-500 px-4 py-2 text-[12.5px] font-bold text-white transition hover:bg-amber-600 active:scale-95"
            >
              <PauseIcon size={12} /> Pause Generation
            </button>
          ) : (
            <div className="flex items-center gap-2.5">
              <button
                onClick={onSend}
                className={`${MONO} flex items-center gap-1.5 rounded-md border border-[var(--border-subtle)] px-2 py-1 text-[11px] text-[var(--text-muted)] transition hover:bg-[var(--bg-surface-subtle)]`}
              >
                <EnterIcon size={11} /> send
              </button>
              <button
                onClick={onSend}
                disabled={!value.trim()}
                className="flex items-center gap-2 rounded-full bg-[var(--primary)] px-4 py-2 text-[12.5px] font-bold text-[var(--primary-contrast)] transition hover:bg-[var(--primary-hover)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ArrowRightIcon size={13} /> Log entry
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}