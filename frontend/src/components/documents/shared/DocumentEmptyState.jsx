import { FileText } from 'lucide-react';
import '../../../styles/Document.css';

function DocumentEmptyState({ onReset }) {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-(--border-subtle) bg-(--bg-surface) px-6 py-14 text-center shadow-(--shadow-sm)">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-400 text-(--text-primary)">
        <FileText size={20} />
      </span>
      <h2 className="doc-heading mt-5 text-xl font-bold text-(--text-primary)">
        No documents match your filter
      </h2>
      <p className="mt-1.5 text-sm text-(--text-muted)">
        Try adjusting your keywords or clearing the category filter.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-5 cursor-pointer rounded-full border border-(--border-medium) bg-(--bg-surface) px-4 py-1.5 text-xs font-semibold text-(--text-primary) transition-colors hover:bg-(--bg-surface-subtle)"
      >
        Reset Filters
      </button>
    </div>
  );
}

export default DocumentEmptyState;