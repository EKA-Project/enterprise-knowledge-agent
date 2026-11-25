import { Pencil, Upload } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getDepartments } from '../../../services/departmentService.js';

import Modal from '../../common/Modal.jsx';
import Button from '../../common/Button.jsx';
import { CancelButton } from '../../common/ActionButtons.jsx';
const field =
  'mt-1.5 w-full rounded-lg border border-(--border-medium) bg-(--bg-surface) px-3 py-2 text-xs text-(--text-primary) outline-none focus:border-(--primary)';

const label = 'text-[11px] font-semibold text-(--text-secondary)';

// Admin "Edit Document Metadata" dialog.
// onSave receives { title, category, author, executiveSummary, file }.
function EditMetadataModal({ doc, onClose, onSave }) {
  const [form, setForm] = useState({
    title: doc.title,
    category: doc.category,
    author: doc.author,
    executiveSummary: doc.executiveSummary,
  });
  const [documentCategories, setDocumentCategories] = useState([]);
  useEffect(() => {
    let alive = true;
    getDepartments().then((list) => {
      if (alive) setDocumentCategories(list.map((d) => ({ value: d.name, label: d.name })));
    });
    return () => { alive = false; };
  }, []);
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await onSave({ ...form, file });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      title="Edit Document Metadata"
      subtitle="Admin Controls"
      icon={<Pencil size={14} />}
      onClose={onClose}
      size="md"
      spacing="compact"
      footer={(close) => (
        <div className="flex items-center justify-end gap-2">
          <CancelButton type="button" onClick={close} />

          <Button
            type="submit"
            form="edit-document-metadata-form"
            variant="solid"
            disabled={saving}
          >
            {saving ? 'Saving…' : 'Save Changes & Re-index ✓'}
          </Button>
        </div>
      )}
    >
      <form
        id="edit-document-metadata-form"
        onSubmit={submit}
      >
        <div className="space-y-4 px-6 py-5">
          <label className="block">
            <span className={label}>Document Title</span>
            <input
              className={field}
              value={form.title}
              onChange={set('title')}
              required
            />
          </label>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className={label}>Department / Scope</span>
              <select
                className={field}
                value={form.category}
                onChange={set('category')}
              >
                {documentCategories.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.value}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className={label}>Author / Owner</span>
              <input
                className={field}
                value={form.author}
                onChange={set('author')}
              />
            </label>
          </div>

          <label className="block">
            <span className={label}>Executive Summary</span>
            <textarea
              rows={4}
              className={`${field} resize-none`}
              value={form.executiveSummary}
              onChange={set('executiveSummary')}
            />
          </label>

          <div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1.5 font-semibold text-(--primary)">
                <Upload size={13} />
                Replace Raw Document File &amp; Re-index
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
                {file
                  ? file.name
                  : '📁 Click to upload new version (PDF, DOCX, MD, TXT)'}
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
      </form>
    </Modal>
  );
}

export default EditMetadataModal;
