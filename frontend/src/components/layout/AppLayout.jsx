import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";

function AppLayout() {
  return (
    <div className="grid min-h-screen grid-cols-[15rem_1fr]">
      {/* Sidebar occupies the first grid column. */}
      <Sidebar />

      {/* Everything on the right side of the sidebar. */}
      <div className="flex min-w-0 flex-col">
        {/* Persistent top header. */}
        <Topbar />

        {/* Only this area changes between routes. */}
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;

