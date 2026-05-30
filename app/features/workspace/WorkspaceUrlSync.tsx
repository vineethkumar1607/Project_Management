import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useOrganization } from "@clerk/clerk-react";

import { workspaceRoutes } from "~/lib/routesHelper";

export default function WorkspaceUrlSync() {
    const { organization } = useOrganization();

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!organization?.id) return;

        const expectedPath = workspaceRoutes.dashboard(organization.id);

        if (location.pathname.startsWith(expectedPath)) return;

        console.log("WORKSPACE URL SYNC",
            {
                orgId: organization?.id,
                path: location.pathname,
            }
        );

        navigate(expectedPath, { replace: true, });

    }, [organization?.id, location.pathname, navigate,]);

    return null;
}