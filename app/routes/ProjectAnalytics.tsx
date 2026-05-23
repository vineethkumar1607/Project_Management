import React from "react";
import { CheckCircle, Clock, AlertTriangle, Users, BarChart2 } from "lucide-react";

import MetricCard from "~/components/common/MetricCard";
import StatusBarChart from "~/features/analytics/StatusBarChart";
import TypePieChart from "~/features/analytics/TypePieChart";
import PriorityBreakdown from "~/features/analytics/PriorityBreakdown";

import { useProjectContext } from "~/features/projects/hooks/useProjectContext";
import { useAnalytics } from "~/features/projects/hooks/useCurrentProjectAnalytics";
import { useNavigate, useParams } from "react-router";
import { useGetTasksQuery } from "~/store/api/tasksApi";
import StatsGridSkeleton from "~/components/skeletons/StatsGridSkeleton";
import ErrorState from "~/components/common/ErrorState";
import EmptyState from "~/components/common/EmptyState";
import PrimaryButton from "~/components/common/PrimaryButton";
import { workspaceRoutes } from "~/lib/routesHelper";


/**
 * Main analytics container component.
 */
const ProjectAnalytics = () => {
  const { project } = useProjectContext();
  const { workspaceId, projectId } = useParams();
  const navigate = useNavigate();

  const { data: tasks = [], isLoading, error, refetch, } = useGetTasksQuery(projectId!);

  const analytics = useAnalytics(tasks);


  if (isLoading) {
    return (
      <div className="space-y-10">
        <StatsGridSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load analytics"
        description="We couldn't fetch analytics data right now."
        onRetry={refetch}
      />
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <EmptyState
        icon={<BarChart2 className="h-10 w-10 text-muted-foreground" />}
        title="No analytics available"
        description="Create tasks to start seeing project insights and analytics."
        action={
          <PrimaryButton onClick={() => navigate(workspaceRoutes.projectDetails(workspaceId!, projectId!))}>
            Create Task
          </PrimaryButton>
        }
      />
    );
  }

  const completionRate = analytics.total
    ? Math.round(
      (analytics.completed / analytics.total) * 100
    )
    : 0;
  const metrics = [
    {
      title: "Completion Rate",
      value: `${completionRate}%`,
      description: "tasks completed successfully",
      icon: CheckCircle,
      iconColor: "text-green-500",
      iconBgColor: "bg-green-500/10",
    },
    {
      title: "Active Tasks",
      value: analytics.inProgress,
      description: "currently in progress",
      icon: Clock,
      iconColor: "text-blue-500",
      iconBgColor: "bg-blue-500/10",
    },
    {
      title: "Overdue Tasks",
      value: analytics.overdue,
      description: "require immediate attention",
      icon: AlertTriangle,
      iconColor: "text-red-500",
      iconBgColor: "bg-red-500/10",
    },
    {
      title: "Team Size",
      value: project?.members?.length || 0,
      description: "active project members",
      icon: Users,
      iconColor: "text-purple-500",
      iconBgColor: "bg-purple-500/10",
    },
  ];



  return (
    <main className="space-y-10">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Project Analytics
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Overview of task distribution and performance insights
          </p>
        </div>
      </div>
      {/* ================= KPI CARDS ================= */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </section>

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="min-h-[300px]">
          <StatusBarChart data={analytics.statusData} />
        </div>

        <div className="min-h-[300px]">
          <TypePieChart data={analytics.typeData} />
        </div>
      </div>

      {/* ================= PRIORITY ================= */}
      <PriorityBreakdown data={analytics.priorityData} />
    </main>
  );
};

export default React.memo(ProjectAnalytics);