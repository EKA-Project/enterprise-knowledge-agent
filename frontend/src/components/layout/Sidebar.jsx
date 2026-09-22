import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <aside>
      {/* NavLink changes the URL without reloading the application. */}
      <NavLink to="/">Dashboard</NavLink>

      <NavLink to="/ask-eka">Ask EKA</NavLink>
    </aside>
  )
}

export default Sidebar