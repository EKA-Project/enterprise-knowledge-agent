import { useState } from "react";
import SegmentedProgressBar from "../charts/KnowledgeGapProgressBar";
import { GAP_DISTRIBUTION, GAP_QUERIES, GAP_STATS } from "./AnalyticsData";

const mono = "font-(family-name:--font-mono)";
const serif = "font-(family-name:--font-serif)";
const COLS = "grid grid-cols-[2.2fr_0.9fr_1.4fr_1.5fr_1.3fr] items-center gap-4";

// KnowledgeGapSection component for displaying knowledge gaps and audit items
export default function KnowledgeGapSection({ onIngest }) {
  const [activeId, setActiveId] = useState(null);
  const [showAll, setShowAll] = useState(false);

  // Calculate total gaps and find the active gap for display
  const totalGaps = GAP_DISTRIBUTION.reduce((sum, g) => sum + g.value, 0);
  const active = GAP_DISTRIBUTION.find((g) => g.id === activeId);
  const rows = showAll ? GAP_QUERIES : GAP_QUERIES.slice(0, 3);
  const pct = (g) => Math.round((g.value / totalGaps) * 100);

// Render the KnowledgeGapSection component with statistics, progress bar, and a list of knowledge gaps
  return (
    <section className="anl-rise rounded-2xl border border-(--border-medium) bg-(--bg-surface) p-5 shadow-(--shadow-sm)">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-full bg-(--primary-light) px-2.5 py-0.5 text-[10.5px] font-semibold text-(--accent-chip-text)">🔍 Knowledge Gaps</span>
            <span className={`${mono} text-[10px] text-(--text-muted)`}>{GAP_QUERIES.length} Active Inquiries Requiring Sources</span>
          </div>
          <h3 className={`${serif} mt-2 text-[24px] font-bold text-(--text-primary)`}>Knowledge Gaps &amp; Audit Items</h3>
          <p className="mt-1 max-w-[68ch] text-[12px] text-(--text-muted)">
            Identifies information EKA currently struggles to answer, including unanswered queries, low-confidence questions, and missing knowledge topics.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="rounded-full border border-(--border-subtle-nav) px-3.5 py-1.5 text-[12px] font-semibold text-(--text-primary) transition hover:border-(--primary) hover:text-(--primary)"
        >
          {showAll ? "Show Fewer ‹" : "View All Gaps ›"}
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {GAP_STATS.map((s) => (
          <div key={s.label} className="rounded-xl bg-(--bg-surface-subtle) p-4">
            <p className={`${mono} text-[9.5px] uppercase tracking-[0.12em] text-(--text-muted)`}>{s.label}</p>
            <p className="mt-1.5 flex items-baseline gap-2">
              <span className={`${serif} text-[28px] font-bold leading-none ${s.tone}`}>{s.value}</span>
              <span className="text-[12px] text-(--text-secondary)">{s.note}</span>
            </p>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-xl bg-(--bg-surface-subtle) p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <p className={`${mono} text-[9.5px] uppercase tracking-[0.12em] text-(--text-muted)`}>
            Departmental knowledge gap distribution <span className="ml-2 rounded bg-(--bg-surface) px-1.5 py-0.5 font-bold">{totalGaps} Active Gaps</span>
          </p>
          <span className={`${mono} rounded-md bg-(--bg-surface) px-2 py-0.5 text-[9.5px] text-(--text-muted)`}>
            {active ? `${active.label}: ${active.value} (${pct(active)}%)` : "Hover segments to inspect breakdown"}
          </span>
        </div>
        <SegmentedProgressBar segments={GAP_DISTRIBUTION} activeId={activeId} onHover={setActiveId} />
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
          {GAP_DISTRIBUTION.map((g) => (
            <li key={g.id}>
              <button
                type="button"
                onMouseEnter={() => setActiveId(g.id)}
                onMouseLeave={() => setActiveId(null)}
                onFocus={() => setActiveId(g.id)}
                onBlur={() => setActiveId(null)}
                className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-medium text-(--text-primary) transition ${
                  activeId === g.id ? "bg-(--bg-surface) shadow-(--shadow-sm)" : ""
                }`}
              >
                <span className="size-2 rounded-full" style={{ backgroundColor: g.color }} />
                {g.label}: {g.value} ({pct(g)}%)
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-3 overflow-x-auto">
        <div className="min-w-[760px] overflow-hidden rounded-xl border border-(--border-subtle)">
          <div className={`${COLS} bg-(--bg-surface-subtle) px-4 py-2.5 ${mono} text-[9.5px] uppercase tracking-[0.12em] text-(--text-muted)`}>
            <span>Query phrase</span>
            <span>Inquiry volume</span>
            <span>Status &amp; confidence</span>
            <span>Category cluster</span>
            <span className="text-right">Admin action</span>
          </div>
          {rows.map((r) => (
            <div key={r.id} className={`${COLS} anl-fade border-t border-(--border-subtle) px-4 py-3.5 transition-colors hover:bg-(--primary-light)/60`}>
              <div>
                <p className={`${serif} text-[13.5px] font-bold text-(--text-primary)`}>“{r.query}”</p>
                <p className="mt-0.5 text-[11px] text-(--text-muted)">{r.sub}</p>
              </div>
              <span className="text-[12px] font-semibold text-(--text-primary)">{r.volume} searches</span>
              <span
                className={`${mono} w-fit rounded-md px-2 py-0.5 text-[10px] font-bold ${
                  r.tone === "failure" ? "bg-(--status-failure-bg) text-(--status-failure)" : "bg-(--status-warning-bg) text-(--status-warning)"
                }`}
              >
                {r.status}
              </span>
              <span className={`${mono} w-fit rounded-md bg-(--primary-light) px-2 py-0.5 text-[9.5px] font-semibold uppercase text-(--accent-chip-text)`}>
                {r.cluster}
              </span>
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => onIngest(r)}
                  className="rounded-full border border-(--border-subtle-nav) px-3 py-1 text-[11px] font-semibold text-(--text-primary) transition hover:border-(--primary) hover:bg-(--primary) hover:text-(--primary-contrast) active:scale-95"
                >
                  {r.action}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}