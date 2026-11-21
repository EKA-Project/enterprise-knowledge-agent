import { BookOpen, Zap } from 'lucide-react';
import Modal from '../common/Modal.jsx';
// EKA-EDIT: departments now come from the service (replaces the KnowledgeData import)
import { useEffect, useState } from 'react';
import { getDepartments } from '../../services/departmentService.js';
import Button from '../common/Button.jsx';
import { CancelButton } from '../common/ActionButtons.jsx';

const inputClass =
  'w-full rounded-xl border border-(--border-subtle) bg-(--bg-surface) px-3 py-2 text-xs text-(--text-primary) outline-none placeholder:text-(--text-muted) focus:border-(--border-focus) focus:shadow-[0_0_0_3px_var(--primary-glow)]';

const labelClass =
  'kb-mono mb-1 block text-[10px] font-semibold uppercase tracking-[0.1em] text-(--text-secondary)';

export default function AddGlossaryTermModal({
  onClose,
  onSave,
  mode = 'add',
  item = null,
}) {
  const [term, setTerm] = useState(item?.term ?? '');
  const [category, setCategory] = useState(
    item?.category ?? 'Product Strategy & Design'
  );
  const [expansion, setExpansion] = useState(item?.expansion ?? '');
  const [definition, setDefinition] = useState(item?.definition ?? '');
  // EKA-EDIT: department options for the Category select
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    let alive = true;
    getDepartments().then((list) => alive && setDepartments(list));
    return () => { alive = false; };
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();

    onSave({
      id: mode === 'edit' ? item.id : `gl-${Date.now()}`,
      term: term.trim(),
      expansion: expansion.trim(),
      category,
      definition: definition.trim(),
      revised: new Date().toISOString().slice(0, 10),
    });
  };

  return (
    <Modal
      title={mode === 'edit' ? 'Edit Glossary Term' : 'Add Glossary Term'}
      eyebrow="Company Glossary"
      icon={<BookOpen size={16} />}
      onClose={onClose}
      size="md"
      footer={(close) => (
        <div className="flex w-full items-center">
          <CancelButton type="button" onClick={close} />

          <Button
            type="submit"
            form="glossary-term-form"
            variant="solid"
            className="ml-auto"
          >
            {mode === 'edit' ? 'Update Term →' : 'Save Term →'}
          </Button>
        </div>
      )}
    >
      <form
        id="glossary-term-form"
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {/* Admin Badge */}
        <div>
          <span className="rounded-full bg-(--status-success-bg) px-2 py-0.5 text-[9px] font-semibold uppercase text-(--status-success)">
            Admin Action
          </span>
        </div>

        {/* Term and Category */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className={labelClass}>
              Term  <span className="text-(--status-danger)">*</span>
            </label>

            <input
              type="text"
              required
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="e.g. OKR, SOC 2, WFA"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
               Department{' '}
              <span className="text-(--status-danger)">*</span>
            </label>

            <select
              required
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className={`${inputClass} cursor-pointer`}
            >
              <option value="" disabled>
                Select department
              </option>

              {departments.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>

            <p className="mt-1 flex items-start gap-1 text-[10px] text-(--text-muted)">
              <Zap size={10} className="mt-px shrink-0 text-(--cat-gold)" />
              Enterprise Admin: full authority across all department taxonomies.
            </p>
          </div>
        </div>

        {/* Expansion */}
        <div>
          <label className={labelClass}>Full Form </label>

          <input
            type="text"
            value={expansion}
            onChange={(event) => setExpansion(event.target.value)}
            placeholder="e.g. Objectives and Key Results"
            className={inputClass}
          />
        </div>

        {/* Definition */}
        <div>
          <label className={labelClass}>
            Definition {' '}
            <span className="text-(--status-danger)">*</span>
          </label>

          <textarea
            required
            rows={3}
            value={definition}
            onChange={(event) => setDefinition(event.target.value)}
            placeholder="Clear, concise explanation of what this term means in our company context..."
            className={`${inputClass} resize-y`}
          />
        </div>
      </form>
    </Modal>
  );
}
