import {
  ListTodo,
  BarChart2,
  Calendar,
  Settings,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

export type ProjectNavigationItem = {
  value: string;
  label: string;
  icon: LucideIcon;

  route: string;

  iconColor: string;
  activeColor: string;

  loader?: () => Promise<any>;
};

export const PROJECT_NAVIGATION_ITEMS = [
  {
    value: "tasks",
    label: "Tasks",
    icon: ListTodo,

    route: ".",

    iconColor: "text-blue-500",
    activeColor:
      "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",

    loader: () => import("~/routes/ProjectTasks"),
  },

  {
    value: "analytics",
    label: "Analytics",
    icon: BarChart2,

    route: "analytics",

    iconColor: "text-violet-500",
    activeColor:
      "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400",

    loader: () => import("~/routes/ProjectAnalytics"),
  },

  {
    value: "calendar",
    label: "Calendar",
    icon: Calendar,

    route: "calendar",

    iconColor: "text-emerald-500",
    activeColor:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",

    loader: () => import("~/routes/ProjectCalendar"),
  },

  {
    value: "settings",
    label: "Settings",
    icon: Settings,

    route: "settings",

    iconColor: "text-amber-500",
    activeColor:
      "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",

    loader: () => import("~/routes/ProjectSettings"),
  },
] satisfies ReadonlyArray<ProjectNavigationItem>;