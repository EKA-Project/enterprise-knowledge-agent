import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useChat from '../hooks/useChat';
import useToastStack from '../hooks/useToastStack';
import { deleteThread, getThreads, subscribeThreads } from '../../components/chat/chatMock';
import ChatMessage from '../components/chat/ChatMessage';
import ChatInput from '../components/chat/ChatInput';
import ChatHistoryDrawer from '../components/chat/ChatHistoryDrawer';
import ToastStack from '../components/chat/ToastStack';
import {
  Clock as ClockIcon,
  FileText as FileIcon,
  FlaskConical as FlaskIcon,
  PanelLeft as PanelIcon,
  Plus as PlusIcon,
  ShieldCheck as ShieldCheckIcon,
} from 'lucide-react';
import { EYEBROW, MONO, SERIF } from '../components/chat/ChatUtils';
import '../styles/chat.css'; // hard animations live here

// ===================== header (page-specific, stays local) =====================
function AskEkaHeader({ historyOpen, onToggleHistory, onNewThread, deepResearch, onToggleDeepResearch }) {
  const badge = `${MONO} inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-2.5 py-1 text-[10.5px] font-semibold text-[var(--text-secondary)]`;
  const pill =
    'flex cursor-pointer items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12px] font-semibold transition-all duration-200 hover:-translate-y-0.5 active:scale-95';

  return (
    <header className="flex shrink-0 flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-3">
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-2">
        {/* opens the left history panel */}
        <button
          type="button"
          onClick={onToggleHistory}
          aria-label="Toggle history"
          aria-pressed={historyOpen}
          className={`grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-lg border transition ${
            historyOpen
              ? 'border-[var(--primary)] bg-[var(--primary-light)] text-[var(--primary)]'
              : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-subtle)]'
          }`}
        >
          <PanelIcon size={17} />
        </button>

        <h1 className={`${SERIF} m-0 text-[24px] font-bold leading-tight text-[var(--text-primary)]`}>
          Talk to your organization.
        </h1>

        <div className="flex flex-wrap items-center gap-2">
          <span className={badge}>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            24 docs (148k vectors)
          </span>
          <span className={badge}>
            <ShieldCheckIcon size={12} />
            100% Tenant-Grounded
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2.5">

        <Link
          to="/ask-eka/history"
          className={`${pill} border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--border-medium)] hover:bg-[var(--bg-surface-subtle)]`}
        >
          <ClockIcon size={14} /> Chat History
        </Link>

        <button
          type="button"
          onClick={onNewThread}
          className={`${pill} border-transparent bg-[var(--primary)] font-bold text-[var(--primary-contrast)] hover:bg-[var(--primary-hover)]`}
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
            type="button"
            onClick={() => onPick(q)}
            className={`${MONO} cursor-pointer rounded-md border border-dashed border-[var(--border-medium)] bg-[var(--bg-surface)] px-4 py-2.5 text-[12.5px] text-[var(--text-primary)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--primary)] hover:bg-[var(--bg-surface-subtle)]`}
          >
            <span className="mr-1.5 text-[var(--primary)]">✦</span>
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
