import { useRef } from "react";
import useScrollPager from "../../../hooks/useScrollPager";
import useWheelScroll from "../../../hooks/useWheelScroll";
import CollectionSection from "./CollectionSection";
import RowPager from "./RowPager";
import ThemeCard from "./ThemeCard";

// One collection as a single horizontal row. It looks the same whether the page shows every
// collection or only this one (Focus): the row is always the layout, and Focus just filters.
export default function CollectionRow({ collection, themes, activeId, onSelect, focused, onToggleFocus }) {
  const trackRef = useRef(null);
  const pager = useScrollPager(trackRef, themes.length);
  useWheelScroll(trackRef);

  return (
    <CollectionSection
      collection={collection}
      count={themes.length}
      focused={focused}
      onToggleFocus={onToggleFocus}
      actions={
        pager.pages > 1 ? (
          <RowPager page={pager.page} pages={pager.pages} onPrev={pager.prev} onNext={pager.next} />
        ) : null
      }
    >
      {/* @container: card widths follow this block's width, not the browser window's */}
      <div className="@container">
        {/* Negative margins + padding give hover lift and glow room, so the scroller doesn't clip them. */}
        <div
          ref={trackRef}
          role="region"
          aria-label={`${collection.label} themes`}
          className="-mx-4 -my-5 flex gap-4 overflow-x-auto scroll-px-4 px-4 py-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {themes.map((t) => (
            <div
              key={t.id}
              className="grid w-full shrink-0 @lg:w-[calc((100%_-_1rem)/2)] @3xl:w-[calc((100%_-_2rem)/3)]"
            >
              <ThemeCard theme={t} active={activeId === t.id} onSelect={onSelect} />
            </div>
          ))}
        </div>
      </div>
    </CollectionSection>
  );
}