import { useEffect, useState } from 'react';
import { Pencil, X } from 'lucide-react';
import { documentCategories } from '../shared/DocumentData';
import { Pencil, X, Upload } from 'lucide-react';

const field =
  'mt-1.5 w-full rounded-lg border border-(--border-medium) bg-(--bg-surface) px-3 py-2 text-xs text-(--text-primary) outline-none focus:border-(--primary)';
const label = 'text-[11px] font-semibold text-(--text-secondary)';

// Admin "Edit Document Metadata" dialog (Oct-20 video).
// onSave receives { title, category, author, executiveSummary, file }.
function EditMetadataModal({ doc, onClose, onSave }) {
  const [form, setForm] = useState({
    title: doc.title,
    category: doc.category,
    author: doc.author,
    executiveSummary: doc.executiveSummary,
  });
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  // Escape closes the dialog
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await onSave({ ...form, file });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b1220]/50 p-4 backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-label="Edit Document Metadata"
        onSubmit={submit}
        className="w-full max-w-[520px] overflow-hidden rounded-2xl bg-(--bg-surface) shadow-(--shadow-lg)"
      >
        <div className="flex items-start gap-3 px-6 pt-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-(--bg-surface-subtle) text-(--primary)">
            <Pencil size={14} />
          </span>
          <div className="flex-1">
            <h2 className="doc-heading text-base font-bold text-(--text-primary)">Edit Document Metadata</h2>
            <p className="doc-mono text-[9px] font-semibold uppercase tracking-wider text-(--text-muted)">
              Admin Controls
            </p>
          </div>
          <button
            type="button"
            aria-label="Close dialog"
            title="Close dialog"
            onClick={onClose}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-(--border-medium) text-(--text-secondary) hover:border-red-300 hover:bg-red-50 hover:text-red-500"
          >
            <X size={14} />
          </button>
        </div>

        <div className="space-y-4 px-6 py-5">
          <label className="block">
            <span className={label}>Document Title</span>
            <input className={field} value={form.title} onChange={set('title')} required />
          </label>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className={label}>Department / Scope</span>
              <select className={field} value={form.category} onChange={set('category')}>
                {documentCategories.map((c) => (
                  <option key={c.value} value={c.value}>{c.value}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className={label}>Author / Owner</span>
              <input className={field} value={form.author} onChange={set('author')} />
            </label>
          </div>

          <label className="block">
            <span className={label}>Executive Summary</span>
            <textarea rows={4} className={`${field} resize-none`} value={form.executiveSummary} onChange={set('executiveSummary')} />
          </label>

          <div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1.5 font-semibold text-(--primary)">
                <Upload size={13} /> Replace Raw Document File &amp; Re-index
              </span>
              <span className="text-(--text-muted)">
                Current:{' '}
                <span className="doc-mono rounded bg-(--bg-surface-subtle) px-1.5 py-0.5 text-[9px] font-bold text-(--text-secondary)">
                  {doc.format}
                </span>{' '}
                ({doc.size})
              </span>
            </div>
            <label className="mt-2 flex cursor-pointer flex-col items-center gap-1 rounded-xl border border-dashed border-(--border-medium) bg-(--bg-surface-subtle) px-4 py-4 text-center">
              <span className="text-[11px] font-semibold text-(--primary)">
                {file ? file.name : '📁 Click to upload new version (PDF, DOCX, MD, TXT)'}
              </span>
              <span className="text-[10px] text-(--text-muted)">
                Replaces raw copy &amp; updates vector chunk embeddings automatically
              </span>
              <input
                type="file"
                accept=".pdf,.docx,.md,.txt"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 bg-(--bg-surface-subtle) px-6 py-3">
          <button
            type="button"
            onClick={onClose}
            className="h-8 cursor-pointer rounded-full border border-(--border-medium) bg-(--bg-surface) px-4 text-xs font-semibold text-(--text-primary)"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="h-8 cursor-pointer rounded-full bg-(--primary) px-4 text-xs font-semibold text-(--primary-contrast) hover:bg-(--primary-hover) disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Save Changes & Re-index ✓'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditMetadataModal;