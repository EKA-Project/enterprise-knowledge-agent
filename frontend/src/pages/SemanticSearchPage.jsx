import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
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
} from "../components/semantic-search/semanticmock";

const RECENT_KEY = "eka.semanticSearch.recent";
const MAX_RECENT = 8;
// ↑ The video keeps more than 5 recent searches.
const INITIAL_RESULTS = 3;
const MODE_TOASTS = {
  semantic: "Switched to ✨ Semantic Vector Mode",
  keyword: "Switched to 🎯 Keyword Mode",
  hybrid: "Switched to ⚡ Hybrid RAG Mode",
};

function loadRecent() {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed.slice(0, MAX_RECENT);
    }
  } catch {
    /* storage unavailable, fall back to demo data */
  }
  return createSeedRecentSearches();
}

export default function SemanticSearchPage() {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState(DEFAULT_QUERY);
  const [activeQuery, setActiveQuery] = useState(DEFAULT_QUERY);
  const [mode, setMode] = useState("semantic");
  const [source, setSource] = useState("all");
  const [recent, setRecent] = useState(loadRecent);
  const [citationResult, setCitationResult] = useState(null);
  const [toast, setToast] = useState("");
  const [regenKey, setRegenKey] = useState(0);
  const [regenerating, setRegenerating] = useState(false);
  const [expandedKey, setExpandedKey] = useState("");
  const toastTimer = useRef(null);
  const regenTimer = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
    } catch {
      /* ignore */
    }
  }, [recent]);

  useEffect(
    () => () => {
      clearTimeout(toastTimer.current);
      clearTimeout(regenTimer.current);
    },
    [],
  );

  const search = useMemo(() => searchDocuments(activeQuery, { mode, source }), [activeQuery, mode, source]);
  const terms = useMemo(() => getHighlightTerms(activeQuery), [activeQuery]);
  const stats = useMemo(
    () => getSearchStats({ query: activeQuery, mode, results: search.results }),
    [activeQuery, mode, search.results],
  );
  const topResult = search.results[0];
  const isHybrid = mode === "hybrid";

  const searchKey = `${activeQuery}|${mode}|${source}`;
  const showAll = expandedKey === searchKey;
  const visibleResults = showAll ? search.results : search.results.slice(0, INITIAL_RESULTS);
  const hiddenCount = search.results.length - visibleResults.length;

  const showToast = (message) => {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2600);
  };

  const changeMode = (id) => {
    setMode(id);
    showToast(MODE_TOASTS[id]);
  };

  const runSearch = (query) => {
    const q = query.trim();
    if (!q) return;
    setInputValue(q);
    setActiveQuery(q);
    setRecent((prev) =>
      [{ id: `${Date.now()}`, query: q, at: Date.now() }, ...prev.filter((r) => r.query.toLowerCase() !== q.toLowerCase())].slice(0, MAX_RECENT),
    );
  };

  const copyText = async (text, okMessage) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(okMessage);
    } catch {
      showToast("Copy is not available in this browser");
    }
  };

  const handleFeedback = (kind) =>
    showToast(kind === "up" ? "Marked as helpful. Thank you for your feedback!" : "Marked as not helpful. Thanks for letting us know.");

  const handleShare = () =>
    copyText(`${activeQuery}\n\n${search.answer}\n\nSource: ${topResult.title} (page ${topResult.page})`, "Answer summary copied. Paste it to share.");

  const handleRegenerate = () => {
    setRegenerating(true);
    clearTimeout(regenTimer.current);
    regenTimer.current = setTimeout(() => {
      setRegenKey((k) => k + 1);
      setRegenerating(false);
      showToast("Answer refreshed from indexed chunks");
    }, 700);
  };

  const goFollowUp = (question) => navigate("/ask-eka", { state: { question } });
  const openReader = () => navigate("/documents");

  const closeCitation = useCallback(() => setCitationResult(null), []);

  return (
    <div className="semantic-search-page mx-auto w-full max-w-6xl space-y-6">
      <header className="ssp-rise">
        <div className="flex items-center gap-2.5">
          <p className="font-(family-name:--font-mono) text-[10.5px] font-medium uppercase tracking-[0.18em] text-(--text-eyebrow)">
            Knowledge discovery
          </p>
          <span className="rounded-md border border-(--badge-border) bg-(--badge-bg) px-2 py-0.5 font-(family-name:--font-mono) text-[9.5px] font-bold uppercase tracking-wider text-(--badge-text)">
            EKA Vector Agent
          </span>
        </div>
        <h2 className="mt-2 font-(family-name:--font-serif) text-[40px] font-bold leading-tight tracking-tight text-(--text-primary)">
          Search by meaning, not just words.
        </h2>
        <p className="mt-2 max-w-[56ch] text-[14px] leading-relaxed text-(--text-secondary)">
          Find company guidelines, policies, and runbooks using everyday natural language concepts and plain English phrases.
        </p>
      </header>

      {/* Sticky: stays pinned while results scroll, like the video */}
        <SemanticSearchControls
          inputRef={inputRef}
          value={inputValue}
          onChange={setInputValue}
          onSubmit={() => runSearch(inputValue)}
          onClear={() => setInputValue("")}
          modes={SEARCH_MODES}
          mode={mode}
          onModeChange={changeMode}
          sources={SOURCE_FILTERS}
          source={source}
          onSourceChange={setSource}
          suggestionLabel={isHybrid ? "Hybrid RAG prompts" : "Suggested intent concepts"}
          suggestions={isHybrid ? HYBRID_PROMPTS : SUGGESTED_CONCEPTS}
          onPickSuggestion={runSearch}
          onExpand={() => goFollowUp(`Expand on: ${activeQuery}`)}
        />

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section aria-label="Search results" className="flex flex-col gap-5">
          {topResult && (
            <GroundedAnswerCard
              key={`${searchKey}|${regenKey}`}
              answer={search.answer}
              sourceTitle={topResult.title}
              citation={topResult.citation}
              terms={terms}
              regenerating={regenerating}
              onOpenCitation={() => setCitationResult(topResult)}
              onFollowUp={() => goFollowUp(`Follow-up on: ${activeQuery}`)}
              onCopy={() => copyText(search.answer, "Answer copied to clipboard")}
              onFeedback={handleFeedback}
              onShare={handleShare}
              onRegenerate={handleRegenerate}
            />
          )}

          {search.results.length === 0 ? (
            <div className="ssp-rise rounded-2xl border border-(--border-medium) bg-(--bg-surface) px-6 py-12 text-center shadow-(--shadow-sm)">
              <p className="font-(family-name:--font-serif) text-[22px] font-bold text-(--text-primary)">
                No matching documents found
              </p>
              <p className="mx-auto mt-2 max-w-[46ch] text-[13px] text-(--text-secondary)">
                Try phrasing your question differently or ask EKA’s generative intelligence directly.
              </p>
              <button
                type="button"
                onClick={() => goFollowUp(activeQuery)}
                className="mt-5 rounded-full bg-(--sidebar-bg) px-5 py-2 text-[12.5px] font-bold text-white transition hover:opacity-90 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus)"
              >
                Ask EKA Generative AI →
              </button>
            </div>
          ) : (
            <>
              <ol className="flex flex-col gap-5">
                {visibleResults.map((result, i) => (
                  <li key={`${searchKey}|${regenKey}|${result.id}`}>
                    <SearchResultCard
                      result={result}
                      index={i}
                      terms={terms}
                      delay={i * 70}
                      onPreview={setCitationResult}
                    />
                  </li>
                ))}
              </ol>

              {search.results.length > INITIAL_RESULTS && (
                <button
                  type="button"
                  onClick={() => setExpandedKey(showAll ? "" : searchKey)}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-(--border-medium) bg-(--bg-surface) py-3 text-[12.5px] font-semibold text-(--text-secondary) transition hover:border-(--primary) hover:text-(--primary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus)"
                >
                  {showAll ? (
                    <>
                      <ChevronUp size={14} aria-hidden="true" /> Show fewer results
                    </>
                  ) : (
                    <>
                      <ChevronDown size={14} aria-hidden="true" /> Show {hiddenCount} more result{hiddenCount === 1 ? "" : "s"}
                    </>
                  )}
                </button>
              )}
            </>
          )}
        </section>

        <aside className="flex flex-col gap-5">
          <SearchIntelligencePanel
            query={activeQuery}
            stats={stats}
            onInspect={() =>
              showToast(`Inspected: ${stats.scanned} docs indexed, ${stats.chunks} chunks vector-scored`)
            }
          />
          <RecentSearchesPanel
            items={recent}
            onSelect={runSearch}
            onRemove={(id) => setRecent((prev) => prev.filter((r) => r.id !== id))}
            onClear={() => setRecent([])}
          />
          <BetterSearchesPanel
            tips={BETTER_SEARCH_TIPS}
            onTry={runSearch}
            onCopy={(text) => copyText(text, "Example copied to clipboard")}
          />
        </aside>
      </div>

      {/* Both "View Exact Citation…" and "Preview Citation →" open this one modal */}
      {citationResult && (
        <CitationPreviewModal
          result={citationResult}
          terms={terms}
          onClose={closeCitation}
          onFollowUp={() =>
            goFollowUp(`Tell me more about ${citationResult.citation.section} in ${citationResult.title}`)
          }
          onOpenReader={openReader}
        />
      )}

      {toast && (
        <div
          role="status"
          className="ssp-toast fixed bottom-6 right-6 z-[60] flex max-w-sm items-center gap-2.5 rounded-xl bg-(--sidebar-bg) px-4 py-3 text-[12.5px] font-semibold text-white shadow-(--shadow-lg)"
        >
          <Info size={15} className="shrink-0 text-(--accent-highlight)" aria-hidden="true" />
          {toast}
        </div>
      )}
    </div>
  );
}