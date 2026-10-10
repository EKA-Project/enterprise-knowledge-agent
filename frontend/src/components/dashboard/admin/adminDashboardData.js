import { FileText, MessageCircle, Users, Box } from "lucide-react";

const adminMetrics = [
  {
    label: "KNOWLEDGE INDEXED",
    value: "1,284",
    supportingText: "+8.4%",
    supportingType: "positive",
    icon: FileText,
    iconColor: "orange",
  },
  {
    label: "QUESTIONS ANSWERED",
    value: "348",
    supportingText: "this month",
    supportingType: "muted",
    icon: MessageCircle,
    iconColor: "green",
  },
  {
    label: "ACTIVE CONTRIBUTORS",
    value: "42",
    supportingText: "+6 this week",
    supportingType: "positive",
    icon: Users,
    iconColor: "amber",
  },
  {
    label: "STORAGE CAPACITY",
    value: "28%",
    supportingText: "14.2 GB used",
    supportingType: "muted",
    icon: Box,
    iconColor: "purple",
  },
];

export const recentQuestions = [
  {
    number: "01",
    title: "What changed in our pricing strategy this quarter?",
    meta: "8 min ago • 3 sources",
  },
  {
    number: "02",
    title: "Summarise the remote work principles",
    meta: "Yesterday • 1 source",
  },
  {
    number: "03",
    title: "Who owns the onboarding experience?",
    meta: "Yesterday • 4 sources",
  },
  {
    number: "04",
    title: "What are the key Q4 product bets?",
    meta: "2 days ago • 2 sources",
  },
];

export const knowledgeActivity = [
  {
    type: "upload",
    title: "Nadia Al-Mansoor uploaded SOC 2 Type II Security Report",
    meta: "Security & Compliance • 5 hours ago",
  },
  {
    type: "document",
    title: "Elena Rostova verified Emergency Failover Runbook",
    meta: "Engineering & DevOps • Yesterday",
  },
  {
    type: "question",
    title: 'Maya Narang asked "Kubernetes failover DNS TTL"',
    meta: "Grounded via 2026 Remote Work Policy • 10 mins ago",
  },
];

export const pinnedDocuments = [
  {
    type: "PDF",
    title: "Corporate Governance & Compliance Charter",
    meta: "People & HR Operations • 2.4 MB • 8 min read",
  },
  {
    type: "PDF",
    title: "2026 Global Remote Work, Travel & Expense Policy",
    meta: "People & HR Operations • 1.8 MB • 6 min read",
  },
];

/*
 * ============================================================
 * CHART DATA
 * ============================================================
 * Replace these with API data later; the chart components
 * only depend on the shape of each item.
 */

// Total indexed documents over time.
export const documentGrowthData = [
  { label: "Apr", value: 610 },
  { label: "May", value: 760 },
  { label: "Jun", value: 890 },
  { label: "Jul", value: 1080 },
  { label: "Aug", value: 1284 },
];

// Weekly active users by organization role.
export const activeUsersData = [
  { label: "Wk 1", employee: 38, manager: 10, admin: 3 },
  { label: "Wk 2", employee: 44, manager: 12, admin: 4 },
  { label: "Wk 3", employee: 52, manager: 15, admin: 5 },
  { label: "Current", employee: 62, manager: 18, admin: 7 },
];

// Daily question activity. `tier` (1-4) picks the bar color.
export const questionsData = [
  { label: "Nov 01", value: 34, answerRate: 74, queries: 142, tier: 1 },
  { label: "Nov 03", value: 52, answerRate: 78, queries: 186, tier: 3 },
  { label: "Nov 05", value: 42, answerRate: 80, queries: 210, tier: 1 },
  { label: "Nov 07", value: 48, answerRate: 77, queries: 174, tier: 2 },
  { label: "Nov 09", value: 45, answerRate: 79, queries: 198, tier: 2 },
  { label: "Nov 11", value: 57, answerRate: 82, queries: 224, tier: 3 },
  { label: "Nov 13", value: 54, answerRate: 80, queries: 205, tier: 2 },
  { label: "Nov 15", value: 66, answerRate: 83, queries: 241, tier: 4 },
  { label: "Nov 17", value: 55, answerRate: 78, queries: 217, tier: 2 },
  { label: "Nov 19", value: 61, answerRate: 76, queries: 232, tier: 4 },
  { label: "Nov 21", value: 65, answerRate: 65, queries: 342, tier: 3 },
  { label: "Nov 24", value: 73, answerRate: 81, queries: 258, tier: 4 },
];

// Overall metric shown on the Questions Answered card when nothing is hovered.
export const questionsDefaultMetric = {
  answerRate: 81,
  queries: "4,820",
};

export default adminMetrics;
