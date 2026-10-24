import { useRef, useCallback, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";

// options = [{ id, label, count, icon }]
export default function AtmosphereToolbar({
  options = [],
  value,
  onChange,
  query = "",
  onQueryChange,
}) {
  const trackRef = useRef(null);
  const searchRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Total count across options
  const totalCount =
    options.find((o) => o.id === "all")?.count ||
    options.reduce((acc, curr) => acc + (curr.count || 0), 0) ||
    31;

  // Track overflow and navigation buttons
  const updateScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const hasOverflow = track.scrollWidth > track.clientWidth + 2;
    setCanScrollLeft(hasOverflow && track.scrollLeft > 6);
    setCanScrollRight(
      hasOverflow && track.scrollLeft + track.clientWidth < track.scrollWidth - 6
    );
  }, []);

  // Silky smooth non-passive wheel listener
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        track.scrollLeft += e.deltaY;
        updateScroll();
      }
    };

    track.addEventListener("wheel", handleWheel, { passive: false });
    updateScroll();

    window.addEventListener("resize", updateScroll);
    return () => {
      track.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", updateScroll);
    };
  }, [updateScroll]);

  const scrollTrack = (direction) => {
    const track = trackRef.current;
    if (track) {
      track.scrollBy({ left: direction * 220, behavior: "smooth" });
      setTimeout(updateScroll, 280);
    }
  };

  const clearSearch = () => {
    onQueryChange?.("");
    searchRef.current?.focus();
  };

  return (
    <div className="relative flex items-center justify-between gap-3 px-2 py-1 rounded-full border border-(--border-subtle) bg-(--bg-surface-subtle) shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      
      {/* ============ Pill Rail Wrapper ============ */}
      <div className="relative flex items-center flex-1 min-w-0 overflow-hidden rounded-full">
        
        {/* Left Gradient Fade */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-9 bg-linear-to-r from-(--bg-surface-subtle) to-transparent transition-opacity duration-200 rounded-l-full ${
            canScrollLeft ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Left Arrow Button */}
        {canScrollLeft && (
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scrollTrack(-1)}
            className="absolute left-1 top-1/2 -translate-y-1/2 z-20 grid size-6.5 place-items-center rounded-full border border-(--border-medium) bg-(--bg-surface) text-(--text-primary) shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-200 hover:bg-(--primary) hover:border-(--primary) hover:text-white hover:scale-105 active:scale-95"
          >
            <ChevronLeft size={13} strokeWidth={2.5} />
          </button>
        )}

        {/* Scrollable Track */}
        <div
          ref={trackRef}
          onScroll={updateScroll}
          role="region"
          aria-label="Atmosphere categories"
          className="flex items-center gap-1.5 overflow-x-auto w-full py-0.5 px-1 scroll-smooth select-none scrollbar-none [&::-webkit-scrollbar]:hidden"
        >
          {options.map(({ id, label: text, count, icon: Icon }) => {
            const isActive = value === id;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={isActive}
                onClick={() => onChange(id)}
                className={`inline-flex shrink-0 items-center gap-2 px-2 py-1.5 rounded-full text-[11px] font-bold tracking-tight whitespace-nowrap cursor-pointer transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] select-none focus-visible:outline-2 focus-visible:outline-(--border-focus) ${
                  isActive
                    ? "bg-(--bg-surface) border border-(--border-medium) text-(--primary) shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
                    : "bg-transparent border border-transparent text-(--text-secondary) hover:bg-(--bg-surface)/90 hover:border-(--border-subtle) hover:text-(--text-primary)"
                }`}
              >
                {/* Category Icon */}
                {Icon && (
                  <span
                    className={`inline-flex items-center justify-center transition-opacity ${
                      isActive ? "opacity-100 text-(--primary)" : "opacity-75"
                    }`}
                  >
                    <Icon size={12} strokeWidth={2} aria-hidden="true" />
                  </span>
                )}

                {/* Title */}
                <span>{text}</span>

                {/* Pill Badge Counter */}
                {count !== undefined && (
                  <span
                    className={`font-mono text-[11px] font-bold px-1.5 py-0.5 rounded-full leading-none transition-colors ${
                      isActive
                        ? "bg-(--accent-subtle) text-(--primary)"
                        : "bg-(--bg-surface) border border-(--border-subtle) text-(--text-muted)"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Arrow Button */}
        {canScrollRight && (
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scrollTrack(1)}
            className="absolute right-1 top-1/2 -translate-y-1/2 z-20 grid size-6.5 place-items-center rounded-full border border-(--border-medium) bg-(--bg-surface) text-(--text-primary) shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-200 hover:bg-(--primary) hover:border-(--primary) hover:text-white hover:scale-105 active:scale-95"
          >
            <ChevronRight size={13} strokeWidth={2.5} />
          </button>
        )}

        {/* Right Gradient Fade */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-9 bg-linear-to-l from-(--bg-surface-subtle) to-transparent transition-opacity duration-200 rounded-r-full ${
            canScrollRight ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* ============ Full-Pill Docked Search Box ============ */}
      <div className="relative shrink-0 w-47.5 focus-within:w-61.25 transition-[width] duration-250 ease-[cubic-bezier(0.16,1,0.3,1)]">
        <Search
          size={14}
          strokeWidth={2}
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted)"
        />
        <input
          ref={searchRef}
          type="text"
          value={query}
          onChange={(e) => onQueryChange?.(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape" && query) {
              e.preventDefault();
              clearSearch();
            }
          }}
          placeholder={`Search ${totalCount} atmospheres...`}
          aria-label="Search atmospheres"
          autoComplete="off"
          spellCheck={false}
          className="h-8.5 w-full rounded-full border border-(--border-subtle) bg-(--bg-surface) pl-8.5 pr-8 text-[13px] text-(--text-primary) outline-none transition-all duration-200 placeholder:text-(--text-muted) placeholder:text-[12.5px] focus:border-(--primary) focus:ring-2 focus:ring-(--primary-glow) shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
        />
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 grid size-4.5 place-items-center rounded-full border border-(--border-subtle) bg-(--bg-surface-subtle) text-(--text-muted) transition-colors hover:bg-(--bg-surface) hover:border-(--border-medium) hover:text-(--text-primary)"
          >
            <X size={11} strokeWidth={2.5} />
          </button>
        )}
      </div>

    </div>
  );
}