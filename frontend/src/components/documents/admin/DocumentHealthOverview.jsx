import { useState } from 'react';
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
function HealthDonut({ items, total, centerText, centerColor, activeKey }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="relative h-[99px] w-[99px] shrink-0">
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
              strokeWidth={activeKey === item.key ? 11 : 9}
              opacity={activeKey && activeKey !== item.key ? 0.25 : 1}
              style={{ transition: 'opacity 150ms, stroke-width 150ms' }}
              strokeDasharray={`${length} ${circumference - length}`}
              strokeDashoffset={-offset}
            />
          );
          offset += length;
          return circle;
        })}
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center font-serif text-[22px] font-black"
        style={{ color: centerColor }}
      >
        {centerText}
      </span>
    </div>
  );
}

// Admin-only health snapshot.
// Hovering a status card previews it on the ring + title; clicking selects it
// (highlighted card) and filters the document list below to that status.
function DocumentHealthOverview() {
  const activeStatus = useStatusFilter();
  const [hoveredKey, setHoveredKey] = useState(null);

  const total = documentHealth.reduce((sum, item) => sum + item.count, 0);
  const percent = (count) => Math.round((count / total) * 100);

  const indexed = documentHealth.find((item) => item.key === 'indexed');
  const selected = documentHealth.find((item) => item.label === activeStatus);
  const hovered = documentHealth.find((item) => item.key === hoveredKey);

  // What the ring + title show: hovered card first, then the selected one,
  // otherwise the overall health (indexed share).
  const shown = hovered ?? selected ?? null;
  const centerItem = shown ?? indexed;
  const badgeText = shown ? `${shown.count} ${shown.label}` : `${percent(indexed.count)}% Healthy`;
  const badgeType = shown ? BADGE_TYPE[shown.label] : 'success';
  const subtitle = shown
    ? `📌 ${shown.count} documents (${percent(shown.count)}%) currently ${shown.label.toLowerCase()}`
    : `Real-time ingestion & health telemetry across ${total} total repository files.`;

  return (
    <section className="mb-6 flex flex-col gap-5 rounded-2xl border border-(--border-subtle) bg-(--bg-surface) p-6 shadow-(--shadow-sm) lg:flex-row lg:items-center">
      {/* Left: ring + title */}
      <div className="flex items-center gap-5 lg:basis-[460px] lg:shrink-0">
        <HealthDonut
          items={documentHealth}
          total={total}
          centerText={`${percent(centerItem.count)}%`}
          centerColor={shown ? shown.color : 'var(--text-primary)'}
          activeKey={shown?.key}
        />
        <div className="min-w-0 max-w-[300px]">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-serif text-[17px] font-bold leading-tight text-(--text-primary)">
              Document Health Overview
            </h2>
            <Badge text={badgeText} type={badgeType} size="sm" />
          </div>
          <p
            className="mt-1.5 text-[11px] leading-4 text-(--text-muted)"
            style={shown ? { color: shown.color } : undefined}
          >
            {subtitle}
          </p>
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
              onMouseEnter={() => setHoveredKey(item.key)}
              onMouseLeave={() => setHoveredKey(null)}
              onFocus={() => setHoveredKey(item.key)}
              onBlur={() => setHoveredKey(null)}
              style={{
                borderColor: isActive || hoveredKey === item.key ? item.color : undefined,
              }}
              className={`min-h-[86px] cursor-pointer rounded-xl border px-4 py-3.5 text-left transition-colors ${
                isActive || hoveredKey === item.key
                  ? 'bg-white'
                  : 'border-transparent bg-[#e1f0fa]'
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
              <div className="mt-3 h-1 rounded-full bg-white/70">
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