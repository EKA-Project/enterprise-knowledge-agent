import { formatStyles, statusMeta } from './DocumentCard';
import '../../../styles/Document.css';

const headers = ['Document Name', 'Category', 'Author / Owner', 'Size', 'Chunks', 'Status', 'Action'];

// List (table) view. Data only via props, so it works with API data later.
function DocumentList({ documents, onOpen }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-(--border-subtle) bg-(--bg-surface) shadow-(--shadow-sm)">
      {/* Horizontal scroll on small screens instead of squashing columns */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-left">
          <thead className="bg-(--bg-surface-subtle)/60">
            <tr className="border-b border-(--border-subtle)">
              {headers.map((h) => (
                <th
                  key={h}
                  className={`doc-mono px-6 py-4 text-[10px] font-semibold uppercase tracking-widest text-(--text-muted) ${
                    h === 'Action' ? 'text-right' : ''
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {documents.map((doc) => {
              const status = statusMeta[doc.status] ?? statusMeta.Indexed;
              const tile =
                formatStyles[doc.format] ?? 'bg-(--bg-surface-subtle) text-(--text-primary)';

              return (
                <tr
                  key={doc.id}
                  onClick={() => onOpen?.(doc)}
                  className="cursor-pointer border-b border-(--border-subtle) transition-colors last:border-b-0 hover:bg-(--bg-surface-subtle)/60"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`doc-mono flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[10px] font-bold ${tile}`}
                      >
                        {doc.format}
                      </span>
                      <div className="min-w-0">
                        <p className="doc-heading text-sm font-bold leading-5 text-(--text-primary)">
                          {doc.title}
                        </p>
                        <p className="mt-0.5 text-xs text-(--text-muted)">
                          {doc.readTime} • {doc.pages} pages
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-block rounded-full border border-(--border-subtle) px-3 py-1 text-xs text-(--text-secondary)">
                      {doc.category}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-(--text-primary)">{doc.author}</td>

                  <td className="px-6 py-4 text-sm text-(--text-primary)">{doc.size}</td>

                  <td className="px-6 py-4">
                    <span className="doc-mono rounded border border-(--border-subtle) bg-(--bg-surface-subtle)/60 px-1.5 py-0.5 text-[11px] text-(--text-secondary)">
                      {doc.chunks} chunks
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${status.style}`}
                    >
                      {status.label}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation(); // row click would open it too
                        onOpen?.(doc);
                      }}
                      className="cursor-pointer rounded-full border border-(--border-medium) bg-(--bg-surface) px-4 py-1.5 text-xs font-medium text-(--text-primary) transition-colors hover:bg-(--bg-surface-subtle)"
                    >
                      Summary →
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DocumentList;