 import PageHero from '../../common/PageHero.jsx';
 function DocumentHero() {
  return (
    <div className="mb-6">
      <PageHero
        bare
        eyebrow="Ingestion Pipeline"
        title="Raw sources, structured."
        description="Every playbook, compliance standard, and contract that feeds EKA's intelligence."
        actions={
          <button
            type="button"
            className="rounded-full bg-(--primary) px-5 py-3 text-sm font-bold text-(--primary-contrast) transition-colors hover:bg-(--primary-hover)"
          >
            + Ingest Document
          </button>
        }
      />
    </div>
  );
}

 export default DocumentHero;