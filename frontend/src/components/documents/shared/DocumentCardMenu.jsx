import { useEffect, useRef, useState } from 'react';
import { Bookmark, Columns2, Eye, MoreHorizontal } from 'lucide-react';

// The "..." menu on a document card: Open Document, Compare / Redline,
// Add to Bookmarks (items as in the reference video).
function DocumentCardMenu({ isBookmarked, onOpen, onCompare, onToggleBookmark }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Close on outside click or Escape while open
  useEffect(() => {
    if (!open) return undefined;
    const handleClick = (event) => {
      if (!wrapperRef.current?.contains(event.target)) setOpen(false);
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

  // Run an action, then close the menu
  const run = (action) => () => {
    setOpen(false);
    action?.();
  };

  const itemClass =
    'flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs font-medium text-(--text-primary) transition-colors hover:bg-(--accent-chip)';

  return (
    // Stop clicks/keys here so they don't open the card's summary page
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
          <button type="button" role="menuitem" className={itemClass} onClick={run(onOpen)}>
            <Eye size={13} className="shrink-0 text-(--text-muted)" />
            Open Document
          </button>
          <button type="button" role="menuitem" className={itemClass} onClick={run(onCompare)}>
            <Columns2 size={13} className="shrink-0 text-(--text-muted)" />
            Compare / Redline
          </button>
          <button type="button" role="menuitem" className={itemClass} onClick={run(onToggleBookmark)}>
            <Bookmark size={13} className="shrink-0 text-(--text-muted)" />
            {isBookmarked ? 'Remove Bookmark' : 'Add to Bookmarks'}
          </button>
        </div>
      )}
    </div>
  );
}

export default DocumentCardMenu;