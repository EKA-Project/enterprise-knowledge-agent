import { useMemo, useState } from 'react';
import { BookOpen, Search, Plus } from 'lucide-react';
import { glossaryTerms } from './KnowledgeData.js';
import GlossaryCard from './GlossaryCard.jsx';

const PAGE_SIZE = 4;
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

// Company Glossary: search + A–Z filter + paginated 2-column term cards.
// canManage -> shows "+ Add term" and card edit icons (admin only; wired later).
export default function GlossarySection({ canManage = true }) {
  const [query, setQuery] = useState('');
  const [letter, setLetter] = useState('All');
  const [page, setPage] = useState(1);

  // How many terms start with each letter (drives faint/active letters + tooltip)
  const letterCounts = useMemo(() => {
    const counts = {};
    glossaryTerms.forEach((t) => {
      const l = t.term[0].toUpperCase();
      counts[l] = (counts[l] || 0) + 1;
    });
    return counts;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return glossaryTerms.filter((t) => {
      const matchesLetter = letter === 'All' || t.term[0].toUpperCase() === letter;
      const matchesQuery =
        !q || `${t.term} ${t.expansion} ${t.definition}`.toLowerCase().includes(q);
      return matchesLetter && matchesQuery;
    });
  }, [query, letter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);
  const remaining = filtered.length - (start + PAGE_SIZE);

  const changeLetter = (next) => {
    setLetter(next);
    setPage(1);
  };

  return (
    <section className="mt-8 rounded-3xl border border-(--border-subtle) bg-(--bg-surface) p-5 shadow-(--shadow-sm)">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-(--cat-lavender-bg) text-(--cat-lavender)">
            <BookOpen size={16} />
          </span>
          <div>
            <span className="kb-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-(--primary)">
              Speak the language
            </span>
            <h3 className="kb-serif text-lg font-bold text-(--text-primary)">Company Glossary</h3>
            <p className="text-[11px] text-(--text-muted)">Internal terms, acronyms, and jargon explained.</p>
          </div>
        </div>

        <div className="flex w-full items-center gap-2 sm:w-auto">
          <label className="flex flex-1 items-center gap-2 rounded-full border border-(--border-subtle) bg-(--bg-surface) px-3 py-1.5 sm:w-56 sm:flex-none">
            <Search size={12} className="text-(--text-muted)" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search terms..."
              className="w-full bg-transparent text-xs text-(--text-primary) outline-none placeholder:text-(--text-muted)"
            />
          </label>
          {canManage && (
            <button
              type="button"
              className="inline-flex cursor-pointer items-center gap-1 rounded-full bg-(--primary) px-3.5 py-1.5 text-xs font-semibold text-(--primary-contrast) hover:bg-(--primary-hover)"
            >
              <Plus size={12} /> Add term
            </button>
          )}
        </div>
      </div>

      {/* A–Z filter */}
      <div className="mt-4 flex items-center gap-1 overflow-x-auto rounded-full border border-(--border-subtle) bg-(--bg-surface-subtle) p-1.5">
        <button
          type="button"
          onClick={() => changeLetter('All')}
          className={`shrink-0 cursor-pointer rounded-full px-3 py-1 text-[11px] font-semibold ${
            letter === 'All' ? 'bg-(--primary) text-(--primary-contrast)' : 'text-(--text-secondary)'
          }`}
        >
          All ({glossaryTerms.length})
        </button>
        {LETTERS.map((l) => {
          const count = letterCounts[l] || 0;
          const active = letter === l;
          return (
            <div key={l} className="group relative shrink-0">
              <button
                type="button"
                disabled={count === 0}
                onClick={() => changeLetter(l)}
                className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold ${
                  active
                    ? 'bg-(--primary) text-(--primary-contrast)'
                    : count
                      ? 'cursor-pointer text-(--text-primary) hover:bg-(--primary-light)'
                      : 'cursor-not-allowed text-(--text-muted) opacity-40'
                }`}
              >
                {l}
              </button>
              {count > 0 && (
                <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-1 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-(--sidebar-bg) px-2 py-1 text-[10px] text-white group-hover:block">
                  {count} terms starting with {l}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Cards */}
      {visible.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {visible.map((item) => (
            <GlossaryCard key={item.id} item={item} canManage={canManage} />
          ))}
        </div>
      ) : (
        <p className="py-8 text-center text-xs text-(--text-muted)">No terms match your search.</p>
      )}

      {/* Pagination (only when there is more than one page) */}
      {totalPages > 1 && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-(--primary-light) px-4 py-2.5">
          <span className="kb-mono text-[10px] text-(--text-muted)">
            Showing {start + 1}-{Math.min(start + PAGE_SIZE, filtered.length)} of {filtered.length} terms
          </span>
          <div className="flex items-center gap-2 text-[11px] font-medium">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="cursor-pointer rounded-lg border border-(--border-subtle) bg-(--bg-surface) px-3 py-1 text-(--text-secondary) disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Previous
            </button>
            <span className="kb-mono rounded-lg border border-(--border-subtle) bg-(--bg-surface) px-3 py-1 text-(--text-secondary)">
              Page {page} of {totalPages}
            </span>
            <button
              type="button"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="cursor-pointer rounded-lg border border-(--border-subtle) bg-(--bg-surface) px-3 py-1 text-(--text-primary) disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next{remaining > 0 ? ` ${Math.min(PAGE_SIZE, remaining)}` : ''} →
            </button>
          </div>
        </div>
      )}
    </section>
  );
}