import { Navigate, useParams } from "react-router";

import { workspaceRoutes } from "~/lib/routesHelper";

export default function SettingsIndexRedirect() {
    const { workspaceId } = useParams();

    if (!workspaceId) {
        return <Navigate to="/" replace />;
    }

    return (
        <Navigate
            to={workspaceRoutes.settingsWorkspace(workspaceId)}
            replace
        />
    );
}