import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext.jsx";

function RoleGuard({ allowedRoles, children }) {
  const { activeRole } = useContext(AuthContext);

  if (!activeRole || !allowedRoles.includes(activeRole)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default RoleGuard;