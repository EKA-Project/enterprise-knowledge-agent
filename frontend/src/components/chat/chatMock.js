// ============================================================================
// FAKE BACKEND: stands in for FastAPI + the database until the real one exists.
// Only chatApi.js imports this file. Shapes follow the architecture document:
//   conversations, messages (flat, grouped by turn_id), message_feedback.
// Try it: a question containing "fail" makes the first answer fail (then Retry works),
//         a question containing "offline" simulates a network error.
// ============================================================================
const USER_ID = 'u42';
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let seq = 0;
const uid = (prefix) => `${prefix}-${Date.now().toString(36)}-${seq++}`;
const iso = (ms = Date.now()) => new Date(ms).toISOString();

// ---------------- change notifications (mock only) ----------------
const listeners = new Set();
const emit = () => listeners.forEach((fn) => fn());
export function subscribe(fn) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

// ---------------- the AI black box ----------------
const isLeave = (q) => /leave|vacation|time off|pto/i.test(q);

const LEAVE_DOC = {
  document_id: 'd-leave-2025',
  document_name: '2025 Employee Handbook & Leave Policy.pdf',
  page: 1,
  snippet: 'Full-time employees receive 20 days of paid annual vacation plus 10 dedicated paid sick/wellness days per calendar year.',
  score: 0.91,
};
const GOVERNANCE = {
  document_id: 'd-governance',
  document_name: 'Corporate Governance & Compliance Policy.pdf',
  page: 1,
  snippet: 'All company policies are reviewed annually and approved by the compliance committee.',
  score: 0.74,
};
const REMOTE = {
  document_id: 'd-remote-2026',
  document_name: '2026 Global Remote Work Policy.pdf',
  page: 1,
  snippet: 'Remote employees are entitled to an annual home office stipend of $1,500 USD.',
  score: 0.7,
};
const SECURITY = {
  document_id: 'd-security',
  document_name: 'Data Security & Zero-Training Guarantees.pdf',
  page: 4,
  snippet: 'Customer data is encrypted at rest and is never used to train models.',
  score: 0.66,
};

function askAI(question, mode = 'standard') {
  if (mode === 'deep') {
    return {
      content: [
        `Deep Research Synthesis: grounded findings for "${question}"`,
        '1. **Institutional Baseline**: Verified against Northstar Studio policies, playbooks and archived reference material.',
        '2. **Cross-Document Analysis**: Compared 12 sources across HR, Finance and IT repositories; no conflicting guidance found.',
        '3. **Risk & Compliance Notes**: No exceptions were detected; review **security and compliance** sections before acting.',
        '4. **Recommended Next Steps**: Confirm details with your department lead and log the decision in the HR portal.',
      ].join('\n'),
      citations: (isLeave(question) ? [LEAVE_DOC, GOVERNANCE, SECURITY] : [GOVERNANCE, REMOTE, SECURITY]).map((c) => ({ ...c })),
    };
  }
  if (isLeave(question)) {
    return {
      content: [
        'According to the **2025 Employee Handbook & Leave Policy**:',
        '1. **Leave Allocation**: Full-time employees receive **20 days of paid annual vacation** plus **10 dedicated paid sick/wellness days** per calendar year.',
        '2. **Rollover Rules**: A maximum of **5 unused vacation days** can be rolled over into Q1 of the following year (expiring March 31st).',
        '3. **Notification SLA**: Leaves exceeding 3 consecutive days require 48 hours advance notice in the HR Portal; medical certificates are mandatory for sick leaves extending beyond 2 consecutive business days.',
      ].join('\n'),
      citations: [LEAVE_DOC, GOVERNANCE].map((c) => ({ ...c })),
    };
  }
  return {
    content: [
      `Based on enterprise verified knowledge sources across active company repositories for "${question}":`,
      '1. **Query Grounding**: Verified against Northstar Studio institutional policies and active playbooks.',
      '2. **Operational Framework**: Key findings confirm compliance rules, procedural standards, and security protocols.',
      '3. **Recommended Actions**: Refer to section details in linked documentation or consult your department lead.',
    ].join('\n'),
    citations: [GOVERNANCE, REMOTE].map((c) => ({ ...c })),
  };
}

// ---------------- the "database": three tables ----------------
// messages carry a private _mode so Retry can regenerate in the same style.
let conversations = []; // { id, user_id, title, archived (EXTENSION), created_at, updated_at }
let messages = [];      // { id, conversation_id, turn_id, role, content, status, citations, retry_count, created_at, updated_at }
let feedbackRows = [];  // { id, message_id, attempt, rating, comment, answer_snapshot, created_at, updated_at }

const FOLLOW_UPS = [
  'Can unused leave be carried over?',
  'How do I request time off?',
  'Who approves leave requests?',
  'What is the notice period?',
  'Are medical certificates required?',
];

function seedConversation({ title, turns, archived = false, deep = false, order }) {
  const id = uid('c');
  const base = Date.now() - 600_000 - order * 10_000;
  conversations.push({
    id,
    user_id: USER_ID,
    title,
    archived,
    created_at: iso(base),
    updated_at: iso(Date.now() - order * 1000),
  });
  for (let i = 0; i < turns; i += 1) {
    const question = i === 0 ? title : FOLLOW_UPS[(i - 1) % FOLLOW_UPS.length];
    const turnId = uid('t');
    const at = base + i * 2000;
    const mode = deep ? 'deep' : 'standard';
    const ai = askAI(question, mode);
    messages.push(
      { id: uid('m'), conversation_id: id, turn_id: turnId, role: 'user', content: question, status: 'completed', citations: [], retry_count: 0, created_at: iso(at), updated_at: iso(at), _mode: 'standard' },
      { id: uid('m'), conversation_id: id, turn_id: turnId, role: 'assistant', content: ai.content, status: 'completed', citations: ai.citations, retry_count: 0, created_at: iso(at + 1), updated_at: iso(at + 1), _mode: mode },
    );
  }
}

// Demo data from the video: message counts are real (turns x 2).
seedConversation({ title: 'What is our leave policy?', turns: 1, order: 0 });
seedConversation({ title: 'How do I submit an expense claim?', turns: 9, order: 1 });
seedConversation({ title: 'What is our leave policy?', turns: 22, deep: true, order: 2 });
seedConversation({ title: 'What is our leave policy?', turns: 6, order: 3 });
seedConversation({ title: 'jkbjkb', turns: 11, archived: true, order: 4 });

// ---------------- helpers ----------------
const stripMarkdown = (text) => text.replace(/\*\*/g, '').replace(/\s*\n\s*/g, ' ').trim();
const makeTitle = (q) => (q.length > 60 ? `${q.slice(0, 57)}...` : q);
const byTime = (a, b) => a.created_at.localeCompare(b.created_at) || a.id.localeCompare(b.id);

function findConversation(id) {
  const conversation = conversations.find((c) => c.id === id && c.user_id === USER_ID); // owner check
  if (!conversation) throw new Error('Conversation not found.');
  return conversation;
}

// Message as the API returns it: feedback joined in for the CURRENT attempt only.
function publicMessage(m) {
  const { _mode, ...rest } = m;
  const row = m.role === 'assistant'
    ? feedbackRows.find((f) => f.message_id === m.id && f.attempt === m.retry_count)
    : null;
  return {
    ...rest,
    citations: m.citations.map((c) => ({ ...c })),
    feedback: row ? { rating: row.rating, comment: row.comment, updated_at: row.updated_at } : null,
  };
}

// ---------------- route handlers ----------------

// POST /api/chat
export async function sendQuestion({ question, conversationId, mode = 'standard' }) {
  await delay(mode === 'deep' ? 2200 : 1100);
  if (/\boffline\b/i.test(question)) throw new Error('Network error. Please check your connection and try again.');

  let conversation = conversationId ? findConversation(conversationId) : null;
  let title;
  if (!conversation) {
    conversation = { id: uid('c'), user_id: USER_ID, title: makeTitle(question), archived: false, created_at: iso(), updated_at: iso() };
    conversations.unshift(conversation);
    title = conversation.title;
  }

  const turnId = uid('t');
  const at = Date.now();
  const failed = /\bfail\b/i.test(question);
  const ai = failed ? { content: '', citations: [] } : askAI(question, mode);

  const userMessage = { id: uid('m'), conversation_id: conversation.id, turn_id: turnId, role: 'user', content: question, status: 'completed', citations: [], retry_count: 0, created_at: iso(at), updated_at: iso(at), _mode: 'standard' };
  const assistantMessage = { id: uid('m'), conversation_id: conversation.id, turn_id: turnId, role: 'assistant', content: ai.content, status: failed ? 'failed' : 'completed', citations: ai.citations, retry_count: 0, created_at: iso(at + 1), updated_at: iso(at + 1), _mode: mode };

  messages.push(userMessage, assistantMessage);
  conversation.updated_at = iso();
  emit();

  return {
    conversation_id: conversation.id,
    title,
    turn_id: turnId,
    user_message: publicMessage(userMessage),
    assistant_message: publicMessage(assistantMessage),
  };
}

// POST /api/chat/retry: updates the SAME assistant row, never creates a new one.
export async function retryAnswer({ conversationId, turnId }) {
  const conversation = findConversation(conversationId);
  const assistant = messages.find((m) => m.conversation_id === conversationId && m.turn_id === turnId && m.role === 'assistant');
  const user = messages.find((m) => m.conversation_id === conversationId && m.turn_id === turnId && m.role === 'user');
  if (!assistant || !user) throw new Error('Turn not found.');
  await delay(assistant._mode === 'deep' ? 2000 : 1000);

  const ai = askAI(user.content, assistant._mode);
  assistant.content = ai.content;
  assistant.citations = ai.citations;
  assistant.status = 'completed';
  assistant.retry_count += 1;
  assistant.updated_at = iso(); // created_at never changes, so the position stays
  conversation.updated_at = iso();
  emit();
  return { assistant_message: publicMessage(assistant) }; // feedback rows are never touched
}

// PUT /api/messages/{id}/feedback
export async function rateMessage(messageId, { rating, comment = null }) {
  await delay(150);
  const message = messages.find((m) => m.id === messageId);
  if (!message) throw new Error('Message not found.');
  findConversation(message.conversation_id);
  if (message.role !== 'assistant' || message.status !== 'completed') throw new Error('Only completed answers can be rated.');

  const stamp = iso();
  let row = feedbackRows.find((f) => f.message_id === message.id && f.attempt === message.retry_count);
  if (row) {
    row.rating = rating;
    row.comment = comment;
    row.answer_snapshot = message.content;
    row.updated_at = stamp;
  } else {
    row = { id: uid('f'), message_id: message.id, attempt: message.retry_count, rating, comment, answer_snapshot: message.content, created_at: stamp, updated_at: stamp };
    feedbackRows.push(row);
  }
  return { feedback: { rating: row.rating, comment: row.comment, updated_at: row.updated_at } };
}

// DELETE /api/messages/{id}/feedback
export async function removeRating(messageId) {
  await delay(150);
  const message = messages.find((m) => m.id === messageId);
  if (!message) throw new Error('Message not found.');
  findConversation(message.conversation_id);
  feedbackRows = feedbackRows.filter((f) => !(f.message_id === message.id && f.attempt === message.retry_count));
}

// GET /api/conversations
// EXTENSION: archived, message_count and preview are added for the history screens.
export async function listConversations() {
  await delay(120);
  return conversations
    .filter((c) => c.user_id === USER_ID)
    .map((c) => {
      const own = messages.filter((m) => m.conversation_id === c.id);
      const firstAnswer = own.find((m) => m.role === 'assistant' && m.status === 'completed');
      return {
        id: c.id,
        title: c.title,
        archived: c.archived,
        updated_at: c.updated_at,
        message_count: own.length,
        preview: firstAnswer ? stripMarkdown(firstAnswer.content).slice(0, 160) : '',
      };
    })
    .sort((a, b) => b.updated_at.localeCompare(a.updated_at));
}

// GET /api/conversations/{id}/messages
export async function openConversation(conversationId) {
  await delay(250);
  findConversation(conversationId);
  return messages.filter((m) => m.conversation_id === conversationId).sort(byTime).map(publicMessage);
}

// DELETE /api/conversations/{id}
export async function deleteConversation(conversationId) {
  await delay(120);
  findConversation(conversationId);
  const ids = new Set(messages.filter((m) => m.conversation_id === conversationId).map((m) => m.id));
  conversations = conversations.filter((c) => c.id !== conversationId);
  messages = messages.filter((m) => m.conversation_id !== conversationId);
  feedbackRows = feedbackRows.filter((f) => !ids.has(f.message_id)); // cascade
  emit();
}

// PATCH /api/conversations/{id}   (optional rename)
export async function renameConversation(conversationId, title) {
  await delay(120);
  const conversation = findConversation(conversationId);
  conversation.title = title.trim() || conversation.title;
  emit();
}

// EXTENSION: PATCH /api/conversations/{id}  { archived }
export async function setConversationArchived(conversationId, archived) {
  await delay(120);
  findConversation(conversationId).archived = archived;
  emit();
}

// EXTENSION: DELETE /api/conversations?archived=true|false   (bulk clear)
export async function deleteConversations({ archived }) {
  await delay(150);
  const doomed = conversations.filter((c) => c.archived === archived).map((c) => c.id);
  const messageIds = new Set(messages.filter((m) => doomed.includes(m.conversation_id)).map((m) => m.id));
  conversations = conversations.filter((c) => !doomed.includes(c.id));
  messages = messages.filter((m) => !doomed.includes(m.conversation_id));
  feedbackRows = feedbackRows.filter((f) => !messageIds.has(f.message_id));
  emit();
}