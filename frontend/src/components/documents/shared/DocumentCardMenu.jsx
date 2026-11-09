
import { useEffect, useRef, useState } from 'react';
import {
  Archive,
  Bookmark,
  Columns2,
  Eye,
  MoreHorizontal,
  Pencil,
  Pin,
  RefreshCw,
  Trash2,
} from 'lucide-react';

import EditMetadataModal from '../summary/EditMetadataModal.jsx';
import { useToast } from '../../../context/ToastContext.jsx';

// The "..." menu on a document card / list row.
function DocumentCardMenu({
  doc,
  adminMode = false,
  isBookmarked = false,
  isPinned = false,
  onOpen,
  onCompare,
  onToggleBookmark,
  onTogglePin,
  onEditMetadata,
  onReindex,
  onArchive,
  onDelete,
}) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  const wrapperRef = useRef(null);
  const reindexTimer = useRef(null);

  const { info, success } = useToast();

  // Close on outside click or Escape while open.
  useEffect(() => {
    if (!open) return undefined;

    const handleClick = (event) => {
      if (!wrapperRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  useEffect(() => {
    return () => clearTimeout(reindexTimer.current);
  }, []);

  // Built-in actions used when the parent does not pass its own callback.
  const handleEdit =
    onEditMetadata ?? (doc ? () => setEditing(true) : undefined);

  const handleReindex =
    onReindex ??
    (doc
      ? () => {
          info(`Re-indexing "${doc.title}"...`);

          reindexTimer.current = setTimeout(() => {
            success(
              `✓ "${doc.title}" re-indexed. Vector chunks refreshed.`,
            );
          }, 1500);
        }
      : undefined);

  const saveMetadata = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 600));

    setEditing(false);

    success(
      `✓ Metadata updated for "${values.title}". Vector chunks re-indexed.`,
    );
  };

  // Run an action, then close the menu.
  const run = (action) => () => {
    setOpen(false);
    action?.();
  };

  const itemClass =
    'flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs font-medium text-(--text-primary) transition-colors hover:bg-(--accent-chip)';

  const iconClass = 'shrink-0 text-(--text-muted)';

  return (
    <>
      <div
        ref={wrapperRef}
        className="relative"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="More document actions"
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="cursor-pointer rounded-md p-1 text-(--text-muted) transition-colors hover:text-(--text-primary)"
        >
          <MoreHorizontal size={16} />
        </button>

        {open && (
          <div
            role="menu"
            className="absolute right-0 top-full z-20 mt-1 w-44 rounded-xl border border-(--border-subtle) bg-(--bg-surface) p-1 shadow-(--shadow-md)"
          >
            <button
              type="button"
              role="menuitem"
              className={itemClass}
              onClick={run(onOpen)}
            >
              <Eye size={13} className={iconClass} />
              Open Document
            </button>

            <button
              type="button"
              role="menuitem"
              className={itemClass}
              onClick={run(onCompare)}
            >
              <Columns2 size={13} className={iconClass} />
              Compare / Redline
            </button>

            <button
              type="button"
              role="menuitem"
              className={itemClass}
              onClick={run(onToggleBookmark)}
            >
              <Bookmark
                size={13}
                className={
                  isBookmarked
                    ? 'shrink-0 fill-current text-amber-500'
                    : iconClass
                }
              />
              {isBookmarked ? 'Remove Bookmark' : 'Add to Bookmarks'}
            </button>

            {adminMode && (
              <>
                <button
                  type="button"
                  role="menuitem"
                  className={itemClass}
                  onClick={run(onTogglePin)}
                >
                  <Pin
                    size={13}
                    className={
                      isPinned
                        ? 'shrink-0 fill-current text-(--primary)'
                        : iconClass
                    }
                  />
                  {isPinned ? 'Unpin Document' : 'Pin Document'}
                </button>

                <button
                  type="button"
                  role="menuitem"
                  className={itemClass}
                  onClick={run(handleEdit)}
                >
                  <Pencil size={13} className={iconClass} />
                  Edit Metadata
                </button>

                <button
                  type="button"
                  role="menuitem"
                  className={itemClass}
                  onClick={run(handleReindex)}
                >
                  <RefreshCw size={13} className={iconClass} />
                  Re-index
                </button>

                <button
                  type="button"
                  role="menuitem"
                  className={itemClass}
                  onClick={run(onArchive)}
                >
                  <Archive size={13} className={iconClass} />
                  Archive Document
                </button>

                <div className="my-1 border-t border-(--border-subtle)" />

                <button
                  type="button"
                  role="menuitem"
                  className={`${itemClass} text-(--status-danger) hover:bg-(--status-danger-bg)`}
                  onClick={run(onDelete)}
                >
                  <Trash2 size={13} className="shrink-0" />
                  Delete
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {editing && doc && (
        <EditMetadataModal
          doc={doc}
          onClose={() => setEditing(false)}
          onSave={saveMetadata}
        />
      )}
    </>
  );
}

export default DocumentCardMenu;
