import { Outlet, useNavigate, useLocation, useParams } from "react-router";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { ListTodo, BarChart2, Calendar, Settings, } from "lucide-react";
import { useAppSelector } from "~/store/hooks";
import type { RootState } from "~/store/store";
import type { Project } from "~/types/workspace";

const ProjectLayout = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active tab
  const pathSegments = location.pathname.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1];

  const currentTab =
    lastSegment === projectId || lastSegment === "projects"
      ? "tasks"
      : lastSegment;

  // CORRECT STATE ACCESS
  const workspaceId = useAppSelector(
    (state: RootState) => state.workspace.currentWorkspaceId
  );

  const projectData = useAppSelector((state: RootState) =>
    workspaceId
      ? state.project.projectsByWorkspace[workspaceId]
      : null
  );

  const projects = projectData?.data || [];

  // TYPE SAFE
  const project = projects.find(
    (p: Project) => String(p.id) === String(projectId)
  );

  return (
    <div className="space-y-6 flex flex-col">
      {/* Header */}
      <header className="border-b border-border pb-4">
        {!project ? (
          <div className="text-sm text-muted-foreground">
            Loading project...
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-semibold">
              {project.name}
            </h1>

            <p className="text-sm text-muted-foreground mt-1">
              Manage tasks, analytics, calendar and settings
            </p>
          </>
        )}
      </header>

      {/* Tabs */}
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
          <TabsTrigger value="tasks" className="flex items-center gap-2 px-4 py-2 text-sm">
            <ListTodo size={16} />
            Tasks
          </TabsTrigger>

          <TabsTrigger value="analytics" className="flex items-center gap-2 px-4 py-2 text-sm">
            <BarChart2 size={16} />
            Analytics
          </TabsTrigger>

          <TabsTrigger value="calendar" className="flex items-center gap-2 px-4 py-2 text-sm">
            <Calendar size={16} />
            Calendar
          </TabsTrigger>

          <TabsTrigger value="settings" className="flex items-center gap-2 px-4 py-2 text-sm">
            <Settings size={16} />
            Settings
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Content */}
      <section className="pt-4 flex-1">
        <Outlet />
      </section>
    </div>
  );
};

export default ProjectLayout;