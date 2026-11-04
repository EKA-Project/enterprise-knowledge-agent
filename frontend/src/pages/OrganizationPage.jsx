import { useCallback, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Download, Plus } from "lucide-react";
import "../styles/organization.css";
import Button from "../components/common/Button";
import Tooltip from "../components/common/Tooltip";
import ToastStack from "../components/common/Toast";
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
import {
  INITIAL_DEPARTMENTS, INITIAL_USERS, TEAM_MEMBERS,
  buildStructureCsv, buildUsersCsv, getMember,
} from "../components/organization/OrganizationData";

const HEADERS = {
  departments: {
    eyebrow: "Organization structure & units",
    title: "Department Management",
    description: "Configure enterprise departments, designated Lead Managers, and scoped document ingestion authority.",
  },
  directory: {
    eyebrow: "Organization directory",
    title: "User Management",
    description: "Manage team roles, access levels (Basic, Restricted, Admin), and account statuses.",
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

  const [departments, setDepartments] = useState(INITIAL_DEPARTMENTS);
  const [users, setUsers] = useState(INITIAL_USERS);
  // modal: { type: "create" | "edit" | "assign" | "delete" | "invite" | "view" | "user-edit" | "terminate", dept?, user? }
  const [modal, setModal] = useState(null);
  const [toasts, setToasts] = useState([]);
  const toastId = useRef(0);

  const pushToast = useCallback((message, tone = "success") => {
    toastId.current += 1;
    setToasts((prev) => [...prev.slice(-2), { id: toastId.current, message, tone }]);
  }, []);
  const dismissToast = useCallback((id) => setToasts((prev) => prev.filter((t) => t.id !== id)), []);
  const closeModal = useCallback(() => setModal(null), []);

  // Dialogs keep their own copy, so they stay on screen while their exit animation plays.
  const openDeptModal = (type, id) => setModal({ type, dept: departments.find((d) => d.id === id) });
  const openUserModal = (type, id) => setModal({ type, user: users.find((u) => u.id === id) });

  const changeTab = (id) => setSearchParams(id === "departments" ? {} : { tab: id }, { replace: true });

  // ---------- Departments ----------
  const handleCreate = (data) => {
    const dept = { id: `dept-${Date.now()}`, ...data, icon: "briefcase", tone: "indigo", members: data.leadId ? 1 : 0, docs: 0 };
    setDepartments((prev) => [...prev, dept]);
    pushToast(`🏢 Department "${data.name}" created successfully!`);
  };
  const handleEdit = (id, data) => {
    setDepartments((prev) => prev.map((d) => (d.id === id ? { ...d, ...data, leadId: d.leadId } : d)));
    pushToast(`✏️ Updated department "${data.name}"`);
  };
  const handleAssign = (dept, memberId) => {
    setDepartments((prev) => prev.map((d) => (d.id === dept.id ? { ...d, leadId: memberId } : d)));
    pushToast(`👤 Assigned Manager to ${dept.name}`);
  };
  const handleDelete = (dept) => {
    setDepartments((prev) => prev.filter((d) => d.id !== dept.id));
    pushToast(`🗑️ Deleted department "${dept.name}"`, "info");
  };
  const exportStructureCsv = () => {
    download(buildStructureCsv(departments), "eka-department-structure.csv");
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
    pushToast("User settings & access level updated successfully");
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

  const header = HEADERS[tab];
  const { dept: activeDept, user: activeUser } = modal ?? {};
  const departmentNames = departments.map((d) => d.name);

  return (
    <div className="organization-page mx-auto w-full max-w-[1400px] space-y-5">
<header className="org-rise flex flex-col gap-4 px-2 py-3 lg:flex-row lg:items-end lg:justify-between lg:gap-4">  {/* Page title and description */}
  <div className="min-w-0 flex-1">
    <p className="font-(family-name:--font-mono) text-xs font-medium uppercase tracking-[0.18em] text-(--text-eyebrow)">
      {header.eyebrow}
    </p>

    <h2 className="mt-1 whitespace-normal font-(family-name:--font-serif) text-[30px] font-bold leading-tight tracking-tight text-(--text-primary) lg:whitespace-nowrap">
      {header.title}
    </h2>

    <p className="mt-1 max-w-[56ch] text-sm text-(--text-secondary)">
      {header.description}
    </p>
  </div>

  {/* Tabs and action buttons */}
  <div className="flex shrink-0 flex-wrap items-center gap-1.5">
    <OrganizationTabs value={tab} onChange={changeTab} />

    {tab === "departments" ? (
      <>
        <Button
          variant="light"
          size="sm"
          icon={Download}
          onClick={exportStructureCsv}
        >
          Export Structure CSV
        </Button>

        <Button
          variant="solid"
          size="sm"
          onClick={() => setModal({ type: "create" })}
        >
          + Create Department
        </Button>
      </>
    ) : (
      <>
        <Tooltip label="Export Directory to CSV format">
          <Button
            variant="light"
            size="sm"
            icon={Download}
            onClick={exportUsersCsv}
          >
            Export Directory CSV
          </Button>
        </Tooltip>

        <Button
          variant="solid"
          size="sm"
          icon={Plus}
          iconChip
          onClick={() => setModal({ type: "invite" })}
        >
          Invite New Member
        </Button>
      </>
    )}
  </div>
</header>


      {tab === "departments" ? (
        <DepartmentManagementTab
          departments={departments}
          getLead={getMember}
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
      {modal?.type === "create" && <DepartmentCreateModal members={TEAM_MEMBERS} onClose={closeModal} onSubmit={handleCreate} />}
      {modal?.type === "edit" && activeDept && (
        <DepartmentEditModal initial={activeDept} onClose={closeModal} onSubmit={(data) => handleEdit(activeDept.id, data)} />
      )}
      {modal?.type === "assign" && activeDept && (
        <DepartmentAssignLeadModal
          dept={activeDept}
          currentLead={getMember(activeDept.leadId)}
          members={TEAM_MEMBERS}
          onClose={closeModal}
          onConfirm={(memberId) => handleAssign(activeDept, memberId)}
        />
      )}
      {modal?.type === "delete" && activeDept && (
        <DepartmentDeleteModal dept={activeDept} lead={getMember(activeDept.leadId)} onClose={closeModal} onConfirm={() => handleDelete(activeDept)} />
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

      <ToastStack toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}