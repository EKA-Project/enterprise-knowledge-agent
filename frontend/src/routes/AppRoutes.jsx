// AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/auth/LandingPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
}