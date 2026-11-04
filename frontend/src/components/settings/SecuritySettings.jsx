import { useState } from "react";
import SettingsPanel, { SubSection } from "./SettingsPanel";
import Input from "../common/Input";
import Button from "../common/Button";
import Badge from "../common/Badge";
import { INITIAL_DEVICES } from "./settingsConfig";

export default function SecuritySettings({ toast }) {
  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
  const [devices, setDevices] = useState(INITIAL_DEVICES);
  const set = (key) => (e) => setPw((p) => ({ ...p, [key]: e.target.value }));

  const updatePassword = () => {
    if (!pw.current) return toast("Enter your current password");
    if (pw.next.length < 8) return toast("New password must be at least 8 characters");
    if (pw.next !== pw.confirm) return toast("New passwords do not match");
    setPw({ current: "", next: "", confirm: "" });
    toast("Password updated successfully (demo)", "success");
  };

  return (
    <SettingsPanel title="Security" description="Manage your password, two-step verification, and active sessions." className="max-w-[640px]">
      <SubSection first title="Change Password" description="Choose a strong, unique passphrase with at least 8 characters.">
        <div className="space-y-4">
          <Input label="Current Password" type="password" placeholder="Enter current password" value={pw.current} onChange={set("current")} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="New Password" type="password" placeholder="Min. 8 characters" value={pw.next} onChange={set("next")} />
            <Input label="Confirm New Password" type="password" placeholder="Repeat new password" value={pw.confirm} onChange={set("confirm")} />
          </div>
          <Button onClick={updatePassword}>Update Password</Button>
        </div>
      </SubSection>

      <SubSection
        title={<>2-Step Verification (2FA) <Badge text="Enabled" type="success" size="sm" /></>}
        description="Protect your account with an extra security step when logging into new devices."
        aside={<Button onClick={() => toast("Opening 2FA setup (demo)")}>Configure 2FA</Button>}
      >
        <p className="text-[12.5px] text-(--text-muted)">Primary method: <b className="text-(--text-secondary)">Authenticator App (TOTP / 1Password / Google Authenticator)</b></p>
      </SubSection>

      <SubSection
        title="Active Sessions & Devices"
        description="Devices currently signed into your EKA account."
        aside={
          <Button variant="dangerOutline" onClick={() => { setDevices((d) => d.filter((x) => x.current)); toast("Signed out of all other devices", "success"); }}>
            Sign Out of All Devices
          </Button>
        }
      >
        <ul className="space-y-3">
          {devices.map((d) => (
            <li key={d.id} className="flex items-center gap-3 rounded-2xl bg-(--bg-surface-subtle) px-5 py-4 transition duration-200 hover:shadow-(--shadow-sm)">
              <span aria-hidden="true" className="text-[20px]">{d.icon}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] font-bold text-(--text-primary)">{d.name}</p>
                <p className="mt-0.5 text-[12px] text-(--text-muted)">{d.where}</p>
              </div>
              {d.current ? (
                <Badge text="Active Now" type="success" size="sm" />
              ) : (
                <Button size="xs" onClick={() => { setDevices((list) => list.filter((x) => x.id !== d.id)); toast(`Session revoked: ${d.name.split(" • ")[0]}`); }}>Revoke</Button>
              )}
            </li>
          ))}
        </ul>
      </SubSection>
    </SettingsPanel>
  );
}