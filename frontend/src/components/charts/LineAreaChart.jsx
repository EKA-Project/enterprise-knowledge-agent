import { useId, useMemo, useState } from "react";

// Change this single color variable to update the line, points, badge, legend dot, and hover text
const CHART_ACCENT_COLOR = "#14b8a6";

// ─────────────────────────────────────────────
// Chart geometry (matches the SVG viewBox and the dotted grid lines)
// ─────────────────────────────────────────────

const VIEW_W = 700;
const VIEW_H = 125;
const Y_TOP = 25; // top dotted grid line  -> highest value
const Y_BOTTOM = 105; // bottom dotted grid line -> lowest value
const MAX_AXIS_LABELS = 7;

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

// values are ordered oldest -> today
function buildPoints(values) {
  const count = values.length;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min;

  return values.map((value, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (count - 1 - index));

    return {
      date: index === count - 1 ? "Today" : dateFormatter.format(date),
      value,
      x: ((index + 0.5) * VIEW_W) / count,
      y:
        range === 0
          ? (Y_TOP + Y_BOTTOM) / 2
          : Y_BOTTOM - ((value - min) / range) * (Y_BOTTOM - Y_TOP),
    };
  });
}

// Smooth curve through every point (Catmull-Rom converted to cubic Béziers).
// Control-point y is clamped between the two endpoints so the line never
// overshoots above a peak or below a dip.
function buildPath(points) {
  if (points.length < 2) return "";

  const fmt = (n) => n.toFixed(1);
  let path = `M ${fmt(points[0].x)} ${fmt(points[0].y)}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;

    const low = Math.min(p1.y, p2.y);
    const high = Math.max(p1.y, p2.y);
    const clampY = (y) => Math.min(high, Math.max(low, y));

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = clampY(p1.y + (p2.y - p0.y) / 6);
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = clampY(p2.y - (p3.y - p1.y) / 6);

    path += ` C ${fmt(cp1x)} ${fmt(cp1y)}, ${fmt(cp2x)} ${fmt(cp2y)}, ${fmt(p2.x)} ${fmt(p2.y)}`;
  }

  return path;
}

// Show at most MAX_AXIS_LABELS labels, always ending on the last point.
function getAxisLabelIndexes(count) {
  const step = Math.ceil(count / MAX_AXIS_LABELS);
  const indexes = [];

  for (let i = count - 1; i >= 0; i -= step) {
    indexes.unshift(i);
  }

  return indexes;
}

/**
 * data: {
 *   title, badgeText, badgeIcon, legendLabel,
 *   subtext,           // default text under the title
 *   unit,              // word used in the hover text, e.g. "queries"
 *   values,            // number[] ordered oldest -> today
 * }
 * headerAction: optional node rendered on the right of the header (e.g. a range toggle)
 * showArea: soft gradient under the line (default true)
 */
function LineAreaChart({ data, headerAction, showArea = true }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const gradientId = `area-${useId().replace(/:/g, "")}`;

  const { points, path, areaPath, peakAt, axisIndexes } = useMemo(() => {
    const builtPoints = buildPoints(data.values);
    const builtPath = buildPath(builtPoints);
    const first = builtPoints[0];
    const last = builtPoints[builtPoints.length - 1];

    return {
      points: builtPoints,
      path: builtPath,
      areaPath: `${builtPath} L ${last.x.toFixed(1)} ${VIEW_H} L ${first.x.toFixed(1)} ${VIEW_H} Z`,
      peakAt: Math.max(...data.values) * 0.8,
      axisIndexes: getAxisLabelIndexes(builtPoints.length),
    };
  }, [data.values]);

  const unit = data.unit ?? "queries";
  const isDense = points.length > 16;
  const activePoint = hoveredIndex !== null ? points[hoveredIndex] ?? null : null;

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <section
      className="rounded-[18px] border border-(--border-subtle) bg-(--bg-surface) p-[1.35rem_1.6rem] shadow-(--shadow-sm)"
      onMouseLeave={handleMouseLeave}
    >
      {/* Header */}
      <div className="mb-[0.85rem] flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-[0.55rem]">
            <h3 className="font-serif text-[1.25rem] font-bold leading-[1.2] tracking-[-0.015em] text-(--text-primary)">
              {data.title}
            </h3>

            {/* Mint badge pill */}
            <span
              className="inline-flex items-center gap-1 rounded-full border border-[#a7f3d0] bg-[#e6f4ea] px-[0.3rem] py-[0.09rem] font-mono text-[0.6rem] font-semibold"
              style={{ color: CHART_ACCENT_COLOR }}
            >
              <span>{data.badgeIcon}</span>
              {data.badgeText}
            </span>
          </div>

          {/* Subtext: Uses muted text by default, turns accent color on hover */}
          <p
            className={`mt-1 min-h-5 text-[0.7rem] font-light leading-5 transition-colors ${
              !activePoint ? "text-(--text-muted)" : ""
            }`}
            style={activePoint ? { color: CHART_ACCENT_COLOR } : undefined}
          >
            {activePoint
              ? `📌 ${activePoint.date}: ${activePoint.value} ${unit} (${
                  activePoint.value >= peakAt ? "Peak activity" : "Normal activity"
                })`
              : data.subtext}
          </p>
        </div>

        {/* Legend + optional action (range toggle etc.) */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 font-mono text-[.68rem] text-(--text-muted)">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: CHART_ACCENT_COLOR }}
            />
            <span>{data.legendLabel}</span>
          </div>

          {headerAction}
        </div>
      </div>

      {/* Graph Area */}
      <div className="relative mt-2 h-40 w-full">
        {/* Sky-blue vertical guideline indicator */}
        {activePoint && (
          <div
            className="pointer-events-none absolute bottom-7 top-0 z-2 w-px bg-[#7dd3fc] opacity-80 transition-[left] duration-100"
            style={{
              left: `${(activePoint.x / VIEW_W) * 100}%`,
            }}
          />
        )}

        {/* SVG Curve */}
        <svg
          className="absolute left-0 top-0 block h-31.25 w-full overflow-visible"
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={CHART_ACCENT_COLOR} stopOpacity="0.22" />
              <stop offset="100%" stopColor={CHART_ACCENT_COLOR} stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Dotted grid lines */}
          {[25, 65, 105].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2={VIEW_W}
              y2={y}
              stroke="var(--border-subtle)"
              strokeDasharray="4 4"
            />
          ))}

          {/* Soft area under the line */}
          {showArea && <path d={areaPath} fill={`url(#${gradientId})`} />}

          {/* Velocity curve */}
          <path
            d={path}
            fill="none"
            stroke={CHART_ACCENT_COLOR}
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Interactive Points */}
        {points.map((point, index) => {
          const isHovered = index === hoveredIndex;

          return (
            <button
              key={point.date}
              type="button"
              aria-label={`${point.date}: ${point.value} ${unit}`}
              className={`absolute z-5 cursor-pointer -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200 ${
                isHovered
                  ? "h-4 w-4 border-2 border-white shadow-md"
                  : `${isDense ? "h-2 w-2" : "h-2.5 w-2.5"} border-2 border-(--bg-surface) shadow-[0_1px_3px_rgba(0,0,0,0.2)]`
              }`}
              style={{
                left: `${(point.x / VIEW_W) * 100}%`,
                top: `${point.y}px`,
                backgroundColor: CHART_ACCENT_COLOR,
                boxShadow: isHovered
                  ? `0 0 0 4px ${CHART_ACCENT_COLOR}44, 0 4px 6px -1px rgba(0, 0, 0, 0.1)`
                  : undefined,
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onFocus={() => handleMouseEnter(index)}
              onBlur={handleMouseLeave}
            />
          );
        })}

        {/* Tooltip */}
        {activePoint && (
          <div
            className="pointer-events-none absolute z-20 rounded-lg bg-[#111827] px-2 py-1 text-left shadow-[0_12px_24px_rgba(0,0,0,0.5)]"
            style={{
              left: `${(activePoint.x / VIEW_W) * 100}%`,
              top: activePoint.y > 60 ? activePoint.y - 62 : activePoint.y + 14,
              transform:
                activePoint.x / VIEW_W > 0.75
                  ? "translateX(-105%)"
                  : "translateX(8%)",
            }}
          >
            <div className="font-sans text-[0.72rem] font-semibold text-[#9ca3af]">
              {activePoint.date}
            </div>

            <div
              className="mt-0.5 font-mono text-[0.8rem] font-bold tracking-tight"
              style={{ color: CHART_ACCENT_COLOR }}
            >
              {unit} : {activePoint.value}
            </div>
          </div>
        )}
      </div>

      {/* Axis labels, positioned exactly under their points */}
      <div className="relative mt-1 h-5 font-sans text-[0.7rem] font-semibold text-(--text-muted)">
        {axisIndexes.map((index) => {
          const point = points[index];
          const isLast = index === points.length - 1;

          return (
            <span
              key={point.date}
              className={`absolute top-0 -translate-x-1/2 whitespace-nowrap ${
                isLast ? "font-bold text-[#0284c7]" : ""
              }`}
              style={{ left: `${(point.x / VIEW_W) * 100}%` }}
            >
              {point.date}
            </span>
          );
        })}
      </div>
    </section>
  );
}

export default LineAreaChart;