import { formatDisplayDate } from "~/lib/formatters";
import type { TaskListCardProps } from "~/types/workspace";

const TaskListCard = ({
  title,
  count,
  tasks,
  icon: Icon,
  emptyMessage,
  variant = "default",
  showDate = false,
  showMeta = false,
}: TaskListCardProps) => {
  const isOverdue = variant === "overdue";

  return (
    <section
      className={`
        overflow-hidden rounded-lg border transition-all duration-200
        hover:border-zinc-300 dark:hover:border-zinc-700

        ${
          isOverdue
            ? "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30"
            : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-linear-to-br dark:from-zinc-800/70 dark:to-zinc-900/50"
        }
      `}
    >
      {/* Header */}
      <div
        className={`
          border-b p-4 pb-3
          ${
            isOverdue
              ? "border-red-200 dark:border-red-900"
              : "border-zinc-200 dark:border-zinc-800"
          }
        `}
      >
        <div className="flex items-center gap-3">
          {Icon && (
            <div
              className={`
                rounded-lg p-2
                ${
                  isOverdue
                    ? "bg-red-100 dark:bg-red-900/40"
                    : "bg-zinc-50 dark:bg-zinc-800"
                }
              `}
            >
              <Icon
                className={
                  isOverdue
                    ? "h-4 w-4 text-red-500"
                    : "h-4 w-4 text-gray-500 dark:text-zinc-400"
                }
              />
            </div>
          )}

          <div className="flex flex-1 items-center justify-between">
            <h3
              className={`
                text-sm font-medium
                ${
                  isOverdue
                    ? "text-red-700 dark:text-red-400"
                    : "text-gray-800 dark:text-white"
                }
              `}
            >
              {title}
            </h3>

            {typeof count === "number" && (
              <span
                className={`
                  inline-block rounded px-2 py-1 text-xs font-semibold
                  ${
                    isOverdue
                      ? "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400"
                      : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                  }
                `}
              >
                {count}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {tasks.length === 0 ? (
          <p
            className={`
              py-4 text-center text-sm
              ${
                isOverdue
                  ? "text-red-500 dark:text-red-400"
                  : "text-gray-500 dark:text-zinc-400"
              }
            `}
          >
            {emptyMessage}
          </p>
        ) : (
          <div className="max-h-60 space-y-3 overflow-y-hidden pr-1 hover:overflow-y-auto no-scrollbar">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`
                  cursor-pointer rounded-lg p-3 transition-colors
                  ${
                    isOverdue
                      ? "bg-red-100/60 hover:bg-red-200/70 dark:bg-red-950/40 dark:hover:bg-red-900/50"
                      : "bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                  }
                `}
              >
                {/* Title */}
                <h4
                  className={`
                    truncate text-sm font-medium
                    ${
                      isOverdue
                        ? "text-red-700 dark:text-red-300"
                        : "text-gray-800 dark:text-white"
                    }
                  `}
                >
                  {task.title}
                </h4>

                {/* Meta */}
                {showMeta && (
                  <p
                    className={`
                      mt-1 text-xs capitalize
                      ${
                        isOverdue
                          ? "text-red-500 dark:text-red-400"
                          : "text-gray-600 dark:text-zinc-400"
                      }
                    `}
                  >
                    {task.type} • {task.priority} priority
                  </p>
                )}

                {/* Date */}
                {showDate && task.date && (
                  <time
                    className={`
                      mt-1 block text-xs
                      ${
                        isOverdue
                          ? "text-red-500 dark:text-red-400"
                          : "text-muted-foreground"
                      }
                    `}
                  >
                    {formatDisplayDate(task.date)}
                  </time>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TaskListCard;