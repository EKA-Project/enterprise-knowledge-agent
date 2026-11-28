// Pure function: turns the service data of ONE document into the object the Summary page and
// its components already expect (the shape the old getDocumentSummary returned). No imports,
// so it is easy to test. summaryAdapter.js fetches the data and calls this.

const STATUS_LABEL = { ready: 'Indexed', processing: 'Processing', failed: 'Failed' };
const EXCERPT_LENGTH = 220;

const excerpt = (text) => (text.length > EXCERPT_LENGTH ? `${text.slice(0, EXCERPT_LENGTH).trimEnd()} …` : text);

function readTimeText(estimateReadTime, wordCount) {
  if (wordCount == null) return '—';
  const result = estimateReadTime(wordCount);
  if (typeof result === 'string') return result; // util already returns "4 min read"
  return result ? `${result} min read` : '—';
}

function latencyText(ingestion) {
  const done = (ingestion?.attempts ?? []).filter(
    (a) => a.status === 'succeeded' && a.startedAt && a.finishedAt,
  );
  if (done.length === 0) return '—';
  const latest = done.reduce((a, b) =>
    Date.parse(b.finishedAt) > Date.parse(a.finishedAt) ? b : a,
  );
  const ms = Date.parse(latest.finishedAt) - Date.parse(latest.startedAt);
  if (!(ms >= 0)) return '—';
  const sec = Math.round(ms / 1000);
  if (sec < 1) return '<1 sec';
  if (sec < 60) return `${sec} sec`;
  const min = Math.round(sec / 60);
  if (min < 60) return `${min} min`;
  const hr = Math.floor(min / 60);
  const rem = min % 60;
  return rem ? `${hr} hr ${rem} min` : `${hr} hr`;
}

export function buildSummary({ doc, insight, sections, related,ingestion, departmentNames, userNames, bookmarkedIds, helpers, pdfUrl }) {
  // Same small shape the old list rows and "sister documents" used
  const row = (d) => ({
    id: d.id,
    title: d.title,
    format: String(d.format).toUpperCase(),
    category: departmentNames.get(d.departmentId) ?? '',
    author: d.authorName ?? userNames.get(d.uploadedById) ?? '—',
  });

  const ready = insight?.status === 'ready';
  const ordered = [...(sections ?? [])].sort((a, b) => a.index - b.index);
  const sectionSummaries = new Map((ready ? insight.sectionSummaries : []).map((s) => [s.sectionId, s]));

  return {
    ...row(doc),
    status: doc.archivedAt ? 'Archived' : STATUS_LABEL[doc.status] ?? doc.status,
    isArchived: Boolean(doc.archivedAt),
    size: doc.sizeBytes == null ? '—' : helpers.formatFileSize(doc.sizeBytes),
    readTime: readTimeText(helpers.estimateReadTime, doc.wordCount),
    pages: doc.pageCount,
    chunks: doc.chunkCount,
    isPinned: doc.isPinned,
    isBookmarked: bookmarkedIds.has(doc.id),
    uploaded: String(doc.uploadedAt).slice(0, 10),

    // 'pending' | 'ready' | 'failed'. The AI tab can use it to say "summary is being prepared".
    insightStatus: insight?.status ?? 'pending',

    // AI parts. Only real insight text is used; when no insight is ready these stay empty.
    // executiveSummary falls back to the card description so the header is never blank.
    executiveSummary: ready && insight.summary ? insight.summary : doc.description,
    keyInsights: ready ? insight.takeaways.map((t) => t.text) : [],
    entities: ready ? insight.keywords.map((k) => k.term) : [],
    suggestedQuestions: ready ? insight.suggestedQuestions : [],

    // The document's own text. Reader pages are the sections, one page per section.
    sections: ordered.map((s) => ({
      id: s.index,
      page: s.index,
      title: s.title,
      summary: sectionSummaries.get(s.id)?.summary ?? excerpt(s.content),
      keywords: sectionSummaries.get(s.id)?.highlights ?? [],
    })),
    readerPages: ordered.map((s) => ({ page: s.index, title: `${s.index}. ${s.title}`, text: s.content })),

    telemetry: {
      vectorChunks: doc.chunkCount == null ? '—' : `${doc.chunkCount} chunks`,
      totalPages: doc.pageCount == null ? '—' : `${doc.pageCount} pages`,
      encryption: 'AES-256 (KMS)',
      tenantIsolation: 'Active (0 Training)',
      indexLatency: latencyText(ingestion),
    },

    connectedArticles: [],
    sisterDocuments: (related ?? []).map((r) => ({ ...row(r.document), score: r.score, sharedKeywords: r.sharedKeywords })),
    pdfUrl,
  };
}