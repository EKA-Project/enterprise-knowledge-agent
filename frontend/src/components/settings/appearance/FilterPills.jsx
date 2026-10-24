// Row of filter pills with an optional icon and a count: "All Atmospheres (25)".
// options = [{ id, label, count, icon }]
export default function FilterPills({ options, value, onChange, label }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-1.5">
      {options.map(({ id, label: text, count, icon: Icon }) => {
        const on = value === id;
        return (
          <button
            key={id}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(id)}
            className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus) active:scale-95 ${
              on
                ? "border-(--primary) bg-(--bg-surface) text-(--primary)"
                : `border-(--border-medium) bg-transparent text-(--text-primary) hover:text-(--primary) ${
                    count === 0 ? "opacity-50" : ""
                  }`
            }`}
          >
            {Icon && <Icon size={12} aria-hidden="true" />}
            {text}
            <span className="font-mono text-[10px] opacity-70">({count})</span>
          </button>
        );
      })}
    </div>
  );
}
