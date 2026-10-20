import { useEffect } from "react";

const SETTLE_DELAY = 140; // ms of wheel silence before snapping to the nearest card
const EDGE_HOLD = 250; // ms an edge keeps absorbing the wheel after the last scroll

// Turns the vertical mouse wheel into horizontal scrolling for a row of equal-width cards.
//   ref     = the scrolling element (its children are the cards)
//   enabled = false while the row isn't rendered
//   releaseAtEdges = at the start/end of the row, hand the wheel back to the page (after a short pause)
export default function useWheelScroll(ref, enabled = true, { releaseAtEdges = true } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;

    let settleTimer;
    let snapTimer;
    let lastHandled = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // After the wheel stops: glide onto the nearest card, then turn CSS snapping back on.
    const settle = () => {
      const first = el.firstElementChild;
      if (!first) return;
      const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
      const card = first.getBoundingClientRect().width + gap;
      el.scrollTo({ left: Math.round(el.scrollLeft / card) * card, behavior: reduce ? "auto" : "smooth" });
      snapTimer = setTimeout(() => {
        el.style.scrollSnapType = "";
      }, 400);
    };

    const onWheel = (e) => {
      // Not ours: browser zoom, or a native horizontal swipe / Shift+wheel.
      if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      const max = el.scrollWidth - el.clientWidth;
      if (max <= 1) return; // every card fits: let the page scroll

      const unit = e.deltaMode === 1 ? 40 : e.deltaMode === 2 ? el.clientWidth : 1;
      const delta = e.deltaY * unit;
      const now = performance.now();
      const atEdge = (delta < 0 && el.scrollLeft <= 0) || (delta > 0 && el.scrollLeft >= max - 1);

      if (atEdge && releaseAtEdges && now - lastHandled > EDGE_HOLD) return; // page takes over

      e.preventDefault(); // needs a non-passive native listener, which is why this isn't React's onWheel
      lastHandled = now;
      if (atEdge) return;

      clearTimeout(snapTimer);
      el.style.scrollSnapType = "none"; // snapping fights small wheel steps, so pause it while scrolling
      el.scrollLeft += delta;
      clearTimeout(settleTimer);
      settleTimer = setTimeout(settle, SETTLE_DELAY);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      clearTimeout(settleTimer);
      clearTimeout(snapTimer);
      el.style.scrollSnapType = "";
    };
  }, [enabled, ref, releaseAtEdges]);
}