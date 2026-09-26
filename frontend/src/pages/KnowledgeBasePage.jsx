import { useState } from 'react';
import { Search, LayoutGrid } from 'lucide-react';
import TopicFilterPills from '../components/knowledge/TopicFilterPills.jsx';
import CategoryCard from '../components/knowledge/CategoryCard.jsx';
import { topicFilters, knowledgeCategories } from '../components/knowledge/KnowledgeData.js';
import '../styles/knowledge.css';

// Knowledge Base landing page — browse the collective knowledge, filter by
// topic, and jump into recently surfaced docs or pinned guides.
// Note: page title/subtitle are NOT rendered here — Topbar already shows
// them based on the current route (see routeMetadata in Topbar.jsx).
export default function KnowledgeBasePage() {
  // Active topic filter — lifted up here so the category grid (next step)
  // can also read/react to it.
  const [activeTopic, setActiveTopic] = useState('all');

  return (
    <div className="px-6 py-6">
      {/* Hero section */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <p className="kb-eyebrow mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
            Browse the collective
          </p>
          <h2 className="kb-hero-heading text-[2.5rem] font-bold leading-tight text-slate-900">
            Find the thread.
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            A map of what your team knows, grouped in ways that make sense.
          </p>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-0.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
        > 
          <LayoutGrid size={14} />
          Browse all
        </button>
      </div>

      {/* Search bar (static for now — no search/navigation logic yet) */}
      <div className="mb-6 flex items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-2.5 shadow-sm">
        <Search size={18} className="text-slate-400" />
        <input
          type="text"
          placeholder="Search policies, guides, rituals, runbooks…"
          className="w-full border-0 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
        />
      </div>
      {/* Topic filter pills */}
        <TopicFilterPills
          topics={topicFilters}
          activeTopic={activeTopic}
          onChange={setActiveTopic}
        />

                {/* Category grid — filtered by the active topic pill.
            "all" shows every category; a specific topic shows only its
            matching card (Company foundations has no pill, so it only
            appears under "All topics"). */}
        <div className="grid grid-cols-3 gap-6">
          {knowledgeCategories
            .filter((category) => activeTopic === 'all' || category.id === activeTopic)
            .map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
        </div>
    </div>
  );
}

     