import { useCallback, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Download } from "lucide-react";
import "../styles/organization.css";
import Button from "../components/common/Button";
import ToastStack from "../components/common/Toast";
import OrganizationTabs from "../components/organization/OrganizationTabs";
import DepartmentManagementTab from "../components/organization/DepartmentManagementTab";
import DepartmentCreateModal from "../components/organization/DepartmentCreateModal";
import DepartmentEditModal from "../components/organization/DepartmentEditModal";
import DepartmentAssignLeadModal from "../components/organization/DepartmentAssignLeadModal";
import DepartmentDeleteModal from "../components/organization/DepartmentDeleteModal";
import { INITIAL_DEPARTMENTS, TEAM_MEMBERS, buildStructureCsv, getMember } from "../components/organization/OrganizationData";

const HEADERS = {
  departments: {
    eyebrow: "Organization structure & units",
    title: "Department Management",
    description: "Configure enterprise departments, designated Lead Managers, and scoped document ingestion authority.",
  },
  directory: {
    eyebrow: "Organization governance & RBAC",
    title: "Team Directory",
    description: "Manage team members, roles and department assignments.",
  },
};

export default function OrganizationPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab") === "directory" ? "directory" : "departments";
  // ↑ The tab lives in the URL (?tab=directory), so the Topbar can read it too.

  const [departments, setDepartments] = useState(INITIAL_DEPARTMENTS);
  const [modal, setModal] = useState(null); // { type: "create" | "edit" | "assign" | "delete", dept? }
  const [toasts, setToasts] = useState([]);
  const toastId = useRef(0);

  const pushToast = useCallback((message, tone = "success") => {
    toastId.current += 1;
    setToasts((prev) => [...prev.slice(-2), { id: toastId.current, message, tone }]);
  }, []);
  const dismissToast = useCallback((id) => setToasts((prev) => prev.filter((t) => t.id !== id)), []);
  const closeModal = useCallback(() => setModal(null), []);

  // The modal keeps its own copy of the department, so it stays on screen
  // while its exit animation plays, even after the department was deleted.
  const openModal = (type, id) => setModal({ type, dept: departments.find((d) => d.id === id) });

  const changeTab = (id) => setSearchParams(id === "departments" ? {} : { tab: id }, { replace: true });

  // The modals close themselves (with the exit animation) after these run.
  const handleCreate = (data) => {
    const dept = {
      id: `dept-${Date.now()}`, ...data, icon: "briefcase", tone: "indigo",
      members: data.leadId ? 1 : 0, docs: 0,
    };
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

  const exportCsv = () => {
    const url = URL.createObjectURL(new Blob([buildStructureCsv(departments)], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "eka-department-structure.csv";
    link.click();
    URL.revokeObjectURL(url);
    pushToast("📥 Structure exported as eka-department-structure.csv");
  };

  const header = HEADERS[tab];
  const activeDept = modal?.dept;

  return (
    <div className="organization-page mx-auto w-full max-w-[1400px] space-y-5">
<header className="org-rise flex flex-col items-start justify-between gap-4 px-2 py-3 lg:flex-row lg:items-end lg:gap-5">           
<div className="min-w-0 flex-1">
                  <p className="font-(family-name:--font-mono) text-xs font-medium uppercase tracking-[0.18em] text-(--text-eyebrow)">
            {header.eyebrow}
          </p>
          <h2 className="mt-1 font-(family-name:--font-serif) text-[30px] font-bold leading-tight tracking-tight text-(--text-primary) whitespace-normal lg:whitespace-nowrap">
            {header.title}
          </h2>
          <p className="mt-1 max-w-[56ch] text-sm text-(--text-secondary)">{header.description}</p>
        </div>

<div className="flex shrink-0 flex-wrap items-center gap-1.5">
  <OrganizationTabs value={tab} onChange={changeTab} />

  {tab === "departments" && (
    <>
      <Button
        variant="light"
        size="sm"
        icon={Download}
        onClick={exportCsv}
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
  )}
</div>
      </header>

      {tab === "departments" ? (
        <DepartmentManagementTab
          departments={departments}
          getLead={getMember}
          onCreate={() => setModal({ type: "create" })}
          onEdit={(id) => openModal("edit", id)}
          onDelete={(id) => openModal("delete", id)}
          onReassign={(id) => openModal("assign", id)}
          onViewDocs={(dept) => navigate("/documents", { state: { department: dept.name } })}
        />
      ) : (
        <div className="org-fade rounded-[20px] border border-dashed border-(--border-medium) bg-(--bg-surface) p-10 text-center">
          <p className="font-(family-name:--font-serif) text-[18px] font-bold text-(--text-primary)">Team Directory</p>
          <p className="mt-1 text-[12.5px] text-(--text-muted)">This tab is built next, from its own reference video.</p>
        </div>
      )}

      {modal?.type === "create" && (
        <DepartmentCreateModal members={TEAM_MEMBERS} onClose={closeModal} onSubmit={handleCreate} />
      )}
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
        <DepartmentDeleteModal
          dept={activeDept}
          lead={getMember(activeDept.leadId)}
          onClose={closeModal}
          onConfirm={() => handleDelete(activeDept)}
        />
      )}

      <ToastStack toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}