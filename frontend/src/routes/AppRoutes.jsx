import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout.jsx'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* All application pages share the persistent EKA shell. */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<h1>Dashboard</h1>} />
          <Route path="/ask-eka" element={<h1>Ask EKA</h1>} />
          <Route path="/knowledge-base" element={<h1>Knowledge Base</h1>} />
          <Route path="/documents" element={<h1>Documents</h1>} />
          <Route path="/semantic-search" element={<h1>Semantic Search</h1>} />
          <Route path="/analytics" element={<h1>Analytics</h1>} />
          <Route path="/organization" element={<h1>Organization</h1>} />
          <Route path="/settings" element={<h1>Settings</h1>} />
        </Route>

        {/* Redirect the root URL to the main dashboard. */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes