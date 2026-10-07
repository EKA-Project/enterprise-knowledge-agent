 function DocumentHero() {
   return (
     <section className="mb-6 flex items-end justify-between gap-8">
       <div>
         <p className="doc-mono text-xs font-semibold uppercase tracking-[0.16em] text-(--text-eyebrow)">
           Ingestion Pipeline
         </p>

         <h1 className="doc-heading mt-2 text-4xl font-bold text-(--text-primary)">
           Raw sources, structured.
         </h1>

         <p className="mt-2 text-sm text-(--text-secondary)">
           Every playbook, compliance standard, and contract that feeds EKA&apos;s intelligence.
         </p>
       </div>

       <button
         type="button"
         className="shrink-0 rounded-full bg-(--primary) px-5 py-3 text-sm font-bold text-(--primary-contrast) transition-colors hover:bg-(--primary-hover)"
       >
         + Ingest Document
       </button>
     </section>
   );
 }

 export default DocumentHero;