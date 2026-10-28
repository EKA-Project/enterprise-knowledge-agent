// @ts-check
// MOCK TABLE: activity_events. Disposable: deleted when the API is live.
// Shape: data-architecture.md section 4.8. One append-only log; only
// activityService reads this file.
//
// Rules this data follows:
//  - For every document, the newest `opened` event equals documents.lastOpenedAt
//    and the newest `cited` event equals documents.lastCitedAt (null = no event).
//  - opened/cited events are by users who can read that document.
//  - Mock limitation: only 6 documents have sections here, so `cited` events on
//    other documents use sectionId: null (the real database always has one).
//  - question_unanswered has documentId null; its payload is { text, reason, bestScore }.

/** @type {import('../../types').ActivityEvent[]} */
export const activityEvents = [
  // ── opened ──
  { id: "evt_0001", type: "opened", userId: "usr_005", documentId: "doc_001", occurredAt: "2026-10-26T14:20:00Z", payload: {} },
  { id: "evt_0002", type: "opened", userId: "usr_011", documentId: "doc_001", occurredAt: "2026-10-20T09:00:00Z", payload: {} },
  { id: "evt_0003", type: "opened", userId: "usr_003", documentId: "doc_001", occurredAt: "2026-10-13T10:00:00Z", payload: {} },
  { id: "evt_0004", type: "opened", userId: "usr_011", documentId: "doc_003", occurredAt: "2026-10-24T09:10:00Z", payload: {} },
  { id: "evt_0005", type: "opened", userId: "usr_012", documentId: "doc_003", occurredAt: "2026-10-15T10:00:00Z", payload: {} },
  { id: "evt_0006", type: "opened", userId: "usr_012", documentId: "doc_015", occurredAt: "2026-10-21T11:00:00Z", payload: {} },
  { id: "evt_0007", type: "opened", userId: "usr_003", documentId: "doc_002", occurredAt: "2026-10-22T10:00:00Z", payload: {} },
  { id: "evt_0008", type: "opened", userId: "usr_009", documentId: "doc_004", occurredAt: "2026-10-18T10:30:00Z", payload: {} },
  { id: "evt_0009", type: "opened", userId: "usr_003", documentId: "doc_005", occurredAt: "2026-06-20T10:00:00Z", payload: {} },
  { id: "evt_0010", type: "opened", userId: "usr_010", documentId: "doc_006", occurredAt: "2026-10-25T08:00:00Z", payload: {} },
  { id: "evt_0011", type: "opened", userId: "usr_005", documentId: "doc_006", occurredAt: "2026-10-19T09:00:00Z", payload: {} },
  { id: "evt_0012", type: "opened", userId: "usr_005", documentId: "doc_007", occurredAt: "2026-10-27T09:30:00Z", payload: {} },
  { id: "evt_0013", type: "opened", userId: "usr_009", documentId: "doc_007", occurredAt: "2026-10-22T09:00:00Z", payload: {} },
  { id: "evt_0014", type: "opened", userId: "usr_010", documentId: "doc_008", occurredAt: "2026-10-15T13:00:00Z", payload: {} },
  { id: "evt_0015", type: "opened", userId: "usr_005", documentId: "doc_009", occurredAt: "2026-10-26T10:00:00Z", payload: {} },
  { id: "evt_0016", type: "opened", userId: "usr_013", documentId: "doc_009", occurredAt: "2026-10-17T10:00:00Z", payload: {} },
  { id: "evt_0017", type: "opened", userId: "usr_009", documentId: "doc_010", occurredAt: "2026-10-19T11:00:00Z", payload: {} },
  { id: "evt_0018", type: "opened", userId: "usr_003", documentId: "doc_011", occurredAt: "2026-07-15T09:00:00Z", payload: {} },
  { id: "evt_0019", type: "opened", userId: "usr_001", documentId: "doc_012", occurredAt: "2026-10-03T08:00:00Z", payload: {} },
  { id: "evt_0020", type: "opened", userId: "usr_005", documentId: "doc_014", occurredAt: "2026-10-23T09:00:00Z", payload: {} },
  { id: "evt_0021", type: "opened", userId: "usr_003", documentId: "doc_016", occurredAt: "2026-05-02T09:00:00Z", payload: {} },
  { id: "evt_0022", type: "opened", userId: "usr_013", documentId: "doc_018", occurredAt: "2026-10-20T10:00:00Z", payload: {} },
  { id: "evt_0023", type: "opened", userId: "usr_014", documentId: "doc_019", occurredAt: "2026-10-27T10:15:00Z", payload: {} },
  { id: "evt_0024", type: "opened", userId: "usr_013", documentId: "doc_019", occurredAt: "2026-10-21T09:00:00Z", payload: {} },
  { id: "evt_0025", type: "opened", userId: "usr_014", documentId: "doc_020", occurredAt: "2026-10-26T09:00:00Z", payload: {} },
  { id: "evt_0026", type: "opened", userId: "usr_015", documentId: "doc_021", occurredAt: "2026-10-22T09:00:00Z", payload: {} },
  { id: "evt_0027", type: "opened", userId: "usr_015", documentId: "doc_022", occurredAt: "2026-10-14T09:00:00Z", payload: {} },
  { id: "evt_0028", type: "opened", userId: "usr_016", documentId: "doc_023", occurredAt: "2026-10-09T09:00:00Z", payload: {} },
  { id: "evt_0029", type: "opened", userId: "usr_017", documentId: "doc_024", occurredAt: "2026-10-17T09:00:00Z", payload: {} },

  // ── cited (payload: sectionId + chunkId) ──
  { id: "evt_0030", type: "cited", userId: "usr_002", documentId: "doc_001", occurredAt: "2026-10-27T08:05:00Z", payload: { sectionId: "sec_001_03", chunkId: "chk_0147" } },
  { id: "evt_0031", type: "cited", userId: "usr_005", documentId: "doc_001", occurredAt: "2026-10-24T09:00:00Z", payload: { sectionId: "sec_001_02", chunkId: "chk_0141" } },
  { id: "evt_0032", type: "cited", userId: "usr_011", documentId: "doc_001", occurredAt: "2026-10-19T10:00:00Z", payload: { sectionId: "sec_001_01", chunkId: "chk_0133" } },
  { id: "evt_0033", type: "cited", userId: "usr_012", documentId: "doc_003", occurredAt: "2026-10-20T13:30:00Z", payload: { sectionId: "sec_003_04", chunkId: "chk_0388" } },
  { id: "evt_0034", type: "cited", userId: "usr_011", documentId: "doc_003", occurredAt: "2026-10-12T09:00:00Z", payload: { sectionId: "sec_003_02", chunkId: "chk_0361" } },
  { id: "evt_0035", type: "cited", userId: "usr_011", documentId: "doc_015", occurredAt: "2026-10-23T15:45:00Z", payload: { sectionId: "sec_015_02", chunkId: "chk_0152" } },
  { id: "evt_0036", type: "cited", userId: "usr_009", documentId: "doc_004", occurredAt: "2026-10-17T14:00:00Z", payload: { sectionId: null, chunkId: "chk_0402" } },
  { id: "evt_0037", type: "cited", userId: "usr_003", documentId: "doc_005", occurredAt: "2026-06-18T12:00:00Z", payload: { sectionId: null, chunkId: "chk_0503" } },
  { id: "evt_0038", type: "cited", userId: "usr_010", documentId: "doc_006", occurredAt: "2026-10-26T16:00:00Z", payload: { sectionId: null, chunkId: "chk_0604" } },
  { id: "evt_0039", type: "cited", userId: "usr_005", documentId: "doc_006", occurredAt: "2026-10-20T10:00:00Z", payload: { sectionId: null, chunkId: "chk_0607" } },
  { id: "evt_0040", type: "cited", userId: "usr_005", documentId: "doc_007", occurredAt: "2026-10-27T11:00:00Z", payload: { sectionId: "sec_007_02", chunkId: "chk_0702" } },
  { id: "evt_0041", type: "cited", userId: "usr_009", documentId: "doc_007", occurredAt: "2026-10-21T14:00:00Z", payload: { sectionId: "sec_007_03", chunkId: "chk_0705" } },
  { id: "evt_0042", type: "cited", userId: "usr_010", documentId: "doc_008", occurredAt: "2026-10-18T09:15:00Z", payload: { sectionId: null, chunkId: "chk_0809" } },
  { id: "evt_0043", type: "cited", userId: "usr_005", documentId: "doc_009", occurredAt: "2026-10-27T13:20:00Z", payload: { sectionId: "sec_009_03", chunkId: "chk_0903" } },
  { id: "evt_0044", type: "cited", userId: "usr_013", documentId: "doc_009", occurredAt: "2026-10-18T10:00:00Z", payload: { sectionId: "sec_009_02", chunkId: "chk_0906" } },
  { id: "evt_0045", type: "cited", userId: "usr_009", documentId: "doc_010", occurredAt: "2026-10-22T10:30:00Z", payload: { sectionId: null, chunkId: "chk_1002" } },
  { id: "evt_0046", type: "cited", userId: "usr_005", documentId: "doc_014", occurredAt: "2026-10-24T11:30:00Z", payload: { sectionId: null, chunkId: "chk_1405" } },
  { id: "evt_0047", type: "cited", userId: "usr_003", documentId: "doc_016", occurredAt: "2026-04-20T09:00:00Z", payload: { sectionId: null, chunkId: "chk_1601" } },
  { id: "evt_0048", type: "cited", userId: "usr_013", documentId: "doc_018", occurredAt: "2026-10-12T15:00:00Z", payload: { sectionId: null, chunkId: "chk_1803" } },
  { id: "evt_0049", type: "cited", userId: "usr_014", documentId: "doc_019", occurredAt: "2026-10-26T12:00:00Z", payload: { sectionId: "sec_019_02", chunkId: "chk_1902" } },
  { id: "evt_0050", type: "cited", userId: "usr_015", documentId: "doc_021", occurredAt: "2026-10-25T14:00:00Z", payload: { sectionId: null, chunkId: "chk_2105" } },
  { id: "evt_0051", type: "cited", userId: "usr_016", documentId: "doc_023", occurredAt: "2026-10-13T10:00:00Z", payload: { sectionId: null, chunkId: "chk_2302" } },
  { id: "evt_0052", type: "cited", userId: "usr_017", documentId: "doc_024", occurredAt: "2026-10-21T09:00:00Z", payload: { sectionId: null, chunkId: "chk_2404" } },

  // ── question_unanswered: "the documents do not provide enough evidence" ──
  // Five different people asked about parental leave (feeds fnd_002)
  { id: "evt_0053", type: "question_unanswered", userId: "usr_005", documentId: null, occurredAt: "2026-10-21T09:12:00Z", payload: { text: "What is the parental leave policy?", reason: "no_results", bestScore: 0.31 } },
  { id: "evt_0054", type: "question_unanswered", userId: "usr_011", documentId: null, occurredAt: "2026-10-22T14:05:00Z", payload: { text: "How many weeks of parental leave do I get?", reason: "no_results", bestScore: 0.28 } },
  { id: "evt_0055", type: "question_unanswered", userId: "usr_012", documentId: null, occurredAt: "2026-10-23T10:30:00Z", payload: { text: "Is parental leave paid?", reason: "low_similarity", bestScore: 0.42 } },
  { id: "evt_0056", type: "question_unanswered", userId: "usr_013", documentId: null, occurredAt: "2026-10-24T16:45:00Z", payload: { text: "Who do I tell about parental leave?", reason: "no_results", bestScore: 0.25 } },
  { id: "evt_0057", type: "question_unanswered", userId: "usr_016", documentId: null, occurredAt: "2026-10-26T11:20:00Z", payload: { text: "Is parental leave available to new fathers?", reason: "low_similarity", bestScore: 0.39 } },
  // Two people asked about vendor contract approval (feeds fnd_003)
  { id: "evt_0058", type: "question_unanswered", userId: "usr_017", documentId: null, occurredAt: "2026-10-19T09:40:00Z", payload: { text: "What is the vendor contract approval process?", reason: "low_similarity", bestScore: 0.44 } },
  { id: "evt_0059", type: "question_unanswered", userId: "usr_016", documentId: null, occurredAt: "2026-10-21T15:10:00Z", payload: { text: "Who handles vendor contract approval over 50k?", reason: "low_similarity", bestScore: 0.37 } },
];