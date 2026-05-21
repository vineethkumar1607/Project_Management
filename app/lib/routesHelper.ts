export const workspaceRoutes = {
  dashboard: (workspaceId: string) =>
    `/workspace/${workspaceId}`,

  projects: (workspaceId: string) =>
    `/workspace/${workspaceId}/projects`,

  projectDetails: (
    workspaceId: string,
    projectId: string
  ) =>
    `/workspace/${workspaceId}/projects/${projectId}`,

  team: (workspaceId: string) =>
    `/workspace/${workspaceId}/team`,
};