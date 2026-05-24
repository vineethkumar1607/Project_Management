import type { FC, ReactNode } from "react";
import { Clock, FolderPlus, CheckCircle, UserPlus } from "lucide-react";

/* =======================
   Types
======================= */

type ActivityType = "PROJECT_CREATED" | "TASK_COMPLETED" | "MEMBER_ADDED";

interface Activity {
  id: string;
  type: ActivityType;
  message: string;
  time: string;
}

/* =======================
   Mock Data
======================= */

const activities: Activity[] = [
  {
    id: "1",
    type: "PROJECT_CREATED",
    message: "Created project “Dashboard Revamp”",
    time: "2 hours ago",
  },
  {
    id: "2",
    type: "TASK_COMPLETED",
    message: "Completed task “Fix login redirect bug”",
    time: "5 hours ago",
  },
  {
    id: "3",
    type: "MEMBER_ADDED",
    message: "Added John to project “Task Manager MVP”",
    time: "Yesterday",
  },
];

/* =======================
   Helpers
======================= */

const activityIconMap: Record<ActivityType, ReactNode> = {
  PROJECT_CREATED: (
    <FolderPlus aria-hidden="true" className="w-4 h-4 text-blue-500" />
  ),
  TASK_COMPLETED: (
    <CheckCircle aria-hidden="true" className="w-4 h-4 text-emerald-500" />
  ),
  MEMBER_ADDED: (
    <UserPlus aria-hidden="true" className="w-4 h-4 text-purple-500" />
  ),
};

/* =======================
   Component
======================= */

const RecentActivity: FC = () => {
  return (
    <section
      aria-labelledby="recent-activity-heading"
      className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden"
    >
      {/* Header */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 p-4">
        <h2
          id="recent-activity-heading"
          className="text-md font-medium text-zinc-800 dark:text-zinc-300"
        >
          Recent Activity
        </h2>
      </div>

      {/* Body */}
      <div className="p-4">
        {activities.length === 0 ? (
          <div
            role="status"
            aria-live="polite"
            className="text-center py-10 text-zinc-500 dark:text-zinc-400"
          >
            <Clock aria-hidden="true" className="mx-auto mb-3" />
            No recent activity
          </div>
        ) : (
          <ul className="space-y-4">
            {activities.map((activity) => (
              <li
                key={activity.id}
                className="flex items-start gap-3"
              >
                <div className="mt-1">
                  {activityIconMap[activity.type]}
                </div>

                <div className="flex-1">
                  <p className="text-sm text-zinc-700 dark:text-zinc-300">
                    {activity.message}
                  </p>
                  <p className="text-xs text-zinc-400 mt-1">
                    {activity.time}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default RecentActivity;
