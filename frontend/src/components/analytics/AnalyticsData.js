import { getDepartmentTheme } from "../../config/departmentTheme.js";
import { formatFileSize } from "../../utils/formatFileSize.js";
import { formatRelativeTime } from "../../utils/formatRelativeTime.js";

// Mock data for the Analytics page. Replace with API data later.

export const RANGE_OPTIONS = [
  { id: "7d", label: "7 Days" },
  { id: "30d", label: "30 Days" },
  { id: "90d", label: "90 Days" },
];

export const INGEST_CATEGORIES = [
  "Engineering & DevOps",
  "People & HR Operations",
  "Security & Compliance",
  "Product & Strategy",
  "Legal & Compliance",
];
// Builds the CSV text used by the Export Report button.
export function buildReportCsv({ range, alertCount, totalCitations, scannedChunks, usageStats }) {
  const rows = [
    ["Metric", "Value"],
    ["Range", range],
    ["Contradictions flagged", alertCount],
    ["Total citations", totalCitations],
    ["Scanned chunks", scannedChunks],
    ...usageStats.map((s) => [s.label, s.value]),
  ];
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}

// ===================  FROM SERVICE DATA TO WHAT THE CARDS READ  ===================
// The cards keep reading the field names they always did. Wording comes from these
// maps, keyed by the stored values, never typed into rows.

const NO_NAME = "Unassigned";
const INGESTION_STEPS = { extraction: "Text Extraction", chunking: "Chunking", embedding: "Vector Embeddings", indexing: "Indexing" };
const SEVERITY_LABELS = { low: "Low", medium: "Medium", high: "High" };
const CLAIM_WORDS = { lead: "states", middle: "while", verb: "states" };
const GAP_ACTION_LABEL = "+ Ingest Source";
const TONE_CLASSES = { failure: "text-(--status-failure)", warning: "text-(--status-warning)", neutral: "text-(--text-primary)" };
const MONTH_FORMAT = new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "UTC" });

/**
 * One call builds everything the Analytics cards show.
 * Input: what AnalyticsPage loads from the services.
 */
export function toAnalyticsView({ departments, users, documents, findings, summary, failedDocuments, ingestions }) {
  const departmentById = new Map(departments.map((d) => [d.id, d]));
  const userById = new Map(users.map((u) => [u.id, u]));
  const documentById = new Map(documents.map((d) => [d.id, d]));
  const titleOf = (id) => documentById.get(id)?.title ?? id;
  const uploadedAtOf = (id) => documentById.get(id)?.uploadedAt ?? "";
  const managerOf = (departmentId) =>
    userById.get(departmentById.get(departmentId)?.managerId)?.name ?? NO_NAME;

  // ---- Ingestion failures: documents with status "failed" plus their ingestion row ----
  const stepNames = Object.keys(INGESTION_STEPS);
  const failures = failedDocuments.map((doc, i) => {
    const run = ingestions[i];
    const stepIndex = stepNames.indexOf(run?.step);
    return {
      id: doc.id,
      fileName: doc.fileName,
      fileType: doc.format.toUpperCase(),
      size: formatFileSize(doc.sizeBytes),
      failedAgo: formatRelativeTime(run?.finishedAt) ?? "recently",
      department: departmentById.get(doc.departmentId)?.name ?? "",
      manager: managerOf(doc.departmentId),
      uploader: userById.get(doc.uploadedById)?.name ?? "",
      cause: run?.errorMessage ?? "",
      step: stepIndex < 0 ? "" : `Step ${stepIndex + 1}/${stepNames.length}: ${INGESTION_STEPS[run.step]}`,
      log: (run?.attempts ?? []).map(
        (a) => `attempt ${a.attempt}  ${a.step}  ${a.status}${a.errorMessage ? ` (${a.errorMessage})` : ""}`,
      ),
    };
  });

  // ---- Contradictions: the older document's quote first, the newer one second ----
  const contradictions = findings
    .filter((f) => f.kind === "contradiction")
    .map((f) => {
      const claims = [...f.evidence.claims].sort((a, b) => uploadedAtOf(a.documentId).localeCompare(uploadedAtOf(b.documentId)));
      const older = claims[0];
      const newer = claims[claims.length - 1];
      return {
        id: f.id,
        title: f.title,
        severity: SEVERITY_LABELS[f.severity],
        sourceA: titleOf(older.documentId),
        lead: CLAIM_WORDS.lead,
        valueA: older.quote,
        middle: CLAIM_WORDS.middle,
        sourceB: titleOf(newer.documentId),
        verb: CLAIM_WORDS.verb,
        valueB: newer.quote,
        affects: documentById.get(newer.documentId)?.fileName ?? titleOf(newer.documentId),
        action: `Deprecate “${titleOf(older.documentId)}”`,
        manager: managerOf(f.departmentId),
        resolved: f.status !== "open",
      };
    });
  const alertCount = contradictions.filter((c) => !c.resolved).length;

  // ---- Knowledge gaps: open gap findings (topics and counts, never raw questions) ----
  const openGaps = findings.filter((f) => f.kind === "knowledge_gap" && f.status === "open");
  const gapQueries = openGaps.map((f) => ({
    id: f.id,
    query: f.evidence.topic,
    sub: f.title,
    volume: f.evidence.questionCount,
    status: `${f.evidence.askerCount} ${f.evidence.askerCount === 1 ? "asker" : "askers"}`,
    tone: "failure",
    cluster: departmentById.get(f.departmentId)?.name ?? "",
    action: GAP_ACTION_LABEL,
  }));
  const gapStats = [
    { label: "Unanswered queries", value: summary.gaps.unanswered, note: "No source found", tone: TONE_CLASSES.failure },
    { label: "Low-confidence queries", value: summary.gaps.lowSimilarity, note: "Low similarity", tone: TONE_CLASSES.warning },
    { label: "Missing knowledge topics", value: openGaps.length, note: "Recurring gaps", tone: TONE_CLASSES.neutral },
  ];
  const gapDistribution = departments
    .map((d) => ({
      id: d.id,
      label: d.name,
      value: openGaps.filter((f) => f.departmentId === d.id).length,
      color: getDepartmentTheme(d.colorKey, d.iconKey).color,
    }))
    .filter((g) => g.value > 0);

  // ---- Citations by department, and the audit-conflicts bars ----
  const totalCitations = summary.citations.total;
  const knowledgeMass = summary.citations.byDepartment
    .filter((c) => c.count > 0)
    .map((c) => {
      const department = departmentById.get(c.departmentId);
      return {
        id: c.departmentId,
        label: department?.name ?? c.departmentId,
        count: c.count,
        value: Math.round((c.count / totalCitations) * 100),
        color: getDepartmentTheme(department?.colorKey, department?.iconKey).color,
      };
    });
  const monthlyConflicts = summary.conflictsByMonth.map((m) => ({
    label: MONTH_FORMAT.format(new Date(`${m.month}-01T00:00:00Z`)),
    value: m.count,
  }));

  // ---- Document matrix: most cited first ----
  const citedByDocument = new Map(summary.citations.byDocument.map((c) => [c.documentId, c.count]));
  const matrixRows = documents
    .map((doc) => ({
      id: doc.id,
      type: doc.format.toUpperCase(),
      name: doc.title,
      owner: doc.authorName ?? userById.get(doc.uploadedById)?.name ?? "",
      category: departmentById.get(doc.departmentId)?.name ?? "",
      chunks: doc.chunkCount,
      cited: citedByDocument.get(doc.id) ?? 0,
    }))
    .sort((a, b) => b.cited - a.cited || a.name.localeCompare(b.name));

const usageStats = [
  {
    label: "Active Members",
    value: summary.usage.activeMembers.toLocaleString(),
  },
  {
    label: "Documents Cited",
    value: summary.usage.documentsCited.toLocaleString(),
  },
];

  return {
    failures, contradictions, alertCount, scannedChunks: summary.scannedChunks,
    totalCitations, knowledgeMass, monthlyConflicts,
    gapStats, gapQueries, gapDistribution, matrixRows, usageStats,
  };
}