import { type RouteConfig } from "@react-router/dev/routes";

export default [
  {
    path: "/",                     // Home = Dashboard
    file: "routes/Dashboard.tsx",
  },
  {
    path: "/projects/:projectId",
    file: "routes/ProjectLayout.tsx",
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
    path: "/login",
    file: "routes/Login.tsx",
  },
  {
    path: "*",                     // Catch-all for not found
    file: "routes/NotFound.tsx",
  },
] satisfies RouteConfig;
