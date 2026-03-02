import { type RouteConfig } from "@react-router/dev/routes";

export default [
  {
    path: "/",
    file: "routes/Dashboard.tsx",
  },
  {
    path: "/projects",
    file: "routes/Projects.tsx",
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

  // ✅ ADD THIS
  {
    path: "/tasks/:taskId",
    file: "routes/TaskDetails.tsx",
  },

  {
    path: "/team",
    file: "routes/Teampage.tsx",
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
