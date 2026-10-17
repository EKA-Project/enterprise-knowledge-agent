import { useCallback, useEffect, useRef, useState } from "react";

// ---- Tune the feel here ----
const TAP_WINDOW_MS = 700; // taps closer together than this count as "a streak"
const DIZZY_AFTER_TAPS = 4; // streak length that makes Byte dizzy
const ANGRY_MS = 1200; // how long Byte stays angry after a tap
const DIZZY_MS = 2800; // how long Byte stays dizzy

/**
 * Turns taps on the mascot into a temporary "reaction".
 *
 * enabled: boolean (when false, taps do nothing)
 * Returns:
 *   override: null | "poked" | "dizzy"  (null means: show the normal state)
 *   pokeId:   a number that goes up on every accepted tap (used to replay animations)
 *   poke:     call this from onClick
 */
function usePokeReaction(enabled = false) {
  const [override, setOverride] = useState(null);
  const [pokeId, setPokeId] = useState(0);

  // Refs hold values that must survive renders without causing a re-render
  const taps = useRef(0); // length of the current tap streak
  const lastTapAt = useRef(0); // timestamp of the previous tap
  const dizzyUntil = useRef(0); // while dizzy, extra taps are ignored
  const timer = useRef(null); // pending "go back to normal" timeout

  // Clean up the timer if the component disappears mid-reaction
  useEffect(() => () => clearTimeout(timer.current), []);

  const poke = useCallback(() => {
    if (!enabled) return;

    const now = Date.now();
    if (now < dizzyUntil.current) return; // let Byte finish being dizzy

    // Extend the streak if this tap came soon enough, otherwise start over
    taps.current = now - lastTapAt.current <= TAP_WINDOW_MS ? taps.current + 1 : 1;
    lastTapAt.current = now;

    clearTimeout(timer.current);
    setPokeId((id) => id + 1);

    if (taps.current >= DIZZY_AFTER_TAPS) {
      taps.current = 0;
      dizzyUntil.current = now + DIZZY_MS;
      setOverride("dizzy");
      timer.current = setTimeout(() => setOverride(null), DIZZY_MS);
    } else {
      setOverride("poked");
      timer.current = setTimeout(() => setOverride(null), ANGRY_MS);
    }
  }, [enabled]);

  return { override, pokeId, poke };
}

export default usePokeReaction;