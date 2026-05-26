import { useWorkspaceRole } from "./useWorkspaceRole";

export const useWorkspacePermissions = () => {
    const { isAdmin, isMember } = useWorkspaceRole();

    return {
        canEditWorkspace: isAdmin,
        canDeleteWorkspace: isAdmin,
        canManageMembers: isAdmin,

        isAdmin,
        isMember,
    };
};