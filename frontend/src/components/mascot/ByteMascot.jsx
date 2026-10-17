import { useEffect } from "react";
import { MASCOT_STATES } from "./byteStates.js";
import usePokeReaction from "./usePokeReaction.js";
import ByteParticles from "./ByteParticles.jsx";
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
}) {
  const { override, pokeId, poke } = usePokeReaction(pokeable);

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
  const playKey = `${activeState}-${pokeId}`;

  // Preload every image once, so changing state never shows a blank flash
  useEffect(() => {
    Object.values(MASCOT_STATES).forEach(({ image }) => {
      const img = new Image();
      img.src = image;
    });
  }, []);

  return (
    <div
      className={`flex items-center justify-center ${
        framed
          ? `h-36 rounded-2xl border transition-colors duration-300 ${TONES[config.tone]}`
          : ""
      }`}
    >
      <div className="relative">
        {/* The stage plays this state's motion; the img pops in.
            Changing playKey remounts both, so the animation replays. */}
        <Stage
          key={playKey}
          {...stageProps}
          className={`byte-stage ${config.motion} ${pokeable ? "cursor-pointer" : ""}`}
        >
          <img
            src={config.image}
            alt="" // decorative: the bubble text carries the meaning
            draggable={false}
            className={`byte-swap block w-auto select-none ${imageClassName}`}
          />
        </Stage>

        {/* Particles float around Byte (nothing for states without them) */}
        <ByteParticles key={`particles-${playKey}`} type={config.particles} />

        {/* Speech bubble. role="status" makes screen readers read changes aloud. */}
          {/* Speech bubble. role="status" makes screen readers read changes aloud. */}
        <div
          role="status"
          aria-live="polite"
          className="absolute bottom-[65%] left-[55%] w-max max-w-[15rem]"
        >
          {bubbleText && (
            <p
              key={bubbleText} // replay the pop-in when the text changes
              className="byte-bubble relative rounded-2xl bg-white px-3.5 py-1.5 text-sm font-medium text-(--text-primary) shadow-md"
            >
              {bubbleText}
              {/* Little tail pointing down toward Byte */}
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-4 h-2.5 w-2.5 rotate-45 bg-white"
              />
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ByteMascot;
