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
