import { useRef } from "react";
import SettingsPanel from "./SettingsPanel";
import { Select } from "../common/Input";
import useAppearance from "../../hooks/useAppearance";
import useToast from "../../hooks/useToast";
import { THEMES, DEFAULT_THEME } from "../../appearance/theme";
import AtmosphereHero from "./themes/AtmosphereHero";
import ThemeCollections from "./themes/ThemeCollections";
import FontCollections from "./typography/FontCollections";
import { DENSITIES, SCALES } from "../../appearance/appearance";

export default function AppearanceSettings() {
  const toast = useToast();
  const [appearance, update] = useAppearance();
  const { theme } = appearance;
  const lastToast = useRef(null); // quick clicks replace the toast instead of piling up

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

      {/* ---------- Theme collections ---------- */}
      <ThemeCollections activeId={theme} onSelect={pickTheme} />

      {/* ---------- Typography ---------- */}
      <FontCollections activeId={appearance.typography} onSelect={pickFont} />

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
