import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext.jsx';
import {
  getDocumentSummary,
  setDocumentArchived,
  reindexDocument,
} from '../components/documents/summary/summaryService';
import {
  loadDocuments,
  toggleDocumentFlag,
  useDocuments,
} from '../components/documents/shared/documentResults.js';
import SummaryHeader from '../components/documents/summary/SummaryHeader';
import SummaryTabs from '../components/documents/summary/SummaryTabs';
import AiSummaryTab from '../components/documents/summary/AiSummaryTab';
import ReaderTab from '../components/documents/summary/ReaderTab';
import GraphTab from '../components/documents/summary/GraphTab';
import SummarySidebar from '../components/documents/summary/SummarySidebar';
import EditMetadataModal from '../components/documents/summary/EditMetadataModal';
import ArchiveModal from '../components/documents/summary/ArchiveModal';
import { DocToastHost, showDocToast } from '../components/documents/shared/DocToast';


function DocumentSummaryPage() {
  const navigate = useNavigate();
  const { activeRole } = useContext(AuthContext);
  const adminMode = activeRole === 'Admin';

  const [searchParams] = useSearchParams();
  const id = searchParams.get('id'); // /documents/summary?id=doc-7

  const [doc, setDoc] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [tab, setTab] = useState('summary');
  const [readerPage, setReaderPage] = useState(1);
  const [editing, setEditing] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [archived, setArchived] = useState(false);

  const showToast = showDocToast; // (message, variant)
  // Pin / bookmark live in the shared documents store, so the Documents list
  // and this page always agree (and survive switching role).
  const { items } = useDocuments();
  const live = doc ? items.find((item) => item.id === doc.id) : null;
  const saved = Boolean(live ? live.isBookmarked : doc?.isBookmarked);
  const pinned = Boolean(live ? live.isPinned : doc?.isPinned);

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
      setArchived(Boolean(data.archived));
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
    toggleDocumentFlag(doc.id, 'isPinned');
    showToast(
      next ? `📌 Pinned "${doc.title}" for Employee Overview` : `Unpinned "${doc.title}"`,
      next ? 'success' : 'neutral',
    );
  };
   const toggleSave = () => {
    const next = !saved;
    toggleDocumentFlag(doc.id, 'isBookmarked');
    showToast(
      next ? `⭐ Saved "${doc.title}" to Bookmarks` : `Removed "${doc.title}" from Bookmarks`,
      next ? 'success' : 'neutral',
    );
  };

  // Confirm button of the Archive / Unarchive modal (video: back to the Documents list with a toast)
  const confirmArchive = async () => {
    const next = !archived;
    setArchiveOpen(false);
    setArchived(next);
    await setDocumentArchived(doc.id, next);
    showDocToast(
      next
        ? `📦 Document "${doc.title}" archived`
        : `Document "${doc.title}" restored to active repository`,
      'neutral',
    );
    navigate('/documents');
  };

  const reindex = async () => {
    await reindexDocument(doc.id);
    showToast(`✓ Successfully re-indexed vector embeddings for "${doc.title}"`);
  };

  const saveMetadata = async (changes) => {
    const { file, ...fields } = changes;
    await updateDocumentMetadata(doc.id, changes);
    setDoc((d) => ({ ...d, ...fields }));
    setEditing(false);
    showToast(`✓ Successfully re-indexed vector embeddings for "${fields.title}"`);
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
    <div className="mx-auto w-full max-w-[1100px] space-y-6 px-4 py-6 sm:px-6">
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
      />
      <SummaryTabs active={tab} onChange={setTab} />

      <div className="grid grid-cols-1 gap-9 lg:grid-cols-[minmax(0,1fr)_21rem]">
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
          telemetry={doc.telemetry}
          questions={doc.suggestedQuestions}
          adminMode={adminMode}
          archived={archived}
          onReindex={reindex}
          onToggleArchive={() => setArchiveOpen(true)}
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
      <DocToastHost />
    </div>
  );
}

export default DocumentSummaryPage;