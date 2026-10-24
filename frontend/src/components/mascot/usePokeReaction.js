import { useCallback, useEffect, useRef, useState } from "react";

// ---- Tune the feel here ----
const WINDOW_MS = 2000; // taps are counted inside a sliding window this long
const ANGRY_AFTER = 5; // taps inside the window that make the mascot angry
const DIZZY_AFTER = 4; // MORE taps (while angry) inside the window that make the mascot dizzy
const ANGRY_MS = 3000; // how long the angry reaction lasts
const DIZZY_MS = 3000; // how long the dizzy reaction lasts (taps are ignored meanwhile)
const YELL_MS = 2200; // how long the "yell" reaction lasts (a sleeping mascot woken)
const GRUMBLE_MS = 1500; // how long a sleepy "five more seconds" lasts
/**
 * Turns taps on the mascot into escalating reactions:
 *   a few taps                         -> "boop" (tiny squish, no state change)
 *   ANGRY_AFTER taps within WINDOW_MS  -> "poked" (angry)
 *   DIZZY_AFTER more taps while angry  -> "dizzy"
 *
 * enabled: boolean (when false, taps do nothing)
 * Returns:
 *  override: null | "poked" | "dizzy" | "yell" | "grumble" (null means: show the normal state)
 *   pokeId:   goes up each time a reaction STARTS (used to replay animations)
 *   boopId:   goes up on every tap that is only a boop (0 = no tap yet)
 *   poke:     call this from onClick
 */
function usePokeReaction(enabled = false, pokeReaction = null, onReaction) {
  const [override, setOverride] = useState(null);
  const [pokeId, setPokeId] = useState(0);
  const [boopId, setBoopId] = useState(0);

  // Refs hold values that must survive renders without causing a re-render
  const taps = useRef([]); // timestamps of recent taps (the sliding window)
  const reaction = useRef(null); // mirror of `override`, readable inside callbacks
  const dizzyUntil = useRef(0); // while dizzy, extra taps are ignored
  const timer = useRef(null); // pending "go back to normal" timeout
  // Always call the latest onReaction without re-creating startReaction
  const onReactionRef = useRef(onReaction);
  useEffect(() => {
    onReactionRef.current = onReaction;
  });

  // Clean up the timer if the component disappears mid-reaction
  useEffect(() => () => clearTimeout(timer.current), []);

  // Begin a reaction ("poked" or "dizzy") and schedule its end
  const startReaction = useCallback((kind, keepTaps = false) => {
    clearTimeout(timer.current);
    reaction.current = kind;
    if (!keepTaps) taps.current = []; // counting restarts from zero for the next level
    setOverride(kind);
    setPokeId((id) => id + 1);

    const duration =
      { dizzy: DIZZY_MS, yell: YELL_MS, grumble: GRUMBLE_MS }[kind] ?? ANGRY_MS;
    onReactionRef.current?.(kind); // tell the page which reaction started
    if (kind === "dizzy") dizzyUntil.current = Date.now() + duration;

    timer.current = setTimeout(() => {
      reaction.current = null;
      taps.current = [];
      setOverride(null);
    }, duration);
  }, []);

  const poke = useCallback(() => {
    if (!enabled) return;

    // A state can name its own two-level reaction, e.g. sleep:
    //   { soft: "grumble", hard: "yell", taps: 3, withinMs: 1000 }
    // A slow tap plays `soft` (restarting it on every tap); `taps` taps inside
    // `withinMs` play `hard`. While the hard reaction plays, taps use the normal
    // boop / angry / dizzy counting below.
    if (pokeReaction && reaction.current !== pokeReaction.hard) {
      const now = Date.now();
      taps.current = [
        ...taps.current.filter((t) => now - t <= pokeReaction.withinMs),
        now,
      ];
      if (taps.current.length >= pokeReaction.taps) {
        startReaction(pokeReaction.hard);
      } else {
        startReaction(pokeReaction.soft, true); // true = keep counting taps
      }
      return;
    }

    const now = Date.now();
    if (now < dizzyUntil.current) return; // let the mascot finish being dizzy

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
  }, [enabled, pokeReaction, startReaction]);

  return { override, pokeId, boopId, poke };
}

export default usePokeReaction;
