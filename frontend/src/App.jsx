import { useState } from "react";
import AppRoutes from "./routes/AppRoutes.jsx";
import SplashScreen from "./components/splash/SplashScreen.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { UploadProvider } from "./context/UploadContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
/*
  App is the root component of EKA.

  It controls which top-level experience the user sees:
  - SplashScreen → during application initialization
  - AppRoutes    → after initialization is complete
*/
function App() {
  /*
    Controls whether the initial splash screen is visible.

    true  → show splash
    false → show the main application
  */
  const [showSplash, setShowSplash] = useState(true);

    return (
    <AuthProvider>
      <ToastProvider>
        <UploadProvider>
          {showSplash ? (
            <SplashScreen
              onComplete={() => setShowSplash(false)}
            />
          ) : (
            <AppRoutes />
          )}
        </UploadProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
