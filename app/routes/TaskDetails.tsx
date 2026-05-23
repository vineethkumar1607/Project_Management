import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useParams } from "react-router";
import { AlertCircle } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

import TaskDiscussionPanel from "~/features/tasks/TaskDiscussionPanel";
import TaskInfoPanel from "~/features/tasks/TaskInfoPanel";

import {
  useAddCommentMutation,
  useGetTaskByIdQuery,
  useGetTaskCommentsQuery,
} from "~/store/api/tasksApi";

import type { TaskComment } from "~/types/workspace";

export default function TaskDetails() {
  const { taskId } = useParams();
  const safeTaskId = taskId ?? "";
  const { user } = useUser();
  const listRef = useRef<HTMLUListElement>(null);

  const [cursor, setCursor] = useState<string | undefined>();
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    setCursor(undefined);
  }, [taskId]);

  const {
    data: task,
    isLoading: isTaskLoading,
    isError: isTaskError,
    refetch: refetchTask,
  } = useGetTaskByIdQuery(safeTaskId, {
    skip: !taskId,
  });

  const { data, isFetching } = useGetTaskCommentsQuery(
    { taskId: safeTaskId, cursor },
    { skip: !taskId }
  );

  const comments: TaskComment[] = data?.items ?? [];

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [comments]);

  const [addComment, { isLoading: isAddingComment }] =
    useAddCommentMutation();

  const submitComment = async () => {
    if (!newComment.trim()) return;
    if (!taskId || !user?.id) return;

    const message = newComment;

    setNewComment("");

    try {
      await addComment({
        taskId,
        message,
        user: {
          id: user.id,
          name: user.fullName ?? "You",
          image: user.imageUrl,
        },
      }).unwrap();
    } catch (error) {
      console.error(error);
      setNewComment(message);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLUListElement>) => {
    const bottomReached =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop <=
      e.currentTarget.clientHeight + 20;

    if (bottomReached && data?.nextCursor && !isFetching) {
      setCursor(data.nextCursor);
    }
  };

  const statusClasses = useMemo(() => {
    switch (task?.status) {
      case "DONE":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300";

      case "IN_PROGRESS":
        return "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300";

      default:
        return "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300";
    }
  }, [task?.status]);

  const priorityClasses = useMemo(() => {
    switch (task?.priority) {
      case "HIGH":
        return "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300";

      case "MEDIUM":
        return "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300";

      default:
        return "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300";
    }
  }, [task?.priority]);

  if (!taskId) {
    return (
      <section className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <AlertCircle className="mx-auto size-10 text-red-500 mb-3" />

          <h1 className="text-xl font-semibold">Invalid task</h1>

          <p className="text-sm text-muted-foreground mt-1">
            Task ID is missing or invalid.
          </p>
        </div>
      </section>
    );
  }

  if (isTaskLoading) {
    return (
      <section className="grid grid-cols-1 lg:grid-cols-10 gap-6 lg:h-[calc(100vh-140px)]">
        <div className="lg:col-span-3 space-y-4">
          <div className="h-64 rounded-2xl bg-muted animate-pulse" />
          <div className="h-40 rounded-2xl bg-muted animate-pulse" />
        </div>

        <div className="lg:col-span-7 rounded-2xl bg-muted animate-pulse" />
      </section>
    );
  }

  if (isTaskError || !task) {
    return (
      <section className="flex items-center justify-center h-[60vh]">
        <div className="text-center max-w-sm">
          <AlertCircle className="mx-auto size-10 text-red-500 mb-3" />

          <h1 className="text-xl font-semibold">Failed to load task</h1>

          <p className="text-sm text-muted-foreground mt-2">
            Something went wrong while loading this task.
          </p>

          <button
            onClick={() => refetchTask()}
            className="mt-5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm transition"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 lg:grid-cols-10 gap-6 lg:h-[calc(100vh-140px)] min-h-0 pt-0">
      <TaskInfoPanel
        task={task}
        statusClasses={statusClasses}
        priorityClasses={priorityClasses}
      />

      <TaskDiscussionPanel
        comments={comments}
        currentUserId={user?.id}
        newComment={newComment}
        setNewComment={setNewComment}
        submitComment={submitComment}
        isAddingComment={isAddingComment}
        isFetching={isFetching}
        handleScroll={handleScroll}
        listRef={listRef}
      />
    </section>
  );
}
