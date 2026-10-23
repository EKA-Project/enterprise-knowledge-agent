import { DEFAULT_THEME, applyTheme } from "./theme";
import { DEFAULT_TYPOGRAPHY, applyFonts } from "./fontStudio";

const KEY = "eka.appearance";

// ---------- Options ----------
// Eye comfort = a soft colour tint laid over the whole screen (see styles/eye-comfort.css).
// It warms and dims the display; it does not change what the screen emits.
// `detail` is the small hint after the label: the approximate colour temperature of the
// tint, relative to a 6500K (neutral) screen. The actual colours live in styles/eye-comfort.css.
export const EYE_COMFORT_MODES = [
  { id: "off", label: "Off", detail: "Neutral", description: "Original colours, no tint." },
  { id: "true-tone", label: "True Tone", detail: "~6100K", description: "Light warmth for all-day use. Barely noticeable." },
  { id: "paperwhite", label: "Paperwhite", detail: "~5100K", description: "Light cream tone for long reading sessions." },
  { id: "dark-room", label: "Dark Room", detail: "Extra Dim", description: "Dims the whole screen for dark rooms." },
];

// What the "Surprise Me" button randomizes. Only the ids are stored; labels are for the toggle.
export const SURPRISE_SCOPES = [
  { id: "theme", label: "Theme only" },
  { id: "both", label: "Theme & Typo" },
];

// Picks one random item from a non-empty array (used by Surprise Me).
export function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

// ---------- Defaults ----------
export const DEFAULT_APPEARANCE = {
  theme: DEFAULT_THEME,
  typography: DEFAULT_TYPOGRAPHY,
  eyeComfort: "off",
  surpriseScope: "theme",
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

export function applyAppearance({ theme, typography, eyeComfort }) {
  applyTheme(theme);
  applyFonts(typography);

  // "off" removes the attribute, so the overlay CSS has nothing to match.
  const root = document.documentElement;
  if (eyeComfort && eyeComfort !== "off") root.dataset.eyeComfort = eyeComfort;
  else delete root.dataset.eyeComfort;
}

// Call once in main.jsx before React renders, so there is no flash of the wrong look.
export function initAppearance() {
  applyAppearance(loadAppearance());
}
