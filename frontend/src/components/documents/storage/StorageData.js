// Mock storage numbers (backend later). Matches the reference screenshots.
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
  { key: 'PDF', gb: 7.2, files: 4, share: 50.3, color: '#ed4545', tile: 'bg-[#ffe2e1] text-[#d9373f]' },
  { key: 'DOCX', gb: 3.4, files: 6, share: 23.8, color: '#2f62e0', tile: 'bg-[#e1ecff] text-[#2f62e0]' },
  { key: 'MD', gb: 1.6, files: 4, share: 11.2, color: '#05966f', tile: 'bg-[#d9f7ea] text-[#05966f]' },
  { key: 'CSV', gb: 1.2, files: 5, share: 8.4, color: '#0188a6', tile: 'bg-[#d9f0fa] text-[#0188a6]' },
  { key: 'TXT', gb: 0.8, files: 4, share: 5.6, color: '#db7707', tile: 'bg-[#fff1cc] text-[#b86b00]' },
];