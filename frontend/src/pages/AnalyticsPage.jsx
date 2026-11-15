import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/analytics.css";
import PageHero from "../components/common/PageHero";
import HealthMetricsRow from "../components/analytics/HealthMetricsRow";
import IngestionAuditPanel from "../components/analytics/IngestionAuditPanel";
import ContradictionCard from "../components/analytics/ContradictionCard";
import AuditDistributionSection from "../components/analytics/AuditDistributionSection";
import KnowledgeGapSection from "../components/analytics/KnowledgeGapSection";
import DocumentMatrix from "../components/analytics/DocumentMatrix";
import UsageSummary from "../components/analytics/UsageSummary";
import useToast from "../hooks/useToast.js";
import {
  INGEST_CATEGORIES, RANGE_OPTIONS, buildReportCsv, toAnalyticsView,
} from "../components/analytics/AnalyticsData";
import useApi from "../hooks/useApi.js";
import { getDepartments } from "../services/departmentService.js";
import { getCurrentUser, getUsers } from "../services/userService.js";
import { getDocuments, getIngestion, reindexDocument } from "../services/documentService.js";
import { canViewAnalytics, getAnalyticsSummary, getFindings, resolveFinding } from "../services/analyticsService.js";

// AnalyticsPage component for displaying knowledge analytics, ingestion failures, contradictions, and usage summary
export default function AnalyticsPage() {
  const navigate = useNavigate();
  const [range, setRange] = useState("30d");
  const [fixing, setFixing] = useState(false);
  const [upload, setUpload] = useState(null); // null = closed, otherwise { title, category }

  // Everything comes from the services. useApi fetches again when the role or the
  // range changes, and reload() re-reads after a write.
  const { data, loading, error, reload } = useApi(async () => {
    const user = await getCurrentUser();
    if (!canViewAnalytics(user)) return { noAccess: true };

    const { total } = await getDocuments({ limit: 1 }); // getDocuments pages its results
    const [departments, users, documentList, findings, summary] = await Promise.all([
      getDepartments(),
      getUsers(),
      getDocuments({ limit: Math.max(total, 1) }),
      getFindings(),
      getAnalyticsSummary(range),
    ]);
    const documents = documentList.items;
    const failedDocuments = documents.filter((doc) => doc.status === "failed");
    const ingestions = await Promise.all(failedDocuments.map((doc) => getIngestion(doc.id)));
    return { departments, users, documents, findings, summary, failedDocuments, ingestions };
  }, [range]);
  const view = useMemo(() => (data && !data.noAccess ? toAnalyticsView(data) : null), [data]);

   const toast = useToast();
  const pushToast = useCallback(
    (message, tone = "info") => {
      const type = tone === "success" || tone === "error" ? tone : "info";
      toast[type](message);
    },
    [toast],
  );

  // ---- Ingestion failures ----
  const fixFailures = async (ids) => {
    if (fixing) return;
    const n = ids.length;
    setFixing(true);
    pushToast(`[Admin Batch Fix] Re-indexing ${n} failed document${n === 1 ? "" : "s"}…`);
    try {
      await Promise.all(ids.map((id) => reindexDocument(id)));
      reload();
      pushToast(`[Admin Batch Success] ${n} document${n === 1 ? "" : "s"} sent for re-indexing`, "success");
    } catch (e) {
      pushToast(e.message, "error"); // 403 when the role may not change this document
    } finally {
      setFixing(false);
    }
  };

  // ---- Contradictions ----
  const resolveOne = async (id) => {
    try {
      await resolveFinding(id, "superseded_document");
      reload();
      pushToast("Older document deprecated and finding resolved", "success");
    } catch (e) {
      pushToast(e.message, "error");
    }
  };
  // ---- Export (real CSV download, no backend) ----
  const exportReport = () => {
    const csv = buildReportCsv({ range, alertCount, totalCitations, scannedChunks, usageStats });
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
    if (loading) return <p className="p-6 text-(--text-muted)">Loading analytics…</p>;
  if (error) return <p className="p-6 text-(--status-danger)">Could not load: {error.message}</p>;
  if (data.noAccess) {
    return <p className="p-6 text-(--text-muted)">Analytics is available to administrators and department managers.</p>;
  }
  const {
    failures, contradictions, alertCount, scannedChunks, totalCitations, knowledgeMass, monthlyConflicts,
    gapStats, gapQueries, gapDistribution, matrixRows, usageStats,
  } = view;
// Render the AnalyticsPage component with various sections and modals for knowledge analytics
  return (
    <div className="analytics-page mx-auto w-full max-w-6xl space-y-6">
            <div className="anl-rise">
        <PageHero
          eyebrow="Enterprise knowledge telemetry"
          title="Knowledge Analytics."
          description="Comprehensive audit metrics, grounding accuracy telemetry, cross-document discrepancy detection, and ungrounded query gap analysis."
          actions={
            <>
              <div role="group" aria-label="Time range" className="inline-flex rounded-full border border-(--border-subtle-nav) bg-(--bg-surface-subtle) p-0.5">
                {RANGE_OPTIONS.map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    aria-pressed={range === o.id}
                    onClick={() => setRange(o.id)}
                    className={`rounded-full px-2 py-0.5 text-[11.5px] font-semibold transition ${
                      range === o.id ? "bg-(--text-primary) text-(--primary-contrast)" : "text-(--text-muted) hover:text-(--primary)"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={exportReport}
                className="rounded-full bg-(--text-primary) px-2 py-0.5 text-[12px] font-bold text-(--primary-contrast) transition hover:bg-(--primary) active:scale-95"
              >
                Export Report ↗
              </button>
            </>
          }
        />
      </div>

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

      <HealthMetricsRow alertCount={alertCount} />
      <IngestionAuditPanel
        failures={failures}
        fixing={fixing}
        onFixAll={() => fixFailures(failures.map((f) => f.id))}
        onFix={fixFailures}
        onNotify={(f) => pushToast(`Notification sent to ${f.manager} (demo)`)}
      />

      <ContradictionCard items={contradictions} scannedChunks={scannedChunks} onResolve={resolveOne} />
      <AuditDistributionSection monthlyConflicts={monthlyConflicts} knowledgeMass={knowledgeMass} totalCitations={totalCitations} />
      <KnowledgeGapSection onIngest={openUpload} gapStats={gapStats} gapDistribution={gapDistribution} gapQueries={gapQueries} />
      <DocumentMatrix documents={matrixRows}/>

      <UsageSummary usageStats={usageStats} onViewUsage={() => navigate("/organization")} />
      {upload && (
        <DocumentUploadModal
          initialTitle={upload.title}
          initialCategory={upload.category}
          categories={INGEST_CATEGORIES}
          onClose={closeUpload}
          onSubmit={submitUpload}
        />
      )}
    </div>
  );
}