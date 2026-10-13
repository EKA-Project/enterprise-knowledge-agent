import { useEffect, useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { documentCategories } from './DocumentData';
import byteHungry from '../../../assets/mascot/byte/hungry.png';
import '../../../styles/document.css';
import byteDrop from '../../../assets/mascot/byte/drop.png';
import byteEating from '../../../assets/mascot/byte/eating.png';
import byteDigesting from '../../../assets/mascot/byte/digesting.png';
import byteUploaded from '../../../assets/mascot/byte/uploaded.png';


// Mascot pose + speech-bubble text for each stage of the form.

const mascotStates = {
  idle: { image: byteHungry, text: 'Feed me a document' },
  dragging: { image: byteDrop, text: 'Drop it here!' },
  ready: { image: byteEating, text: 'Yum! Ready to ingest' },
  digesting: { image: byteDigesting, text: 'Digesting your document…' },
  done: { image: byteUploaded, text: 'Ingested! Ready to search' },
};


// "Ingest New Enterprise Document" modal — shared by every place that starts
// an upload (Knowledge Base, Documents). UI only; the API call comes later.
function IngestDocumentModal({ onClose, defaultCategory }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(defaultCategory ?? documentCategories[0].value);
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  // form -> digesting -> done (dummy timing until the real API exists)
  const [phase, setPhase] = useState('form');
  // Mascot "looks" towards the mouse pointer
  const [look, setLook] = useState({ x: 0, y: 0, tilt: 0 });

  const fileInputRef = useRef(null);
  const mascotRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);


  // Dummy ingestion progress: digesting -> done -> close
  useEffect(() => {
    if (phase === 'digesting') {
      const timer = setTimeout(() => setPhase('done'), 1500);
      return () => clearTimeout(timer);
    }
    if (phase === 'done') {
      const timer = setTimeout(onClose, 1500);
      return () => clearTimeout(timer);
    }
  }, [phase, onClose]);


  // Submit stays disabled until a title and a file are provided
  const canSubmit = title.trim() !== '' && file !== null;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!canSubmit) return;
    // TODO: send { title, category, file } to the ingestion API
    setPhase('digesting');
  };

  const handleDrop = (event) => {
    event.preventDefault();
     setDragging(false);
    setFile(event.dataTransfer.files[0] ?? null);
  };
  // Move / tilt the mascot slightly towards the pointer
  const handleMouseMove = (event) => {
    const el = mascotRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    const distance = Math.hypot(dx, dy) || 1;
    setLook({
      x: (dx / distance) * 4,
      y: (dy / distance) * 4,
      tilt: Math.max(-8, Math.min(8, dx / 40)),
    });
  };

  // Which mascot pose to show
  let stage = 'idle';
  if (phase === 'digesting') stage = 'digesting';
  else if (phase === 'done') stage = 'done';
  else if (dragging) stage = 'dragging';
  else if (file) stage = 'ready';
  const mascot = mascotStates[stage];

  return (
     <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-(--sidebar-bg)/50 p-4 backdrop-blur-sm"
      onClick={onClose}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setLook({ x: 0, y: 0, tilt: 0 })}
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-label="Ingest new enterprise document"
        onClick={(event) => event.stopPropagation()}
        onSubmit={handleSubmit}
        className="flex max-h-[90vh] w-full max-w-[31rem] flex-col overflow-y-auto rounded-3xl bg-(--bg-surface) shadow-(--shadow-lg)"
      >
        {/* Header */}
        <header className="flex items-center justify-between border-b border-(--border-subtle) px-5 py-5">
          <h3 className="doc-heading flex items-center gap-1.5 text-lg font-bold text-(--text-primary)">
            <Upload size={16} className="text-(--primary)" />
            Ingest New Enterprise Document
          </h3>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-(--border-subtle) text-(--text-secondary)"
          >
            <X size={14} />
          </button>
        </header>

        <div className="space-y-9 px-5 py-5">
          {/* Mascot prompt */}
          <div className="-mb-2 flex items-center gap-3 rounded-2xl bg-(--bg-surface-subtle) px-4 py-3">
            <img
              ref={mascotRef}
              src={mascot.image}
              alt=""
              className="h-14 w-14 shrink-0 object-contain transition-transform duration-150 ease-out"
              style={{ transform: `translate(${look.x}px, ${look.y}px) rotate(${look.tilt}deg)` }}
            />
            <div className="relative flex-1 rounded-xl bg-(--bg-surface) px-4 py-2 text-[13px] text-(--text-primary) shadow-(--shadow-sm)">
              <span className="absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 bg-(--bg-surface)" />
              {mascot.text}
            </div>
          </div>

          {/* Document title */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label htmlFor="ingest-title" className="text-xs font-semibold text-(--text-primary)">
                Document Title
              </label>
              <span className="text-xs text-(--status-failure)">*</span>
            </div>
            <input
              id="ingest-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Q4 Cloud Migration Strategy 2026"
              className="w-full rounded-xl border border-(--border-subtle) bg-(--bg-surface) px-3.5 py-2 text-[13px] text-(--text-primary) outline-none placeholder:text-(--text-muted) focus:border-(--border-focus) focus:shadow-[0_0_0_3px_var(--primary-glow)]"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="ingest-category" className="mb-1.5 block text-xs font-semibold text-(--text-primary)">
              Category / Department Scope
            </label>
            <select
              id="ingest-category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full cursor-pointer rounded-xl border border-(--border-subtle) bg-(--bg-surface) px-4 py-1.5 text-[13px] text-(--text-primary) outline-none"
            >
              {documentCategories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.value}
                </option>
              ))}
            </select>
          </div>

          {/* Upload file */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-xs font-semibold text-(--text-primary)">Upload File</span>
              <span className="text-xs text-(--status-failure)">*</span>
            </div>
            <div
              role="button"
              tabIndex={0}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(event) => event.key === 'Enter' && fileInputRef.current?.click()}
              onDragOver={(event) => {
                event.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              className={`flex h-32 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-2xl border border-dashed bg-(--bg-surface-subtle) text-center ${
                dragging ? 'border-(--primary)' : 'border-(--border-medium)'
              }`}
            >
              <Upload size={26} className="text-(--primary)" />
              <p className="text-[13px] font-semibold text-(--text-primary)">
                {file ? file.name : 'Drop file here or click to browse'}
              </p>
              <p className="text-[11px] text-(--text-muted)">
                PDF, DOCX, Markdown, CSV, TXT (up to 20MB)
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.md,.csv,.txt"
              className="hidden"
              onChange={(event) => setFile(event.target.files[0] ?? null)}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="flex justify-end gap-3 border-t border-(--border-subtle) bg-(--bg-surface-subtle)/40 px-5 py-3.5">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-full border border-(--border-subtle) bg-(--bg-surface) px-4 py-1.5 text-xs font-semibold text-(--text-primary)"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!canSubmit}
            className="cursor-pointer rounded-full bg-(--primary) px-4 py-1.5 text-xs font-semibold text-(--primary-contrast) disabled:cursor-not-allowed disabled:opacity-50"
          >
            Start Vector Ingestion
          </button>
        </footer>
      </form>
    </div>
  );
}

export default IngestDocumentModal;