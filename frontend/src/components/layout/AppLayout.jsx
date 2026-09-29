import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";

function AppLayout() {
  return (
    <div className="grid h-screen grid-cols-[15rem_1fr]">
      {/* Sidebar occupies the first grid column. */}
      <Sidebar />

      {/* Everything on the right side of the sidebar. */}
      <div className="flex min-h-0 min-w-0 flex-col bg-(--bg-app)">
        {/* Persistent top header. */}
        <Topbar />

        {/* Only this area changes between routes. */}
        <main className="min-h-0 flex-1 overflow-y-auto bg-(--bg-app) px-10 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
