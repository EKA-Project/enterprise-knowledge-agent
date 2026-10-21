import { DEFAULT_THEME, applyTheme } from "./theme";
import { DEFAULT_TYPOGRAPHY, applyFonts } from "./fontStudio";

const KEY = "eka.appearance";

// ---------- Defaults ----------
export const DEFAULT_APPEARANCE = {
  theme: DEFAULT_THEME,
  typography: DEFAULT_TYPOGRAPHY,
};

// ---------- Storage ----------
export function loadAppearance() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? "{}");
    // Keep only the keys we still use, so old saved values (density, scale) are dropped.
    return Object.fromEntries(
      Object.entries(DEFAULT_APPEARANCE).map(([key, fallback]) => [
        key,
        saved[key] ?? fallback,
      ]),
    );
  } catch {
    return { ...DEFAULT_APPEARANCE };
  }
}

export function saveAppearance(appearance) {
  try {
    localStorage.setItem(KEY, JSON.stringify(appearance));
  } catch {
    /* storage unavailable */
  }
}

// ---------- Applying ----------
export function applyAppearance({ theme, typography }) {
  applyTheme(theme);
  applyFonts(typography);
}

// Call once in main.jsx before React renders, so there is no flash of the wrong look.
export function initAppearance() {
  applyAppearance(loadAppearance());
}
