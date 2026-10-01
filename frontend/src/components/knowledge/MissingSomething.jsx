import { HelpCircle } from 'lucide-react';

 export default function MissingSomething() {
   return (
     <div className="mt-3 rounded-3xl bg-(--status-warning-bg) p-5">
       {/* Prompt for knowledge that is not currently surfaced */}
       <div className="flex items-start gap-2">
         <HelpCircle size={20} className="mt-0.5 shrink-0 text-(--status-warning)" />
         <div>
           <h3 className="text-lg font-bold text-(--status-warning)">
             Missing something?
           </h3>

           <p className="mt-2 text-sm leading-5 text-(--status-warning)">
              If a topic feels thin, add the doc that would make it complete.
           </p>

           <button
             type="button"
             className="mt-4 rounded-full border border-(--border-medium) bg-(--bg-surface) px-4 py-2 text-xs font-bold text-(--text-primary) shadow-(--shadow-sm) hover:bg-(--bg-surface-subtle)"
           >
             + Add document
           </button>
         </div>
       </div>
     </div>
   );
 }