import { Outlet, useNavigate, useLocation, useParams } from "react-router";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { ListTodo, BarChart2, Calendar, Settings, } from "lucide-react";
import { useGetTasksQuery } from "~/store/api/tasksApi";
import { Suspense, useState } from "react";
import PrimaryButton from "~/components/Common/PrimaryButton";
import StatsCard from "~/components/StatsCard";
import CreateTaskDialog from "~/components/CreateTaskDialog";

import { useProject } from "~/hooks/useProject";
import { TextSkeleton } from "~/components/Common/TextSkeleton";
import AnalyticsSkeleton from "~/components/Skeletons/AnalyticsSkeleton";
import LayoutSkeleton from "~/components/Skeletons/LayoutSkeleton";
import { motion } from "framer-motion";
import TasksSkeleton from "~/components/Skeletons/TasksSkeleton";
import CalendarSkeleton from "~/components/Skeletons/CalendarSkeleton";





const ProjectLayout = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  // Fetch project details using custom hook
  const { project, isLoading: isProjectLoading } = useProject();

  const { data: tasks = [], isLoading, isError } = useGetTasksQuery(projectId!, {
    skip: !projectId,  //  prevents invalid API call
    refetchOnMountOrArgChange: false, //  avoids unnecessary refetches
  });


  const safeTasks = isError ? [] : tasks;
  // Calculate task statistics
  const total = safeTasks.length;
  const completed = safeTasks.filter(t => t.status === "DONE").length;
  const inProgress = safeTasks.filter(t => t.status === "IN_PROGRESS").length;
  const overdue = safeTasks.filter(t => {
    if (!t.due_date) return false; // No due date means it can't be overdue

    return new Date(t.due_date) < new Date() && t.status !== "DONE";
  }).length;


  const getSkeleton = () => {
    if (location.pathname.includes("analytics")) return <AnalyticsSkeleton />;
    if (location.pathname.includes("calendar")) return <CalendarSkeleton />;
    return <TasksSkeleton />;
  };


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


  const TABS = [
    { value: "tasks", label: "Tasks", icon: ListTodo },
    { value: "analytics", label: "Analytics", icon: BarChart2 },
    { value: "calendar", label: "Calendar", icon: Calendar },
    { value: "settings", label: "Settings", icon: Settings },
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
          {TABS.map(({ value, label, icon: Icon }) => (
            <TabsTrigger
              key={value}
              value={value}
              onMouseEnter={() => {
                import(`~/routes/Project${value.charAt(0).toUpperCase() + value.slice(1)}`);
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm"
            >
              <Icon size={16} />
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Content */}
      <section className="pt-4 flex-1">
        {isLoading ? (
          <LayoutSkeleton />
        ) : (
          <Suspense fallback={getSkeleton()}>
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Outlet context={{ project, projectId, tasks }} />
            </motion.div>
          </Suspense>
        )}
      </section>
      {isTaskModalOpen && (
        <CreateTaskDialog setIsDialogOpen={setIsTaskModalOpen} />
      )}
    </div>
  );
};

export default ProjectLayout;