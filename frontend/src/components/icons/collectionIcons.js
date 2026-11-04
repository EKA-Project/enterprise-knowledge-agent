import { BookOpen, Building2, Sparkles, Sprout, Star, Waves } from "lucide-react";

// collection id (from theme.js) -> icon. "all" is the All Atmospheres pill.
const COLLECTION_ICONS = {
  all: Star,
  editorial: BookOpen,
  oceanic: Waves,
  botanical: Sprout,
  pastel: Sparkles,
  executive: Building2,
};

export const getCollectionIcon = (id) => COLLECTION_ICONS[id] ?? Star;