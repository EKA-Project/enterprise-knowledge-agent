import { useContext } from "react";
import AuthContext from "../../context/AuthContext.jsx";
import { NavLink } from "react-router-dom";
import navigation from "./navigation.js";
import ekaLogo from "../../assets/images/eka_logo.jpeg";

function Sidebar() {
  const { activeRole } = useContext(AuthContext);
  return (
    <aside className=" flex h-screen w-60 flex-col border-r border-(--sidebar-border) bg-(--sidebar-bg) p-4 text-(--sidebar-text)">
      <div className="brand-logo mb-8 flex items-center border-b border-(--sidebar-border) pb-5">
        <img
          src={ekaLogo}
          alt="EKA"
          className="brand-icon mr-3 h-8 w-8 rounded object-cover"
        />

        <span className="font-serif text-[21px] font-bold tracking-[-0.01em]">
          eka<span className="brand-dot text-(--sidebar-text-muted)">.</span>
        </span>
      </div>

      {/* Render each navigation section from the navigation configuration. */}
      {Object.entries(navigation).map(([sectionName, items]) => {
        const visibleItems = items.filter(
          (item) => !item.roles || item.roles.includes(activeRole),
        );

        return (
          <section key={sectionName} className="mb-6">
            <h2 className="mb-3 font-(--font-mono) text-[9.5px] uppercase tracking-[0.12em] text-(--sidebar-text-muted)">
              {sectionName}
            </h2>

            {/* Each navigation item becomes a React Router link. */}
            {visibleItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `nav-item ${isActive ? "active" : ""}`
                }
              >
                {item.icon && <item.icon className="nav-icon" />}
                <span>{item.label}</span>

                {item.shortcut && (
                  <span className="nav-counter">{item.shortcut}</span>
                )}

                {item.count !== undefined && (
                  <span className="nav-counter">{item.count}</span>
                )}
              </NavLink>
            ))}
          </section>
        );
      })}
    </aside>
  );
}

export default Sidebar;
