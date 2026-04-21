import { apiClient } from "./client";
import type { Project } from "~/types/workspace";
import type { CreateProjectPayload } from "~/types/workspace";

export const projectApi = {
    // get projects by workspace
    getByWorkspace: async (workspaceId: string): Promise<Project[]> => {
        const res = await apiClient.get(`/api/workspace/${workspaceId}/projects`);
        return res.data.data;
    },

    // create project
    create: async (workspaceId: string, payload: CreateProjectPayload): Promise<Project> => {
        const res = await apiClient.post(`/api/workspace/${workspaceId}/projects`,
            payload
        );
        return res.data.data;
    },
    update: async (projectId: string, payload: any): Promise<Project> => {
        const res = await apiClient.put(
            `/api/workspace/${projectId}`, 
            payload
        );
        return res.data.data;
    },

    // delete project
    delete: async (projectId: string): Promise<void> => {
        await apiClient.delete(`/api/workspace/${projectId}`);
    },
};