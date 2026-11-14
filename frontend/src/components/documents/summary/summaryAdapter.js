// src/components/documents/summary/summaryAdapter.js  (NEW FILE)
//
// Drop-in replacement for getDocumentSummary(id) of summaryService.js, backed by the shared
// services. The Summary page changes ONE import line; the Summary components stay untouched.
// Returns null when the document does not exist or the viewer may not read it (the page then
// shows "Document not found"). Archived documents open for the admin and that department's manager.

import * as legacy from './summaryService'; // only for SAMPLE_PDF, remove with summaryService.js
import { getDocument, getDocumentInsight, getDocumentSections, getRelatedDocuments } from '../../../services/documentService.js';
import { getMyBookmarks } from '../../../services/bookmarkService.js';
import { getDepartments } from '../../../services/departmentService.js';
import { getUsers } from '../../../services/userService.js';
import { formatFileSize } from '../../../utils/formatFileSize.js'; // CHECK: export name
import { estimateReadTime } from '../../../utils/estimateReadTime.js'; // CHECK: export name
import { buildSummary } from './summaryMapping.js';

export async function getDocumentSummary(id) {
  const doc = await getDocument(id);
  if (!doc) return null;

  const [insight, sections, related, bookmarks, departments, users] = await Promise.all([
    getDocumentInsight(id),
    getDocumentSections(id),
    getRelatedDocuments(id),
    getMyBookmarks(),
    getDepartments(),
    getUsers(),
  ]);

  return buildSummary({
    doc,
    insight,
    sections,
    related,
    departmentNames: new Map(departments.map((d) => [d.id, d.name])),
    userNames: new Map(users.map((u) => [u.id, u.name])),
    bookmarkedIds: new Set(bookmarks.map((b) => b.documentId)),
    helpers: { formatFileSize, estimateReadTime },
    pdfUrl: legacy.SAMPLE_PDF ?? null, // CHECK: the file URL has no service yet
  });
}