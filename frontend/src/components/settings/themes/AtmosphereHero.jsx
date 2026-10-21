import { RotateCcw, Shuffle } from "lucide-react";
import { SurpriseMeButton } from "../../common/ActionButtons";
import IconBadge from "../../icons/IconBadge";
import ThemeSwatch from "./ThemeSwatch";
import TypographySpecimenPill from "../typography/TypographySpecimenPill";
import SegmentedControl from "../../common/SegmentedControl";
import { SURPRISE_SCOPES } from "../../../appearance/appearance";
import { getThemeIcon } from "../../icons/themeIcons";

export default function AtmosphereHero({
  theme,
  isDefault,
  typography,
  onSurprise,
  onReset,
  scope,
  onScopeChange,
}) {
  const Icon = getThemeIcon(theme.id);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-(--border-subtle) bg-(--bg-surface) p-6 shadow-(--shadow-sm)">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-(--primary-deep) to-(--accent-highlight)"
      />

      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="min-w-0 flex-1 basis-64">
          <p className="flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-(--primary)">
            <Icon size={13} aria-hidden="true" />
            Current workspace atmosphere
          </p>
          <h4 className="mt-2 flex items-center gap-3 font-serif text-[28px] font-bold leading-tight text-(--text-primary)">
            <IconBadge icon={Icon} tone="solid" box={34} size={18} />
            {theme.name}
          </h4>
          <p className="mt-1 text-[13.5px] text-(--text-muted)">
            {theme.description}
          </p>
        </div>

        <div className="flex flex-wrap items-start gap-5">
          <div>
            <ThemeSwatch themeId={theme.id} className="h-9 w-44 rounded-lg" />
            <p className="mt-2 font-mono text-[10.5px] text-(--text-muted)">
              Sidebar • Canvas • Accent
            </p>
          </div>

          <SurpriseMeButton
            onClick={onSurprise}
            title={
              scope === "both"
                ? "Pick a random theme and typography"
                : "Pick a random theme"
            }
          />
        </div>
      </div>

      {/* Active typography pairing, shown in its own fonts */}
      <div className="mt-5">
        <TypographySpecimenPill typography={typography} />
      </div>

      {/* Footer: what Surprise Me randomizes (left) and reset (right) */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-(--border-subtle) pt-4">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-(--text-muted)">
            <Shuffle size={12} aria-hidden="true" />
            Roll scope:
          </span>
          <SegmentedControl
            label="What Surprise Me randomizes"
            options={SURPRISE_SCOPES}
            value={scope}
            onChange={onScopeChange}
          />
        </div>
        <button
          type="button"
          onClick={onReset}
          disabled={isDefault}
          className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[12px] font-medium text-(--text-secondary) transition-colors hover:text-(--primary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus) disabled:cursor-default disabled:opacity-50 disabled:hover:text-(--text-secondary)"
        >
          <RotateCcw size={13} />
          Reset Default
        </button>
      </div>
    </div>
  );
}
