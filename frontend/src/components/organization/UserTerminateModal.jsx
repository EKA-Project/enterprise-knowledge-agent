import TerminateMemberModal from "../common/TerminateMemberModal";

export default function UserTerminateModal({ user, onClose, onConfirm }) {
  return (
    <TerminateMemberModal
      member={{
        name: user.name,
        email: user.email,
        title: user.title ?? user.role,
        status: user.status,
      }}
      department={user.department}
      onClose={onClose}
      onConfirm={() => onConfirm()}
    />
  );
}