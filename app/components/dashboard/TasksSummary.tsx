import { Clock, AlertTriangle, User, } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import TasksSummarySkeleton from "./TasksSummarySkeleton";
import TaskListCard from "~/components/Common/TaskListCard";
import { useProjectsData } from "~/hooks/useProjectsData";
import { useTaskAnalytics } from "~/hooks/useTaskAnalytics";


// This component displays a summary of the current user's tasks across all projects in the workspace. It retrieves the user's tasks, categorizes them (e.g., overdue, in progress), and displays them in separate cards. Each card shows the count of tasks and a list of tasks with relevant details. If there are no tasks in a category, it shows an appropriate empty message. The component also handles loading states by showing a skeleton loader while data is being fetched.
export default function TasksSummary() {
  const { user } = useUser();
  const { projects, loading } = useProjectsData();

  // Flatten all project tasks
  const allTasks = projects.flatMap(
    (project) => project.tasks ?? []
  );

  // Current user's active tasks
  const currentUserTasks =
    allTasks.filter(
      (task) =>
        task.assignee?.email === user?.primaryEmailAddress?.emailAddress &&
        task.status !== "DONE"
    );

  // Analytics
  const analytics =useTaskAnalytics({tasks: currentUserTasks,});

  if (loading) {
    return <TasksSummarySkeleton />;
  }

  const summaryCards = [
    {
      title: "My Tasks",
      tasks: currentUserTasks,
      count: analytics.totalTasks,
      icon: User,
      emptyMessage:"No tasks assigned",
    },

    {
      title: "Overdue",
      tasks: analytics.overdueTasks,
      count:analytics.overdueTasksCount,
      icon: AlertTriangle,
      emptyMessage:"No overdue tasks",
      variant: "overdue" as const,
    },

    {
      title: "In Progress",
      tasks: analytics.inProgressTasks,
      count:analytics.inProgressTasksCount,
      icon: Clock,
      emptyMessage:"No in progress tasks",
    },
  ];

  return (
    <div className="space-y-6">
      {summaryCards.map((card) => (
        <TaskListCard
          key={card.title}
          title={card.title}
          tasks={card.tasks}
          count={card.count}
          icon={card.icon}
          emptyMessage={
            card.emptyMessage
          }
          variant={card.variant}
          showMeta
        />
      ))}
    </div>
  );
}