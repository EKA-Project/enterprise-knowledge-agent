import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, HardDrive } from 'lucide-react';
import PageHero from '../components/common/PageHero.jsx';
import CapacityCard from '../components/documents/storage/CapacityCard.jsx';
import FormatCards from '../components/documents/storage/FormatCards.jsx';
import FreeUpCard from '../components/documents/storage/FreeUpCard.jsx';
import RecycleBinSection from '../components/documents/storage/RecycleBinSection.jsx';
import BulkActionBar from '../components/documents/storage/BulkActionBar.jsx';
import FileActionModal from '../components/documents/storage/FileActionModal.jsx';
import { storageFiles, storageSummary } from '../components/documents/storage/StorageData.js';
import { DocToastHost, showDocToast } from '../components/documents/shared/DocToast';
import '../styles/Document.css';

const BIN_SEED = storageFiles.filter((f) => f.startsInBin).map((f) => f.id);
const mb = (x) => `${Number(x.toFixed(1))} MB`; // 21 -> "21 MB"

// Right side of the hero: cluster chip + back button.
function HeroActions() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-3 rounded-2xl border border-[#e3f1f9] bg-white px-4 py-[13px] shadow-(--shadow-sm)">
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
  const [activeFormat, setActiveFormat] = useState('ALL'); // format card that filters the table
  const [hoveredKey, setHoveredKey] = useState(null); // bar / legend / card hover link
  const [selected, setSelected] = useState(() => new Set()); // ticked ids
  const [bin, setBin] = useState(BIN_SEED); // recycle bin ids, newest first
  const [purged, setPurged] = useState(() => new Set());
  const [restored, setRestored] = useState(() => new Set());
  const [confirm, setConfirm] = useState(null); // { kind: 'recycle' | 'purge', ids, from: 'table' | 'bin' | 'empty' }

  // Restored files come back as "Restored just now"
  const all = useMemo(
    () =>
      storageFiles.map((f) =>
        restored.has(f.id) ? { ...f, opened: 'Restored just now', cited: 'Just now', idleDays: 0, status: 'Ready' } : f,
      ),
    [restored],
  );
  const byId = useMemo(() => new Map(all.map((f) => [f.id, f])), [all]);
  const isActive = (f) => !bin.includes(f.id) && !purged.has(f.id);

  const activeFiles = all.filter(isActive);
  const binFiles = bin.map((id) => byId.get(id));
  const selectedFiles = activeFiles.filter((f) => selected.has(f.id));
  const reclaimMb = selectedFiles.reduce((s, f) => s + f.sizeMb, 0);

  // Capacity card numbers follow the actions (14.3 -> 14.2 after a purge, like the video)
  let usedMb = storageSummary.usedGb * 1000;
  all.forEach((f) => {
    const on = isActive(f);
    if (!f.startsInBin && !on) usedMb -= f.sizeMb;
    if (f.startsInBin && on) usedMb += f.sizeMb;
  });
  const largeReclaim = activeFiles.filter((f) => f.sizeMb > 10 && !f.isProtected).reduce((s, f) => s + f.sizeMb, 0);
  const summary = {
    usedMb,
    documents: storageSummary.documents - all.filter((f) => !f.startsInBin && purged.has(f.id)).length,
    reclaimableGb: (largeReclaim / 1000).toFixed(1),
    softDeleted: bin.length,
  };

  const runConfirm = () => {
    const files = confirm.ids.map((id) => byId.get(id));
    const n = files.length;
    const size = files.reduce((s, f) => s + f.sizeMb, 0);

    if (confirm.kind === 'recycle') {
      setBin((prev) => [...confirm.ids, ...prev]);
      showDocToast(`✓ Moved ${n} ${n === 1 ? 'file' : 'files'} to Recycle Bin. ${mb(size)} freed.`, 'success');
    } else {
      setPurged((prev) => new Set([...prev, ...confirm.ids]));
      setBin((prev) => prev.filter((id) => !confirm.ids.includes(id)));
      if (confirm.from === 'empty') {
        showDocToast('🗑 Documents & staged data recycled into containment!', 'neutral');
        showDocToast(`✓ Emptied Recycle Bin (${n} files, ${size.toFixed(1)} MB purged permanently).`, 'success');
      } else {
        showDocToast(`✓ Permanently purged ${n} files. ${mb(size)} freed.`, 'success'); // "1 files" like the video
      }
    }
    setSelected(new Set());
    setConfirm(null);
  };

  const restore = (f) => {
    setBin((prev) => prev.filter((id) => id !== f.id));
    setRestored((prev) => new Set([...prev, f.id]));
    showDocToast(`✓ Restored "${f.name}" from Recycle Bin to active library`, 'success');
  };

  const confirmFiles = confirm ? confirm.ids.map((id) => byId.get(id)) : [];

  return (
    // No side padding: content starts at the same x as the Summary page (1520px wide)
    <div className="w-full space-y-6 pb-24 pt-[33px]">
      {/* Common PageHero on the page background; only sizes are overridden here */}
      <div className="[&_h1]:text-[48px] [&_h1]:leading-[1.1] [&_p:first-of-type]:text-[#7c949a] [&_p:last-of-type]:mt-2 [&_p:last-of-type]:max-w-[900px] [&_p:last-of-type]:text-[17px] [&_p:last-of-type]:font-light [&_p:last-of-type]:leading-[30px]">
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

      <CapacityCard summary={summary} hoveredKey={hoveredKey} onHover={setHoveredKey} />
      <FormatCards active={activeFormat} hoveredKey={hoveredKey} onSelect={setActiveFormat} onHover={setHoveredKey} />

      <FreeUpCard
        files={activeFiles}
        activeFormat={activeFormat}
        onClearFormat={() => setActiveFormat('ALL')}
        selected={selected}
        onSelectedChange={setSelected}
        onSweep={() => showDocToast('✨ Swept 0s and 1s out of storage!', 'neutral')}
        onToast={(m) => showDocToast(m, 'neutral')}
      />

      <RecycleBinSection
        items={binFiles}
        onRestore={restore}
        onPurge={(f) => setConfirm({ kind: 'purge', ids: [f.id], from: 'bin' })}
        onEmpty={() => setConfirm({ kind: 'purge', ids: [...bin], from: 'empty' })}
      />

      <BulkActionBar
        count={selectedFiles.length}
        reclaimMb={reclaimMb}
        onRecycle={() => setConfirm({ kind: 'recycle', ids: selectedFiles.map((f) => f.id), from: 'table' })}
        onPurge={() => setConfirm({ kind: 'purge', ids: selectedFiles.map((f) => f.id), from: 'table' })}
        onDisarm={() => setSelected(new Set())}
      />

      {confirm && (
        <FileActionModal
          variant={confirm.kind}
          files={confirmFiles}
          onClose={() => setConfirm(null)}
          onConfirm={runConfirm}
        />
      )}
      <DocToastHost />
    </div>
  );
}







export default StorageManagementPage;