// Single-select segmented track: one pill highlights the active option.
// Same API shape as FilterPills (options, value, onChange, label) but without counts.
// options = [{ id, label }]
export default function SegmentedControl({ options, value, onChange, label }) {
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex rounded-full border border-(--border-subtle) bg-(--bg-surface-subtle) p-0.5"
    >
      {options.map(({ id, label: text }) => {
        const on = value === id;
        return (
          <button
            key={id}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(id)}
            className={`rounded-full px-3 py-1 text-[11.5px] font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus) ${
              on
                ? "bg-(--primary) text-(--primary-contrast) shadow-(--shadow-sm)"
                : "text-(--text-muted) hover:text-(--primary)"
            }`}
          >
            {text}
          </button>
        );
      })}
    </div>
  );
}