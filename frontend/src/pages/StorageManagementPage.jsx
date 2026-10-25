import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, HardDrive } from 'lucide-react';
import PageHero from '../components/common/PageHero.jsx';
import CapacityCard from '../components/documents/storage/CapacityCard.jsx';
import FormatCards from '../components/documents/storage/FormatCards.jsx';
import '../styles/Document.css';

// Right side of the hero: cluster chip + back button.
// (spans, not <p>, so the hero's paragraph overrides below don't touch them)
function HeroActions() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-3 rounded-2xl border border-[#dbe9f4] bg-white px-5 py-3 shadow-(--shadow-sm)">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e1f0fa] text-[#1f718e]">
          <HardDrive size={16} />
        </span>
        <div>
          <span className="doc-mono flex items-center gap-2 text-[11px] font-bold uppercase text-[#10283f]">
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

  return (
    <div className="w-full space-y-6 px-4 py-6">
      {/* Common PageHero on the page background; only sizes are overridden here */}
      <div className="[&_h1]:text-[48px] [&_h1]:leading-[1.1] [&_p:first-of-type]:text-[#7c949a] [&_p:last-of-type]:mt-4 [&_p:last-of-type]:max-w-[860px] [&_p:last-of-type]:text-[16px] [&_p:last-of-type]:font-light [&_p:last-of-type]:leading-7">
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

      {/* Step 2: Free up space card (tabs, filters, table) */}
      {/* Step 5: bulk action bar + purge modal */}
      {/* Step 6: Recycle Bin section */}
    </div>
  );
}

export default StorageManagementPage;