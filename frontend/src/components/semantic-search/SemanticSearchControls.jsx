import { Search, X } from "lucide-react";
const MODE_EMOJIS = { semantic: "✨", keyword: "🎯", hybrid: "⚡" };
// ↑ Same icons as the reference: star, target and lightning.
const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus)";

const segment = (active) =>
  `inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold transition ${focusRing} ${
    active
      ? "bg-(--primary) text-(--primary-contrast) shadow-sm"
      : "text-(--text-muted) hover:bg-(--primary-light) hover:text-(--primary)"
  }`;

export default function SemanticSearchControls({
  value, onChange, onSubmit, onClear,
  modes, mode, onModeChange,
  sources, source, onSourceChange,
  suggestionLabel, suggestions, onPickSuggestion,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };
  // ↑ Enter in the input and the Search button both land here.

  return (
    <div className="ssp-rise rounded-2xl border border-(--border-medium) bg-(--bg-surface) p-5 shadow-(--shadow-sm)">
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
      <div className="flex flex-1 items-center gap-3 rounded-xl border border-(--badge-border) bg-(--primary-light) px-4 py-3 transition focus-within:border-(--border-focus)">          <Search size={17} className="shrink-0 text-(--text-primary)" aria-hidden="true" />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Describe what you need, in your own words..."
            aria-label="Search query"
            className="w-full bg-transparent text-[14px] text-(--text-primary) outline-none placeholder:text-(--text-muted)"
          />
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
        </div>

        <button
          type="submit"
          className={`inline-flex items-center gap-2 rounded-xl bg-(--primary) px-6 py-3 text-[13px] font-bold text-(--primary-contrast) transition hover:bg-(--primary-hover) active:scale-95 ${focusRing}`}
        >
          Search <span aria-hidden="true">→</span>
        </button>
      </form>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <div
          role="group"
          aria-label="Search mode"
          className="inline-flex items-center gap-0.5 rounded-full border border-(--border-subtle-nav) bg-(--bg-surface-subtle) p-0.5"
        >
       {modes.map((m) => (
          <button
            key={m.id}
            type="button"
            aria-pressed={mode === m.id}
            onClick={() => onModeChange(m.id)}
            className={segment(mode === m.id)}
          >
          <span aria-hidden="true" className="text-[12px] leading-none">
            {MODE_EMOJIS[m.id]}
          </span>
        {m.label}
        </button>
      ))}
        </div>

        <div className="inline-flex items-center gap-2">
          <span className="font-(family-name:--font-mono) text-[10px] uppercase tracking-[0.14em] text-(--text-muted)">
            Sources:
          </span>
          <div role="group" aria-label="Source filter" className="inline-flex items-center gap-1.5">
            {sources.map((s) => (
              <button
                key={s.id}
                type="button"
                aria-pressed={source === s.id}
                onClick={() => onSourceChange(s.id)}
                className={`${segment(source === s.id)} border border-(--border-subtle)`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-dashed border-(--border-medium) pt-4">
        <span className="font-(family-name:--font-mono) text-[10px] uppercase tracking-[0.14em] text-(--text-muted)">
          {suggestionLabel}:
        </span>
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onPickSuggestion(s)}
            className={`inline-flex items-center gap-1.5 rounded-full border border-(--border-medium) bg-(--bg-surface) px-3 py-1 text-[11.5px] font-semibold text-(--text-primary) transition hover:-translate-y-0.5 hover:border-(--primary) hover:text-(--primary) ${focusRing}`}
          >
            <Search size={11} aria-hidden="true" />
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
// ↑ Display only. All state lives in SemanticSearchPage.