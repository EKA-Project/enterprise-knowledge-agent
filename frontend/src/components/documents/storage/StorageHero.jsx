
import { Link } from 'react-router-dom';
import { ArrowLeft, HardDrive } from 'lucide-react';
import '../../../styles/Document.css';

// Storage Management hero: breadcrumb, big title, description, cluster chip + back button.
function StorageHero() {
  return (
    <div className="flex flex-wrap items-start justify-between gap-6">
      <div className="min-w-0 max-w-[860px]">
        <p className="doc-mono flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7c949a]">
          <Link to="/documents" className="transition-colors hover:text-[#1f718e]">
            ← Documents
          </Link>
          <span>/</span>
          <span>Storage Management</span>
        </p>
        <h1 className="doc-heading mt-3 text-[46px] font-black leading-[1.1] text-[#10283f]">
          Know what&apos;s taking space.
        </h1>
        <p className="mt-3 text-[16px] font-light leading-7 text-(--text-secondary)">
          Enterprise document volume telemetry, format allocations, and intelligent reclamation
          suggestions to keep retrieval precision fast and lean.
        </p>
      </div>

      <div className="flex items-center gap-4 pt-2">
        <div className="flex items-center gap-3 rounded-2xl border border-[#dbe9f4] bg-white px-5 py-3 shadow-(--shadow-sm)">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e1f0fa] text-[#1f718e]">
            <HardDrive size={16} />
          </span>
          <div>
            <p className="doc-mono flex items-center gap-2 text-[11px] font-bold uppercase text-[#10283f]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0f8f63]" />
              Primary Cluster
            </p>
            <p className="doc-mono mt-0.5 text-[9px] uppercase tracking-wider text-[#7c949a]">
              AES-256 Encrypted Pool
            </p>
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
    </div>
  );
}

export default StorageHero;