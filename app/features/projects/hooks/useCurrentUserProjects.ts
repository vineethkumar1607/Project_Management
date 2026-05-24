import { useMemo } from "react";

import { useProjectsData } from "./useProjectsData";
import { useCurrentUserTasks } from "~/features/tasks/hooks/useCurrentUserTasks";


// This hook is designed to fetch all projects that have tasks assigned to the current logged-in user. It uses the useProjectsData hook to get the list of projects and their associated tasks, and the useCurrentUserTasks hook to get the list of tasks assigned to the current user. It then creates a set of project IDs from the user's tasks and filters the projects to return only those that match the user's project IDs. The useMemo hook is used to optimize performance by memoizing both the set of user project IDs and the filtered list of user projects, ensuring that they only recalculate when their dependencies change.
export const useCurrentUserProjects = () => {
  const {
    projects,
    loading,
    error,
  } = useProjectsData();

  const { tasks } = useCurrentUserTasks();

  const userProjectIds = useMemo(() => {
    return new Set(
      tasks.map((task) => task.projectId)
    );
  }, [tasks]);

  const userProjects = useMemo(() => {
    return projects.filter((project) =>
      userProjectIds.has(project.id)
    );
  }, [projects, userProjectIds]);

  return {
    projects: userProjects,
    loading,
    error,
  };
};
