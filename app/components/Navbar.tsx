import { useState } from "react";
import { Search, PanelLeft, Moon, Sun } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";
import profileImg from "../assessts/profile.svg"; // make sure there is one SVG

interface NavbarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
}

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }: NavbarProps) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <header
      className="w-full bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 px-4 sm:px-6 xl:px-16 py-3 shrink-0"
      role="banner"
    >
      <nav
        className="flex items-center justify-between max-w-6xl mx-auto"
        aria-label="Primary Navigation"
      >
        {/* Left Section */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {/* Sidebar Toggle (Mobile) */}
          <button
            type="button"
            aria-label="Toggle sidebar"
            className="sm:hidden p-2 rounded-lg text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <PanelLeft size={20} aria-hidden="true" />
          </button>

          {/* Search Form */}
          <form
            role="search"
            className="relative flex-1 max-w-sm"
            aria-label="Search projects or tasks"
          >
            <label htmlFor="navbar-search" className="sr-only">
              Search projects or tasks
            </label>
            <Search
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-400"
              size={16}
              aria-hidden="true"
            />
            <input
              id="navbar-search"
              type="search"
              placeholder="Search projects, tasks..."
              className="pl-8 pr-4 py-2 w-full bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-md text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </form>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Activate ${theme === "light" ? "dark" : "light"} mode`}
            className="size-9 flex items-center justify-center bg-white dark:bg-zinc-800 shadow rounded-lg transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2"
          >
            {theme === "light" ? (
              <Moon className="text-gray-800 dark:text-gray-200" size={18} aria-hidden="true" />
            ) : (
              <Sun className="text-yellow-400" size={18} aria-hidden="true" />
            )}
          </button>

          {/* User Avatar */}
          <UserButton
            afterSignOutUrl="/login"
            appearance={{
              elements: {
                avatarBox: "size-8",
              },
            }}
          />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
