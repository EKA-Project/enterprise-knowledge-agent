// AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/auth/LandingPage';
import SignupChoicePage from '../pages/auth/signup/SignupChoicePage';


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {<Route path="/signup" element={<SignupChoicePage />} /> }
      
    </Routes>
  );
}