import {
  LayoutDashboard,
  MessageSquare,
  Database,
  FileText,
  Search,
  BarChart3,
  Building2,
  Settings,
} from "lucide-react";

const navigation = {
  workspace: [
    { label: "Overview", path: "/dashboard", icon: LayoutDashboard },
    {
      label: "Ask EKA",
      path: "/ask-eka",
      icon: MessageSquare,
      shortcut: "⌘K",
    },
    { label: "Knowledge Base", path: "/knowledge-base", icon: Database },
    {
      label: "Documents",
      path: "/documents",
      icon: FileText,
      count: 12,
    },
    { label: "Semantic Search", path: "/semantic-search", icon: Search },
  ],

  administration: [
    {
      label: "Analytics",
      path: "/analytics",
      icon: BarChart3,
      roles: ["Admin"],
    },
    {
      label: "Organization",
      path: "/organization",
      icon: Building2,
      roles: ["Admin"],
    },
  ],

  settings: [{ label: "Settings", path: "/settings", icon: Settings }],
};

export default navigation;
