import { documentHealth } from '../shared/DocumentData';
import Badge from '../../common/Badge.jsx';
import { setStatusFilter, useStatusFilter } from '../shared/documentResults.js';

// Badge colour per status (maps to the shared Badge types)
const BADGE_TYPE = {
  Indexed: 'success',
  Processing: 'info',
  Outdated: 'warning',
  Failed: 'danger',
};

// Ring made of one arc per status, drawn clockwise from 12 o'clock.
function HealthDonut({ items, total, centerText, centerColor }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="relative h-[94px] w-[94px] shrink-0">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden="true">
        {items.map((item) => {
          const length = (item.count / total) * circumference;
          const circle = (
            <circle
              key={item.key}
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth="9"
              strokeDasharray={`${length} ${circumference - length}`}
              strokeDashoffset={-offset}
            />
          );
          offset += length;
          return circle;
        })}
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center font-serif text-xl font-black"
        style={{ color: centerColor }}
      >
        {centerText}
      </span>
    </div>
  );
}

// Admin-only health snapshot. Clicking a status card highlights it, updates the
// ring + title, and filters the document list below to that status.
function DocumentHealthOverview() {
  const activeStatus = useStatusFilter();
  const total = documentHealth.reduce((sum, item) => sum + item.count, 0);
  const percent = (count) => Math.round((count / total) * 100);

  const active = documentHealth.find((item) => item.label === activeStatus);
  const indexed = documentHealth.find((item) => item.key === 'indexed');

  // Default view = overall health (indexed share); active view = that status
  const centerItem = active ?? indexed;
  const badgeText = active ? `${active.count} ${active.label}` : `${percent(indexed.count)}% Healthy`;
  const badgeType = active ? BADGE_TYPE[active.label] : 'success';
  const subtitle = active
    ? `📌 ${active.count} documents (${percent(active.count)}%) currently ${active.label.toLowerCase()}`
    : `Real-time ingestion & health telemetry across ${total} total repository files.`;

  return (
    <section className="mb-6 flex flex-col gap-5 rounded-2xl border border-(--border-subtle) bg-(--bg-surface) p-4 shadow-(--shadow-sm) lg:flex-row lg:items-center">
      {/* Left: ring + title */}
      <div className="flex items-center gap-4 lg:basis-[380px] lg:shrink-0">
        <HealthDonut
          items={documentHealth}
          total={total}
          centerText={`${percent(centerItem.count)}%`}
          centerColor={active ? active.color : 'var(--text-primary)'}
        />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-serif text-[15px] font-bold text-(--text-primary)">
              Document Health Overview
            </h2>
            <Badge text={badgeText} type={badgeType} size="sm" />
          </div>
          <p className="mt-1 text-[11px] leading-4 text-(--text-muted)">{subtitle}</p>
        </div>
      </div>

      {/* Right: one clickable card per status */}
      <div className="grid flex-1 grid-cols-2 gap-3 lg:grid-cols-4">
        {documentHealth.map((item) => {
          const isActive = activeStatus === item.label;
          return (
            <button
              key={item.key}
              type="button"
              aria-pressed={isActive}
              onClick={() => setStatusFilter(isActive ? '' : item.label)}
              style={{ borderColor: isActive ? item.color : undefined }}
              className={`cursor-pointer rounded-xl border px-3.5 py-3 text-left transition-colors ${
                isActive
                  ? 'bg-white'
                  : 'border-transparent bg-(--bg-surface-subtle) hover:border-(--border-subtle) hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 text-[11px] font-semibold text-(--text-secondary)">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  {item.label}
                </span>
                <span className="doc-mono text-[10px]" style={{ color: item.color }}>
                  {percent(item.count)}%
                </span>
              </div>

              <p className="mt-2 font-serif text-[26px] font-black leading-none text-(--text-primary)">
                {item.count}
              </p>

              {/* Share bar (small shares get a minimum width so they stay visible) */}
              <div className="mt-3 h-1 rounded-full bg-white/80">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.max(percent(item.count), 16)}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default DocumentHealthOverview;