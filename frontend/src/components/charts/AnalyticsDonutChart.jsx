// Donut chart. Children are shown in the centre. Hovering a segment enlarges it and dims the rest.
export default function AnalyticsDonutChart({ segments, activeId = null, onHover, size = 150, thickness = 14, children }) {
  const R = 48;
  const C = 2 * Math.PI * R;
  const GAP = 1.5;
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  let offset = 0;

  // Render the donut chart with segments, hover effects, and center content
  return (
    <div className="anl-donut relative shrink-0" style={{ width: size, height: size }}>
      <svg viewBox="0 0 120 120" width={size} height={size} role="img" aria-label="Donut chart">
        <g transform="rotate(-90 60 60)">
          <circle cx="60" cy="60" r={R} fill="none" strokeWidth={thickness} style={{ stroke: "var(--border-subtle)" }} />
          {segments.map((seg) => {
            const len = (seg.value / total) * C;
            const dash = Math.max(len - GAP, 0);
            const start = offset;
            offset += len;
            const active = activeId === seg.id;
            const dimmed = activeId && !active;
            return (
              <circle
                key={seg.id}
                cx="60"
                cy="60"
                r={R}
                fill="none"
                strokeWidth={active ? thickness + 3 : thickness}
                strokeDasharray={`${dash} ${C - dash}`}
                strokeDashoffset={-start}
                style={{ stroke: seg.color, opacity: dimmed ? 0.3 : 1, transition: "stroke-width 0.2s, opacity 0.2s" }}
                onMouseEnter={() => onHover?.(seg.id)}
                onMouseLeave={() => onHover?.(null)}
              />
            );
          })}
        </g>
      </svg>
      <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">{children}</div>
    </div>
  );
}