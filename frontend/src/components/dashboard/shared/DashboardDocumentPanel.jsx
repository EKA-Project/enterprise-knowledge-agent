import { useState } from "react";
import { Link } from "react-router-dom";
import DocumentListItem from "../../common/DocumentListItem.jsx";

const LINK_CLASS =
  "shrink-0 whitespace-nowrap !text-[0.78rem] font-semibold text-(--primary) transition-colors hover:underline";

// "list" = stacked rows (narrow panels); "grid" = cards side by side (full-width panel)
const LAYOUTS = {
  list: "flex flex-col gap-3",
  grid: "grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4",
};

function DashboardDocumentPanel({
  icon,
  title,
  description,
  linkLabel,
  linkTo,
  items, // [{ id, type, title, meta }] from toDocumentRow
  loading,
  error,
  onRetry,
  layout = "list",
  itemAction, // "pinned" | "saved": which trailing icon the rows show
  itemActionLabel, // tooltip + accessible label of that icon
  onItemAction, // async (item) => void. Leave it out and the icon is read-only
  emptyMessage,
  skeletonRows = 3,
  className = "",
}) {
  // A failed icon click (for example the service answers 403) shows under the header
  const [actionError, setActionError] = useState(null);
  const [busyId, setBusyId] = useState(null);

  async function handleAction(item) {
    if (busyId) return; // ignore a second click while the first is running
    setActionError(null);
    setBusyId(item.id);
    try {
      await onItemAction(item);
    } catch (err) {
      setActionError(err.message || "Something went wrong. Please try again.");
    } finally {
      setBusyId(null);
    }
  }

  let body;
  if (loading) {
    body = (
      <div className={LAYOUTS[layout]} aria-hidden="true">
        {Array.from({ length: skeletonRows }, (_, index) => (
          // Same height as a real row, so the panel does not jump when data arrives
          <div key={index} className="h-[74px] animate-pulse rounded-[14px] bg-(--border-subtle)" />
        ))}
      </div>
    );
  } else if (error) {
    body = (
      <div role="alert" className="flex flex-col items-start gap-2 py-2">
        <p className="text-[0.82rem] text-(--status-danger)">Couldn&apos;t load these documents.</p>
        <button
          type="button"
          onClick={onRetry}
          className="cursor-pointer text-[0.78rem] font-semibold text-(--primary) hover:underline"
        >
          Try again
        </button>
      </div>
    );
  } else if (items.length === 0) {
    body = <p className="py-4 text-center text-[0.82rem] text-(--text-muted)">{emptyMessage}</p>;
  } else {
    body = (
      <div className={LAYOUTS[layout]}>
        {items.map((item) => (
          <DocumentListItem
            key={item.id}
            type={item.type}
            title={item.title}
            meta={item.meta}
            action={itemAction}
            actionLabel={itemActionLabel}
            onActionClick={onItemAction ? () => handleAction(item) : undefined}
          />
        ))}
      </div>
    );
  }

  return (
    <section
      aria-busy={loading}
      className={`h-full rounded-[16px] border border-(--border-subtle) bg-(--bg-surface) shadow-(--shadow-sm) ${className}`}
    >
      {/* Header */}
      <div className="border-b border-(--border-subtle) px-6 py-5">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
          <h2 className="flex items-center gap-2 [font-family:var(--font-sans)] text-[1rem] font-bold text-(--text-primary)">
            <span aria-hidden="true">{icon}</span>
            {title}
          </h2>
          <Link to={linkTo} className={LINK_CLASS}>
            {linkLabel}
          </Link>
        </div>
        <p className="mt-1 text-[0.75rem] text-(--text-muted)">{description}</p>
        {actionError && (
          <p role="alert" className="mt-2 text-[0.75rem] text-(--status-danger)">
            {actionError}
          </p>
        )}
      </div>

      {/* Rows */}
      <div className="p-6">{body}</div>
    </section>
  );
}

export default DashboardDocumentPanel;