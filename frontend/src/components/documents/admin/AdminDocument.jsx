import { Columns2, Sparkles } from 'lucide-react';
import PageHero from '../../common/PageHero.jsx';
import DocumentContent from '../shared/DocumentContent.jsx';
import { documents } from '../shared/DocumentData';
import StorageIndicator from './StorageIndicator.jsx';
import DocumentHealthOverview from './DocumentHealthOverview.jsx';
import useUpload from '../../../hooks/useUpload.js';
import { useDocumentCountText } from '../shared/documentResults.js';
import { Upload } from 'lucide-react';

function AdminDocument() {
  const { openUpload, canUpload } = useUpload(); // opens the global upload modal
  const countText = useDocumentCountText(documents.length);
  return (
    <>
      {/* Admin header: hero, then storage + buttons in one row below it */}
      <div className="mb-6 [&_p:first-of-type]:text-[#7c949a]">
        <PageHero
          bare
          eyebrow={`Ingestion Repository / ${countText}`}
          title="Raw sources, structured."
          description="Every playbook, compliance standard, and contract that feeds EKA's intelligence."
        />

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <StorageIndicator />

          {/* Not wired yet: compare / redline flow comes later */}
          <button
            type="button"
            className="inline-flex h-[34px] cursor-pointer items-center gap-2 rounded-full border border-[#cfe3f3] bg-white pl-2 pr-4 text-xs font-semibold text-(--text-primary) transition-colors hover:bg-[#e1f0fa]"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded bg-[#e1f0fa] text-[#1f718e]">
              <Columns2 size={11} />
            </span>
            Compare &amp; Redline
          </button>

          <button
            type="button"
            onClick={openUpload}
            disabled={!canUpload}
            className="ml-auto inline-flex h-[34px] cursor-pointer items-center gap-2 rounded-full bg-(--primary) pl-1.5 pr-3.5 text-xs font-semibold text-(--primary-contrast) transition-colors hover:bg-(--primary-hover) disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/25">
              <Upload size={11} />
            </span>
            Ingest Document
          </button>
        </div>
      </div>

      {/* Admin-only document health overview */}
      <DocumentHealthOverview />

      <DocumentContent adminMode />
    </>
  );
}

export default AdminDocument;