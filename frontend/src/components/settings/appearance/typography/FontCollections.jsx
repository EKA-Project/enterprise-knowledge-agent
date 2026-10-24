import { useEffect, useState } from "react";
import {
  ALL_FONTS,
  FONT_COLLECTIONS,
  TYPOGRAPHY,
  fontCollectionCount,
  loadFonts,
} from "../../../../appearance/fontStudio";
import FilterPills from "../FilterPills";
import { pill } from "../cardStyles";
import AppearanceHeader from "../AppearanceHeader";
import { Type } from "lucide-react";
import FontCard from "./FontCard";

const ALL = "all";

export default function FontCollections({ activeId, onSelect }) {
  const [filter, setFilter] = useState(ALL);

  // Load every pairing once, so each card previews in its own typefaces.
  useEffect(() => {
    loadFonts(ALL_FONTS, "eka-preview-fonts");
  }, []);

  const options = [
    { id: ALL, label: "All Pairings", count: TYPOGRAPHY.length },
    ...FONT_COLLECTIONS.map((c) => ({
      id: c.id,
      label: c.label,
      count: fontCollectionCount(c.id),
    })),
  ];
  const visible = TYPOGRAPHY.filter(
    (f) => filter === ALL || f.collection === filter,
  );
  const current = TYPOGRAPHY.find((f) => f.id === activeId);

  return (
    <div>
      <AppearanceHeader
        icon={Type}
        eyebrow="Typography System"
        title="Typography & Font Studio"
        description="Curated editorial, modern tech, and avant-garde typographic trios crafted for deep reading and authority."
        aside={
          current && (
            <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-(--border-medium) bg-(--bg-surface) py-1 pl-1.5 pr-3 text-[12.5px]">
              <span
                aria-hidden="true"
                className="grid size-5 place-items-center rounded-full bg-(--status-success-bg) text-(--status-success)"
              >
                ✓
              </span>
              <span className="font-semibold text-(--text-primary)">
                Active
              </span>
              <span aria-hidden="true" className="text-(--text-muted)">
                •
              </span>
              <span className="text-(--text-secondary)">{current.name}</span>
            </span>
          )
        }
      />

      <div>
        <FilterPills
          label="Typography pairings"
          options={options}
          value={filter}
          onChange={setFilter}
        />

        {/* @container: column count follows this block's width, not the browser window's */}
        <div className="@container mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {visible.map((f, idx) => (
              <FontCard
                key={f.id}
                font={f}
                active={activeId === f.id}
                onSelect={onSelect}
                index={TYPOGRAPHY.indexOf(f)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
