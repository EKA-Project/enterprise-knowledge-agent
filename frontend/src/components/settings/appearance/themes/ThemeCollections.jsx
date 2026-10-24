import { useState } from "react";
import {
  THEMES,
  THEME_COLLECTIONS,
  themeTag,
} from "../../../../appearance/theme";
import Button from "../../../common/Button";
import SearchInput from "../../../common/SearchInput";
import { getCollectionIcon } from "../../../icons/collectionIcons";
import AtmosphereToolbar from "./AtmosphereToolbar";
import AppearanceHeader from "../AppearanceHeader";
import { Diamond } from "lucide-react";
import CollectionRow from "./CollectionRow";

const ALL = "all";
const labelOf = Object.fromEntries(
  THEME_COLLECTIONS.map((c) => [c.id, c.label]),
);

// Every word typed must appear in the theme's name, description, tag or collection name.
function matches(theme, words) {
  if (!words.length) return true;
  const hay =
    `${theme.name} ${theme.description} ${themeTag(theme)} ${labelOf[theme.collection]}`.toLowerCase();
  return words.every((w) => hay.includes(w));
}

export default function ThemeCollections({ activeId, onSelect }) {
  const [filter, setFilter] = useState(ALL);
  const [query, setQuery] = useState("");

  const words = query.toLowerCase().split(/\s+/).filter(Boolean);

  // Matching themes per collection, in collection order.
  const found = THEME_COLLECTIONS.map((collection) => ({
    collection,
    themes: THEMES.filter(
      (t) => t.collection === collection.id && matches(t, words),
    ),
  }));

  // Pill counts follow the search, so typing shows where the matches are.
  const options = [
    {
      id: ALL,
      label: "All Atmospheres",
      count: found.reduce((n, g) => n + g.themes.length, 0),
      icon: getCollectionIcon(ALL),
    },
    ...found.map(({ collection, themes }) => ({
      id: collection.id,
      label: collection.label,
      count: themes.length,
      icon: getCollectionIcon(collection.id),
    })),
  ];

  // All = every collection with matches. A collection id = only that one.
  const visible = found.filter(
    (g) =>
      (filter === ALL || g.collection.id === filter) && g.themes.length > 0,
  );
  const shown = visible.reduce((n, g) => n + g.themes.length, 0);

  return (
    <div className="mt-12">
      <AppearanceHeader
        icon={Diamond}
        eyebrow="Workspace Palettes"
        title="Atmosphere Collections"
        description={`Color shapes cognitive rhythm. Explore ${THEMES.length} chromatic environments crafted to quiet the eye, dissolve distractions, and set your ideal focus state.`}
        meta={
          <span className="inline-flex rounded-full border border-(--border-medium) px-3 py-1 font-mono text-[11px] text-(--text-secondary)">
            Showing {shown} of {THEMES.length} atmospheres
          </span>
        }
      />
      
      <div>
        <AtmosphereToolbar
          options={options}
          value={filter}
          onChange={setFilter}
          query={query}
          onQueryChange={setQuery}
        />

        {shown === 0 ? (
          <div className="mt-5 rounded-2xl border border-dashed border-(--border-medium) px-6 py-10 text-center">
            <p className="text-[13px] font-semibold text-(--text-primary)">
              No atmospheres match “{query.trim()}”
            </p>
            <p className="mt-1 text-[12px] text-(--text-muted)">
              Try a colour, a mood or a collection name.
            </p>
            <div className="mt-3 flex justify-center gap-2">
              <Button variant="surface" size="xs" onClick={() => setQuery("")}>
                Clear search
              </Button>
              {filter !== ALL && (
                <Button
                  variant="surface"
                  size="xs"
                  onClick={() => setFilter(ALL)}
                >
                  Search all collections
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="mt-5 space-y-5">
            {visible.map(({ collection, themes }) => (
              <CollectionRow
                key={collection.id}
                collection={collection}
                themes={themes}
                activeId={activeId}
                onSelect={onSelect}
                focused={filter === collection.id}
                onToggleFocus={() =>
                  setFilter(filter === collection.id ? ALL : collection.id)
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
