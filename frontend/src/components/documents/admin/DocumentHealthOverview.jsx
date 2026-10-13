import { documentHealth } from '../shared/DocumentData';

// Donut geometry (the SVG viewBox is 100 x 100).
const RADIUS = 44;
const STROKE = 12;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// Smallest width a tile's progress bar may have, so tiny shares
// (2-4%) still show a visible sliver, as in the reference design.
const MIN_BAR_PERCENT = 20;

function DocumentHealthOverview() {
  const total = documentHealth.reduce((sum, item) => sum + item.count, 0);

  // For every status work out its percentage, the arc length it needs on
  // the donut, and where that arc starts (= everything before it).
  const segments = documentHealth.map((item, index) => {
    const countBefore = documentHealth
      .slice(0, index)
      .reduce((sum, previous) => sum + previous.count, 0);

    return {
      ...item,
      percent: Math.round((item.count / total) * 100),
      arc: (item.count / total) * CIRCUMFERENCE,
      start: (countBefore / total) * CIRCUMFERENCE,
    };
  });

  // "Indexed" is the healthy share shown in the donut centre.
  const healthy = segments[0];

  return (
    <section className="mb-6 rounded-2xl border border-(--border-subtle) bg-(--bg-surface) p-6 shadow-(--shadow-sm)">
      <div className="flex items-center gap-6">
        {/* Donut chart */}
        <div className="relative h-24 w-24 shrink-0">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden="true">
            {segments.map((segment) => (
              <circle
                key={segment.key}
                cx="50"
                cy="50"
                r={RADIUS}
                fill="none"
                strokeWidth={STROKE}
                strokeDasharray={`${segment.arc} ${CIRCUMFERENCE - segment.arc}`}
                strokeDashoffset={-segment.start}
                style={{ stroke: segment.color }}
              />
            ))}
          </svg>

          <span className="doc-heading absolute inset-0 flex items-center justify-center text-2xl font-bold text-(--text-primary)">
            {healthy.percent}%
          </span>
        </div>

        {/* Title and summary */}
        <div className="min-w-[210px]">
          <h2 className="doc-heading text-lg font-bold text-(--text-primary)">
            Document Health Overview
          </h2>
          <span className="doc-mono mt-2 inline-flex rounded-full border border-(--border-medium) bg-(--bg-surface) px-2.5 py-0.5 text-[10px] font-semibold text-(--text-primary)">
            {healthy.percent}% Healthy
          </span>
          <p className="mt-2 text-xs leading-5 text-(--text-secondary)">
            Real-time ingestion &amp; health telemetry across {total} total repository files
          </p>
        </div>

        {/* Status tiles */}
        <div className="grid flex-1 grid-cols-4 gap-3">
          {segments.map((segment) => (
            <div
              key={segment.key}
              className="rounded-xl border border-(--border-subtle) bg-(--bg-surface-subtle) p-4"
            >
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-(--text-secondary)">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: segment.color }}
                  />
                  {segment.label}
                </span>
                <span className="text-[10px]" style={{ color: segment.color }}>
                  {segment.percent}%
                </span>
              </div>

              <p className="doc-heading mt-2 text-2xl font-bold text-(--text-primary)">
                {segment.count}
              </p>

              <div className="mt-3 h-1 rounded-full bg-(--border-subtle)">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.max(segment.percent, MIN_BAR_PERCENT)}%`,
                    backgroundColor: segment.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DocumentHealthOverview;