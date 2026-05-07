import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import { fetchWorkspaceMembers } from "~/store/workspaceThunk";

const STALE_TIME = 5 * 60 * 1000; // 5 minutes
// Custom hook to manage workspace members data, including fetching, loading states, and error handling. It ensures that the members list is always up-to-date by refetching when necessary.



export const useWorkspaceMembers = () => {
    const dispatch = useAppDispatch();
    // Get the current workspace ID from the Redux store. This ID is essential for fetching the corresponding members of the workspace.
    const workspaceId = useAppSelector(
        (state) => state.workspace.currentWorkspaceId
    );
    // Get workspace members data from the store based on the current workspace ID. If no workspace ID is available, it returns null.
    const workspaceData = useAppSelector((state) =>
        workspaceId
            ? state.workspace.membersByWorkspace[workspaceId]
            : null
    );
    // Memoize the members list to avoid unnecessary re-renders. It will only recompute when workspaceData changes.
    const members = useMemo(
        () => workspaceData?.data ?? [],
        [workspaceData]
    );

    const status = workspaceData?.status;

    const isInitialLoading = !workspaceData;

    const isBackgroundLoading =
        !!workspaceData && status === "loading";

    const isError = status === "failed";

    // Refetch members if workspaceId changes, or if the data is stale, or if the previous fetch failed. This ensures that the members list is always up-to-date and handles error states gracefully.
    useEffect(() => {
        if (!workspaceId) return;

        const isStale =
            workspaceData?.lastFetched &&
            Date.now() - workspaceData.lastFetched > STALE_TIME;

        if (
            !workspaceData ||
            status === "failed" ||
            isStale
        ) {
            dispatch(fetchWorkspaceMembers(workspaceId));
        }
    }, [workspaceId, workspaceData, status, dispatch]);

    return {
        members,
        workspaceId,

        isInitialLoading,
        isBackgroundLoading,
        isError,

        status,
    };
};