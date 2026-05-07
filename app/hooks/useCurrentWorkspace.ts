import { useMemo } from "react";

import { useAppSelector } from "~/store/hooks";

export const useCurrentWorkspace = () => {
    const {
        workspaces,
        currentWorkspaceId,
    } = useAppSelector(
        (state) => state.workspace
    );

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
    };
};