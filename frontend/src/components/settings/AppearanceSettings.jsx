import { useEffect, useState } from "react";
import SettingsPanel, { SubSection } from "./SettingsPanel";
import { Select } from "../common/Input";
import {
  ALL_FONTS,
  DENSITIES,
  SCALES,
  TYPOGRAPHY,
  loadFonts,
} from "./settingsConfig";
import { THEMES, applyTheme, getSavedTheme } from "../../theme";

// Swatch colours come from the real theme variables, so they can't drift from variables.css.
// Order: sidebar, app background, accent. Rename here if your token names differ.
const SWATCH_TOKENS = ["--sidebar-bg", "--bg-app", "--primary"];
const swatchColor = (token) => ({ backgroundColor: `var(${token})` });
const pill =
  "rounded-full bg-(--bg-surface-subtle) px-2.5 py-0.5 text-[10.5px] font-semibold text-(--text-secondary)";
const card = (on) =>
  `rounded-2xl border bg-(--bg-surface) text-left transition duration-200 hover:-translate-y-1 hover:shadow-(--shadow-md) ${
    on
      ? "border-[1.5px] border-(--primary-deep) shadow-(--shadow-md)"
      : "border-(--border-subtle) hover:border-(--primary)"
  }`;

export default function AppearanceSettings({ settings, update, toast }) {
  // The active theme is whatever data-theme is on <html> right now.
  const [theme, setTheme] = useState(
    () =>
      document.documentElement.getAttribute("data-theme") ?? getSavedTheme(),
  );

  useEffect(() => loadFonts(ALL_FONTS), []); // so every font card previews in its own typeface

  const pickTheme = (t) => {
    applyTheme(t.id);
    setTheme(t.id);
    toast(`🎨 Theme applied: ${t.name}`);
  };
  const pickFont = (f) => {
    update({ typography: f.id });
    toast(`🔤 Typography applied: ${f.name}`);
  };

  return (
    <SettingsPanel
      title="Appearance & Atmosphere"
      description="Choose your workspace feeling, visual themes, typography scaling, and interface density."
    >
      <div className="relative rounded-2xl bg-(--bg-surface-subtle) p-5">
        <span
          aria-hidden="true"
          className="absolute right-5 top-5 text-[12px] text-(--primary)"
        >
          ✦
        </span>
        <p className="text-[14px] font-bold text-(--text-primary)">
          Choose your atmosphere
        </p>
        <p className="mt-1 text-[12px] text-(--text-muted)">
          Switch the feeling of your workspace across EKA&apos;s design themes.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {THEMES.map((t) => {
            const on = theme === t.id;
            return (
              <button
                key={t.id}
                type="button"
                aria-pressed={on}
                onClick={() => pickTheme(t)}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12px] font-semibold transition duration-200 hover:-translate-y-0.5 active:scale-95 ${
                  on
                    ? "border-(--primary-deep) bg-(--primary-deep) text-white"
                    : "border-(--border-medium) bg-(--bg-surface) text-(--text-primary) hover:border-(--primary)"
                }`}
              >
                <span data-theme={t.id} className="flex gap-0.5">
                  <span
                    className="size-2 rounded-full"
                    style={{
                      ...swatchColor(SWATCH_TOKENS[0]),
                      boxShadow: on ? "0 0 0 1px #fff" : "none",
                    }}
                  />
                  <span
                    className="size-2 rounded-full"
                    style={swatchColor(SWATCH_TOKENS[2])}
                  />
                </span>
                {t.name}
              </button>
            );
          })}
        </div>
      </div>

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

      <SubSection
        title="Typography & Font Style"
        description="Choose curated editorial and modern typography pairings across the workspace"
        aside={
          <span className={`${pill} font-mono`}>
            Current:{" "}
            {TYPOGRAPHY.find((f) => f.id === settings.typography)?.name}
          </span>
        }
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TYPOGRAPHY.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={settings.typography === f.id}
              onClick={() => pickFont(f)}
              className={`${card(settings.typography === f.id)} flex flex-col p-4`}
            >
              <span className="flex items-center justify-between gap-2 text-[13px] font-bold text-(--text-primary)">
                {f.name}
                {settings.typography === f.id && (
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

      <div className="mt-8 grid grid-cols-1 gap-5 border-t border-(--border-subtle) pt-8 sm:grid-cols-2">
        <Select
          label="Interface Layout Density"
          value={settings.density}
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
          value={settings.scale}
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
