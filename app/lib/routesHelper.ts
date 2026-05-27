export const workspaceRoutes = {

  dashboard: (workspaceId: string) => `/workspace/${workspaceId}`,

  projects: (workspaceId: string) => `/workspace/${workspaceId}/projects`,

  projectDetails: (workspaceId: string, projectId: string) => `/workspace/${workspaceId}/projects/${projectId}`,

  team: (workspaceId: string) => `/workspace/${workspaceId}/team`,

  settings: (workspaceId: string) => `/workspace/${workspaceId}/settings`,
  
  settingsWorkspace: (workspaceId: string) => `/workspace/${workspaceId}/settings/workspace`,

  settingsBilling: (workspaceId: string) => `/workspace/${workspaceId}/settings/billing`,
};