import { useRef } from "react";
import { Search, X } from "lucide-react";

// Compact search field: icon on the left, ✕ clear button on the right (appears once there's text).
// Escape also clears. Controlled: value + onChange(text).
export default function SearchInput({
  value,
  onChange,
  placeholder = "Search…",
  label = "Search",
  className = "",
}) {
  const inputRef = useRef(null);

  const clear = () => {
    onChange("");
    inputRef.current?.focus(); // keep typing without clicking back in
  };

  return (
    <div className={`relative ${className}`}>
      <Search
        size={13}
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted)"
      />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Escape" && value) {
            e.preventDefault();
            clear();
          }
        }}
        placeholder={placeholder}
        aria-label={label}
        autoComplete="off"
        spellCheck={false}
        className="h-8 w-full rounded-full border border-(--border-medium) bg-(--bg-surface) pl-8 pr-8 text-[12px] text-(--text-primary) outline-none transition duration-200 placeholder:text-(--text-muted) hover:border-(--primary)/60 focus:border-(--border-focus) focus:shadow-[0_0_0_3px_var(--primary-glow)]"
      />
      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={clear}
          className="absolute right-1.5 top-1/2 grid size-5 -translate-y-1/2 place-items-center rounded-full text-(--text-muted) transition-colors hover:bg-(--bg-surface-subtle) hover:text-(--text-primary) focus-visible:outline-2 focus-visible:outline-(--border-focus)"
        >
          <X size={12} />
        </button>
      )}
    </div>
  );
}