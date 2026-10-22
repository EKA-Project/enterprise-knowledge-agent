import { useCallback, useLayoutEffect, useState } from "react";

// Paging for a horizontally scrolling row of equal-width cards.
//   ref       = the scrolling element (its children are the cards)
//   itemCount = number of cards
//   enabled   = false while the row isn't rendered (e.g. focus mode shows a grid instead)
// Returns { page, pages, prev, next }. `page` is 0-based; one page = one screenful of cards.

function metrics(el) {
  const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
  const card = (el.firstElementChild?.offsetWidth ?? 0) + gap;
  const perView = card > 0 ? Math.max(1, Math.round((el.clientWidth + gap) / card)) : 1;
  return { card, perView };
}

export default function useScrollPager(ref, itemCount, enabled = true) {
  const [{ page, pages }, setState] = useState({ page: 0, pages: 1 });

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const { card, perView } = metrics(el);
    if (!card) return; // not laid out yet
    const total = Math.max(1, Math.ceil(itemCount / perView - 0.01));
    const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 2;
    const current = atEnd
      ? total - 1
      : Math.min(total - 1, Math.round(el.scrollLeft / (card * perView)));
    setState((s) => (s.page === current && s.pages === total ? s : { page: current, pages: total }));
  }, [ref, itemCount]);

  // Layout effect: the first measurement happens before paint, so the counter is right immediately.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    el.addEventListener("scroll", measure, { passive: true });
    return () => {
      observer.disconnect();
      el.removeEventListener("scroll", measure);
    };
  }, [enabled, measure, ref]);

  const go = useCallback(
    (dir) => {
      const el = ref.current;
      if (!el) return;
      const { card, perView } = metrics(el);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollBy({ left: dir * card * perView, behavior: reduce ? "auto" : "smooth" });
    },
    [ref],
  );

  return { page, pages, prev: () => go(-1), next: () => go(1) };
}