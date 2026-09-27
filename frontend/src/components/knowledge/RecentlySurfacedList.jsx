import { Check, ArrowUpRight } from 'lucide-react';
import { recentlySurfacedDocs } from './knowledgeData.js';

// File-type badge colors, measured from the reference design.
const fileTypeStyles = {
  PDF: 'bg-red-100 text-red-700',
  DOCX: 'bg-green-100 text-green-700',
  FIG: 'bg-purple-100 text-purple-700',
};

export default function RecentlySurfacedList() {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="kb-hero-heading text-2xl font-bold text-(--text-primary)">
          Recently surfaced
        </h3>
        {/* Static for now — no sort logic wired yet */}
        <button type="button" className="text-sm text-(--text-secondary) hover:text-(--text-primary)">
          Sort: recent ›
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {recentlySurfacedDocs.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between rounded-2xl bg-(--bg-surface) p-4 shadow-(--shadow-sm) transition-colors duration-150 hover:bg-(--bg-surface-subtle)"
          >
            <div className="flex items-center gap-4">
              <span className={`rounded-lg px-2 py-1 text-[10px] font-bold ${fileTypeStyles[doc.fileType]}`}>
                {doc.fileType}
              </span>
              <div>
                <p className="kb-hero-heading font-bold text-(--text-primary)">{doc.title}</p>
                <p className="text-sm text-(--text-secondary)">
                  {doc.updatedLabel} • {doc.size}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-sm font-medium text-green-700">
                <Check size={14} /> {doc.status}
              </span>
              <ArrowUpRight size={16} className="text-(--text-primary)" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}