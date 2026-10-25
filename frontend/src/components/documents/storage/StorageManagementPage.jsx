import { useState } from 'react';
import StorageHero from '../components/documents/storage/StorageHero.jsx';
import CapacityCard from '../components/documents/storage/CapacityCard.jsx';
import FormatCards from '../components/documents/storage/FormatCards.jsx';
import '../styles/Document.css';

// Admin-only Storage Management page (route: /documents/storage).
function StorageManagementPage() {
  const [activeFormat, setActiveFormat] = useState('ALL'); // selected format card
  const [hoveredKey, setHoveredKey] = useState(null); // bar / legend / card hover link

  return (
    <div className="w-full space-y-6 px-4 py-6">
      <StorageHero />
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