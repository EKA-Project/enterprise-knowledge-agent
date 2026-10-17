import { useEffect } from "react";
import { MASCOT_STATES } from "./uploadMascotStates.js";
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
function ByteMascot({ state = "empty", message }) {
  // Unknown state? Fall back to "empty" instead of crashing
  const config = MASCOT_STATES[state] ?? MASCOT_STATES.empty;
  const bubbleText = message ?? config.bubble;

  // Preload every image once, so changing state never shows a blank flash
  useEffect(() => {
    Object.values(MASCOT_STATES).forEach(({ image }) => {
      const img = new Image();
      img.src = image;
    });
  }, []);

  return (
    <div
      className={`relative flex h-36 items-center justify-center rounded-2xl border transition-colors duration-300 ${TONES[config.tone]}`}
    >
      <div className="relative">
        {/* The stage plays this state's motion; the img pops in.
            key={state} remounts both, so the animation replays on every change. */}
        <div key={state} className={`byte-stage ${config.motion}`}>
          <img
            src={config.image}
            alt="" // decorative: the bubble text carries the meaning
            draggable={false}
            className="byte-swap block h-24 w-auto select-none"
          />
        </div>

        {/* Particles float around Byte (nothing for states without them) */}
        <ByteParticles key={`particles-${state}`} type={config.particles} />

        {/* Speech bubble. role="status" makes screen readers read changes aloud. */}
        <div
          role="status"
          aria-live="polite"
          className="absolute bottom-[65%] left-[55%] w-max max-w-[15rem]"
        >
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
        </div>
      </div>
    </div>
  );
}

export default ByteMascot;
