export const workspaceRoutes = {

  dashboard: (workspaceId: string) => `/workspace/${workspaceId}`,

  projects: (workspaceId: string) => `/workspace/${workspaceId}/projects`,

  projectDetails: (workspaceId: string, projectId: string) => `/workspace/${workspaceId}/projects/${projectId}`,

  team: (workspaceId: string) => `/workspace/${workspaceId}/team`,

  settings: (workspaceId: string) => `/workspace/${workspaceId}/settings`,

  settingsWorkspace: (workspaceId: string) => `/workspace/${workspaceId}/settings/workspace`,

  settingsBilling: (workspaceId: string) => `/workspace/${workspaceId}/settings/billing`,

  taskDetails: (workspaceId: string, projectId: string, taskId: string) =>
    `/workspace/${workspaceId}/projects/${projectId}/tasks/${taskId}`,

  projectAnalytics: (
    workspaceId: string,
    projectId: string
  ) =>
    `/workspace/${workspaceId}/projects/${projectId}/analytics`,

  projectCalendar: (
    workspaceId: string,
    projectId: string
  ) =>
    `/workspace/${workspaceId}/projects/${projectId}/calendar`,

  projectSettings: (
    workspaceId: string,
    projectId: string
  ) =>
    `/workspace/${workspaceId}/projects/${projectId}/settings`,

  projectTasks: (
    workspaceId: string,
    projectId: string
  ) =>
    `/workspace/${workspaceId}/projects/${projectId}`,
};