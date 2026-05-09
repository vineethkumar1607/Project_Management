
import { useMemo } from "react";
import type { Task } from "~/types/workspace";

interface UseTaskAnalyticsProps {
    tasks: Task[];
}

export const useTaskAnalytics = ({
    tasks,
}: UseTaskAnalyticsProps) => {
    return useMemo(() => {
        const completedTasks = tasks.filter(
            (task) => task.status === "DONE"
        );

        const inProgressTasks = tasks.filter(
            (task) =>
                task.status === "IN_PROGRESS"
        );

        const overdueTasks = tasks.filter(
            (task) => {
                if (!task.due_date) return false;

                return (
                    new Date(task.due_date) <
                    new Date() &&
                    task.status !== "DONE"
                );
            }
        );

        return {
            // counts
            totalTasks: tasks.length,

            completedTasksCount:
                completedTasks.length,

            inProgressTasksCount:
                inProgressTasks.length,

            overdueTasksCount:
                overdueTasks.length,

            // arrays
            completedTasks,
            inProgressTasks,
            overdueTasks,
        };
    }, [tasks]);
};

