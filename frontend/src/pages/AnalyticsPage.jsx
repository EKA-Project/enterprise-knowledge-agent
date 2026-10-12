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

}