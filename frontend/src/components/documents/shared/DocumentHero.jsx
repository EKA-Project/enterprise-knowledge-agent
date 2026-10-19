import PageHero from '../../common/PageHero.jsx';
import { documents } from './DocumentData';
import { useDocumentCountText } from './documentResults.js';

// Employee header: count follows the active filter, like the admin one.
function DocumentHero() {
  const countText = useDocumentCountText(documents.length);

  return (
    <div className="mb-6">
      <PageHero
        eyebrow={`Company Documents / ${countText}`}
        title="Knowledge, organized for you."
        description="Explore the documents and knowledge available to you through EKA."
      />
    </div>
  );
}

export default DocumentHero;