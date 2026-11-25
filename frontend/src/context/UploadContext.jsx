import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import AuthContext from "./AuthContext.jsx";
import UploadDocumentModal from "../components/upload/UploadDocumentModal.jsx";
import useToast from "../hooks/useToast.js";
import { uploadDocument } from "../services/documentService.js";
import { getDepartments } from "../services/departmentService.js";
import { refreshDocuments } from "../components/documents/shared/roleDocuments.js";

const UploadContext = createContext(null);

export function UploadProvider({ children }) {
  const { activeRole, department } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [departments, setDepartments] = useState([]);

  const toast = useToast();

  // Departments ek baar load, taaki modal khulte hi options ready hon
  useEffect(() => {
    let alive = true;
    getDepartments().then((list) => {
      if (alive) setDepartments(list.map((d) => ({ value: d.id, label: d.name })));
    });
    return () => {
      alive = false;
    };
  }, []);

  // Manager: AuthContext me department ka NAAM hai, service ko id chahiye
  const lockedId =
    activeRole === "Manager"
      ? departments.find((d) => d.label === department)?.value ?? null
      : null;

  const handleSubmit = useCallback(async ({ title, scope, file }) => {
    await uploadDocument(file, { departmentId: scope, title });
    await refreshDocuments();
  }, []);

  const handleSuccess = useCallback(
    ({ title }) =>
      toast.success("Document uploaded", {
        description: `"${title}" is uploaded and indexing has started.`,
      }),
    [toast],
  );

  const canUpload = activeRole !== "Employee";

  const openUpload = useCallback(() => {
    if (canUpload) setOpen(true);
  }, [canUpload]);

  const closeUpload = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ openUpload, canUpload }),
    [openUpload, canUpload],
  );

  return (
    <UploadContext.Provider value={value}>
      {children}

      {open && canUpload && departments.length > 0 && (
        <UploadDocumentModal
          departments={departments}
          lockedDepartment={lockedId}
          onSubmit={handleSubmit}
          onClose={closeUpload}
          onSuccess={handleSuccess}
        />
      )}
    </UploadContext.Provider>
  );
}

export default UploadContext;