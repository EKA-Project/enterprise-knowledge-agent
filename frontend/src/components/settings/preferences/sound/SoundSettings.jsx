import { Volume2, VolumeX } from "lucide-react";
import useMascotSound from "../../../mascot/useMascotSound.js";
import ToggleSwitch from "../../../common/ToggleSwitch.jsx";
import SoundVolumeControl from "./SoundVolumeControl.jsx";

// Sound card for Settings > Preferences. Sound is off by default; the volume
// controls stay frozen until the user turns it on.
export default function SoundSettings() {
  const { soundOn, toggleSound, volume, setVolume } = useMascotSound();

  return (
    <div className="rounded-2xl border border-(--border-subtle) bg-(--bg-surface-subtle) p-5 sm:p-6">
      <div className="flex items-start gap-4">
        <div className="grid size-12 shrink-0 place-items-center rounded-xl border border-(--border-medium) bg-(--primary-light) text-(--primary)">
          {soundOn ? (
            <Volume2 size={20} aria-hidden="true" />
          ) : (
            <VolumeX size={20} aria-hidden="true" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h5 className="text-[14px] font-bold text-(--text-primary)">
              Sound Effects
            </h5>
            <span
              className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
                soundOn
                  ? "border-(--status-success) bg-(--status-success-bg) text-(--status-success)"
                  : "border-(--border-medium) text-(--text-muted)"
              }`}
            >
              {soundOn ? "On" : "Off"}
            </span>
          </div>
          <p className="mt-1 text-[12px] text-(--text-secondary)">
            Plays your mascot&apos;s reactions and the Surprise Me roll. Nothing
            makes noise unless you turn this on.
          </p>
        </div>

        <ToggleSwitch
          checked={soundOn}
          onChange={toggleSound}
          label="Sound effects"
        />
      </div>

      <div className="my-5 border-t border-(--border-medium)/70" />

      <SoundVolumeControl
        disabled={!soundOn}
        volume={volume}
        onVolumeChange={setVolume}
      />
    </div>
  );
}
