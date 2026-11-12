import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Download, Plus } from "lucide-react";
import "../styles/organization.css";
import PageHero from "../components/common/PageHero";
import Button from "../components/common/Button";
import Tooltip from "../components/common/Tooltip";
import useToast from "../hooks/useToast.js";
import OrganizationTabs from "../components/organization/OrganizationTabs";
import DepartmentManagementTab from "../components/organization/DepartmentManagementTab";
import DepartmentCreateModal from "../components/organization/DepartmentCreateModal";
import DepartmentEditModal from "../components/organization/DepartmentEditModal";
import DepartmentAssignLeadModal from "../components/organization/DepartmentAssignLeadModal";
import DepartmentDeleteModal from "../components/organization/DepartmentDeleteModal";
import UserManagementTab from "../components/organization/UserManagementTab";
import UserInviteModal from "../components/organization/UserInviteModal";
import UserViewModal from "../components/organization/UserViewModal";
import UserEditModal from "../components/organization/UserEditModal";
import UserTerminateModal from "../components/organization/UserTerminateModal";
import { buildStructureCsv, buildUsersCsv, toUserRow } from "../components/organization/OrganizationData";
import useApi from "../hooks/useApi.js";
import { getDepartments, assignManager, updateDepartment, createDepartment } from "../services/departmentService.js";
import { getUsers } from "../services/userService.js";

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

const todayLabel = () => new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

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

  // Read from the services. useApi re-fetches when the role changes.
    const { data, loading, error, reload } = useApi(async () => {
      const [departments, users] = await Promise.all([getDepartments(), getUsers()]);
    return { departments, users };
  });

  // TEMP bridge: local copies so the old write handlers keep working until
  // each one is moved to a service (Step 3 onwards).
  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (data) {
      setDepartments(data.departments);
      setUsers(data.users.map((u) => toUserRow(u, data.departments)));
    }
  }, [data]);

  
  const rawUsers = data?.users ?? [];
  // replaces getMember(): the department's manager is a user
  const getLead = (id) => rawUsers.find((u) => u.id === id) ?? null;
  // Who the service will accept as this department's manager. The modal's
  // option text reads m.role and m.department, so those are filled in here.
  const managerCandidates = (dept) =>
    rawUsers
      .filter((u) => u.role === "manager" && u.departmentId === dept.id && u.status === "active")
      .map((u) => ({ ...u, role: "Manager", department: dept.name }));
  // modal: { type: "create" | "edit" | "assign" | "delete" | "invite" | "view" | "user-edit" | "terminate", dept?, user? }
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

  // ---------- Departments ----------
  const handleCreate = async (data) => {
    try {
      await createDepartment(data);
      reload();
      pushToast(`🏢 Department "${data.name}" created successfully!`);
    } catch (e) {
      pushToast(e.message, "error"); // 403 for non-admins, 409 if the name or code exists
    }
  };
   const handleEdit = async (id, data) => {
    try {
      await updateDepartment(id, data);
      reload();
      pushToast(`✏️ Updated department "${data.name}"`);
    } catch (e) {
      pushToast(e.message, "error");
    }
  };
  const handleAssign = async (dept, userId) => {
    try {
      await assignManager(dept.id, userId);
      reload(); // re-reads departments and users from the service
      pushToast(`👤 Assigned Manager to ${dept.name}`);
    } catch (e) {
      pushToast(e.message, "error"); // e.g. 403 when the role is not Admin
    }
  };
  const handleDelete = (dept) => {
    setDepartments((prev) => prev.filter((d) => d.id !== dept.id));
    pushToast(`🗑️ Deleted department "${dept.name}"`, "info");
  };
  const exportStructureCsv = () => {
    download(buildStructureCsv(departments, getLead), "eka-department-structure.csv");
    pushToast("📥 Structure exported as eka-department-structure.csv");
  };

  // ---------- Team directory ----------
  const handleInvite = (data) => {
    const user = { id: `user-${Date.now()}`, ...data, status: "Active", lastActive: "Just now", joined: todayLabel(), leadOf: null, telemetry: null };
    setUsers((prev) => [...prev, user]);
    pushToast(`📨 Invitation sent to ${data.email}`);
  };
  const handleUserEdit = (id, patch) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== id) return u;
        const next = { ...u, ...patch };
        if (next.role !== "Manager" || next.department !== u.department) next.leadOf = null;
        return next;
      }),
    );
    pushToast("User settings updated successfully");
  };
  const handleTerminate = (user) => {
    setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, status: "Terminated" } : u)));
    pushToast(`🚫 Terminated ${user.name}'s account`, "info");
  };
  const handleReactivate = (id) => {
    const user = users.find((u) => u.id === id);
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status: "Active" } : u)));
    pushToast(`✅ Re-activated ${user.name}`);
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
        <DepartmentDeleteModal dept={activeDept} lead={getLead(activeDept.managerId)} onClose={closeModal} onConfirm={() => handleDelete(activeDept)} />
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