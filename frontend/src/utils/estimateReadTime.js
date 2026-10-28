const WORDS_PER_MINUTE = 200;

// Read time is never stored; it derives from documents.wordCount.
// Returns null when wordCount is unknown (pending/failed documents), so the
// UI can show nothing instead of a made-up number.
export function estimateReadTime(wordCount) {
  if (!Number.isFinite(wordCount) || wordCount <= 0) return null;
  const minutes = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
  return `${minutes} min read`;
}