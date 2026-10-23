// Small dark tooltip that appears under its child on hover or keyboard focus. Tailwind only.
export default function Tooltip({ label, children }) {
  return (
    <span className="group/tip relative inline-flex">
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute left-1/2 top-full z-20 mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#0e1726] px-2.5 py-1 text-[11px] font-semibold text-white opacity-0 shadow-(--shadow-md) transition duration-150 group-hover/tip:opacity-100 group-focus-within/tip:opacity-100"
      >
        {label}
      </span>
    </span>
  );
}