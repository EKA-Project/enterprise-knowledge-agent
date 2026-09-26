import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout.jsx";
import { AuthProvider } from "../context/AuthContext.jsx";
import RoleGuard from "../components/common/RoleGuard.jsx";

// Auth pages
import LandingPage from "../pages/auth/LandingPage";
import SignupChoicePage from "../pages/auth/signup/SignupChoicePage";
import EmployeeJoinMethodPage from "../pages/auth/signup/employee/EmployeeJoinMethodPage";
import EmployeeInvitePreviewPage from "../pages/auth/signup/employee/EmployeeInvitePreviewPage";
import EmployeeEnterpriseFoundPage from "../pages/auth/signup/employee/EmployeeEnterpriseFoundPage";
import EmployeePendingApprovalPage from "../pages/auth/signup/employee/EmployeePendingApprovalPage";
import EmployeeCreateAccountPage from "../pages/auth/signup/employee/EmployeeCreateAccountPage";
import AdminAccountPage from "../pages/auth/signup/admin/AdminAccountPage";
import AdminEnterpriseInitializedPage from "../pages/auth/signup/admin/AdminEnterpriseInitializedPage";
import AdminEnterpriseProfilePage from "../pages/auth/signup/admin/AdminEnterpriseProfilePage";
import LoginPage from "../pages/auth/LoginPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import AdminInviteMembersPage from "../pages/auth/signup/admin/AdminInviteMembersPage";

// EKA pages
import Dashboard from "../pages/Dashboard.jsx";
// ...other EKA pages

function AppRoutes() {
  return (
    <Routes>
      {/* Redirect the root URL to the main dashboard. */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Public / authentication routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupChoicePage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Other signup routes */}
      <Route path="/signup/Join" element={<EmployeeJoinMethodPage />} />
      <Route
        path="/signup/invite-preview"
        element={<EmployeeInvitePreviewPage />}
      />
      <Route
        path="/signup/enterprise-found"
        element={<EmployeeEnterpriseFoundPage />}
      />
      <Route
        path="/signup/request-sent"
        element={<EmployeePendingApprovalPage />}
      />
      <Route
        path="/signup/create-account"
        element={<EmployeeCreateAccountPage />}
      />
      <Route path="/signup/admin/account" element={<AdminAccountPage />} />
      <Route
        path="/signup/admin/enterprise"
        element={<AdminEnterpriseInitializedPage />}
      />
      <Route
        path="/signup/admin/confirmation"
        element={<AdminEnterpriseProfilePage />}
      />
      <Route
        path="/signup/admin/invite"
        element={<AdminInviteMembersPage />}
      />

      {/* EKA application */}
      <Route element={<AuthProvider><AppLayout /></AuthProvider>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ask-eka" element={<h1>Ask EKA</h1>} />
        <Route path="/knowledge-base" element={<h1>Knowledge Base</h1>} />
        <Route path="/documents" element={<h1>Documents</h1>} />
        <Route path="/semantic-search" element={<h1>Semantic Search</h1>} />
        <Route path="/analytics" element={<RoleGuard allowedRoles={["Admin"]}><h1>Analytics</h1></RoleGuard>} />
        <Route path="/organization" element={<RoleGuard allowedRoles={["Admin"]}><h1>Organization</h1></RoleGuard>} />
        <Route path="/settings" element={<h1>Settings</h1>} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
