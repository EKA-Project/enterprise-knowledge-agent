import { useEffect, useState } from "react";
import Modal from "../common/Modal";
import Button from "../common/Button";
import Badge from "../common/Badge";
import { getInitials, getTelemetry } from "./OrganizationData";

const mono = "font-(family-name:--font-mono)";
const STATUS_BADGE = { Active: "success", Invited: "info", Suspended: "warning", Terminated: "danger" };
const section = "mb-2 mt-5 flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.1em] text-(--primary)";
const miniLabel = "text-[10.5px] uppercase tracking-wide text-(--text-muted)";

export default function UserViewModal({ user, onClose, onEdit }) {
  const t = getTelemetry(user);
  const max = Math.max(...t.weeks);
  const labels = ["Wk 1", "Wk 2", "Wk 3", "Current"];
  const [hover, setHover] = useState(null);
  const [grown, setGrown] = useState(false);

  // Bars start flat, then grow on the next frame (pure Tailwind transition).
  useEffect(() => {
    const id = requestAnimationFrame(() => setGrown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const last = t.weeks[3];
  const prev = t.weeks[2];
  const delta = Math.round(((last - prev) / prev) * 100);
  const caption =
    hover === null
      ? `Current (Wk 4): ${last} Queries (${delta >= 0 ? "+" : ""}${delta}% vs Wk 3)`
      : `${labels[hover]}: ${t.weeks[hover]} Queries`;

  const profile = [
    ["Department", user.department],
    ["Role", user.role],
    ["Access level", user.access],
    ["Joined date", user.joined],
  ];
  const stats = [
    ["Total queries", t.total, "text-(--text-primary)"],
    ["Docs accessed", t.docs, "text-(--primary)"],
    ["Searches", t.searches, "text-(--text-primary)"],
  ];

  return (
    <Modal
      title={
        <span className="inline-flex flex-wrap items-center gap-2 font-sans">
          {user.name}
          <Badge text={user.status} type={STATUS_BADGE[user.status] ?? "info"} size="sm" />
        </span>
      }
      subtitle={user.email}
      icon={
        <span className="grid size-11 place-items-center rounded-full bg-[#dcf1ec] text-[13px] font-bold text-[#2b8aa0]">
          {getInitials(user.name)}
        </span>
      }
      size="lg"
      onClose={onClose}
      footer={(close) => (
        <div className="flex justify-end gap-3">
          <Button variant="light" size="md" onClick={close}>Close</Button>
          <Button variant="solid" size="md" onClick={onEdit}>Edit Account Settings →</Button>
        </div>
      )}
    >
      <h3 className={`${section} mt-1`}><span aria-hidden="true">👤</span> Member profile</h3>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-xl border border-(--border-subtle) bg-(--bg-surface-subtle) p-4 sm:grid-cols-4">
        {profile.map(([k, v]) => (
          <div key={k}>
            <dt className={miniLabel}>{k}</dt>
            <dd className="mt-0.5 text-[13.5px] font-bold leading-snug text-(--text-primary)">{v}</dd>
          </div>
        ))}
      </dl>

      <h3 className={section}><span aria-hidden="true">📊</span> Read-only usage telemetry</h3>
      <div className="grid grid-cols-2 divide-x divide-(--border-subtle) rounded-xl border border-(--border-medium) bg-(--bg-surface) py-3 sm:grid-cols-4">
        {stats.map(([k, v, tone]) => (
          <div key={k} className="px-4 text-center">
            <p className={miniLabel}>{k}</p>
            <p className={`mt-1 font-(family-name:--font-serif) text-[24px] font-bold leading-none ${tone}`}>{v}</p>
          </div>
        ))}
        <div className="px-4 text-center">
          <p className={miniLabel}>Last active</p>
          <p className="mt-2 text-[13px] font-bold text-(--status-success)">{user.lastActive}</p>
        </div>
      </div>

      <div className="mt-3 rounded-xl border border-(--border-subtle) bg-(--bg-surface-subtle) p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className={`${mono} text-[10px] uppercase tracking-[0.14em] text-(--text-muted)`}>Personal query velocity</p>
          <p className={`${mono} text-[11px] font-semibold text-(--primary)`}>{caption}</p>
        </div>
        <div className="mt-4 flex items-end gap-4">
          {t.weeks.map((v, i) => {
            const current = i === 3;
            return (
              <div
                key={labels[i]}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                className="flex flex-1 flex-col items-center gap-1.5"
              >
                <span className={`${mono} text-[10.5px] font-semibold text-(--text-primary)`}>{v}</span>
                <div className="flex h-20 w-full items-end justify-center">
                  <div
                    className={`w-14 max-w-full rounded-t-md transition-[height,background-color] duration-700 ease-out ${
                      current || hover === i ? "bg-(--primary)" : "bg-[#c4e0f2]"
                    }`}
                    style={{ height: grown ? `${(v / max) * 100}%` : "0%", transitionDelay: `${i * 90}ms` }}
                  />
                </div>
                <span className={`text-[11px] font-semibold ${current ? "text-(--primary)" : "text-(--text-muted)"}`}>{labels[i]}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}