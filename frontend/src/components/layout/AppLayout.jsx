import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'

function AppLayout() {
  return (
    <div>
      {/* Sidebar stays visible while the page inside Outlet changes. */}
      <Sidebar />

      {/* The currently selected route is rendered here. */}
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout