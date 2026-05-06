import { useMemo } from "react";
import type { Task } from "~/types/workspace";

interface UseTaskAnalyticsProps {
    tasks: Task[];
    userEmail?: string;
}

export const useTaskAnalytics = ({
    tasks,
    userEmail,
}: UseTaskAnalyticsProps) => {
    return useMemo(() => {
        const totalTasks = tasks.length;

        const completedTasks = tasks.filter(
            (task) => task.status === "DONE"
        ).length;

        const inProgressTasks = tasks.filter(
            (task) =>
                task.status === "IN_PROGRESS"
        ).length;

        const overdueTasks = tasks.filter(
            (task) => {
                if (!task.due_date) return false;

                return (
                    new Date(task.due_date) <
                    new Date() &&
                    task.status !== "DONE"
                );
            }
        ).length;

        const myTasks = tasks.filter(
            (task) =>
                task.assignee?.email === userEmail
        ).length;

        return {
            totalTasks,
            completedTasks,
            inProgressTasks,
            overdueTasks,
            myTasks,
        };
    }, [tasks, userEmail]);
};