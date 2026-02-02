import { FolderOpen, CheckCircle, Users, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

/* =======================
   Types
======================= */

type ProjectStatus = "ACTIVE" | "COMPLETED" | "CANCELLED";
type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

interface User {
  email: string;
}

interface Task {
  id: string;
  status: TaskStatus;
  due_date?: string | null;
  assignee?: User | null;
}

interface Project {
  id: string;
  status: ProjectStatus;
  tasks: Task[];
}

interface Workspace {
  name: string;
  owner: User;
  projects: Project[];
}

interface WorkspaceState {
  currentWorkspace: Workspace | null;
}

interface RootState {
  workspace: WorkspaceState;
}

/* =======================
   Component
======================= */

export default function StatsGrid() {
  const currentWorkspace = useSelector(
    (state: RootState) => state.workspace.currentWorkspace
  );

  const currentUserEmail = currentWorkspace?.owner?.email;

  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    myTasks: 0,
    overdueIssues: 0,
  });

  useEffect(() => {
    if (!currentWorkspace?.projects) return;

    const projects = currentWorkspace.projects;

    const totalProjects = projects.length;

    const activeProjects = projects.filter(
      (p) => p.status !== "CANCELLED" && p.status !== "COMPLETED"
    ).length;

    const completedProjects = projects.filter(
      (p) => p.status === "COMPLETED"
    ).length;

    const myTasks = projects.reduce<number>((acc, project) => {
      const tasks = project.tasks ?? [];
      return (
        acc +
        tasks.filter(
          (t) => t.assignee?.email === currentUserEmail
        ).length
      );
    }, 0);

    const overdueIssues = projects.reduce<number>((acc, project) => {
      const tasks = project.tasks ?? [];
      return (
        acc +
        tasks.filter(
          (t) =>
            t.due_date &&
            new Date(t.due_date) < new Date() &&
            t.status !== "DONE"
        ).length
      );
    }, 0);

    setStats({
      totalProjects,
      activeProjects,
      completedProjects,
      myTasks,
      overdueIssues,
    });
  }, [currentWorkspace, currentUserEmail]);

  const statCards = [
    {
      icon: FolderOpen,
      title: "Total Projects",
      value: stats.totalProjects,
      subtitle: currentWorkspace
        ? `projects in ${currentWorkspace.name}`
        : "",
      bgColor: "bg-blue-500/10",
      textColor: "text-blue-500",
    },
    {
      icon: CheckCircle,
      title: "Completed Projects",
      value: stats.completedProjects,
      subtitle: `of ${stats.totalProjects} total`,
      bgColor: "bg-emerald-500/10",
      textColor: "text-emerald-500",
    },
    {
      icon: Users,
      title: "My Tasks",
      value: stats.myTasks,
      subtitle: "assigned to me",
      bgColor: "bg-purple-500/10",
      textColor: "text-purple-500",
    },
    {
      icon: AlertTriangle,
      title: "Overdue",
      value: stats.overdueIssues,
      subtitle: "need attention",
      bgColor: "bg-amber-500/10",
      textColor: "text-amber-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-9">
      {statCards.map(
        ({ icon: Icon, title, value, subtitle, bgColor, textColor }, index) => (
          <div
            key={index}
            className="bg-white dark:bg-zinc-950 dark:bg-linear-to-br dark:from-zinc-800/70 dark:to-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition duration-200 rounded-md"
          >
            <div className="p-6 py-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
                    {title}
                  </p>
                  <p className="text-3xl font-bold text-zinc-800 dark:text-white">
                    {value}
                  </p>
                  {subtitle && (
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                      {subtitle}
                    </p>
                  )}
                </div>
                <div className={`p-3 rounded-xl ${bgColor}`}>
                  <Icon size={20} className={textColor} />
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
