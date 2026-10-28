import { CheckCircle2 } from "lucide-react";

const mono = "font-(family-name:--font-mono)";

// ContradictionCard component for displaying cross-document contradictions
export default function ContradictionCard({ items, onResolve, onAutoResolve }) {
  const allResolved = items.every((i) => i.resolved);

  return (
    <section
      className="anl-rise rounded-2xl border border-(--border-medium) border-l-[3px] border-l-(--status-failure) bg-(--bg-surface) p-5 shadow-(--shadow-sm)"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <span className={`${mono} rounded-md bg-(--status-warning-bg) px-2 py-0.5 text-[10px] font-bold text-(--status-warning)`}>
              ⚠ Automated Audit Alert
            </span>
            <span className={`${mono} text-[10px] text-(--text-muted)`}>Scanned 148,920 vector chunks</span>
          </div>
          <h3 className="mt-2 font-(family-name:--font-serif) text-[22px] font-bold text-(--text-primary)">
            Cross-Document Contradiction Detector
          </h3>
        </div>
        <button
          type="button"
          onClick={onAutoResolve}
          disabled={allResolved}
          className="rounded-full border border-(--border-subtle-nav) bg-(--bg-surface) px-4 py-1.5 text-[12px] font-semibold text-(--text-primary) transition hover:border-(--primary) hover:text-(--primary) active:scale-95 disabled:opacity-50"
        >
          {allResolved ? "All Resolved ✓" : "Auto-Resolve Discrepancies"}
        </button>
      </div>

      <ul className="mt-4 space-y-3">
        {items.map((c) => (
          <li
            key={c.id}
            className={`rounded-xl border p-4 transition-colors duration-300 ${
              c.resolved ? "border-(--status-verified-border) bg-(--status-verified-bg)" : "border-(--border-subtle) bg-(--bg-surface-subtle)"
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h4 className="text-[14px] font-bold text-(--text-primary)">{c.title}</h4>
              {c.resolved ? (
                <span className={`${mono} inline-flex items-center gap-1 rounded-md bg-(--status-success-bg) px-2 py-0.5 text-[10px] font-bold text-(--status-success)`}>
                  <CheckCircle2 size={11} aria-hidden="true" /> Resolved
                </span>
              ) : (
                <span
                  className={`${mono} rounded-md px-2 py-0.5 text-[10px] font-bold ${
                    c.severity === "High" ? "bg-[#ffedd5] text-[#c2410c]" : "bg-(--status-warning-bg) text-(--status-warning)"
                  }`}
                >
                  {c.severity} Severity
                </span>
              )}
            </div>

            <p className="mt-2 text-[12.5px] italic leading-relaxed text-(--text-secondary)">
              <em>{c.sourceA}</em> {c.lead}{" "}
              <code className={`${mono} rounded bg-(--status-failure-bg) px-1.5 py-0.5 text-[11px] font-bold not-italic text-(--status-failure)`}>{c.valueA}</code>
              , {c.middle} <em>{c.sourceB}</em> {c.verb}{" "}
              <code className={`${mono} rounded bg-(--status-success-bg) px-1.5 py-0.5 text-[11px] font-bold not-italic text-(--status-success)`}>{c.valueB}</code>.
            </p>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <p className="text-[12px] text-(--text-muted)">
                Affects: <span className="font-semibold text-(--text-primary) underline underline-offset-2">{c.affects}</span>
              </p>
              <button
                type="button"
                onClick={() => onResolve(c.id)}
                disabled={c.resolved}
                className="rounded-full border border-(--border-subtle-nav) bg-(--bg-surface) px-3 py-1 text-[11px] font-semibold text-(--text-primary) transition hover:border-(--primary) hover:text-(--primary) active:scale-95 disabled:opacity-50"
              >
                {c.resolved ? "Resolved ✓" : `${c.action} →`}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}