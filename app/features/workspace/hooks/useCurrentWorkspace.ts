import { useMemo } from "react";

import { useAppSelector } from "~/store/hooks";

export const useCurrentWorkspace = () => {
    const workspaces = useAppSelector((state) => state.workspace.workspaces);
    const currentWorkspaceId = useAppSelector(
        (state) => state.workspace.currentWorkspaceId
    );
    const loading = useAppSelector((state) => state.workspace.loading);
    const error = useAppSelector((state) => state.workspace.error);

    const currentWorkspace = useMemo(() => {
        return workspaces.find(
            (workspace) =>
                workspace.id === currentWorkspaceId
        );
    }, [workspaces, currentWorkspaceId]);

    return {
        workspaces,
        currentWorkspaceId,
        currentWorkspace,
        loading,
        error,
    };
};
