import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDocumentSummary } from '../components/documents/summary/summaryService';
import SummaryHeader from '../components/documents/summary/SummaryHeader';
import SummaryTabs from '../components/documents/summary/SummaryTabs';
import AiSummaryTab from '../components/documents/summary/AiSummaryTab';
import SummarySidebar from '../components/documents/summary/SummarySidebar';
import SummaryToast from '../components/documents/summary/SummaryToast';

function DocumentSummaryPage() {
  const { id } = useParams();
  const [doc, setDoc] = useState(null);
  const [tab, setTab] = useState('summary');
  const [toast, setToast] = useState('');
  const closeToast = useCallback(() => setToast(''), []);

  useEffect(() => {
    let alive = true; // ignore a late response after navigating away
    getDocumentSummary(id).then((data) => alive && setDoc(data));
    return () => { alive = false; };
  }, [id]);

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
        {/* Reader and graph tabs are added in the next steps */}
        {tab === 'summary' ? <AiSummaryTab doc={doc} /> : <div />}
        <SummarySidebar telemetry={doc.telemetry} questions={doc.suggestedQuestions} />
      </div>

      <SummaryToast message={toast} onClose={closeToast} />
    </div>
  );
}

export default DocumentSummaryPage;