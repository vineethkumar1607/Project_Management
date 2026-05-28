
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


    const workspaces = useAppSelector(
        (state) => state.workspace.workspaces
    );


    const workspaceLoading = useAppSelector(
        (state) => state.workspace.loading
    );





    const workspaceExists = useMemo(() => {
        /**
         * While loading,
         * do not fail validation 
         */
        if (workspaceLoading) {
            return true;
        }

        return workspaces.some((workspace) =>
            workspace.id === workspaceId);
    }, [workspaceLoading, workspaces, workspaceId,]);




    // Sync workspace when workspaceId changes or when organization changes 
    useEffect(() => {
        const syncWorkspace = async () => {
            if (!workspaceId) return;

            /**
             * Already synced
             */
            if (organization?.id === workspaceId) {
                return;
            }


            if (!workspaceExists) {
                return;
            }
            // Sync the workspace by setting the active organization in Clerk
            try {
                setIsSyncing(true);

                await setActive({
                    organization: workspaceId,
                });
            } catch (error) {
                console.error(
                    "Failed to sync workspace:",
                    error
                );
            } finally {
                setIsSyncing(false);
            }
        };

        syncWorkspace();
    }, [workspaceId, organization?.id, setActive, workspaceExists,]);

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
    };
};

