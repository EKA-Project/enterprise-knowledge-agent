import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
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
  ArchiveRestore,
} from 'lucide-react';

const MENU_WIDTH = 176; // w-44

// The "..." menu on a document card / list row.
// Employee & Manager: Open, Compare / Redline, Bookmark.
// Admin: also Pin, Edit Metadata, Re-index, Archive and Delete.
// The menu only shows the buttons and calls the callbacks; the modals and toasts
// live in the parent (DocumentsContent). Every callback is optional.
// The dropdown is rendered in a portal (fixed position) so table/card
// overflow-hidden can't clip it.
function DocumentCardMenu({
  adminMode = false,
  isBookmarked = false,
  isPinned = false,
  isArchived = false,
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
  const [pos, setPos] = useState(null);
  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  // Place the menu under the button (right-aligned); flip upward if it would leave the screen.
  useLayoutEffect(() => {
    if (!open) {
      setPos(null);
      return;
    }
    const rect = buttonRef.current.getBoundingClientRect();
    const height = menuRef.current?.offsetHeight ?? 0;
    const fitsBelow = rect.bottom + 4 + height + 8 <= window.innerHeight;
    const top = fitsBelow ? rect.bottom + 4 : Math.max(8, rect.top - 4 - height);
    const left = Math.max(8, rect.right - MENU_WIDTH);
    setPos({ top, left });
  }, [open]);

  // Close on outside click, Escape, scroll or resize while open.
  useEffect(() => {
    if (!open) return undefined;

    const handleClick = (event) => {
      if (
        !wrapperRef.current?.contains(event.target) &&
        !menuRef.current?.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    const handleKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    const close = () => setOpen(false);

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    window.addEventListener('scroll', close, true);
    window.addEventListener('resize', close);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
      window.removeEventListener('scroll', close, true);
      window.removeEventListener('resize', close);
    };
  }, [open]);

  // Run an action, then close the menu.
  const run = (action) => () => {
    setOpen(false);
    action?.();
  };

  const itemClass =
    'flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs font-medium text-(--text-primary) transition-colors hover:bg-(--accent-chip)';

  const iconClass = 'shrink-0 text-(--text-muted)';

  return (
    // Stops clicks/keys so they don't open the card's summary page
    <div
      ref={wrapperRef}
      className="relative"
      onClick={(event) => event.stopPropagation()}
      onKeyDown={(event) => event.stopPropagation()}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-label="More document actions"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="cursor-pointer rounded-md p-1 text-(--text-muted) transition-colors hover:text-(--text-primary)"
      >
        <MoreHorizontal size={16} />
      </button>

      {open &&
        createPortal(
          <div
            ref={menuRef}
            role="menu"
            style={pos ?? { top: 0, left: 0, visibility: 'hidden' }}
            className="fixed z-50 w-44 rounded-xl border border-(--border-subtle) bg-(--bg-surface) p-1 shadow-(--shadow-md)"
          >
            <button type="button" role="menuitem" className={itemClass} onClick={run(onOpen)}>
              <Eye size={13} className={iconClass} />
              Open Document
            </button>

            <button type="button" role="menuitem" className={itemClass} onClick={run(onToggleBookmark)}>
              <Bookmark
                size={13}
                className={isBookmarked ? 'shrink-0 fill-current text-amber-500' : iconClass}
              />
              {isBookmarked ? 'Remove Bookmark' : 'Add to Bookmarks'}
            </button>

            {adminMode && (
              <>
                <button type="button" role="menuitem" className={itemClass} onClick={run(onTogglePin)}>
                  <Pin
                    size={13}
                    className={isPinned ? 'shrink-0 fill-current text-(--primary)' : iconClass}
                  />
                  {isPinned ? 'Unpin Document' : 'Pin Document'}
                </button>

                <button type="button" role="menuitem" className={itemClass} onClick={run(onEditMetadata)}>
                  <Pencil size={13} className={iconClass} />
                  Edit Metadata
                </button>

                <button type="button" role="menuitem" className={itemClass} onClick={run(onReindex)}>
                  <RefreshCw size={13} className={iconClass} />
                  Re-index
                </button>

                <button type="button" role="menuitem" className={itemClass} onClick={run(onArchive)}>
                  {isArchived ? (
                    <ArchiveRestore size={13} className={iconClass} />
                  ) : (
                    <Archive size={13} className={iconClass} />
                  )}
                  {isArchived ? 'Unarchive Document' : 'Archive Document'}
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
          </div>,
          document.body,
        )}
    </div>
  );
}

export default DocumentCardMenu;