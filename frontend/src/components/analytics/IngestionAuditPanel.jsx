import { useState } from "react";
import { AlertTriangle, CheckCircle2, Mail, RefreshCw, Zap } from "lucide-react";

const COLS = "grid grid-cols-[1.7fr_1.3fr_0.9fr_1.8fr_0.8fr_2.2fr] items-center gap-4";
const mono = "font-(family-name:--font-mono)";

// IngestionAuditPanel component for displaying ingestion failures and vector health audit
export default function IngestionAuditPanel({ failures, fixing, scanning, onFixAll, onFix, onNotify, onScan }) {
  const [inspectId, setInspectId] = useState(null);

  // Healthy state: shown once every failure has been fixed.
  if (failures.length === 0) {
    return (
      <section className="anl-rise flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-(--status-verified-border) bg-(--bg-surface) px-5 py-4 shadow-(--shadow-sm)">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-full bg-(--status-success-bg) text-(--status-success)">
            <CheckCircle2 size={18} aria-hidden="true" />
          </span>
          <div>
            <h3 className="flex flex-wrap items-center gap-2 font-(family-name:--font-serif) text-[15px] font-bold text-(--text-primary)">
              Department Ingestion Pipelines &amp; Vector Health
              <span className={`${mono} rounded-md bg-(--status-success-bg) px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-(--status-success)`}>
                100% Operational
              </span>
            </h3>
            <p className="mt-0.5 text-[12px] text-(--text-muted)">
              All 6 department vector partitions are healthy with zero failed chunks. Knowledge grounding is operating at peak integrity.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onScan}
          disabled={scanning}
          className="inline-flex items-center gap-1.5 rounded-full border border-(--border-subtle-nav) bg-(--bg-surface) px-4 py-1.5 text-[12px] font-semibold text-(--text-primary) transition hover:border-(--primary) hover:text-(--primary) active:scale-95"
        >
          <Zap size={13} className={scanning ? "animate-pulse" : ""} aria-hidden="true" /> Run Ingestion Integrity Scan
        </button>
      </section>
    );
  }

  return (
    <section
      className="anl-rise overflow-hidden rounded-2xl border border-(--status-failure-border) shadow-(--shadow-sm)"
      style={{ backgroundImage: "linear-gradient(180deg, var(--status-failure-bg) -40%, var(--bg-surface) 38%)" }}
    >
      <div className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className={`${mono} inline-flex items-center gap-1.5 rounded-md bg-(--status-failure-bg) px-2 py-0.5 text-[10px] font-bold text-(--status-failure)`}>
                <AlertTriangle size={11} aria-hidden="true" /> {failures.length} Ingestion Failure{failures.length === 1 ? "" : "s"} Detected
              </span>
              <span className={`${mono} text-[10px] text-(--text-muted)`}>Cross-Department Telemetry</span>
            </div>
            <h3 className="mt-2 flex items-center gap-2 font-(family-name:--font-serif) text-[20px] font-bold text-(--text-primary)">
              <Zap
                size={16}
                className="fill-amber-400 text-amber-400"
                strokeWidth={1.5}
                aria-hidden="true"
                />
              Department Ingestion Failures &amp; Vector Health Audit
            </h3>
            <p className="mt-1 max-w-[64ch] text-[12px] leading-relaxed text-(--text-muted)">
              Real-time monitor of documents that failed vector embedding generation. Dispatch alerts to Department Leads or execute direct administrative re-indexing overrides.
            </p>
          </div>
          <button
            type="button"
            onClick={onFixAll}
            disabled={fixing}
            className="inline-flex items-center gap-2 rounded-full bg-(--status-failure) px-4 py-2 text-[12px] font-bold text-white transition hover:brightness-110 active:scale-95 disabled:opacity-70"
          >
            <RefreshCw size={13} className={fixing ? "animate-spin" : ""} aria-hidden="true" />
            Direct Admin Fix All ({failures.length})
          </button>
        </div>

        <div className="mt-4 overflow-x-auto">
          <div className="min-w-[900px] overflow-hidden rounded-xl border border-(--border-subtle) bg-(--bg-surface)">
            <div className={`${COLS} bg-(--bg-surface-subtle) px-4 py-2.5 ${mono} text-[9.5px] uppercase tracking-[0.12em] text-(--text-muted)`}>
              <span>Failed document</span>
              <span>Department &amp; manager</span>
              <span>Uploader</span>
              <span>Failure root cause &amp; step</span>
              <span>Status</span>
              <span>Admin governance actions</span>
            </div>

            {failures.map((f) => (
              <div key={f.id} className="border-t border-(--border-subtle)">
                <div className={`${COLS} px-4 py-3.5`}>
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span className={`${mono} grid size-8 shrink-0 place-items-center rounded-lg bg-(--status-failure-bg) text-[9px] font-bold text-(--status-failure)`}>
                      {f.fileType}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-[12.5px] font-bold text-(--text-primary)" title={f.fileName}>{f.fileName}</p>
                      <p className={`${mono} text-[10px] text-(--text-muted)`}>{f.size} • Failed {f.failedAgo}</p>
                    </div>
                  </div>
                  <div>
                    <span className="inline-block rounded-md bg-(--primary-light) px-2 py-0.5 text-[10.5px] font-semibold text-(--accent-chip-text)">{f.department}</span>
                    <p className="mt-1 text-[11.5px] font-semibold text-(--text-primary)">{f.manager}</p>
                  </div>
                  <span className="text-[12px] text-(--text-secondary)">{f.uploader}</span>
                  <div>
                    <p className="text-[11.5px] font-bold leading-snug text-(--status-failure)">{f.cause}</p>
                    <p className={`${mono} mt-0.5 text-[9.5px] text-(--text-muted)`}>{f.step}</p>
                  </div>
                  <span className={`${mono} inline-flex w-fit items-center gap-1.5 rounded-md bg-(--status-failure-bg) px-2 py-0.5 text-[10px] font-bold text-(--status-failure)`}>
                    <span className="size-1.5 animate-pulse rounded-full bg-(--status-failure)" /> Failed
                  </span>
                    <div className="flex flex-nowrap items-center gap-1.5 whitespace-nowrap">                    <button
                      type="button"
                      onClick={() => onNotify(f)}
                      className="inline-flex items-center gap-1 rounded-full border border-(--border-medium) px-2.5 py-1 text-[11px] font-semibold text-(--text-primary) transition hover:border-(--primary) hover:text-(--primary)"
                    >
                      <Mail size={11} aria-hidden="true" /> Notify {f.manager.split(" ")[0]}
                    </button>
                    <button
                      type="button"
                      onClick={() => onFix([f.id])}
                      disabled={fixing}
                      className="inline-flex items-center gap-1 rounded-full bg-(--primary) px-2.5 py-1 text-[11px] font-bold text-(--primary-contrast) transition hover:bg-(--primary-hover) active:scale-95 disabled:opacity-70"
                    >
                      <Zap
                        size={11}
                        className="fill-amber-400 text-amber-400"
                        strokeWidth={1.5}
                        aria-hidden="true"
                    /> Admin Fix
                    </button>
                    <button
                      type="button"
                      onClick={() => setInspectId(inspectId === f.id ? null : f.id)}
                      aria-expanded={inspectId === f.id}
                      className="px-1.5 py-1 text-[11px] font-semibold text-(--text-secondary) transition hover:text-(--primary)"
                    >
                      Inspect →
                    </button>
                  </div>
                </div>

                {inspectId === f.id && (
                  <pre className={`${mono} anl-pop mx-4 mb-3.5 overflow-x-auto rounded-lg bg-(--sidebar-bg) px-4 py-3 text-[11px] leading-relaxed text-(--sidebar-text)`}>
                    {f.log.join("\n")}
                  </pre>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="anl-shimmer" aria-hidden="true" />
    </section>
  );
}