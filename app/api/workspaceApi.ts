import { apiClient } from "./client";
import type { Workspace } from "~/types/workspace";

export const workspaceApi = {
    getAll: async (): Promise<Workspace[]> => {
        const res = await apiClient.get("/api/workspace")
        return res.data.data;
    },

    create: async (name: string): Promise<Workspace> => {
        const res = await apiClient.post("/api/workspace", { name });
        return res.data.data;
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/api/workspace/${id}`);
    },
};