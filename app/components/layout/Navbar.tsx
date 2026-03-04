import { Search, PanelLeft, Moon, Sun } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import { setTheme } from "~/store/themeSlice";

interface NavbarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
}

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }: NavbarProps) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);

  const toggleTheme = () => {
    /*
      If currently dark → switch to light
      Otherwise → switch to dark

    */
    const newTheme = theme === "dark" ? "light" : "dark";
    dispatch(setTheme(newTheme));
  };

  return (
    <header className="w-full bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 px-4 sm:px-6 xl:px-16 py-3 shrink-0">
      <nav className="flex items-center justify-between max-w-6xl mx-auto">

        <div className="flex items-center gap-4 flex-1 min-w-0">
          <button
            type="button"
            className="sm:hidden p-2 rounded-lg text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <PanelLeft size={20} />
          </button>

          <form className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-400" size={16} />
            <input
              type="search"
              placeholder="Search projects, tasks..."
              className="pl-8 pr-4 py-2 w-full bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-md text-sm text-gray-900 dark:text-white"
            />
          </form>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="size-9 flex items-center justify-center bg-white dark:bg-zinc-800 shadow rounded-lg"
          >
            {theme === "dark" ? (
              <Sun className="text-yellow-400" size={18} />
            ) : (
              <Moon className="text-gray-800 dark:text-gray-200" size={18} />
            )}
          </button>

          <UserButton
            afterSignOutUrl="/"
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