import { useEffect, useRef, useState } from "react";
import { MASCOT_STATES } from "./byteStates.js";
import usePokeReaction from "./usePokeReaction.js";
import ByteParticles from "./ByteParticles.jsx";
import "../../styles/mascot.css";
import { Volume2, VolumeX } from "lucide-react";
import { playByteSound } from "./byteSound.js";
import useMascotSound from "./useMascotSound.js";
// Banner background + border for each tone.
// (Full class names are written out so Tailwind can detect them.)
const TONES = {
  neutral: "border-(--border-subtle) bg-(--primary-light)",
  error: "border-[#fca5a5] bg-(--status-danger-bg)",
  success: "border-[#bbf7d0] bg-(--status-success-bg)",
};

/**
 * state?: a key of MASCOT_STATES (default "empty")
 * message?: string, overrides the bubble text (e.g. a specific error)
 */
function ByteMascot({
  state = "empty",
  message,
  framed = true, // true: tinted banner box (upload modal); false: just Byte
  pokeable = false, // true: tapping Byte makes it angry, repeated taps make it dizzy
  imageClassName = "h-24", // size of Byte, e.g. "h-16" for a small one
  frameClassName = "h-36", // height of the tinted banner (only when framed)
  showSoundToggle = framed, // the speaker button; shown in the banner by default
  replayKey = 0, // change this to replay the animation and sound for the SAME state
}) {
  const { override, pokeId, boopId, poke } = usePokeReaction(pokeable);

  // A poke reaction temporarily replaces the state the page asked for
  const reacting = pokeable ? override : null;
  const activeState = reacting ?? state;

  // Unknown state? Fall back to "empty" instead of crashing
  const config = MASCOT_STATES[activeState] ?? MASCOT_STATES.empty;

  // During a reaction use its own bubble, not the page's custom message
  const bubbleText = reacting ? config.bubble : (message ?? config.bubble);

  // Pokeable: Byte is a real <button> (keyboard and screen-reader friendly)
  const Stage = pokeable ? "button" : "div";
  const stageProps = pokeable
    ? { type: "button", onClick: poke, "aria-label": "Poke Byte" }
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
    const play = () => playByteSound(config.sound);
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
  // It animates a wrapper, so it never restarts Byte's own motion.
  const boopRef = useRef(null);
  useEffect(() => {
    if (!boopId) return; // 0 = no tap yet
    playByteSound("poke");
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
  // Preload every image once, so changing state never shows a blank flash
  useEffect(() => {
    Object.values(MASCOT_STATES).forEach(({ image }) => {
      const img = new Image();
      img.src = image;
    });
  }, []);

  return (
    <div
      className={`relative flex items-center justify-center ${
        framed
          ? `${frameClassName} rounded-2xl border transition-colors duration-300 ${TONES[config.tone]}`
          : ""
      }`}
    >
      <div className="relative isolate">
        {/* The stage plays this state's motion; the img pops in.
            Changing playKey remounts both, so the animation replays. */}
        {/* Ground shadow (success only): shrinks while Byte is in the air */}
        {config.shadow && (
          <span
            key={`shadow-${playKey}`}
            className="byte-shadow"
            aria-hidden="true"
          />
        )}
        {/* Wrapper used only for the tap "boop" squish (see the effect above) */}
        <div ref={boopRef} className="origin-[50%_90%]">
          <Stage
            key={playKey}
            {...stageProps}
            className={`byte-stage block ${config.motion} ${pokeable ? "cursor-pointer" : ""}`}
          >
            <img
              src={config.image}
              alt="" // decorative: the bubble text carries the meaning
              draggable={false}
              className={`byte-swap block w-auto select-none ${imageClassName}`}
            />
          </Stage>
        </div>

        {/* Particles float around Byte (nothing for states without them) */}
        <ByteParticles key={`particles-${playKey}`} type={config.particles} />

        {/* Speech bubble: sits up and to the right of Byte's head (see .byte-bubble-anchor
            in variables.css). role="status" makes screen readers read changes aloud. */}
        <div role="status" aria-live="polite" className="byte-bubble-anchor">
          {bubbleText && (
            <p
              key={bubbleText} // replay the pop-in when the text changes
              aria-hidden={bubbleHidden}
              className={`byte-bubble relative rounded-xl bg-white px-2.5 py-1 text-xs leading-snug font-medium text-(--text-primary) shadow-md ${
                bubbleHidden ? "byte-bubble-hidden" : ""
              }`}
            >
              {bubbleText}
              {/* Small tail and a trail dot, both pointing back toward Byte's head */}
              <span
                aria-hidden="true"
                className="absolute -bottom-[3px] left-2.5 h-2 w-2 rotate-45 bg-white"
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
          title={soundOn ? "Mute mascot sounds" : "Unmute mascot sounds"}
          className="absolute right-2 bottom-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-(--border-subtle) bg-white/80 text-(--text-secondary) transition-colors hover:bg-white hover:text-(--primary)"
        >
          {soundOn ? <Volume2 size={13} /> : <VolumeX size={13} />}
        </button>
      )}
    </div>
  );
}

export default ByteMascot;
