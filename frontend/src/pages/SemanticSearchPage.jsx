import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import "../styles/semantic-search.css";
import SemanticSearchControls from "../components/semantic-search/SemanticSearchControls";
import GroundedAnswerCard from "../components/semantic-search/GroundedAnswerCard";
import SearchResultCard from "../components/semantic-search/SearchResultCard";
import SearchIntelligencePanel from "../components/semantic-search/SearchIntelligencePanel";
import RecentSearchesPanel from "../components/semantic-search/RecentSearchesPanel";
import BetterSearchesPanel from "../components/semantic-search/BetterSearchesPanel";
import CitationPreviewModal from "../components/semantic-search/CitationPreviewModal";
import {
  BETTER_SEARCH_TIPS, DEFAULT_QUERY, HYBRID_PROMPTS, SEARCH_MODES, SOURCE_FILTERS,
  SUGGESTED_CONCEPTS, createSeedRecentSearches, getHighlightTerms, getSearchStats, searchDocuments,
} from "../../services/semanticSearchService";
// ↑ The service lives in frontend/services, two folders above src/pages.

const RECENT_KEY = "eka.semanticSearch.recent";
const MAX_RECENT = 6;
const MODE_TOASTS = {
  semantic: "Switched to Semantic Vector Mode",
  keyword: "Switched to Keyword Mode",
  hybrid: "Switched to Hybrid RAG Mode",
};

function loadRecent() {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    /* storage unavailable, fall back to demo data */
  }
  return createSeedRecentSearches();
}
// ↑ Recent searches persist in this browser only (localStorage). No database.
