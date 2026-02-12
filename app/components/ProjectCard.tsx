import { Link } from "react-router";
import { memo } from "react";

type ProjectStatus =
  | "PLANNING"
  | "ACTIVE"
  | "ON_HOLD"
  | "COMPLETED"
  | "CANCELLED";

type ProjectPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface Project {
  id: string;
  name: string;
  description?: string | null;
  status: ProjectStatus;
  priority: ProjectPriority;
  progress?: number | null;
}

interface ProjectCardProps {
  project: Project;
}

const statusColors: Record<ProjectStatus, string> = {
  PLANNING:
    "bg-gray-200 dark:bg-zinc-600 text-gray-900 dark:text-zinc-100",
  ACTIVE:
    "bg-emerald-200 dark:bg-emerald-500 text-emerald-900 dark:text-emerald-900",
  ON_HOLD:
    "bg-amber-200 dark:bg-amber-500 text-amber-900 dark:text-amber-900",
  COMPLETED:
    "bg-blue-200 dark:bg-blue-500 text-blue-900 dark:text-blue-900",
  CANCELLED:
    "bg-red-200 dark:bg-red-500 text-red-900 dark:text-red-900",
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const progressValue = Math.min(Math.max(project.progress ?? 0, 0), 100);

  return (
    <article
      className="h-full"
      aria-labelledby={`project-title-${project.id}`}
    >
      <Link
        to={`/projectsDetail?id=${project.id}&tab=tasks`}
        aria-label={`Open project ${project.name}`}
        className="block h-full bg-white dark:bg-zinc-950 
                   dark:bg-linear-to-br dark:from-zinc-800/70 dark:to-zinc-900/50 
                   border border-gray-200 dark:border-zinc-800 
                   hover:border-gray-300 dark:hover:border-zinc-700 
                   rounded-xl p-5 transition-all duration-200 
                   hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {/* Header */}
        <header className="mb-3">
          <h3
            id={`project-title-${project.id}`}
            className="font-semibold text-gray-900 dark:text-zinc-200 
                       mb-1 truncate group-hover:text-blue-500 
                       dark:group-hover:text-blue-400 transition-colors"
          >
            {project.name}
          </h3>

          <p className="text-gray-500 dark:text-zinc-400 text-sm line-clamp-2">
            {project.description?.trim() || "No description available"}
          </p>
        </header>

        {/* Meta Info */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <span
            className={`px-2 py-0.5 rounded text-xs font-medium ${
              statusColors[project.status]
            }`}
          >
            {project.status.replace("_", " ")}
          </span>

          <span className="text-xs text-gray-500 dark:text-zinc-500 capitalize">
            {project.priority.toLowerCase()} priority
          </span>
        </div>

        {/* Progress Section */}
        <section aria-label="Project progress" className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500 dark:text-zinc-500">
              Progress
            </span>
            <span className="text-gray-400 dark:text-zinc-400">
              {progressValue}%
            </span>
          </div>

          <div
            className="w-full bg-gray-200 dark:bg-zinc-800 h-1.5 rounded"
            role="progressbar"
            aria-valuenow={progressValue}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-1.5 rounded bg-blue-500 transition-all duration-300"
              style={{ width: `${progressValue}%` }}
            />
          </div>
        </section>
      </Link>
    </article>
  );
};

export default memo(ProjectCard);
