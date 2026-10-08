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

