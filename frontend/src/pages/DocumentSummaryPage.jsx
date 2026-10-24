import { useContext, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext.jsx';
import {
  getDocumentSummary,
  setDocumentArchived,
} from '../components/documents/summary/summaryService';
import { loadDocuments } from '../components/documents/shared/documentResults.js';
import {
  useRoleDocuments,
  setDocumentArchivedFlag,
  startReindex,
  saveDocumentMetadata,
  deleteDocument,
} from '../components/documents/shared/roleDocuments.js';
import SummaryHeader from '../components/documents/summary/SummaryHeader';
import SummaryTabs from '../components/documents/summary/SummaryTabs';
import AiSummaryTab from '../components/documents/summary/AiSummaryTab';
import ReaderTab from '../components/documents/summary/ReaderTab';
import GraphTab from '../components/documents/summary/GraphTab';
import SummarySidebar from '../components/documents/summary/SummarySidebar';
import EditMetadataModal from '../components/documents/summary/EditMetadataModal';
import ArchiveModal from '../components/documents/summary/ArchiveModal';
import DeleteModal from '../components/documents/summary/DeleteModal';
import { DocToastHost, showDocToast } from '../components/documents/shared/DocToast';

function DocumentSummaryPage() {
  const navigate = useNavigate();
  const { activeRole } = useContext(AuthContext);
  const adminMode = activeRole === 'Admin';

  const [searchParams] = useSearchParams();
  const id = searchParams.get('id'); // /documents/summary?id=doc-7

  const [baseDoc, setDoc] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [tab, setTab] = useState('summary');
  const [readerPage, setReaderPage] = useState(1);
  const [editing, setEditing] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const showToast = showDocToast; // (message, variant)

  // Pin / bookmark live in the shared documents store, so the Documents list
  // and this page always agree (and survive switching role).
  const { items, toggleFlag } = useRoleDocuments();
  const live = baseDoc ? items.find((item) => item.id === baseDoc.id) : null;
  const saved = Boolean(live ? live.isBookmarked : baseDoc?.isBookmarked);
  const pinned = Boolean(live ? live.isPinned : baseDoc?.isPinned);
  const archived = Boolean(live ? live.isArchived : baseDoc?.archived);

  // Page data + edits / re-index made anywhere (list or here)
  const doc = useMemo(() => {
    if (!baseDoc) return null;
    return {
      ...baseDoc,
      ...(live?.edited
        ? {
            title: live.title,
            category: live.category,
            author: live.author,
            executiveSummary: live.description,
          }
        : {}),
      ...(live?.reindexedNow ? { uploaded: 'Just now (Re-indexed)' } : {}),
    };
  }, [baseDoc, live]);

  // Make sure the shared list is loaded even when this page is opened directly
  useEffect(() => {
    loadDocuments();
  }, []);

  useEffect(() => {
    let alive = true; // ignore a late response after navigating away

    // A different document opens on the first tab, like a fresh page
    setTab('summary');
    setReaderPage(1);
    setNotFound(false);

    getDocumentSummary(id).then((data) => {
      if (!alive) return;
      if (!data) {
        setDoc(null);
        setNotFound(true);
        return;
      }
      setDoc(data);
    });
    return () => {
      alive = false;
    };
  }, [id]);

  // "Read Full Page N" → open the reader at that page
  const openReader = (page) => {
    setReaderPage(page);
    setTab('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Entity tag → Semantic Search with that term (video: "90 Days Travel")
  const searchTag = (tag) => navigate(`/semantic-search?q=${encodeURIComponent(tag)}`);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast('Copied document link to clipboard');
    } catch {
      showToast('Could not copy the link', 'neutral');
    }
  };

  const togglePin = () => {
    const next = !pinned;
    toggleFlag(doc.id, 'isPinned');
    showToast(
      next ? `📌 Pinned "${doc.title}" for Employee Overview` : `Unpinned "${doc.title}"`,
      next ? 'success' : 'neutral',
    );
  };

  const toggleSave = () => {
    const next = !saved;
    toggleFlag(doc.id, 'isBookmarked');
    showToast(
      next ? `⭐ Saved "${doc.title}" to Bookmarks` : `Removed "${doc.title}" from Bookmarks`,
      next ? 'success' : 'neutral',
    );
  };

  // Confirm button of the Archive / Unarchive modal (video: back to the Documents list with a toast)
  const confirmArchive = async () => {
    const next = !archived;
    setArchiveOpen(false);
    setDocumentArchivedFlag(doc.id, next);
    await setDocumentArchived(doc.id, next);
    showDocToast(
      next
        ? `📦 Document "${doc.title}" archived`
        : `Document "${doc.title}" restored to active repository`,
      'neutral',
    );
    navigate('/documents');
  };

  // Video: Re-index sends you to the Documents list, where the toasts and Processing card show
  const reindex = () => {
    startReindex(doc);
    navigate('/documents');
  };

  const saveMetadata = (changes) => {
    setEditing(false);
    saveDocumentMetadata(doc, changes);
    navigate('/documents');
  };

  if (notFound) {
    return (
      <div className="mx-auto w-full max-w-[1100px] px-4 py-16 text-center sm:px-6">
        <h1 className="font-serif text-2xl font-black text-(--text-primary)">Document not found</h1>
        <p className="mt-2 text-sm text-(--text-muted)">
          This document doesn&apos;t exist or is no longer available.
        </p>
        <Link
          to="/documents"
          className="mt-6 inline-flex h-9 items-center rounded-full bg-(--primary) px-5 text-sm font-semibold text-(--primary-contrast) transition-colors hover:bg-(--primary-hover)"
        >
          ← Back to Documents
        </Link>
      </div>
    );
  }

  if (!doc) return null; // add a skeleton when real loading time exists

  return (
    <div className="w-full space-y-7 py-6">
      <SummaryHeader
        doc={doc}
        adminMode={adminMode}
        archived={archived}
        saved={saved}
        pinned={pinned}
        onCopyLink={copyLink}
        onToggleSave={toggleSave}
        onTogglePin={togglePin}
        onEdit={() => setEditing(true)}
        onReindex={reindex}
        onArchive={() => setArchiveOpen(true)}
        onDelete={() => setDeleteOpen(true)}
      />
      <SummaryTabs active={tab} onChange={setTab} />

      {/* Left column 1.85fr (970px) + right column 1fr (524px), 28px gap */}
      <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-[minmax(0,1.85fr)_minmax(0,1fr)]">
        {tab === 'summary' && (
          <AiSummaryTab doc={doc} onReadPage={openReader} onSearchTag={searchTag} />
        )}
        {tab === 'reader' && (
          <ReaderTab doc={doc} page={readerPage} onPageChange={setReaderPage} onToast={showToast} />
        )}
        {tab === 'graph' && (
          <GraphTab
            articles={doc.connectedArticles}
            sisters={doc.sisterDocuments}
            onOpenArticle={(a) => navigate('/knowledge-base', { state: { articleId: a.id } })}
            onOpenDocument={(d) => navigate(`/documents/summary?id=${d.id}`)}
          />
        )}

        <SummarySidebar
          doc={doc}
          telemetry={doc.telemetry}
          questions={doc.suggestedQuestions}
          adminMode={adminMode}
          archived={archived}
          onReindex={reindex}
          onToggleArchive={() => setArchiveOpen(true)}
          onAsk={(q) => navigate(`/ask-eka?q=${encodeURIComponent(q)}`)}
          related={doc.sisterDocuments}
          onOpenRelated={(d) => navigate(`/documents/summary?id=${d.id}`)}
        />
      </div>

      {editing && (
        <EditMetadataModal doc={doc} onClose={() => setEditing(false)} onSave={saveMetadata} />
      )}
      {archiveOpen && (
        <ArchiveModal
          title={doc.title}
          archived={archived}
          onClose={() => setArchiveOpen(false)}
          onConfirm={confirmArchive}
        />
      )}
      {deleteOpen && (
        <DeleteModal
          doc={doc}
          onClose={() => setDeleteOpen(false)}
          onConfirm={() => {
            deleteDocument(doc.id);
            showDocToast(`🗑 Document "${doc.title}" deleted`, 'neutral');
            navigate('/documents');
          }}
        />
      )}
      <DocToastHost />
    </div>
  );
}

export default DocumentSummaryPage;
