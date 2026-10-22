// One lucide icon per eye-comfort mode, keyed by the mode ids in appearance.js.
// Kept apart from appearance.js so that file stays plain data (no UI imports).
import { Sun, CloudSun, BookOpen, MoonStar } from "lucide-react";

export const EYE_COMFORT_ICONS = {
  off: Sun,
  "true-tone": CloudSun,
  paperwhite: BookOpen,
  "dark-room": MoonStar,
};