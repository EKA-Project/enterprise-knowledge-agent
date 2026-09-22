import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";

function AppLayout() {
  return (
    <div>
      {/* Sidebar and Topbar stay mounted across page navigation. */}
      <Sidebar />
      <Topbar />

      {/* Only the content inside Outlet changes between routes. */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
