const KNOWN_TYPES = ["pdf", "doc", "docx", "csv", "md", "txt", "fig"];

const ACTIONS = {
  pinned: {
    // The tile and ring follow the active theme through --primary; the icon
    // itself (text colour) is always red. Hover styles are kept apart so a
    // read-only badge (no click handler) does not react to the mouse.
    className:
      "bg-[color:color-mix(in_srgb,var(--primary)_12%,transparent)] text-(--action-pinned) ring-[color:color-mix(in_srgb,var(--primary)_28%,transparent)]",
    hoverClassName:
      "hover:bg-[color:color-mix(in_srgb,var(--primary)_20%,transparent)] hover:ring-[color:color-mix(in_srgb,var(--primary)_45%,transparent)]",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 17v5" />
        <path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" />
      </svg>
    ),
  },
  saved: {
    className:
      "bg-[color:color-mix(in_srgb,var(--action-saved)_12%,transparent)] text-(--action-saved) ring-[color:color-mix(in_srgb,var(--action-saved)_30%,transparent)]",
    hoverClassName:
      "hover:bg-[color:color-mix(in_srgb,var(--action-saved)_22%,transparent)] hover:ring-[color:color-mix(in_srgb,var(--action-saved)_50%,transparent)]",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
      </svg>
    ),
  },
};

function DocumentListItem({
  type,
  title,
  meta,
  action, // "pinned" | "saved" | undefined (shows a chevron)
  actionLabel, // tooltip text, e.g. "Pinned by Admin"
  onClick,
  onActionClick,
}) {
  const typeKey = KNOWN_TYPES.includes(type?.toLowerCase())
    ? type.toLowerCase()
    : "txt";

  const actionConfig = ACTIONS[action];
  const isInteractive = Boolean(onClick);
  // No handler = read-only badge (for example the pin icon for non-admin roles)
  const isActionClickable = Boolean(onActionClick);

  const handleKeyDown = (event) => {
    if (!isInteractive) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick(event);
    }
  };

  return (
    <article
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      className="group/card relative flex cursor-pointer items-center gap-3.5 rounded-[14px] border border-(--border-subtle) bg-(--bg-surface) px-4 py-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-(--doc-doc-border) hover:shadow-(--shadow-md) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--primary)"
    >
      {/* File type tile (colors come from the --doc-* variables) */}
      <div
        style={{
          backgroundColor: `var(--doc-${typeKey}-bg)`,
          color: `var(--doc-${typeKey}-color)`,
          borderColor: `var(--doc-${typeKey}-border)`,
        }}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] border font-mono text-[0.7rem] font-bold uppercase tracking-wide shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] transition-transform duration-200 group-hover/card:scale-105"
      >
        {type}
      </div>

      {/* Title & meta */}
      <div className="min-w-0 flex-1">
        <h3 className="min-w-0 truncate text-[0.88rem] font-bold text-(--text-primary) transition-colors duration-150 group-hover/card:text-(--primary)">
          {title}
        </h3>

        <p className="mt-0.5 truncate text-[0.76rem] leading-relaxed text-(--text-muted)">
          {meta}
        </p>
      </div>

      {/* Trailing action */}
      {actionConfig ? (
        <div className="group/action relative shrink-0">
          {isActionClickable ? (
            <button
              type="button"
              aria-label={actionLabel}
              onClick={(event) => {
                event.stopPropagation();
                onActionClick();
              }}
              className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-[10px] ring-1 ring-inset transition-all duration-150 hover:scale-110 active:scale-95 ${actionConfig.className} ${actionConfig.hoverClassName}`}
            >
              {actionConfig.icon}
            </button>
          ) : (
            <span
              role="img"
              aria-label={actionLabel}
              className={`flex h-8 w-8 items-center justify-center rounded-[10px] ring-1 ring-inset ${actionConfig.className}`}
            >
              {actionConfig.icon}
            </span>
          )}

          {actionLabel && (
            <span
              role="tooltip"
              className="pointer-events-none absolute right-0 top-full z-20 mt-2 whitespace-nowrap rounded-md bg-(--text-primary) px-2.5 py-1.5 text-[0.7rem] font-medium text-(--bg-surface) opacity-0 shadow-(--shadow-md) transition-all duration-150 group-hover/action:translate-y-0 group-hover/action:opacity-100 group-focus-within/action:opacity-100 -translate-y-1"
            >
              {/* Tooltip pointer */}
              <span
                aria-hidden="true"
                className="absolute -top-1 right-3 h-2 w-2 rotate-45 bg-(--text-primary)"
              />
              {actionLabel}
            </span>
          )}
        </div>
      ) : (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 shrink-0 text-(--text-muted) transition-all duration-200 group-hover/card:translate-x-0.5 group-hover/card:text-(--primary)"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      )}
    </article>
  );
}

export default DocumentListItem;
