import { createContext, useCallback, useContext, useMemo, useState } from "react";
import AuthContext from "./AuthContext.jsx";
import UploadDocumentModal from "../components/upload/UploadDocumentModal.jsx";

// Lets any component open the upload modal, without each one owning a copy of it.
const UploadContext = createContext(null);

export function UploadProvider({ children }) {
  const { activeRole, department } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  // The single rule for "who may upload": everyone except Employees
  const canUpload = activeRole !== "Employee";

  const openUpload = useCallback(() => {
    if (canUpload) setOpen(true);
  }, [canUpload]);

  const closeUpload = useCallback(() => setOpen(false), []);

  // Memoised so consumers only re-render when these values really change
  const value = useMemo(() => ({ openUpload, canUpload }), [openUpload, canUpload]);

  return (
    <UploadContext.Provider value={value}>
      {children}

      {/* Rendered only while open, so every opening starts with a clean form.
          Managers are locked to their own department; admins choose freely. */}
      {open && canUpload && (
        <UploadDocumentModal
          lockedDepartment={activeRole === "Manager" ? department : null}
          onClose={closeUpload}
        />
      )}
    </UploadContext.Provider>
  );
}

export default UploadContext;