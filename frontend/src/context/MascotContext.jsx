import { createContext, useCallback, useMemo, useState } from "react";
import { DEFAULT_MASCOT_ID, getMascot } from "../mascot/mascotRegistry";

// Own localStorage key. It is NOT inside eka.settings / eka.appearance because
// useSettings rewrites that whole object and would overwrite the mascot.
const STORAGE_KEY = "eka.mascot";

export const MascotContext = createContext(null);

// Runs once at startup. getMascot() falls back to the default mascot if the
// stored id is missing or unknown (e.g. a mascot removed in a later release).
// try/catch because localStorage can throw (private mode, blocked storage).
function readStoredId() {
  try {
    return getMascot(localStorage.getItem(STORAGE_KEY)).id;
  } catch {
    return DEFAULT_MASCOT_ID;
  }
}

export function MascotProvider({ children }) {
  // Only the id is stored. Components get the full mascot object from the
  // registry and never deal with image paths.
  const [mascotId, setId] = useState(readStoredId);

  // Switch mascot: validate the id, update state, then persist it.
  const setMascotId = useCallback((id) => {
    const next = getMascot(id).id; // unknown ids resolve to the default
    setId(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage blocked: the choice still applies for this session */
    }
  }, []);

  // Memoised so consumers only re-render when the mascot actually changes.
  const value = useMemo(
    () => ({ mascotId, mascot: getMascot(mascotId), setMascotId }),
    [mascotId, setMascotId],
  );

  return (
    <MascotContext.Provider value={value}>{children}</MascotContext.Provider>
  );
}