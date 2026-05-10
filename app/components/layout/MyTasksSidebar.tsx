import { useState } from "react"
import { NavLink } from "react-router"
import { CheckSquare, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "~/components/ui/button"
import { ScrollArea } from "~/components/ui/scroll-area"
import { Badge } from "~/components/ui/badge";
import { useCurrentUserTasks } from "~/hooks/useCurrentUserTasks"



export default function MyTasksSidebar() {
  // We use this state to toggle the dropdown open or closed
  const [isOpen, setIsOpen] = useState(true)
  const { tasks: currentUserTasks, loading } = useCurrentUserTasks();

  // This helper maps the task status to a specific color for the status dot
  const getStatusColor = (status: string) => {
    if (status === "DONE") return "bg-green-500"
    if (status === "IN_PROGRESS") return "bg-yellow-500"
    return "bg-gray-400"
  }

  if (loading) {
    return (
      <section className="mt-2">
        <div className="px-3">
          <div className="flex items-center justify-between px-3 py-2">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-muted animate-pulse" />
              <div className="h-4 w-20 rounded bg-muted animate-pulse" />
            </div>

            <div className="h-5 w-6 rounded bg-muted animate-pulse" />
          </div>
        </div>

        <div className="mt-1 h-[180px] px-2 space-y-1">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-3 py-2 rounded-md"
            >
              <div className="w-2 h-2 rounded-full bg-muted animate-pulse" />

              <div className="h-4 flex-1 rounded bg-muted animate-pulse" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mt-2">
      <div className="px-3">
        {/* The main toggle button for the 'My Tasks' section */}
        <Button
          variant="ghost"
          onClick={() => setIsOpen(prev => !prev)}
          className="w-full justify-between px-3 py-2 text-sm text-muted-foreground hover:bg-accent"
        >
          <div className="flex items-center gap-2">
            <CheckSquare size={16} />
            My Tasks
            <Badge variant="secondary">{currentUserTasks.length}</Badge>
          </div>
          {/* Swapping the arrow icon based on whether the list is open */}
          {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </Button>
      </div>

      {isOpen && (
        <ScrollArea className="mt-1 h-[180px]">
          <ul className="space-y-1 px-2 pr-2">
            {currentUserTasks.map((task) => (
              <li key={task.id}>
                <NavLink
                  to={`/tasks/${task.id}`}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${isActive
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    }`
                  }
                >
                  {/* Status Dot */}
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${getStatusColor(task.status)}`}
                  />

                  {/* Task Title */}
                  <span className="truncate flex-1">
                    {task.title}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </ScrollArea>
      )}
    </section>
  )
}