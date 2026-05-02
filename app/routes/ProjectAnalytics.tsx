import React, { useEffect, useMemo } from "react";
import { CheckCircle, Clock, AlertTriangle, Users } from "lucide-react";

import MetricCard from "../components/MetricCard";
import StatusBarChart from "../components/StatusBarChart";
import TypePieChart from "../components/TypePieChart";
import PriorityBreakdown from "../components/PriorityBreakdown";
import { useGetTasksQuery } from "~/store/api/tasksApi";
import { useProjectContext } from "~/hooks/useProjectContext";


type ChartData = {
  name: string;
  value: number;
};

type PriorityChartData = {
  name: string;
  value: number;
  percentage: number;
};


/**
 * Main analytics container component.
 * Uses mock data automatically if real tasks are missing.
 */
const ProjectAnalytics = () => {

  const { projectId, project } = useProjectContext();

  const { data: tasks = [], isLoading } = useGetTasksQuery(projectId!, {
    skip: !projectId,  //  prevents invalid API call
  });


  // useEffect(() => {
  //   console.log("project", project);
  // }, [project]); 



  // Uses real tasks if available, otherwise fallback to mock
  const effectiveTasks = tasks;

  const analytics = useMemo(() => {
    const now = new Date();
    const total = effectiveTasks.length;

    const statusMap: Record<string, number> = {
      TODO: 0,
      IN_PROGRESS: 0,
      DONE: 0,
    };

    const typeMap: Record<string, number> = {};
    const priorityMap: Record<string, number> = {
      LOW: 0,
      MEDIUM: 0,
      HIGH: 0,
    };

    let completed = 0;
    let inProgress = 0;
    let overdue = 0;

    effectiveTasks.forEach((task) => {
      if (task.status === "DONE") completed++;
      if (task.status === "IN_PROGRESS") inProgress++;
      if (
        new Date(task.due_date) < now &&
        task.status !== "DONE"
      )
        overdue++;

      statusMap[task.status]++;
      typeMap[task.type] =
        (typeMap[task.type] || 0) + 1;
      priorityMap[task.priority]++;
    });

    const statusData: ChartData[] = Object.entries(
      statusMap
    ).map(([name, value]) => ({ name, value }));

    const typeData: ChartData[] = Object.entries(
      typeMap
    ).map(([name, value]) => ({ name, value }));

    const priorityData: PriorityChartData[] =
      Object.entries(priorityMap).map(([name, value]) => ({
        name,
        value,
        percentage: total
          ? Math.round((value / total) * 100)
          : 0,
      }));

    return {
      total,
      completed,
      inProgress,
      overdue,
      statusData,
      typeData,
      priorityData,
    };
  }, [[JSON.stringify(tasks)]]); // Deep compare tasks for memoization 

  const completionRate = analytics.total
    ? Math.round(
      (analytics.completed / analytics.total) * 100
    )
    : 0;



  const metrics = [
    {
      title: "Completion Rate",
      value: `${completionRate}%`,
      icon: <CheckCircle className="text-green-500" />,
      color: "text-green-500",
    },
    {
      title: "Active Tasks",
      value: analytics.inProgress,
      icon: <Clock className="text-blue-500" />,
      color: "text-blue-500",
    },
    {
      title: "Overdue Tasks",
      value: analytics.overdue,
      icon: <AlertTriangle className="text-red-500" />,
      color: "text-red-500",
    },
    {
      title: "Team Size",
      value: project?.members?.length || 0,
      icon: <Users className="text-purple-500" />,
      color: "text-purple-500",
    },
  ];

  if (!projectId) return <div>Loading analytics...</div>;

  if (!tasks || tasks.length === 0) {
    return <div>No data available</div>;
  }


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
        <StatusBarChart data={analytics.statusData} />
        <TypePieChart data={analytics.typeData} />
      </div>

      {/* ================= PRIORITY ================= */}
      <PriorityBreakdown data={analytics.priorityData} />
    </main>
  );
};

export default React.memo(ProjectAnalytics);