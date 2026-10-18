import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getDocumentSummary } from '../components/documents/summary/summaryService';
import SummaryHeader from '../components/documents/summary/SummaryHeader';
import SummaryTabs from '../components/documents/summary/SummaryTabs';
import AiSummaryTab from '../components/documents/summary/AiSummaryTab';
import ReaderTab from '../components/documents/summary/ReaderTab';
import SummarySidebar from '../components/documents/summary/SummarySidebar';
import SummaryToast from '../components/documents/summary/SummaryToast';
import GraphTab from '../components/documents/summary/GraphTab';

function DocumentSummaryPage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id'); // /documents/summary?id=3
  const navigate = useNavigate();
  const [doc, setDoc] = useState(null);
  const [tab, setTab] = useState('summary');
  const [readerPage, setReaderPage] = useState(1);
  const [toast, setToast] = useState('');
  const closeToast = useCallback(() => setToast(''), []);

  useEffect(() => {
    let alive = true; // ignore a late response after navigating away
    getDocumentSummary(id).then((data) => alive && setDoc(data));
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

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setToast('Copied document link to clipboard');
    } catch {
      setToast('Could not copy the link');
    }
  };

  if (!doc) return null; // add a skeleton when real loading time exists

  return (
    <div className="mx-auto w-full max-w-[1100px] space-y-6 px-4 py-6 sm:px-6">
      <SummaryHeader doc={doc} onCopyLink={copyLink} />
      <SummaryTabs active={tab} onChange={setTab} />

      <div className="grid grid-cols-1 gap-9 lg:grid-cols-[minmax(0,1fr)_21rem]">
        {tab === 'summary' && <AiSummaryTab doc={doc} onReadPage={openReader} />}
        {tab === 'reader' && (
          <ReaderTab doc={doc} page={readerPage} onPageChange={setReaderPage} onToast={setToast} />
        )}
        {tab === 'graph' && (
          <GraphTab
            articles={doc.connectedArticles}
            sisters={doc.sisterDocuments}
            // KB article page is a separate module; passes the id for it to pick up
            onOpenArticle={(a) => navigate('/knowledge-base', { state: { articleId: a.id } })}
            onOpenDocument={(d) => navigate(`/documents/summary?id=${d.id}`)}
          />
        )}

        <SummarySidebar telemetry={doc.telemetry} questions={doc.suggestedQuestions} />
      </div>

      <SummaryToast message={toast} onClose={closeToast} />
    </div>
  );
}

export default DocumentSummaryPage;