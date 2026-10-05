// ChatInput — fixed bottom input box. Controlled component: parent owns the
// value/onChange/onSend handlers, this just renders the UI shell.
export default function ChatInput({ value, onChange, onSend, requestNumber }) {
  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSend();
    }
  }
  return (
    <div
      className="fixed bottom-6 left-[280px] right-8 rounded-2xl px-5 py-4
                 bg-[var(--bg-surface)] border border-[var(--border-subtle)]
                 shadow-[var(--shadow-lg)]"
    >
      {/* floating "NEW ENTRY" tag */}
      <span
        className="absolute -top-3 left-5 px-2.5 py-0.5 rounded-full text-[10px] font-bold
                   bg-[var(--sidebar-bg)] text-[var(--sidebar-text)]"
      >
        📄 NEW ENTRY
      </span>

      {/* entry / request number row — uses mono font via scoped CSS class below */}
      <div className="ask-eka-mono flex justify-between mb-2 text-[10.5px] font-bold
                       tracking-wide text-[var(--text-muted)]">
        <span>ENTRY {String(requestNumber).padStart(2, '0')}</span>
        <span>REQ · {String(requestNumber).padStart(3, '0')}</span>
      </div>

      {/* input field row */}
      <div className="flex items-center gap-2.5 mb-2.5">
        <span className="font-bold text-sm text-[var(--primary)]">Q.</span>
        <input
          type="text"
          placeholder="Type your question..."
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          className="flex-1 border-none outline-none bg-transparent text-[15px]
                     text-[var(--text-primary)]"
        />
      </div>

      {/* footer: hint text + send / log entry buttons */}
      <div className="flex items-center justify-between pt-2.5 border-t border-[var(--border-subtle)]">
        <p className="m-0 text-[11.5px] text-[var(--text-muted)]">
          Every answer is checked against uploaded documents.
        </p>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onSend}
            className="px-2.5 py-1.5 rounded-lg text-[11.5px] font-semibold cursor-pointer
                       bg-[var(--bg-surface)] border border-[var(--border-subtle)]
                       text-[var(--text-secondary)] hover:bg-[var(--bg-surface-subtle)]"
          >
            ⏎ send
          </button>
          <button
            onClick={onSend}
            className="px-4 py-2 rounded-full border-none text-[12.5px] font-bold cursor-pointer
                       bg-[var(--primary)] text-[var(--primary-contrast)]
                       hover:bg-[var(--primary-hover)]"
          >
            Log entry <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}