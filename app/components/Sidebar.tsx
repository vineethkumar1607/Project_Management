import { useEffect, useRef, useCallback } from "react";
import { NavLink } from "react-router";
// import MyTasksSidebar from "./MyTasksSidebar";
// import ProjectSidebar from "./ProjectsSidebar";
// import WorkspaceDropdown from "./WorkspaceDropdown";
import {
  FolderOpen,
  LayoutDashboard,
  Settings,
  Users,
  X,
} from "lucide-react";

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
}

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }: SidebarProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Projects", href: "/projects", icon: FolderOpen },
    { name: "Team", href: "/team", icon: Users },
  ];

  // Close sidebar on outside click (for mobile)
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    },
    [setIsSidebarOpen]
  );

  // Close on Esc key
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsSidebarOpen(false);
    },
    [setIsSidebarOpen]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClickOutside, handleKeyDown]);

  return (
    <>
      {/* Overlay (mobile only) */}
      <div
        aria-hidden={!isSidebarOpen}
        onClick={() => setIsSidebarOpen(false)}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-20 sm:hidden transition-opacity ${
          isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed sm:static z-30 top-0 left-0 h-screen bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 transform transition-transform duration-300 ease-in-out flex flex-col w-64 sm:w-46 focus:outline-none ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        }`}
        role="navigation"
        aria-label="Sidebar Navigation"
      >
        {/* Close Button (Mobile Only) */}
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setIsSidebarOpen(false)}
          className="absolute top-4 right-4 sm:hidden p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <X size={18} aria-hidden="true" />
        </button>

        {/* Workspace Dropdown */}
        <div className="mt-12 sm:mt-0">
         {/* //workspace Dropdown */}
        </div>

        <hr className="border-gray-200 dark:border-zinc-800 my-2" />

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto no-scrollbar" aria-label="Main Navigation">
          <ul className="p-4 space-y-1">
            {menuItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center gap-3 py-2 px-4 rounded-md text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isActive
                        ? "bg-gray-100 dark:bg-zinc-800 text-blue-600 dark:text-blue-400 font-medium"
                        : "text-gray-800 dark:text-zinc-100 hover:bg-gray-50 dark:hover:bg-zinc-800/60"
                    }`
                  }
                  aria-label={`Navigate to ${item.name}`}
                >
                  <item.icon size={16} aria-hidden="true" />
                  <span className="truncate">{item.name}</span>
                </NavLink>
              </li>
            ))}

            <li>
              <button
                type="button"
                className="flex items-center gap-3 py-2 px-4 w-full rounded-md text-sm text-gray-800 dark:text-zinc-100 hover:bg-gray-50 dark:hover:bg-zinc-800/60 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Open Settings"
              >
                <Settings size={16} aria-hidden="true" />
                <span>Settings</span>
              </button>
            </li>
          </ul>

          {/* Optional Extra Sections */}
          
          {/* tasksidebar
          project side bar */}

        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
