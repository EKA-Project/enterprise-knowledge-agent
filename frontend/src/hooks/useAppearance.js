import { useCallback, useEffect, useState } from "react";
import { applyAppearance, loadAppearance, saveAppearance } from "../appearance/appearance";

// update({ key: value }) merges a change, applies it to the page and saves it.
export default function useAppearance() {
  const [appearance, setAppearance] = useState(loadAppearance);

  useEffect(() => {
    applyAppearance(appearance);
    saveAppearance(appearance);
  }, [appearance]);

  const update = useCallback((patch) => setAppearance((prev) => ({ ...prev, ...patch })), []);
  return [appearance, update];
}