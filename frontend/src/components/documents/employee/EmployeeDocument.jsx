import PageHero from '../../common/PageHero.jsx';
import DocumentContent from '../shared/DocumentContent.jsx';
import { documents } from '../shared/DocumentData.js';
import { useDocumentCountText } from '../shared/documentResults.js';

function EmployeeDocument() {
  const countText = useDocumentCountText(documents.length);

  return (
    <>
      <div className="mb-6">
        <PageHero
          eyebrow={`Company Documents / ${countText}`}
          title="Knowledge, organized for you."
          description="Explore the documents and knowledge available to you through EKA."
        />
      </div>

      <DocumentContent />
    </>
  );
}

export default EmployeeDocument;