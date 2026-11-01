// ============================================================================
// chatApi: the ONLY module the chat UI talks to.
// Today it forwards to chatMock. When FastAPI is ready, replace each body with a
// fetch() to the endpoint named in the comment. Nothing else in the app changes.
// ============================================================================
import * as mock from './chatMock';

async function call(fn) {
  try {
    return await fn();
  } catch (e) {
    throw new Error(e?.message || 'Something went wrong. Please try again.');
  }
}

// POST /api/chat                      body: { question, conversation_id }
export const sendQuestion = ({ question, conversationId, mode }) =>
  call(() => mock.sendQuestion({ question, conversationId, mode }));

// POST /api/chat/retry                body: { conversation_id, turn_id }
export const retryAnswer = ({ conversationId, turnId }) =>
  call(() => mock.retryAnswer({ conversationId, turnId }));

// PUT /api/messages/{message_id}/feedback     body: { rating, comment? }
export const rateMessage = (messageId, payload) => call(() => mock.rateMessage(messageId, payload));

// DELETE /api/messages/{message_id}/feedback
export const removeRating = (messageId) => call(() => mock.removeRating(messageId));

// GET /api/conversations
export const listConversations = () => call(() => mock.listConversations());

// GET /api/conversations/{conversation_id}/messages
export const openConversation = (conversationId) => call(() => mock.openConversation(conversationId));

// DELETE /api/conversations/{conversation_id}
export const deleteConversation = (conversationId) => call(() => mock.deleteConversation(conversationId));

// PATCH /api/conversations/{conversation_id}      body: { title }
export const renameConversation = (conversationId, title) => call(() => mock.renameConversation(conversationId, title));

// EXTENSIONS (archive, restore and bulk clear)
export const setConversationArchived = (conversationId, archived) =>
  call(() => mock.setConversationArchived(conversationId, archived));
export const deleteConversations = ({ archived }) => call(() => mock.deleteConversations({ archived }));

// Mock-only change notification. With a real backend, refetch after each action instead.
export const subscribe = mock.subscribe;