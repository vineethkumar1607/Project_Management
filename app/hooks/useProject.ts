// hooks/useProject.ts

import { useEffect } from "react";
import { useAppSelector } from "~/store/hooks";
import { useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "~/store/store";
import { fetchProjects } from "~/store/projectThunk";
import { useParams } from "react-router";

export const useProject = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { projectId } = useParams();

    const workspaceId = useAppSelector(
        (state) => state.workspace.currentWorkspaceId
    );

    const projectData = useAppSelector((state: RootState) =>
        workspaceId
            ? state.project.projectsByWorkspace[workspaceId]
            : null
    );

    const projects = projectData?.data || [];

    const project = projects.find(
        (p) => String(p.id) === String(projectId)
    );

    // 🔥 Fetch only when needed
    useEffect(() => {
        if (workspaceId && (!projectData || projectData.data.length === 0)) {
            dispatch(fetchProjects(workspaceId));
        }
    }, [workspaceId, projectData]);

    return {
        project,
        isLoading: !projectData || projectData.status === "loading",
    };
};