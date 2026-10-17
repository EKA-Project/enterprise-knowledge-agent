import { Columns2, Sparkles } from 'lucide-react';
import PageHero from '../../common/PageHero.jsx';
import DocumentContent from '../shared/DocumentContent.jsx';
import { documents } from '../shared/DocumentData';
import StorageIndicator from './StorageIndicator.jsx';
import DocumentHealthOverview from './DocumentHealthOverview.jsx';

function AdminDocument() {
  return (
    <>
      {/* Admin header: same shared hero, plus storage usage next to the button */}
      <div className="mb-6">
        <PageHero
          bare
          eyebrow={`Ingestion Repository / ${documents.length} Docs`}
          title="Raw sources, structured."
          description="Every playbook, compliance standard, and contract that feeds EKA's intelligence."
          actions={
              <div className="flex flex-wrap items-center gap-3">
              <StorageIndicator />
                  {/* Not wired yet — compare / redline flow comes later */}
               <button
                type="button"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-(--border-subtle) bg-(--bg-surface) px-4 py-3 text-sm font-semibold text-(--text-primary) transition-colors hover:bg-(--bg-surface-subtle)"
              >
                <Columns2 size={14} />
                <Sparkles size={13} className="text-amber-500" />
                Compare &amp; Redline
              </button>

              <button
                type="button"
                className="cursor-pointer rounded-full bg-(--primary) px-5 py-3 text-sm font-bold text-(--primary-contrast) transition-colors hover:bg-(--primary-hover)"
              >
                + Ingest Document
              </button>
            </div>
          }
        />
      </div>

      {/* Admin-only document health overview */}
      <DocumentHealthOverview />

      <DocumentContent adminMode />
    </>
  );
}

export default AdminDocument;