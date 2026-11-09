import { Columns2, Sparkles } from 'lucide-react';
import PageHero from '../../common/PageHero.jsx';
import DocumentContent from '../shared/DocumentContent.jsx';
import { documents } from '../shared/DocumentData';
import StorageIndicator from './StorageIndicator.jsx';
import DocumentHealthOverview from './DocumentHealthOverview.jsx';
import useUpload from '../../../hooks/useUpload.js';
import { useDocumentCountText } from '../shared/documentResults.js';
import { Upload } from 'lucide-react';
import { IngestDocumentButton } from '../../common/ActionButtons.jsx';

function AdminDocument() {
  const { openUpload, canUpload } = useUpload(); // opens the global upload modal
  const countText = useDocumentCountText(documents.length);
  return (
    <>
      {/* Admin header: hero, then storage + buttons in one row below it */}
<div className="mb-6">
  <p className="kb-eyebrow mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-(--text-secondary)">
    Ingestion Repository / {countText}
  </p>

  <PageHero
    bare
    title="Raw sources, structured."
    description="Every playbook, compliance standard, and contract that feeds EKA's intelligence."
  />
</div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <StorageIndicator />

          {/* Not wired yet: compare / redline flow comes later */}


<IngestDocumentButton
  onClick={openUpload}
  disabled={!canUpload}
  className="ml-auto"
/>
        </div>
      

      {/* Admin-only document health overview */}
      <DocumentHealthOverview />

      <DocumentContent adminMode />
    </>
  );
}

export default AdminDocument;