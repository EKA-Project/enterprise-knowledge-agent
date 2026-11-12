/**
 * Application Page Metadata Catalog
 * Ordered matching the application sidebar navigation structure.
 * Holds eyebrows, titles, descriptions, and status badges across all pages and roles.
 */
const pageMetadata = {
  // ─── 1. OVERVIEW (Dashboard - Role Specific) ──────────────────────────────
  overview: {
    admin: {
      eyebrow: "MONDAY, 24 NOVEMBER",
      title: "Good morning, Maya.",
      description: "Here's what's happening across your team's memory.",
      status: "All systems in sync",
    },
    manager: {
      eyebrow: "DEPARTMENT LEAD HUB",
      title: "Good morning, David.",
      description:
        "Here is the knowledge telemetry, ingestion health, and team management workspace for your department.",
      status: "Department systems in sync",
    },
    employee: {
      eyebrow: "EMPLOYEE KNOWLEDGE HUB",
      title: "Good morning, Alex.",
      description:
        "Here is your personal activity summary, quick answers, FAQs, and search confidence.",
      status: "Employee Workspace • Verified Sources",
    },
  },

  // ─── 2. CHAT (Ask EKA / Conversational AI) ────────────────────────────────
  chat: {
    eyebrow: "CONVERSATIONAL REASONING",
    title: "Talk to your organization.",
    description:
      "Query institutional playbooks and verified sources with tenant-grounded citation tracing.",
    status: "100% Tenant-Grounded",
  },

  // ─── 3. CHAT HISTORY ──────────────────────────────────────────────────────
  chatHistory: {
    eyebrow: "ACTIVE CHAT HISTORY",
    title: "Pick up where you left off.",
    description:
      "Revisit past reasoning traces, grounded answers, and active intelligence threads.",
    status: "Thread Archive",
  },

  // ─── 4. KNOWLEDGE BASE ────────────────────────────────────────────────────
  knowledgeBase: {
    eyebrow: "BROWSE THE COLLECTIVE",
    title: "Find the thread.",
    description:
      "A map of what your team knows, grouped in ways that make sense.",
    status: "6 Collections Indexed",
  },

  knowledgeArticle: {
    eyebrow: "INSTITUTIONAL STANDARD",
    title: "Verified Knowledge Article",
    description:
      "Canonical answers grounded in verified organizational playbooks and standards.",
    status: "✓ Verified Answer",
  },

  // ─── 5. DOCUMENTS (Ingestion Repository) ──────────────────────────────────
  documents: {
    eyebrow: "INGESTION REPOSITORY / 24 DOCS",
    title: "Raw sources, structured.",
    description:
      "Every playbook, compliance standard, and contract that feeds EKA's intelligence.",
    status: "14.2 GB / 50 GB (28.4%)",
  },

  // ─── 6. DOCUMENT SUMMARY & INSPECTION ─────────────────────────────────────
  documentSummary: {
    eyebrow: "DOCUMENT INTELLIGENCE",
    title: "Document Summary & Inspection",
    description:
      "Detailed semantic inspection, indexed chunks, extraction status, and grounded Q&A.",
    status: "Indexed & Grounded",
  },

  // ─── 7. DOCUMENT STORAGE MANAGEMENT ───────────────────────────────────────
  documentStorage: {
    eyebrow: "STORAGE MANAGEMENT • REPOSITORY TELEMETRY",
    title: "Know what's taking space.",
    description:
      "Enterprise document volume telemetry, format allocations, and intelligent reclamation suggestions to keep retrieval precision fast and lean.",
    status: "3.4 GB Reclaimable",
  },

  // ─── 8. ANALYTICS & TELEMETRY (Role-Guarded) ──────────────────────────────
  analytics: {
    admin: {
      eyebrow: "ENTERPRISE KNOWLEDGE TELEMETRY",
      title: "See how your knowledge performs.",
      description:
        "Comprehensive audit metrics, grounding accuracy telemetry, cross-document discrepancy detection, and ungrounded query gap analysis.",
      status: "Audit Engine Active",
    },
    manager: {
      eyebrow: "DEPARTMENT KNOWLEDGE TELEMETRY",
      title: "See how your department knowledge performs.",
      description:
        "Grounding accuracy telemetry, department document usage, and query gap analysis.",
      status: "Grounding 94.2%",
    },
    employee: {
      eyebrow: "ROLE ACCESS POLICY NOTICE",
      title: "System Analytics is Admin Only.",
      description:
        "System-wide RAG audit metrics, vector mass distribution, and cross-document contradiction detectors are restricted to Administrators & Knowledge Managers.",
      status: "Admin Restricted",
    },
  },

  // ─── 9. ORGANIZATION - DEPARTMENTS & MANAGERS ─────────────────────────────
  organizationDepartments: {
    eyebrow: "ORGANIZATION STRUCTURE & UNITS",
    title: "Structure how teams share.",
    description:
      "Configure enterprise departments, designated Lead Managers, and scoped document ingestion authority.",
    status: "6 Active Departments",
  },

  // ─── 10. ORGANIZATION - TEAM DIRECTORY ────────────────────────────────────
  organizationDirectory: {
    admin: {
      eyebrow: "ORGANIZATION DIRECTORY",
      title: "The people behind the work.",
      description:
        "Manage team roles, access levels (Basic, Restricted, Admin), and account statuses.",
      status: "42 Members Indexed",
    },
    manager: {
      eyebrow: "DEPARTMENT TEAM ROSTER",
      title: "Your team specialists.",
      description:
        "Manage department team members, role assignments, and member activity status.",
      status: "6 Department Members",
    },
    employee: {
      eyebrow: "RESTRICTED ACCESS",
      title: "User Management & Directory",
      description:
        "Organization member invites, role privileges, access levels, and account termination controls are restricted to Administrators.",
      status: "Admin Restricted",
    },
  },

  // ─── 11. SETTINGS & PREFERENCES ───────────────────────────────────────────
  settings: {
    eyebrow: "WORKSPACE & ACCOUNT",
    title: "Make EKA yours.",
    description:
      "Shape a digital workspace that reflects how you think—tuned for beauty, calm focus, and creative flow.",
    status: "Personal Preferences",
  },

  // ─── 12. HELP & SUPPORT ───────────────────────────────────────────────────
  helpAndSupport: {
    eyebrow: "EKA OPERATIONAL KNOWLEDGE & TUTORIAL GUIDE",
    title: "Answers whenever you need them.",
    description:
      "Meet Eka, your interactive AI assistant guide! Explore step-by-step feature guides, verified FAQs, and interactive hints.",
    status: "24/7 AI Operator",
  },

  // ─── COMPANION TOOLS (Search, Voice, Governance) ──────────────────────────
  semanticSearch: {
    eyebrow: "KNOWLEDGE DISCOVERY",
    title: "Search by meaning, not just words.",
    description:
      "Find company guidelines, policies, and runbooks using everyday natural language concepts and plain English phrases.",
    status: "EKA Vector Agent Active",
  },

  voiceStudio: {
    eyebrow: "CONVERSATIONAL INTELLIGENCE",
    title: "Speak with EKA.",
    description:
      "Hands-free institutional exploration. Tap the microphone and ask naturally.",
    status: "Ready to Listen",
  },

  adminPortal: {
    eyebrow: "SYSTEM & LLMOPS GOVERNANCE",
    title: "Admin Portal",
    description:
      "Manage vector index syncing, AI safety guardrails, KMS key rotations, LLM providers, and system operation logs.",
    status: "Milvus HNSW • In Sync",
  },
};

// Backward-compatibility alias so existing `pageMetadata.dashboard` references don't break
pageMetadata.dashboard = pageMetadata.overview;

export default pageMetadata;