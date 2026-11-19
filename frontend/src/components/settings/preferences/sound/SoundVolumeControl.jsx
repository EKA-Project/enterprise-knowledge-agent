import { useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { playMascotSound } from "../../../../mascot/mascotSound.js";
import VolumePresets from "./VolumePresets.jsx";

const UNMUTE_FALLBACK = 50; // where Unmute lands if there is no earlier level to return to

// Keys that move the slider. Only these trigger a preview (not Tab).
const ADJUST_KEYS = [
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "ArrowDown",
  "Home",
  "End",
  "PageUp",
  "PageDown",
];

// onVolumeChange receives a number from 0 to 1 (the scale the sound store uses).
export default function SoundVolumeControl({
  disabled,
  volume,
  onVolumeChange,
}) {
  const percent = Math.round(volume * 100);
  const isMuted = percent === 0;
  const lastAudible = useRef(UNMUTE_FALLBACK); // level to return to on Unmute

  // Reaching 0 by slider or preset forgets the old level; Unmute then goes to 50%
  const changeLevel = (value) => {
    if (value === 0) lastAudible.current = UNMUTE_FALLBACK;
    onVolumeChange(value / 100);
  };

  // A short blip at the new level, so the user can hear what they picked
  const preview = () => playMascotSound("poke");

  const handlePreset = (value) => {
    changeLevel(value);
    preview();
  };

  const toggleMute = () => {
    if (isMuted) {
      changeLevel(lastAudible.current);
      preview();
    } else {
      lastAudible.current = percent; // remember where to come back to
      onVolumeChange(0);
    }
  };

  const handleKeyUp = (event) => {
    if (ADJUST_KEYS.includes(event.key)) preview();
  };

  const VolumeIcon = isMuted ? VolumeX : Volume2;

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-[13px] font-bold text-(--text-primary)">
          <VolumeIcon size={16} aria-hidden="true" />
          Volume
        </p>
        <div className="flex items-center gap-2.5">
          <span className="text-[14px] font-bold tabular-nums text-(--text-primary)">
            {percent}%
          </span>
          <button
            type="button"
            onClick={toggleMute}
            disabled={disabled}
            className="rounded-full border border-(--border-medium) bg-(--bg-surface) px-3 py-1 text-[11px] font-semibold text-(--text-primary) shadow-(--shadow-sm) transition duration-200 hover:-translate-y-0.5 hover:border-(--primary) hover:shadow-[0_4px_12px_var(--primary-glow)] active:translate-y-0 active:shadow-(--shadow-sm) motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus) disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:hover:translate-y-0 disabled:hover:border-(--border-medium) disabled:hover:shadow-none"
          >
            {isMuted ? "Unmute" : "Mute"}
          </button>
        </div>
      </div>

      {/* Visible track and fill are drawn here; the real <input> sits on top
          with a transparent track, so only its thumb shows. */}
      <div className={`relative mt-4 h-5 ${disabled ? "opacity-50" : ""}`}>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-1/2 h-2.5 -translate-y-1/2 overflow-hidden rounded-full border border-(--border-medium) bg-(--bg-surface)"
        >
          <div
            className="h-full rounded-full bg-(--primary)"
            // The thumb is 20px wide and its center travels from 10px to
            // (width - 10px), so shift the fill to end under the thumb's center.
            style={{
              width: `calc(${percent}% + ${(0.5 - percent / 100) * 20}px)`,
            }}
          />
        </div>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={percent}
          disabled={disabled}
          aria-label="Volume"
          aria-valuetext={`${percent}%`}
          onChange={(event) => changeLevel(Number(event.target.value))}
          onPointerUp={preview}
          onKeyUp={handleKeyUp}
          className="relative m-0 h-5 w-full cursor-pointer appearance-none bg-transparent outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--border-focus) disabled:cursor-not-allowed [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-(--primary) [&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-(--primary) [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-(--shadow-sm)"
        />
      </div>

      <div className="mt-5">
        <VolumePresets
          percent={percent}
          disabled={disabled}
          onSelect={handlePreset}
        />
      </div>
    </div>
  );
}
