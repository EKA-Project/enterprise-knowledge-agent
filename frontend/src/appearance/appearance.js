import { DEFAULT_THEME, applyTheme } from "./theme";
import { DEFAULT_TYPOGRAPHY, applyFonts } from "./fontStudio";

const KEY = "eka.appearance";

// ---------- Options ----------
// Eye comfort = a soft colour tint laid over the whole screen (see styles/eye-comfort.css).
// It warms and dims the display; it does not change what the screen emits.
// `detail` is the small hint shown in brackets after the label.
export const EYE_COMFORT_MODES = [
  { id: "off", label: "Off", detail: "Neutral", description: "Original colours, no tint." },
  { id: "true-tone", label: "True Tone", detail: "~3400K", description: "Light warm tint to soften cold glare." },
  { id: "paperwhite", label: "Paperwhite", detail: "~2800K", description: "Cream paper tone for long reading." },
  { id: "dark-room", label: "Dark Room", detail: "Extra Dim", description: "Dims the whole screen for dark rooms." },
];

// ---------- Defaults ----------
export const DEFAULT_APPEARANCE = {
  theme: DEFAULT_THEME,
  typography: DEFAULT_TYPOGRAPHY,
  eyeComfort: "off",
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
