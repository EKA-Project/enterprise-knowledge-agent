import PageHero from '../../common/PageHero.jsx';
import DocumentContent from '../shared/DocumentContent.jsx';
import useUpload from '../../../hooks/useUpload.js';
import pageMetadata from '../../../config/pageMetadata.js';
import { IngestDocumentButton } from '../../common/ActionButtons.jsx';


// Manager view: ingest button + document grid. No health overview or storage.
function ManagerDocument() {
  const { openUpload, canUpload } = useUpload(); // opens the global upload modal
  const hero = pageMetadata.documents;

  return (
    <>
      <div className="mb-6">
        <PageHero
          eyebrow="Ingestion Pipeline"
          title={hero.title}
          description={hero.description}
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