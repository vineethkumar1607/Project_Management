import { type RouteConfig } from "@react-router/dev/routes";

export default [
  {
    path: "/",                     // Home = Dashboard
    file: "routes/Dashboard.tsx",
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
