import { useMemo, useState } from 'react';
import { deleteThread, getThreads, summarizeThread, toggleArchiveThread } from '../../services/chatService';
import { Link, useNavigate } from 'react-router-dom';
import { ArchiveIcon, ArrowLeftIcon, ArrowRightIcon, MessageIcon, SearchIcon, ShieldCheckIcon, TrashIcon } from '../components/chat/ChatIcons';
import { EYEBROW, MONO, SERIF } from '../components/chat/ChatUtils';

function ThreadCard({ thread, onResume, onArchive, onDelete }) {
  const { title, snippet, messageCount } = summarizeThread(thread);
  const iconBtn =
    'grid h-8 w-8 place-items-center rounded-lg border border-[var(--border-subtle)] text-[var(--text-muted)] transition hover:bg-[var(--bg-surface-subtle)]';

  return (
    <article className="flex items-start gap-5 rounded-[22px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 transition [box-shadow:var(--shadow-sm)] hover:[box-shadow:var(--shadow-md)]">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[var(--sidebar-bg)] text-[var(--sidebar-text)]">
        <MessageIcon size={18} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <h3 className={`${SERIF} m-0 truncate text-[19px] font-semibold italic text-[var(--text-primary)]`}>{title}</h3>
          {thread.archived && (
            <span className={`${MONO} rounded-full bg-[var(--bg-surface-subtle)] px-2 py-0.5 text-[10px] font-bold uppercase text-[var(--text-muted)]`}>
              Archived
            </span>
          )}
        </div>
        <p className="m-0 mb-3 line-clamp-2 text-[13.5px] leading-relaxed text-[var(--text-secondary)]">{snippet}</p>

        <div className={`${MONO} flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-[var(--text-muted)]`}>
          <span>{messageCount} messages</span>
          <span>{thread.updated}</span>
          <span className="flex items-center gap-1.5 text-[var(--badge-text)]">
            <ShieldCheckIcon size={12} /> Tenant-Grounded
          </span>
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-2">
        <button
          onClick={() => onResume(thread.id)}
          className="flex items-center gap-2 rounded-full bg-[var(--primary)] px-4 py-2 text-[12.5px] font-bold text-[var(--primary-contrast)] transition hover:bg-[var(--primary-hover)] active:scale-95"
        >
          Resume Thread <ArrowRightIcon size={13} />
        </button>
        <div className="flex gap-1.5">
          <button onClick={() => onArchive(thread.id)} title={thread.archived ? 'Unarchive' : 'Archive'} className={iconBtn}>
            <ArchiveIcon size={14} />
          </button>
          <button
            onClick={() => onDelete(thread.id)}
            title="Delete"
            className={`${iconBtn} hover:!bg-[var(--status-danger-bg)] hover:!text-[var(--status-danger)]`}
          >
            <TrashIcon size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}
