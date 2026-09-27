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

export default adminMetrics;