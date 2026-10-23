import { useRef, useState } from "react";
import { Trash2 } from "lucide-react";
import SettingsPanel from "./SettingsPanel";
import Input from "../common/Input";
import Button from "../common/Button";
import Badge from "../common/Badge";
import TypedConfirmModal from "../common/TypedConfirmModal";
import { ROLE_ACCESS } from "./settingsConfig";

export default function ProfileSettings({ role = "Admin", toast }) {
  const access = ROLE_ACCESS[role] ?? ROLE_ACCESS.Admin;
  const [form, setForm] = useState({ name: "Maya Narang", email: "maya@northstar.studio", bio: "Lead Product Designer" });
  const [photo, setPhoto] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const fileRef = useRef(null);
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const pickPhoto = (file) => {
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 2 * 1024 * 1024) {
      return toast("Photo must be JPG, PNG or WebP under 2 MB");
    }
    setPhoto(URL.createObjectURL(file));
    toast("Profile photo updated", "success");
  };

  const save = () =>
    !form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email.trim())
      ? toast("Enter your name and a valid work email")
      : toast("Profile settings saved successfully!", "success");

  return (
    <SettingsPanel title="Profile" description="Manage your personal information, organization role, and account identity.">
      <div className="flex items-center gap-4">
        {photo ? (
          <img src={photo} alt="Profile" className="size-14 rounded-full border-2 border-(--border-medium) object-cover" />
        ) : (
          <span className="grid size-14 place-items-center rounded-full border-2 border-(--border-medium) bg-(--primary) font-mono text-[18px] font-bold text-white">MN</span>
        )}
        <div>
          <div className="flex items-center gap-2">
            <Button onClick={() => { toast("Select a new profile photo (JPG/PNG)"); fileRef.current?.click(); }}>Upload new picture</Button>
            <Button variant="dangerOutline" onClick={() => { setPhoto(null); toast("Profile picture removed"); }}>Remove</Button>
          </div>
          <p className="mt-1.5 text-[11.5px] text-(--text-muted)">Supported formats: JPG, PNG, or WebP • Max 2 MB</p>
          <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => pickPhoto(e.target.files[0])} />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-start justify-between gap-4 rounded-2xl border border-(--badge-border) bg-(--bg-surface-subtle) p-5">
        <div>
          <p className="flex flex-wrap items-center gap-2.5">
            <span className="text-[11.5px] font-bold uppercase tracking-wider text-(--primary)">Access level &amp; permissions</span>
            <Badge text={access.badge} type="success" size="sm" />
          </p>
          <p className="mt-2 text-[14px] font-bold text-(--text-primary)">{access.title}</p>
          <p className="mt-1 text-[12px] text-(--text-muted)">{access.text}</p>
        </div>
        <div className="space-y-1 text-right text-[11.5px] text-(--text-muted)">
          <p>Tenant ID: <code className="ml-1 font-mono font-bold text-(--text-primary)">tenant_ns_9821</code></p>
          <p>SSO Status: <b className="text-(--status-success)">Active (Okta)</b></p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
        <Input label="Full Name" value={form.name} onChange={set("name")} />
        <Input label="Work Email" type="email" value={form.email} onChange={set("email")} />
        <Input label="Assigned Department" locked value="Product Strategy & Design" />
        <Input label="Security Clearance & System Role" locked value={access.clearance} />
        <Input label="Role Title & Bio" className="md:col-span-2" value={form.bio} onChange={set("bio")} />
      </div>

      <div className="mt-5 flex justify-end">
        <Button variant="solid" size="md" onClick={save}>Save Profile Changes</Button>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#fecdd3] bg-[#fff5f6] p-5">
        <div className="min-w-0 flex-1">
          <p className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-md bg-[#ffe4e6] px-2 py-1 font-mono text-[10.5px] font-bold uppercase tracking-wider text-(--status-danger)">Danger zone</span>
            <span className="text-[15px] font-bold text-[#9f1239]">Delete Personal Account</span>
          </p>
          <p className="mt-1.5 text-[12.5px] text-(--text-secondary)">Permanently delete your profile, personal preferences, and saved conversation threads from Northstar Studio. This action cannot be undone.</p>
        </div>
        <Button variant="dangerOutline" icon={Trash2} onClick={() => setDeleting(true)}>Delete Account</Button>
      </div>

      {deleting && (
        <TypedConfirmModal
          title="Delete Personal Account"
          subtitle="This action is permanent and cannot be reversed."
          impactsTitle="What will happen when you delete:"
          impacts={[
            "All your personal conversation threads and query history will be deleted.",
            <>Your account will be removed from <b>Northstar Studio</b>.</>,
            "All active sessions on mobile and desktop will be immediately signed out.",
          ]}
          confirmWord="DELETE"
          confirmLabel="Permanently Delete Account"
          onClose={() => setDeleting(false)}
          onConfirm={() => toast("Account deletion requested (demo, nothing was deleted)", "success")}
        />
      )}
    </SettingsPanel>
  );
}