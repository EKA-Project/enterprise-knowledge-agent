import { useState } from "react";
import BarChart from "../charts/AuditConflictBarChart";
import DonutChart from "../charts/AnalyticsDonutChart";
import { KNOWLEDGE_MASS, MONTHLY_CONFLICTS, QUALITY_STATS, TOTAL_CITATIONS } from "./AnalyticsData";

const mono = "font-(family-name:--font-mono)";
const serif = "font-(family-name:--font-serif)";

export default function AuditDistributionSection() {
  const [barIndex, setBarIndex] = useState(null);
  const [sectorId, setSectorId] = useState(null);

  const total = MONTHLY_CONFLICTS.reduce((sum, m) => sum + m.value, 0);
  const bar = barIndex === null ? null : MONTHLY_CONFLICTS[barIndex];
  const sector = KNOWLEDGE_MASS.find((s) => s.id === sectorId);
  const sectorCitations = sector ? Math.round((sector.value / 100) * TOTAL_CITATIONS) : 0;

  return (
    <section className="anl-rise rounded-2xl border border-(--border-medium) bg-(--bg-surface) p-5 shadow-(--shadow-sm)">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className={`${mono} text-[10px] uppercase tracking-[0.14em] text-(--text-muted)`}>Accuracy &amp; distribution telemetry</p>
          <h3 className={`${serif} mt-1.5 text-[24px] font-bold leading-tight text-(--text-primary)`}>
            Audit Conflicts &amp; Knowledge Mass Distribution
          </h3>
          <p className="mt-1 max-w-[52ch] text-[12px] text-(--text-muted)">
            Side-by-side annual audit conflict resolution trends alongside organization-wide knowledge citation breakdown.
          </p>
        </div>
        <div className="flex gap-2">
          {QUALITY_STATS.map((s) => (
            <div key={s.label} className="rounded-xl bg-(--bg-surface-subtle) px-3.5 py-2">
              <p className={`${mono} text-[8.5px] uppercase tracking-[0.12em] text-(--text-muted)`}>{s.label}</p>
              <p className={`${mono} text-[14px] font-bold text-(--text-primary)`}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-(--border-subtle) p-4">
          <div className="flex items-center justify-between">
            <p className={`${mono} text-[9.5px] uppercase tracking-[0.12em] text-(--text-muted)`}>Audit conflicts telemetry</p>
            <span className={`${mono} rounded-md bg-(--status-success-bg) px-2 py-0.5 text-[9.5px] font-bold text-(--status-success)`}>98.2% Auto-Resolved</span>
          </div>
          <h4 className={`${serif} mt-2 text-[18px] font-bold text-(--text-primary)`}>Audit conflicts &amp; resolution</h4>
          <p className="mb-4 mt-0.5 min-h-4 text-[11.5px] text-(--text-muted)">
            {bar ? (
              <span className="anl-fade font-semibold text-(--primary)">
                📅 {bar.label}: {bar.value} Discrepancies Flagged &amp; Reconciled
              </span>
            ) : (
              `Annual discrepancy resolution velocity (${total} total items)`
            )}
          </p>
          <BarChart data={MONTHLY_CONFLICTS} activeIndex={barIndex} onHover={setBarIndex} />
        </div>

        <div className="rounded-xl border border-(--status-verified-border) bg-(--status-verified-bg) p-4">
          <div className="flex items-center justify-between">
            <p className={`${mono} text-[9.5px] uppercase tracking-[0.12em] text-(--text-muted)`}>Knowledge mass distribution</p>
            <span className={`${mono} rounded-md bg-(--bg-surface) px-2 py-0.5 text-[9.5px] font-bold text-(--status-success)`}>
              {TOTAL_CITATIONS.toLocaleString()} Citations
            </span>
          </div>
          <p className="mt-2 flex flex-wrap items-baseline gap-2">
            <span className={`${serif} text-[32px] font-bold leading-none text-(--text-primary)`}>{KNOWLEDGE_MASS.length}</span>
            <span className={`${serif} text-[18px] text-(--text-primary)`}>Sectors</span>
            <span className={`${mono} text-[10.5px] text-(--text-muted)`}>
              {sector ? `(${sector.label}: ${sectorCitations.toLocaleString()} Citations)` : "(Verified Document Sources)"}
            </span>
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-6">
            <DonutChart segments={KNOWLEDGE_MASS} activeId={sectorId} onHover={setSectorId} size={130}>
              <div>
                <p className={`${serif} text-[22px] font-bold leading-none text-(--text-primary)`}>{sector ? `${sector.value}%` : "100%"}</p>
                <p className={`${mono} mt-1 max-w-[70px] text-[8px] uppercase leading-tight text-(--text-muted)`}>
                  {sector ? sector.label : "Verified Sources"}
                </p>
              </div>
            </DonutChart>

            <ul className="min-w-40 flex-1 space-y-1.5">
              {KNOWLEDGE_MASS.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setSectorId(s.id)}
                    onMouseLeave={() => setSectorId(null)}
                    onFocus={() => setSectorId(s.id)}
                    onBlur={() => setSectorId(null)}
                    className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[12px] transition ${
                      sectorId === s.id ? "bg-(--bg-surface) font-bold shadow-(--shadow-sm)" : "font-medium"
                    }`}
                  >
                    <span className="size-2 rounded-sm" style={{ backgroundColor: s.color }} />
                    <span className="flex-1 text-(--text-primary)">{s.label}</span>
                    <span className={`${mono} text-(--text-secondary)`}>{s.value}%</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${mono} mt-4 flex justify-between border-t border-(--status-verified-border) pt-2.5 text-[9.5px] text-(--text-muted)`}>
            <span>Grounding Ratio: 99.2%</span>
            <span>100% Index Coverage</span>
          </div>
        </div>
      </div>
    </section>
  );
}