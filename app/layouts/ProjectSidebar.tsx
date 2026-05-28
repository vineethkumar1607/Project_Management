import { NavLink, useLocation } from "react-router";
import { Collapsible, CollapsibleContent, CollapsibleTrigger, } from "~/components/ui/collapsible";
import { PROJECT_NAVIGATION_ITEMS, } from "~/lib/projectNavigation";
import { ChevronRight, ArrowRight, } from "lucide-react";
import { TextSkeleton } from "~/components/skeletons/TextSkeleton";
import { workspaceRoutes } from "~/lib/routesHelper";
import { useActiveWorkspace } from "~/features/workspace/hooks/useActiveWorkspace";


interface Project {
    id: string;
    name: string;
}


interface ProjectSidebarProps {
    projects: Project[];
    loading?: boolean;
}


const ProjectSidebar = ({ projects, loading, }: ProjectSidebarProps) => {
    const location = useLocation();
    const { currentWorkspaceId } = useActiveWorkspace();

    const getProjectSubRoute = (route: string, workspaceId: string, projectId: string) => {
        switch (route) {
            case ".":
                return workspaceRoutes.projectTasks(workspaceId, projectId);

            case "analytics":
                return workspaceRoutes.projectAnalytics(workspaceId, projectId);

            case "calendar":
                return workspaceRoutes.projectCalendar(workspaceId, projectId);

            case "settings":
                return workspaceRoutes.projectSettings(workspaceId, projectId);

            default:
                return workspaceRoutes.projectTasks(workspaceId, projectId);
        }
    };

    if (loading) {
        return (
            <nav
                className="mt-2 px-3"
                aria-label="Project navigation"
            >
                {/* Header Skeleton */}
                <div className="flex items-center justify-between px-3 py-2">
                    <TextSkeleton className="h-4 w-16" />

                    <TextSkeleton className="h-4 w-4 rounded" />
                </div>

                {/* Project Item Skeletons */}
                <div className="space-y-2 px-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 px-3 py-2"
                        >
                            {/* Chevron */}
                            <TextSkeleton className="size-4 rounded" />

                            {/* Dot */}
                            <TextSkeleton className="size-2 rounded-full" />

                            {/* Project Name */}
                            <TextSkeleton className="h-4 flex-1" />
                        </div>
                    ))}
                </div>
            </nav>
        );
    }


    return (

        <nav className="mt- px-3" aria-label="Project navigation">

            {/* Sidebar section header */}
            <div className="flex items-center justify-between px-3 py-2">
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Projects
                </h3>

                {/* Shortcut to full projects page */}
                <NavLink
                    to={currentWorkspaceId ? workspaceRoutes.projects(currentWorkspaceId) : "/"}
                    className="text-muted-foreground hover:text-foreground transition">
                    <ArrowRight className="size-4" />
                </NavLink>
            </div>

            {/* List of workspace projects */}
            <div className="space-y-1 px-1">
                {projects.map((project) => {
                    /**
                     * Auto-expands the project if current route
                     * belongs to this project's nested pages.
                     */
                    const isProjectActive =
                        location.pathname.startsWith(workspaceRoutes.projectDetails(currentWorkspaceId!, project.id));
                    return (
                        <Collapsible key={project.id} defaultOpen={isProjectActive} className="group">

                            {/* Project header (collapsible trigger) */}
                            <CollapsibleTrigger asChild>
                                <button
                                    type="button"
                                    className="flex w-full items-center gap-2 px-3 py-2 rounded-md text-sm 
                             hover:bg-accent transition 
                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {/* Rotates when expanded  */}
                                    <ChevronRight
                                        className="size-4 transition-transform duration-200 
                               group-data-[state=open]:rotate-90"
                                    />

                                    {/* Small project indicator dot */}
                                    <div className="size-2 rounded-full bg-blue-500" />

                                    {/* Project name (truncated for long titles) */}
                                    <span className="truncate">{project.name}</span>
                                </button>
                            </CollapsibleTrigger>

                            {/* Nested project navigation items */}
                            <CollapsibleContent className="ml-6 mt-1 space-y-1">
                                {PROJECT_NAVIGATION_ITEMS.map((subItem) => (
                                    <NavLink
                                        key={subItem.value}
                                        to={getProjectSubRoute(
                                            subItem.route, currentWorkspaceId!, project.id
                                        )}
                                        end={subItem.value === "tasks"}
                                        /**
                                         * NavLink provides automatic active state detection.
                                         * Active sub-item gets highlighted.
                                         */
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 px-3 py-1.5 rounded-md text-xs transition ${isActive
                                                ? subItem.activeColor
                                                : "text-muted-foreground hover:bg-accent hover:text-foreground"
                                            }`
                                        }
                                    >
                                        <subItem.icon
                                            className={`size-3 ${subItem.iconColor}`}
                                        />
                                        {subItem.label}
                                    </NavLink>
                                ))}
                            </CollapsibleContent>
                        </Collapsible>
                    );
                })}
            </div>
        </nav>
    );
};

export default ProjectSidebar;
