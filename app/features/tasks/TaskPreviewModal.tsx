import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from "~/components/ui/dialog";

import type { Task } from "~/types/workspace";

interface Props {
    selectedDate: string | null;
    tasks: Task[];
    onClose: () => void;
}

/**
 * TaskModal
 *
 * Displays all tasks scheduled for a selected calendar date.
 * Accessible, responsive and production-ready modal UI.
 */
const TaskPreviewModal: React.FC<Props> = ({ selectedDate, tasks, onClose, }) => {
    if (!selectedDate) return null;

    /**
     * Formats ISO date into readable UI format.
     */
    const formattedDate = new Date(selectedDate).toLocaleDateString(
        "en-US",
        {
            month: "short",
            day: "numeric",
            year: "numeric",
        }
    );

    /**
     * Semantic priority border colors.
     */
    const getPriorityBorder = (
        priority: Task["priority"]
    ) => {
        switch (priority) {
            case "HIGH":
                return "border-red-500";

            case "MEDIUM":
                return "border-yellow-500";

            case "LOW":
                return "border-green-500";

            default:
                return "border-zinc-300";
        }
    };

    return (
        <Dialog open={!!selectedDate} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl w-full max-h-[85vh] overflow-y-auto bg-background">
                {/* ================= HEADER ================= */}
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                        Tasks for {formattedDate}
                    </DialogTitle>
                </DialogHeader>

                {/* ================= EMPTY STATE ================= */}
                {tasks.length === 0 ? (
                    <section aria-label="No tasks available" className="py-12 text-center">
                        <p className="text-sm text-muted-foreground">
                            No tasks scheduled for this date.
                        </p>
                    </section>
                ) : (
                    /* ================= TASK LIST ================= */
                    <section aria-label="Scheduled tasks" className="space-y-4 mt-4">
                        {tasks.map((task) => (
                            <article key={task.id}
                                className={`rounded-xl border-l-4 bg-cardp-4 shadow-sm border
                  ${getPriorityBorder(task.priority)} `}>
                                {/* Top Section */}
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                    {/* Left */}
                                    <div className="space-y-1">
                                        <h3 className="text-base font-semibold text-foreground">
                                            {task.title}
                                        </h3>

                                        <p className="text-sm text-muted-foreground capitalize">
                                            {task.priority.toLowerCase()} priority
                                        </p>
                                    </div>

                                    {/* Right Badge */}
                                    <span className=" self-start rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-300">
                                        {task.type}
                                    </span>
                                </div>

                                {/* Footer */}
                                <footer className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                                    <span aria-hidden="true">👤</span>

                                    <span>
                                        {task.assignee?.name || "Unassigned"}
                                    </span>
                                </footer>
                            </article>
                        ))}
                    </section>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default React.memo(TaskPreviewModal);