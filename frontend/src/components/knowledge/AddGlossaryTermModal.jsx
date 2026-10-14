import { useEffect, useState } from 'react';
import { BookOpen, X, Zap } from 'lucide-react';
import { knowledgeCategories } from './KnowledgeData.js';

const inputClass =
  'w-full rounded-xl border border-(--border-subtle) bg-(--bg-surface) px-3 py-2 text-xs text-(--text-primary) outline-none placeholder:text-(--text-muted) focus:border-(--border-focus) focus:shadow-[0_0_0_3px_var(--primary-glow)]';
const labelClass =
  'kb-mono mb-1 block text-[10px] font-semibold uppercase tracking-[0.1em] text-(--text-secondary)';

// Add Glossary Term modal (admin action).
// onSave receives the new term object; the parent decides where it goes.
export default function AddGlossaryTermModal({ onClose, onSave }) {
  const [term, setTerm] = useState('');
  const [category, setCategory] = useState('Product Strategy & Design');
  const [expansion, setExpansion] = useState('');
  const [definition, setDefinition] = useState('');

  // Close on Escape
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({
      id: `gl-${Date.now()}`,
      term: term.trim(),
      expansion: expansion.trim(),
      category,
      definition: definition.trim(),
      revised: new Date().toISOString().slice(0, 10),
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-(--sidebar-bg)/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-label="Add glossary term"
        onClick={(event) => event.stopPropagation()}
        onSubmit={handleSubmit}
        className="flex max-h-[90vh] w-full max-w-[32rem] flex-col overflow-y-auto rounded-3xl bg-(--bg-surface) shadow-(--shadow-lg)"
      >
        {/* Header */}
        <header className="flex items-start gap-3 border-b border-(--border-subtle) px-5 py-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-(--cat-lavender-bg) text-(--cat-lavender)">
            <BookOpen size={16} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="kb-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-(--primary)">
                Company Glossary
              </span>
              <span className="rounded-full bg-(--status-success-bg) px-2 py-0.5 text-[9px] font-semibold uppercase text-(--status-success)">
                Admin Action
              </span>
            </div>
            <h3 className="kb-serif text-lg font-bold text-(--text-primary)">Add Glossary Term</h3>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-(--bg-surface-subtle) text-(--text-secondary)"
          >
            <X size={14} />
          </button>
        </header>

        {/* Fields */}
        <div className="space-y-4 px-5 py-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className={labelClass}>
                Term / Name <span className="text-(--status-danger)">*</span>
              </label>
              <input
                type="text"
                required
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="e.g. OKR, SOC 2, WFA"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>
                Category / Department <span className="text-(--status-danger)">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`${inputClass} cursor-pointer`}
              >
                {knowledgeCategories.map((c) => (
                  <option key={c.id} value={c.title}>
                    {c.title}
                  </option>
                ))}
              </select>
              <p className="mt-1 flex items-start gap-1 text-[10px] text-(--text-muted)">
                <Zap size={10} className="mt-px shrink-0 text-(--cat-gold)" />
                Enterprise Admin: full authority across all department taxonomies.
              </p>
            </div>
          </div>

          <div>
            <label className={labelClass}>Full Form / Expansion</label>
            <input
              type="text"
              value={expansion}
              onChange={(e) => setExpansion(e.target.value)}
              placeholder="e.g. Objectives and Key Results"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Definition / Explanation <span className="text-(--status-danger)">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
              placeholder="Clear, concise explanation of what this term means in our company context..."
              className={`${inputClass} resize-y`}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 border-t border-(--border-subtle) bg-(--primary-light) px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-full border border-(--border-medium) bg-(--bg-surface) px-4 py-1.5 text-xs font-semibold text-(--text-primary)"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="cursor-pointer rounded-full bg-(--primary) px-4 py-1.5 text-xs font-semibold text-(--primary-contrast) hover:bg-(--primary-hover)"
          >
            Save Term →
          </button>
        </div>
      </form>
    </div>
  );
}