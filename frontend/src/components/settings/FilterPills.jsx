// Row of filter pills with an optional icon and a count: "All Atmospheres (25)".
// options = [{ id, label, count, icon }]
export default function FilterPills({ options, value, onChange, label }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map(({ id, label: text, count, icon: Icon }) => {
        const on = value === id;
        return (
          <button
            key={id}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(id)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-semibold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus) active:scale-95 ${
              on
                ? "border-(--primary) bg-(--primary) text-(--primary-contrast)"
                : "border-(--border-medium) bg-(--bg-surface) text-(--text-primary) hover:border-(--primary) hover:text-(--primary)"
            }`}
          >
            {Icon && <Icon size={14} aria-hidden="true" />}
            {text}
            <span className="font-mono text-[11px] opacity-70">({count})</span>
          </button>
        );
      })}
    </div>
  );
}