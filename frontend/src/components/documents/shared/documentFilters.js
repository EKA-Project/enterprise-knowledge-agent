// Filter values + the filter function for the Documents page.
// Today it filters the in-memory list; when the API arrives, replace
// filterDocuments() with a request that sends { search, category, format, status }.

export const ALL_CATEGORIES = 'All Categories';
export const ALL_FORMATS = 'All Formats';

// Special "categories" that filter by a flag instead of a category name.
export const SAVED_FILTER = 'Saved Bookmarks';
export const PINNED_FILTER = 'Admin Pinned';

export function filterDocuments(docs, { search, category, format, status = '' }) {
  const text = search.toLowerCase().trim();

  return docs.filter((doc) => {
    const matchesSearch =
      !text ||
      doc.title.toLowerCase().includes(text) ||
      doc.description.toLowerCase().includes(text) ||
      (doc.author ?? '').toLowerCase().includes(text);

    let matchesCategory = true;
    if (category === SAVED_FILTER) matchesCategory = Boolean(doc.isBookmarked);
    else if (category === PINNED_FILTER) matchesCategory = Boolean(doc.isPinned);
    else if (category !== ALL_CATEGORIES) matchesCategory = doc.category === category;

    const matchesFormat = format === ALL_FORMATS || doc.format === format;

    // Status comes from the Document Health Overview cards (empty = no filter)
    const matchesStatus = !status || doc.status === status;

    return matchesSearch && matchesCategory && matchesFormat && matchesStatus;
  });
}

// Pure pagination helper: returns the slice for the current page + totals.
export const PAGE_SIZES = [10, 25, 50];

export function paginate(items, page, pageSize) {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const current = Math.min(page, totalPages); // never beyond last page
  const start = (current - 1) * pageSize;
  return {
    pageItems: items.slice(start, start + pageSize),
    total,
    totalPages,
    current,
    from: total === 0 ? 0 : start + 1,
    to: Math.min(start + pageSize, total),
  };
}