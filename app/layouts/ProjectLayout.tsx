import { Outlet, useNavigate, useLocation, useParams, Navigate } from "react-router";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useGetTasksQuery } from "~/store/api/tasksApi";
import { Suspense, useMemo, useState } from "react";
import PrimaryButton from "~/components/common/PrimaryButton";
import CreateTaskDialog from "~/features/tasks/CreateTaskDialog";

import { useCurrentProject } from "~/features/projects/hooks/useCurrentProject";
import { TextSkeleton } from "~/components/skeletons/TextSkeleton";
import AnalyticsSkeleton from "~/components/skeletons/AnalyticsSkeleton";
import { motion } from "framer-motion";
import TasksSkeleton from "~/components/skeletons/TasksSkeleton";
import CalendarSkeleton from "~/components/skeletons/CalendarSkeleton";
import MetricCard from "~/components/common/MetricCard";
import { useTaskAnalytics } from "~/features/tasks/hooks/useTaskAnalytics";
import { PROJECT_NAVIGATION_ITEMS, } from "~/lib/projectNavigation";
import StatsGridSkeleton from "~/components/skeletons/StatsGridSkeleton";
import { ListTodo, CheckCircle2, Clock3, AlertTriangle, } from "lucide-react";
import { workspaceRoutes } from "~/lib/routesHelper";
import { useProjectsData } from "~/features/projects/hooks/useProjectsData";


const loadedTabs = new Set<string>();

const prefetchTab = (value: TabValue, loader: () => Promise<any>) => {
  if (loadedTabs.has(value)) return;
  loadedTabs.add(value);
  loader();
};

type TabValue = typeof PROJECT_NAVIGATION_ITEMS[number]["value"];


const ProjectLayout = () => {
  const { workspaceId, projectId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  // Fetch project details using custom hook
  const { project, loading: isProjectLoading, error, } = useCurrentProject();
  const { projects } = useProjectsData();

  const { data: tasks = [], isLoading, isError } = useGetTasksQuery(projectId!, {
    skip: !projectId,  //  prevents invalid API call
    refetchOnMountOrArgChange: false, //  avoids unnecessary refetches
  });

  const safeTasks = isError ? [] : tasks;

  const analytics = useTaskAnalytics({ tasks: safeTasks, });

  const getSkeleton = () => {
    if (location.pathname.includes("analytics")) return <AnalyticsSkeleton />;
    if (location.pathname.includes("calendar")) return <CalendarSkeleton />;
    return <TasksSkeleton />;
  };

  // 
  const projectExists = useMemo(() => {
    if (!workspaceId || !projectId) {
      return false;
    }

    return projects.some(
      (project) =>
        project.id === projectId &&
        project.workspaceId === workspaceId
    );
  }, [projects, workspaceId, projectId]);


  const metrics = [
    {
      title: "Total Tasks",
      value: analytics.totalTasks,
      icon: ListTodo,
      description: "all project tasks",
      iconBgColor: "bg-blue-500/10",
      iconColor: "text-blue-500",
    },
    {
      title: "Completed",
      value: analytics.completedTasksCount,
      icon: CheckCircle2,
      description: "finished successfully",
      iconBgColor: "bg-emerald-500/10",
      iconColor: "text-emerald-500",
    },
    {
      title: "In Progress",
      value: analytics.inProgressTasksCount,
      icon: Clock3,
      description: "currently active",
      iconBgColor: "bg-violet-500/10",
      iconColor: "text-violet-500",
    },
    {
      title: "Overdue",
      value: analytics.overdueTasksCount,
      icon: AlertTriangle,
      description: "require attention",
      iconBgColor: "bg-amber-500/10",
      iconColor: "text-amber-500",
    },
  ];


  // Determines active tab
  const pathSegments = location.pathname.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1];

  const currentTab: TabValue = PROJECT_NAVIGATION_ITEMS.find(tab => tab.value === lastSegment)?.value || "tasks";


  //  temporary change for debugging 
  if (
    !isProjectLoading &&
    projects.length > 0 &&
    !projectExists
  ) {
    return (
      <Navigate
        to={workspaceRoutes.projects(workspaceId!)}
        replace
      />
    );
  }


  if (error) {
    return (
      <div className="p-6 text-red-500">
        Failed to load project
      </div>
    );
  }

  return (
    <div className="space-y-6 flex flex-col">
      {/* Header */}
      <header className="border-b border-border pb-4 flex items-center justify-between">
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
      </header>
      {isLoading ? (
        <StatsGridSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <MetricCard
              key={metric.title}
              {...metric}
            />
          ))}
        </div>
      )}

      {/* Tabs */}
      <Tabs
        value={currentTab}
        onValueChange={(value) => {
          if (!PROJECT_NAVIGATION_ITEMS.some(t => t.value === value)) return;

          const tab = PROJECT_NAVIGATION_ITEMS.find(t => t.value === value)!;
          navigate(
            tab.route === "." ? workspaceRoutes.projectDetails(workspaceId!, projectId!)
              : `${workspaceRoutes.projectDetails(workspaceId!, projectId!)}/${tab.route}`
          );
        }}
      >
        <TabsList className="bg-muted p-1 w-fit gap-2">
          {PROJECT_NAVIGATION_ITEMS.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              onMouseEnter={() => prefetchTab(tab.value, tab.loader)}
              className="flex items-center gap-2 px-4 py-2 text-sm"
            >
              <tab.icon
                size={16}
                className={tab.iconColor}
              />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Content */}
      <section className="pt-4 flex-1">
        <Suspense fallback={getSkeleton()}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Outlet context={{ project, projectId, }} />
          </motion.div>
        </Suspense>
      </section>
      {isTaskModalOpen && (
        <CreateTaskDialog setIsDialogOpen={setIsTaskModalOpen} />
      )}
    </div>
  );
};

export default ProjectLayout;
