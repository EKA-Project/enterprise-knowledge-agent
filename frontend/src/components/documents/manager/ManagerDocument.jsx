import PageHero from '../../common/PageHero.jsx';
import DocumentContent from '../shared/DocumentContent.jsx';
import useUpload from '../../../hooks/useUpload.js';

// Manager view: ingest button + document grid. No health overview or storage.
function ManagerDocument() {
  const { openUpload, canUpload } = useUpload(); // opens the global upload modal

  return (
    <>
      <div className="mb-6">
        <PageHero
          eyebrow="Ingestion Pipeline"
          title="Raw sources, structured."
          description="Every playbook, compliance standard, and contract that feeds EKA's intelligence."
          actions={
            <button
              type="button"
              onClick={openUpload}
              disabled={!canUpload}
              className="cursor-pointer rounded-full bg-(--primary) px-5 py-3 text-sm font-bold text-(--primary-contrast) transition-colors hover:bg-(--primary-hover) disabled:cursor-not-allowed disabled:opacity-50"
            >
              + Ingest Document
            </button>
          }
        />
      </div>

      <DocumentContent variant="manager" />
    </>
  );
}

export default ManagerDocument;