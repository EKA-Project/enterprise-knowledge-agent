import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import { UploadProvider } from "../../context/UploadContext.jsx";
import { ToastProvider } from "../../context/ToastContext.jsx";
import { SurpriseProvider } from "../../context/SurpriseContext.jsx";
function AppLayout() {
  return (
    <ToastProvider>
      <SurpriseProvider>
        <UploadProvider>
          <div className="relative grid h-screen grid-cols-[15rem_1fr] grid-rows-[minmax(0,1fr)] overflow-hidden">
            {/* Sidebar occupies the first grid column. */}
            <Sidebar />

            {/* Everything on the right side of the sidebar. */}
            <div className="flex min-h-0 min-w-0 flex-col bg-(--bg-app)">
              {/* Persistent top header. */}
              <Topbar />

              {/* Only this area changes between routes. */}
              <main className="relative min-h-0 flex-1 overflow-y-auto bg-(--bg-app) px-10 py-8">
                <Outlet />
              </main>
            </div>
          </div>
        </UploadProvider>
      </SurpriseProvider>
    </ToastProvider>
  );
}

export default AppLayout;
