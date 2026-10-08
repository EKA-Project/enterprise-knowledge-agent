import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useChat from '../hooks/useChat';
import { deleteThread, getThreads } from '../../services/chatService';
import ChatMessage from '../components/chat/ChatMessage';
import ChatInput from '../components/chat/ChatInput';
import ChatHistoryDrawer from '../components/chat/ChatHistoryDrawer';
import { ArchiveIcon, FileIcon, PanelIcon, PlusIcon, ShieldCheckIcon } from '../components/chat/ChatIcons';
import { EYEBROW, MONO, SERIF } from '../components/chat/ChatUtils';
import '../styles/chat.css'; // scoped animations only

// ===================== header (page-specific, stays local) =====================
function AskEkaHeader({ historyOpen, onToggleHistory, onNewThread }) {
  const badge = `${MONO} flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-2.5 py-1 text-[10.5px] font-semibold text-[var(--text-secondary)]`;

  return (
    <header className="flex shrink-0 items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
      <div className="flex min-w-0 items-center gap-3">
        {/* opens the left history panel */}
        <button
          onClick={onToggleHistory}
          aria-label="Toggle history"
          aria-pressed={historyOpen}
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border transition ${
            historyOpen
              ? 'border-[var(--primary)] bg-[var(--primary-light)] text-[var(--primary)]'
              : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-subtle)]'
          }`}
        >
          <PanelIcon size={17} />
        </button>

        <h1 className={`${SERIF} m-0 text-[24px] font-bold text-[var(--text-primary)]`}>Talk to your organization.</h1>

        <span className={badge}>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> 24 docs (148k vectors)
        </span>
        <span className={badge}>
          <ShieldCheckIcon size={12} /> 100% Tenant-Grounded
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-2.5">
        <Link
          to="/ask-eka/history"
          className="flex items-center gap-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3.5 py-2 text-[12.5px] font-semibold text-[var(--text-primary)] transition hover:bg-[var(--bg-surface-subtle)]"
        >
          <ArchiveIcon size={14} /> History Archive
        </Link>
        <button
          onClick={onNewThread}
          className="flex items-center gap-1.5 rounded-lg bg-[var(--primary)] px-3.5 py-2 text-[12.5px] font-bold text-[var(--primary-contrast)] transition hover:bg-[var(--primary-hover)] active:scale-95"
        >
          <PlusIcon size={14} /> New Thread
        </button>
      </div>
    </header>
  );
}

// ===================== empty state (page-specific, stays local) =====================
const SUGGESTED = [
  "What's our leave policy?",
  'How do I submit an expense claim?',
  "What's the onboarding checklist for new hires?",
  "What's our remote work policy?",
];

function EmptyState({ onPick }) {
  return (
    <div className="m-auto flex flex-col items-center px-3 py-4 text-center">
      <div className="mb-2 grid h-14 w-14 place-items-center rounded-xl border border-dashed border-[var(--primary)] text-[var(--primary)]">
        <FileIcon size={22} />
      </div>
      <p className={`${EYEBROW} m-0 mb-1.5`}>ENTRY 00 · EMPTY</p>
      <h2 className={`${SERIF} m-0 mb-1.5 text-[30px] font-bold italic text-[var(--text-primary)]`}>The ledger is empty</h2>
      <p className="m-0 mb-4 max-w-[520px] text-[13px] leading-relaxed text-[var(--text-secondary)]">
        Ask a question about your organization's documents and it will be logged here, with the exact source attached.
      </p>

      <p className={`${EYEBROW} m-0 mb-3`}>TRY ONE OF THESE</p>
      <div className="flex max-w-[580px] flex-wrap justify-center gap-2.5">
        {SUGGESTED.map((q) => (
          <button
            key={q}
            onClick={() => onPick(q)}
            className={`${MONO} rounded-md border border-dashed border-[var(--border-medium)] bg-[var(--bg-surface)] px-4 py-2.5 text-[12.5px] text-[var(--text-primary)] transition hover:border-[var(--primary)] hover:bg-[var(--bg-surface-subtle)]`}
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
