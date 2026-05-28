import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";

import { useClerk, useOrganization, } from "@clerk/clerk-react";
import { useAppSelector } from "~/store/hooks";


type UseWorkspaceSyncReturn = {
    isReady: boolean;
    isSyncing: boolean;
    workspaceId?: string;

    workspaceExists: boolean;
    workspaceLoading: boolean;
    hasRecoveryFailed: boolean;
    hasWorkspaceAccess: boolean;
    organization: ReturnType<
        typeof useOrganization
    >["organization"];
};

// This hook ensures that the workspace in the URL is always in sync with Clerk's active organization. 
export const useWorkspaceSync = (): UseWorkspaceSyncReturn => {
    const { workspaceId } = useParams();
    const { organization } = useOrganization();
    const { setActive } = useClerk();
    const [isSyncing, setIsSyncing] = useState(false);
    const [hasRecoveryFailed, setHasRecoveryFailed] = useState(false);

    const workspaces = useAppSelector(
        (state) => state.workspace.workspaces
    );

    const workspaceLoading = useAppSelector(
        (state) => state.workspace.loading
    );

    const workspaceExists = useMemo(() => {
        // If we're still loading workspaces, we can't be sure if the workspace exists or not, so we return true to avoid false negatives
        if (workspaceLoading) return true;

        return workspaces.some((workspace) => workspace.id === workspaceId);
    }, [workspaceLoading, workspaces, workspaceId,]);

    const hasStaleOrganization = !!organization?.id && !workspaceLoading &&
        !workspaces.some(
            (workspace) => workspace.id === organization.id
        );

    const hasWorkspaceAccess = useMemo(() => {

        if (workspaceLoading) return true;


        return workspaces.some((workspace) => workspace.id === workspaceId);

    }, [workspaceLoading, workspaces, workspaceId,]);

    // Sync workspace when workspaceId changes or when organization changes 
    useEffect(() => {
        const syncWorkspace = async () => {
            if (!workspaceId) return;

            /**
             * Already synced
             */
            if (organization?.id === workspaceId) return;

            if (!workspaceExists) return;
            // Sync the workspace by setting the active organization in Clerk
            try {
                setIsSyncing(true);
                await setActive({ organization: workspaceId, });
            } catch (error) {
                console.error("Failed to sync workspace:", error);
            } finally {
                setIsSyncing(false);
            }
        };

        syncWorkspace();
    }, [workspaceId, organization?.id, setActive, workspaceExists,]);

    useEffect(() => {
        //    If we've already determined that recovery has failed, there's no point in trying again
        if (hasRecoveryFailed) return;

        // If the current organization doesn't match any of the user's workspaces, it means we have a stale organization that can't be accessed. This can happen if the workspace was deleted while the user was active. In this case, we should automatically switch to a valid workspace to prevent the user from being stuck in an inaccessible state.
        if (!hasStaleOrganization) return;
        const fallbackWorkspace = workspaces[0];

        /**
         * No valid workspace available
         */
        if (!fallbackWorkspace) {
            setHasRecoveryFailed(true);
            return;
        }

        const recoverWorkspace = async () => {
            try {
                await setActive({ organization: fallbackWorkspace.id, });
            } catch (error) {
                console.error("Workspace recovery failed:", error);

                setHasRecoveryFailed(true);
            }
        };

        recoverWorkspace();

    }, [hasStaleOrganization, workspaces, setActive, hasRecoveryFailed,]);

    const isReady = useMemo(() => {
        return (organization?.id === workspaceId && !isSyncing);
    }, [organization?.id, workspaceId, isSyncing,]);

    return {
        isReady,
        isSyncing,
        workspaceId,
        organization,
        workspaceExists,
        workspaceLoading,
        hasRecoveryFailed,
        hasWorkspaceAccess
    };
};

