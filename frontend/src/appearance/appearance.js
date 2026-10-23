import { DEFAULT_THEME, applyTheme } from "./theme";
import { DEFAULT_TYPOGRAPHY, applyFonts } from "./fontStudio";

const KEY = "eka.appearance";

// ---------- Options ----------
export const DENSITIES = [
  { id: "comfortable", label: "Comfortable (Default Editorial Spacing)" },
  { id: "compact", label: "Compact (Tighter Spacing)" },
  { id: "spacious", label: "Spacious (Extra Breathing Room)" },
];

// root = font-size of <html>. "Standard" is empty, so the app stays exactly as it is.
export const SCALES = [
  { id: "small", label: "Small (13px Base)", root: "92.8%" },
  { id: "standard", label: "Standard (14px Base)", root: "" },
  { id: "large", label: "Large (16px Base)", root: "114.3%" },
];

// ---------- Defaults ----------
export const DEFAULT_APPEARANCE = {
  theme: DEFAULT_THEME,
  typography: DEFAULT_TYPOGRAPHY,
  density: "comfortable",
  scale: "standard",
};

// ---------- Storage ----------
export function loadAppearance() {
  try {
    return { ...DEFAULT_APPEARANCE, ...JSON.parse(localStorage.getItem(KEY) ?? "{}") };
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
export function applyAppearance({ theme, typography, density, scale }) {
  applyTheme(theme);
  applyFonts(typography);
  const root = document.documentElement;
  root.dataset.density = density;
  root.style.fontSize = SCALES.find((s) => s.id === scale)?.root ?? "";
}

// Call once in main.jsx before React renders, so there is no flash of the wrong look.
export function initAppearance() {
  applyAppearance(loadAppearance());
}