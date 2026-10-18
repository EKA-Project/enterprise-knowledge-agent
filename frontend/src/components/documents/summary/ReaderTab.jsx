import { useState } from 'react';
import { FileText, FileDown, ChevronLeft, ChevronRight } from 'lucide-react';
import '../../../styles/Document.css';

const card =
  'rounded-3xl border border-(--border-subtle) bg-(--bg-surface) shadow-(--shadow-sm)';

const modeBtn = (active) =>
  `inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
    active
      ? 'bg-(--primary) text-(--primary-contrast)'
      : 'border border-(--border-subtle) bg-(--bg-surface) text-(--text-primary) hover:bg-(--bg-surface-subtle)'
  }`;

const navBtn =
  'inline-flex cursor-pointer items-center gap-1 rounded-full border border-(--border-subtle) bg-(--bg-surface) px-3 py-1 text-xs font-medium text-(--text-primary) transition-colors hover:bg-(--bg-surface-subtle) disabled:cursor-default disabled:opacity-40 disabled:hover:bg-(--bg-surface)';

// Original Document Reader: text pages or the embedded original PDF.
// `page` is controlled by the parent so "Read Full Page N" can jump here.
function ReaderTab({ doc, page, onPageChange, onToast }) {
  const [mode, setMode] = useState('text'); // 'text' | 'pdf'
  const pages = doc.readerPages;
  const current = pages.find((p) => p.page === page) ?? pages[0];

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(current.text);
      onToast('Page text copied to clipboard');
    } catch {
      onToast('Could not copy the text');
    }
  };

  return (
    <div className="space-y-5">
      {/* View-mode toggle */}
      <div className={`${card} flex flex-wrap items-center gap-2 p-2`}>
        <button type="button" className={modeBtn(mode === 'text')} onClick={() => setMode('text')}>
          <FileText size={12} /> Interactive Text Pages
        </button>
        <button type="button" className={modeBtn(mode === 'pdf')} onClick={() => setMode('pdf')}>
          <FileDown size={12} /> Original PDF Document
        </button>
        <span className="doc-mono ml-auto hidden px-3 text-[9px] uppercase tracking-widest text-(--text-muted) sm:block">
          View mode status
        </span>
      </div>

      {mode === 'text' ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[11rem_minmax(0,1fr)]">
          {/* Page list */}
          <nav aria-label="Document pages">
            <p className="doc-mono mb-3 text-[9px] uppercase tracking-widest text-(--text-muted)">
              Document Pages
            </p>
            <ul className="flex gap-2 overflow-x-auto md:flex-col">
              {pages.map((p) => (
                <li key={p.page} className="shrink-0 md:shrink">
                  <button
                    type="button"
                    onClick={() => onPageChange(p.page)}
                    className={`flex w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-left text-[11px] transition-colors ${
                      p.page === current.page
                        ? 'bg-(--primary) text-(--primary-contrast)'
                        : 'bg-(--bg-surface-subtle) text-(--text-secondary) hover:bg-(--primary-light)'
                    }`}
                  >
                    <b className="shrink-0 text-(--text-primary)" style={{ color: p.page === current.page ? 'inherit' : undefined }}>
                      Page {p.page}
                    </b>
                    <span className="max-w-[7rem] truncate opacity-70">{p.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0 space-y-3">
            {/* Prev / Next / Copy */}
            <div className={`${card} flex flex-wrap items-center gap-3 px-3 py-2`}>
              <button type="button" className={navBtn} disabled={current.page === 1} onClick={() => onPageChange(current.page - 1)}>
                <ChevronLeft size={12} /> Prev
              </button>
              <span className="text-xs text-(--text-primary)">
                Page {current.page} of {pages.length}
              </span>
              <button type="button" className={navBtn} disabled={current.page === pages.length} onClick={() => onPageChange(current.page + 1)}>
                Next <ChevronRight size={12} />
              </button>
              <button
                type="button"
                onClick={copyText}
                className="ml-auto cursor-pointer px-2 text-xs font-medium text-(--text-secondary) transition-colors hover:text-(--text-primary)"
              >
                Copy Plain Text
              </button>
            </div>

            {/* Page content, markdown shown raw like the video */}
            <article className={`${card} p-6 sm:p-8`}>
              <h2 className="doc-heading border-b border-(--border-subtle) pb-3 text-2xl font-bold text-(--text-primary)">
                {current.title}
              </h2>
              <p className="mt-4 whitespace-pre-line text-[15px] leading-[1.7] text-(--text-primary)">
                {current.text}
              </p>
            </article>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl bg-neutral-800 shadow-(--shadow-md)">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-5 py-3 text-xs text-white">
            <span className="min-w-0 flex-1 truncate">{doc.title}.pdf</span>
            <span className="doc-mono text-[11px]">Zoom: 100% &nbsp;|&nbsp; Pages: {pages.length}</span>
            <a
              href={doc.pdfUrl}
              download
              onClick={() => onToast('Downloading document PDF…')}
              className="inline-flex items-center gap-2 rounded-full bg-(--primary) px-4 py-1.5 font-semibold text-(--primary-contrast) transition-colors hover:bg-(--primary-hover)"
            >
              <FileDown size={12} /> Download PDF
            </a>
          </div>
          {/* The browser's own PDF viewer provides the toolbar inside the frame */}
          <iframe title={doc.title} src={doc.pdfUrl} className="block h-[470px] w-full bg-white" />
        </div>
      )}
    </div>
  );
}

export default ReaderTab;