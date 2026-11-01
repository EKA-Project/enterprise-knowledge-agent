// Dev-only check of the mock tables against data-architecture.md section 9.
// Run from frontend/:  npm run validate:mock
// Prints every broken rule and exits with code 1; prints PASS and exits 0 otherwise.
// This file is not part of the app bundle: Vite never imports it.

import { departments } from "../src/data/mock/departments.js";
import { users } from "../src/data/mock/users.js";
import { documents } from "../src/data/mock/documents.js";
import { sections } from "../src/data/mock/sections.js";
import { insights } from "../src/data/mock/insights.js";
import { ingestion } from "../src/data/mock/ingestion.js";
import { bookmarks } from "../src/data/mock/bookmarks.js";
import { related } from "../src/data/mock/related.js";
import { activityEvents } from "../src/data/mock/activityEvents.js";
import { findings } from "../src/data/mock/findings.js";
import { canReadDocument } from "../src/utils/canReadDocument.js";
import { sharedKeywords } from "../src/utils/sharedKeywords.js";

// ── tiny test harness ───────────────────────────────────────────────
let checks = 0;
const problems = [];

/** Records a problem when `condition` is falsy. Never throws, so every problem is reported. */
function check(condition, message) {
  checks += 1;
  if (!condition) problems.push(message);
}

// ── lookups (ids are opaque strings; rows link only by id) ──────────
const userById = new Map(users.map((u) => [u.id, u]));
const deptById = new Map(departments.map((d) => [d.id, d]));
const docById = new Map(documents.map((d) => [d.id, d]));
const secById = new Map(sections.map((s) => [s.id, s]));
const insightByDoc = new Map(insights.map((i) => [i.documentId, i]));

// ── 1. ids are unique within each file ──────────────────────────────
function checkUniqueIds() {
  const byId = { departments, users, documents, sections, activityEvents, findings };
  for (const [name, rows] of Object.entries(byId)) {
    const ids = rows.map((r) => r.id);
    check(new Set(ids).size === ids.length, `${name}: ids must be unique`);
  }
  // These tables are keyed by documentId: exactly one row per document
  for (const [name, rows] of Object.entries({ insights, ingestion })) {
    const ids = rows.map((r) => r.documentId);
    check(new Set(ids).size === ids.length, `${name}: at most one row per document`);
  }
  const pairs = bookmarks.map((b) => `${b.userId}|${b.documentId}`);
  check(new Set(pairs).size === pairs.length, "bookmarks: duplicate (user, document) pair");
}

// ── 2. users and departments ────────────────────────────────────────
function checkUsersAndDepartments() {
  const admins = users.filter((u) => u.role === "admin");
  check(admins.length === 1, `users: exactly one admin required, found ${admins.length}`);

  const emails = users.map((u) => u.email.toLowerCase());
  check(new Set(emails).size === emails.length, "users: emails must be unique (case-insensitive)");

  for (const u of users) {
    check(!("jobTitle" in u), `${u.id}: users have a role only, no job title`);
    if (u.role === "admin") {
      check(u.departmentId === null, `${u.id}: the admin has no department`);
    } else {
      check(deptById.has(u.departmentId), `${u.id}: needs an existing department`);
    }
  }

  const names = departments.map((d) => d.name.toLowerCase());
  const codes = departments.map((d) => d.code);
  check(new Set(names).size === names.length, "departments: names must be unique");
  check(new Set(codes).size === codes.length, "departments: codes must be unique");

  const managerIds = new Set();
  for (const d of departments) {
    check(/^[A-Z]{2,6}$/.test(d.code), `${d.id}: code must be 2 to 6 uppercase letters`);
    const manager = userById.get(d.managerId);
    check(
      manager?.role === "manager" && manager.departmentId === d.id,
      `${d.id}: managerId must be a manager who belongs to this department`
    );
    check(!managerIds.has(d.managerId), `${d.id}: this manager already manages another department`);
    managerIds.add(d.managerId);
    checkDepartmentInsight(d);
  }

  // Every user with the manager role manages their own department
  for (const u of users.filter((x) => x.role === "manager")) {
    check(deptById.get(u.departmentId)?.managerId === u.id, `${u.id}: a manager must be the manager of their department`);
  }
}

function checkDepartmentInsight(dept) {
  const insight = dept.insight;
  if (!insight) return; // never generated: allowed
  if (insight.status === "ready") {
    check(insight.overview && insight.generatedAt, `${dept.id}: a ready insight needs an overview and generatedAt`);
  } else {
    check(insight.overview === null, `${dept.id}: only a ready insight has an overview`);
  }
  // The overview may only be written from documents that every viewer could see
  for (const id of insight.basedOnDocumentIds) {
    const doc = docById.get(id);
    check(
      doc &&
        doc.departmentId === dept.id &&
        doc.visibility === "organization" &&
        !doc.archivedAt &&
        insightByDoc.get(id)?.status === "ready",
      `${dept.id}: basedOnDocumentIds ${id} must be an organization-visible, non-archived document of this department with a ready insight`
    );
  }
}

// ── 3. documents ────────────────────────────────────────────────────
function checkDocuments() {
  const sizeByHash = new Map();
  for (const d of documents) {
    check(deptById.has(d.departmentId), `${d.id}: unknown department`);

    // Only the admin, or the manager of the owning department, uploads
    const uploader = userById.get(d.uploadedById);
    check(
      uploader && (uploader.role === "admin" || (uploader.role === "manager" && uploader.departmentId === d.departmentId)),
      `${d.id}: only the admin or the owning department's manager can upload`
    );
    check(uploader && d.uploadedAt >= uploader.createdAt, `${d.id}: uploaded before the uploader existed`);

    check(["pdf", "docx", "md", "csv", "txt"].includes(d.format), `${d.id}: unknown format ${d.format}`);
    check(["processing", "ready", "failed"].includes(d.status), `${d.id}: unknown status ${d.status}`);
    check(["organization", "department"].includes(d.visibility), `${d.id}: unknown visibility ${d.visibility}`);
    check(d.contentHash.startsWith("sha256:"), `${d.id}: contentHash must start with sha256:`);

    check(d.isPinned === (d.pinnedAt !== null), `${d.id}: isPinned and pinnedAt disagree`);
    check(!d.isProtected || Boolean(d.protectedReason), `${d.id}: a protected document needs protectedReason`);
    if (d.supersededById) {
      check(d.supersededById !== d.id && docById.has(d.supersededById), `${d.id}: supersededById must point at another real document`);
    }

    if (d.status === "ready") {
      check(d.lastIndexedAt !== null && d.chunkCount > 0, `${d.id}: a ready document has chunks and an index date`);
    } else {
      check(
        d.chunkCount === 0 && d.pageCount === null && d.wordCount === null && d.lastIndexedAt === null,
        `${d.id}: a ${d.status} document has zero chunks and null counts and index date`
      );
    }

    // Nothing can happen to a document before it was uploaded
    const afterUpload = {
      updatedAt: d.updatedAt, lastIndexedAt: d.lastIndexedAt,
      lastOpenedAt: d.lastOpenedAt, lastCitedAt: d.lastCitedAt, archivedAt: d.archivedAt,
    };
    for (const [field, value] of Object.entries(afterUpload)) {
      if (value !== null) check(value >= d.uploadedAt, `${d.id}: ${field} is before uploadedAt`);
    }

    // Duplicate detection: the same hash must mean the same file size
    const knownSize = sizeByHash.get(d.contentHash);
    if (knownSize !== undefined) check(knownSize === d.sizeBytes, `${d.id}: same contentHash but different sizeBytes`);
    sizeByHash.set(d.contentHash, d.sizeBytes);
  }
}

// ── 4. sections and insights ────────────────────────────────────────
function checkSectionsAndInsights() {
  const indexesByDoc = new Map();
  for (const s of sections) {
    check(docById.has(s.documentId), `${s.id}: unknown document`);
    check((s.pageStart === null) === (s.pageEnd === null), `${s.id}: pageStart and pageEnd must both be set or both null`);
    if (s.pageStart !== null) check(s.pageEnd >= s.pageStart, `${s.id}: pageEnd is before pageStart`);
    const list = indexesByDoc.get(s.documentId) ?? [];
    list.push(s.index);
    indexesByDoc.set(s.documentId, list);
  }
  for (const [docId, list] of indexesByDoc) {
    const sorted = [...list].sort((a, b) => a - b);
    check(sorted.every((v, i) => v === i + 1), `${docId}: section index must run 1..n with no gaps`);
  }

  for (const ins of insights) {
    const doc = docById.get(ins.documentId);
    check(doc, `insights: unknown document ${ins.documentId}`);
    if (!doc) continue;

    // Pending or failed insights are empty: the UI says "summary is being prepared"
    if (ins.status !== "ready") {
      check(
        ins.summary === null && !ins.takeaways.length && !ins.sectionSummaries.length && !ins.keywords.length && !ins.suggestedQuestions.length,
        `${ins.documentId}: a ${ins.status} insight must be empty`
      );
      continue;
    }

    check(doc.status === "ready", `${ins.documentId}: a ready insight needs a ready document`);
    check(ins.summary && ins.model, `${ins.documentId}: a ready insight needs a summary and a model`);
    check(doc.lastIndexedAt && ins.generatedAt >= doc.lastIndexedAt, `${ins.documentId}: insight generated before the document was indexed`);

    const own = sections.filter((s) => s.documentId === ins.documentId);
    check(own.length > 0, `${ins.documentId}: a ready insight needs sections to cite`);
    const text = own.map((s) => `${s.title} ${s.content}`.toLowerCase()).join(" ");

    // Every AI claim traces to a section of the SAME document
    check(ins.takeaways.length >= 2 && ins.takeaways.length <= 3, `${ins.documentId}: two or three takeaways expected`);
    for (const t of ins.takeaways) {
      check(secById.get(t.sectionId)?.documentId === ins.documentId, `${ins.documentId}: takeaway cites a section of another document`);
    }
    for (const s of ins.sectionSummaries) {
      check(secById.get(s.sectionId)?.documentId === ins.documentId, `${ins.documentId}: section summary cites a section of another document`);
    }
    // Every keyword must be supported by the document's own text
    for (const k of ins.keywords) {
      check(text.includes(k.term.toLowerCase()), `${ins.documentId}: keyword not supported by the text: ${k.term}`);
      check(k.weight >= 0 && k.weight <= 1, `${ins.documentId}: keyword weight must be 0..1: ${k.term}`);
      check(["topic", "entity"].includes(k.kind), `${ins.documentId}: keyword kind must be topic or entity: ${k.term}`);
    }
    check(ins.suggestedQuestions.length > 0, `${ins.documentId}: a ready insight needs suggested questions`);
  }
}

// ── 5. ingestion ────────────────────────────────────────────────────
function checkIngestion() {
  const documentStatusFor = { succeeded: "ready", running: "processing", failed: "failed" };
  for (const doc of documents) {
    check(ingestion.some((r) => r.documentId === doc.id), `${doc.id}: needs exactly one ingestion row`);
  }
  for (const r of ingestion) {
    const doc = docById.get(r.documentId);
    check(doc, `ingestion: unknown document ${r.documentId}`);
    if (!doc) continue;
    check(documentStatusFor[r.status] === doc.status, `${r.documentId}: document status ${doc.status} must follow ingestion status ${r.status}`);

    // The row mirrors its newest attempt
    const last = r.attempts[r.attempts.length - 1];
    check(
      last && last.attempt === r.attempt && last.status === r.status && last.startedAt === r.startedAt && last.finishedAt === r.finishedAt,
      `${r.documentId}: row must match its latest attempt`
    );
    check(r.attempts.every((a, i) => a.attempt === i + 1), `${r.documentId}: attempts must be numbered 1..n`);
    if (r.status === "failed") check(Boolean(r.errorMessage), `${r.documentId}: a failed row needs an errorMessage`);
    else check(r.errorMessage === null, `${r.documentId}: only a failed row carries an errorMessage`);
    if (r.status === "succeeded") check(r.finishedAt === doc.lastIndexedAt, `${r.documentId}: finishedAt must equal the document's lastIndexedAt`);
    if (r.status === "running") check(r.finishedAt === null, `${r.documentId}: a running row has no finishedAt`);
  }
}

// ── 6. bookmarks and related documents ──────────────────────────────
function checkBookmarksAndRelated() {
  for (const b of bookmarks) {
    const user = userById.get(b.userId);
    const doc = docById.get(b.documentId);
    check(user && doc, `bookmarks: ${b.userId} / ${b.documentId} points at a missing row`);
    if (!user || !doc) continue;
    check(canReadDocument(user, doc), `bookmarks: ${b.userId} cannot read ${b.documentId}`);
    check(b.createdAt >= doc.uploadedAt && b.createdAt >= user.createdAt, `bookmarks: ${b.userId} / ${b.documentId} was created before the document or user existed`);
  }

  const scores = new Map();
  for (const r of related) {
    const a = insightByDoc.get(r.documentId);
    const b = insightByDoc.get(r.relatedDocumentId);
    check(r.documentId !== r.relatedDocumentId, `related: ${r.documentId} cannot relate to itself`);
    // Only documents with a ready insight have an embedding
    check(a?.status === "ready" && b?.status === "ready", `related: ${r.documentId} / ${r.relatedDocumentId} needs ready insights`);
    check(r.score > 0 && r.score <= 1, `related: score outside 0..1 for ${r.documentId}`);
    if (a && b) check(sharedKeywords(a, b).length > 0, `related: ${r.documentId} / ${r.relatedDocumentId} share no keyword, so "why related" would be empty`);
    scores.set(`${r.documentId}>${r.relatedDocumentId}`, r.score);
  }
  for (const [key, score] of scores) {
    const [x, y] = key.split(">");
    check(scores.get(`${y}>${x}`) === score, `related: ${key} is not listed symmetrically with the same score`);
  }
}

// ── 7. activity events and findings ─────────────────────────────────
function checkEventsAndFindings() {
  for (const e of activityEvents) {
    const user = userById.get(e.userId);
    check(user, `${e.id}: unknown user`);
    if (!user) continue;
    check(e.occurredAt >= user.createdAt, `${e.id}: event before the user existed`);

    if (e.type === "question_unanswered") {
      check(e.documentId === null, `${e.id}: an unanswered question has no document`);
      check(
        Boolean(e.payload.text) && ["no_results", "low_similarity"].includes(e.payload.reason) && typeof e.payload.bestScore === "number",
        `${e.id}: unanswered payload needs text, reason and bestScore`
      );
      continue;
    }

    const doc = docById.get(e.documentId);
    check(doc, `${e.id}: unknown document`);
    if (!doc) continue;
    check(canReadDocument(user, doc), `${e.id}: ${e.userId} cannot read ${e.documentId}`);
    check(e.occurredAt >= doc.uploadedAt, `${e.id}: event before the document was uploaded`);
    if (e.type === "cited") {
      check(Boolean(e.payload.chunkId), `${e.id}: a cited event needs a chunkId`);
      if (e.payload.sectionId !== null) {
        check(secById.get(e.payload.sectionId)?.documentId === e.documentId, `${e.id}: cited section belongs to another document`);
      }
    }
  }

  // documents.lastOpenedAt / lastCitedAt are plain values here but computed in the
  // database, so they must equal the newest matching event (null = no event at all)
  const newest = (type, docId) =>
    activityEvents.filter((e) => e.type === type && e.documentId === docId).map((e) => e.occurredAt).sort().pop() ?? null;
  for (const d of documents) {
    check(newest("opened", d.id) === d.lastOpenedAt, `${d.id}: lastOpenedAt must equal its newest opened event`);
    check(newest("cited", d.id) === d.lastCitedAt, `${d.id}: lastCitedAt must equal its newest cited event`);
  }

  for (const f of findings) {
    if (f.departmentId) check(deptById.has(f.departmentId), `${f.id}: unknown department`);
    for (const id of f.documentIds) check(docById.has(id), `${f.id}: unknown document ${id}`);

    if (f.kind === "contradiction") {
      check(f.severity !== null, `${f.id}: a contradiction needs a severity`);
      const claims = f.evidence.claims ?? [];
      check(claims.length >= 2, `${f.id}: a contradiction needs at least two claims`);
      for (const c of claims) {
        const section = secById.get(c.sectionId);
        check(section && section.documentId === c.documentId, `${f.id}: claim section is not in its document`);
        check(f.documentIds.includes(c.documentId), `${f.id}: claim document is missing from documentIds`);
        check(section && section.content.includes(c.quote), `${f.id}: quote is not word for word in ${c.sectionId}`);
      }
    } else {
      check(f.severity === null && f.documentIds.length === 0, `${f.id}: a knowledge gap has no severity and no documents`);
      // The numbers must be recomputable from the events, never typed from nowhere
      const asked = activityEvents.filter((e) => e.type === "question_unanswered" && e.payload.text.toLowerCase().includes(f.evidence.topic));
      check(asked.length === f.evidence.questionCount, `${f.id}: questionCount says ${f.evidence.questionCount} but the events say ${asked.length}`);
      check(new Set(asked.map((e) => e.userId)).size === f.evidence.askerCount, `${f.id}: askerCount does not match the events`);
      check(asked.every((e) => e.occurredAt <= f.detectedAt), `${f.id}: detected before its last question`);
    }

    // Open findings have no resolution fields; closed ones need all three
    const resolution = [f.resolvedAt, f.resolvedById, f.resolution];
    if (f.status === "open") check(resolution.every((v) => v === null), `${f.id}: an open finding has no resolution fields`);
    else check(resolution.every((v) => v !== null), `${f.id}: a ${f.status} finding needs resolvedAt, resolvedById and resolution`);
    if (f.resolvedAt) check(f.resolvedAt >= f.detectedAt, `${f.id}: resolved before it was detected`);
    if (f.resolvedById) check(userById.has(f.resolvedById), `${f.id}: unknown resolver`);
  }
}

// ── run everything and report ───────────────────────────────────────
checkUniqueIds();
checkUsersAndDepartments();
checkDocuments();
checkSectionsAndInsights();
checkIngestion();
checkBookmarksAndRelated();
checkEventsAndFindings();

if (problems.length > 0) {
  console.error(`FAIL: ${problems.length} problem(s) in the mock data`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exitCode = 1; // lets CI or a git hook stop on bad data
} else {
  console.log(`PASS: ${checks} checks`);
  console.log(
    `departments ${departments.length} | users ${users.length} | documents ${documents.length} | sections ${sections.length} | insights ${insights.length}`
  );
  console.log(
    `ingestion ${ingestion.length} | bookmarks ${bookmarks.length} | related ${related.length} | events ${activityEvents.length} | findings ${findings.length}`
  );
}