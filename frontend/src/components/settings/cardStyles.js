// Shared look for the selectable cards and small pills in Appearance settings.
export const pill =
  "rounded-full bg-(--bg-surface-subtle) px-2.5 py-0.5 text-[10.5px] font-semibold text-(--text-secondary)";

export const card = (on) =>
  `rounded-2xl border bg-(--bg-surface) text-left transition duration-200 hover:-translate-y-1 hover:shadow-(--shadow-md) ${
    on
      ? "border-[1.5px] border-(--primary-deep) shadow-(--shadow-md)"
      : "border-(--border-subtle) hover:border-(--primary)"
  }`;