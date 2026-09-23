import { useLocation } from 'react-router-dom'

// Information displayed in the Topbar for each application route.
const routeMetadata = {
  '/dashboard': {
    title: 'Overview',
    metadata: 'NORTHSTAR STUDIO / 24.11.2026',
  },
  '/ask-eka': {
    title: 'Ask EKA',
    metadata: 'NEURAL RAG / 100% ISOLATED',
  },
}

function Topbar() {
  const location = useLocation()

  // Find metadata for the currently active route.
  const currentRoute = routeMetadata[location.pathname]

  return (
    <header>
      <h1>{currentRoute?.title}</h1>
      <p>{currentRoute?.metadata}</p>
    </header>
  )
}

export default Topbar