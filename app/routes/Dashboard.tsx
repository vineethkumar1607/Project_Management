import { Suspense, lazy, memo, useState, } from "react";
import { CheckCircle,  FolderOpen, ListTodo, PauseCircle, Plus, } from "lucide-react";
import ProjectOverviewSkeleton from "~/components/skeletons/ProjectOverviewSkeleton";
import StatsGridSkeleton from "~/components/skeletons/StatsGridSkeleton";
import RecentActivitySkeleton from "~/components/skeletons/RecentActivitySkeleton";
import TaskSummarySkeleton from "~/components/skeletons/TaskSummarySkeleton";
import { useUser } from "@clerk/clerk-react";
import PrimaryButton from "~/components/common/PrimaryButton";
import { useProjectAnalytics } from "~/features/projects/hooks/useProjectAnalytics";
import MetricCard from "~/components/common/MetricCard";
import { useTaskAnalytics } from "~/features/tasks/hooks/useTaskAnalytics";
import CreateProjectDialog from "~/features/projects/CreateProjectDialogBox";
import { useProjectsData } from "~/features/projects/hooks/useProjectsData";

// Lazy components
const ProjectOverview = lazy(() => import("~/features/dashboard/ProjectOverview"));
const RecentActivity = lazy(() => import("~/features/dashboard/RecentActivity"));
const TasksSummary = lazy(() => import("~/features/dashboard/TasksSummary"));

const Dashboard = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user} = useUser();


  const { projects, loading, } = useProjectsData();

  const analytics = useProjectAnalytics(projects);

  const allTasks = projects.flatMap(
    (project) => project.tasks ?? []
  );

  const currentUserTasks = allTasks.filter(
    (task) =>
      task.assignee?.email ===
      user?.primaryEmailAddress?.emailAddress &&
      task.status !== "DONE"
  );

  const taskAnalytics = useTaskAnalytics({
    tasks: currentUserTasks,
  });



  const metrics = [
    {
      title: "Total Projects",
      value: analytics.totalProjects,
      icon: FolderOpen,
      description: "projects in workspace",
      iconBgColor: "bg-blue-500/10",
       iconColor: "text-blue-500",
    },
    {
      title: "Completed Projects",
      value: analytics.completedProjects,
      icon: CheckCircle,
      description: "successfully completed",
      iconBgColor: "bg-emerald-500/10", 
      iconColor: "text-emerald-500",
    },
    {
      title: "My Tasks",
      value: taskAnalytics.totalTasks,
      icon: ListTodo,
      description: "your active tasks",
      iconBgColor: "bg-purple-500/10",
       iconColor: "text-purple-500",
    },
  
    {
      title: "Overdue",
      value: taskAnalytics.overdueTasksCount,
      icon: PauseCircle,
      description: "require attention",
      iconBgColor: "bg-amber-500/10", 
      iconColor: "text-amber-500",
    },
  ];

  return (
    <div className="space-y-8">

      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome, {user?.fullName || user?.firstName || "User"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Here’s what’s happening with your projects today.
          </p>
        </div>

        <PrimaryButton
          onClick={() => setIsDialogOpen(true)}
          icon={<Plus className="size-4" />}
        >
          New Project
        </PrimaryButton>
      </header>

      <section>
        {loading ? (
          <StatsGridSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric) => (
              <MetricCard
                key={metric.title}
                {...metric}
              />
            ))}
          </div>
        )}
      </section>

      <section
        aria-label="Dashboard content"
        className="grid lg:grid-cols-3 gap-6"
      >
        <div className="lg:col-span-2 space-y-8">
          <Suspense fallback={<ProjectOverviewSkeleton />}>
            <ProjectOverview />
          </Suspense>

          <Suspense fallback={<RecentActivitySkeleton />}>
            <RecentActivity />
          </Suspense>
        </div>

        <aside>
          <Suspense fallback={<TaskSummarySkeleton />}>
            <TasksSummary />
          </Suspense>
        </aside>
      </section>

      {isDialogOpen && (
        <CreateProjectDialog
          setIsDialogOpen={setIsDialogOpen}
        />
      )}
    </div>

  );
};

export default memo(Dashboard);