import { useState } from "react";
import DonutChart from "../charts/AnalyticsDonutChart";
import { SENTIMENT } from "./AnalyticsData";

const mono = "font-(family-name:--font-mono)";
const serif = "font-(family-name:--font-serif)";

// SentimentCard component for displaying user response sentiment with a donut chart
export default function SentimentCard() {
  const [activeId, setActiveId] = useState(null);
  const active = SENTIMENT.find((s) => s.id === activeId);
  const segments = SENTIMENT.map((s) => ({ id: s.id, value: s.pct, color: s.color }));

  // Render the SentimentCard component with a donut chart and a list of sentiment categories
  return (
    <section className="anl-rise flex flex-col rounded-2xl border border-(--border-medium) bg-(--bg-surface) p-5 shadow-(--shadow-sm)">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className={`${serif} text-[20px] font-bold text-(--text-primary)`}>User Response Sentiment</h3>
          <p className="mt-0.5 text-[11.5px] text-(--text-muted)">4,820 Evaluated Inquiries</p>
        </div>
        <span className={`${mono} rounded-md bg-(--status-success-bg) px-2 py-0.5 text-[10px] font-bold text-(--status-success)`}>94.8% CSAT</span>
      </div>

      <p className="mt-3 min-h-4 text-[11.5px] text-(--text-muted)">
        {active ? (
          <span className="anl-fade font-semibold text-(--text-primary)">
            {active.label} {active.emoji}: {active.count.toLocaleString()} Queries ({active.pct}% of total feedback)
          </span>
        ) : (
          "Real-time user feedback ratio (Like 👍 vs Dislike 👎)"
        )}
      </p>

      <div className="my-5 grid place-items-center">
        <DonutChart segments={segments} activeId={activeId} onHover={setActiveId} size={170} thickness={13}>
          <div>
            <p className={`${serif} text-[32px] font-bold leading-none text-(--text-primary)`}>{active ? `${active.pct}%` : "84%"}</p>
            <p className={`${mono} mt-1 text-[9px] font-semibold text-(--status-success)`}>{active ? active.label : "Positive CSAT"}</p>
          </div>
        </DonutChart>
      </div>

      <ul className="space-y-1">
        {SENTIMENT.map((s) => (
          <li key={s.id}>
            <button
              type="button"
              onMouseEnter={() => setActiveId(s.id)}
              onMouseLeave={() => setActiveId(null)}
              onFocus={() => setActiveId(s.id)}
              onBlur={() => setActiveId(null)}
              className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[12.5px] transition ${
                activeId === s.id ? "bg-(--bg-surface-subtle)" : ""
              }`}
            >
              <span className="size-2 rounded-full" style={{ backgroundColor: s.color }} />
              <span className="flex-1 font-medium text-(--text-primary)">{s.label} {s.emoji}</span>
              <span className={`${mono} text-[11px] text-(--text-muted)`}>{s.count.toLocaleString()}</span>
              <span className={`${mono} w-9 text-right text-[12px] font-bold`} style={{ color: s.color }}>{s.pct}%</span>
            </button>
          </li>
        ))}
      </ul>

      <div className={`${mono} mt-auto flex justify-between pt-4 text-[9.5px] text-(--text-muted)`}>
        <span>Evaluation Sample: 100%</span>
        <span className="font-bold text-(--status-success)">Trend: +3.2% MoM</span>
      </div>
    </section>
  );
}