// @ts-check
// MOCK TABLE: bookmarks. Disposable: deleted when the API is live.
// Shape: data-architecture.md section 4.6. Bookmarks are per user, never a
// field on the document. A user may only bookmark documents they can read.
// Only bookmarkService reads this file.

/** @type {import('../../types').Bookmark[]} */
export const bookmarks = [
  // Alex Morgan (ENG employee); doc_014 is ENG-only, which Alex can read
  { userId: "usr_005", documentId: "doc_001", createdAt: "2026-10-14T09:00:00Z" },
  { userId: "usr_005", documentId: "doc_007", createdAt: "2026-10-12T10:00:00Z" },
  { userId: "usr_005", documentId: "doc_009", createdAt: "2026-10-03T10:00:00Z" },
  { userId: "usr_005", documentId: "doc_014", createdAt: "2026-10-01T10:00:00Z" },
  { userId: "usr_005", documentId: "doc_003", createdAt: "2026-09-10T10:00:00Z" },
  // Rachel Green (ENG manager)
  { userId: "usr_003", documentId: "doc_001", createdAt: "2026-10-13T09:00:00Z" },
  { userId: "usr_003", documentId: "doc_021", createdAt: "2026-10-02T09:00:00Z" },
  // Priya Nair (HR manager)
  { userId: "usr_002", documentId: "doc_001", createdAt: "2026-10-12T09:00:00Z" },
  { userId: "usr_002", documentId: "doc_015", createdAt: "2026-10-09T09:00:00Z" },
  { userId: "usr_002", documentId: "doc_003", createdAt: "2026-09-03T09:00:00Z" },
  // Maya Narang (admin)
  { userId: "usr_001", documentId: "doc_001", createdAt: "2026-10-18T09:00:00Z" },
  { userId: "usr_001", documentId: "doc_012", createdAt: "2026-10-02T09:00:00Z" },
  // Tom Reyes (HR employee)
  { userId: "usr_011", documentId: "doc_003", createdAt: "2026-09-15T09:00:00Z" },
  { userId: "usr_011", documentId: "doc_015", createdAt: "2026-10-11T09:00:00Z" },
  // Leo Fischer (PROD employee)
  { userId: "usr_013", documentId: "doc_019", createdAt: "2026-10-15T09:00:00Z" },
  { userId: "usr_013", documentId: "doc_018", createdAt: "2026-06-01T09:00:00Z" },
  // Omar Haddad (SEC employee); doc_022 is SEC-only, which Omar can read
  { userId: "usr_015", documentId: "doc_021", createdAt: "2026-04-01T09:00:00Z" },
  { userId: "usr_015", documentId: "doc_022", createdAt: "2026-06-02T09:00:00Z" },
];