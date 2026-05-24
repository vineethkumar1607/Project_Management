import { apiClient } from "~/api/client";
import type { Project } from "~/types/workspace";
import type { CreateProjectPayload } from "~/types/workspace";

export const projectApi = {
    // get projects by workspace
    getByWorkspace: async (workspaceId: string): Promise<Project[]> => {
        const res = await apiClient.get(
            `/api/projects/workspace/${workspaceId}`
        );

        return res.data.data;
    },

    // create project
    create: async (
        workspaceId: string,
        payload: CreateProjectPayload
    ): Promise<Project> => {

        const res = await apiClient.post(
            `/api/projects/workspace/${workspaceId}`,
            payload
        );

        return res.data.data;
    },

    // update project
   update: async (projectId: string, payload: any): Promise<Project> => {
   const res = await apiClient.put(
      `/api/projects/${projectId}`,
      payload
   );

   return res.data.data;
},

    // delete project
  delete: async (projectId: string): Promise<void> => {
   await apiClient.delete(`/api/projects/${projectId}`);
},
    // add member to project
  addMember: async (projectId: string, email: string) => {
   const res = await apiClient.post(
      `/api/projects/${projectId}/add-member`,
      { email }
   );

   return res.data.data;
},
    // remove member
  removeMember: async (
   projectId: string,
   memberId: string
) => {

   const res = await apiClient.delete(
      `/api/projects/${projectId}/member/${memberId}`
   );

   return res.data.data;
},
    // get project members
    getProjectMembers: async (projectId: string) => {
        const res = await apiClient.get(`/api/projects/${projectId}/members`);
        return res.data.data;
    }
};
