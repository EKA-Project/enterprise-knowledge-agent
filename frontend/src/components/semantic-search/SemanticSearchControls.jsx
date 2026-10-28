import { Search, X } from "lucide-react";
const MODE_EMOJIS = { semantic: "✨", keyword: "🎯", hybrid: "⚡" };
// ↑ Same icons as the reference: star, target and lightning.
const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus)";

const segment = (active) =>
  `inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-semibold transition-all duration-200 ${focusRing} ${
    active
      ? "bg-[#244B70] text-white shadow-sm"
      : "bg-transparent text-[#536579] hover:bg-[#DCEAF5] hover:text-[#244B70]"
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
    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-semibold transition-all duration-200 ${focusRing} ${
      source === s.id
        ? "border-[#244B70] bg-[#244B70] text-white shadow-sm"
        : "border-[#C2D9EC] bg-[#E5F0FA] text-[#244B70] hover:border-[#8FB6D8] hover:bg-[#D0E4F5] hover:text-[#173B5C]"
    }`}
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
            className={`inline-flex items-center gap-1.5 rounded-full border border-[#C2D9EC] bg-[#E5F0FA] px-3 py-1.5 text-[11.5px] font-semibold text-[#244B70] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#8FB6D8] hover:bg-[#D0E4F5] hover:text-[#173B5C] ${focusRing}`}>     
            <Search size={11} aria-hidden="true"/>
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
// ↑ Display only. All state lives in SemanticSearchPage.