import { useMemo } from "react";
import type { Project } from "~/types/workspace";

export const useProjectAnalytics = (
    projects: Project[]
) => {
    return useMemo(() => {
        const totalProjects = projects.length;

        const completedProjects = projects.filter(
            (p) => p.status === "COMPLETED"
        ).length;

        const activeProjects = projects.filter(
            (p) => p.status === "ACTIVE"
        ).length;

        const planningProjects = projects.filter(
            (p) => p.status === "PLANNING"
        ).length;

        const onHoldProjects = projects.filter(
            (p) => p.status === "ON_HOLD"
        ).length;

        const cancelledProjects = projects.filter(
            (p) => p.status === "CANCELLED"
        ).length;

        return {
            totalProjects,
            completedProjects,
            activeProjects,
            planningProjects,
            onHoldProjects,
            cancelledProjects,
        };
    }, [projects]);
};