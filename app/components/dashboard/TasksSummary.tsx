import { Clock, AlertTriangle, User } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

import TasksSummarySkeleton from "./TasksSummarySkeleton";
import { useProjectsData } from "~/hooks/useProjectsData";
import { useTaskAnalytics } from "~/hooks/useTaskAnalytics";

export default function TasksSummary() {
  const { user } = useUser();

  const { projects, loading } =
    useProjectsData();

  // Get all tasks from all projects
  const allTasks = projects.flatMap(
    (project) => project.tasks ?? []
  );

  // Current logged-in user's active tasks
  const currentUserTasks =
    allTasks.filter(
      (task) =>
        task.assignee?.email ===
        user?.primaryEmailAddress
          ?.emailAddress &&
        task.status !== "DONE"
    );

  // Analytics for current user's tasks
  const analytics =
    useTaskAnalytics({
      tasks: currentUserTasks,
    });

  if (loading) {
    return <TasksSummarySkeleton />;
  }

  const summaryCards = [
    {
      title: "My Tasks",
      count: analytics.totalTasks,
      icon: User,
      color:
        "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400",
      items:
        currentUserTasks,
    },
    {
      title: "Overdue",
      count:
        analytics.overdueTasksCount,
      icon: AlertTriangle,
      color:
        "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400",
      items:
        analytics.overdueTasks
    },
    {
      title: "In Progress",
      count:
        analytics.inProgressTasksCount,
      icon: Clock,
      color:
        "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400",
      items:
        analytics.inProgressTasks
    },
  ];

  return (
    <div className="space-y-6">
      {summaryCards.map((card) => (
        <div
          key={card.title}
          className="bg-white dark:bg-zinc-950 dark:bg-linear-to-br dark:from-zinc-800/70 dark:to-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200 rounded-lg overflow-hidden"
        >
          <div className="border-b border-zinc-200 dark:border-zinc-800 p-4 pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                <card.icon className="w-4 h-4 text-gray-500 dark:text-zinc-400" />
              </div>

              <div className="flex items-center justify-between flex-1">
                <h3 className="text-sm font-medium text-gray-800 dark:text-white">
                  {card.title}
                </h3>

                <span
                  className={`inline-block mt-1 px-2 py-1 rounded text-xs font-semibold ${card.color}`}
                >
                  {card.count}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4">
            {card.items.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-zinc-400 text-center py-4">
                No {card.title.toLowerCase()}
              </p>
            ) : (<div className="space-y-3 max-h-60 overflow-y-hidden hover:overflow-y-auto no-scrollbar pr-1">
              {card.items.map((task) => (
                <div
                  key={task.id}
                  className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  <h4 className="text-sm font-medium text-gray-800 dark:text-white truncate">
                    {task.title}
                  </h4>

                  <p className="text-xs text-gray-600 dark:text-zinc-400 capitalize mt-1">
                    {task.type} •{" "}
                    {task.priority} priority
                  </p>
                </div>
              ))}
            </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}