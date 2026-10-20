import { useRef } from "react";
import useScrollPager from "../../../hooks/useScrollPager";
import useWheelScroll from "../../../hooks/useWheelScroll";
import CollectionSection from "./CollectionSection";
import RowPager from "./RowPager";
import ThemeCard from "./ThemeCard";

export default function CollectionRow({
  collection,
  themes,
  activeId,
  onSelect,
  focused,
  onToggleFocus,
}) {
  const trackRef = useRef(null);
  const pager = useScrollPager(trackRef, themes.length, !focused);
  useWheelScroll(trackRef, !focused);

  return (
    <CollectionSection
      collection={collection}
      count={themes.length}
      focused={focused}
      onToggleFocus={onToggleFocus}
      actions={
        !focused && pager.pages > 1 ? (
          <RowPager
            page={pager.page}
            pages={pager.pages}
            onPrev={pager.prev}
            onNext={pager.next}
          />
        ) : null
      }
    >
      {/* @container: card counts follow this block's width, not the browser window's */}
      <div className="@container">
        {focused ? (
          <div className="grid grid-cols-1 gap-4 @lg:grid-cols-2 @3xl:grid-cols-3">
            {themes.map((t) => (
              <ThemeCard
                key={t.id}
                theme={t}
                active={activeId === t.id}
                onSelect={onSelect}
              />
            ))}
          </div>
        ) : (
          // The negative margins + padding give hover lift and shadows room, so the scroller doesn't clip them.
          <div
            ref={trackRef}
            role="region"
            aria-label={`${collection.label} themes`}
            className="-mx-4 -my-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 py-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {themes.map((t) => (
              <div
                key={t.id}
                className="grid w-full shrink-0 snap-start @lg:w-[calc((100%-1rem)/2)] @3xl:w-[calc((100%-2rem)/3)]"
              >
                <ThemeCard
                  theme={t}
                  active={activeId === t.id}
                  onSelect={onSelect}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </CollectionSection>
  );
}
