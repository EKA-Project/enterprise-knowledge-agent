import { aggregateKeywords } from "../utils/aggregateKeywords.js";
import { db, getInsightRow, getReadableActiveDocuments } from "./mockDb.js";
import { clone, delay, paginate } from "./mockHelpers.js";
import { getMockCurrentUser } from "./mockSession.js";

// Mock "API" for departments (read side). Shapes: data-architecture.md sections
// 4.1 and 10.2. Counts, staleness and badges are computed on every call and
// never stored (blueprint rule 6). In Phase C only the bodies change.

const COLLECTION_PAGE_SIZE = 3;

// ── derived values ──────────────────────────────────────────────────

// Active members only. The admin has no department, so is never counted.
const countMembers = (departmentId) =>
  db.users.filter((u) => u.departmentId === departmentId && u.status === "active").length;

// Blueprint 10.2 step 9. The overview is stale when the documents it should be
// written from no longer match what it was written from.
// "ready documents" is read as: documents whose insight is ready (we agreed this
// in Step 4), because the overview is written from insights.
function isInsightStale(department) {
  const insight = department.insight;
  if (insight?.status !== "ready") return false; // nothing to be stale yet

  const sources = db.documents.filter(
    (doc) =>
      doc.departmentId === department.id &&
      doc.visibility === "organization" &&
      !doc.archivedAt &&
      getInsightRow(doc.id)?.status === "ready",
  );
  const sourceIds = new Set(sources.map((doc) => doc.id));
  const sameSources =
    sourceIds.size === insight.basedOnDocumentIds.length &&
    insight.basedOnDocumentIds.every((id) => sourceIds.has(id));
  const editedSinceGenerated = sources.some((doc) => doc.updatedAt > insight.generatedAt);

  return !sameSources || editedSinceGenerated;
}

// The stored insight plus the read-only isStale key the API adds.
function withStaleness(department) {
  if (!department.insight) return null;
  return { ...department.insight, isStale: isInsightStale(department) };
}

// Blueprint 10.2 step 10. null means "show no badge".
function getBadge(insight) {
  if (!insight) return null;
  if (insight.status === "pending") return "preparing";
  if (insight.status === "ready") return insight.isStale ? "outdated" : "live";
  return null; // failed
}

// A department as the API returns it: stored fields plus the computed counts.
// documentCount is PER VIEWER (documents this user may read), so the card always
// agrees with the Collection modal's activeDocumentCount.
function toDepartmentView(department, readableDocuments, { includeInsight }) {
  const { insight: _storedInsight, ...fields } = department;
  const view = {
    ...fields,
    documentCount: readableDocuments.filter((doc) => doc.departmentId === department.id).length,
    memberCount: countMembers(department.id),
  };
  if (includeInsight) view.insight = withStaleness(department);
  return clone(view);
}

// ── requests ────────────────────────────────────────────────────────

// GET /departments (the list carries no insight)
/** @returns {Promise<import('../types').Department[]>} */
export async function getDepartments() {
  await delay();
  const readable = getReadableActiveDocuments(getMockCurrentUser());
  return db.departments.map((dept) => toDepartmentView(dept, readable, { includeInsight: false }));
}

// GET /departments/{id} (includes the insight; null when the id does not exist)
/** @returns {Promise<import('../types').Department|null>} */
export async function getDepartment(id) {
  await delay();
  const department = db.departments.find((d) => d.id === id);
  if (!department) return null;
  const readable = getReadableActiveDocuments(getMockCurrentUser());
  return toDepartmentView(department, readable, { includeInsight: true });
}

// GET /departments/{id}/collection?limit=&offset=
// Builds the whole Collection Insights modal. Every step uses only the
// documents the VIEWER may read, so nothing leaks (blueprint 10.2, steps 1 to 11).
/**
 * @param {string} id
 * @param {{limit?: number, offset?: number}} [paging]
 * @returns {Promise<import('../types').DepartmentCollection|null>}
 */
export async function getCollection(id, { limit = COLLECTION_PAGE_SIZE, offset = 0 } = {}) {
  await delay();
  const department = db.departments.find((d) => d.id === id);
  if (!department) return null;

  // Steps 1 and 4: the viewer's visible set, newest first (ties broken by id)
  const visible = getReadableActiveDocuments(getMockCurrentUser())
    .filter((doc) => doc.departmentId === id)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt) || a.id.localeCompare(b.id));

  // Step 7: weights add up across READY insights of the visible set
  const readyInsights = visible
    .map((doc) => getInsightRow(doc.id))
    .filter((insight) => insight?.status === "ready");

  // Step 8: first suggested question of each ready insight, in list order,
  // first 3 distinct
  const samplePrompts = [];
  for (const insight of readyInsights) {
    const question = insight.suggestedQuestions[0];
    if (question && !samplePrompts.includes(question)) samplePrompts.push(question);
    if (samplePrompts.length === 3) break;
  }

  // Steps 5 and 6, only for the requested page
  const page = paginate(visible, limit, offset);
  page.items = page.items.map((doc) => {
    const uploader = db.users.find((u) => u.id === doc.uploadedById);
    const insight = getInsightRow(doc.id);
    return {
      document: doc,
      uploader: { id: uploader.id, name: uploader.name },
      topTakeaways: insight?.status === "ready" ? insight.takeaways.slice(0, 2).map((t) => t.text) : [],
    };
  });

  const manager = db.users.find((u) => u.id === department.managerId);
  const insight = withStaleness(department);

  return clone({
    department: { id: department.id, name: department.name, description: department.description },
    lead: manager ? { id: manager.id, name: manager.name } : null, // step 3
    activeDocumentCount: visible.length, // step 2
    insight,
    badge: getBadge(insight), // step 10
    overview: insight?.status === "ready" ? insight.overview : department.description, // step 11
    documents: page,
    keywords: aggregateKeywords(readyInsights, 6),
    samplePrompts,
  });
}