import { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Plus } from "lucide-react";
import "../styles/organization.css";
import pageMetadata from "../config/pageMetadata";
import PageHero from "../components/common/PageHero";
import Button from "../components/common/Button";
import Tooltip from "../components/common/Tooltip";
import useToast from "../hooks/useToast.js";
import { ExportAuditButton } from "../components/common/ActionButtons";
import OrganizationTabs from "../components/organization/OrganizationTabs";
import DepartmentPage from "../components/organization/Department/DepartmentPage.jsx";
import TeamDirectoryPage from "../components/organization/TeamDirectory/TeamDirectoryPage.jsx";
import { buildStructureCsv, buildUsersCsv, toUserRow } from "../components/organization/OrganizationData";
import useApi from "../hooks/useApi.js";
import { getDepartments } from "../services/departmentService.js";
import { getUsers } from "../services/userService.js";

const HEADERS = {
  departments: pageMetadata.organizationDepartments,
  directory: pageMetadata.organizationDirectory.admin,
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
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab") === "directory" ? "directory" : "departments";

  const { data, loading, error, reload } = useApi(async () => {
    const [departments, users] = await Promise.all([getDepartments(), getUsers()]);
    return { departments, users };
  });
  const departments = data?.departments ?? [];
  const rawUsers = data?.users ?? [];
  const users = useMemo(() => rawUsers.map((u) => toUserRow(u, departments)), [rawUsers, departments]);
  const getLead = (id) => rawUsers.find((u) => u.id === id) ?? null;

  const [modal, setModal] = useState(null);
  const closeModal = useCallback(() => setModal(null), []);

  const toast = useToast();
  const pushToast = useCallback(
    (message, tone = "success") => {
      const type = tone === "error" || tone === "info" ? tone : "success";
      toast[type](message);
    },
    [toast],
  );

  // After a successful write: close any dialog, re-read from the services, say so.
  const finish = (message, tone) => {
    closeModal();
    reload();
    pushToast(message, tone);
  };
  const fail = (e) => pushToast(e.message, "error");

  const changeTab = (id) => setSearchParams(id === "departments" ? {} : { tab: id }, { replace: true });

  const exportStructureCsv = () => {
    download(buildStructureCsv(departments, getLead), "eka-department-structure.csv");
    pushToast("📥 Structure exported as eka-department-structure.csv");
  };
  const exportUsersCsv = () => {
    download(buildUsersCsv(users), `eka_team_directory_${new Date().toISOString().slice(0, 10)}.csv`);
    pushToast("📥 Exported Team Directory CSV");
  };

  if (loading) return <p className="p-6 text-(--text-muted)">Loading organization…</p>;
  if (error) return <p className="p-6 text-(--status-danger)">Could not load: {error.message}</p>;

  const header = HEADERS[tab];
  const shared = { modal, setModal, closeModal, finish, fail };

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
                  <ExportAuditButton onClick={exportStructureCsv} title="Export department structure (CSV)">
                    Export Structure CSV
                  </ExportAuditButton>
                  <Button variant="solid" size="sm" icon={Plus} iconChip onClick={() => setModal({ type: "create" })}>
                    Create Department
                  </Button>
                </>
              ) : (
                <>
                  <Tooltip label="Export Directory to CSV format">
                    <ExportAuditButton onClick={exportUsersCsv} title="">
                      Export Directory CSV
                    </ExportAuditButton>
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
        <DepartmentPage departments={departments} rawUsers={rawUsers} getLead={getLead} {...shared} />
      ) : (
        <TeamDirectoryPage users={users} departments={departments} {...shared} />
      )}
    </div>
  );
}