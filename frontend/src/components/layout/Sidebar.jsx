import { useContext } from "react";
import AuthContext from "../../context/AuthContext.jsx";
import { NavLink } from "react-router-dom";
import navigation from "./navigation.js";
import ekaLogo from "../../assets/images/eka_logo.jpeg";

function Sidebar() {
  const { activeRole } = useContext(AuthContext);
  return (
    <aside className="flex h-screen min-h-0 w-60 flex-col overflow-y-auto border-r border-(--sidebar-border) bg-(--sidebar-bg) p-4 text-(--sidebar-text)">
      {/* Brand Header */}
      <div className="brand-logo mb-3 flex items-center border-b border-(--sidebar-border) pb-5">
        <div className="relative mr-2.5 flex items-center justify-center rounded-xl border border-(--sidebar-border) bg-(--sidebar-tip-bg) p-.5 shadow-sm backdrop-blur-xs transition-colors duration-200">
          <img
            src={ekaLogo}
            alt="EKA"
            className="brand-icon h-8.5 w-8.5 rounded-lg object-cover"
          />
        </div>

        <span className="font-serif text-[22px] font-bold tracking-tight text-(--sidebar-text)">
          eka<span className="brand-dot text-(--sidebar-active-bg)">.</span>
        </span>
      </div>

      {/* Render each navigation section from the navigation configuration. */}
      {Object.entries(navigation).map(([sectionName, items]) => {
        const visibleItems = items.filter(
          (item) => !item.roles || item.roles.includes(activeRole),
        );

        if (visibleItems.length === 0) return null;

        return (
          <section key={sectionName} className="mb-6">
            <h2 className="mb-2 font-mono text-[10.5px] font-semibold uppercase tracking-[0.05em] text-(--sidebar-text-muted)">
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
      {/* EKA TIP Card */}
      <div className="mt-auto rounded-lg border border-(--sidebar-border) bg-(--sidebar-tip-bg) px-2.5 py-2">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="font-(--font-mono) text-[13px] font-bold leading-none text-(--sidebar-active-bg)">
            $
          </span>
          <span className="font-(--font-sans) text-[10.5px] font-bold tracking-wider uppercase text-white">
            EKA TIP
          </span>
        </div>
        <p className="font-(--font-sans) text-[11.5px] leading-[1.35] text-(--sidebar-text-muted)">
          Ask for the source, not just the answer.
        </p>
      </div>
      {/* ----------------------------------- */}
    </aside>
  );
}

export default Sidebar;
