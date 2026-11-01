// @ts-check
// MOCK TABLE: findings. Disposable: deleted when the API is live.
// Shape: data-architecture.md section 4.9. Only analyticsService reads this file.
//
// Rules this data follows:
//  - A contradiction has at least two claims, each an exact quote from a section
//    of a document listed in documentIds. Resolution is never automatic.
//  - A knowledge gap has no severity and no documents; its counts agree with the
//    question_unanswered events in activityEvents.js.
//  - open findings have no resolution fields; closed ones have all three.

/** @type {import('../../types').Finding[]} */
export const findings = [
  {
    id: "fnd_001", kind: "contradiction", status: "open", severity: "high",
    title: "Conflicting home office stipend amount",
    departmentId: "dept_hr", documentIds: ["doc_003", "doc_015"],
    evidence: {
      claims: [
        { documentId: "doc_015", sectionId: "sec_015_02", quote: "The annual home office stipend is $1,000." },
        { documentId: "doc_003", sectionId: "sec_003_04", quote: "The home office stipend is $1,500 per year." },
      ],
    },
    detectedAt: "2026-10-20T06:00:00Z", resolvedAt: null, resolvedById: null, resolution: null,
  },
  {
    id: "fnd_002", kind: "knowledge_gap", status: "open", severity: null,
    title: "Parental leave policy has no source document",
    departmentId: "dept_hr", documentIds: [],
    evidence: { questionCount: 5, askerCount: 5, topic: "parental leave" },
    detectedAt: "2026-10-27T06:00:00Z", resolvedAt: null, resolvedById: null, resolution: null,
  },
  {
    // Dismissed by the Legal manager: a closed finding that is not "resolved"
    id: "fnd_003", kind: "knowledge_gap", status: "dismissed", severity: null,
    title: "Vendor contract approval steps are not documented",
    departmentId: "dept_legal", documentIds: [],
    evidence: { questionCount: 2, askerCount: 2, topic: "vendor contract approval" },
    detectedAt: "2026-10-22T06:00:00Z", resolvedAt: "2026-10-26T10:00:00Z", resolvedById: "usr_008", resolution: "not_needed",
  },
];