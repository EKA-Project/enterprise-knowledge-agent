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

// ============================================================================
// In-memory thread store (resets on page refresh). Swap for API calls later.
// ============================================================================
let threads = [
  {
    id: 'th-1',
    updated: 'Updated 2 hours ago',
    archived: false,
    turns: [
      {
        id: 'th-1-t1',
        when: '2 hours ago',
        question: 'How do I claim the $1500 remote work wellness stipend in Navan?',
        answer: {
          intro: "Under Northstar Studio's 2026 Global Remote Work Policy and expense guidelines:",
          points: [
            { label: 'Annual Wellness Allowance', text: 'Remote employees are entitled to a $1,500 USD annual home office stipend to reimburse ergonomic chairs, standing desks, secondary monitors, and high-speed internet.' },
            { label: 'Claim Procedure', text: 'Submit expense receipts via the Navan Expense Portal under category Remote Office / Wellness Stipend. Approvals process within 3 business days.' },
            { label: 'Monthly Co-Working', text: 'A separate recurring co-working pass subsidy of up to $300 USD/month is available for verified flex-office memberships.' },
          ],
        },
        citation: buildPlaceholderCitation(),
      },
    ],
  },
  {
    id: 'th-2',
    updated: 'Updated yesterday',
    archived: false,
    turns: [
      {
        id: 'th-2-t1',
        when: 'Yesterday',
        question: "What's our leave policy?",
        answer: buildPlaceholderAnswer("What's our leave policy?"),
        citation: buildPlaceholderCitation(),
      },
      {
        id: 'th-2-t2',
        when: 'Yesterday',
        question: 'How many sick days carry over?',
        answer: buildPlaceholderAnswer('How many sick days carry over?'),
        citation: buildPlaceholderCitation(),
      },
    ],
  },
  {
    id: 'th-3',
    updated: 'Updated 3 days ago',
    archived: true,
    turns: [
      {
        id: 'th-3-t1',
        when: '3 days ago',
        question: 'Explain SOC 2 encryption and zero-training',
        answer: buildPlaceholderAnswer('Explain SOC 2 encryption and zero-training'),
        citation: buildPlaceholderCitation(),
      },
    ],
  },
];

export function getThreads() {
  return [...threads];
}

export function getThread(id) {
  return threads.find((t) => t.id === id) ?? null;
}

export function deleteThread(id) {
  threads = threads.filter((t) => t.id !== id);
}

export function toggleArchiveThread(id) {
  threads = threads.map((t) => (t.id === id ? { ...t, archived: !t.archived } : t));
}

