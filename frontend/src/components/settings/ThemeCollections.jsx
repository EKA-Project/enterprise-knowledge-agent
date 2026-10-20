import { useState } from "react";
import { THEMES, THEME_COLLECTIONS, collectionCount } from "../../appearance/theme";
import { getCollectionIcon } from "../icons/collectionIcons";
import CollectionSection from "./CollectionSection";
import FilterPills from "./FilterPills";
import { SubSection } from "./SettingsPanel";
import ThemeCard from "./ThemeCard";

const ALL = "all";

export default function ThemeCollections({ activeId, onSelect }) {
  const [filter, setFilter] = useState(ALL);

  const options = [
    { id: ALL, label: "All Atmospheres", count: THEMES.length, icon: getCollectionIcon(ALL) },
    ...THEME_COLLECTIONS.map((c) => ({
      id: c.id,
      label: c.label,
      count: collectionCount(c.id),
      icon: getCollectionIcon(c.id),
    })),
  ];

  // All = every collection in order. A collection id = only that one.
  const visible = THEME_COLLECTIONS.filter((c) => filter === ALL || c.id === filter);
  const shown = filter === ALL ? THEMES.length : collectionCount(filter);

  return (
    <div className="mt-8">
      <SubSection
        first
        title="Atmosphere Collections"
        description={`Showing ${shown} of ${THEMES.length} atmospheres`}
      >
        <FilterPills
          label="Atmosphere collections"
          options={options}
          value={filter}
          onChange={setFilter}
        />

        <div className="mt-5 space-y-5">
          {visible.map((c) => {
            const themes = THEMES.filter((t) => t.collection === c.id);
            return (
              <CollectionSection
                key={c.id}
                collection={c}
                count={themes.length}
                focused={filter === c.id}
                onToggleFocus={() => setFilter(filter === c.id ? ALL : c.id)}
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {themes.map((t) => (
                    <ThemeCard
                      key={t.id}
                      theme={t}
                      active={activeId === t.id}
                      onSelect={onSelect}
                    />
                  ))}
                </div>
              </CollectionSection>
            );
          })}
        </div>
      </SubSection>
    </div>
  );
}