import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext.jsx';
import { getDepartments } from '../../services/departmentService.js';
import { getDocuments, getDocumentInsight } from '../../services/documentService.js';
import { getAmendments } from '../../services/amendmentService.js';
import { getDocumentActivityCounts } from '../../services/activityService.js';
import { getGlossaryTerms } from '../../services/glossaryService.js';
import { getDepartmentTheme } from '../../config/departmentTheme.js';
import { estimateReadTime } from '../../utils/estimateReadTime.js';
import { formatRelativeTime } from '../../utils/formatRelativeTime.js'; // CHECK: export name

const DAY = 86400000;

async function load() {
  const [departments, page, amendments, counts, glossary] = await Promise.all([
    getDepartments(),
    getDocuments({ limit: 200 }), // newest updatedAt first
    getAmendments({ limit: 50 }),
    getDocumentActivityCounts({ days: 30 }),
    getGlossaryTerms(),
  ]);
  const docs = page.items;
  const deptById = new Map(departments.map((d) => [d.id, d]));
  const themeOf = (doc) => {
    const d = deptById.get(doc.departmentId);
    const { color, softBg } = getDepartmentTheme(d?.colorKey, d?.iconKey);
    return { color, softBg };
  };

  // Stats (blueprint section 7: all derived)
  const stats = [
    { id: 'indexed', label: 'Indexed Documents', value: docs.filter((d) => d.status === 'ready').length, caption: 'Ready for search' },
    { id: 'collections', label: 'Collections', value: departments.length, caption: 'Department Hubs' },
    { id: 'chunks', label: 'Total Chunks', value: docs.reduce((s, d) => s + (d.chunkCount ?? 0), 0), caption: 'Vector chunks' },
    { id: 'glossary', label: 'Glossary Terms', value: glossary.length, caption: 'Defined Terms', highlight: true },
  ];

  const categories = departments.map((d) => ({
    id: d.id, title: d.name, code: d.code, colorKey: d.colorKey, iconKey: d.iconKey,
    documentCount: d.documentCount, memberCount: d.memberCount,
  }));

  // Favorites = pinned documents (pinnedAt desc)
  const pinned = docs.filter((d) => d.isPinned).sort((a, b) => b.pinnedAt.localeCompare(a.pinnedAt));
  const favorites = await Promise.all(
    pinned.map(async (doc) => {
      const insight = await getDocumentInsight(doc.id);
      const r = doc.wordCount == null ? null : estimateReadTime(doc.wordCount);
      return {
        id: `fav-${doc.id}`, docId: doc.id, title: doc.title,
        format: String(doc.format).toUpperCase(),
        category: deptById.get(doc.departmentId)?.name ?? '',
        area: deptById.get(doc.departmentId)?.code ?? '',
        readTime: r == null ? null : parseInt(String(r), 10) || null,
        cited: counts[doc.id]?.cited ?? 0,
        viewed: counts[doc.id]?.viewed ?? 0,
        description: doc.description,
        bullets: insight?.status === 'ready' ? insight.takeaways.slice(0, 3).map((t) => t.text) : [],
        theme: themeOf(doc),
      };
    }),
  );

  // Recently updated = newest of (amendment time, updatedAt) per readable document
  const latest = new Map(docs.map((d) => [d.id, d.updatedAt]));
  for (const a of amendments) {
    if (latest.has(a.documentId) && a.at > latest.get(a.documentId)) latest.set(a.documentId, a.at);
  }
  const byId = new Map(docs.map((d) => [d.id, d]));
  const recent = [...latest.entries()]
    .sort((a, b) => b[1].localeCompare(a[1]))
    .slice(0, 5)
    .map(([id, at]) => {
      const doc = byId.get(id);
      return {
        id: `upd-${id}`, docId: id, title: doc.title,
        format: String(doc.format).toUpperCase(),
        category: deptById.get(doc.departmentId)?.name ?? '',
        theme: themeOf(doc),
        when: formatRelativeTime(at),
        isNew: Date.now() - Date.parse(doc.uploadedAt) < 7 * DAY,
      };
    });

  return { stats, categories, favorites, recent };
}

export default function useKnowledgeData() {
  const { activeRole } = useContext(AuthContext);
  const [state, setState] = useState({ loading: true, error: null, stats: [], categories: [], favorites: [], recent: [] });

  useEffect(() => {
    let alive = true;
    load()
      .then((data) => alive && setState({ loading: false, error: null, ...data }))
      .catch((error) => alive && setState((s) => ({ ...s, loading: false, error })));
    return () => { alive = false; };
  }, [activeRole]); // visible documents differ per role

  return state;
}