import { useEffect, useRef } from "react";
import SettingsPanel, { SubSection } from "./SettingsPanel";
import { Select } from "../common/Input";
import useAppearance from "../../hooks/useAppearance";
import useToast from "../../hooks/useToast";
import { THEMES, DEFAULT_THEME } from "../../appearance/theme";
import AtmosphereHero from "./AtmosphereHero";
import { ALL_FONTS, TYPOGRAPHY, loadFonts } from "../../appearance/fontStudio";
import { DENSITIES, SCALES } from "../../appearance/appearance";

// ---------- Theme swatches ----------
// Colours come from the real theme variables (via data-theme on the swatch), so they can't drift from variables.css.
// The swatch tokens are defined in variables.css. Order: sidebar, app background, accent.
const SWATCH_TOKENS = [
  "--theme-swatch-1",
  "--theme-swatch-2",
  "--theme-swatch-3",
];
const swatchColor = (token) => ({ backgroundColor: `var(${token})` });

// ---------- Shared styles ----------
const pill =
  "rounded-full bg-(--bg-surface-subtle) px-2.5 py-0.5 text-[10.5px] font-semibold text-(--text-secondary)";
const card = (on) =>
  `rounded-2xl border bg-(--bg-surface) text-left transition duration-200 hover:-translate-y-1 hover:shadow-(--shadow-md) ${
    on
      ? "border-[1.5px] border-(--primary-deep) shadow-(--shadow-md)"
      : "border-(--border-subtle) hover:border-(--primary)"
  }`;

export default function AppearanceSettings() {
  const toast = useToast();
  const [appearance, update] = useAppearance();
  const { theme } = appearance;
  const lastToast = useRef(null); // quick clicks replace the toast instead of piling up

  useEffect(() => loadFonts(ALL_FONTS, "eka-preview-fonts"), []); // so every font card previews in its own typeface

  const announce = (message, name) => {
    if (lastToast.current) toast.dismiss(lastToast.current);
    lastToast.current = toast.success(message, {
      description: name,
      duration: 2500,
    });
  };

  const pickTheme = (t) => {
    if (t.id === theme) return; // already active, nothing to announce
    update({ theme: t.id });
    announce("Theme applied", t.name);
  };
  const activeTheme =
    THEMES.find((t) => t.id === theme) ??
    THEMES.find((t) => t.id === DEFAULT_THEME);

  // Random theme, never the one already active.
  const surprise = () => {
    const pool = THEMES.filter((t) => t.id !== theme);
    const t = pool[Math.floor(Math.random() * pool.length)];
    update({ theme: t.id });
    announce("Surprise pick applied", t.name);
  };

  // Resets the theme only; typography, density and scale stay as chosen.
  const reset = () => {
    if (theme === DEFAULT_THEME) return;
    const t = THEMES.find((x) => x.id === DEFAULT_THEME);
    update({ theme: DEFAULT_THEME });
    announce("Default theme restored", t.name);
  };

  const pickFont = (f) => {
    if (f.id === appearance.typography) return;
    update({ typography: f.id });
    announce("Typography applied", f.name);
  };

  return (
    <SettingsPanel
      title="Appearance & Atmosphere Studio"
      description={`${THEMES.length} curated workspace themes, editorial typography pairings, and layout ergonomics.`}
      badge={
        <span className="ml-auto rounded-full bg-(--bg-surface-subtle) px-3 py-1 font-mono text-[11px] text-(--text-secondary)">
          Theme System v2.5 • {THEMES.length} Atmospheres
        </span>
      }
    >
      {/* ---------- Active atmosphere hero ---------- */}
      <AtmosphereHero
        theme={activeTheme}
        isDefault={theme === DEFAULT_THEME}
        onSurprise={surprise}
        onReset={reset}
      />

      {/* ---------- Theme cards ---------- */}
      <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {THEMES.map((t) => {
          const on = theme === t.id;
          return (
            <button
              key={t.id}
              type="button"
              aria-pressed={on}
              onClick={() => pickTheme(t)}
              className={`${card(on)} p-3`}
            >
              <span
                data-theme={t.id}
                className="flex h-9 overflow-hidden rounded-lg"
              >
                {SWATCH_TOKENS.map((token) => (
                  <span
                    key={token}
                    className="flex-1"
                    style={swatchColor(token)}
                  />
                ))}
              </span>
              <span className="mt-3 flex items-center justify-between gap-2">
                <span className="text-[13px] font-bold text-(--text-primary)">
                  {t.name}
                </span>
                {on && <span className={pill}>Active</span>}
              </span>
              <span className="mt-1 block text-[11px] leading-snug text-(--text-muted)">
                {t.description}
              </span>
            </button>
          );
        })}
      </div>

      {/* ---------- Typography ---------- */}
      <SubSection
        title="Typography & Font Style"
        description="Choose curated editorial and modern typography pairings across the workspace"
        aside={
          <span className={`${pill} font-mono`}>
            Current:{" "}
            {TYPOGRAPHY.find((f) => f.id === appearance.typography)?.name}
          </span>
        }
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TYPOGRAPHY.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={appearance.typography === f.id}
              onClick={() => pickFont(f)}
              className={`${card(appearance.typography === f.id)} flex flex-col p-4`}
            >
              <span className="flex items-center justify-between gap-2 text-[13px] font-bold text-(--text-primary)">
                {f.name}
                {appearance.typography === f.id && (
                  <span className={pill}>Active</span>
                )}
              </span>
              <span
                className="mt-2 text-[19px] font-bold leading-tight text-(--text-primary)"
                style={{ fontFamily: `"${f.serif}", serif` }}
              >
                {f.sample}
              </span>
              <span
                className="mt-1.5 text-[12px] leading-snug text-(--text-secondary)"
                style={{ fontFamily: `"${f.sans}", sans-serif` }}
              >
                {f.desc}
              </span>
              <span
                className="mt-auto block border-t border-(--border-subtle) pt-2.5 text-[10.5px] text-(--text-muted)"
                style={{ fontFamily: `"${f.mono}", monospace` }}
              >
                {f.serif} • {f.sans} • {f.mono}
              </span>
            </button>
          ))}
        </div>
      </SubSection>

      {/* ---------- Density & scale ---------- */}
      <div className="mt-8 grid grid-cols-1 gap-5 border-t border-(--border-subtle) pt-8 sm:grid-cols-2">
        <Select
          label="Interface Layout Density"
          value={appearance.density}
          onChange={(e) => update({ density: e.target.value })}
        >
          {DENSITIES.map((d) => (
            <option key={d.id} value={d.id}>
              {d.label}
            </option>
          ))}
        </Select>
        <Select
          label="Typography Scale"
          value={appearance.scale}
          onChange={(e) => update({ scale: e.target.value })}
        >
          {SCALES.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </Select>
      </div>
    </SettingsPanel>
  );
}
