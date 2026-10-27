import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Zap } from 'lucide-react';
import PageHero from '../components/common/PageHero.jsx';
import CapacityCard from '../components/documents/storage/CapacityCard.jsx';
import AllocationCards from '../components/documents/storage/AllocationCards.jsx';
import FreeUpCard from '../components/documents/storage/FreeUpCard.jsx';
import RecycleBinSection from '../components/documents/storage/RecycleBinSection.jsx';
import BulkActionBar from '../components/documents/storage/BulkActionBar.jsx';
import FileActionModal from '../components/documents/storage/FileActionModal.jsx';
import TwoFactorModal from '../components/documents/storage/TwoFactorModal.jsx';
import { storageFiles, storageSummary } from '../components/documents/storage/StorageData.js';
import { DocToastHost, showDocToast } from '../components/documents/shared/DocToast';
import '../styles/Document.css';

const BIN_SEED = storageFiles.filter((f) => f.startsInBin).map((f) => f.id);
const mb = (x) => `${Number(x.toFixed(1))} MB`; // 21 -> "21 MB"

// Three chips under the hero text: Export Storage Audit / Free Up Space / Back to Documents.
function HeroChips({ reclaimMb, onExport, onFreeUp }) {
  const base = 'inline-flex h-10 cursor-pointer items-center gap-2.5 rounded-full border pl-2 pr-4 text-[13px] font-semibold transition-colors';
  return (
    <div className="mt-6 flex flex-wrap items-center gap-3.5">
      <button type="button" onClick={onExport} className={`${base} border-[#d6e6f2] bg-white text-[#10283f] hover:bg-[#e1f0fa]`}>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e8f1f8] text-[#44596a]">
          <Download size={12} />
        </span>
        Export Storage Audit
      </button>
      <button type="button" onClick={onFreeUp} className={`${base} border-[#f6d9a8] bg-[#fff6e6] text-[#9a5a00] hover:bg-[#ffefd0]`}>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ffe3b8] text-[#e8801a]">
          <Zap size={12} className="fill-current" />
        </span>
        Free Up Space
        <span className="doc-mono rounded-full bg-[#f59f0c] px-2.5 py-0.5 text-[10.5px] font-bold text-white">{reclaimMb.toFixed(1)} MB</span>
      </button>
      <Link to="/documents" className={`${base} border-[#d6e6f2] bg-white text-[#10283f] hover:bg-[#e1f0fa]`}>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e8f1f8] text-[#1f718e]">
          <ArrowLeft size={12} />
        </span>
        Back to Documents
      </Link>
    </div>
  );
}

// Admin-only Storage Management page (route: /documents/storage).
function StorageManagementPage() {
  const [mode, setMode] = useState('dept'); // 'dept' | 'format' (capacity toggle)
  const [activeKey, setActiveKey] = useState('ALL'); // selected card = filter for the table
  const [hoveredKey, setHoveredKey] = useState(null);
  const [selected, setSelected] = useState(() => new Set());
  const [bin, setBin] = useState(BIN_SEED); // recycle bin ids, newest first
  const [purged, setPurged] = useState(() => new Set());
  const [restored, setRestored] = useState(() => new Set());
  const [confirm, setConfirm] = useState(null); // { kind: 'recycle' | 'purge', ids, from: 'table' | 'bin' | 'empty' }
  const [glow, setGlow] = useState(false);

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
  const selectedMb = selectedFiles.reduce((s, f) => s + f.sizeMb, 0);

  // Capacity numbers follow the actions
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

  const changeMode = (m) => {
    setMode(m);
    setActiveKey('ALL');
  };

  const goFreeUp = () => {
    document.getElementById('free-up-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setGlow(true);
    setTimeout(() => setGlow(false), 1600);
  };

  const finish = () => {
    setSelected(new Set());
    setConfirm(null);
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
      if (confirm.from === 'bin') {
        showDocToast(`✓ Two-Factor Verified: Permanently deleted "${files[0].name}" from Recycle Bin.`, 'success');
      } else if (confirm.from === 'empty') {
        showDocToast('🗑 Documents & staged data recycled into containment!', 'neutral');
        showDocToast(`✓ Emptied Recycle Bin (${n} files, ${size.toFixed(1)} MB purged permanently).`, 'success');
      } else {
        showDocToast(`✓ Permanently purged ${n} files. ${mb(size)} freed.`, 'success'); // "1 files" like the video
      }
    }
    finish();
  };

  const restore = (f) => {
    setBin((prev) => prev.filter((id) => id !== f.id));
    setRestored((prev) => new Set([...prev, f.id]));
    showDocToast(`✓ Restored "${f.name}" from Recycle Bin to active library`, 'success');
  };

  const confirmFiles = confirm ? confirm.ids.map((id) => byId.get(id)) : [];
  const use2fa = confirm && confirm.kind === 'purge' && confirm.from === 'bin';

  return (
    // 28px between cards, content starts at x=346 (1520px wide), like the video
    <div className="w-full space-y-7 pb-24 pt-[0px]">
      <div className="[&_h1]:text-[35px] [&_h1]:leading-[1.1] [&_p:first-of-type]:text-[#7c949a] [&_p:last-of-type]:mt-2 [&_p:last-of-type]:max-w-[870px] [&_p:last-of-type]:text-[14px] [&_p:last-of-type]:font-light [&_p:last-of-type]:leading-[30px]">
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
        />
        <HeroChips
          reclaimMb={largeReclaim}
          onExport={() => showDocToast('📄 Storage audit exported', 'neutral')}
          onFreeUp={goFreeUp}
        />
      </div>

      <CapacityCard summary={summary} mode={mode} onModeChange={changeMode} hoveredKey={hoveredKey} onHover={setHoveredKey} />
      <AllocationCards
        mode={mode}
        active={activeKey}
        hoveredKey={hoveredKey}
        usedGb={(usedMb / 1000).toFixed(1)}
        documents={summary.documents}
        onSelect={setActiveKey}
        onHover={setHoveredKey}
      />

      <FreeUpCard
        files={activeFiles}
        filter={{ mode, key: activeKey }}
        onClearFilter={() => setActiveKey('ALL')}
        selected={selected}
        onSelectedChange={setSelected}
        onSweep={() => showDocToast('✨ Swept 0s and 1s out of storage!', 'neutral')}
        onToast={(m) => showDocToast(m, 'neutral')}
        glow={glow}
      />

      <RecycleBinSection
        items={binFiles}
        onRestore={restore}
        onPurge={(f) => setConfirm({ kind: 'purge', ids: [f.id], from: 'bin' })}
        onEmpty={() => setConfirm({ kind: 'purge', ids: [...bin], from: 'empty' })}
      />

      <BulkActionBar
        count={selectedFiles.length}
        reclaimMb={selectedMb}
        onRecycle={() => setConfirm({ kind: 'recycle', ids: selectedFiles.map((f) => f.id), from: 'table' })}
        onPurge={() => setConfirm({ kind: 'purge', ids: selectedFiles.map((f) => f.id), from: 'table' })}
        onDisarm={() => setSelected(new Set())}
      />

      {confirm && use2fa && (
        <TwoFactorModal file={confirmFiles[0]} onClose={() => setConfirm(null)} onVerified={runConfirm} />
      )}
      {confirm && !use2fa && (
        <FileActionModal variant={confirm.kind} files={confirmFiles} onClose={() => setConfirm(null)} onConfirm={runConfirm} />
      )}
      <DocToastHost />
    </div>
  );
}

export default StorageManagementPage;


