import { useRef } from "react";
import SettingsPanel from "./SettingsPanel";
import EyeComfortSection from "./appearance/eyecomfort/EyeComfortSection";
import useAppearance from "../../hooks/useAppearance";
import useToast from "../../hooks/useToast";
import { THEMES, DEFAULT_THEME } from "../../appearance/theme";
import { TYPOGRAPHY, DEFAULT_TYPOGRAPHY } from "../../appearance/fontStudio";
import { SURPRISE_SCOPES } from "../../appearance/appearance";
import AtmosphereHero from "./appearance/themes/AtmosphereHero";
import { Droplet, Globe, Sun, Type } from "lucide-react";
import AppearanceHeader from "./appearance/AppearanceHeader";
import StudioStatsPill from "./appearance/StudioStatsPill";
import ThemeCollections from "./appearance/themes/ThemeCollections";
import FontCollections from "./appearance/typography/FontCollections";
import AppearanceTabs, {
  appearanceTabId,
  appearancePanelId,
} from "./appearance/AppearanceTabs";
import StudioDivider from "./appearance/StudioDivider";
import usePersistedState from "../../hooks/usePersistedState";

// One entry per tab. The ids are what gets saved in localStorage.
const TABS = [
  {
    id: "themes",
    label: "Atmospheres & Themes",
    icon: Globe,
    count: THEMES.length,
  },
  {
    id: "typography",
    label: "Typography Studio",
    icon: Type,
    count: TYPOGRAPHY.length,
  },
  { id: "eye", label: "Eye Comfort & Ergonomics", icon: Sun },
];
const TAB_IDS = TABS.map((t) => t.id);

export default function AppearanceSettings() {
  const toast = useToast();
  // The selected tab survives a refresh; an unknown saved id falls back to the first tab.
  const [tab, setTab] = usePersistedState(
    "eka.appearanceTab",
    TAB_IDS[0],
    (id) => TAB_IDS.includes(id),
  );
  const [appearance, update] = useAppearance();
  const { theme } = appearance;
  // Guards against a stale or hand-edited saved value: anything unknown counts as "theme".
  const scope = SURPRISE_SCOPES.some((s) => s.id === appearance.surpriseScope)
    ? appearance.surpriseScope
    : "theme";
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
  // Same fallback as applyFonts(), so an unknown saved id still shows the default pairing.
  const activeFont =
    TYPOGRAPHY.find((t) => t.id === appearance.typography) ??
    TYPOGRAPHY.find((t) => t.id === DEFAULT_TYPOGRAPHY);
  // Reset is available while either the theme or the font pairing differs from the default.
  const isDefault =
    activeTheme.id === DEFAULT_THEME && activeFont.id === DEFAULT_TYPOGRAPHY;

  // Restores whichever of theme / typography is not already the default.
  // Eye comfort has its own card and is left as chosen.
  const reset = () => {
    const patch = {};
    const restored = []; // names shown in the toast

    if (activeTheme.id !== DEFAULT_THEME) {
      patch.theme = DEFAULT_THEME;
      restored.push(THEMES.find((t) => t.id === DEFAULT_THEME).name);
    }
    if (activeFont.id !== DEFAULT_TYPOGRAPHY) {
      patch.typography = DEFAULT_TYPOGRAPHY;
      restored.push(TYPOGRAPHY.find((t) => t.id === DEFAULT_TYPOGRAPHY).name);
    }
    if (restored.length === 0) return;

    update(patch); // one update = one apply, one save, one toast
    announce("Defaults restored", restored.join(" · "));
  };

  const pickFont = (f) => {
    if (f.id === appearance.typography) return;
    update({ typography: f.id });
    announce("Typography applied", f.name);
  };

  const pickEyeComfort = (mode) => {
    if (mode.id === appearance.eyeComfort) return;
    update({ eyeComfort: mode.id });
    announce("Eye comfort updated", `${mode.label} · ${mode.detail}`);
  };

  return (
    <SettingsPanel>
      <AppearanceHeader
        level="page"
        icon={Droplet}
        eyebrow="Workspace Visual Identity"
        title="Appearance & Atmosphere Studio"
        description={`${THEMES.length} curated workspace themes, editorial typography pairings, and layout ergonomics.`}
        aside={
          <StudioStatsPill
            atmospheres={THEMES.length}
            typeSuites={TYPOGRAPHY.length}
          />
        }
      />
      <AppearanceTabs tabs={TABS} value={tab} onChange={setTab} />
      <StudioDivider />

      {/* Only the active section renders. The panel supplies the gap under the divider. */}
      <div
        role="tabpanel"
        id={appearancePanelId(tab)}
        aria-labelledby={appearanceTabId(tab)}
        className="mt-12"
      >
        {tab === "themes" && (
          <>
            <AtmosphereHero
              theme={activeTheme}
              typography={activeFont}
              isDefault={isDefault}
              scope={scope}
              onScopeChange={(id) => update({ surpriseScope: id })}
              onReset={reset}
            />
            <ThemeCollections activeId={theme} onSelect={pickTheme} />
          </>
        )}

        {tab === "typography" && (
          <FontCollections
            activeId={appearance.typography}
            onSelect={pickFont}
          />
        )}

        {tab === "eye" && (
          <EyeComfortSection
            activeId={appearance.eyeComfort}
            onSelect={pickEyeComfort}
          />
        )}
      </div>
    </SettingsPanel>
  );
}
