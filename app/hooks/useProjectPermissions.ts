import { useMemo } from "react";
import { useUser } from "@clerk/clerk-react";

import type { Project } from "~/types/workspace";

import { useWorkspaceRole } from "./useWorkspaceRole";

export const useProjectPermissions = (
    project?: Project
) => {
    const { user } = useUser();

    const { isAdmin } = useWorkspaceRole();

    const isTeamLead = useMemo(() => {
        if (!project || !user) return false;

        return (
            project.team_lead === user.id
        );
    }, [project, user]);

    return {
        canDeleteProject:
            isAdmin || isTeamLead,

        canEditProject:
            isAdmin || isTeamLead,

        canManageMembers:
            isAdmin || isTeamLead,

        canCreateProject:
            isAdmin,

        isAdmin,
        isTeamLead,
    };
};