import AppRoutes from './routes/AppRoutes.jsx'
import SplashScreen from './components/splash/SplashScreen.jsx'

function App() {
  return (
    <>
      {/* 
        Temporary:
        Render the splash screen from the application root.

        Later, App.jsx will control whether the splash screen
        or the actual application should be displayed.
      */}
      <SplashScreen />

      {/* Main EKA application */}
      <AppRoutes />
    </>
  )
}

export default App