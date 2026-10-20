import { themeTag } from "../../../appearance/theme";
import IconBadge from "../../icons/IconBadge";
import { getThemeIcon } from "../../icons/themeIcons";
import { card } from "../cardStyles";
import ThemeSwatch from "./ThemeSwatch";

export default function ThemeCard({ theme, active, onSelect }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={() => onSelect(theme)}
      className={`${card(active)} group flex flex-col p-3.5`}
    >
      <ThemeSwatch themeId={theme.id} />

      <span className="mt-3 flex items-center gap-2">
        <IconBadge icon={getThemeIcon(theme.id)} />
        <span className="text-[13.5px] font-bold text-(--text-primary)">{theme.name}</span>
      </span>
      <span className="mb-3 mt-1 block text-[12px] leading-snug text-(--text-muted)">
        {theme.description}
      </span>

      {/* mt-auto pins the footer to the bottom, so every card in a row lines up */}
      <span className="mt-auto flex items-center justify-between gap-2 border-t border-(--border-subtle) pt-2.5">
        <span className="rounded-md bg-(--bg-surface-subtle) px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-(--text-secondary)">
          {themeTag(theme)}
        </span>
        {active ? (
          <span className="rounded-full bg-(--primary-light) px-2.5 py-0.5 text-[10.5px] font-bold text-(--primary)">
            <span aria-hidden="true">✦</span> Applied
          </span>
        ) : (
          <span className="text-[12px] text-(--text-muted) transition-colors group-hover:text-(--primary)">
            Select
          </span>
        )}
      </span>
    </button>
  );
}