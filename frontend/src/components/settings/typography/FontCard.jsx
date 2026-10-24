import { fontTag } from "../../../appearance/fontStudio";
import { card } from "../cardStyles";

// One typography pairing. The heading specimen uses the pairing's heading font (the `serif` slot),
// the description its body font (the `sans` slot) and the footer its code font (the `mono` slot).
export default function FontCard({ font, active, onSelect }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={() => onSelect(font)}
      className={`${card(active)} flex flex-col p-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus)`}
    >
      <span className="flex items-center justify-between gap-2">
        <span className="text-[13px] font-bold text-(--text-primary)">{font.name}</span>
        {active && (
          <span className="rounded-full bg-(--primary-light) px-2 py-px text-[10px] font-bold text-(--primary)">
            <span aria-hidden="true">✦</span> Applied
          </span>
        )}
      </span>

      <span
        className="mt-2 text-[19px] font-bold leading-tight text-(--text-primary)"
        style={{ fontFamily: `"${font.serif}", serif` }}
      >
        {font.sample}
      </span>
      <span
        className="mb-3 mt-1.5 text-[12px] leading-snug text-(--text-secondary)"
        style={{ fontFamily: `"${font.sans}", sans-serif` }}
      >
        {font.desc}
      </span>

      {/* mt-auto pins the footer to the bottom, so every card in a row lines up */}
      <span className="mt-auto flex items-center justify-between gap-2 border-t border-(--border-subtle) pt-2.5">
        <span
          className="min-w-0 text-[10px] leading-snug text-(--text-muted)"
          style={{ fontFamily: `"${font.mono}", monospace` }}
        >
          {font.serif} • {font.sans} • {font.mono}
        </span>
        <span className="shrink-0 rounded-md bg-(--bg-surface-subtle) px-1.5 py-px font-mono text-[9.5px] font-semibold uppercase tracking-wider text-(--text-secondary)">
          {fontTag(font)}
        </span>
      </span>
    </button>
  );
}