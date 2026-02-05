import type { FC } from "react";
import { Link } from "react-router";
import { ArrowRight, Calendar, UsersIcon, FolderOpen } from "lucide-react";
import { format } from "date-fns";

/* =======================
   Types
======================= */

type ProjectStatus =
  | "PLANNING"
  | "ACTIVE"
  | "ON_HOLD"
  | "COMPLETED"
  | "CANCELLED";

type ProjectPriority = "LOW" | "MEDIUM" | "HIGH";

interface Project {
  id: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  members?: { id: string }[];
  end_date?: string;
  progress?: number;
}

/* =======================
   Mock Data
======================= */

const projects: Project[] = [
  {
    id: "1",
    name: "Dashboard Revamp",
    description: "Redesign dashboard UI and add animations",
    status: "ACTIVE",
    priority: "HIGH",
    members: [{ id: "1" }, { id: "2" }],
    end_date: "2026-02-15",
    progress: 65,
  },
  {
    id: "2",
    name: "Task Manager MVP",
    description: "Initial MVP for task tracking",
    status: "ON_HOLD",
    priority: "MEDIUM",
    members: [{ id: "1" }],
    progress: 30,
  },
];

/* =======================
   Helpers
======================= */

const statusColors: Record<ProjectStatus, string> = {
  PLANNING: "bg-zinc-200 text-zinc-800 dark:bg-zinc-600 dark:text-zinc-200",
  ACTIVE:
    "bg-emerald-200 text-emerald-800 dark:bg-emerald-500 dark:text-emerald-900",
  ON_HOLD:
    "bg-amber-200 text-amber-800 dark:bg-amber-500 dark:text-amber-900",
  COMPLETED:
    "bg-blue-200 text-blue-800 dark:bg-blue-500 dark:text-blue-900",
  CANCELLED:
    "bg-red-200 text-red-800 dark:bg-red-500 dark:text-red-900",
};

const priorityColors: Record<ProjectPriority, string> = {
  LOW: "border-zinc-300 dark:border-zinc-600",
  MEDIUM: "border-amber-300 dark:border-amber-500",
  HIGH: "border-green-300 dark:border-green-500",
};

/* =======================
   Component
======================= */

const ProjectOverview: FC = () => {
  return (
    <section
      aria-labelledby="project-overview-heading"
      className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden"
    >
      {/* Header */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 p-4 flex items-center justify-between">
        <h2
          id="project-overview-heading"
          className="text-md font-medium text-zinc-800 dark:text-zinc-300"
        >
          Project Overview
        </h2>

        <Link
          to="/projects"
          className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 flex items-center gap-1"
        >
          View all
          <ArrowRight aria-hidden="true" className="w-4 h-4" />
        </Link>
      </div>

      {/* Body */}
      {projects.length === 0 ? (
        <div
          role="status"
          aria-live="polite"
          className="p-12 text-center text-zinc-500 dark:text-zinc-400"
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center justify-center">
            <FolderOpen aria-hidden="true" size={32} />
          </div>
          No projects yet
        </div>
      ) : (
        <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {projects.slice(0, 5).map((project) => (
            <li key={project.id}>
              <Link
                to={`/projects/${project.id}`}
                className="block p-4 sm:p-6 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
              >
                {/* Title + Status */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-zinc-800 dark:text-zinc-300 truncate">
                      {project.name}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                      {project.description || "No description"}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2 py-1 rounded ${statusColors[project.status]}`}
                    >
                      {project.status.replace("_", " ")}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full border-2 ${priorityColors[project.priority]}`}
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 dark:text-zinc-500 mb-3">
                  {project.members && (
                    <span className="flex items-center gap-1">
                      <UsersIcon aria-hidden="true" className="w-3 h-3" />
                      {project.members.length} members
                    </span>
                  )}

                  {project.end_date && (
                    <time
                      dateTime={project.end_date}
                      className="flex items-center gap-1"
                    >
                      <Calendar aria-hidden="true" className="w-3 h-3" />
                      {format(new Date(project.end_date), "MMM d, yyyy")}
                    </time>
                  )}
                </div>

                {/* Progress */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-500 dark:text-zinc-500">
                      Progress
                    </span>
                    <span className="text-zinc-600 dark:text-zinc-400">
                      {project.progress || 0}%
                    </span>
                  </div>
                  <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded h-1.5">
                    <div
                      className="h-1.5 bg-blue-500 rounded"
                      style={{ width: `${project.progress || 0}%` }}
                    />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ProjectOverview;
