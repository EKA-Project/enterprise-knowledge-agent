import { useEffect, useRef, useState } from "react";
import { Check, Copy, RefreshCw, Share, ThumbsDown, ThumbsUp } from "lucide-react";

const COPIED_MS = 1500;

/**
 * One icon button in the row.
 * active: stays highlighted (thumbs up/down); activeClass sets its colours.
 */
function ActionIconButton({
  label,
  icon: Icon,
  onClick,
  disabled = false,
  active = false,
  pressed,
  hoverClass,
  activeClass,
  iconClass = "",
  iconSize = 15,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-pressed={pressed}
      title={label}
      className={`group grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-lg border border-transparent transition-all duration-200 hover:scale-110 active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus) disabled:cursor-not-allowed disabled:opacity-60 ${
        active ? activeClass : `text-(--text-muted) ${hoverClass}`
      }`}
    >
      <Icon
        size={iconSize}
        aria-hidden="true"
        className={`transition-transform duration-300 ease-out ${iconClass}`}
      />
    </button>
  );
}

const PRIMARY_HOVER =
  "hover:border-(--border-medium) hover:bg-(--primary-light) hover:text-(--primary) hover:shadow-(--shadow-sm)";
const SUCCESS_HOVER =
  "hover:border-(--status-verified-border) hover:bg-(--status-verified-bg) hover:text-(--status-verified) hover:shadow-(--shadow-sm)";
const SUCCESS_ACTIVE =
  "border-[color-mix(in_srgb,var(--status-verified)_55%,transparent)] bg-[color-mix(in_srgb,var(--status-verified)_24%,transparent)] text-(--status-verified)";
const DANGER_HOVER =
  "hover:border-(--status-failure-border) hover:bg-(--status-failure-bg) hover:text-(--status-failure) hover:shadow-(--shadow-sm)";
const DANGER_ACTIVE =
  "border-[color-mix(in_srgb,var(--status-danger)_50%,transparent)] bg-[color-mix(in_srgb,var(--status-danger)_16%,transparent)] text-(--status-danger)";
/**
 * onCopy?: () => void           (the check tile is handled here)
 * onFeedback?: ("up" | "down") => void   (called when a rating is chosen)
 * onShare?: () => void
 * onRegenerate?: () => void
 * regenerating?: boolean        (spins the icon and disables the button)
 * initialRating?: "up" | "down" | null
 * className?: string
 */
export default function ActionRating({
  onCopy,
  onFeedback,
  onShare,
  onRegenerate,
  regenerating = false,
  initialRating = null,
  className = "",
}) {
  const [rating, setRating] = useState(initialRating);
  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef(null);

  useEffect(() => () => clearTimeout(copiedTimer.current), []);

  const handleCopy = () => {
    onCopy?.();
    setCopied(true);
    clearTimeout(copiedTimer.current);
    copiedTimer.current = setTimeout(() => setCopied(false), COPIED_MS);
  };

  const handleRate = (kind) => {
    if (rating === kind) {
      setRating(null); // click the active one again to clear it
      return;
    }
    setRating(kind);
    onFeedback?.(kind);
  };

  return (
    <div role="group" aria-label="Answer actions" className={`flex items-center gap-1 ${className}`}>
      <ActionIconButton
        label={copied ? "Copied" : "Copy answer"}
        icon={copied ? Check : Copy}
        onClick={handleCopy}
        active={copied}
        activeClass={SUCCESS_ACTIVE}
        hoverClass={PRIMARY_HOVER}
        iconSize={copied ? 13 : 15}
        iconClass="group-hover:-rotate-12 group-hover:scale-110"
      />

      <ActionIconButton
        label="Helpful"
        icon={ThumbsUp}
        onClick={() => handleRate("up")}
        active={rating === "up"}
        pressed={rating === "up"}
        activeClass={SUCCESS_ACTIVE}
hoverClass={SUCCESS_HOVER}
        iconClass="group-hover:-rotate-12 group-hover:scale-110"
      />

      <ActionIconButton
        label="Not helpful"
        icon={ThumbsDown}
        onClick={() => handleRate("down")}
        active={rating === "down"}
        pressed={rating === "down"}
        activeClass={DANGER_ACTIVE}
        hoverClass={DANGER_HOVER}
        iconClass="group-hover:rotate-12 group-hover:scale-110"
      />

      <ActionIconButton
        label="Share answer"
        icon={Share}
        onClick={() => onShare?.()}
        hoverClass={PRIMARY_HOVER}
        iconClass="group-hover:-translate-y-0.5 group-hover:scale-110"
      />

      <ActionIconButton
        label="Regenerate answer"
        icon={RefreshCw}
        onClick={() => onRegenerate?.()}
        disabled={regenerating}
        hoverClass={PRIMARY_HOVER}
        iconClass={regenerating ? "animate-spin" : "group-hover:rotate-180"}
      />
    </div>
  );
}