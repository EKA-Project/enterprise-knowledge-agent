import { MessageCircle, CheckCircle2, Bookmark, Search } from "lucide-react";

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

export const velocityChartData = {
  title: "14-Day Activity Velocity",
  badgeText: "Trending up",
  badgeIcon: "↗",
  defaultSubtext:
    "Query volume over last 14 days • 61 queries resolved (+18.4% vs last week)",
  legendLabel: "Queries / Day",

  axisLabels: [
    "Aug 18",
    "Aug 20",
    "Aug 22",
    "Aug 24",
    "Aug 26",
    "Aug 28",
    "Today",
  ],

  points: [
    { date: "Aug 18", value: 3, x: 25, y: 83.2 },
    { date: "Aug 19", value: 5, x: 75, y: 62.1 },
    { date: "Aug 20", value: 4, x: 125, y: 72.6 },
    { date: "Aug 21", value: 6, x: 175, y: 51.5 },
    { date: "Aug 22", value: 4, x: 225, y: 72.6 },
    { date: "Aug 23", value: 1, x: 275, y: 104.4 },
    { date: "Aug 24", value: 2, x: 325, y: 93.8 },
    { date: "Aug 25", value: 5, x: 375, y: 62.1 },
    { date: "Aug 26", value: 8, x: 425, y: 30.3 },
    { date: "Aug 27", value: 6, x: 475, y: 51.5 },
    { date: "Aug 28", value: 7, x: 525, y: 40.9 },
    { date: "Aug 29", value: 4, x: 575, y: 72.6 },
    { date: "Aug 30", value: 3, x: 625, y: 83.2 },
    { date: "Today", value: 6, x: 675, y: 51.5 },
  ],

  svgPath:
    "M 25.0 83.2 C 33.3 79.7, 58.3 65.6, 75.0 62.1 C 91.7 58.6, 108.3 70.8, 125.0 72.6 C 141.7 74.4, 158.3 55.0, 175.0 51.5 C 191.7 48.0, 208.3 69.1, 225.0 72.6 C 241.7 76.1, 258.3 99.1, 275.0 104.4 C 291.7 109.7, 308.3 99.1, 325.0 93.8 C 341.7 88.5, 358.3 67.4, 375.0 62.1 C 391.7 56.8, 408.3 33.8, 425.0 30.3 C 441.7 26.8, 458.3 48.0, 475.0 51.5 C 491.7 55.0, 508.3 39.1, 525.0 40.9 C 541.7 42.7, 558.3 67.4, 575.0 72.6 C 591.7 77.9, 608.3 81.4, 625.0 83.2 C 641.7 85.0, 666.7 56.8, 675.0 51.5",
};

export { employeeMetrics };
