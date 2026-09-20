// AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/auth/LandingPage';
import SignupChoicePage from '../pages/auth/signup/SignupChoicePage';
import EmployeeJoinMethodPage from '../pages/auth/signup/employee/EmployeeJoinMethodPage';
import EmployeeInvitePreviewPage from '../pages/auth/signup/employee/EmployeeInvitePreviewPage';
import EmployeeEnterpriseFoundPage from '../pages/auth/signup/employee/EmployeeEnterpriseFoundPage';
import EmployeePendingApprovalPage from '../pages/auth/signup/employee/EmployeePendingApprovalPage';
import EmployeeCreateAccountPage from '../pages/auth/signup/employee/EmployeeCreateAccountPage';
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {<Route path="/signup" element={<SignupChoicePage />} /> }
      <Route path="/signup/Join" element={<EmployeeJoinMethodPage />} />
      <Route path="/signup/invite-preview" element={<EmployeeInvitePreviewPage />} />
      <Route path="/signup/enterprise-found" element={<EmployeeEnterpriseFoundPage />} />
      <Route path="/signup/request-sent" element={<EmployeePendingApprovalPage />} />
      <Route path="/signup/create-account" element={<EmployeeCreateAccountPage />} />
    </Routes>
  );
}