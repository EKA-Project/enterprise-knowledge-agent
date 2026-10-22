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
      {/* Admin header: same shared hero, plus storage usage next to the button */}
      <div className="mb-6">
        <PageHero
          eyebrow={`Ingestion Repository / ${countText}`}
          title="Raw sources, structured."
          description="Every playbook, compliance standard, and contract that feeds EKA's intelligence."
          actions={
            <div className="flex flex-wrap items-center gap-3">
              <StorageIndicator />

              {/* Not wired yet — compare / redline flow comes later */}
              <button
                type="button"
                className="inline-flex h-[26px] cursor-pointer items-center gap-2 rounded-full border border-[#cfe3f3] bg-white pl-1.5 pr-3 text-xs font-semibold text-(--text-primary) transition-colors hover:bg-[#e1f0fa]"
              >
                <span className="flex h-4 w-4 items-center justify-center rounded bg-[#e1f0fa] text-[#1f718e]">
                  <Columns2 size={10} />
                </span>
                Compare &amp; Redline
              </button>

              <button
                type="button"
                onClick={openUpload}
                disabled={!canUpload}
                className="inline-flex h-[26px] cursor-pointer items-center gap-2 rounded-full bg-(--primary) pl-1.5 pr-3.5 text-xs font-semibold text-(--primary-contrast) transition-colors hover:bg-(--primary-hover) disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/25">
                  <Upload size={10} />
                </span>
                Ingest Document
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