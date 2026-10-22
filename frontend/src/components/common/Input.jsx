const BASE = "w-full rounded-xl border px-4 text-[14px] outline-none transition duration-200";
const EDITABLE =
  "border-(--border-medium) bg-(--bg-surface) text-(--text-primary) placeholder:text-(--text-muted) hover:border-(--primary)/60 focus:border-(--border-focus) focus:shadow-[0_0_0_3px_var(--primary-glow)]";
const LOCKED = "cursor-default border-(--badge-border) bg-(--bg-surface-subtle) text-(--text-secondary)";

// Label row (with an optional "managed by admin" hint on the right) + helper text.
function Field({ label, hint, helper, className = "", children }) {
  return (
    <label className={`block ${className}`}>
      {label && (
        <span className="mb-2 flex items-baseline justify-between gap-2">
          <span className="text-[13.5px] font-semibold text-(--text-primary)">{label}</span>
          {hint && <span className="text-[11px] text-(--text-muted)"><span aria-hidden="true">🔒</span> {hint}</span>}
        </span>
      )}
      {children}
      {helper && <span className="mt-2 block text-[11.5px] text-(--text-muted)">{helper}</span>}
    </label>
  );
}

export default function Input({ label, locked = false, lockHint = "Managed by Admin", helper, className = "", ...rest }) {
  return (
    <Field label={label} hint={locked ? lockHint : ""} helper={helper} className={className}>
      <input readOnly={locked} className={`${BASE} py-3 ${locked ? LOCKED : EDITABLE}`} {...rest} />
    </Field>
  );
}

export function Select({ label, helper, className = "", children, ...rest }) {
  return (
    <Field label={label} helper={helper} className={className}>
      <select className={`${BASE} py-2.5 ${EDITABLE}`} {...rest}>{children}</select>
    </Field>
  );
}

export function Textarea({ label, className = "", ...rest }) {
  return (
    <Field label={label} className={className}>
      <textarea className={`${BASE} resize-y py-3 ${EDITABLE}`} {...rest} />
    </Field>
  );
}