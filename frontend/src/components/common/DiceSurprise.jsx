import { Sparkle } from "lucide-react";
import { SurpriseMeButton } from "./ActionButtons";
import DiceIcon from "../icons/DiceIcon";
import useSurprise from "../../hooks/useSurprise";

// The one Surprise Me control. All state lives in SurpriseContext, so every
// instance spins together when any of them is clicked.
//   variant="labeled": the "Surprise Me" pill used in the Appearance hero
//   variant="icon":    the round dice with a hover tooltip used in the Topbar
export default function DiceSurprise({
  variant = "icon",
  title,
  tooltip = "Click to change theme",
}) {
  const { isSurprising, rollCount, triggerSurprise } = useSurprise();

  if (variant === "labeled") {
    return (
      <SurpriseMeButton
        isSurprising={isSurprising}
        rollCount={rollCount}
        onClick={triggerSurprise}
        title={title}
      />
    );
  }

  return (
    // `group` lets DiceIcon's hover tilt and the tooltip react to hovering the button
    <span className="group relative inline-flex">
      <button
        type="button"
        onClick={triggerSurprise}
        aria-label={tooltip}
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 hover:bg-(--bg-surface-subtle) focus-visible:bg-(--bg-surface-subtle)"
      >
        <DiceIcon key={rollCount} rolling={isSurprising} size={20} />
      </button>

      {/* Decorative: the button already has an aria-label */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-(--border-medium) bg-(--bg-surface) px-3.5 py-1.5 text-[12px] font-semibold text-(--text-primary) opacity-0 shadow-(--shadow-md) transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
      >
        {tooltip}
        <Sparkle size={12} fill="currentColor" className="text-(--primary)" />
      </span>
    </span>
  );
}