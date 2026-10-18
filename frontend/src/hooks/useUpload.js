import { useContext } from "react";
import UploadContext from "../context/UploadContext.jsx";

// const { openUpload, canUpload } = useUpload();
function useUpload() {
  const context = useContext(UploadContext);
  if (!context) {
    // A clear message beats "cannot destructure property of null"
    throw new Error("useUpload must be used inside <UploadProvider>");
  }
  return context;
}

export default useUpload;