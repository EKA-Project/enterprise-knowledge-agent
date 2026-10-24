import { useEffect, useRef, useState } from "react";
import { COMMON_STATES } from "../../mascot/mascotStates.js";
import {
  getMascotImage,
  getMascotImages,
} from "../../mascot/mascotRegistry.js";
import { useMascot } from "../../hooks/useMascot.js";
import usePokeReaction from "./usePokeReaction.js";
import MascotParticles from "./MascotParticles.jsx";
import "../../styles/mascot.css";
import { Volume2, VolumeX } from "lucide-react";
import { playMascotSound } from "../../mascot/mascotSound.js";
import useMascotSound from "./useMascotSound.js";
// Banner background + border for each tone.
// (Full class names are written out so Tailwind can detect them.)
const TONES = {
  neutral: "border-(--border-subtle) bg-(--primary-light)",
  error: "border-[#fca5a5] bg-(--status-danger-bg)",
  success: "border-[#bbf7d0] bg-(--status-success-bg)",
};

/**
 * state?: a state name (default "idle"), looked up in `states` first, then in COMMON_STATES
 * states?: a page's own state table (same shape as COMMON_STATES)
 * message?: string, overrides the bubble text (e.g. a specific error)
 */
function Mascot({
  state = "idle",
  states, // optional: page-specific states, checked before the common ones
  message,
  framed = true, // true: tinted banner box (upload modal); false: just the mascot
  pokeable = false, // true: tapping the mascot makes it angry, repeated taps make it dizzy
  imageClassName = "h-24", // size of the mascot, e.g. "h-16" for a small one
  frameClassName = "h-36", // height of the tinted banner (only when framed)
  showSoundToggle = framed, // the speaker button; shown in the banner by default
  onReaction, // optional: (kind) => void, called when a reaction starts ("grumble", "yell", "poked", "dizzy"); a page can wake a sleeping mascot on "yell"
  replayKey = 0, // change this to replay the animation and sound for the SAME state
}) {
  // The state the PAGE asked for decides whether the first tap triggers its own
  // reaction (a sleeping mascot yells). Looked up before the poke hook runs.
  const baseConfig =
    states?.[state] ?? COMMON_STATES[state] ?? COMMON_STATES.idle;
  const { override, pokeId, boopId, poke } = usePokeReaction(
    pokeable,
    baseConfig.pokeReaction,
    onReaction,
  );

  // A poke reaction temporarily replaces the state the page asked for
  const reacting = pokeable ? override : null;
  const activeState = reacting ?? state;

  // The mascot (the mascot / orbit) the user picked in Settings
  const { mascotId, mascot } = useMascot();

  // Page states first, then the common ones. Unknown state? Fall back to idle
  // instead of crashing.
  const config =
    states?.[activeState] ?? COMMON_STATES[activeState] ?? COMMON_STATES.idle;

  // A state stores an image NAME; the registry turns it into this mascot's file
  const imageSrc = getMascotImage(mascotId, config.image);

  // During a reaction use its own bubble, not the page's custom message
  const bubbleText = reacting ? config.bubble : (message ?? config.bubble);

  // Pokeable: the mascot is a real <button> (keyboard and screen-reader friendly)
  const Stage = pokeable ? "button" : "div";
  const stageProps = pokeable
    ? {
        type: "button",
        onClick: poke,
        "aria-label": `Poke ${mascot.name}`,
      }
    : {};
  // Changing this key remounts the stage and replays the animation, even on repeat taps
  const playKey = `${activeState}-${pokeId}-${replayKey}`;

  // Reaction bubbles (states with bubbleMs) fade out so the full animation stays visible.
  // We remember WHICH playKey was hidden, so a new state or a new tap shows its bubble again.
  const [hiddenKey, setHiddenKey] = useState(null);
  useEffect(() => {
    if (!config.bubbleMs) return;
    const id = setTimeout(() => setHiddenKey(playKey), config.bubbleMs);
    return () => clearTimeout(id);
  }, [playKey, config.bubbleMs]);
  const bubbleHidden = hiddenKey === playKey;

  // Sound: plays when a state starts (or replays) and, if the state asks for it
  // (soundEvery), repeats while the state lasts. Using setTimeout also stops React's
  // dev-mode double run from playing the sound twice.
  const { soundOn, toggleSound } = useMascotSound();
  useEffect(() => {
    if (!config.sound) return;
    const play = () => playMascotSound(config.sound);
    const first = setTimeout(play, config.soundDelay ?? 0);
    const loop = config.soundEvery
      ? setInterval(play, config.soundEvery)
      : null;
    return () => {
      clearTimeout(first);
      clearInterval(loop);
    };
  }, [playKey, config.sound, config.soundDelay, config.soundEvery]);

  // Tiny squish on taps that don't (yet) cause a reaction.
  // It animates a wrapper, so it never restarts the mascot's own motion.
  const boopRef = useRef(null);
  useEffect(() => {
    if (!boopId) return; // 0 = no tap yet
    playMascotSound("poke");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    boopRef.current?.animate(
      [
        { transform: "scale(1, 1)" },
        { transform: "scale(1.12, 0.88)", offset: 0.35 },
        { transform: "scale(0.96, 1.05)", offset: 0.7 },
        { transform: "scale(1, 1)" },
      ],
      { duration: 320, easing: "ease-out" },
    );
  }, [boopId]);
  // Preload only the ACTIVE mascot's images, so changing state never shows a
  // blank flash. Runs again if the user switches mascot.
  useEffect(() => {
    getMascotImages(mascotId).forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [mascotId]);

  return (
    <div
      className={`relative flex items-center justify-center ${
        framed
          ? `${frameClassName} rounded-2xl border transition-colors duration-300 ${TONES[config.tone]}`
          : ""
      }`}
    >
      <div
        className="relative isolate"
        // Per-mascot bubble position (values come from mascotRegistry.js)
        style={{
          "--mascot-bubble-x": mascot.bubble.x,
          "--mascot-bubble-y": mascot.bubble.y,
        }}
      >
        {/* The stage plays this state's motion; the img pops in.
            Changing playKey remounts both, so the animation replays. */}
        {/* Ground shadow (success only): shrinks while the mascot is in the air */}
        {config.shadow && (
          <span
            key={`shadow-${playKey}`}
            className="mascot-shadow"
            aria-hidden="true"
          />
        )}
        {/* Wrapper used only for the tap "boop" squish (see the effect above) */}
        <div ref={boopRef} className="origin-[50%_90%]">
          <Stage
            key={playKey}
            {...stageProps}
            className={`mascot-stage block ${config.motion} ${pokeable ? "cursor-pointer" : ""}`}
          >
            <img
              src={imageSrc}
              alt="" // decorative: the bubble text carries the meaning
              draggable={false}
              className={`mascot-swap block w-auto select-none ${imageClassName}`}
            />
          </Stage>
        </div>

        {/* Particles float around the mascot (nothing for states without them) */}
        <MascotParticles key={`particles-${playKey}`} type={config.particles} />

        {/* Speech bubble: sits up and to the right of the mascot's head (see .mascot-bubble-anchor
            in variables.css). role="status" makes screen readers read changes aloud. */}
        <div role="status" aria-live="polite" className="mascot-bubble-anchor">
          {bubbleText && (
            <p
              key={bubbleText} // replay the pop-in when the text changes
              aria-hidden={bubbleHidden}
              className={`mascot-bubble relative rounded-xl bg-white px-2.5 py-1 text-xs leading-snug font-medium text-(--text-primary) shadow-md ${
                bubbleHidden ? "mascot-bubble-hidden" : ""
              }`}
            >
              {bubbleText}
              {/* Small tail and a trail dot, both pointing back toward the mascot's head */}
              <span
                aria-hidden="true"
                className="absolute -bottom-0.75 left-2.5 h-2 w-2 rotate-45 bg-white"
              />
              <span
                aria-hidden="true"
                className="absolute -bottom-2.5 -left-1.5 h-1.5 w-1.5 rounded-full bg-white shadow-sm"
              />
            </p>
          )}
        </div>
      </div>
      {showSoundToggle && (
        <button
          type="button"
          onClick={toggleSound}
          aria-label={soundOn ? "Mute mascot sounds" : "Unmute mascot sounds"}
          aria-pressed={!soundOn}
          title={soundOn ? "Mute mascot sounds" : "Unmute mascot sounds"}
          className={`absolute top-2.5 right-2.5 z-10 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-white/70 bg-white/70 shadow-sm backdrop-blur-sm transition-all duration-150 hover:scale-105 hover:bg-white active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--primary) ${
            soundOn ? "text-(--primary)" : "text-(--text-muted)"
          }`}
        >
          {/* key remounts the icon on every toggle, which replays the small pop-in */}
          <span key={soundOn ? "on" : "off"} className="mascot-swap flex">
            {soundOn ? (
              <Volume2 size={14} strokeWidth={2} />
            ) : (
              <VolumeX size={14} strokeWidth={2} />
            )}
          </span>
        </button>
      )}
    </div>
  );
}

export default Mascot;
