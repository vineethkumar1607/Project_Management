import { useParams } from "react-router";

import { useMemo } from "react";
import { useProjectsData } from "./useProjectsData";
// This hook is specifically designed to fetch the current project based on the URL parameter. It leverages the useProjects hook to get the list of projects and then finds the one that matches the projectId from the URL.
export const useCurrentProject = () => {
    const { projectId } = useParams();

    const {
        projects,
        loading,
        error,
    } = useProjectsData();

  const project = useMemo( () => projects.find( (p) => p.id === projectId ), [projects, projectId] );

    return {
        project,
        loading,
        error,
    };
};