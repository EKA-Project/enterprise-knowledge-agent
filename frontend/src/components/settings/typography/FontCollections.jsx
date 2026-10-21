import { useEffect, useState } from "react";
import {
  ALL_FONTS,
  FONT_COLLECTIONS,
  TYPOGRAPHY,
  fontCollectionCount,
  loadFonts,
} from "../../../appearance/fontStudio";
import FilterPills from "../FilterPills";
import { pill } from "../cardStyles";
import AppearanceHeader from "../appearance/AppearanceHeader";
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
    <div className="mt-12">
      <AppearanceHeader
        icon={Type}
        eyebrow="Typography System"
        title="Typography & Font Studio"
        description="Type is the quiet voice of your thoughts. Curated specimens inspired by literary broadsheets, Swiss modernist grids, and heritage print houses."
        aside={
          <span className={`${pill} font-mono shrink-0`}>
            Active: {current?.name}
          </span>
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
          <div className="grid grid-cols-1 gap-4 @lg:grid-cols-2 @3xl:grid-cols-3">
            {visible.map((f) => (
              <FontCard
                key={f.id}
                font={f}
                active={activeId === f.id}
                onSelect={onSelect}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
