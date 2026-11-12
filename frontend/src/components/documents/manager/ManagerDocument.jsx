import PageHero from '../../common/PageHero.jsx';
import DocumentContent from '../shared/DocumentContent.jsx';
import useUpload from '../../../hooks/useUpload.js';
import { Upload } from 'lucide-react';
import { IngestDocumentButton } from '../../common/ActionButtons.jsx';
// Manager view: ingest button + document grid. No health overview or storage.
function ManagerDocument() {
  const { openUpload, canUpload } = useUpload(); // opens the global upload modal

  return (
    <>
      <div className="mb-6">
        <PageHero
          bare
          eyebrow="Ingestion Pipeline"
          title="Raw sources, structured."
          description="Every playbook, compliance standard, and contract that feeds EKA's intelligence."
          actions={
<IngestDocumentButton
  onClick={openUpload}
  disabled={!canUpload}
  className="ml-auto"
/>

          }
        />
      </div>

      <DocumentContent variant="manager" />
    </>
  );
}

export default ManagerDocument;