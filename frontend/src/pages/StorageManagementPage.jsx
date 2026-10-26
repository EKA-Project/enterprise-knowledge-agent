import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, HardDrive } from 'lucide-react';
import PageHero from '../components/common/PageHero.jsx';
import CapacityCard from '../components/documents/storage/CapacityCard.jsx';
import FormatCards from '../components/documents/storage/FormatCards.jsx';
import '../styles/Document.css';
import FreeUpCard from '../components/documents/storage/FreeUpCard.jsx';
import BulkActionBar from '../components/documents/storage/BulkActionBar.jsx';
import PurgeModal from '../components/documents/storage/PurgeModal.jsx';
import { storageFiles } from '../components/documents/storage/StorageData.js';
import { DocToastHost, showDocToast } from '../components/documents/shared/DocToast';


// Right side of the hero: cluster chip + back button.
// (spans, not <p>, so the hero's paragraph overrides below don't touch them)
function HeroActions() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-3 rounded-2xl border border-[#e3f1f9] bg-white px-4 py-[10px] shadow-(--shadow-sm)">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e1f0fa] text-[#1f718e]">
          <HardDrive size={16} />
        </span>
        <div>
          <span className="doc-mono flex items-center gap-2 text-[12px] font-bold uppercase text-[#10283f]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0f8f63]" />
            Primary Cluster
          </span>
          <span className="doc-mono mt-0.5 block text-[9px] uppercase tracking-wider text-[#7c949a]">
            AES-256 Encrypted Pool
          </span>
        </div>
      </div>

      <Link
        to="/documents"
        className="inline-flex h-[39px] items-center gap-2 rounded-full border border-[#cfe3f3] bg-white pl-1.5 pr-5 text-[13px] font-semibold text-[#10283f] transition-colors hover:bg-[#e1f0fa]"
      >
        <span className="flex h-[27px] w-[27px] items-center justify-center rounded-full bg-[#e1f0fa] text-[#1f718e]">
          <ArrowLeft size={13} />
        </span>
        Back to Documents
      </Link>
    </div>
  );
}


// Admin-only Storage Management page (route: /documents/storage).
function StorageManagementPage() {
  const [activeFormat, setActiveFormat] = useState('ALL'); // selected format card
  const [hoveredKey, setHoveredKey] = useState(null); // bar / legend / card hover link
  const [selected, setSelected] = useState(() => new Set()); // ids ticked in Free up space

  const [hidden, setHidden] = useState(() => new Set()); // recycled/purged ids (Step 6 will split these)
  const [purgeOpen, setPurgeOpen] = useState(false);

  const selectedFiles = Object.values(storageFiles).flat().filter((f) => selected.has(f.id));
  const reclaimMb = selectedFiles.reduce((sum, f) => sum + f.sizeMb, 0);
  const n = selectedFiles.length;

  const finish = (message) => {
    setHidden(new Set([...hidden, ...selected]));
    setSelected(new Set());
    setPurgeOpen(false);
    showDocToast(message, 'neutral');
  };
  return (
    // No side padding: content starts at the same x as the Summary page (1520px wide)
    <div className="w-full space-y-6 pb-6 pt-[0px]">
      {/* Common PageHero on the page background; only sizes are overridden here */}
      <div className="kb-hero-heading text-[2rem] sm:text-[2.5rem] font-bold leading-tight text-(--text-primary)">
        <PageHero
          bare
          eyebrow={
            <>
              <Link to="/documents" className="transition-colors hover:text-[#1f718e]">
                ← Documents
              </Link>
              <span className="mx-3">/</span>
              Storage Management
            </>
          }
          title="Know what's taking space."

          description="Enterprise document volume telemetry, format allocations, and intelligent reclamation suggestions to keep retrieval precision fast and lean."
          actions={<HeroActions />}
        />
      </div>

      <CapacityCard hoveredKey={hoveredKey} onHover={setHoveredKey} />
      <FormatCards
        active={activeFormat}
        hoveredKey={hoveredKey}
        onSelect={setActiveFormat}
        onHover={setHoveredKey}
      />

      <FreeUpCard selected={selected} onSelectedChange={setSelected} hiddenIds={hidden} />

      <BulkActionBar
        count={n}
        reclaimMb={reclaimMb}
        onRecycle={() => finish(`🗑 Moved ${n} ${n === 1 ? 'file' : 'files'} to Recycle Bin`)}
        onPurge={() => setPurgeOpen(true)}
        onDisarm={() => setSelected(new Set())}
      />
      {purgeOpen && (
        <PurgeModal
          count={n}
          sizeMb={reclaimMb}
          onClose={() => setPurgeOpen(false)}
          onConfirm={() => finish(`Permanently purged ${n} ${n === 1 ? 'file' : 'files'}`)}
        />
      )}
      <DocToastHost />

      {/* Step 6: Recycle Bin section */}
    </div>
  );
}

export default StorageManagementPage;