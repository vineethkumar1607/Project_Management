import { useEffect, useState } from "react";
import { ArrowRight, Clock, AlertTriangle, User } from "lucide-react";
import TasksSummarySkeleton from "./TasksSummarySkeleton";

/* =======================
   Types
======================= */

type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";
type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

interface Task {
  id: string;
  title: string;
  type: string;
  priority: TaskPriority;
  status: TaskStatus;
  assigneeId?: string | null;
  due_date?: string | null;
}

/* =======================
   Component 
======================= */

export default function TasksSummary() {
   const [isLoading, setIsLoading] = useState(true);

 


  // Temporary mock logged in user 
  const user = { id: "user_1" };

  // Temporary mock data tasks 
  const [tasks] = useState<Task[]>([
    {
      id: "1",
      title: "Design dashboard layout",
      type: "design",
      priority: "HIGH",
      status: "IN_PROGRESS",
      assigneeId: "user_1",
      due_date: "2026-02-01",
    },
    {
      id: "2",
      title: "Fix login redirect bug",
      type: "bug",
      priority: "MEDIUM",
      status: "TODO",
      assigneeId: "user_1",
      due_date: "2026-01-20",
    },
    {
      id: "3",
      title: "Update API docs",
      type: "documentation",
      priority: "LOW",
      status: "DONE",
      assigneeId: "user_2",
    },
    {
      id: "4",
      title: "Resolve payment failure",
      type: "bug",
      priority: "HIGH",
      status: "IN_PROGRESS",
      assigneeId: "user_3",
      due_date: "2026-01-10",
    },
  ]);

   useEffect(() => {
      const timer = setTimeout(() => setIsLoading(false), 2000);
      return () => clearTimeout(timer);
    }, []);

      if (isLoading) return <TasksSummarySkeleton />;

  /* =======================
     Derived Data
  ======================= */

  const myTasks = tasks.filter(
    (task) => task.assigneeId === user.id
  );

  const overdueTasks = tasks.filter(
    (task) =>
      task.due_date &&
      new Date(task.due_date) < new Date() &&
      task.status !== "DONE"
  );

  const inProgressIssues = tasks.filter(
    (task) => task.status === "IN_PROGRESS"
  );

  const summaryCards = [
    {
      title: "My Tasks",
      count: myTasks.length,
      icon: User,
      color:
        "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400",
      items: myTasks.slice(0, 3),
    },
    {
      title: "Overdue",
      count: overdueTasks.length,
      icon: AlertTriangle,
      color:
        "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400",
      items: overdueTasks.slice(0, 3),
    },
    {
      title: "In Progress",
      count: inProgressIssues.length,
      icon: Clock,
      color:
        "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400",
      items: inProgressIssues.slice(0, 3),
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
            ) : (
              <div className="space-y-3">
                {card.items.map((task) => (
                  <div
                    key={task.id}
                    className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                  >
                    <h4 className="text-sm font-medium text-gray-800 dark:text-white truncate">
                      {task.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-zinc-400 capitalize mt-1">
                      {task.type} • {task.priority} priority
                    </p>
                  </div>
                ))}

                {card.count > 3 && (
                  <button className="flex items-center justify-center w-full text-sm text-gray-500 dark:text-zinc-400 hover:text-gray-800 dark:hover:text-white mt-2">
                    View {card.count - 3} more
                    <ArrowRight className="w-3 h-3 ml-2" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
