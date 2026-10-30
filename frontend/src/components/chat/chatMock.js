// ============================================================================
// PLACEHOLDERS: replace these with real API calls when the backend is ready.
// Keep the returned shapes the same and nothing else needs to change.
// Use **double asterisks** inside text to make a phrase bold in the answer box.
// ============================================================================
const isLeaveQuestion = (q) => /leave|vacation|time off|pto/i.test(q);

export function buildPlaceholderAnswer(question, { deepResearch = false } = {}) {
  if (deepResearch) {
    return {
      intro: `Deep Research Synthesis: grounded findings for "${question}"`,
      points: [
        { label: 'Institutional Baseline', text: 'Verified against Northstar Studio policies, playbooks and archived reference material.' },
        { label: 'Cross-Document Analysis', text: 'Compared 12 sources across HR, Finance and IT repositories; no conflicting guidance found.' },
        { label: 'Risk & Compliance Notes', text: 'No exceptions were detected; review **security and compliance** sections before acting.' },
        { label: 'Recommended Next Steps', text: 'Confirm details with your department lead and log the decision in the HR portal.' },
      ],
    };
  }

  if (isLeaveQuestion(question)) {
    return {
      intro: 'According to the **2025 Employee Handbook & Leave Policy**:',
      points: [
        { label: 'Leave Allocation', text: 'Full-time employees receive **20 days of paid annual vacation** plus **10 dedicated paid sick/wellness days** per calendar year.' },
        { label: 'Rollover Rules', text: 'A maximum of **5 unused vacation days** can be rolled over into Q1 of the following year (expiring March 31st).' },
        { label: 'Notification SLA', text: 'Leaves exceeding 3 consecutive days require 48 hours advance notice in the HR Portal; medical certificates are mandatory for sick leaves extending beyond 2 consecutive business days.' },
      ],
    };
  }

  return {
    intro: `Based on enterprise verified knowledge sources across active company repositories for "${question}":`,
    points: [
      { label: 'Query Grounding', text: 'Verified against Northstar Studio institutional policies and active playbooks.' },
      { label: 'Operational Framework', text: 'Key findings confirm compliance rules, procedural standards, and security protocols.' },
      { label: 'Recommended Actions', text: 'Refer to section details in linked documentation or consult your department lead.' },
    ],
  };
}

// A turn's `citation` is a list of source objects.
export function buildPlaceholderCitation(question = '') {
  const governance = {
    documentId: 'doc-corporate-governance',
    title: 'Corporate Governance & Compliance Policy.pdf',
    page: 1,
    meta: 'page 1 • verified source',
  };
  if (isLeaveQuestion(question)) {
    return [
      { documentId: 'doc-leave-2025', title: '2025 Employee Handbook & Leave Policy.pdf', page: 1, meta: 'page 1 • verified source' },
      governance,
    ];
  }
  return [
    governance,
    { documentId: 'doc-remote-work-2026', title: '2026 Global Remote Work Policy.pdf', page: 1, meta: 'page 1 • verified source' },
  ];
}

// ============================================================================
// Change notifications, so the Topbar counts and the pages stay in sync.
// ============================================================================
const listeners = new Set();
const emit = () => listeners.forEach((fn) => fn());

export function subscribeThreads(fn) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

// ============================================================================
// In-memory thread store (resets on page refresh). Swap for API calls later.
// `messageCount` is an optional override used only by the demo seed data.
// ============================================================================
const seedTurn = (id, question, deep = false) => ({
  id,
  when: 'Just now',
  question,
  deep,
  answer: buildPlaceholderAnswer(question, { deepResearch: deep }),
  citation: buildPlaceholderCitation(question),
});

let threads = [
  { id: 'th-1', updated: 'Updated Just now', archived: false, messageCount: 2, turns: [seedTurn('th-1-t1', 'What is our leave policy?')] },
  { id: 'th-2', updated: 'Updated Just now', archived: false, messageCount: 18, turns: [seedTurn('th-2-t1', 'How do I submit an expense claim?')] },
  { id: 'th-3', updated: 'Updated Just now', archived: false, messageCount: 44, turns: [seedTurn('th-3-t1', 'What is our leave policy?', true)] },
  { id: 'th-4', updated: 'Updated Just now', archived: false, messageCount: 12, turns: [seedTurn('th-4-t1', 'What is our leave policy?')] },
  { id: 'th-5', updated: 'Updated Just now', archived: true, messageCount: 22, turns: [seedTurn('th-5-t1', 'jkbjkb')] },
];

export function getThreads() {
  return [...threads];
}

export function getThread(id) {
  return threads.find((t) => t.id === id) ?? null;
}

export function getThreadCounts() {
  const archived = threads.filter((t) => t.archived).length;
  return { active: threads.length - archived, archived };
}

export function deleteThread(id) {
  threads = threads.filter((t) => t.id !== id);
  emit();
}

export function toggleArchiveThread(id) {
  threads = threads.map((t) => (t.id === id ? { ...t, archived: !t.archived } : t));
  emit();
}

export function clearAllArchivedThreads() {
  threads = threads.filter((t) => !t.archived);
  emit();
}

export function clearAllActiveThreads() {
  threads = threads.filter((t) => t.archived);
  emit();
}

// Saves (or updates) a thread and returns its id.
export function saveThread(turns, id = null) {
  const clean = turns.map(({ id: turnId, question, answer, citation, deep }) => ({
    id: turnId,
    question,
    answer,
    citation,
    deep: Boolean(deep),
    when: 'Earlier',
  }));

  if (id && threads.some((t) => t.id === id)) {
    threads = threads.map((t) =>
      t.id === id
        ? {
            ...t,
            turns: clean,
            updated: 'Updated Just now',
            // keep the demo count unless turns were actually added or removed
            messageCount: clean.length === t.turns.length ? t.messageCount : undefined,
          }
        : t
    );
    emit();
    return id;
  }

  const newId = `th-${Date.now()}`;
  threads = [{ id: newId, turns: clean, updated: 'Updated Just now', archived: false }, ...threads];
  emit();
  return newId;
}

// Removes markdown markers so previews never show raw ** or ###.
const stripMarkdown = (text) => text.replace(/\*\*/g, '').replace(/^#+\s*/gm, '').trim();

// Derived display values, so threads store no duplicated data.
export function summarizeThread(thread) {
  const first = thread.turns[0];
  const flat = first
    ? [first.answer.intro, ...first.answer.points.map((p, i) => `${i + 1}. ${p.label}: ${p.text}`)].join(' ')
    : '';
  return {
    title: first ? first.question : 'Untitled thread',
    snippet: stripMarkdown(flat),
    messageCount: thread.messageCount ?? thread.turns.length * 2, // one question + one answer per turn
  };
}