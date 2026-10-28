import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RefreshCw, Shield, Zap } from "lucide-react";
import "../styles/analytics.css";
import HealthMetricsRow from "../components/analytics/HealthMetricsRow";
import IngestionAuditPanel from "../components/analytics/IngestionAuditPanel";
import ContradictionCard from "../components/analytics/ContradictionCard";
import AuditDistributionSection from "../components/analytics/AuditDistributionSection";
import KnowledgeGapSection from "../components/analytics/KnowledgeGapSection";
import SentimentCard from "../components/analytics/SentimentCard";
import DocumentMatrix from "../components/analytics/DocumentMatrix";
import UsageSummary from "../components/analytics/UsageSummary";
import ToastStack from "../components/common/Toast";
import {
  INGEST_CATEGORIES, INITIAL_CONTRADICTIONS, INITIAL_FAILURES, METRICS_BY_RANGE,
  RANGE_OPTIONS, buildReportCsv,
} from "../components/analytics/AnalyticsData";

// AnalyticsPage component for displaying knowledge analytics, ingestion failures, contradictions, and usage summary
export default function AnalyticsPage() {
  const navigate = useNavigate();
  const [range, setRange] = useState("30d");
  const [failures, setFailures] = useState(INITIAL_FAILURES);
  const [fixing, setFixing] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [contradictions, setContradictions] = useState(() =>
    INITIAL_CONTRADICTIONS.map((c) => ({ ...c, resolved: false })),
  );
  const [toasts, setToasts] = useState([]);
  const [upload, setUpload] = useState(null); // null = closed, otherwise { title, category }
  const toastId = useRef(0);
  const timers = useRef([]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);
  // ↑ Clears waiting timers if the page is closed.

  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));

  const pushToast = useCallback((message, tone = "info") => {
    toastId.current += 1;
    setToasts((prev) => [...prev.slice(-2), { id: toastId.current, message, tone }]);
  }, []);
  const dismissToast = useCallback((id) => setToasts((prev) => prev.filter((t) => t.id !== id)), []);

  const metrics = METRICS_BY_RANGE[range];
  const alertCount = contradictions.filter((c) => !c.resolved).length;

  // ---- Ingestion failures ----
  const fixFailures = (ids) => {
    if (fixing) return;
    const n = ids.length;
    setFixing(true);
    pushToast(`[Admin Batch Fix] Re-indexing ${n} failed vector embedding${n === 1 ? "" : "s"} across all departments…`);
    later(() => {
      setFailures((prev) => prev.filter((f) => !ids.includes(f.id)));
      setFixing(false);
      pushToast(`[Admin Batch Success] All ${n} department document${n === 1 ? "" : "s"} successfully vectorized!`, "success");
    }, 1800);
  };

  const runScan = () => {
    if (scanning) return;
    setScanning(true);
    pushToast("Audit scan started for 148,920 chunks…");
    later(() => {
      setScanning(false);
      pushToast("Audit scan finished (demo data)", "success");
    }, 2200);
  };

  // ---- Contradictions ----
  const resolveOne = (id) => {
    setContradictions((prev) => prev.map((c) => (c.id === id ? { ...c, resolved: true } : c)));
    pushToast("Conflicting snippet resolved", "success");
  };
  const resolveAll = () => {
    setContradictions((prev) => prev.map((c) => ({ ...c, resolved: true })));
    pushToast("Reconciled conflicting documents", "success");
  };

  // ---- Export (real CSV download, no backend) ----
  const exportReport = () => {
    const csv = buildReportCsv({ range, metrics, alertCount });
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `eka-analytics-${range}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    pushToast(`Report exported as eka-analytics-${range}.csv`, "success");
  };

  // ---- Ingest modal ----
  const openUpload = (row) => setUpload({ title: row?.query ?? "", category: row?.cluster ?? INGEST_CATEGORIES[0] });
  const closeUpload = useCallback(() => setUpload(null), []);
  const submitUpload = ({ title }) => {
    setUpload(null);
    pushToast(`Vector ingestion queued for “${title}” (demo, no file sent)`, "success");
  };
// Render the AnalyticsPage component with various sections and modals for knowledge analytics
  return (
    <div className="analytics-page mx-auto w-full max-w-6xl space-y-6">
      <header className="anl-rise flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="font-(family-name:--font-mono) text-[10.5px] font-medium uppercase tracking-[0.18em] text-(--text-eyebrow)">
            Enterprise knowledge telemetry
          </p>
          <h2 className="mt-2 font-(family-name:--font-serif) text-[48px] font-bold leading-none tracking-tight text-(--text-primary)">
            Knowledge Analytics.
          </h2>
          <p className="mt-3 max-w-[52ch] text-[13px] leading-relaxed text-(--text-secondary)">
            Comprehensive audit metrics, grounding accuracy telemetry, cross-document discrepancy detection, and ungrounded query gap analysis.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div role="group" aria-label="Time range" className="inline-flex rounded-full border border-(--border-subtle-nav) bg-(--bg-surface-subtle) p-0.5">
            {RANGE_OPTIONS.map((o) => (
              <button
                key={o.id}
                type="button"
                aria-pressed={range === o.id}
                onClick={() => setRange(o.id)}
                className={`rounded-full px-3 py-1 text-[11.5px] font-semibold transition ${
                  range === o.id ? "bg-(--text-primary) text-white" : "text-(--text-muted) hover:text-(--primary)"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={runScan}
            disabled={scanning}
            className="inline-flex items-center gap-1.5 rounded-full border border-(--border-subtle-nav) bg-(--bg-surface) px-3.5 py-1.5 text-[12px] font-semibold text-(--text-primary) transition hover:border-(--primary) hover:text-(--primary) active:scale-95"
          >
            {scanning ? <RefreshCw size={12} className="animate-spin" aria-hidden="true" /> : 
            <Zap
                size={12}
                className="fill-amber-400 text-amber-400"
                strokeWidth={1.5}
                aria-hidden="true"
            />}
            Run Audit
          </button>
          <button
            type="button"
            onClick={exportReport}
            className="rounded-full bg-(--text-primary) px-4 py-1.5 text-[12px] font-bold text-white transition hover:bg-(--primary) active:scale-95"
          >
            Export Report ↗
          </button>
        </div>
      </header>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 font-(family-name:--font-serif) text-[17px] font-bold text-(--text-primary)">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            className="shrink-0"
            aria-hidden="true"
        >
        <path
          d="M12 2.5 20 5.5v6.2c0 5-3.4 8.4-8 10.3-4.6-1.9-8-5.3-8-10.3V5.5L12 2.5Z"
          fill="#38bdf8"
        />
        <path
          d="M12 2.5 20 5.5v6.2c0 5-3.4 8.4-8 10.3V2.5Z"
          fill="#0a75aa"
        />
        <path
          d="M12 2.5 20 5.5v9.2c-1.2 2.8-3.8 4.5-8 6.3-4.6-1.9-8-5.3-8-10.3V5.5L12 2.5Z"
          fill="none"
          stroke="#0a75aa"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        </svg> Knowledge Health &amp; Grounding Integrity
        </h3>
        <p className="text-[11.5px] text-(--text-muted)">
          Audit Status: <span className="font-bold text-(--text-primary)">Active &amp; Guarded</span>
        </p>
      </div>

      <HealthMetricsRow metrics={metrics} alertCount={alertCount} />

      <IngestionAuditPanel
        failures={failures}
        fixing={fixing}
        scanning={scanning}
        onFixAll={() => fixFailures(failures.map((f) => f.id))}
        onFix={fixFailures}
        onNotify={(f) => pushToast(`Notification sent to ${f.manager} (demo)`)}
        onScan={runScan}
      />

      <ContradictionCard items={contradictions} onResolve={resolveOne} onAutoResolve={resolveAll} />

      <AuditDistributionSection />

      <KnowledgeGapSection onIngest={openUpload} />

      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[2fr_3fr]">
        <SentimentCard />
        <DocumentMatrix />
      </div>

      <UsageSummary onViewUsage={() => navigate("/organization")} />

      {upload && (
        <DocumentUploadModal
          initialTitle={upload.title}
          initialCategory={upload.category}
          categories={INGEST_CATEGORIES}
          onClose={closeUpload}
          onSubmit={submitUpload}
        />
      )}

      <ToastStack toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}