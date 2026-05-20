
// This file contains utility functions related to tasks, such as checking if a task is overdue.
import type { Task } from "~/types/workspace";

export const isTaskOverdue = (task: Task) => {
    if (!task.due_date) return false;

    const dueDate = new Date(task.due_date);
    const today = new Date();

    dueDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return (
        dueDate.getTime() < today.getTime() &&
        task.status !== "DONE"
    );
};