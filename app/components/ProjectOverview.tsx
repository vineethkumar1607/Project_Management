import { useState, type FC } from "react";
import { Link } from "react-router";
import ProjectOverviewSkeleton from "~/components/ui/ProjectOverviewSkeleton";
import type { Project } from "~/types/workspace";
import EmptyState from "~/components/Common/EmptyState";
import PrimaryButton from "~/components/Common/PrimaryButton";
import { FolderOpen, Plus } from "lucide-react";
import { useProjects } from "~/hooks/useProjects";

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


  const [, setIsDialogOpen] = useState(false);

  const { projects, loading, error } = useProjects();

  const isInitialLoading = loading && projects.length === 0;

  const isBackgroundLoading =
    loading && projects.length > 0;

  return (
    <section
      aria-labelledby="project-overview-heading"
      className="min-h-[420px] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden"
    >
      {isInitialLoading ? (
        <ProjectOverviewSkeleton />
      ) : error ? (
        <div className="p-6 text-center text-red-500">
          Failed to load projects
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="border-b border-zinc-200 dark:border-zinc-800 p-4 flex items-center justify-between">
            <h2 className="text-md font-medium text-zinc-800 dark:text-zinc-300">
              Project Overview
            </h2>

            <div className="flex items-center gap-3">
              {isBackgroundLoading && (
                <span className="text-xs text-muted-foreground">
                  Refreshing...
                </span>
              )}

              <Link to="/projects" className="text-sm text-muted-foreground">
                View all
              </Link>
            </div>
          </div>

          {/* Body */}
          <div className="max-h-125 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-400 p-4">
            {projects.length === 0 ? (
              isBackgroundLoading ? (
                // 🔥 KEY FIX → show skeleton instead of blank UI
                <ProjectOverviewSkeleton />
              ) : (
                <EmptyState
                  icon={
                    <FolderOpen className="text-blue-500 size-10 sm:size-12" />
                  }
                  title="No projects found"
                  description="Start by creating your first project."
                  action={
                    <PrimaryButton
                      onClick={() => setIsDialogOpen(true)}
                      icon={<Plus className="size-4" />}
                    >
                      Create Project
                    </PrimaryButton>
                  }
                />
              )
            ) : (
              <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {projects.map((project: Project) => (
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
                            className={`text-xs px-2 py-1 rounded ${statusColors[project.status]
                              }`}
                          >
                            {project.status.replace("_", " ")}
                          </span>
                          <span
                            className={`w-2 h-2 rounded-full border-2 ${priorityColors[project.priority]
                              }`}
                          />
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-zinc-500">Progress</span>
                          <span className="text-zinc-600">
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
          </div>
        </>
      )}
    </section>
  );
};

export default ProjectOverview;