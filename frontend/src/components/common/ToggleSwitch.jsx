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
      className={`relative h-7 w-12 shrink-0 rounded-full border-2 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus) ${
        checked
          ? "border-(--primary) bg-(--primary)"
          : "border-(--text-muted) bg-(--bg-surface)"
      }`}
    >
      <span
        className={`absolute top-1/2 left-0.5 size-5 -translate-y-1/2 rounded-full shadow-(--shadow-sm) transition duration-200 motion-reduce:transition-none ${
          checked ? "translate-x-5 bg-white" : "translate-x-0 bg-(--text-muted)"
        }`}
      />
    </button>
  );
}
