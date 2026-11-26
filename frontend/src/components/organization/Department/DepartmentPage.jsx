import { useNavigate } from "react-router-dom";
import DepartmentManagementTab from "./DepartmentManagementTab.jsx";
import DepartmentFormModal from "./DepartmentFormModal";
import DepartmentAssignLeadModal from "./DepartmentAssignLeadModal.jsx";
import DepartmentDeleteModal from "./DepartmentDeleteModal.jsx";
import {
  assignManager,
  updateDepartment,
  createDepartment,
  deleteDepartment,
} from "../../../services/departmentService.js";

export default function DepartmentPage({
  departments,
  rawUsers,
  getLead,
  modal,
  setModal,
  closeModal,
  finish,
  fail,
}) {
  const navigate = useNavigate();
  const activeDept = modal?.dept;

  // Who the service will accept as this department's manager.
  const managerCandidates = (dept) =>
    rawUsers
      .filter((u) => u.role === "manager" && u.departmentId === dept.id && u.status === "active")
      .map((u) => ({ ...u, role: "Manager", department: dept.name }));

  const openDeptModal = (type, id) => setModal({ type, dept: departments.find((d) => d.id === id) });

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

  return (
    <>
      <DepartmentManagementTab
        departments={departments}
        getLead={getLead}
        onCreate={() => setModal({ type: "create" })}
        onEdit={(id) => openDeptModal("edit", id)}
        onDelete={(id) => openDeptModal("delete", id)}
        onReassign={(id) => openDeptModal("assign", id)}
        onViewDocs={(dept) => navigate("/documents", { state: { department: dept.name } })}
      />

      {modal?.type === "create" && (
        <DepartmentFormModal mode="create" onClose={closeModal} onSubmit={handleCreate} />
      )}
      {modal?.type === "edit" && activeDept && (
        <DepartmentFormModal
          mode="edit"
          initial={activeDept}
          onClose={closeModal}
          onSubmit={(data) => handleEdit(activeDept.id, data)}
        />
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
        <DepartmentDeleteModal
          dept={activeDept}
          lead={getLead(activeDept.managerId)}
          targets={departments.filter((d) => d.id !== activeDept.id)}
          onClose={closeModal}
          onConfirm={(moveToId) => handleDelete(activeDept, moveToId)}
        />
      )}
    </>
  );
}