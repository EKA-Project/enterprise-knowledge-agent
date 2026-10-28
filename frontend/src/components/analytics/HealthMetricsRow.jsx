import { CheckCircle2, Clock, AlertTriangle, Star } from "lucide-react";

export default function HealthMetricsRow({ metrics, alertCount }) {
  const cards = [
    {
      label: "Grounding accuracy", value: metrics.accuracy, note: "Zero Hallucinations",
      noteTone: "text-(--status-success)", Icon: CheckCircle2, tile: "bg-(--status-success-bg) text-(--status-success)",
    },
    {
      label: "Knowledge freshness", value: metrics.freshness, note: metrics.freshnessNote,
      noteTone: "text-(--status-success)", Icon: Clock, tile: "bg-(--status-warning-bg) text-(--status-warning)",
    },
    {
      label: "Contradictions flagged", value: `${alertCount} ${alertCount === 1 ? "Alert" : "Alerts"}`,
      note: alertCount ? "Action Needed" : "All Clear",
      noteTone: alertCount ? "text-(--text-muted)" : "text-(--status-success)",
      Icon: AlertTriangle, tile: "bg-[#ffedd5] text-[#c2410c]",
    },
    {
      label: "Knowledge utilization", value: metrics.utilization, note: "Active in RAG",
      noteTone: "text-(--status-success)", Icon: Star, tile: "bg-[#f3e8ff] text-[#7e22ce]",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map(({ label, value, note, noteTone, Icon, tile }, i) => (
        <article
          key={label}
          style={{ animationDelay: `${i * 60}ms` }}
          className="anl-rise rounded-2xl border border-(--border-medium) bg-(--bg-surface) p-5 shadow-(--shadow-sm) transition duration-200 hover:-translate-y-0.5 hover:shadow-(--shadow-md)"
        >
          <div className="flex items-start justify-between gap-2">
            <p className="font-(family-name:--font-mono) text-[10px] uppercase tracking-[0.14em] text-(--text-muted)">{label}</p>
            <span className={`grid size-8 shrink-0 place-items-center rounded-lg ${tile}`}>
              <Icon size={15} aria-hidden="true" />
            </span>
          </div>
          <div className="mt-3 flex flex-wrap items-baseline gap-x-3">
            <span key={value} className="anl-fade font-(family-name:--font-serif) text-[34px] font-bold leading-none text-(--text-primary)">
              {value}
            </span>
            <span className={`text-[12px] font-semibold ${noteTone}`}>{note}</span>
          </div>
        </article>
      ))}
    </div>
  );
}