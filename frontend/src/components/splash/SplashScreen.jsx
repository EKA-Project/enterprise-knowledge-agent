// SplashScreen is responsible only for displaying
// the initial EKA loading experience.
//
// The logic that decides WHEN this screen should appear
// will be handled by App.jsx.

// SplashScreen is responsible for displaying the initial
// loading experience before the main EKA application appears.

// SplashScreen is responsible for displaying the initial
// loading experience before the main EKA application appears.

function SplashScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* Contains all visual elements shown during initialization */}
      <div className="flex flex-col items-center">

        {/* EKA branding */}
        <div className="splash-logo">
          eka.
        </div>

        {/* Describes the purpose of the EKA platform */}
        <div className="splash-subtitle">
          INTELLIGENCE LAYER
        </div>

        {/* Loading progress will be implemented later */}
        <div className="splash-progress">
          <div className="splash-progress-bar"></div>
        </div>

      </div>
    </div>
  );
}

export default SplashScreen;