import CommonUserViewModal from "../common/UserViewModal";
import { getTelemetry } from "./OrganizationData";

// Organization wrapper around the shared UserViewModal.
// Keeps the old props (user, onClose, onEdit) and translates the user object
// into the shape the common modal expects.
export default function UserViewModal({ user, onClose, onEdit }) {
  const t = getTelemetry(user);

  const member = {
    name: user.name,
    email: user.email,
    status: user.status,
    title: user.role,
    accessLevel: user.access,
    joinedDate: user.joined,
    lastActive: user.lastActive,
    queries: t.total,
    docs: t.docs,
    searches: t.searches,
    weeklyQueries: t.weeks,
  };

  return (
    <CommonUserViewModal
      member={member}
      department={user.department}
      canEdit
      onClose={onClose}
      onEdit={onEdit}
    />
  );
}