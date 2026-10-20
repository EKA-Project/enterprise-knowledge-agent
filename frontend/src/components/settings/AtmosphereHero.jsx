import { Dices, RotateCcw } from "lucide-react";
import Button from "../common/Button";

// Order matches the labels under the bar: Sidebar • Canvas • Accent.
// The tokens are defined in variables.css; data-theme on the bar makes them resolve to this theme.
const SWATCH_TOKENS = ["--theme-swatch-1", "--theme-swatch-2", "--theme-swatch-3"];

export default function AtmosphereHero({ theme, isDefault, onSurprise, onReset }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-(--border-subtle) bg-(--bg-surface) p-6 shadow-(--shadow-sm)">
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-(--primary-deep)" />

      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="min-w-0 flex-1 basis-64">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-(--text-secondary)">
            <span aria-hidden="true">✦</span> Current workspace atmosphere
          </p>
          <h4 className="mt-2 font-serif text-[28px] font-bold leading-tight text-(--text-primary)">
            {theme.name}
          </h4>
          <p className="mt-1 text-[13.5px] text-(--text-muted)">{theme.description}</p>
        </div>

        <div className="flex flex-wrap items-start gap-5">
          <div>
            <div data-theme={theme.id} className="flex h-9 w-56 overflow-hidden rounded-lg">
              {SWATCH_TOKENS.map((token) => (
                <span
                  key={token}
                  className="flex-1"
                  style={{ backgroundColor: `var(${token})` }}
                />
              ))}
            </div>
            <p className="mt-2 font-mono text-[10.5px] text-(--text-muted)">
              Sidebar • Canvas • Accent
            </p>
          </div>

          <div className="flex flex-col items-start gap-2">
            <Button size="md" icon={Dices} onClick={onSurprise}>
              Surprise Me
            </Button>
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
      </div>
    </div>
  );
}