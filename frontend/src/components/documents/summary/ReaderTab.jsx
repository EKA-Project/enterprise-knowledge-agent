import { useState } from 'react';
import { FileText, File as FileIcon } from 'lucide-react';
import '../../../styles/Document.css';

const card =
  'rounded-3xl border border-(--border-subtle) bg-(--bg-surface) shadow-(--shadow-sm)';
const pill =
  'inline-flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors';

// "Original Document Reader" tab. Data only via props:
//  doc.readerPages [{ page, title, text }], doc.pdfUrl
function ReaderTab({ doc, page, onPageChange, onToast }) {
  const [mode, setMode] = useState('text'); // 'text' | 'pdf'
  const pages = doc.readerPages ?? [];
  const total = pages.length;
  const current = pages.find((p) => p.page === page) ?? pages[0];

  const go = (n) => onPageChange(Math.min(Math.max(n, 1), total));

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(`${current.title}\n\n${current.text}`);
      onToast?.('Copied plain text to clipboard');
    } catch {
      onToast?.('Could not copy the text', 'neutral');
    }
  };

  return (
    <div className="min-w-0 space-y-4">
      {/* View mode switch */}
      <div className={`${card} flex flex-wrap items-center gap-2 p-3`}>
        <button
          type="button"
          onClick={() => setMode('text')}
          className={`${pill} ${mode === 'text'
            ? 'bg-[#153830] text-white'
            : 'bg-[#e1f0fa] text-[#3d5a73] hover:bg-[#d4e8f7]'
            }`}
        >
          <FileText size={13} /> Interactive Text Pages
        </button>
        <button
          type="button"
          onClick={() => setMode('pdf')}
          className={`${pill} ${mode === 'pdf'
            ? 'bg-[#153830] text-white'
            : 'bg-[#e1f0fa] text-[#3d5a73] hover:bg-[#d4e8f7]'
            }`}
        >
          <FileIcon size={13} /> Original PDF Document
        </button>
        <span className="doc-mono ml-auto text-[9px] uppercase tracking-widest text-(--text-muted)">
          View mode status
        </span>
      </div>

      {mode === 'pdf' ? (
        <div className={`${card} overflow-hidden`}>
          <iframe
            title={`${doc.title} (PDF)`}
            src={doc.pdfUrl}
            className="h-[640px] w-full"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[11rem_minmax(0,1fr)]">
          {/* Page list */}
          <nav aria-label="Document pages">
            <p className="doc-mono mb-2 text-[9px] uppercase tracking-widest text-(--text-muted)">
              Document Pages
            </p>
            <div className="flex gap-2 md:flex-col">
              {pages.map((p) => (
                <button
                  key={p.page}
                  type="button"
                  onClick={() => go(p.page)}
                  className={`min-w-0 flex-1 cursor-pointer rounded-xl px-3 py-2 text-left transition-colors md:flex-none ${p.page === current?.page
                    ? 'bg-[#153830] text-white'
                    : 'bg-[#e1f0fa] text-(--text-primary) hover:bg-[#d4e8f7]'
                    }`}
                >
                  <span className="block text-xs font-semibold">Page {p.page}</span>
                 <span className={`block truncate text-[10px] ${p.page === current?.page ? 'text-[#a8e6cf]' : 'text-[#7c949a]'}`}>{p.title}</span>
                </button>
              ))}
            </div>
          </nav>

          <div className="min-w-0 space-y-4">
            {/* Pager */}
            <div className={`${card} flex items-center gap-3 px-4 py-2.5`}>
              <button
                type="button"
                disabled={!current || current.page <= 1}
                onClick={() => go(current.page - 1)}
                className="cursor-pointer rounded-full border border-[#cfe3f3] px-3 py-1 text-[11px] font-semibold text-(--text-primary) disabled:cursor-not-allowed disabled:opacity-40"
              >
                ← Prev
              </button>
              <span className="doc-mono text-xs text-(--text-secondary)">
                Page {current?.page ?? 0} of {total}
              </span>
              <button
                type="button"
                disabled={!current || current.page >= total}
                onClick={() => go(current.page + 1)}
                className="cursor-pointer rounded-full border border-(--border-medium) px-3 py-1 text-[11px] font-semibold text-(--text-primary) disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next →
              </button>
              <button
                type="button"
                onClick={copyText}
                className="ml-auto cursor-pointer text-[11px] font-medium text-(--text-secondary) hover:text-(--text-primary)"
              >
                Copy Plain Text
              </button>
            </div>

            {/* Page content (raw ### markers are shown as-is, like the video) */}
            {current && (
              <article className={`${card} p-8`}>
                <h2 className="doc-heading border-b border-(--border-subtle) pb-3 text-2xl font-bold text-(--text-primary)">
                  {current.title}
                </h2>
                <p className="mt-5 whitespace-pre-line text-sm leading-7 text-(--text-secondary)">
                  {current.text}
                </p>
              </article>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ReaderTab;