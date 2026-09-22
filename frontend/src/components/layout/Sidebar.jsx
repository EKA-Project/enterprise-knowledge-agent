import { NavLink } from "react-router-dom";
import navigation from "./navigation.js";

function Sidebar() {
  return (
    <aside>
      {/* Render each navigation section from the navigation configuration. */}
      {Object.entries(navigation).map(([sectionName, items]) => (
        <section key={sectionName}>
          <h2>{sectionName}</h2>

          {/* Each navigation item becomes a React Router link. */}
          {items.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {item.label}
            </NavLink>
          ))}
        </section>
      ))}
    </aside>
  );
}

export default Sidebar;
