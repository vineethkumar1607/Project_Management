import { useMemo } from "react";
import { useUser } from "@clerk/clerk-react";

import { useProjectsData } from "./useProjectsData";


// This hook is designed to fetch all tasks assigned to the current logged-in user across all projects. It uses the useProjectsData hook to get the list of projects and their associated tasks, then filters those tasks to return only those that are assigned to the current user and are not marked as "DONE". The useMemo hook is used to optimize performance by memoizing the filtered tasks list, ensuring that it only recalculates when the projects or user data changes.
export const useCurrentUserTasks = () => {
    const { user } = useUser();

    const { projects, loading, error, } = useProjectsData();

    const tasks = useMemo(() => {
        const allTasks = projects.flatMap(
            (project) => project.tasks ?? []
        );

        return allTasks.filter(
            (task) =>
                task.assignee?.email === user?.primaryEmailAddress?.emailAddress &&
                task.status !== "DONE");
    }, [projects, user]);

    return {
        tasks,
        loading,
        error,
    };
};