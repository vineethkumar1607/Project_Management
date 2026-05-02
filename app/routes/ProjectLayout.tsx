import { Outlet, useNavigate, useLocation, useParams } from "react-router";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { ListTodo, BarChart2, Calendar, Settings, } from "lucide-react";
import { useAppSelector } from "~/store/hooks";
import type { RootState } from "~/store/store";
import type { Project } from "~/types/workspace";
import { useGetTasksQuery } from "~/store/api/tasksApi";
import { useEffect, useState } from "react";
import PrimaryButton from "~/components/Common/PrimaryButton";
import StatsCard from "~/components/StatsCard";
import CreateTaskDialog from "~/components/CreateTaskDialog";
import { useDispatch, } from "react-redux";
import type { AppDispatch } from "~/store/store";

import { fetchWorkspaceMembers } from "~/store/workspaceThunk";

import { useProject } from "~/hooks/useProject";
import { TextSkeleton } from "~/components/Common/TextSkeleton";
import { useProjectMembers } from "~/hooks/useProjectMembers";



const ProjectLayout = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  // Fetch project details using custom hook
  const { project, isLoading: isProjectLoading } = useProject();

  const { data: tasks = [], isLoading, isError } = useGetTasksQuery(projectId!);

  const { members } = useProjectMembers(projectId);

  const safeTasks = isError ? [] : tasks;
  // Calculate task statistics
  const total = safeTasks.length;
  const completed = safeTasks.filter(t => t.status === "DONE").length;
  const inProgress = safeTasks.filter(t => t.status === "IN_PROGRESS").length;
  const overdue = safeTasks.filter(t => {
    return new Date(t.due_date) < new Date() && t.status !== "DONE";
  }).length;


  const taskStats = [
    {
      title: "Total Tasks",
      value: total,
      icon: ListTodo,
    },
    {
      title: "Completed",
      value: completed,
      icon: BarChart2,
    },
    {
      title: "In Progress",
      value: inProgress,
      icon: Calendar,
    },
    {
      title: "Overdue",
      value: overdue,
      icon: Settings,
    },
  ];
  // Determines active tab
  const pathSegments = location.pathname.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1];

  const currentTab =
    lastSegment === projectId || lastSegment === "projects"
      ? "tasks"
      : lastSegment;

  return (
    <div className="space-y-6 flex flex-col">
      {/* Header */}
      <header className="border-b border-border pb-4 flex items-center justify-between">
        <>
          <div>
            {isProjectLoading ? (
              <>
                <TextSkeleton className="h-6 w-48 mb-2" />
                <TextSkeleton className="h-4 w-64" />
              </>
            ) : (
              <>
                <h1 className="text-2xl font-semibold">
                  {project?.name}
                </h1>

                <p className="text-sm text-muted-foreground mt-1">
                  Manage tasks, analytics, calendar and settings
                </p>
              </>
            )}
          </div>

          {isProjectLoading ? (
            <TextSkeleton className="h-9 w-28 rounded-md" />
          ) : (
            <PrimaryButton onClick={() => setIsTaskModalOpen(true)}>
              + Add Task
            </PrimaryButton>
          )}
        </>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {taskStats.map((stat) => (
          <StatsCard
            key={stat.title}
            {...stat}
            isLoading={isLoading}
          />
        ))}
      </div>

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
        <Outlet context={{ project, projectId }} />
      </section>
      {isTaskModalOpen && (
        <CreateTaskDialog setIsDialogOpen={setIsTaskModalOpen} />
      )}
    </div>
  );
};

export default ProjectLayout;