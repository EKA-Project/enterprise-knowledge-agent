import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout.jsx'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        // Child routes are rendered inside AppLayout's Outlet.
        <Route element={<AppLayout />}>
          <Route path="/" element={<h1>Dashboard</h1>} />
          <Route path="/ask-eka" element={<h1>Ask EKA</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes