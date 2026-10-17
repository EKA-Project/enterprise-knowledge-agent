import { useCallback, useEffect, useRef, useState } from "react";

// ---- Tune the feel here ----
const WINDOW_MS = 2000; // taps are counted inside a sliding window this long
const ANGRY_AFTER = 5; // taps inside the window that make Byte angry
const DIZZY_AFTER = 4; // MORE taps (while angry) inside the window that make Byte dizzy
const ANGRY_MS = 3000; // how long the angry reaction lasts
const DIZZY_MS = 3000; // how long the dizzy reaction lasts (taps are ignored meanwhile)

/**
 * Turns taps on the mascot into escalating reactions:
 *   a few taps                         -> "boop" (tiny squish, no state change)
 *   ANGRY_AFTER taps within WINDOW_MS  -> "poked" (angry)
 *   DIZZY_AFTER more taps while angry  -> "dizzy"
 *
 * enabled: boolean (when false, taps do nothing)
 * Returns:
 *   override: null | "poked" | "dizzy"  (null means: show the normal state)
 *   pokeId:   goes up each time a reaction STARTS (used to replay animations)
 *   boopId:   goes up on every tap that is only a boop (0 = no tap yet)
 *   poke:     call this from onClick
 */
function usePokeReaction(enabled = false) {
  const [override, setOverride] = useState(null);
  const [pokeId, setPokeId] = useState(0);
  const [boopId, setBoopId] = useState(0);

  // Refs hold values that must survive renders without causing a re-render
  const taps = useRef([]); // timestamps of recent taps (the sliding window)
  const reaction = useRef(null); // mirror of `override`, readable inside callbacks
  const dizzyUntil = useRef(0); // while dizzy, extra taps are ignored
  const timer = useRef(null); // pending "go back to normal" timeout

  // Clean up the timer if the component disappears mid-reaction
  useEffect(() => () => clearTimeout(timer.current), []);

  // Begin a reaction ("poked" or "dizzy") and schedule its end
  const startReaction = useCallback((kind) => {
    clearTimeout(timer.current);
    reaction.current = kind;
    taps.current = []; // counting restarts from zero for the next level
    setOverride(kind);
    setPokeId((id) => id + 1);

    const duration = kind === "dizzy" ? DIZZY_MS : ANGRY_MS;
    if (kind === "dizzy") dizzyUntil.current = Date.now() + duration;

    timer.current = setTimeout(() => {
      reaction.current = null;
      taps.current = [];
      setOverride(null);
    }, duration);
  }, []);

  const poke = useCallback(() => {
    if (!enabled) return;

    const now = Date.now();
    if (now < dizzyUntil.current) return; // let Byte finish being dizzy

    // Keep only the taps from the last WINDOW_MS, then add this one
    taps.current = [...taps.current.filter((t) => now - t <= WINDOW_MS), now];
    const count = taps.current.length;

    if (reaction.current === "poked") {
      // Already angry: more taps count toward dizzy, but never restart the angry animation
      if (count >= DIZZY_AFTER) startReaction("dizzy");
      return;
    }

    if (count >= ANGRY_AFTER) startReaction("poked");
    else setBoopId((id) => id + 1); // not enough taps yet: just a tiny squish
  }, [enabled, startReaction]);

  return { override, pokeId, boopId, poke };
}

export default usePokeReaction;