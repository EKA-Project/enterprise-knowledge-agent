import { useEffect } from "react";

// Tuning knobs for the wheel feel.
const LINE_PX = 40; // one wheel "line" (some mice and Firefox report lines, not pixels)
const SPEED = 1.5; // distance per notch: raise it to travel further per notch
const EASE = 0.2; // share of the remaining distance covered each frame: raise it to be snappier
const DONE_PX = 0.5; // stop animating when this close to the target

// Turns the vertical mouse wheel into smooth horizontal scrolling for a row.
//   ref     = the scrolling element (its children are the cards)
//   enabled = false turns it off
// At either end of the row, the wheel goes straight back to the page with no pause.
export default function useWheelScroll(ref, enabled = true) {
  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let target = 0; // where the row is heading: wheel input moves this, the animation chases it
    let frame = 0; // requestAnimationFrame id, 0 when idle
    const maxScroll = () => el.scrollWidth - el.clientWidth;

    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    const animate = () => {
      const gap = target - el.scrollLeft;
      if (Math.abs(gap) <= DONE_PX) {
        el.scrollLeft = target;
        frame = 0;
        return;
      }
      el.scrollLeft += gap * EASE;
      frame = requestAnimationFrame(animate);
    };

    const onWheel = (e) => {
      // Leave zoom, sideways swipes and sideways-only wheels to the browser.
      if (e.ctrlKey || e.deltaY === 0 || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      const max = maxScroll();
      if (max <= 1) return; // nothing to scroll: the page keeps the wheel

      // While a glide is running, measure from where it is heading, not where it is now.
      const position = frame ? target : el.scrollLeft;
      const pushingPastEnd = e.deltaY > 0 && position >= max - DONE_PX;
      const pushingPastStart = e.deltaY < 0 && position <= DONE_PX;
      if (pushingPastEnd || pushingPastStart) {
        stop();
        target = el.scrollLeft;
        return; // no preventDefault: the page scrolls at once
      }

      e.preventDefault();
      const unit = e.deltaMode === 1 ? LINE_PX : e.deltaMode === 2 ? el.clientWidth : 1;
      target = Math.min(max, Math.max(0, position + e.deltaY * unit * SPEED));

      if (reduceMotion) {
        stop();
        el.scrollLeft = target;
      } else if (!frame) {
        frame = requestAnimationFrame(animate);
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      stop();
    };
  }, [enabled, ref]);
}