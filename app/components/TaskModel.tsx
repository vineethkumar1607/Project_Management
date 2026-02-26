/*
DayTasksModal

Displays all tasks for a selected date.
Uses shadcn Dialog to ensure accessibility,
keyboard handling and consistent design.
*/

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog"

interface Task {
    id: string
    title: string
    priority: "low" | "medium" | "high"
    category: string
    assignee: string
}

interface Props {
    selectedDate: string | null
    onClose: () => void
}

// Temporary placeholder data
const dummyTasks: Task[] = [
    {
        id: "1",
        title: "Security Audit",
        priority: "medium",
        category: "OTHER",
        assignee: "Oliver Watts",
    },
]

const TaskModal = ({ selectedDate, onClose }: Props) => {
    if (!selectedDate) return null

    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })

    const getPriorityBorder = (priority: Task["priority"]) => {
        switch (priority) {
            case "high":
                return "border-red-500"
            case "medium":
                return "border-yellow-400"
            case "low":
                return "border-green-500"
        }
    }

    return (
        <Dialog open={!!selectedDate} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl bg-[#f8f9fb]">
                <DialogHeader>
                    <DialogTitle>
                        Tasks for {formatDate(selectedDate)}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-4">
                    {dummyTasks.map((task) => (
                        <div
                            key={task.id}
                            className={`bg-white rounded-lg p-4 shadow-sm border-l-4 ${getPriorityBorder(
                                task.priority
                            )}`}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-gray-800">
                                        {task.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground capitalize">
                                        {task.priority} Priority
                                    </p>
                                </div>

                                <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium">
                                    {task.category}
                                </span>
                            </div>

                            <div className="mt-3 text-sm text-muted-foreground flex items-center gap-2">
                                👤 {task.assignee}
                            </div>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default TaskModal