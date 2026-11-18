const PRESETS = [
  { value: 0, label: "0% (Mute)" },
  { value: 25, label: "25%" },
  { value: 50, label: "50%" },
  { value: 75, label: "75%" },
  { value: 100, label: "100%" },
];

// Quick-pick volume pills. `percent` is the current level (0 to 100),
// onSelect receives the chosen percent.
export default function VolumePresets({ percent, disabled, onSelect }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
      <span className="text-[10.5px] font-bold tracking-wider text-(--text-muted) uppercase">
        Level presets
      </span>
      <div
        role="group"
        aria-label="Volume presets"
        className="flex flex-wrap gap-1.5"
      >
        {PRESETS.map(({ value, label }) => {
          const active = percent === value;
          return (
            <button
              key={value}
              type="button"
              disabled={disabled}
              aria-pressed={active}
              onClick={() => onSelect(value)}
              className={`rounded-full border px-3 py-1 text-[11px] font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus) disabled:cursor-not-allowed disabled:opacity-50 ${
                active
                  ? "border-(--primary) bg-(--primary-light) text-(--primary) ring-1 ring-(--primary)"
                  : "border-(--border-medium) bg-(--bg-surface) text-(--text-secondary) hover:border-(--primary)"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
