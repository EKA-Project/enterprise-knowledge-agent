import { glossaryTerms as seed } from '../data/knowledgeExtras.js';

const KEY = 'eka-glossary';

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    /* fall through to seed */
  }
  return seed.map((t) => ({ ...t }));
}

function write(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* storage full or blocked: keep working in memory */
  }
}

const sortTerms = (list) =>
  [...list].sort((a, b) => a.term.localeCompare(b.term, undefined, { sensitivity: 'base' }));

export async function getGlossaryTerms() {
  return sortTerms(read());
}

// Add or update (same id replaces)
export async function saveGlossaryTerm(term) {
  const list = read().filter((t) => t.id !== term.id);
  list.push(term);
  write(sortTerms(list));
  return { ...term };
}