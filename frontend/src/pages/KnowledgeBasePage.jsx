import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import CollectionInsightsModal from '../components/knowledge/CollectionInsightsModal.jsx';
import useUpload from '../hooks/useUpload.js';
import { Upload, LayoutGrid } from 'lucide-react';
import KnowledgeStats from '../components/knowledge/KnowledgeStats.jsx';
import CategoryCard from '../components/knowledge/CategoryCard.jsx';
import GlossarySection from '../components/knowledge/GlossarySection';
import AuthContext from '../context/AuthContext.jsx';
import LibraryFavorites from '../components/knowledge/LibraryFavorites';
import RecentlyUpdated from '../components/knowledge/RecentlyUpdated';
import AskQuestionBanner from '../components/knowledge/AskQuestionBanner.jsx';
import { knowledgeStats, knowledgeCategories } from '../components/knowledge/KnowledgeData.js';
import '../styles/knowledge.css';
import DemoStatesBar from '../components/knowledge/DemoStatesBar';
import SectionState from '../components/knowledge/SectionState';
import Button from '../components/common/Button.jsx';
import PageHero from '../components/common/PageHero.jsx';
import pageMetadata from '../config/pageMetadata.js';

export default function KnowledgeBasePage() {
  const { activeRole } = useContext(AuthContext);
  const { openUpload, canUpload } = useUpload();
  const [demoState, setDemoState] = useState('normal');
  const resetDemo = () => setDemoState('normal');
  // Category whose Collection Insights modal is open (null = closed)
  const [insightsCategory, setInsightsCategory] = useState(null);

  // Hero text comes from the shared page config
  const hero = pageMetadata.knowledgeBase;

  return (
    <div className="px-0 py-0">
      {/* Hero section */}
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        className="mb-2"
        actions={
          <>
            {canUpload && (
              <Button
                variant="solid"
                icon={Upload}
                iconChip
                title="Upload a new document"
                onClick={openUpload}
              >
                Upload Document
              </Button>
            )}

            <Link
              to="/documents"
              className="group inline-flex h-9 cursor-pointer items-center gap-2 rounded-full border border-(--border-subtle) bg-(--bg-surface) pl-2 pr-4 text-xs font-bold text-(--text-primary) transition-all duration-200 hover:-translate-y-0.5 hover:border-(--border-medium)"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-(--bg-surface-subtle) text-(--text-secondary) transition-all duration-200 group-hover:-translate-y-0.5 group-hover:bg-[color-mix(in_srgb,var(--dept-orange)_14%,transparent)] group-hover:text-(--dept-orange)">
                <LayoutGrid size={12} />
              </span>
              Browse all
            </Link>
          </>
        }
      />

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
        {demoState === 'empty' ? (
          <SectionState
            icon={LayoutGrid}
            title="No collections indexed yet"
            message="Create a department in Admin Settings to begin populating collections."
            actionLabel="Reset View"
            onAction={resetDemo}
          />
        ) : demoState === 'error' ? (
          <SectionState
            variant="error"
            title="Unable to load department collections"
            message="A transient storage error occurred while building the index."
            actionLabel="Retry"
            onAction={resetDemo}
          />
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {knowledgeCategories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onOpenInsights={setInsightsCategory}
              />
            ))}
          </div>
        )}
      </section>

      <GlossarySection canManage={activeRole === 'Admin'} state={demoState} onReset={resetDemo} />
      <LibraryFavorites state={demoState} onReset={resetDemo} />
      <RecentlyUpdated state={demoState} onReset={resetDemo} />

      {/* Bottom guidance banner from the approved Knowledge Base reference. */}
      <AskQuestionBanner />
      {insightsCategory && (
        <CollectionInsightsModal
          category={insightsCategory}
          onClose={() => setInsightsCategory(null)}
        />
      )}

      <DemoStatesBar value={demoState} onChange={setDemoState} />
    </div>
  );
}