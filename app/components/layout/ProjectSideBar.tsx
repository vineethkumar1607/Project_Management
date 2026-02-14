import { NavLink, useLocation } from "react-router";


import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "~/components/ui/collapsible";

import { ChevronRight, Settings, Kanban, BarChart3, Calendar, ArrowRight, } from "lucide-react";

/**
 * Minimal project shape required for sidebar rendering.
 * Keep this small — sidebar does not need full project object.
 */
interface Project {
    id: string;
    name: string;
}

/**
 * ProjectSidebar receives projects as props.
 * This keeps the component reusable and decoupled from Redux.
 */
interface ProjectSidebarProps {
    projects: Project[];
}

/**
    * Returns sub-navigation items for a given project.
    * Uses dynamic routing structure:
    * /projects/:projectId/:tab
    */
const getProjectSubItems = (projectId: string) => [
    { title: "Tasks", icon: Kanban, path: `/projects/${projectId}` },
    { title: "Analytics", icon: BarChart3, path: `/projects/${projectId}/analytics` },
    { title: "Calendar", icon: Calendar, path: `/projects/${projectId}/calendar` },
    { title: "Settings", icon: Settings, path: `/projects/${projectId}/settings` },
];

const ProjectSidebar = ({ projects }: ProjectSidebarProps) => {
    const location = useLocation();



    return (

        <nav className="mt-6 px-3" aria-label="Project navigation">

            {/* Sidebar section header */}
            <div className="flex items-center justify-between px-3 py-2">
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Projects
                </h3>

                {/* Shortcut to full projects page */}
                <NavLink
                    to="/projects"
                    className="text-muted-foreground hover:text-foreground transition"
                >
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
                    const isProjectActive = location.pathname.startsWith(
                        `/projects/${project.id}`
                    );

                    return (
                        <Collapsible
                            key={project.id}
                            defaultOpen={isProjectActive}
                            className="group"
                        >


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
                                {getProjectSubItems(project.id).map((subItem) => (
                                    <NavLink
                                        key={subItem.title}
                                        to={subItem.path}
                                        end={subItem.title === "Tasks"}
                                        /**
                                         * NavLink provides automatic active state detection.
                                         * Active sub-item gets highlighted.
                                         */
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 px-3 py-1.5 rounded-md text-xs transition ${isActive
                                                ? "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                                                : "text-muted-foreground hover:bg-accent hover:text-foreground"
                                            }`
                                        }
                                    >
                                        <subItem.icon className="size-3" />
                                        {subItem.title}
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
