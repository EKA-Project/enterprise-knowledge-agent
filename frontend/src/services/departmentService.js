import { aggregateKeywords } from "../utils/aggregateKeywords.js";
import { canManageDepartments, canReindexCollection } from "../utils/departmentPermissions.js";
import { db, getInsightRow, getReadableActiveDocuments } from "./mockDb.js";
import { clone, delay, nowIso, paginate, ServiceError } from "./mockHelpers.js";
import { MOCK_INGESTION_MS, startIngestionAttempt } from "./mockIngestion.js";
import { getMockCurrentUser } from "./mockSession.js";

// Mock "API" for departments. Shapes: data-architecture.md sections
// 4.1 and 10.2. Counts, staleness and badges are computed on every call and
// never stored (blueprint rule 6). In Phase C only the bodies change.

const COLLECTION_PAGE_SIZE = 3;

// ── derived values ──────────────────────────────────────────────────

// Active members only. The admin has no department, so is never counted.
const countMembers = (departmentId) =>
  db.users.filter((u) => u.departmentId === departmentId && u.status === "active").length;
// The documents a department overview is written from: organization-visible,
// non-archived, with a ready insight. Shared by the staleness check and the
// regeneration, so both always agree. ("ready" means the INSIGHT is ready: we
// agreed this reading of the blueprint in Step 4.)
function getOverviewSources(department) {
  return db.documents.filter(
    (doc) =>
      doc.departmentId === department.id &&
      doc.visibility === "organization" &&
      !doc.archivedAt &&
      getInsightRow(doc.id)?.status === "ready",
  );
}

// Blueprint 10.2 step 9. The overview is stale when the documents it should be
// written from no longer match what it was written from.
// "ready documents" is read as: documents whose insight is ready (we agreed this
// in Step 4), because the overview is written from insights.
function isInsightStale(department) {
  const insight = department.insight;
  if (insight?.status !== "ready") return false; // nothing to be stale yet

  const sources = getOverviewSources(department);
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
// ── writes ──────────────────────────────────────────────────────────
// Every write enforces the permission rules itself; hiding a button in the UI is
// never the real check. A refused write throws a ServiceError (403, 404, 409, 422).

// A new department needs all of these. The manager is NOT among them: a manager
// must belong to the department, and nobody can belong to one that does not exist
// yet, so the admin assigns the manager afterwards with assignManager().
const DEPARTMENT_FIELDS = ["name", "code", "description", "scope", "colorKey", "iconKey"];
const CODE_PATTERN = /^[A-Z]{2,6}$/;

function getDepartmentOrThrow(id) {
  const department = db.departments.find((d) => d.id === id);
  if (!department) throw new ServiceError(404, "Department not found");
  return department;
}

function requireAdmin() {
  if (!canManageDepartments(getMockCurrentUser())) {
    throw new ServiceError(403, "Only the admin can change departments");
  }
}

// A department as the viewer sees it right now (counts and insight computed).
function viewOf(department) {
  return toDepartmentView(department, getReadableActiveDocuments(getMockCurrentUser()), { includeInsight: true });
}

// Trims and validates the fields present in `input` and returns the cleaned
// values. Validates everything BEFORE anything is written, so a bad field never
// leaves a half-applied edit. `ignoreId` lets a department keep its own name/code.
// colorKey and iconKey are not checked here: the frontend validates them against
// config/departmentTheme.js and falls back to a neutral style (blueprint 4.1).
function cleanDepartmentFields(input, ignoreId) {
  const clean = {};
  for (const key of DEPARTMENT_FIELDS) {
    if (!(key in input)) continue;
    const value = String(input[key] ?? "").trim();
    if (!value) throw new ServiceError(422, `${key} cannot be empty`);
    clean[key] = value;
  }

  if ("code" in clean && !CODE_PATTERN.test(clean.code)) {
    throw new ServiceError(422, "code must be 2 to 6 uppercase letters");
  }
  const others = db.departments.filter((d) => d.id !== ignoreId);
  if ("name" in clean && others.some((d) => d.name.toLowerCase() === clean.name.toLowerCase())) {
    throw new ServiceError(409, "A department with this name already exists");
  }
  if ("code" in clean && others.some((d) => d.code === clean.code)) {
    throw new ServiceError(409, "A department with this code already exists");
  }
  return clean;
}

// POST /departments  (admin only)
/**
 * @param {{name: string, code: string, description: string, scope: string, colorKey: string, iconKey: string}} input
 * @returns {Promise<import('../types').Department>}
 */
export async function createDepartment(input = {}) {
  await delay();
  requireAdmin();

  const notAllowed = Object.keys(input).filter((key) => !DEPARTMENT_FIELDS.includes(key));
  if (notAllowed.length > 0) {
    throw new ServiceError(422, `These fields cannot be set at creation: ${notAllowed.join(", ")}`);
  }
  const missing = DEPARTMENT_FIELDS.filter((key) => !(key in input));
  if (missing.length > 0) throw new ServiceError(422, `Missing fields: ${missing.join(", ")}`);
  const fields = cleanDepartmentFields(input, null);

  const now = nowIso();
  /** @type {import('../types').Department} */
  const department = {
    id: `dept_${fields.code.toLowerCase()}`, // opaque to the frontend; the code is unique, so the id is too
    ...fields,
    managerId: null,
    insight: null, // never generated yet
    createdAt: now,
    updatedAt: now,
  };
  db.departments.push(department);
  return viewOf(department);
}

// PATCH /departments/{id}  (admin only)
// Editable: name, code, description, scope, colorKey, iconKey. The manager has its
// own function (assignManager); the insight is written by the system.
/**
 * @param {string} id
 * @param {{name?: string, code?: string, description?: string, scope?: string, colorKey?: string, iconKey?: string}} changes
 * @returns {Promise<import('../types').Department>}
 */
export async function updateDepartment(id, changes) {
  await delay();
  const department = getDepartmentOrThrow(id);
  requireAdmin();

  const keys = Object.keys(changes ?? {});
  if (keys.length === 0) throw new ServiceError(422, "No changes given");
  const notEditable = keys.filter((key) => !DEPARTMENT_FIELDS.includes(key));
  if (notEditable.length > 0) {
    throw new ServiceError(422, `These fields cannot be changed here: ${notEditable.join(", ")}`);
  }

  const clean = cleanDepartmentFields(changes, id);
  Object.assign(department, clean, { updatedAt: nowIso() });
  return viewOf(department);
}

// PUT /departments/{id}/manager  { userId } or { userId: null } to clear  (admin only)
// The manager must exist, have the manager role, belong to THIS department and be
// active. (The blueprint's "does not manage another department" check cannot fail
// once the user must belong to this one.)
/**
 * @param {string} id
 * @param {string|null} userId
 * @returns {Promise<import('../types').Department>}
 */
export async function assignManager(id, userId) {
  await delay();
  const department = getDepartmentOrThrow(id);
  requireAdmin();

  if (userId !== null) {
    const user = db.users.find((u) => u.id === userId);
    if (!user) throw new ServiceError(422, "Unknown user");
    if (user.role !== "manager") throw new ServiceError(422, "Only a user with the manager role can manage a department");
    if (user.departmentId !== id) throw new ServiceError(422, "The manager must belong to this department");
    if (user.status !== "active") throw new ServiceError(422, "An inactive user cannot be a manager");
  }

  if (department.managerId !== userId) {
    department.managerId = userId;
    department.updatedAt = nowIso();
  }
  return viewOf(department);
}

// Departments whose overview is being regenerated right now, so a second call
// during the wait does not start another regeneration.
const regeneratingOverviews = new Set();

// MOCK-ONLY: stands in for the AI that writes the overview. It cannot write new
// text, so it keeps the existing overview and refreshes its sources and date; a
// department with no overview yet gets a sentence built from the top keywords of
// its ready insights (derived from the documents, never invented). In Phase C the
// backend regenerates the overview and none of this exists.
function regenerateOverview(departmentId, previous) {
  regeneratingOverviews.delete(departmentId);
  const department = db.departments.find((d) => d.id === departmentId);
  if (!department) return;

  const sources = getOverviewSources(department);
  if (sources.length === 0) {
    department.insight = previous; // nothing to write from any more: put it back
    return;
  }

  const terms = aggregateKeywords(sources.map((doc) => getInsightRow(doc.id)), 4).map((k) => k.term);
  const kept = previous?.status === "ready" ? previous.overview : null;
  const overview =
    kept ?? (terms.length > 0 ? `${department.name} documents currently cover ${terms.join(", ")}.` : department.description);

  department.insight = {
    status: "ready",
    generatedAt: nowIso(),
    model: "mock-model-v1",
    overview,
    basedOnDocumentIds: sources.map((doc) => doc.id),
  };
}

// Marks the overview "pending" (the badge shows "preparing") and regenerates it
// after the documents' mock ingestion has had time to finish. A department with
// nothing to write from is left exactly as it is.
function scheduleOverviewRegeneration(departmentId) {
  const department = db.departments.find((d) => d.id === departmentId);
  if (regeneratingOverviews.has(departmentId) || getOverviewSources(department).length === 0) return;

  regeneratingOverviews.add(departmentId);
  const previous = department.insight;
  department.insight = {
    status: "pending",
    generatedAt: null,
    model: previous?.model ?? null,
    overview: null,
    basedOnDocumentIds: [],
  };
  setTimeout(() => regenerateOverview(departmentId, previous), MOCK_INGESTION_MS + 100);
}

// POST /departments/{id}/reindex  (admin, or that department's manager)
// Starts a new attempt on each non-archived document's ingestion row, then
// regenerates the overview. Documents already being indexed are skipped.
/** @returns {Promise<{id: string, documentsQueued: number, documentsSkipped: number}>} */
export async function reindexCollection(id) {
  await delay();
  getDepartmentOrThrow(id);
  if (!canReindexCollection(getMockCurrentUser(), id)) {
    throw new ServiceError(403, "You are not allowed to re-index this collection");
  }

  const active = db.documents.filter((doc) => doc.departmentId === id && !doc.archivedAt);
  const queued = active.filter((doc) => doc.status !== "processing");
  for (const doc of queued) startIngestionAttempt(doc.id);

  scheduleOverviewRegeneration(id);
  return { id, documentsQueued: queued.length, documentsSkipped: active.length - queued.length };
}