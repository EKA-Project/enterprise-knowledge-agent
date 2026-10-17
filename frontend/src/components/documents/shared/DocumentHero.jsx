 import PageHero from '../../common/PageHero.jsx';
 import { documents } from './DocumentData';


 function DocumentHero() {
  return (
        <div className="mb-6">
      <PageHero
        bare
        eyebrow={`Company Documents / ${documents.length} Docs`}
        title="Knowledge, organized for you."
        description="Explore the documents and knowledge available to you through EKA."
      />
    </div>
  );
}

export default DocumentHero;