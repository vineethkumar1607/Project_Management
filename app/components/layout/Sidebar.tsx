import { useEffect, useRef, useCallback } from "react"
import { NavLink } from "react-router"
import ProjectSidebar from "./ProjectSideBar"
import MyTasksSidebar from "./MyTasksSidebar"
import { FolderOpen, LayoutDashboard, Settings, Users, X } from "lucide-react"

interface SidebarProps {
  isSidebarOpen: boolean
  setIsSidebarOpen: (value: boolean) => void
}

const SIDEBAR_WIDTH = "w-[280px]"
const mockProjects = [
  { id: "1", name: "Website Redesign" },
  { id: "2", name: "Mobile App MVP" },
]

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }: SidebarProps) {
  const sidebarRef = useRef<HTMLElement>(null)

  const menuItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Projects", href: "/projects", icon: FolderOpen },
    { name: "Team", href: "/team", icon: Users },
  ]

  // If the user clicks outside the menu, we should close it automatically
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
      setIsSidebarOpen(false)
    }
  }, [setIsSidebarOpen])

  // Let the user close the sidebar quickly using the Escape key
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsSidebarOpen(false)
    }
  }, [setIsSidebarOpen])

  // Attaching our listeners to the browser window and cleaning them up when the component is destroyed
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleClickOutside, handleKeyDown])

  return (
    <>
      {/* A dark background overlay that appears only on mobile to let users 'tap away' to close */}
      <div
        aria-hidden="true"
        onClick={() => setIsSidebarOpen(false)}
        className={`fixed inset-0 bg-black/40 z-20 sm:hidden transition-opacity
        ${isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      {/* The main sidebar container: sliding logic for mobile and static for desktop */}
      <aside
        ref={sidebarRef}
        aria-label="Primary"
        className={`fixed sm:static z-30 top-0 left-0 h-screen ${SIDEBAR_WIDTH} bg-background border-r flex flex-col transform transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}`}
      >
        {/* A mobile-only close button located at the top right */}
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setIsSidebarOpen(false)}
          className="absolute top-4 right-4 sm:hidden p-2 rounded-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <X size={18} aria-hidden="true" />
        </button>

        {/* This scrollable area holds all our main links and secondary menus */}
        <nav aria-label="Main" className="flex-1 overflow-y-auto no-scrollbar">
          <ul role="list" className="px-3 py-4 space-y-1">
            {menuItems.map(item => (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  end
                  className={({ isActive }) => `
                    flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${isActive 
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 font-medium border border-blue-100 dark:border-blue-500/20" 
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"}
                  `}
                >
                  <item.icon size={18} aria-hidden="true" />
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}

            {/* A simple button for settings at the end of the main list */}
            <li>
              <button
                type="button"
                aria-label="Open settings"
                className="flex items-center gap-3 px-3 py-2 w-full rounded-md text-sm text-muted-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Settings size={18} aria-hidden="true" />
                <span>Settings</span>
              </button>
            </li>
          </ul>

          <hr aria-hidden="true" className="my-3" />

          {/* Sub-sections for specific task and project navigation */}
          <MyTasksSidebar />
          <ProjectSidebar projects={mockProjects} />
        </nav>
      </aside>
    </>
  )
}