import { useState } from "react";
import SettingsPanel, { SettingRow, SubSection } from "./SettingsPanel";
import Input, { Select } from "../common/Input";
import Checkbox from "../common/Checkbox";
import Button from "../common/Button";
import Badge from "../common/Badge";
import TypedConfirmModal from "../common/TypedConfirmModal";
import { DEFAULT_ROLES, FALLBACKS, UPLOAD_PERMISSIONS } from "./settingsConfig";

export default function AdminOrgSettings({ settings, update, toast }) {
  const a = settings.admin;
  const [dialog, setDialog] = useState(null); // "purge" | "company"
  const set = (patch) => update({ admin: { ...a, ...patch } });
  const selectRow = (title, text, key, options, width = "") => (
    <SettingRow title={title} description={text}>
      <Select aria-label={title} className={width} value={a[key]} onChange={(e) => set({ [key]: e.target.value })}>
        {options.map((o) => <option key={o}>{o}</option>)}
      </Select>
    </SettingRow>
  );
  const checkRow = (title, text, key) => (
    <SettingRow title={title} description={text}>
      <Checkbox label={title} checked={a[key]} onChange={(v) => set({ [key]: v })} />
    </SettingRow>
  );

  return (
    <SettingsPanel
      title="Admin / Organization"
      description="Manage organization identity, user permissions, knowledge ingestion policies, and audit logging."
      badge={<Badge text="Admin Control" type="success" size="sm" />}
    >
      <SubSection first title="Organization Information" description="High-level workspace profile and subscription tier.">
        <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
          <Input label="Organization Name" value={a.orgName} onChange={(e) => set({ orgName: e.target.value })} />
          <Input label="Primary Corporate Domain" locked lockHint="" value="northstar.studio" />
          <Input label="Subscription Tier" locked lockHint="" value="Enterprise AI Suite" />
          <Input label="Total Active Members" locked lockHint="" value="142 Members (18 Pending)" />
        </div>
      </SubSection>

      <SubSection title="User Permissions" description="Control onboard privileges and directory access policies.">
        <div className="space-y-3">
          {selectRow("Default Role for New Invites", "Assigned when team members accept an invitation", "defaultRole", DEFAULT_ROLES)}
          {checkRow("Auto-Join via Verified Corporate Domain", <>Allow anyone with an <code className="rounded bg-white/70 px-1.5 py-0.5 font-mono text-[11px]">@northstar.studio</code> email to automatically join</>, "autoJoin")}
          {checkRow("Enforce 2FA for All Organization Members", "Require two-step authentication before granting access to document vaults", "enforce2fa")}
        </div>
      </SubSection>

      <SubSection title="Document & Knowledge Management Permissions" description="Configure who can publish, index, and verify knowledge articles in the RAG brain.">
        <div className="space-y-3">
          {selectRow("Document Upload Permissions", "Who may upload and index new documents", "uploadPermission", UPLOAD_PERMISSIONS)}

          <div className="rounded-2xl bg-(--bg-surface-subtle) px-5 py-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[14px] font-bold text-(--text-primary)">Minimum Retrieval Confidence Threshold</p>
                <p className="mt-1 text-[12px] text-(--text-muted)">EKA will only synthesize an answer if citation match score exceeds this percentage</p>
              </div>
              <span className="shrink-0 rounded-xl border border-(--border-subtle) bg-white px-3 py-1.5 font-mono text-[13px] font-bold text-(--primary)">{a.confidence}% Confidence</span>
            </div>
            <input
              type="range" min={60} max={98} step={1} value={a.confidence} aria-label="Minimum retrieval confidence"
              onChange={(e) => set({ confidence: Number(e.target.value) })}
              className="set-range mt-5"
              style={{ "--fill": `${((a.confidence - 60) / 38) * 100}%` }}
            />
            <div className="mt-3 flex justify-between text-[11px] text-(--text-muted)">
              <span>60% (Permissive Retrieval)</span><span>85% (Recommended Enterprise Grounding)</span><span>98% (Strict Verbatim Only)</span>
            </div>
          </div>

          {checkRow("Enforce Strict Zero-Hallucination Guardrails", "Prohibit speculative responses — require verbatim paragraph and sentence citations", "guardrails")}
          {selectRow("Low-Confidence Fallback Policy", "What EKA does when retrieval confidence is below threshold", "fallback", FALLBACKS, "min-w-[300px]")}
        </div>
      </SubSection>

      <div className="mt-8 rounded-2xl border border-[#fecdd3] bg-[#fff5f6] p-5">
        <p className="flex flex-wrap items-center gap-2.5">
          <span className="rounded-md bg-[#ffe4e6] px-2 py-1 font-mono text-[10.5px] font-bold uppercase tracking-wider text-(--status-danger)">Admin danger zone</span>
          <span className="text-[15px] font-bold text-[#9f1239]">Organization &amp; Knowledge Purge</span>
        </p>
        <p className="mt-1.5 text-[12.5px] text-(--text-secondary)">Destructive administrator actions. These operations permanently affect team data and vector clusters.</p>
        <div className="mt-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#fecdd3] bg-white px-5 py-4">
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-bold text-(--text-primary)">Purge Knowledge Base &amp; Vector Database</p>
              <p className="mt-1 text-[12px] text-(--text-muted)">Wipes all indexed vector embeddings and semantic cache across 1,842 documents. Source files remain intact in cloud storage.</p>
            </div>
            <Button variant="dangerOutline" onClick={() => setDialog("purge")}>Purge Database</Button>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#fecdd3] bg-white px-5 py-4">
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-bold text-(--status-danger)">Delete Company &amp; Terminate Workspace</p>
              <p className="mt-1 text-[12px] text-(--text-muted)">Permanently destroys <b className="text-(--text-secondary)">{a.orgName}</b> from EKA. Revokes all 142 member accounts and purges all tenant data.</p>
            </div>
            <Button variant="danger" size="md" onClick={() => setDialog("company")}>Delete Company</Button>
          </div>
        </div>
      </div>

      {dialog === "purge" && (
        <TypedConfirmModal
          title="Purge Knowledge Base" subtitle="Removes all vector embeddings for every document."
          impactsTitle="What will happen:"
          impacts={["All indexed embeddings and the semantic cache are wiped.", "Source files stay in cloud storage and can be re-ingested.", "Search and Ask EKA return nothing until documents are re-indexed."]}
          confirmWord="PURGE" confirmLabel="Purge Database"
          onClose={() => setDialog(null)}
          onConfirm={() => toast("Purge requested (demo, nothing was deleted)", "success")}
        />
      )}
      {dialog === "company" && (
        <TypedConfirmModal
          title="Delete Company" subtitle="This terminates the entire workspace."
          impactsTitle="What will happen:"
          impacts={["All 142 member accounts are revoked.", "All tenant data and knowledge are purged.", "This action cannot be reversed."]}
          confirmWord={a.orgName} confirmLabel="Delete Company"
          onClose={() => setDialog(null)}
          onConfirm={() => toast("Workspace deletion requested (demo, nothing was deleted)", "success")}
        />
      )}
    </SettingsPanel>
  );
}