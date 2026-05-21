import { format } from "date-fns";
import {
  Calendar,
  CheckCircle2,
  Flag,
  FolderKanban,
  Layers3,
} from "lucide-react";

import type { TaskDetails } from "~/types/workspace";

interface TaskInfoPanelProps {
  task: TaskDetails;
  statusClasses: string;
  priorityClasses: string;
}

export default function TaskInfoPanel({
  task,
  statusClasses,
  priorityClasses,
}: TaskInfoPanelProps) {
  return (
    <aside className="lg:col-span-3 min-h-0 lg:overflow-y-auto no-scrollbar pr-1">
      <div className="space-y-5 pb-8">
        <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-5">
          <p className="text-sm font-medium tracking-tight text-blue-600 dark:text-blue-400 mb-3">
            Task Overview
          </p>

          <h1 className="text-2xl font-semibold tracking-tight leading-tight break-words text-zinc-900 dark:text-white">
            {task.title}
          </h1>

          <div className="flex flex-wrap gap-2 mt-5">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${statusClasses}`}
            >
              <CheckCircle2 size={12} />
              {task.status.replace("_", " ")}
            </span>

            <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              <Layers3 size={12} />
              {task.type}
            </span>

            <span
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${priorityClasses}`}
            >
              <Flag size={12} />
              {task.priority}
            </span>
          </div>

          {task.description && (
            <div className="mt-6 border-t border-zinc-200 dark:border-zinc-800 pt-5">
              <h2 className="text-sm font-medium tracking-tight text-zinc-900 dark:text-white mb-3">
                Description
              </h2>

              <p className="text-sm leading-7 text-muted-foreground whitespace-pre-wrap break-words">
                {task.description}
              </p>
            </div>
          )}

          <div className="mt-6 border-t border-zinc-200 dark:border-zinc-800 pt-5 space-y-5">
            <h2 className="text-sm font-medium tracking-tight text-zinc-900 dark:text-white">
              Task Details
            </h2>

            <div className="flex items-center gap-3">
              <img
                src={task.assignee.image || "https://i.pravatar.cc/40"}
                alt={task.assignee.name}
                className="size-11 rounded-full object-cover border border-zinc-200 dark:border-zinc-700"
              />

              <div>
                <p className="text-xs text-muted-foreground">Assignee</p>
                <p className="text-sm font-medium">{task.assignee.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="size-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                <Calendar size={18} />
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Due Date</p>
                <time className="text-sm font-medium">
                  {format(new Date(task.due_date), "dd MMM yyyy")}
                </time>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-5 space-y-4">
          <div className="flex items-center gap-2">
            <FolderKanban
              size={18}
              className="text-blue-600 dark:text-blue-400"
            />

            <h2 className="text-sm font-medium tracking-tight text-zinc-900 dark:text-white">
              Project Information
            </h2>
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-1">Project Name</p>
            <p className="font-medium text-lg">{task.project.name}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              {task.project.status}
            </span>

            <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
              {task.project.priority}
            </span>
          </div>
        </section>
      </div>
    </aside>
  );
}
