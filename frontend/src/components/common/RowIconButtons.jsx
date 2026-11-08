import { Eye, Pencil, RefreshCw, UserX } from "lucide-react";
import Tooltip from "./Tooltip";

/* ==========================================================================
   RowIconButtons  (components/common/RowIconButtons.jsx)
   --------------------------------------------------------------------------
   Icon-only buttons for the action column of a table row. They are borderless
   and round, unlike the label pills in Button.jsx and ActionButtons.jsx.

   Each named export fixes its icon, default label and tone. A page supplies
   only what it owns: the handler and any extra props.

       <ViewButton onClick={() => openDetails(row)} />
       <ReindexButton failed={row.status === "failed"} loading={busy} />

   Every button stops the click from reaching the row, so pressing an icon
   never also triggers the row's own click handler.
   ========================================================================== */

// Colour per tone. Only theme tokens, so every theme works.
const TONE = {
  neutral:
    "text-(--text-muted) hover:bg-(--bg-surface-subtle) hover:text-(--primary)",
  danger:
    "text-(--text-muted) hover:bg-(--status-failure-subtle) hover:text-(--status-danger)",
  failed:
    "text-(--status-danger) hover:bg-(--status-failure-subtle)",
};

// Shared base. Not exported: pages use the named wrappers below.
function RowIconButton({
  icon: Icon,
  label,
  onClick,
  tone = "neutral",
  disabled = false,
  loading = false,
  className = "",
}) {
  function handleClick(event) {
    event.stopPropagation(); // keep the click away from the row
    onClick?.(event);
  }

  return (
    <Tooltip label={label}>
      <button
        type="button"
        aria-label={label}
        aria-busy={loading || undefined}
        disabled={disabled || loading}
        onClick={handleClick}
        className={`inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${TONE[tone]} ${className}`}
      >
        <Icon
          size={14}
          aria-hidden="true"
          className={loading ? "animate-spin" : ""}
        />
      </button>
    </Tooltip>
  );
}

/**
 * Props for every wrapper below:
 * @param {() => void} [onClick]     Page-specific handler (opens its own modal, etc.)
 * @param {string} [label]           Tooltip and aria-label. Overrides the default.
 * @param {boolean} [disabled]
 * @param {boolean} [loading]        Spins the icon and blocks clicks.
 */

// View: opens a details view. Neutral tone.
export function ViewButton({ label = "View", ...props }) {
  return <RowIconButton icon={Eye} label={label} {...props} />;
}

// Edit: opens an edit form. Neutral tone.
export function EditButton({ label = "Edit", ...props }) {
  return <RowIconButton icon={Pencil} label={label} {...props} />;
}

// Re-index: starts indexing again. Red on a failed row, so the problem stands out.
// Pass failed={true} for failed rows; the label then reads "Retry indexing" by default.
export function ReindexButton({ failed = false, label, ...props }) {
  return (
    <RowIconButton
      icon={RefreshCw}
      label={label ?? (failed ? "Retry indexing" : "Re-index")}
      tone={failed ? "failed" : "neutral"}
      {...props}
    />
  );
}

// Remove: destructive, so it turns red on hover.
export function RemoveButton({ label = "Remove", ...props }) {
  return <RowIconButton icon={UserX} label={label} tone="danger" {...props} />;
}