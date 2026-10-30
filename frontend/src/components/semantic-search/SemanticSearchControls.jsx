import { Search, X, Sparkle, CornerDownLeft } from "lucide-react";
const MODE_EMOJIS = { semantic: "✨", keyword: "🎯", hybrid: "⚡" };
const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus)";

const segment = (active) =>
      `inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11.5px] font-bold transition-all duration-200 ${focusRing} ${
      active
      ? "bg-(--primary) text-white shadow-sm"
      : "bg-transparent text-(--text-muted) hover:bg-(--primary-light) hover:text-(--primary)"
  }`;


export default function SemanticSearchControls({
  value,
  onChange,
  onSubmit,
  onClear,
  inputRef,
  modes,
  mode,
  onModeChange,
  sources,
  source,
  onSourceChange,
  suggestionLabel,
  suggestions,
  onPickSuggestion,
  onExpand,
  onSettings,
  onVoice,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="ssp-rise rounded-3xl border border-(--border-medium) bg-(--bg-surface) p-5 shadow-(--shadow-sm)">      {/* ---------- Search bar ---------- */}
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <div className="group flex flex-1 items-center gap-2 rounded-full border border-(--badge-border) bg-(--bg-surface-subtle) py-1.5 pl-3 pr-2 transition focus-within:border-(--accent-highlight) focus-within:shadow-[0_0_0_3px_rgba(56,189,248,0.25)]">
          <Search size={20} strokeWidth={2.2} className="shrink-0 text-(--primary)" aria-hidden="true" />

          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search enterprise knowledge (e.g. 'time off work', 'working from home', 'health benefits')..."
            aria-label="Search query"
            className="w-full bg-transparent text-[14px] text-(--text-primary) outline-none placeholder:text-(--text-muted)"
          />

          {/* "/" hint: hidden while the input is focused */}
          

          {value && (
            <button
              type="button"
              onClick={onClear}
              aria-label="Clear search"
              className={`rounded-full p-1 text-(--text-muted) transition hover:text-(--text-primary) ${focusRing}`}
            >
              <X size={15} />
            </button>
          )}

          <button
            type="submit"
            className={`inline-flex items-center gap-1.5 rounded-full bg-[linear-gradient(135deg,var(--primary-deep),var(--primary)_55%,var(--accent-highlight))] px-3.5 py-2 text-[12px] font-bold text-white shadow-sm transition hover:brightness-110 active:scale-95 ${focusRing}`}
          >
            <Sparkle size={13} fill="currentColor" className="text-sky-200" aria-hidden="true" />
            Search
            <span className="grid size-5 place-items-center rounded bg-white/25" aria-hidden="true">
              <CornerDownLeft size={11} />
            </span>
          </button>
        </div>
      </form>

      {/* ---------- Mode / Expand with AI / Sources ---------- */}
        <div className="mt-3 flex items-center gap-2">
          <div
          role="group"
          aria-label="Search mode"
          className="inline-flex w-fit items-center gap-0.5 rounded-full border border-(--border-subtle-nav) bg-(--bg-surface-subtle) p-0.5"
        >
          {modes.map((m) => (
            <button
              key={m.id}
              type="button"
              aria-pressed={mode === m.id}
              onClick={() => onModeChange(m.id)}
              className={segment(mode === m.id)}
            >
              <span aria-hidden="true" className="text-[12px] leading-none">{MODE_EMOJIS[m.id]}</span>
              {m.label}
            </button>
          ))}
        </div>


          <div className="ml-auto inline-flex items-center gap-2">  
            <span className="font-(family-name:--font-mono) text-[10px] font-semibold uppercase tracking-[0.14em] text-(--text-muted)">
            Sources:
          </span>
          <div role="group" aria-label="Source filter" className="inline-flex items-center gap-1.5">
            {sources.map((s) => (
              <button
                key={s.id}
                type="button"
                aria-pressed={source === s.id}
                onClick={() => onSourceChange(s.id)}
                className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11.5px] font-bold transition-all duration-200 ${focusRing} ${
                    source === s.id
                    ? "border-(--primary) bg-(--primary) text-white shadow-sm"
                    : "border-(--border-medium) bg-(--primary-light) text-(--text-muted) hover:border-(--primary) hover:text-(--primary)"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- Suggestions ---------- */}
        <div className="mt-3 flex flex-nowrap items-center gap-1.5 overflow-x-auto whitespace-nowrap border-t border-dashed border-(--border-medium) pt-3">
          <span className="font-(family-name:--font-mono) text-[10px] font-semibold uppercase tracking-[0.14em] text-(--text-muted)">
          {suggestionLabel}:
        </span>
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onPickSuggestion(s)}
            className={`inline-flex items-center gap-1.5 rounded-full border border-(--border-medium) bg-(--primary-light) px-2 py-1.5 text-[11.5px] font-semibold text-(--accent-chip-text) transition-all duration-200 hover:-translate-y-0.5 hover:border-(--primary) hover:bg-(--bg-surface-subtle) ${focusRing}`}
          >
            <span aria-hidden="true" className="text-[11px] leading-none">{MODE_EMOJIS[mode] || "✨"}</span>
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}