import { Outlet, useNavigate, useLocation, useParams } from "react-router";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  ListTodo,
  BarChart2,
  Calendar,
  Settings,
} from "lucide-react";

const ProjectLayout = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active tab from URL
  const pathSegments = location.pathname.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1];

  const currentTab =
    lastSegment === projectId || lastSegment === "projects"
      ? "tasks"
      : lastSegment;

  return (
    <div className="space-y-6">
      {/* ---------------- Project Header ---------------- */}
      <header className="border-b border-border pb-4">
        <h1 className="text-2xl font-semibold">
          Project {projectId}
        </h1>

        <p className="text-sm text-muted-foreground mt-1">
          Manage tasks, analytics, calendar and settings
        </p>
      </header>

      {/* ---------------- Segmented Tabs ---------------- */}
      <Tabs
        value={currentTab}
        onValueChange={(value) => {
          if (value === "tasks") {
            navigate(".");
          } else {
            navigate(value);
          }
        }}
      >
        <TabsList className="bg-muted p-1 w-fit gap-2">
          <TabsTrigger
            value="tasks"
            className="flex items-center gap-2 px-4 py-2 text-sm
        data-[state=active]:bg-background
        data-[state=active]:shadow-sm"
          >
            <ListTodo size={16} />
            Tasks
          </TabsTrigger>

          <TabsTrigger
            value="analytics"
            className="flex items-center gap-2 px-4 py-2 text-sm
        data-[state=active]:bg-background
        data-[state=active]:shadow-sm"
          >
            <BarChart2 size={16} />
            Analytics
          </TabsTrigger>

          <TabsTrigger
            value="calendar"
            className="flex items-center gap-2 px-4 py-2 text-sm
        data-[state=active]:bg-background
        data-[state=active]:shadow-sm"
          >
            <Calendar size={16} />
            Calendar
          </TabsTrigger>

          <TabsTrigger
            value="settings"
            className="flex items-center gap-2 px-4 py-2 text-sm
        data-[state=active]:bg-background
        data-[state=active]:shadow-sm"
          >
            <Settings size={16} />
            Settings
          </TabsTrigger>
        </TabsList>
      </Tabs>


      {/* ---------------- Nested Route Content ---------------- */}
      <section className="pt-4">
        <Outlet />
      </section>
    </div>
  );
};

export default ProjectLayout;
