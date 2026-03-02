import { useState } from "react"
import { NavLink } from "react-router"
import { CheckSquare, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "~/components/ui/button"
import { ScrollArea } from "~/components/ui/scroll-area"
import { Badge } from "~/components/ui/badge"

const mockTasks = [
  { id: "1", title: "Design landing page", projectName: "Website Redesign", status: "IN_PROGRESS" },
  { id: "2", title: "Setup authentication", projectName: "Mobile App MVP", status: "TODO" },
  { id: "3", title: "Fix navbar bug", projectName: "Website Redesign", status: "DONE" },
]

export default function MyTasksSidebar() {
  // We use this state to toggle the dropdown open or closed
  const [isOpen, setIsOpen] = useState(true)

  // This helper maps the task status to a specific color for the status dot
  const getStatusColor = (status: string) => {
    if (status === "DONE") return "bg-green-500"
    if (status === "IN_PROGRESS") return "bg-yellow-500"
    return "bg-gray-400"
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
            <CheckSquare size={16}/>
            My Tasks
            <Badge variant="secondary">{mockTasks.length}</Badge>
          </div>
          {/* Swapping the arrow icon based on whether the list is open */}
          {isOpen ? <ChevronDown size={16}/> : <ChevronRight size={16}/>}
        </Button>
      </div>

      {isOpen && (
        <ScrollArea className="mt-1">
          <ul className="space-y-1 px-2">
            {mockTasks.map(task => (
              <li key={task.id}>
                <NavLink
                  to={`/tasks/${task.id}`}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${isActive
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 font-medium border border-blue-100 dark:border-blue-500/20"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    }`
                  }
                >
                  {/* The status dot color reflects the progress of the task */}
                  <span className={`w-2 h-2 rounded-full shrink-0 ${getStatusColor(task.status)}`} />
                  <div className="min-w-0">
                    <p className="truncate">{task.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{task.projectName}</p>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </ScrollArea>
      )}
    </section>
  )
}