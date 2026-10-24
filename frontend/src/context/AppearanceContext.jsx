import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  applyAppearance,
  loadAppearance,
  saveAppearance,
} from "../appearance/appearance";

const AppearanceContext = createContext(null);

// The single source of truth for theme, typography, eye comfort and surprise scope.
// Every useAppearance() caller (Settings, Surprise Me, Topbar) reads this same state,
// so a change made anywhere shows up everywhere.
export function AppearanceProvider({ children }) {
  const [appearance, setAppearance] = useState(loadAppearance);

  // Apply to the page and persist whenever anything changes.
  useEffect(() => {
    applyAppearance(appearance);
    saveAppearance(appearance);
  }, [appearance]);

  // update({ key: value }) merges a change into the current appearance.
  const update = useCallback(
    (patch) => setAppearance((prev) => ({ ...prev, ...patch })),
    [],
  );

  // Memoized so consumers only re-render when appearance actually changes.
  const value = useMemo(() => [appearance, update], [appearance, update]);

  return (
    <AppearanceContext.Provider value={value}>
      {children}
    </AppearanceContext.Provider>
  );
}

export default AppearanceContext;