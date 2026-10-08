import { useEffect, useState } from 'react';
import { answerToLines, countChars } from '../components/chat/ChatUtils';
import {
  buildPlaceholderAnswer,
  buildPlaceholderCitation,
  getThread,
  saveThread,
} from '../../services/chatService';

const THINK_MS = 900;      // "thinking" dots before text starts
const TICK_MS = 28;        // how often new text is revealed
const CHARS_PER_TICK = 3;  // how much text is revealed per tick

let idCounter = 0;
const makeId = () => `turn-${Date.now()}-${idCounter++}`;

// Fields that start a (re)generation. The full answer is already built, but only
// `revealed` characters of it are shown. With a real streaming backend, `answer`
// would simply fill in over time instead.
function freshGeneration(question) {
  const answer = buildPlaceholderAnswer(question);
  return {
    question,
    answer,
    citation: buildPlaceholderCitation(),
    status: 'generating', // 'generating' | 'paused' | 'done'
    thinking: true,
    revealed: 0,
    total: countChars(answerToLines(answer)),
    when: 'Just now',
  };
}

export default function useChat() {
  // Turn-based: each item is one complete ledger entry.
  const [turns, setTurns] = useState([]);
  const [threadId, setThreadId] = useState(null);

  // ---- progressive generation ----------------------------------------------
  const active = turns.find((t) => t.status === 'generating');
  const activeId = active ? active.id : null;
  const activeThinking = active ? active.thinking : false;

  useEffect(() => {
    if (!activeId) return undefined;

    // phase 1: show typing dots briefly
    if (activeThinking) {
      const timer = setTimeout(() => {
        setTurns((prev) => prev.map((t) => (t.id === activeId ? { ...t, thinking: false } : t)));
      }, THINK_MS);
      return () => clearTimeout(timer);
    }

    // phase 2: reveal the answer a few characters at a time
    const timer = setInterval(() => {
      setTurns((prev) =>
        prev.map((t) => {
          if (t.id !== activeId || t.status !== 'generating') return t;
          const revealed = Math.min(t.revealed + CHARS_PER_TICK, t.total);
          return { ...t, revealed, status: revealed >= t.total ? 'done' : 'generating' };
        })
      );
    }, TICK_MS);
    return () => clearInterval(timer);
  }, [activeId, activeThinking]);
  // Pausing flips status to 'paused', so `active` disappears and the cleanup stops the timer.
  // Resuming makes it active again, and the effect continues from `revealed`.

  // ---- turn actions --------------------------------------------------------
  const submitQuestion = (raw) => {
    const question = raw.trim();
    if (!question) return false;
    setTurns((prev) => [...prev, { id: makeId(), ...freshGeneration(question) }]);
    return true;
  };

  const pauseTurn = (id) =>
    setTurns((prev) =>
      prev.map((t) => (t.id === id && t.status === 'generating' ? { ...t, status: 'paused' } : t))
    );

  const pauseActive = () => {
    if (activeId) pauseTurn(activeId);
  };

  // Only one turn generates at a time, so resuming one pauses any other.
  const resumeTurn = (id) =>
    setTurns((prev) =>
      prev.map((t) => {
        if (t.id === id && t.status === 'paused') return { ...t, status: 'generating' };
        if (t.id !== id && t.status === 'generating') return { ...t, status: 'paused' };
        return t;
      })
    );

  const regenerateTurn = (id, nextQuestion) =>
    setTurns((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...freshGeneration(nextQuestion ?? t.question) } : t))
    );

  const editQuestion = (id, question) => {
    const trimmed = question.trim();
    if (trimmed) regenerateTurn(id, trimmed);
  };

  // ---- threads (history) ---------------------------------------------------
  const commitCurrent = () => (turns.length > 0 ? saveThread(turns, threadId) : threadId);

  const newThread = () => {
    commitCurrent();
    setTurns([]);
    setThreadId(null);
  };

  const loadThread = (id) => {
    const thread = getThread(id);
    if (!thread || id === threadId) return;
    commitCurrent();
    setTurns(thread.turns.map((t) => ({ ...t, status: 'done', thinking: false, revealed: 0, total: 0 })));
    setThreadId(id);
  };

  // Called when the open thread is deleted from history.
  const detachThread = (id) => {
    if (id === threadId) setThreadId(null);
  };

  return {
    turns,
    threadId,
    isGenerating: Boolean(activeId),
    submitQuestion,
    pauseTurn,
    pauseActive,
    resumeTurn,
    regenerateTurn,
    editQuestion,
    newThread,
    loadThread,
    detachThread,
  };
}