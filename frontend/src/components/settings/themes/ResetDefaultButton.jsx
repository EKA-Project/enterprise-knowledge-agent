import { useState } from "react";
import { RotateCcw } from "lucide-react";

// Ghost "Reset Default" button with visible feedback:
//  - hover: soft background and the icon turns half a revolution
//  - click: the icon adds one more full counter-clockwise turn, so the action registers
//    even though the button usually disables itself right afterwards (nothing left to reset)
export default function ResetDefaultButton({ onClick, disabled }) {
  const [turns, setTurns] = useState(0);

  return (
    <button
      type="button"
      title="Restore the default theme and typography"
      disabled={disabled}
      onClick={(e) => {
        setTurns((n) => n + 1);
        onClick?.(e);
      }}
      className="group inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[12px] font-medium text-(--text-secondary) transition duration-200 hover:bg-(--bg-surface-subtle) hover:text-(--primary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus) active:scale-95 disabled:pointer-events-none disabled:opacity-50"
    >
      <RotateCcw
        size={13}
        aria-hidden="true"
        className="transition-transform duration-500 ease-out group-hover:-rotate-180 motion-reduce:transition-none"
        // Tailwind's rotate-* sets the separate CSS `rotate` property, so this inline
        // `transform` adds to the hover turn instead of fighting it.
        style={{ transform: `rotate(${-360 * turns}deg)` }}
      />
      Reset Default
    </button>
  );
}