import { CreditCard, Settings } from "lucide-react";
import { NavLink, Navigate, Outlet, useParams } from "react-router";

import { workspaceRoutes } from "~/lib/routesHelper";

const tabs = [
    {
        id: "workspace",
        label: "Workspace",
        icon: Settings,
        getHref: workspaceRoutes.settingsWorkspace,
    },

    {
        id: "billing",
        label: "Billing",
        icon: CreditCard,
        getHref: workspaceRoutes.settingsBilling,
    },
];

export default function SettingsPage() {
    const { workspaceId } = useParams();

    if (!workspaceId) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                    Settings
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    Manage workspace settings and billing.
                </p>
            </div>

            {/* Tabs */}
            <div className="border-b">
                <div className="flex items-center gap-2 overflow-x-auto">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;

                        return (
                            <NavLink
                                key={tab.id}
                                to={tab.getHref(workspaceId)}
                                end
                                className={({ isActive }) =>
                                    [
                                        "flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm transition-colors",
                                        isActive
                                            ? "border-primary font-medium text-foreground"
                                            : "border-transparent text-muted-foreground hover:text-foreground",
                                    ].join(" ")
                                }
                            >
                                <Icon size={16} />

                                {tab.label}
                            </NavLink>
                        );
                    })}
                </div>
            </div>

            {/* Nested Route */}
            <Outlet />
        </div>
    );
}