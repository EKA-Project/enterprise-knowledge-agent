import { useCallback, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Download, Plus } from "lucide-react";
import "../styles/organization.css";
import PageHero from "../components/common/PageHero";
import Button from "../components/common/Button";
import Tooltip from "../components/common/Tooltip";
import useToast from "../hooks/useToast.js";
import OrganizationTabs from "../components/organization/OrganizationTabs";
import DepartmentManagementTab from "../components/organization/Department/DepartmentManagementTab.jsx";
import DepartmentCreateModal from "../components/organization/Department/DepartmentCreateModal.jsx";
import DepartmentEditModal from "../components/organization/Department/DepartmentEditModal.jsx";
import DepartmentAssignLeadModal from "../components/organization/Department/DepartmentAssignLeadModal.jsx";
import DepartmentDeleteModal from "../components/organization/Department/DepartmentDeleteModal.jsx";
import UserManagementTab from "../components/organization/TeamDirectory/UserManagementTab.jsx";
import UserInviteModal from "../components/organization/TeamDirectory/UserInviteModal.jsx";
import UserViewModal from "../components/organization/TeamDirectory/UserViewModal.jsx";
import UserEditModal from "../components/organization/TeamDirectory/UserEditModal.jsx";
import UserTerminateModal from "../components/organization/TeamDirectory/UserTerminateModal";
import {  STATUS_LABELS, buildStructureCsv, buildUsersCsv, toUserRow } from "../components/organization/OrganizationData";
import useApi from "../hooks/useApi.js";
import { getDepartments, assignManager, updateDepartment, createDepartment, deleteDepartment } from "../services/departmentService.js";
import { getUsers, createUser, updateUser, deactivateUser, reactivateUser } from "../services/userService.js";
const HEADERS = {
  departments: {
    eyebrow: "Organization structure & units",
    title: "Department Management",
    description: "Configure enterprise departments, designated Lead Managers, and scoped document ingestion authority.",
  },
  directory: {
    eyebrow: "Organization directory",
    title: "User Management",
    description: "Manage team roles and account statuses.",
  },
};

function download(text, filename) {
  const url = URL.createObjectURL(new Blob([text], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export default function OrganizationPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab") === "directory" ? "directory" : "departments";
  // ↑ The tab lives in the URL (?tab=directory), so the Topbar can read it too.
  // Everything comes from the services. useApi re-fetches when the role changes,
  // and reload() re-reads after a write.
  const { data, loading, error, reload } = useApi(async () => {
    const [departments, users] = await Promise.all([getDepartments(), getUsers()]);
    return { departments, users };
  });
  const departments = data?.departments ?? [];
  const rawUsers = data?.users ?? [];
  // The directory table, filters and dialogs work with display rows (names and labels).
  const users = useMemo(() => rawUsers.map((u) => toUserRow(u, departments)), [rawUsers, departments]);

  // The department's manager is a user (service shape, not a display row).
  const getLead = (id) => rawUsers.find((u) => u.id === id) ?? null;
  // Who the service will accept as this department's manager. The modal's option
  // text reads m.role and m.department, so those are filled in here.
  const managerCandidates = (dept) =>
    rawUsers
      .filter((u) => u.role === "manager" && u.departmentId === dept.id && u.status === "active")
      .map((u) => ({ ...u, role: "Manager", department: dept.name }));
  // The dialogs work with names; the services work with ids.
  const deptIdByName = (name) => departments.find((d) => d.name === name)?.id;
  const [modal, setModal] = useState(null);

  const toast = useToast();
  // Keeps the old pushToast(message, tone) calls working with the shared toast.
  const pushToast = useCallback(
    (message, tone = "success") => {
      const type = tone === "error" || tone === "info" ? tone : "success";
      toast[type](message);
    },
    [toast],
  );
  const closeModal = useCallback(() => setModal(null), []);

  // Dialogs keep their own copy, so they stay on screen while their exit animation plays.
  const openDeptModal = (type, id) => setModal({ type, dept: departments.find((d) => d.id === id) });
  const openUserModal = (type, id) => setModal({ type, user: users.find((u) => u.id === id) });

  const changeTab = (id) => setSearchParams(id === "departments" ? {} : { tab: id }, { replace: true });
  // After a successful write: close any dialog, re-read from the services, say so.
  const finish = (message, tone) => {
    closeModal();
    reload();
    pushToast(message, tone);
  };
  const fail = (e) => pushToast(e.message, "error"); // 403 non-admin, 409 conflict, 422 invalid

  // ---------- Departments ----------
  const handleCreate = async (data) => {
    try {
      await createDepartment(data);
      finish(`🏢 Department "${data.name}" created successfully!`);
    } catch (e) {
      fail(e);
    }
  };
  const handleEdit = async (id, data) => {
    try {
      await updateDepartment(id, data);
      finish(`✏️ Updated department "${data.name}"`);
    } catch (e) {
      fail(e);
    }
  };
  const handleAssign = async (dept, userId) => {
    try {
      await assignManager(dept.id, userId);
      finish(`👤 Assigned Manager to ${dept.name}`);
    } catch (e) {
      fail(e);
    }
  };
  const handleDelete = async (dept, moveToId) => {
    try {
      const { movedUsers, movedDocuments } = await deleteDepartment(dept.id, moveToId);
      const moved = movedUsers || movedDocuments ? ` (${movedUsers} member(s), ${movedDocuments} document(s) moved)` : "";
      finish(`🗑️ Deleted department "${dept.name}"${moved}`, "info");
    } catch (e) {
      fail(e);
    }
  };
  const exportStructureCsv = () => {
    download(buildStructureCsv(departments, getLead), "eka-department-structure.csv");
    pushToast("📥 Structure exported as eka-department-structure.csv");
  };

  // ---------- Team directory ----------
  const handleInvite = async (data) => {
    try {
      await createUser({
        name: data.name,
        email: data.email,
        role: data.role.toLowerCase(),
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
  const exportUsersCsv = () => {
    download(buildUsersCsv(users), `eka_team_directory_${new Date().toISOString().slice(0, 10)}.csv`);
    pushToast("📥 Exported Team Directory CSV");
  };

  if (loading) return <p className="p-6 text-(--text-muted)">Loading organization…</p>;
  if (error) return <p className="p-6 text-(--status-danger)">Could not load: {error.message}</p>;
  const header = HEADERS[tab];
  const { dept: activeDept, user: activeUser } = modal ?? {};
  const departmentNames = departments.map((d) => d.name);

  return (
    <div className="organization-page mx-auto w-full max-w-[1400px] space-y-5">
      <div className="org-rise">
        <PageHero
          eyebrow={header.eyebrow}
          title={header.title}
          description={header.description}
          actions={
            <>
              <OrganizationTabs value={tab} onChange={changeTab} />
              {tab === "departments" ? (
                <>
                  <Button variant="light" size="sm" icon={Download} onClick={exportStructureCsv}>
                    Export Structure CSV
                  </Button>
                  <Button variant="solid" size="sm" icon={Plus} iconChip onClick={() => setModal({ type: "create" })}>
                    Create Department
                  </Button>
                </>
              ) : (
                <>
                  <Tooltip label="Export Directory to CSV format">
                    <Button variant="light" size="sm" icon={Download} onClick={exportUsersCsv}>
                      Export Directory CSV
                    </Button>
                  </Tooltip>
                  <Button variant="solid" size="sm" icon={Plus} iconChip onClick={() => setModal({ type: "invite" })}>
                    Invite New Member
                  </Button>
                </>
              )}
            </>
          }
        />
      </div>

      {tab === "departments" ? (
        <DepartmentManagementTab
          departments={departments}
          getLead={getLead}
          onCreate={() => setModal({ type: "create" })}
          onEdit={(id) => openDeptModal("edit", id)}
          onDelete={(id) => openDeptModal("delete", id)}
          onReassign={(id) => openDeptModal("assign", id)}
          onViewDocs={(dept) => navigate("/documents", { state: { department: dept.name } })}
        />
      ) : (
        <UserManagementTab
          users={users}
          departments={departments}
          onView={(id) => openUserModal("view", id)}
          onEdit={(id) => openUserModal("user-edit", id)}
          onTerminate={(id) => openUserModal("terminate", id)}
          onReactivate={handleReactivate}
        />
      )}

      {/* ----- Department dialogs ----- */}
      {modal?.type === "create" && <DepartmentCreateModal onClose={closeModal} onSubmit={handleCreate} />}
      {modal?.type === "edit" && activeDept && (
        <DepartmentEditModal initial={activeDept} onClose={closeModal} onSubmit={(data) => handleEdit(activeDept.id, data)} />
      )}
      {modal?.type === "assign" && activeDept && (
        <DepartmentAssignLeadModal
          dept={activeDept}
          currentLead={getLead(activeDept.managerId)}
          members={managerCandidates(activeDept)}
          onClose={closeModal}
          onConfirm={(memberId) => handleAssign(activeDept, memberId)}
        />
      )}
      {modal?.type === "delete" && activeDept && (
        <DepartmentDeleteModal dept={activeDept} lead={getLead(activeDept.managerId)} onClose={closeModal} targets={departments.filter((d) => d.id !== activeDept.id)}
          onConfirm={(moveToId) => handleDelete(activeDept, moveToId)}/>
      )}

      {/* ----- User dialogs ----- */}
      {modal?.type === "invite" && (
        <UserInviteModal
          departmentNames={departmentNames}
          existingEmails={users.map((u) => u.email.toLowerCase())}
          onClose={closeModal}
          onSubmit={handleInvite}
        />
      )}
      {modal?.type === "view" && activeUser && (
        <UserViewModal user={activeUser} onClose={closeModal} onEdit={() => setModal({ type: "user-edit", user: activeUser })} />
      )}
      {modal?.type === "user-edit" && activeUser && (
        <UserEditModal user={activeUser} departmentNames={departmentNames} onClose={closeModal} onSubmit={(patch) => handleUserEdit(activeUser.id, patch)} />
      )}
      {modal?.type === "terminate" && activeUser && (
        <UserTerminateModal user={activeUser} onClose={closeModal} onConfirm={() => handleTerminate(activeUser)} />
      )}
    </div>
  );
}