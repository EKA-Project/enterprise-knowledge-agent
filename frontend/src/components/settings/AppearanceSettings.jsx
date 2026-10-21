import { useRef } from "react";
import { Eye } from "lucide-react";
import SettingsPanel, {
  RadioCard,
  RadioGroup,
  SubSection,
} from "./SettingsPanel";
import IconBadge from "../icons/IconBadge";
import { EYE_COMFORT_ICONS } from "../icons/eyeComfortIcons";
import { EYE_COMFORT_MODES } from "../../appearance/appearance";
import useAppearance from "../../hooks/useAppearance";
import useToast from "../../hooks/useToast";
import { THEMES, DEFAULT_THEME } from "../../appearance/theme";
import AtmosphereHero from "./themes/AtmosphereHero";
import ThemeCollections from "./themes/ThemeCollections";
import FontCollections from "./typography/FontCollections";

export default function AppearanceSettings() {
  const toast = useToast();
  const [appearance, update] = useAppearance();
  const { theme } = appearance;
  // Falls back to "off" if the saved value is ever unknown, so one tile is always selected.
  const activeEyeMode =
    EYE_COMFORT_MODES.find((m) => m.id === appearance.eyeComfort) ??
    EYE_COMFORT_MODES[0];
  const eyeActive = activeEyeMode.id !== "off";
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

  const pickEyeComfort = (mode) => {
    if (mode.id === activeEyeMode.id) return;
    update({ eyeComfort: mode.id });
    announce("Eye comfort updated", `${mode.label} · ${mode.detail}`);
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

      {/* ---------- Eye comfort ---------- */}
      <SubSection
        title={
          <>
            <IconBadge icon={Eye} box={26} size={14} />
            Eye Comfort
          </>
        }
        description="A soft screen tint for long sessions. Works on every theme."
        aside={
          <span
            role="status"
            className={`rounded-full px-3 py-1 font-mono text-[11px] ${
              eyeActive
                ? "bg-(--status-warning-bg) text-(--status-warning)"
                : "bg-(--bg-surface-subtle) text-(--text-secondary)"
            }`}
          >
            {eyeActive ? `Active · ${activeEyeMode.label}` : "Disabled"}
          </span>
        }
      >
        {/* @container: the columns follow this block's width, not the window's */}
        <div className="@container">
          <RadioGroup
            label="Eye comfort mode"
            className="grid grid-cols-1 gap-3 @lg:grid-cols-2 @4xl:grid-cols-4"
          >
            {EYE_COMFORT_MODES.map((mode) => (
              <RadioCard
                key={mode.id}
                roving
                dotAlign="start"
                icon={EYE_COMFORT_ICONS[mode.id]}
                selected={mode.id === activeEyeMode.id}
                onSelect={() => pickEyeComfort(mode)}
                title={
                  <>
                    {mode.label}
                    <span className="font-mono text-[10.5px] font-medium text-(--text-muted)">
                      {mode.detail}
                    </span>
                  </>
                }
                description={mode.description}
              />
            ))}
          </RadioGroup>
        </div>
      </SubSection>
    </SettingsPanel>
  );
}
