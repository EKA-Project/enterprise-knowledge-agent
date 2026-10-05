import { useState } from 'react';
import ChatMessage from '../components/chat/ChatMessage';
import ChatInput from '../components/chat/ChatInput';
import '../styles/chat.css'; // only for the two scoped font-family rules (see below)

// ===================== Page header (local — only used on this page) =====================
function AskEkaHeader({ onToggleHistory, onNewThread }) {
  return (
    <div className="flex items-start justify-between mb-8">
      <div className="flex items-start gap-3">
        <span className="w-9 h-9 rounded-xl grid place-items-center text-[15px]
                         bg-[var(--bg-surface)] shadow-[var(--shadow-sm)]">
          📄
        </span>
        <div>
          <p className="m-0 mb-1 text-[10px] font-extrabold tracking-wide uppercase
                         text-[var(--text-muted)]">
            CONVERSATIONAL DISCOVERY
          </p>
          <h1 className="ask-eka-serif m-0 mb-2.5 text-[28px] font-bold text-[var(--text-primary)]">
            Talk to your organization.
          </h1>
          <div className="flex gap-2">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold
                             bg-[var(--bg-surface)] border border-[var(--border-subtle)]
                             text-[var(--text-secondary)]">
              24 docs (148k vectors)
            </span>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold
                             bg-[var(--badge-bg)] border border-[var(--badge-border)]
                             text-[var(--badge-text)]">
              100% Tenant-Grounded
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-2.5">
        <button
          onClick={onToggleHistory}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[12.5px] font-semibold
                     bg-[var(--bg-surface)] border border-[var(--border-subtle)]
                     text-[var(--text-primary)] cursor-pointer whitespace-nowrap
                     hover:bg-[var(--bg-surface-subtle)]"
        >
          🕐 Toggle History
        </button>
        <button
          onClick={onNewThread}
          className="px-3.5 py-2 rounded-lg text-[12.5px] font-semibold cursor-pointer whitespace-nowrap
                     bg-[var(--bg-surface)] border border-[var(--border-subtle)]
                     text-[var(--text-primary)] hover:bg-[var(--bg-surface-subtle)]"
        >
          New Thread
        </button>
      </div>
    </div>
  );
}

// ===================== Empty state (local — only used on this page) =====================
const SUGGESTED_QUESTIONS = [
  'What is our leave policy?',
  'How do I trigger emergency Kubernetes failover?',
  'Explain SOC 2 encryption and zero-training',
];

function EmptyState({ onPickSuggestion }) {
  return (
    <div className="relative flex gap-4 pl-1 pb-10 ml-2 border-l border-[var(--border-subtle)]">
      <span className="absolute -left-[7px] top-0 w-[13px] h-[13px] rounded-full
                       border-2 border-[var(--primary)] bg-[var(--bg-surface)]" />
      <div className="flex-1 pl-6">
        <p className="m-0 mb-1.5 text-[10.5px] font-extrabold tracking-wide uppercase
                       text-[var(--text-muted)]">
          READY FOR INQUIRY
        </p>
        <h2 className="ask-eka-serif m-0 mb-2.5 text-2xl font-bold max-w-[640px]
                       text-[var(--text-primary)]">
          "Ask anything across company policies, runbooks, or architecture specs."
        </h2>
        <p className="m-0 mb-5 text-sm leading-relaxed max-w-[620px] text-[var(--text-secondary)]">
          EKA will cite exact pages and sections. Try asking about leave policies,
          multi-region failover SOP, SOC 2 compliance, or product roadmaps.
        </p>

        <div className="flex flex-wrap gap-2.5">
          {SUGGESTED_QUESTIONS.map((q) => (
            <button
              key={q}
              onClick={() => onPickSuggestion(q)}
              className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-[13px] font-semibold
                         cursor-pointer bg-[var(--bg-surface)] border border-[var(--border-subtle)]
                         text-[var(--text-primary)] hover:bg-[var(--bg-surface-subtle)]"
            >
              "{q}"
              <span aria-hidden="true">→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===================== Placeholder answer (swap this for a real API call later) =====================
// This is the ONLY function that needs to change when the backend is ready.
// Keep the same returned shape ({ intro, grounding, security, reference })
// so ChatMessage doesn't need to change.
function buildPlaceholderAnswer(question) {
  return {
    intro: `Based on an analysis of Northstar Studio's verified documentation for "${question}":`,
    grounding: 'Internal workflows require adherence to approved organizational playbooks.',
    security: 'All processing enforces tenant isolation with no external model training.',
    reference: 'Review the relevant department policy or consult with the domain lead.',
  };
}
// ===================== Page =====================
export default function AskEkaPage() {
  // turns = array of { question, answer, citation } — turn-based, not message-based
  const [turns, setTurns] = useState([]);
  const [inputValue, setInputValue] = useState('');
  function addTurn(question) {
    const trimmed = question.trim();
    if (!trimmed) return;
    setTurns([
      ...turns,
      {
        question: trimmed,
        answer: buildPlaceholderAnswer(trimmed),
        citation: {
          title: 'Design_System_Guidelines.md',
          meta: 'page 2 · verified source',
        },
      },
    ]);
    setInputValue('');
  }
  function handleSend() {
    addTurn(inputValue);
  }
  function handleNewThread() {
    setTurns([]);
    setInputValue('');
  }
  function handleToggleHistory() {
    // placeholder — no history panel wired up yet
  }
  return (
    <div className="ask-eka-page relative px-8 pt-6 pb-36 bg-[var(--bg-app)]">
      <AskEkaHeader onToggleHistory={handleToggleHistory} onNewThread={handleNewThread} />
      {turns.length === 0 ? (
        <EmptyState onPickSuggestion={addTurn} />
      ) : (
        turns.map((turn, i) => (
          <ChatMessage
            key={i}
            entryNumber={i + 1}
            question={turn.question}
            answer={turn.answer}
            citation={turn.citation}
          />
        ))
      )}
      <ChatInput
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onSend={handleSend}
        requestNumber={turns.length + 1}
      />
    </div>
  );
}