import { createContext, useEffect, useRef, useState } from "react";
import useAppearance from "../hooks/useAppearance";
import useToast from "../hooks/useToast";
import { THEMES, DEFAULT_THEME } from "../appearance/theme";
import { TYPOGRAPHY, DEFAULT_TYPOGRAPHY } from "../appearance/fontStudio";
import { SURPRISE_SCOPES } from "../appearance/appearance";
import { playSurpriseMeSound } from "../appearance/surpriseSound";

// Must match the .dice-rolling animation length (0.6s) in variables.css.
const SURPRISE_DURATION_MS = 600;

const pickRandom = (items) => items[Math.floor(Math.random() * items.length)];

const SurpriseContext = createContext(null);

// Shared by every DiceSurprise button, so they spin together no matter which was clicked.
export function SurpriseProvider({ children }) {
  const toast = useToast();
  const [appearance, update] = useAppearance();
  const [isSurprising, setIsSurprising] = useState(false);
  // Changes on every click; used as the dice icon's key so the spin restarts on rapid clicks.
  const [rollCount, setRollCount] = useState(0);
  const spinTimer = useRef(null);
  const lastToast = useRef(null); // quick clicks replace the toast instead of piling up

  useEffect(() => () => clearTimeout(spinTimer.current), []);

  const announce = (message, name) => {
    if (lastToast.current) toast.dismiss(lastToast.current);
    lastToast.current = toast.success(message, {
      description: name,
      duration: 2500,
    });
  };

  const triggerSurprise = () => {
    // 1. Animation + sound (every click)
    setRollCount((n) => n + 1);
    setIsSurprising(true);
    clearTimeout(spinTimer.current);
    spinTimer.current = setTimeout(
      () => setIsSurprising(false),
      SURPRISE_DURATION_MS,
    );
    playSurpriseMeSound();

    // 2. Random pick (moved from AppearanceSettings). Compared against the resolved
    // active theme/font so an unknown saved id can't land on the look already showing.
    const scope = SURPRISE_SCOPES.some((s) => s.id === appearance.surpriseScope)
      ? appearance.surpriseScope
      : "theme";
    const activeTheme =
      THEMES.find((t) => t.id === appearance.theme) ??
      THEMES.find((t) => t.id === DEFAULT_THEME);
    const activeFont =
      TYPOGRAPHY.find((t) => t.id === appearance.typography) ??
      TYPOGRAPHY.find((t) => t.id === DEFAULT_TYPOGRAPHY);

    const nextTheme = pickRandom(THEMES.filter((t) => t.id !== activeTheme.id));

    if (scope === "both") {
      const nextFont = pickRandom(
        TYPOGRAPHY.filter((t) => t.id !== activeFont.id),
      );
      // One update call = one apply, one save, one toast.
      update({ theme: nextTheme.id, typography: nextFont.id });
      announce("Surprise pick applied", `${nextTheme.name} · ${nextFont.name}`);
      return;
    }

    update({ theme: nextTheme.id });
    announce("Surprise pick applied", nextTheme.name);
  };

  return (
    <SurpriseContext.Provider
      value={{ isSurprising, rollCount, triggerSurprise }}
    >
      {children}
    </SurpriseContext.Provider>
  );
}

export default SurpriseContext;