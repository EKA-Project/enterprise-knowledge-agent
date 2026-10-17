import DepartmentStatCards from "./DepartmentStatCards";
import DepartmentCard from "./DepartmentCard";

export default function DepartmentManagementTab({ departments, getLead, onCreate, onEdit, onDelete, onReassign, onViewDocs }) {
  return (
    <div className="space-y-5">
      <DepartmentStatCards departments={departments} />

      {departments.length === 0 ? (
        <div className="org-fade rounded-[20px] border border-dashed border-(--border-medium) bg-(--bg-surface) p-10 text-center">
          <p className="font-(family-name:--font-serif) text-[18px] font-bold text-(--text-primary)">No departments yet</p>
          <p className="mt-1 text-[12.5px] text-(--text-muted)">Create your first department to scope documents and managers.</p>
          <button
            type="button"
            onClick={onCreate}
            className="mt-4 rounded-full bg-(--primary) px-5 py-2 text-[13px] font-bold text-(--primary-contrast) transition hover:bg-(--primary-hover) active:scale-95"
          >
            + Create Department
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {departments.map((dept, i) => (
            <DepartmentCard
              key={dept.id}
              dept={dept}
              lead={getLead(dept.leadId)}
              delay={(i + 4) * 60}
              onEdit={() => onEdit(dept.id)}
              onDelete={() => onDelete(dept.id)}
              onReassign={() => onReassign(dept.id)}
              onViewDocs={() => onViewDocs(dept)}
            />
          ))}
        </div>
      )}
    </div>
  );
}