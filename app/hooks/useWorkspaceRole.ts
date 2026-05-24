import { useMemo } from "react";
import { useUser } from "@clerk/clerk-react";

import { useWorkspaceMembers } from "~/features/workspace/hooks/useWorkspaceMembers";

export const useWorkspaceRole = () => {
    const { user } = useUser();

    const { members } = useWorkspaceMembers();

    const currentMember = useMemo(() => {
        return members.find(
            (member) =>
                member.email ===
                user?.primaryEmailAddress?.emailAddress
        );
    }, [members, user]);

    const role = currentMember?.role ?? null;

    return {
        role,
        isAdmin: role === "ADMIN",
        isMember: role === "MEMBER",
    };
};