import { Eye, MoreHorizontal, Pencil, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

/* ==========================================================================
   ManagerDocumentRowMenu
   --------------------------------------------------------------------------
   The "..." menu on a row of the manager documents table. It owns only its own
   open/closed state; what each item DOES comes in through props.

   The panel is position: fixed (like the team roster menu), so the table's
   overflow-x-auto cannot clip it. Because a fixed panel does not follow the
   page, it closes on scroll and resize instead of floating in the wrong place.
   ========================================================================== */

const MENU_ITEM =
  "flex w-full cursor-pointer items-center gap-2.5 px-3.5 py-2 text-left text-[0.78rem] font-semibold text-(--text-primary) transition-colors enabled:hover:bg-(--bg-surface-subtle) disabled:cursor-not-allowed disabled:opacity-40";

function ManagerDocumentRowMenu({
  row,
  reindexDisabled = false,
  onViewDetails,
  onEdit,
  onReindex,
}) {
  // null = closed; otherwise { right, top } or { right, bottom } in viewport pixels
  const [position, setPosition] = useState(null);
  const isOpen = position !== null;

  // While open: Escape, scroll and resize close the menu
  useEffect(() => {
    if (!isOpen) return;
    const close = () => setPosition(null);
    const closeOnEscape = (event) => event.key === "Escape" && close();

    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", close);
    window.addEventListener("scroll", close, true); // capture: also scrolling inside containers
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", close);
      window.removeEventListener("scroll", close, true);
    };
  }, [isOpen]);

  function toggle(event) {
    event.stopPropagation(); // do not also trigger the row click
    if (isOpen) return setPosition(null);

    const rect = event.currentTarget.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    // Near the bottom of the screen the menu opens upwards instead
    setPosition({
      right: window.innerWidth - rect.right,
      ...(spaceBelow < 160
        ? { bottom: window.innerHeight - rect.top + 4 }
        : { top: rect.bottom + 4 }),
    });
  }

  // Runs an item's action, closes the menu and keeps the click away from the row
  const choose = (action) => (event) => {
    event.stopPropagation();
    setPosition(null);
    action(row);
  };

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        aria-label={`Actions for ${row.title}`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="cursor-pointer rounded-lg border border-(--border-subtle) p-1.5 text-(--text-muted) transition-colors hover:bg-(--bg-surface-subtle) hover:text-(--text-primary)"
      >
        <MoreHorizontal size={14} />
      </button>

      {isOpen && (
        <>
          {/* Click-away layer */}
          <div
            className="fixed inset-0 z-40"
            onClick={(event) => {
              event.stopPropagation();
              setPosition(null);
            }}
          />
          <div
            role="menu"
            className="fixed z-50 w-44 overflow-hidden rounded-xl border border-(--border-subtle) bg-(--bg-surface) py-1 shadow-md"
            style={position}
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" role="menuitem" className={MENU_ITEM} onClick={choose(onViewDetails)}>
              <Eye size={14} aria-hidden="true" />
              View Details
            </button>
            <button type="button" role="menuitem" className={MENU_ITEM} onClick={choose(onEdit)}>
              <Pencil size={14} aria-hidden="true" />
              Edit Metadata
            </button>
            <button
              type="button"
              role="menuitem"
              className={MENU_ITEM}
              disabled={reindexDisabled}
              onClick={choose(onReindex)}
            >
              <RefreshCw size={14} aria-hidden="true" />
              {row.status === "failed" ? "Retry indexing" : "Re-index vector"}
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default ManagerDocumentRowMenu;