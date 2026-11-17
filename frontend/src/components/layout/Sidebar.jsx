import { useContext } from "react";
import AuthContext from "../../context/AuthContext.jsx";
import { NavLink } from "react-router-dom";
import navigation from "./navigation.js";
import ekaLogo from "../../assets/images/eka_logo.jpeg";

/**
 * Reusable Navigation Item with glowing indicator,
 * spring-animated icon, and shortcut/counter badge.
 */
function NavItem({ item }) {
  return (
    <NavLink
      to={item.path}
      className={({ isActive }) => `
        group relative flex items-center gap-3 px-3.5 py-2.5 rounded-[10px] text-[12.5px] font-sans no-underline cursor-pointer overflow-hidden border
        transition-all duration-220 ease-[cubic-bezier(0.16,1,0.3,1)]
        active:scale-[0.97] active:translate-x-0.5 active:duration-80
        
        /* Left indicator pill (::before) */
        before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[3.5px] before:rounded-r before:transition-all before:duration-220 before:ease-[cubic-bezier(0.34,1.56,0.64,1)]

        ${
          isActive
            ? /* Active Route State */
              `bg-(--sidebar-active-bg) text-(--sidebar-active-text) font-bold border-white/15 
               shadow-[0_4px_16px_rgba(0,0,0,0.22),inset_0_1px_1px_rgba(255,255,255,0.25)]
               hover:-translate-y-px hover:translate-x-0.5 hover:brightness-105
               before:h-[60%] before:bg-white before:opacity-100 before:scale-y-100 before:shadow-[0_0_8px_rgba(255,255,255,0.8)]`
            : /* Inactive / Default State */
              `text-(--sidebar-text) font-medium border-transparent
               hover:bg-(--sidebar-hover-bg) hover:text-white hover:translate-x-1 hover:border-white/7
               hover:shadow-[0_4px_14px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.08)]
               before:h-4 before:bg-(--sidebar-active-bg) before:opacity-0 before:scale-y-0
               hover:before:h-5 hover:before:opacity-100 hover:before:scale-y-100 hover:before:shadow-[0_0_10px_var(--sidebar-active-bg)]`
        }
      `}
    >
      {({ isActive }) => (
        <>
          {/* Animated Icon */}
          {item.icon && (
            <item.icon
              className={`
                size-4.5 shrink-0 transition-all duration-240 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                ${
                  isActive
                    ? "opacity-100 scale-108 drop-shadow-[0_1px_3px_rgba(0,0,0,0.2)]"
                    : "opacity-80 group-hover:opacity-100 group-hover:scale-115 group-hover:-rotate-3 group-hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.35)]"
                }
              `}
            />
          )}

          {/* Label */}
          <span className="truncate">{item.label}</span>

          {/* Shortcut Badge */}
          {item.shortcut && (
            <span
              className={`
                ml-auto font-mono text-[0.68rem] font-bold px-2 py-0.5 rounded-full border tracking-wider transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]
                ${
                  isActive
                    ? "bg-black/15 text-(--sidebar-active-text) border-black/10"
                    : "bg-white/12 text-(--sidebar-text) border-white/8 group-hover:bg-white/22 group-hover:text-white group-hover:scale-108 group-hover:border-white/25 group-hover:shadow-[0_0_8px_rgba(255,255,255,0.2)]"
                }
              `}
            >
              {item.shortcut}
            </span>
          )}

          {/* Counter Badge */}
          {item.count !== undefined && (
            <span
              className={`
                ml-auto font-mono text-[0.68rem] font-bold px-2 py-0.5 rounded-full border tracking-wider transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]
                ${
                  isActive
                    ? "bg-black/15 text-(--sidebar-active-text) border-black/10"
                    : "bg-white/12 text-(--sidebar-text) border-white/8 group-hover:bg-white/22 group-hover:text-white group-hover:scale-108 group-hover:border-white/25 group-hover:shadow-[0_0_8px_rgba(255,255,255,0.2)]"
                }
              `}
            >
              {item.count}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
}

function Sidebar() {
  const { activeRole } = useContext(AuthContext);

  return (
    <aside className="flex h-screen min-h-0 w-60 flex-col overflow-y-auto border-r border-(--sidebar-border) bg-(--sidebar-bg) p-4 text-(--sidebar-text) select-none">
      {/* Brand Header with interactive hover */}
      <div className="group mb-3 flex cursor-pointer items-center border-b border-(--sidebar-border) pb-5 transition-transform duration-220 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02]">
        <div className="relative mr-2.5 flex items-center justify-center rounded-xl border border-(--sidebar-border) bg-(--sidebar-tip-bg) p-0.5 shadow-sm backdrop-blur-xs transition-colors duration-200">
          <img
            src={ekaLogo}
            alt="EKA"
            className="h-8.5 w-8.5 rounded-lg object-cover transition-transform duration-250 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-rotate-4 group-hover:scale-108"
          />
        </div>

        <span className="font-serif text-[22px] font-bold tracking-tight text-(--sidebar-text)">
          eka
          <span className="inline-block text-(--sidebar-active-bg) transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:scale-125">
            .
          </span>
        </span>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 space-y-6">
        {Object.entries(navigation).map(([sectionName, items]) => {
          const visibleItems = items.filter(
            (item) => !item.roles || item.roles.includes(activeRole),
          );

          if (visibleItems.length === 0) return null;

          return (
            <section key={sectionName}>
              <h2 className="mb-2 font-mono text-[10.5px] font-semibold uppercase tracking-wider text-(--sidebar-text-muted)">
                {sectionName}
              </h2>

              <div className="flex flex-col space-y-1">
                {visibleItems.map((item) => (
                  <NavItem key={item.path} item={item} />
                ))}
              </div>
            </section>
          );
        })}
      </nav>

      {/* EKA TIP Card */}
      <div className="mt-auto rounded-lg border border-(--sidebar-border) bg-(--sidebar-tip-bg) px-2.5 py-2">
        <div className="mb-1 flex items-center gap-1.5">
          <span className="font-mono text-[13px] font-bold leading-none text-(--sidebar-active-bg)">
            $
          </span>
          <span className="font-sans text-[10.5px] font-bold uppercase tracking-wider text-white">
            EKA TIP
          </span>
        </div>
        <p className="font-sans text-[11.5px] leading-[1.35] text-(--sidebar-text-muted)">
          Ask for the source, not just the answer.
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;