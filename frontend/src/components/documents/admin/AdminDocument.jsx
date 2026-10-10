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
            <>
              <StorageIndicator />

              <button
                type="button"
                className="rounded-full bg-(--primary) px-5 py-3 text-sm font-bold text-(--primary-contrast) transition-colors hover:bg-(--primary-hover)"
              >
                + Ingest Document
              </button>
            </>
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