import { useMemo } from "react";
import type { Task } from "~/types/workspace";

const cache = new Map<string, any>();


// Custom hook to compute analytics data from tasks. Uses memoization and caching for performance optimization. Returns total, completed, in-progress, overdue counts, and data formatted for charts.
export const useAnalytics = (tasks: Task[]) => {
    return useMemo(() => {
        const key = JSON.stringify(tasks);

        // check cache before computing analytics 
        if (cache.has(key)) {
            return cache.get(key);
        }

        // compute analytics if not in cache 
        const now = new Date();
        const total = tasks.length;

        const statusMap = {
            TODO: 0,
            IN_PROGRESS: 0,
            DONE: 0,
        };

        const typeMap: Record<string, number> = {};
        const priorityMap = {
            LOW: 0,
            MEDIUM: 0,
            HIGH: 0,
        };

        let completed = 0;
        let inProgress = 0;
        let overdue = 0;

        tasks.forEach((task) => {
            if (task.status === "DONE") completed++;
            if (task.status === "IN_PROGRESS") inProgress++;

            if (
                task.due_date &&
                new Date(task.due_date) < now &&
                task.status !== "DONE"
            ) {
                overdue++;
            }

            statusMap[task.status]++;
            typeMap[task.type] = (typeMap[task.type] || 0) + 1;
            priorityMap[task.priority]++;
        });

        const result = {
            total,
            completed,
            inProgress,
            overdue,
            statusData: Object.entries(statusMap).map(([name, value]) => ({ name, value })),
            typeData: Object.entries(typeMap).map(([name, value]) => ({ name, value })),
            priorityData: Object.entries(priorityMap).map(([name, value]) => ({
                name,
                value,
                percentage: total ? Math.round((value / total) * 100) : 0,
            })),
        };


        // store in cache before returning result 
        cache.set(key, result);

        return result;
    }, [tasks]);
};