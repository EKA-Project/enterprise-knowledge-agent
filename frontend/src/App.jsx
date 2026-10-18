import { useState } from "react";
import AppRoutes from "./routes/AppRoutes.jsx";
import SplashScreen from "./components/splash/SplashScreen.jsx";

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
    <>
      {/* 
        Show only one top-level experience at a time.

        This prevents the splash screen and the main application
        from being rendered together and creating unwanted page
        height / scrolling.
      */}
      {showSplash ? (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      ) : (
        <AppRoutes />
      )}
    </>
  );
}

export default App;
