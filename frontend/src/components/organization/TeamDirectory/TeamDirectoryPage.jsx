import UserManagementTab from "./UserManagementTab.jsx";
import InviteMemberModal from "../../common/InviteMemberModal.jsx";
import UserEditModal from "./UserEditModal.jsx";
import CommonUserViewModal from "../../common/UserViewModal";
import TerminateMemberModal from "../../common/TerminateMemberModal";
import { STATUS_LABELS, getTelemetry } from "../OrganizationData";
import { createUser, updateUser, deactivateUser, reactivateUser } from "../../../services/userService.js";

export default function TeamDirectoryPage({
  users,
  departments,
  modal,
  setModal,
  closeModal,
  finish,
  fail,
}) {
  const activeUser = modal?.user;
  const departmentNames = departments.map((d) => d.name);
  const deptIdByName = (name) => departments.find((d) => d.name === name)?.id;
  const toViewMember = (user) => {
  const t = getTelemetry(user);
  return {
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
  };
  const openUserModal = (type, id) => setModal({ type, user: users.find((u) => u.id === id) });

  const handleInvite = async (data) => {
    try {
      await createUser({
        name: data.name,
        email: data.email,
        role: "employee",
        departmentId: deptIdByName(data.department),
      });
      finish(`📨 ${data.name} added to ${data.department}`);
    } catch (e) {
      fail(e);
    }
  };
  const handleUserEdit = async (id, patch) => {
    const current = users.find((u) => u.id === id);
    try {
      await updateUser(id, { role: patch.role.toLowerCase(), departmentId: deptIdByName(patch.department) });
      if (patch.status !== current.status) {
        await (patch.status === STATUS_LABELS.inactive ? deactivateUser(id) : reactivateUser(id));
      }
      finish("User updated successfully");
    } catch (e) {
      fail(e);
    }
  };
  const handleTerminate = async (user) => {
    try {
      await deactivateUser(user.id);
      finish(`🚫 Terminated ${user.name}'s account`, "info");
    } catch (e) {
      fail(e); // 409 if they manage a department
    }
  };
  const handleReactivate = async (id) => {
    const user = users.find((u) => u.id === id);
    try {
      await reactivateUser(id);
      finish(`✅ Re-activated ${user.name}`);
    } catch (e) {
      fail(e);
    }
  };

  return (
    <>
      <UserManagementTab
        users={users}
        departments={departments}
        onView={(id) => openUserModal("view", id)}
        onEdit={(id) => openUserModal("user-edit", id)}
        onTerminate={(id) => openUserModal("terminate", id)}
        onReactivate={handleReactivate}
      />

      {modal?.type === "invite" && (
          <InviteMemberModal
          departmentNames={departmentNames}
          onClose={closeModal}
          onInvite={handleInvite}
        />
      )}
      {modal?.type === "view" && activeUser && (
      <CommonUserViewModal
        member={toViewMember(activeUser)}
        department={activeUser.department}
        canEdit
        onClose={closeModal}
        onEdit={() => setModal({ type: "user-edit", user: activeUser })}
      />
      )}
      {modal?.type === "user-edit" && activeUser && (
        <UserEditModal
          user={activeUser}
          departmentNames={departmentNames}
          onClose={closeModal}
          onSubmit={(patch) => handleUserEdit(activeUser.id, patch)}
        />
      )}
      {modal?.type === "terminate" && activeUser && (
      <TerminateMemberModal
        member={{
        name: activeUser.name,
        email: activeUser.email,
        title: activeUser.title ?? activeUser.role,
        status: activeUser.status,
        }}
        department={activeUser.department}
        onClose={closeModal}
        onConfirm={() => handleTerminate(activeUser)}
      />
    )}
    </>
  );
}