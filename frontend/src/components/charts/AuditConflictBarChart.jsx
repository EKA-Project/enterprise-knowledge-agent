// Vertical bar chart. The last bar is dark, a hovered bar turns blue.
export default function AuditConflictBarChart({ data, activeIndex = null, onHover, height = 150 }) {
  const max = Math.max(...data.map((d) => d.value));
  const lastIndex = data.length - 1;
// Render the bar chart with bars, hover effects, and labels
  return (
    <div>
      <div className="flex items-end gap-3" style={{ height }}>
        {data.map((d, i) => {
          const color =
            activeIndex === i ? "bg-(--primary)" : i === lastIndex ? "bg-(--text-primary)" : "bg-(--border-medium)";
          return (
            <button
              key={d.label}
              type="button"
              aria-label={`${d.label}: ${d.value}`}
              onMouseEnter={() => onHover?.(i)}
              onMouseLeave={() => onHover?.(null)}
              onFocus={() => onHover?.(i)}
              onBlur={() => onHover?.(null)}
              className="flex h-full flex-1 flex-col items-center justify-end gap-1.5 focus-visible:outline-2 focus-visible:outline-(--border-focus)"
            >
              <span className="font-(family-name:--font-mono) text-[10.5px] font-semibold text-(--text-secondary)">
                {d.value}
              </span>
              <span
                className={`anl-grow w-full max-w-9 rounded-t-md transition-colors duration-200 ${color}`}
                style={{ height: `${(d.value / max) * 78}%`, animationDelay: `${i * 70}ms` }}
              />
            </button>
          );
        })}
      </div>

      <div className="mt-2 flex gap-3 border-t border-(--border-subtle) pt-2">
        {data.map((d, i) => (
          <span
            key={d.label}
            className={`flex-1 text-center font-(family-name:--font-mono) text-[10px] ${
              i === lastIndex ? "font-bold text-(--text-primary)" : "text-(--text-muted)"
            }`}
          >
            {d.label}
          </span>
        ))}
      </div>
    </div>
  );
}