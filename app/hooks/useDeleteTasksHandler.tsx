
import toast from "react-hot-toast";
import { useDeleteTasksMutation, } from "~/store/api/tasksApi";
import type { Task } from "~/types/workspace";

type DeleteHandlerReturn = {
  handleDelete: (taskIds: string[]) => Promise<void>;
  isDeleting: boolean;
};

export const useDeleteTasksHandler = (
  tasks: Task[],
  projectId: string
): DeleteHandlerReturn => {
  const [deleteTasks, { isLoading }] = useDeleteTasksMutation();

  const handleDelete = async (taskIds: string[]) => {
    if (!projectId) {
      toast.error("Invalid project");
      return;
    }

    try {
      await deleteTasks({
        taskIds,
        projectId,
      }).unwrap();

      toast.success("Tasks deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete tasks");
    }
  };

  return {
    handleDelete,
    isDeleting: isLoading,
  };
};