import { Suspense, lazy, memo, useState, } from "react";
import { CheckCircle, Clock, FolderOpen, PauseCircle, Plus } from "lucide-react";
import ProjectOverviewSkeleton from "~/components/ui/ProjectOverviewSkeleton";
import StatsGridSkeleton from "~/components/ui/StatsGridSkeleton";
import RecentActivitySkeleton from "~/components/ui/RecentActivitySkeleton";
import TaskSummarySkeleton from "~/components/ui/TaskSummarySkeleton";
import { useUser } from "@clerk/clerk-react";
import PrimaryButton from "~/components/Common/PrimaryButton";
import { useProjects } from "~/hooks/useProjects";
import { useProjectAnalytics } from "~/hooks/useProjectAnalytics";
import MetricCard from "~/components/MetricCard";
import { useTaskAnalytics } from "~/hooks/useTaskAnalytics";

// Lazy components
const ProjectOverview = lazy(() => import("../components/ProjectOverview"));
const RecentActivity = lazy(() => import("../components/RecentActivity"));
const TasksSummary = lazy(() => import("../components/dashboard/TasksSummary"));


const Dashboard = () => {
  const [, setIsDialogOpen] = useState(false);
  const { user, isLoaded } = useUser();

  const { projects, loading, } = useProjects();

  const analytics = useProjectAnalytics(projects);

  const allTasks = projects.flatMap(
    (project) => project.tasks ?? []
  );

  const taskAnalytics = useTaskAnalytics({
    tasks: allTasks,
    userEmail:
      user?.primaryEmailAddress?.emailAddress,
  });

  console.log("allTasks",allTasks)
  console.log("taskAnalytics",taskAnalytics)
  /**
   * Loading state
   */
  if (!isLoaded) return null;

  const metrics = [
    {
      title: "Total Projects",
      value: analytics.totalProjects,
      description: "projects in workspace",
      icon: FolderOpen,
      iconBgColor: "bg-blue-500/10",
      iconColor: "text-blue-500",
    },
    {
      title: "Completed",
      value: analytics.completedProjects,
      description: "successfully completed",
      icon: CheckCircle,
      iconBgColor: "bg-emerald-500/10",
      iconColor: "text-emerald-500",
    },
    {
      title: "My Tasks",
      value: taskAnalytics.myTasks,
      description: "assigned to you",
      icon: Clock,
      iconBgColor: "bg-purple-500/10",
      iconColor: "text-purple-500",
    },
    {
      title: "Overdue Tasks",
      value: taskAnalytics.overdueTasks,
      description: "require attention",
      icon: PauseCircle,
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

    </div>
  );
};

export default memo(Dashboard);