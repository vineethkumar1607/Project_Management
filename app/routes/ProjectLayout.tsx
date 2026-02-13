import { NavLink, Outlet, useParams } from "react-router";

const ProjectLayout = () => {
  const { projectId } = useParams();

  return (
    <div className="space-y-6">
      {/* ---------------- Project Header ---------------- */}
      <header className="border-b border-gray-200 dark:border-zinc-800 pb-4">
        <h1 className="text-2xl font-semibold">
          Project {projectId}
        </h1>

        <p className="text-sm text-muted-foreground mt-1">
          Manage tasks, analytics, calendar and settings
        </p>
      </header>

      {/* ---------------- Project Tabs ---------------- */}
      <nav
        className="flex gap-4 border-b border-gray-200 dark:border-zinc-800 pb-2"
        aria-label="Project sections"
      >
        <NavLink
          to="tasks"
          className={({ isActive }) =>
            `text-sm pb-2 transition ${
              isActive
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-muted-foreground hover:text-foreground"
            }`
          }
        >
          Tasks
        </NavLink>

        <NavLink
          to="analytics"
          className={({ isActive }) =>
            `text-sm pb-2 transition ${
              isActive
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-muted-foreground hover:text-foreground"
            }`
          }
        >
          Analytics
        </NavLink>

        <NavLink
          to="calendar"
          className={({ isActive }) =>
            `text-sm pb-2 transition ${
              isActive
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-muted-foreground hover:text-foreground"
            }`
          }
        >
          Calendar
        </NavLink>

        <NavLink
          to="settings"
          className={({ isActive }) =>
            `text-sm pb-2 transition ${
              isActive
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-muted-foreground hover:text-foreground"
            }`
          }
        >
          Settings
        </NavLink>
      </nav>

      {/* ---------------- Nested Content ---------------- */}
      <section className="pt-4">
        <Outlet />
      </section>
    </div>
  );
};

export default ProjectLayout;
