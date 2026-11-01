import { useCallback, useEffect, useRef, useState } from 'react';
import * as chatApi from '../components/chat/chatApi';
import { contentToLines, countChars } from '../components/chat/ChatUtils';

const TICK_MS = 38;
const CHARS_MIN = 1;
const CHARS_MAX = 3;

let tempCounter = 0;

// All chat state lives here, owned by the page that calls this hook (section 4.3).
// notify(message) shows a toast. Components below never call the API.
export default function useChat({ notify } = {}) {
  const [messages, setMessages] = useState([]);              // flat list, API shape (+ tempId while unconfirmed)
  const [conversationId, setConversationId] = useState('');  // '' means new chat
  const [conversations, setConversations] = useState([]);    // sidebar list, kept separate
  const [isLoading, setIsLoading] = useState(false);         // waiting for a new answer
  const [retryingMessageId, setRetryingMessageId] = useState('');
  const [error, setError] = useState(null);                  // { kind:'send'|'history', message, ... }
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [deepResearch, setDeepResearch] = useState(false);   // frontend option sent as `mode`
  const [typing, setTyping] = useState(null);                // display-only typing effect { id, revealed, total, paused }

  const sessionRef = useRef(0);   // bumps when the open chat changes, so stale replies are ignored
  const stopRef = useRef(false);  // user pressed stop while waiting for a reply

  const tell = (message) => notify?.(message);
  const patch = (id, fields) => setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, ...fields } : m)));

  // ---- sidebar list -------------------------------------------------------
  const refreshConversations = useCallback(async () => {
    try {
      setConversations(await chatApi.listConversations());
    } catch {
      /* the sidebar failing is not fatal */
    }
  }, []);

  useEffect(() => {
    refreshConversations();
    return chatApi.subscribe(refreshConversations);
  }, [refreshConversations]);

  // ---- typing effect (purely visual, content is already complete) ----------
  const startTyping = (message) => {
    if (message.status !== 'completed') return;
    const total = countChars(contentToLines(message.content));
    setTyping({ id: message.id, revealed: 0, total, paused: stopRef.current });
    stopRef.current = false;
  };

  useEffect(() => {
    if (!typing || typing.paused) return undefined;
    const timer = setInterval(() => {
      const step = CHARS_MIN + Math.floor(Math.random() * (CHARS_MAX - CHARS_MIN + 1));
      setTyping((t) => {
        if (!t || t.paused) return t;
        const revealed = Math.min(t.revealed + step, t.total);
        return revealed >= t.total ? null : { ...t, revealed };
      });
    }, TICK_MS);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typing?.id, typing?.paused]);

  const stop = () => {
    if (typing && !typing.paused) setTyping((t) => t && { ...t, paused: true });
    else if (isLoading || retryingMessageId) stopRef.current = true; // pause as soon as the answer arrives
  };
  const resumeTyping = () => setTyping((t) => t && { ...t, paused: false });

  const busy = isLoading || Boolean(retryingMessageId) || Boolean(typing && !typing.paused);

  // ---- send ----------------------------------------------------------------
  const send = async (question, tempId, session) => {
    setError(null);
    setIsLoading(true);
    try {
      const res = await chatApi.sendQuestion({ question, conversationId, mode: deepResearch ? 'deep' : 'standard' });
      if (session !== sessionRef.current) return;
      setMessages((prev) => [...prev.map((m) => (m.tempId === tempId ? res.user_message : m)), res.assistant_message]);
      setConversationId(res.conversation_id);
      startTyping(res.assistant_message);
    } catch (e) {
      if (session === sessionRef.current) setError({ kind: 'send', message: e.message, question, tempId });
    } finally {
      if (session === sessionRef.current) setIsLoading(false);
    }
  };

  // Returns true when the question was accepted (so the input can clear itself).
  const handleSend = (raw) => {
    const question = raw.trim();
    if (!question || isLoading || retryingMessageId) return false;

    const tempId = `temp-${Date.now()}-${tempCounter++}`;
    const stamp = new Date().toISOString();
    // optimistic update: the question appears immediately
    setMessages((prev) => [
      ...prev,
      { id: tempId, tempId, turn_id: tempId, role: 'user', content: question, status: 'completed', citations: [], feedback: null, retry_count: 0, created_at: stamp, updated_at: stamp },
    ]);
    send(question, tempId, sessionRef.current);
    return true;
  };

  // After a failed send: drop the unconfirmed message and send again as a new send.
  const resend = () => {
    if (!error || error.kind !== 'send') return;
    setMessages((prev) => prev.filter((m) => m.tempId !== error.tempId));
    handleSend(error.question);
  };

  // An edited question is a NEW turn with a new turn_id (rule 6), not an in-place change.
  const editQuestion = (text) => handleSend(text);

  // ---- retry ---------------------------------------------------------------
  const handleRetry = async (turnId) => {
    const target = messages.find((m) => m.turn_id === turnId && m.role === 'assistant');
    if (!target || retryingMessageId || isLoading) return;

    const session = sessionRef.current;
    setRetryingMessageId(target.id);
    setTyping(null);
    tell('Regenerating response with fresh citations...');
    try {
      const res = await chatApi.retryAnswer({ conversationId, turnId });
      if (session !== sessionRef.current) return;
      // replace by id: nothing is appended
      setMessages((prev) => prev.map((m) => (m.id === res.assistant_message.id ? res.assistant_message : m)));
      startTyping(res.assistant_message);
    } catch {
      if (session === sessionRef.current) tell('Retry failed. The previous answer is kept.');
    } finally {
      if (session === sessionRef.current) setRetryingMessageId('');
    }
  };

  // ---- feedback (optimistic, rolls back on failure) -------------------------
  const handleFeedback = async (messageId, rating) => {
    const target = messages.find((m) => m.id === messageId);
    if (!target || target.role !== 'assistant' || target.status !== 'completed' || retryingMessageId === messageId) return;

    const previous = target.feedback;
    const removing = previous?.rating === rating; // clicking the chosen thumb again removes it
    patch(messageId, { feedback: removing ? null : { rating, comment: null, updated_at: new Date().toISOString() } });

    try {
      if (removing) {
        await chatApi.removeRating(messageId);
      } else {
        await chatApi.rateMessage(messageId, { rating });
        tell('💡 Feedback recorded. We will refine future grounded answers.');
      }
    } catch {
      patch(messageId, { feedback: previous });
      tell('Could not save your feedback. Please try again.');
    }
  };

  // ---- conversations ---------------------------------------------------------
  const resetChat = () => {
    sessionRef.current += 1;
    stopRef.current = false;
    setMessages([]);
    setConversationId('');
    setError(null);
    setIsLoading(false);
    setRetryingMessageId('');
    setIsHistoryLoading(false);
    setTyping(null);
  };

  const newChat = () => resetChat();

  const openConversation = async (id) => {
    if (!id || id === conversationId) return;
    const session = sessionRef.current + 1;
    sessionRef.current = session;
    setIsHistoryLoading(true);
    setError(null);
    setTyping(null);
    setIsLoading(false);
    setRetryingMessageId('');
    try {
      const list = await chatApi.openConversation(id);
      if (session !== sessionRef.current) return;
      setMessages(list);
      setConversationId(id);
    } catch (e) {
      if (session !== sessionRef.current) return;
      setMessages([]);
      setError({ kind: 'history', message: e.message, conversationId: id });
    } finally {
      if (session === sessionRef.current) setIsHistoryLoading(false);
    }
  };

  const reloadHistory = () => {
    if (error?.kind === 'history') openConversation(error.conversationId);
  };

  const deleteConversation = async (id) => {
    try {
      await chatApi.deleteConversation(id);
      if (id === conversationId) resetChat(); // deleted while open -> back to a new chat
      tell('Chat thread deleted');
    } catch {
      tell('Could not delete the thread. Please try again.');
    }
  };

  const toggleDeepResearch = () => setDeepResearch((v) => !v);

  return {
    messages,
    conversationId,
    conversations,
    isLoading,
    retryingMessageId,
    error,
    isHistoryLoading,
    deepResearch,
    typing,
    busy,
    handleSend,
    resend,
    editQuestion,
    handleRetry,
    handleFeedback,
    stop,
    resumeTyping,
    newChat,
    openConversation,
    reloadHistory,
    deleteConversation,
    toggleDeepResearch,
  };
}