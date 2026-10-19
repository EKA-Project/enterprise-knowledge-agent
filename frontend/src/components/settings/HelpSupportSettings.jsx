import { useState } from "react";
import SettingsPanel, { SettingRow, SubSection } from "./SettingsPanel";
import { Select, Textarea } from "../common/Input";
import Button from "../common/Button";
import { ISSUE_CATEGORIES } from "./settingsConfig";

const GUIDES = [
  ["📖", "EKA User Guide", "Learn prompt techniques, citation inspection, and semantic search filtering.", "Opening EKA Quickstart Guide…"],
  ["⚡", "Keyboard Shortcuts & FAQs", <>Press <code className="rounded bg-(--bg-surface-subtle) px-1.5 py-0.5 font-mono text-[11px]">Ctrl+K</code> to quick-search or ask questions from any page.</>, "Opening FAQs and Keyboard Shortcuts…"],
];
const ADMINS = [
  ["Maya Narang", "Workspace Creator • Primary Admin", "maya@northstar.studio"],
  ["Elena Rostova", "IT & Security Lead", "elena.r@northstar.studio"],
];

export default function HelpSupportSettings({ toast }) {
  const [category, setCategory] = useState(ISSUE_CATEGORIES[0]);
  const [description, setDescription] = useState("");

  const submit = () => {
    if (!description.trim()) return toast("Describe what happened before submitting");
    setDescription("");
    toast("Issue report submitted (demo, nothing was sent)", "success");
  };

  return (
    <SettingsPanel title="Help & Support" description="Get guidance on using EKA, report technical issues, or reach your organization admins.">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {GUIDES.map(([icon, title, text, message]) => (
          <button
            key={title}
            type="button"
            onClick={() => toast(message)}
            className="rounded-2xl border border-(--border-subtle) bg-(--bg-surface) p-5 text-left transition duration-200 hover:-translate-y-1 hover:border-(--primary) hover:shadow-(--shadow-md) active:scale-[0.99]"
          >
            <span aria-hidden="true" className="text-[18px]">{icon}</span>
            <span className="mt-3 block text-[14px] font-bold text-(--text-primary)">{title}</span>
            <span className="mt-1 block text-[12px] text-(--text-muted)">{text}</span>
          </button>
        ))}
      </div>

      <SubSection title="Report an Issue" description="Encountered a bug, incorrect document citation, or slow query? Send feedback directly to the engineering team.">
        <div className="max-w-[480px] space-y-4">
          <Select label="Issue Category" value={category} onChange={(e) => setCategory(e.target.value)}>
            {ISSUE_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </Select>
          <Textarea label="Description" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe what happened or paste query text..." />
          <Button variant="solid" onClick={submit}>Submit Issue Report</Button>
        </div>
      </SubSection>

      <SubSection title="Contact Workspace Administrator" description="Need upgraded document clearance, role elevation, or connector access? Contact your assigned leads:">
        <div className="space-y-3">
          {ADMINS.map(([name, role, email]) => (
            <SettingRow key={email} title={name} description={role}>
              <Button onClick={() => (window.location.href = `mailto:${email}`)}>Email Admin</Button>
            </SettingRow>
          ))}
        </div>
      </SubSection>
    </SettingsPanel>
  );
}