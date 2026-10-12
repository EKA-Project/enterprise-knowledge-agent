import { USAGE_STATS } from "./AnalyticsData";

const mono = "font-(family-name:--font-mono)";

// UsageSummary component for displaying a summary of usage metrics
export default function UsageSummary({ onViewUsage }) {
  return (
    <section className="anl-rise rounded-2xl border border-(--border-medium) bg-(--bg-surface) p-5 shadow-(--shadow-sm)">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className={`${mono} text-[10px] uppercase tracking-[0.14em] text-(--text-muted)`}>High-level usage metrics</p>
          <h3 className="mt-1.5 font-(family-name:--font-serif) text-[24px] font-bold text-(--text-primary)">Usage Summary</h3>
          <p className="mt-1 max-w-[62ch] text-[12px] text-(--text-muted)">
            Compact usage activity overview. For granular user activity, query history, and department trends, open User Management.
          </p>
        </div>
        <button
          type="button"
          onClick={onViewUsage}
          className="rounded-full bg-(--text-primary) px-4 py-2 text-[12px] font-bold text-white transition hover:bg-(--primary) active:scale-95"
        >
          View Usage →
        </button>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-(--border-subtle) pt-5 lg:grid-cols-4">
        {USAGE_STATS.map((s) => (
          <div key={s.label}>
            <dt className={`${mono} text-[9.5px] uppercase tracking-[0.12em] text-(--text-muted)`}>{s.label}</dt>
            <dd className="mt-1 font-(family-name:--font-serif) text-[28px] font-bold leading-none text-(--text-primary)">{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}