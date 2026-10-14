import { Link } from 'react-router-dom';
import { useState } from 'react';
import CollectionInsightsModal from '../components/knowledge/CollectionInsightsModal.jsx';
import { Upload, LayoutGrid } from 'lucide-react';
import KnowledgeStats from '../components/knowledge/KnowledgeStats.jsx';
import CategoryCard from '../components/knowledge/CategoryCard.jsx';
import GlossarySection from '../components/knowledge/GlossarySection';
import LibraryFavorites from '../components/knowledge/LibraryFavorites';
import AskQuestionBanner from '../components/knowledge/AskQuestionBanner.jsx';
import { knowledgeStats, knowledgeCategories } from '../components/knowledge/KnowledgeData.js';
import '../styles/knowledge.css';
import IngestDocumentModal from '../components/documents/shared/IngestDocumentModal.jsx';

export default function KnowledgeBasePage() {  
  // Category whose Collection Insights modal is open (null = closed)
  const [insightsCategory, setInsightsCategory] = useState(null);
    // Ingest modal open/closed (opened by the "Upload document" button)
  const [ingestOpen, setIngestOpen] = useState(false);

  return (
    <div className="px-4 py-2">
      {/* Hero section */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="kb-eyebrow mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-(--text-secondary)">
            Browse the collective
          </p>
          <h2 className="kb-hero-heading text-[2rem] sm:text-[2.5rem] font-bold leading-tight text-(--text-primary)">
            Find the thread.
          </h2>
          <p className="mt-1 text-sm text-(--text-secondary)">
            A map of what your team knows, grouped in ways that make sense.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIngestOpen(true)}
            className="cursor-pointer inline-flex items-center gap-1.5 rounded-full bg-(--primary) px-3.5 py-1 text-xs font-semibold text-(--primary-contrast) hover:bg-(--primary-hover)"
          >
            <Upload size={12} /> Upload document
          </button>
          <Link
            to="/documents"
            className="cursor-pointer inline-flex items-center gap-1.5 rounded-full border border-(--border-subtle) bg-(--bg-surface) px-3.5 py-1 text-xs font-semibold text-(--text-primary) shadow-(--shadow-sm)"
          >
            <LayoutGrid size={12} /> Browse all
          </Link>
        </div>
      </div>
      <KnowledgeStats stats={knowledgeStats} />

      {/* Browse by Department */}
      <section className="mt-8">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="kb-mono text-[10px] uppercase tracking-[0.12em] text-(--text-muted)">
              Knowledge Directory
            </p>
            <h2 className="kb-serif text-xl font-bold text-(--text-primary)">
              Browse by Department
            </h2>
          </div>
          <span className="kb-mono text-[11px] text-(--text-muted)">
            {knowledgeCategories.length} Collections Indexed
          </span>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {knowledgeCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onOpenInsights={setInsightsCategory}
            />
          ))}
        </div>
      </section>

        <GlossarySection />

        <LibraryFavorites />




      {/* Bottom guidance banner from the approved Knowledge Base reference. */}
      <AskQuestionBanner />
      {insightsCategory && (
        <CollectionInsightsModal
          category={insightsCategory}
          onClose={() => setInsightsCategory(null)}
        />
      )}
       {ingestOpen && <IngestDocumentModal onClose={() => setIngestOpen(false)} />}   {/* <-- ye nayi line */}
    </div>
  );
}

