import PageHero from '../../common/PageHero.jsx';
import { IngestDocumentButton } from '../../common/ActionButtons.jsx';
import DocumentContent from '../shared/DocumentContent.jsx';
import { documents } from '../shared/DocumentData';
import StorageIndicator from './StorageIndicator.jsx';
import DocumentHealthOverview from './DocumentHealthOverview.jsx';
import useUpload from '../../../hooks/useUpload.js';
import { useDocumentCountText } from '../shared/documentResults.js';

function AdminDocument() {
  const { openUpload, canUpload } = useUpload(); // opens the global upload modal
  const countText = useDocumentCountText(documents.length);

  return (
    <>
      {/* Admin header: hero, then storage + ingest button in one row below it */}
      <PageHero
        eyebrow={`Ingestion Repository / ${countText}`}
        title="Raw sources, structured."
        description="Every playbook, compliance standard, and contract that feeds EKA's intelligence."
      />

      <div className="mb-4  flex flex-wrap items-center gap-3">
        <StorageIndicator />

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