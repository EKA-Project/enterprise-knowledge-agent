import { Check } from "lucide-react";

// Blue rounded checkbox. onChange receives true or false.
export default function Checkbox({ checked, onChange, label, disabled = false }) {
  return (
    <span className="relative inline-grid size-5 shrink-0 place-items-center">
      <input
        type="checkbox"
        aria-label={label}
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="peer absolute inset-0 size-5 cursor-pointer appearance-none rounded-md border-2 border-(--primary) bg-white transition duration-200 checked:bg-(--primary) hover:shadow-[0_0_0_3px_var(--primary-glow)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus) disabled:cursor-not-allowed disabled:opacity-50"
      />
      <Check size={13} strokeWidth={3.2} aria-hidden="true" className="pointer-events-none relative scale-50 text-white opacity-0 transition duration-200 peer-checked:scale-100 peer-checked:opacity-100" />
    </span>
  );
}