 import { ArrowUpRight } from 'lucide-react';

 export default function MissingSomething() {
   return (
     <div className="mt-3 rounded-3xl bg-[#f8efe1] p-5">
       {/* Prompt for knowledge that is not currently surfaced */}
       <div className="flex items-start gap-2">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-(--text-primary) text-xs font-bold text-(--text-primary)">
            ?
          </span>

         <div>
           <h3 className="kb-hero-heading text-lg font-bold text-(--text-secondary)">
             Missing something?
           </h3>

           <p className="mt-2 text-sm leading-5 text-(--text-secondary)">
             If a topic feels thin add the doc that would make it complete
           </p>

           <button
             type="button"
             className="mt-4 rounded-full border border-(--border-medium) bg-(--bg-surface) px-4 py-2 text-xs font-bold text-(--text-primary) shadow-(--shadow-sm) hover:bg-(--bg-surface-subtle)"
           >
             + Add Document
           </button>
         </div>
       </div>
     </div>
   );
 }