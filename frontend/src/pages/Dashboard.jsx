import { useContext } from "react";
import AuthContext from "../context/AuthContext.jsx";

import AdminOverview from "../components/dashboard/admin/AdminOverview.jsx";
import ManagerOverview from "../components/dashboard/manager/ManagerOverview.jsx";
import EmployeeOverview from "../components/dashboard/employee/EmployeeOverview.jsx";

function Dashboard() {
  const { activeRole } = useContext(AuthContext);

  const roleComponents = {
    Admin: AdminOverview,
    Manager: ManagerOverview,
    Employee: EmployeeOverview,
  };

  const OverviewComponent = roleComponents[activeRole] || EmployeeOverview;

  return <OverviewComponent />;
}

export default Dashboard;