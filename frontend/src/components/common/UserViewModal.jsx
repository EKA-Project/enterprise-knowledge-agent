import { useState } from "react";
import Modal from "../common/Modal.jsx";
import Badge from "../common/Badge.jsx";
import Button from "../common/Button.jsx";

const BAR_MAX_HEIGHT = 44; // px, height of the tallest bar

function formatQueries(count) {
  return `${count} ${count === 1 ? "Query" : "Queries"}`;
}

function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function weekName(index, lastIndex) {
  return index === lastIndex ? "Current" : `Wk ${index + 1}`;
}

// "Wk 2: 24 Queries (+100% vs Wk 1)", computed from the data
function buildCaption(weeks, index) {
  const value = weeks[index];
  const isCurrent = index === weeks.length - 1;
  const name = isCurrent ? `Current (Wk ${index + 1})` : `Wk ${index + 1}`;
  let caption = `${name}: ${formatQueries(value)}`;

  const previous = weeks[index - 1];
  if (previous > 0) {
    const change = Math.round(((value - previous) / previous) * 100);
    caption += ` (${change > 0 ? "+" : ""}${change}% vs Wk ${index})`;
  }
  return caption;
}

function SectionHeading({ icon, children }) {
  return (
    <h3 className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-(--primary)">
      <span aria-hidden="true">{icon}</span>
      {children}
    </h3>
  );
}

function ProfileField({ label, children }) {
  return (
    <div className="min-w-0">
      <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-(--text-muted)">
        {label}
      </p>
      <p className="mt-0.5 break-words text-[0.8rem] font-semibold text-(--text-primary)">
        {children}
      </p>
    </div>
  );
}

function Stat({ label, hint, children }) {
  return (
    <div
      title={hint}
      className="px-3 text-center sm:border-l sm:border-(--border-subtle) sm:first:border-l-0"
    >
      <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-(--text-muted)">
        {label}
      </p>
      <div className="mt-0.5 flex h-6 items-center justify-center">
        {children}
      </div>
    </div>
  );
}

/**
 * member: { name, email, title, status, joinedDate, lastActive,
 *           queries, searches, docs, weeklyQueries: number[] (oldest first),
 *           accessLevel? (admin view only) }
 * department: string
 * onClose: () => void
 * canEdit?: boolean (default false; admin view: adds Access Level + Edit button)
 * onEdit?: () => void
 */
function UserViewModal({ member, department, onClose, canEdit = false, onEdit }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const weeks = member.weeklyQueries ?? [];
  const lastIndex = weeks.length - 1;
  const maxValue = Math.max(...weeks, 1);
  const activeIndex = hoveredIndex ?? lastIndex;

  return (
    <Modal
      size="md"
      compact
      onClose={onClose}
      icon={
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-(--accent-chip) font-mono text-xs font-bold text-(--accent-chip-text)">
          {getInitials(member.name)}
        </div>
      }
      title={
        <span className="flex flex-wrap items-center gap-2 font-sans">
          {member.name}
          {/* The *: rules shrink the Badge's own pill from out here */}
          <span className="inline-flex *:px-2! *:py-0! *:text-[0.65rem]! *:leading-5!">
            <Badge
              text={member.status}
              type={member.status === "Active" ? "success" : "warning"}
            />
          </span>
        </span>
      }
      subtitle={member.email}
      footer={(close) => (
        <div className="flex items-center justify-end gap-2">
          <Button variant="secondary" onClick={close}>
            Close
          </Button>
          {canEdit && (
            <Button variant="primary" onClick={onEdit}>
              Edit Account Settings →
            </Button>
          )}
        </div>
      )}
    >
      <div className="space-y-4">
        {/* Member profile */}
        <section>
          <SectionHeading icon="👤">Member Profile</SectionHeading>
          <div
            className={`grid grid-cols-2 gap-3 rounded-xl bg-(--bg-surface-subtle) px-4 py-3 ${
              canEdit ? "sm:grid-cols-4" : "sm:grid-cols-3"
            }`}
          >
            <ProfileField label="Department">{department}</ProfileField>
            <ProfileField label="Role">{member.title}</ProfileField>
            {canEdit && (
              <ProfileField label="Access Level">
                {member.accessLevel ?? "—"}
              </ProfileField>
            )}
            <ProfileField label="Joined Date">
              {member.joinedDate ?? "—"}
            </ProfileField>
          </div>
        </section>

        {/* Usage telemetry */}
        <section>
          <SectionHeading icon="📊">Read-Only Usage Telemetry</SectionHeading>

          <div className="grid grid-cols-2 gap-y-3 rounded-xl border border-(--border-subtle) bg-(--bg-surface) py-3 sm:grid-cols-4">
            <Stat label="Queries" hint="Questions asked to the EKA chat">
              <span className="font-serif text-lg font-bold text-(--text-primary)">
                {member.queries ?? 0}
              </span>
            </Stat>

            <Stat label="Docs" hint="Documents uploaded by this member">
              <span className="font-serif text-lg font-bold text-(--primary)">
                {member.docs ?? 0}
              </span>
            </Stat>

            <Stat label="Searches" hint="Knowledge searches run by this member">
              <span className="font-serif text-lg font-bold text-(--text-primary)">
                {member.searches ?? 0}
              </span>
            </Stat>

            <Stat label="Active" hint="Last time this member used EKA">
              <span className="text-xs font-semibold text-(--status-success)">
                {member.lastActive ?? "Never"}
              </span>
            </Stat>
          </div>

          {/* Weekly query velocity */}
          <div className="mt-2.5 rounded-xl bg-(--bg-surface-subtle) px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <h4 className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.12em] text-(--text-muted)">
                Personal Query Velocity
              </h4>

              {weeks.length > 0 && (
                <p className="text-right font-mono text-[0.65rem] font-semibold text-(--primary)">
                  {buildCaption(weeks, activeIndex)}
                </p>
              )}
            </div>

            {weeks.length === 0 ? (
              <p className="py-4 text-center text-xs text-(--text-muted)">
                No activity yet
              </p>
            ) : (
              <>
                <div className="mt-3 flex h-[4.5rem] items-end border-b border-(--border-subtle)">
                  {weeks.map((value, index) => {
                    const isCurrent = index === lastIndex;
                    const isActive = index === hoveredIndex;
                    const barHeight = Math.max(
                      (value / maxValue) * BAR_MAX_HEIGHT,
                      4,
                    );

                    return (
                      <div
                        key={index}
                        tabIndex={0}
                        aria-label={`${weekName(index, lastIndex)}: ${formatQueries(value)}`}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onFocus={() => setHoveredIndex(index)}
                        onBlur={() => setHoveredIndex(null)}
                        className="flex h-full flex-1 cursor-default flex-col items-center justify-end gap-1 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-(--primary)/40"
                      >
                        <span className="font-mono text-[0.65rem] text-(--text-primary)">
                          {value}
                        </span>
                        <div
                          style={{ height: barHeight }}
                          className={`w-9 rounded-t-md transition-colors duration-150 ${
                            isCurrent
                              ? isActive
                                ? "bg-(--primary)/85"
                                : "bg-(--primary)"
                              : isActive
                                ? "bg-(--primary)/50"
                                : "bg-(--primary)/25"
                          }`}
                        />
                      </div>
                    );
                  })}
                </div>

                <div className="mt-1.5 flex">
                  {weeks.map((_, index) => (
                    <span
                      key={index}
                      className={`flex-1 text-center text-[0.65rem] font-semibold ${
                        index === lastIndex
                          ? "text-(--primary)"
                          : "text-(--text-muted)"
                      }`}
                    >
                      {weekName(index, lastIndex)}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </Modal>
  );
}

export default UserViewModal;