// EKA-EDIT: page now uses useStorageData + storageService only. No StorageData, no local bin/purged/restored state.
import { useCallback, useState } from 'react';
import { Zap } from 'lucide-react';
import { ExportAuditButton } from '../components/common/ActionButtons.jsx';
import PageHero from '../components/common/PageHero.jsx';
import pageMetadata from '../config/pageMetadata.js';
import CapacityCard from '../components/documents/storage/CapacityCard.jsx';
import AllocationCards from '../components/documents/storage/AllocationCards.jsx';
import FreeUpCard from '../components/documents/storage/FreeUpCard.jsx';
import RecycleBinSection from '../components/documents/storage/RecycleBinSection.jsx';
import BulkActionBar from '../components/documents/storage/BulkActionBar.jsx';
import FileActionModal from '../components/documents/storage/FileActionModal.jsx';
import TwoFactorModal from '../components/documents/storage/TwoFactorModal.jsx';
import { useStorageData } from '../components/documents/storage/useStorageData.js';
import { exportStorageAudit } from '../services/storageService.js';
import { formatFileSize } from '../utils/formatFileSize.js';
import { useToast } from '../context/ToastContext.jsx';
import '../styles/Document.css';

const plural = (n) => `${n} ${n === 1 ? 'file' : 'files'}`;
const sizeOf = (docs) => docs.reduce((s, d) => s + d.sizeBytes, 0);

// Two chips under the hero text: Export Storage Audit / Free Up Space.
function HeroChips({ reclaimBytes, onExport, onFreeUp }) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-3.5">
      <ExportAuditButton onClick={onExport} />

      <button
        type="button"
        onClick={onFreeUp}
        className="group inline-flex h-8 cursor-pointer items-center gap-2 rounded-(--radius-pill) border-[1.5px] border-[rgba(245,158,11,0.35)] bg-[rgba(245,158,11,0.08)] pl-2 pr-3 text-[11px] font-semibold text-[#b45309] shadow-(--shadow-sm) [transition:all_var(--transition-fast)] hover:-translate-y-px hover:border-[#f59e0b] hover:bg-[rgba(245,158,11,0.14)] hover:text-[#92400e] hover:shadow-[0_3px_10px_rgba(245,158,11,0.2)] active:translate-y-[0.5px] active:scale-[0.98]"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[rgba(245,158,11,0.18)] text-[#d97706] [transition:all_var(--transition-fast)] group-hover:-translate-y-px group-hover:scale-[1.08] group-hover:bg-[#f59e0b] group-hover:text-white">
          <Zap size={12} className="fill-current" />
        </span>
        Free Up Space
        <span className="rounded-(--radius-pill) bg-[#f59e0b] px-2.5 py-0.5 font-(family-name:--font-mono) text-[0.7rem] font-bold text-white">
          {formatFileSize(reclaimBytes)}
        </span>
      </button>
    </div>
  );
}

// Admin-only Storage Management page (route: /documents/storage, guarded by RoleGuard).
function StorageManagementPage() {
  const toast = useToast();
  const { success, info } = toast;
  const warn = toast.error ?? toast.info; // EKA-EDIT: use error toast if ToastContext has one

  const hero = pageMetadata.documentStorage;
  const {
    summary, departmentsById, bin, loading, error, version, archive, purge, restore,
  } = useStorageData();

  const [mode, setMode] = useState('dept'); // 'dept' | 'format'
  const [activeKey, setActiveKey] = useState('ALL'); // departmentId | format enum | 'ALL'
  const [hoveredKey, setHoveredKey] = useState(null);
  const [selected, setSelected] = useState(() => new Map()); // id -> document
  const [confirm, setConfirm] = useState(null); // { kind: 'recycle' | 'purge', files, from: 'table' | 'bin' | 'empty' }
  const [glow, setGlow] = useState(false);

  const selectedFiles = [...selected.values()];
  const selectedBytes = sizeOf(selectedFiles.filter((f) => !f.isProtected));

  const changeMode = (m) => {
    setMode(m);
    setActiveKey('ALL');
  };

  const goFreeUp = () => {
    document.getElementById('free-up-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setGlow(true);
    setTimeout(() => setGlow(false), 1600);
  };

  // EKA-EDIT: real CSV download (blueprint-external, GET /storage/audit/export later)
  const handleExport = async () => {
    try {
      const { fileName, mimeType, content } = await exportStorageAudit();
      const url = URL.createObjectURL(new Blob([content], { type: mimeType }));
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
      success(`✓ Storage audit exported (${fileName})`);
    } catch (e) {
      warn(e.message);
    }
  };

  // EKA-EDIT: stable so TwoFactorModal's effect does not reload the number on every render
  const closeConfirm = useCallback(() => setConfirm(null), []);

  // Toast for a bulk result: success part + first failure message
  const report = (result, files, verb) => {
    const done = files.filter((f) => result.succeeded.includes(f.id));
    if (done.length) success(`✓ ${verb} ${plural(done.length)}. ${formatFileSize(sizeOf(done))} freed.`);
    if (result.failed.length) warn(result.failed[0].message);
  };

  const runConfirm = async (verificationToken) => {
    const { kind, files, from } = confirm;
    const ids = files.map((f) => f.id);
    try {
      if (kind === 'recycle') {
        report(await archive(ids), files, 'Moved');
      } else {
        const result = await purge(ids, verificationToken ? { verificationToken } : undefined);
        if (from === 'bin' && result.succeeded.length) {
          success(`✓ Two-Factor Verified: Permanently deleted "${files[0].title}" from Recycle Bin.`);
        } else if (from === 'empty' && result.succeeded.length) {
          info('🗑 Documents & staged data recycled into containment!');
          report(result, files, 'Emptied Recycle Bin:');
        } else {
          report(result, files, 'Permanently purged');
        }
        if (result.failed.length && (from === 'bin' || !result.succeeded.length)) warn(result.failed[0].message);
      }
    } catch (e) {
      warn(e.message);
    }
    setSelected(new Map());
    setConfirm(null);
  };

  const handleRestore = async (f) => {
    try {
      await restore(f.id);
      success(`✓ Restored "${f.title}" from Recycle Bin to active library`);
    } catch (e) {
      warn(e.message);
    }
  };

  const use2fa = confirm?.kind === 'purge' && confirm.from === 'bin';

  if (error) {
    return <p className="py-14 text-center text-(--text-muted)">Could not load storage data: {error.message}</p>;
  }

  return (
    <div className="w-full space-y-5 pb-24 pt-[0px]">
      <div className="[&>h1]:text-[34px] [&>h1]:leading-[0.5] [&>p:first-of-type]:text-[#7c949a] [&>p:last-of-type]:mt-4 [&>p:last-of-type]:max-w-[650px] [&>p:last-of-type]:text-[12px] [&>p:last-of-type]:font-light [&>p:last-of-type]:leading-[20px]">
        <PageHero eyebrow="Storage Management" title={hero.title} description={hero.description} />
        <HeroChips reclaimBytes={summary?.reclaimableBytes ?? 0} onExport={handleExport} onFreeUp={goFreeUp} />
      </div>

      {loading || !summary ? (
        <p className="py-14 text-center text-(--text-muted)">Loading storage data…</p>
      ) : (
        <>
          <CapacityCard
            summary={summary}
            departmentsById={departmentsById}
            mode={mode}
            onModeChange={changeMode}
            hoveredKey={hoveredKey}
            onHover={setHoveredKey}
          />

          <AllocationCards
            summary={summary}
            departmentsById={departmentsById}
            mode={mode}
            active={activeKey}
            hoveredKey={hoveredKey}
            onSelect={setActiveKey}
            onHover={setHoveredKey}
          />

          <FreeUpCard
            departmentsById={departmentsById}
            filter={{ mode, key: activeKey }}
            onClearFilter={() => setActiveKey('ALL')}
            selected={selected}
            onSelectedChange={setSelected}
            onSweep={() => info('✨ Swept 0s and 1s out of storage!')}
            onToast={(m) => info(m)}
            glow={glow}
            version={version}
          />

          <RecycleBinSection
            items={bin}
            departmentsById={departmentsById}
            onRestore={handleRestore}
            onPurge={(f) => setConfirm({ kind: 'purge', files: [f], from: 'bin' })}
            onEmpty={() => setConfirm({ kind: 'purge', files: [...bin], from: 'empty' })}
          />
        </>
      )}

      <BulkActionBar
        count={selectedFiles.length}
        reclaimBytes={selectedBytes}
        onRecycle={() => setConfirm({ kind: 'recycle', files: selectedFiles, from: 'table' })}
        onPurge={() => setConfirm({ kind: 'purge', files: selectedFiles, from: 'table' })}
        onDisarm={() => setSelected(new Map())}
      />

      {confirm && use2fa && (
        <TwoFactorModal
          file={confirm.files[0]}
          departmentName={departmentsById.get(confirm.files[0].departmentId)?.name}
          onClose={closeConfirm}
          onVerified={runConfirm}
        />
      )}

      {confirm && !use2fa && (
        <FileActionModal
          variant={confirm.kind}
          files={confirm.files}
          onClose={closeConfirm}
          onConfirm={() => runConfirm()}
        />
      )}
    </div>
  );
}

export default StorageManagementPage;