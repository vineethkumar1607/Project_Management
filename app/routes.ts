import { type RouteConfig } from "@react-router/dev/routes";


// This file defines the route configuration for the application. Each route object specifies the path, the component file to render, and any nested child routes. The configuration is structured to support a workspace-centric navigation flow, with routes for dashboards, projects, team management, and task details. The use of nested routes allows for a clean and organized structure, making it easier to manage complex navigation scenarios within the application.
export default [
  {
    path: "/",
    file: "routes/IndexRedirect.tsx",
  },
  {
    path: "/workspace/:workspaceId",
    file: "layouts/WorkspaceLayout.tsx",

    children: [
      {
        index: true,
        file: "routes/Dashboard.tsx",
      },

      {
        path: "projects",
        file: "routes/Projects.tsx",
      },

      {
        path: "projects/:projectId",
        file: "layouts/ProjectLayout.tsx",

        children: [
          {
            index: true,
            file: "routes/ProjectTasks.tsx",
          },

          {
            path: "analytics",
            file: "routes/ProjectAnalytics.tsx",
          },

          {
            path: "calendar",
            file: "routes/ProjectCalendar.tsx",
          },

          {
            path: "settings",
            file: "routes/ProjectSettings.tsx",
          },
        ],
      },

      {
        path: "team",
        file: "routes/Teampage.tsx",
      },
      {
        path: "settings",
        file: "features/settings/Settings.tsx",

        children: [
          {
            index: true,
            file: "routes/SettingsIndexRedirect.tsx",
          },

          {
            path: "workspace",
            file: "features/workspace/WorkspaceOverviewCard.tsx",
          },

          {
            path: "billing",
            file: "features/billing/BillingOverview.tsx",
          },
        ],
      }
    ],
  },
  {
    path: "/workspace/:workspaceId/projects/:projectId/tasks/:taskId",
    file: "routes/TaskDetails.tsx",
  },
  {
    path: "/login",
    file: "routes/Login.tsx",
  },
  {
    path: "*",
    file: "routes/NotFound.tsx",
  },
] satisfies RouteConfig;
