import {
  FileText,
  MessageCircle,
  Users,
  Box,
} from "lucide-react";

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


  {
    title: "Information Security & Data Protection Policy",
    type: "PDF",
    meta: "Security & Compliance • 24 pages",
  },
];

export default adminMetrics;