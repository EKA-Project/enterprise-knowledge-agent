import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
// EKA-EDIT: data now comes from getCollection (one request builds the whole modal)
import { getCollection } from '../../../services/departmentService.js';
import { getDepartmentTheme } from '../../../config/departmentTheme.js';
import { formatFileSize } from '../../../utils/formatFileSize.js';
import { formatRelativeTime } from '../../../utils/formatRelativeTime.js'; // CHECK: export name
import Modal from '../../common/Modal.jsx';
import CollectionSourceFiles from './CollectionSourceFiles.jsx';
import CollectionKeywords from './CollectionKeywords.jsx';
import CollectionPrompts from './CollectionPrompts.jsx';

// Collection Insights modal — opened from the "Collection Insights" pill on a
// category card. Uses the common Modal (header/footer fixed, body scrolls).
function CollectionInsightsModal({ category, onClose }) {
  // EKA-EDIT: fetch the collection and map it to the shapes the child lists already expect
  const { id, title, colorKey, iconKey } = category;
  const theme = getDepartmentTheme(colorKey, iconKey);
  const [data, setData] = useState(null);
  useEffect(() => {
    let alive = true;
    getCollection(id, { limit: 50 }).then((r) => alive && setData(r));
    return () => { alive = false; };
  }, [id]);

  const sourceFiles = data?.documents.items.map(({ document: d, uploader, topTakeaways }) => ({
    id: d.id, title: d.title, format: String(d.format).toUpperCase(),
    size: formatFileSize(d.sizeBytes), chunks: d.chunkCount,
    author: d.authorName ?? uploader?.name ?? '—',
    description: d.description, notes: topTakeaways,
  }));
  const keywords = data?.keywords.map((k) => ({ term: k.term, score: Number(k.weight.toFixed(2)) }));
  const prompts = data?.samplePrompts;
  const insights = data && {
    domainLead: data.lead?.name,
    updatedLabel: data.insight?.generatedAt ? `Updated ${formatRelativeTime(data.insight.generatedAt)}` : '',
    overview: data.overview,
  };
  const docCount = data?.activeDocumentCount ?? category.documentCount;
  const documentCategory = title;

  return (
    <Modal
      onClose={onClose}
      size="lg"
      compact
      headerClassName="bg-(--bg-surface) items-start!"
      icon={
        // EKA-EDIT: inline department colours
        <span
          style={{ color: theme.color, background: theme.softBg }}
          className="flex h-10 w-10 items-center justify-center rounded-xl"
        >
          <Zap size={16} />
        </span>
      }
      eyebrow={
        <>
          <span className="kb-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-(--primary)">
            Collection Insights
          </span>
          <span className="rounded-full bg-(--status-success-bg) px-2 py-0.5 text-[9px] font-semibold uppercase text-(--status-success)">
            Live Repository
          </span>
        </>
      }
      title={<span className="kb-serif text-lg sm:text-xl">{title} — Collection Insights</span>}
      subtitle={
        <>
          {docCount} Active Documents
          {insights?.domainLead && ` • Domain Lead: ${insights.domainLead}`}
        </>
      }
      footer={
        <div className="flex flex-wrap items-center justify-end gap-9 py-1">
          <Link
            to={`/documents?category=${encodeURIComponent(documentCategory)}`}
            className="cursor-pointer rounded-full bg-(--primary) px-4 py-2 text-xs font-semibold text-(--primary-contrast) hover:bg-(--primary-hover)"
          >
            Browse Documents →
          </Link>
        </div>
      }
    >
      <div className="space-y-5 py-1">
        {/* Collection overview */}
        <section className="rounded-2xl border-l-[3px] border-l-(--accent-highlight) bg-(--bg-surface-subtle) p-4">
          <div className="flex items-center justify-between">
            <span className="kb-mono text-[10px] uppercase tracking-[0.12em] text-(--text-secondary)">
              Collection Overview
            </span>
            <span className="kb-mono text-[10px] text-(--text-muted)">
              {insights?.updatedLabel}
            </span>
          </div>
          <p className="mt-2 text-[13px] leading-relaxed text-(--text-primary)">
            {insights?.overview ?? 'No overview available yet.'}
          </p>
        </section>

        {sourceFiles && <CollectionSourceFiles files={sourceFiles} />}
        {keywords && <CollectionKeywords keywords={keywords} />}
        {prompts && <CollectionPrompts prompts={prompts} />}
      </div>
    </Modal>
  );
}

export default CollectionInsightsModal;