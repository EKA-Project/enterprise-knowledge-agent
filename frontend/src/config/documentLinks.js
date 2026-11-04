// Where the dashboard panels send the user on the Documents page. One place, so
// whoever owns the Documents page can wire the filters without touching any
// dashboard file.
//
// CONTRACT (agreed, not yet read by the Documents page): ?filter=pinned | bookmarks
export const PINNED_DOCUMENTS_LINK = "/documents?filter=pinned";
export const BOOKMARKED_DOCUMENTS_LINK = "/documents?filter=bookmarks";