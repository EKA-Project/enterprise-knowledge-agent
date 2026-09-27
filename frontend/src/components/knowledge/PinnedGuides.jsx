import { Bookmark, MoreHorizontal } from 'lucide-react';

 import { pinnedGuides } from './KnowledgeData.js';

 export default function PinnedGuides() {
   return (
     <div>
       {/* Section heading and management action */}
       <div className="mb-4 flex items-center justify-between">
         <h3 className="kb-hero-heading text-2xl font-bold text-(--text-primary)">
           Pinned guides
         </h3>

         <button
           type="button"
           className="text-sm text-(--text-secondary) hover:text-(--text-primary)"
         >
           Manage ›
         </button>
       </div>

       {/* Pinned guides shown as compact reference cards */}
       <div className="flex flex-col gap-3">
         {pinnedGuides.map((guide) => (
           <div
             key={guide.id}
             className="flex items-center justify-between rounded-2xl border border-(--border-subtle) bg-(--bg-surface) px-5 py-4 shadow-(--shadow-sm) transition-all duration-150 hover:-translate-y-0.5 hover:shadow-(--shadow-md) active:translate-y-0"
           >
             <div className="flex min-w-0 items-center gap-3">
               <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100">
                 <Bookmark
                   size={15}
                   className="text-amber-600"
                 />
               </div>

               <p className="kb-hero-heading truncate text-base font-bold text-(--text-primary)">
                 {guide.title}
               </p>
             </div>

             {/* Static overflow control — menu logic can be added later */}
             <button
               type="button"
               aria-label={`More options for ${guide.title}`}
               className="shrink-0 text-sm font-bold tracking-wider text-(--text-secondary)"
             >
               •••
             </button>
           </div>
         ))}
       </div>
     </div>
   );
 }