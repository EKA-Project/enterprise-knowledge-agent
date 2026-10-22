import { ArrowRight } from "lucide-react";
import { themeTag } from "../../../../appearance/theme";
import IconBadge from "../../../icons/IconBadge";
import { getThemeIcon } from "../../../icons/themeIcons";
import ThemeSwatch from "./ThemeSwatch";

// Spring-eased lift on hover; the glow ring inside previews THAT theme's own colours.
const base =
  "group relative flex flex-col rounded-2xl border bg-(--bg-surface) p-3.5 text-left transition-transform duration-300 ease-[cubic-bezier(0.22,1.2,0.36,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus) motion-safe:hover:-translate-y-1.5 motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.99]";
const rest = "border-(--border-subtle)";
const applied = "border-[1.5px] border-(--primary-deep) shadow-(--shadow-md)";

export default function ThemeCard({ theme, active, onSelect }) {
  const handleClick = () => {
    // Prevent repeated clicks on the active card
    if (!active) onSelect(theme);
  };

  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={handleClick}
      className={`${base} ${active ? applied : rest} ${
        active
          ? "motion-safe:!hover:translate-y-0 motion-safe:!hover:scale-100 cursor-not-allowed"
          : ""
      }`}
    >
      {/* data-theme on this overlay makes --primary / --primary-glow resolve to the hovered theme */}
      <span
        aria-hidden="true"
        data-theme={theme.id}
        className="pointer-events-none absolute -inset-px rounded-2xl border-[1.5px] border-(--primary) opacity-0 shadow-[0_8px_20px_-6px_var(--primary-glow)] transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
      />

      <ThemeSwatch themeId={theme.id} shine />

      <span className="mt-3 flex items-center gap-2">
        <IconBadge
          icon={getThemeIcon(theme.id)}
          tone={active ? "solid" : "soft"}
          className={`${
            active
              ? "motion-safe:group-hover:scale-100"
              : "motion-safe:group-hover:-rotate-6"
          } ${
            !active
              ? "border border-(--border-subtle) motion-safe:group-hover:border-(--primary)"
              : ""
          }`}
        />
        <span className="text-[13.5px] font-bold text-(--text-primary)">
          {theme.name}
        </span>
      </span>
      <span className="mb-3 mt-1 block text-[12px] leading-snug text-(--text-muted)">
        {theme.description}
      </span>

      {/* mt-auto pins the footer to the bottom, so every card in a row lines up */}
      <span className="mt-auto flex items-center justify-between gap-2 border-t border-(--border-subtle) pt-2.5">
        <span className="rounded-md bg-(--bg-surface-subtle) px-1.5 py-px font-mono text-[9.5px] font-semibold uppercase tracking-wider text-(--text-secondary)">
          {themeTag(theme)}
        </span>
        {active ? (
          <span className="rounded-full bg-(--primary-light) px-2 py-px text-[10px] font-bold text-(--primary)">
            <span aria-hidden="true">✦</span> Applied
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[12px] text-(--text-muted) transition-colors group-hover:text-(--primary)">
            Select
            <ArrowRight
              size={12}
              aria-hidden="true"
              className="-translate-x-1 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
            />
          </span>
        )}
      </span>
    </button>
  );
}
