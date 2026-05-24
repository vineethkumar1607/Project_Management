import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import { fetchProjects } from "~/store/thunks/projectThunk";


// Custom hook to fetch projects for a given workspace. It takes an optional workspaceId parameter, retrieves the current project data from the Redux store, and dispatches the fetchProjects action if the data is not already being fetched or has not been fetched yet. This hook ensures that project data is loaded and available in the store for components that need it.

export const useProjectsFetcher = (workspaceId?: string) => {
    const dispatch = useAppDispatch();


    const projectData = useAppSelector(
        state => workspaceId ? state.project.projectsByWorkspace[workspaceId] : null);

    useEffect(() => {
        if (!workspaceId) return;


        const shouldFetch = !projectData || projectData.status === "idle"

        if (shouldFetch) {
            dispatch(fetchProjects(workspaceId));
        }

    }, [workspaceId, projectData?.status, dispatch,]);
};