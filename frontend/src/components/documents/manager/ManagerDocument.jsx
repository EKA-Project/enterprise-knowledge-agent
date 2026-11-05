import PageHero from '../../common/PageHero.jsx';
import DocumentContent from '../shared/DocumentContent.jsx';
import useUpload from '../../../hooks/useUpload.js';
import { Upload } from 'lucide-react';
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

          }
        />
      </div>

      <DocumentContent variant="manager" />
    </>
  );
}

export default ManagerDocument;