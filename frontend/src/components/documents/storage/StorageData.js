// Mock storage numbers (backend later). Matches the reference video.
export const storageSummary = {
  usedGb: 14.3,
  totalGb: 50,
  freeGb: 35.7,
  documents: 23,
  reclaimableGb: 0.7,
  softDeleted: 2,
};

// `share` = % of used space. Bar width = gb / totalGb.
export const storageFormats = [
  { key: 'PDF', gb: 7.2, files: 4, share: 50.3, color: '#ee4544', tile: 'bg-[#fde2e1] text-[#d9373f]' },
  { key: 'DOCX', gb: 3.4, files: 6, share: 23.8, color: '#2563eb', tile: 'bg-[#e0ecff] text-[#2563eb]' },
  { key: 'MD', gb: 1.6, files: 4, share: 11.2, color: '#08966a', tile: 'bg-[#d9f7ea] text-[#08966a]' },
  { key: 'CSV', gb: 1.2, files: 5, share: 8.4, color: '#0c82c0', tile: 'bg-[#e0f1fd] text-[#0c82c0]' },
  { key: 'TXT', gb: 0.8, files: 4, share: 5.6, color: '#d87708', tile: 'bg-[#fff0c0] text-[#b86b00]' },
];