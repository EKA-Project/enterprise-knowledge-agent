import { useState } from "react";
import SettingsPanel, { SettingRow, SubSection } from "./SettingsPanel";
import { Select } from "../common/Input";
import Checkbox from "../common/Checkbox";
import Button from "../common/Button";
import DestructiveModal from "../common/DestructiveModal";
import { RETENTION } from "./settingsConfig";

export default function PrivacySettings({ settings, update, toast }) {
  const p = settings.privacy;
  const [clearing, setClearing] = useState(false);
  const set = (patch) => update({ privacy: { ...p, ...patch } });

  return (
    <SettingsPanel title="Privacy" description="Control your conversation history, telemetry preferences, and activity visibility." className="max-w-[880px]">
      <SubSection first title="Chat & Search History" description="Manage how your past questions and citation threads are stored.">
        <div className="space-y-3">
          <SettingRow title="Save Conversation History" description="Keep your past query sessions in the sidebar for quick resumption">
            <Checkbox label="Save conversation history" checked={p.saveHistory} onChange={(v) => set({ saveHistory: v })} />
          </SettingRow>
          <SettingRow title="History Retention Period" description="Automatically purge old conversation threads after elapsed time">
            <Select aria-label="History retention period" className="min-w-[130px]" value={p.retention} onChange={(e) => set({ retention: e.target.value })}>
              {RETENTION.map((r) => <option key={r}>{r}</option>)}
            </Select>
          </SettingRow>
        </div>
        <div className="mt-4 flex gap-3">
          <Button onClick={() => toast("Chat history export is not connected yet (demo)")}>Export History</Button>
          <Button variant="dangerOutline" onClick={() => setClearing(true)}>Clear Chat History</Button>
        </div>
      </SubSection>

      <SubSection title="Activity & Data Privacy" description="Control team visibility and institutional model privacy.">
        <div className="space-y-3">
          <SettingRow title="Activity Status Presence" description="Show coworkers when you are actively collaborating in EKA">
            <Checkbox label="Activity status presence" checked={p.presence} onChange={(v) => set({ presence: v })} />
          </SettingRow>
          <div className="rounded-2xl bg-(--bg-surface-subtle) px-5 py-4">
            <p className="text-[14px] font-bold text-(--primary)"><span aria-hidden="true">✓</span> Zero-Training Guarantee</p>
            <p className="mt-1 text-[12px] leading-relaxed text-(--text-muted)">Your questions, documents, and search history are never used to train public or third-party foundation AI models. Data is strictly tenant-isolated.</p>
          </div>
        </div>
      </SubSection>

      {clearing && (
        <DestructiveModal
          title="Clear chat history?"
          message="All saved conversation threads on this account will be removed from the sidebar. This cannot be undone."
          confirmLabel="Clear"
          onCancel={() => setClearing(false)}
          onConfirm={() => { setClearing(false); toast("Chat history cleared (demo)", "success"); }}
        />
      )}
    </SettingsPanel>
  );
}

// The video never opens this tab, so these four rows are my own, built from the same row pattern.
const NOTIFY = [
  ["digest", "Weekly Knowledge Digest", "A summary of new and updated documents in your departments"],
  ["answers", "Answer Feedback Replies", "Get notified when an admin responds to your feedback"],
  ["ingestion", "Document Ingestion Alerts", "Know when a document you uploaded is indexed or fails"],
  ["security", "Security Alerts", "Sign-ins from new devices and password changes"],
];

export function NotificationsSettings({ settings, update }) {
  const n = settings.notifications;
  return (
    <SettingsPanel title="Notifications" description="Choose which updates EKA sends you.">
      <div className="space-y-3">
        {NOTIFY.map(([key, title, text]) => (
          <SettingRow key={key} title={title} description={text}>
            <Checkbox label={title} checked={n[key]} onChange={(v) => update({ notifications: { ...n, [key]: v } })} />
          </SettingRow>
        ))}
      </div>
    </SettingsPanel>
  );
}