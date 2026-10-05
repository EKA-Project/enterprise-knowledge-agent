import {
  MessageCircle,
  CheckCircle2,
  Bookmark,
  Search,
} from "lucide-react";

const employeeMetrics = [
  {
    label: "QUESTIONS ASKED",
    value: "47",
    supportingText: "+8 this week",
    supportingType: "positive",
    icon: MessageCircle,
    iconColor: "orange",
  },

  {
    label: "ANSWERS RECEIVED",
    value: "42",
    supportingText: "89% answered",
    supportingType: "positive",
    icon: CheckCircle2,
    iconColor: "green",
  },

  {
    label: "SAVED ANSWERS",
    value: "12",
    supportingText: "3 this week",
    supportingType: "positive",
    icon: Bookmark,
    iconColor: "purple",
  },

  {
    label: "SEARCH CONFIDENCE",
    value: "94%",
    supportingText: "Excellent",
    supportingType: "positive",
    icon: Search,
    iconColor: "amber",
  },
];

export default employeeMetrics;