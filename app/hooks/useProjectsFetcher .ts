import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import { fetchProjects } from "~/store/projectThunk";


// Custom hook to fetch projects for the current workspace. It checks if the projects data is stale or if it has not been fetched yet, and dispatches the fetch action accordingly. This hook abstracts away the logic for managing project data fetching, allowing components to simply call it to ensure they have the latest projects data without worrying about the underlying implementation details.

const STALE_TIME = 5 * 60 * 1000; // 5 minutes  
export const useProjectsFetcher = () => {
    const dispatch = useAppDispatch();

    const workspaceId = useAppSelector(
        state => state.workspace.currentWorkspaceId
    );

    const projectData = useAppSelector(
        state =>
            workspaceId
                ? state.project.projectsByWorkspace[workspaceId]
                : null
    );

    useEffect(() => {
        if (!workspaceId) return;

        const isStale =
            projectData?.lastFetched &&
            Date.now() - projectData.lastFetched > STALE_TIME;

        const shouldFetch =
            !projectData ||
            projectData.status === "idle" ||
            isStale;

        if (shouldFetch) {
            dispatch(fetchProjects(workspaceId));
        }
        console.count("useProjectsFetcher called");
    }, [
        workspaceId,
        projectData?.lastFetched,
        projectData?.status,
        dispatch,
    ]);
};