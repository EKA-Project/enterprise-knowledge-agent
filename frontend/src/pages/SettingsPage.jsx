import { useCallback, useContext, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Bell, Building2, Droplet, HelpCircle, Lock, LogOut, Settings as Gear, Shield, User } from "lucide-react";
import "../styles/settings.css";
import AuthContext from "../context/AuthContext.jsx";
import useSettings from "../hooks/useSettings";
import PageHero from "../components/common/PageHero";
import ToastStack from "../components/common/Toast";
import ProfileSettings from "../components/settings/ProfileSettings";
import SecuritySettings from "../components/settings/SecuritySettings";
import PreferencesSettings from "../components/settings/PreferencesSettings";
import AppearanceSettings from "../components/settings/AppearanceSettings";
import PrivacySettings, { NotificationsSettings } from "../components/settings/PrivacySettings";
import HelpSupportSettings from "../components/settings/HelpSupportSettings";
import AdminOrgSettings from "../components/settings/AdminOrgSettings";

const ITEMS = [
  { id: "profile", label: "Profile", Icon: User, Panel: ProfileSettings },
  { id: "security", label: "Security", Icon: Lock, Panel: SecuritySettings },
  { id: "preferences", label: "EKA Preferences", Icon: Gear, Panel: PreferencesSettings },
  { id: "appearance", label: "Appearance", Icon: Droplet, Panel: AppearanceSettings },
  { id: "notifications", label: "Notifications", Icon: Bell, Panel: NotificationsSettings },
  { id: "privacy", label: "Privacy", Icon: Shield, Panel: PrivacySettings },
  { id: "help", label: "Help & Support", Icon: HelpCircle, Panel: HelpSupportSettings },
];
const ADMIN_ITEM = { id: "admin", label: "Admin / Org", Icon: Building2, Panel: AdminOrgSettings };

const nav =
  "flex w-full items-center gap-3 rounded-full px-4 py-2.5 text-left text-[14px] font-semibold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus)";
const navOn = "bg-[#193c2d] text-white shadow-(--shadow-md)";

export default function SettingsPage() {
  const navigate = useNavigate();
  const { activeRole } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [settings, update] = useSettings();
  const [toasts, setToasts] = useState([]);
  const toastId = useRef(0);

  const toast = useCallback((message, tone = "info") => {
    toastId.current += 1;
    setToasts((prev) => [...prev.slice(-2), { id: toastId.current, message, tone }]);
  }, []);
  const dismiss = useCallback((id) => setToasts((prev) => prev.filter((t) => t.id !== id)), []);

  const isAdmin = activeRole === "Admin";
  const all = isAdmin ? [...ITEMS, ADMIN_ITEM] : ITEMS;
  // A direct link to a hidden tab (e.g. admin for a non-admin) falls back to Profile.
  const current = all.find((i) => i.id === searchParams.get("section")) ?? ITEMS[0];
  const { Panel } = current;
  const go = (id) => setSearchParams(id === "profile" ? {} : { section: id }, { replace: true });

  const renderItem = ({ id, label, Icon }, extra) => (
    <button
      key={id}
      type="button"
      aria-current={current.id === id ? "page" : undefined}
      onClick={() => go(id)}
      className={`${nav} ${current.id === id ? navOn : `${id === "admin" ? "text-(--primary)" : "text-(--text-secondary)"} hover:translate-x-0.5 hover:bg-(--bg-surface-subtle) hover:text-(--primary)`}`}
    >
      <Icon size={17} aria-hidden="true" /> {label} {extra}
    </button>
  );

  return (
    <div className="settings-page mx-auto w-full max-w-[1400px] space-y-4">
      <PageHero eyebrow="Workspace & account" title="Make EKA Yours." description="Manage your personal preferences, security, and workspace experience." />

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[250px_minmax(0,1fr)]">
        <nav aria-label="Settings sections" className="set-rise space-y-1.5 lg:sticky lg:top-4">
          {ITEMS.map((item) => renderItem(item))}
          <div className="my-3 border-t border-(--border-subtle)" />
          {isAdmin && renderItem(ADMIN_ITEM, <span className="ml-auto rounded-full border border-(--status-success) bg-(--status-success-bg) px-2 py-0.5 text-[10px] font-bold text-(--status-success)">Admin</span>)}
          <button type="button" onClick={() => navigate("/login")} className={`${nav} text-(--status-danger) hover:translate-x-0.5 hover:bg-(--status-danger-bg)`}>
            <LogOut size={17} aria-hidden="true" /> Sign Out
          </button>
        </nav>

        <Panel key={current.id} settings={settings} update={update} role={activeRole} toast={toast} />
      </div>

      <ToastStack toasts={toasts} onDismiss={dismiss} />
    </div>
  );
}