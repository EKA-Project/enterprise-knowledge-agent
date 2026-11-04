import { useCallback, useState } from "react";

// useState that remembers its value in localStorage (strings only).
//   key      = storage key, e.g. "eka.appearanceTab"
//   fallback = used when nothing valid is saved
//   isValid  = optional check, so a stale or hand-edited saved value is ignored
export default function usePersistedState(key, fallback, isValid = () => true) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null && isValid(saved) ? saved : fallback;
    } catch {
      return fallback; // storage unavailable
    }
  });

  const set = useCallback(
    (next) => {
      setValue(next);
      try {
        localStorage.setItem(key, next);
      } catch {
        /* storage unavailable: the value still works for this session */
      }
    },
    [key],
  );

  return [value, set];
}