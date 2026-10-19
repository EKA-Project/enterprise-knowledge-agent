import { useEffect, useState } from "react";
import { DEFAULT_SETTINGS, applyAppearance } from "../components/settings/settingsConfig";

const KEY = "eka.settings";

function load() {
  try {
    return { ...DEFAULT_SETTINGS, ...JSON.parse(localStorage.getItem(KEY) ?? "{}") };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

// Saved in this browser only (localStorage). update({ key: value }) merges a change.
export default function useSettings() {
  const [settings, setSettings] = useState(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(settings));
    } catch {
      /* ignore */
    }
    applyAppearance(settings);
  }, [settings]);

  return [settings, (patch) => setSettings((prev) => ({ ...prev, ...patch }))];
}