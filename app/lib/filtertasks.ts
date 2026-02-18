
type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";
type TaskType = "BUG" | "FEATURE" | "TASK";
type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

interface TaskFilters {
    status?: TaskStatus;
    type?: TaskType;
    priority?: TaskPriority;
    assignee?: string;
}

 interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  type: TaskType;
  assignee: {
    name: string;
    avatar: string;
  };
  dueDate: string;
}

/**
 * Pure function to filter tasks locally.
 * Later, we can remove this and call API instead.
 */
export function filterTasks(tasks: Task[] = [], filters: TaskFilters) {
  return tasks.filter((task) => {
    return (
      (!filters.status || task.status === filters.status) &&
      (!filters.type || task.type === filters.type) &&
      (!filters.priority || task.priority === filters.priority) &&
      (!filters.assignee || task.assignee?.name === filters.assignee)
    );
  });
}
