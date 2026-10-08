// ============================================================================
// PLACEHOLDERS: replace these with real API calls when the backend is ready.
// Keep the returned shapes the same and nothing else needs to change.
// ============================================================================
export function buildPlaceholderAnswer(question) {
  return {
    intro: `Based on enterprise verified knowledge sources across active company repositories for "${question}":`,
    points: [
      { label: 'Query Grounding', text: 'Verified against Northstar Studio institutional policies and active playbooks.' },
      { label: 'Operational Framework', text: 'Key findings confirm compliance rules, procedural standards, and security protocols.' },
      { label: 'Recommended Actions', text: 'Refer to section details in linked documentation or consult your department lead.' },
    ],
  };
}

// A turn's `citation` is a list of source objects.
export function buildPlaceholderCitation() {
  return [
    { title: 'Corporate Governance & Compliance Policy.pdf', meta: 'page 1 · verified source' },
    { title: '2026 Global Remote Work Policy.pdf', meta: 'page 1 · verified source' },
  ];
}
