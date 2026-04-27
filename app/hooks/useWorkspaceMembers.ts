import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import { fetchWorkspaceMembers } from "~/store/workspaceThunk";


// Custom hook to fetch and return workspace members. It uses the current workspace ID from the Redux store to fetch members and returns the members along with a loading state.
export const useWorkspaceMembers = () => {
    const dispatch = useAppDispatch();

    const workspaceId = useAppSelector(
        (state) => state.workspace.currentWorkspaceId
    );
    // Get the workspace members data and status from the Redux store based on the current workspace ID. This allows the hook to return the members and their loading status.
    const workspaceData = useAppSelector((state) =>
        workspaceId
            ? state.workspace.membersByWorkspace[workspaceId]
            : null
    );

    const members = workspaceData?.data ?? [];
    const status = workspaceData?.status;

    // Fetch only when needed
    useEffect(() => {
        if (workspaceId && (!workspaceData || status !== "succeeded")) {
            dispatch(fetchWorkspaceMembers(workspaceId));
        }
    }, [workspaceId, status, dispatch]);

    return {
        members,
        isLoading: status === "loading",
    };
};