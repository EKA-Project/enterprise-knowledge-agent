// One horizontal bar split into coloured segments. Hovering a segment dims the others.
export default function KnowledgeGapProgressBar({ segments, activeId = null, onHover }) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
// Render the progress bar with segments, hover effects, and accessibility features
  return (
    <div className="flex h-3.5 w-full gap-0.5 overflow-hidden rounded-full" role="group" aria-label="Distribution">
      {segments.map((seg, i) => (
        <button
          key={seg.id}
          type="button"
          aria-label={`${seg.label}: ${seg.value}`}
          onMouseEnter={() => onHover?.(seg.id)}
          onMouseLeave={() => onHover?.(null)}
          onFocus={() => onHover?.(seg.id)}
          onBlur={() => onHover?.(null)}
          className="anl-grow-x h-full transition-opacity duration-200"
          style={{
            width: `${(seg.value / total) * 100}%`,
            backgroundColor: seg.color,
            opacity: activeId && activeId !== seg.id ? 0.3 : 1,
            animationDelay: `${i * 90}ms`,
          }}
        />
      ))}
    </div>
  );
}