// Accessible on/off switch. Controlled: the parent owns `checked`.
// label = what a screen reader announces (there is no visible text inside).
export default function ToggleSwitch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-7 w-12 shrink-0 rounded-full border transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus) ${
        checked
          ? "border-(--primary) bg-(--primary)"
          : "border-(--border-medium) bg-(--bg-surface)"
      }`}
    >
      <span
        className={`absolute top-1/2 left-0.5 size-5 -translate-y-1/2 rounded-full bg-white shadow-(--shadow-sm) transition-transform duration-200 motion-reduce:transition-none ${
          checked ? "translate-x-5.5" : "translate-x-0"
        }`}
      />
    </button>
  );
}