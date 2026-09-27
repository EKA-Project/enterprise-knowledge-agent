 export default function AskQuestionBanner() {
   return (
     <section className="mt-12 flex items-center justify-between rounded-3xl bg-[#e4f0e5] px-9 py-7">
       <div>
         {/* Reference eyebrow for the EKA guidance prompt */}
         <p className="kb-eyebrow text-[11px] font-bold uppercase tracking-[0.18em] text-(--text-secondary)">
           A good place to begin
         </p>

         <h2 className="kb-hero-heading mt-2 text-[1.8rem] font-bold leading-tight text-(--text-primary)">
           Not sure where to look?
         </h2>

         <p className="mt-1 text-sm text-(--text-secondary)">
           Ask EKA in plain language and it will point you to the source, not just the summary.
         </p>
       </div>

       <button
         type="button"
         className="flex shrink-0 items-center gap-2 rounded-full bg-[#124b3f] px-6 py-3 text-sm font-bold text-white transition-transform duration-150 hover:-translate-y-0.5"
       >
         Ask a question
         <span aria-hidden="true">↗</span>
       </button>
     </section>
   );
 }