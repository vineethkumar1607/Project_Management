import { format } from "date-fns";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useParams } from "react-router";

import {
  Calendar,
  MessageCircle,
  Send,
  AlertCircle,
  Loader2,
  User2,
  FolderKanban,
  CheckCircle2,
  Flag,
  Layers3,
} from "lucide-react";

import { useUser } from "@clerk/clerk-react";

import {
  useAddCommentMutation,
  useGetTaskByIdQuery,
  useGetTaskCommentsQuery,
} from "~/store/api/tasksApi";

import type { TaskComment } from "~/types/workspace";

export default function TaskDetails() {
  const { taskId } = useParams();

  const { user } = useUser();

  const listRef =
    useRef<HTMLUListElement>(null);

  const [cursor, setCursor] = useState<
    string | undefined
  >();

  const [newComment, setNewComment] =
    useState("");

  /*
    Reset pagination when task changes
  */
  useEffect(() => {
    setCursor(undefined);
  }, [taskId]);

  /*
    Invalid route
  */
  if (!taskId) {
    return (
      <section className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <AlertCircle className="mx-auto size-10 text-red-500 mb-3" />

          <h1 className="text-xl font-semibold">
            Invalid task
          </h1>

          <p className="text-sm text-muted-foreground mt-1">
            Task ID is missing or invalid.
          </p>
        </div>
      </section>
    );
  }

  /*
    Fetch task
  */
  const {
    data: task,
    isLoading: isTaskLoading,
    isError: isTaskError,
    refetch: refetchTask,
  } = useGetTaskByIdQuery(taskId, {
    skip: !taskId,
  });

  /*
    Fetch comments
  */
  const {
    data,
    isFetching,
    isError: isCommentsError,
    refetch: refetchComments,
  } = useGetTaskCommentsQuery(
    { taskId, cursor },
    { skip: !taskId }
  );

  const comments: TaskComment[] =
    data?.items ?? [];

  /*
    Scroll latest comment into view
  */
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop =
        listRef.current.scrollHeight;
    }
  }, [comments]);

  /*
    Add comment mutation
  */
  const [
    addComment,
    { isLoading: isAddingComment },
  ] = useAddCommentMutation();

  /*
    Submit comment
  */
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

      /*
        Restore message on failure
      */
      setNewComment(message);
    }
  };

  /*
    Infinite scroll
  */
  const handleScroll = (
    e: React.UIEvent<HTMLUListElement>
  ) => {
    const bottomReached =
      e.currentTarget.scrollHeight -
        e.currentTarget.scrollTop <=
      e.currentTarget.clientHeight + 20;

    if (
      bottomReached &&
      data?.nextCursor &&
      !isFetching
    ) {
      setCursor(data.nextCursor);
    }
  };

  /*
    Status chip styles
  */
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

  /*
    Priority chip styles
  */
  const priorityClasses = useMemo(() => {
    switch (task?.priority) {
      case "HIGH":
        return "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300";

      case "MEDIUM":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300";

      default:
        return "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300";
    }
  }, [task?.priority]);

  /*
    Loading State
  */
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

  /*
    Error State
  */
  if (isTaskError || !task) {
    return (
      <section className="flex items-center justify-center h-[60vh]">
        <div className="text-center max-w-sm">
          <AlertCircle className="mx-auto size-10 text-red-500 mb-3" />

          <h1 className="text-xl font-semibold">
            Failed to load task
          </h1>

          <p className="text-sm text-muted-foreground mt-2">
            Something went wrong while loading
            this task.
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
<section
  className="
    grid grid-cols-1 lg:grid-cols-10
    gap-6
    lg:h-[calc(100vh-140px)]
    min-h-0
    pt-0
  "
>
    {/* ======================================================
        LEFT PANEL
    ====================================================== */}
    <aside
      className="
        lg:col-span-3
        min-h-0
        lg:overflow-y-auto
        no-scrollbar
        pr-1
      "
    >
      <div className="space-y-10 pb-8">
        {/* ================= TASK OVERVIEW ================= */}
        <section>
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">
            Task Overview
          </p>

          <h1 className="text-3xl font-bold leading-tight break-words text-zinc-900 dark:text-white">
            {task.title}
          </h1>

          {/* Chips */}
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
        </section>

        {/* ================= DESCRIPTION ================= */}
        {task.description && (
          <section>
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3">
              Description
            </h2>

            <p className="text-sm leading-7 text-muted-foreground whitespace-pre-wrap break-words">
              {task.description}
            </p>
          </section>
        )}

        {/* ================= TASK DETAILS ================= */}
        <section className="space-y-5">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-white">
            Task Details
          </h2>

          {/* Assignee */}
          <div className="flex items-center gap-3">
            <img
              src={
                task.assignee.image ||
                "https://i.pravatar.cc/40"
              }
              alt={task.assignee.name}
              className="size-11 rounded-full object-cover border border-zinc-200 dark:border-zinc-700"
            />

            <div>
              <p className="text-xs text-muted-foreground">
                Assignee
              </p>

              <p className="text-sm font-medium">
                {task.assignee.name}
              </p>
            </div>
          </div>

          {/* Due Date */}
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
              <Calendar size={18} />
            </div>

            <div>
              <p className="text-xs text-muted-foreground">
                Due Date
              </p>

              <time className="text-sm font-medium">
                {format(
                  new Date(task.due_date),
                  "dd MMM yyyy"
                )}
              </time>
            </div>
          </div>
        </section>

        {/* ================= PROJECT INFO ================= */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <FolderKanban
              size={18}
              className="text-blue-600 dark:text-blue-400"
            />

            <h2 className="text-sm font-semibold text-zinc-900 dark:text-white">
              Project Information
            </h2>
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-1">
              Project Name
            </p>

            <p className="font-medium text-lg">
              {task.project.name}
            </p>
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

    {/* ======================================================
        RIGHT PANEL — DISCUSSION
    ====================================================== */}
  <section
  className="
    lg:col-span-7
    flex flex-col
    min-h-0
    lg:h-full

    lg:border-l
    lg:border-zinc-200
    lg:dark:border-zinc-800

    lg:pl-6
  "
>
      {/* Header */}
      <header className="shrink-0 pb-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-11 rounded-2xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
            <MessageCircle
              size={22}
              className="text-blue-600 dark:text-blue-400"
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              Discussion
            </h2>

            <p className="text-sm text-muted-foreground">
              Collaborate with your team
            </p>
          </div>
        </div>

        <span className="text-sm text-muted-foreground">
          {comments.length} comments
        </span>
      </header>

      {/* Comments */}
      <ul
        ref={listRef}
        onScroll={handleScroll}
        className="
          flex-1
          min-h-0
          overflow-y-auto
          overscroll-contain
          py-6
          space-y-6
          no-scrollbar
        "
      >
        {comments.map((comment) => {
          const isMe =
            comment.user.id === user?.id;

          return (
            <li
              key={comment.id}
              className="flex gap-3"
            >
              {/* Avatar */}
              <div className="shrink-0">
                {comment.user.image ? (
                  <img
                    src={comment.user.image}
                    alt={comment.user.name}
                    className="size-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="size-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center">
                    <User2 size={16} />
                  </div>
                )}
              </div>

              {/* Message */}
              <article className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3
                    className={`text-sm font-medium ${
                      isMe
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-zinc-900 dark:text-white"
                    }`}
                  >
                    {isMe
                      ? "You"
                      : comment.user.name}
                  </h3>

                  <span className="text-xs text-muted-foreground">
                    {format(
                      new Date(
                        comment.createdAt
                      ),
                      "dd MMM yyyy • HH:mm"
                    )}
                  </span>
                </div>

                <div
                  className={`mt-2 rounded-2xl px-4 py-3 border text-sm leading-7 whitespace-pre-wrap break-words ${
                    isMe
                      ? "bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-900"
                      : "bg-zinc-100 border-zinc-200 dark:bg-zinc-800/60 dark:border-zinc-700"
                  }`}
                >
                  {comment.content}
                </div>
              </article>
            </li>
          );
        })}

        {isFetching && (
          <div className="flex justify-center py-4">
            <Loader2 className="size-5 animate-spin text-muted-foreground" />
          </div>
        )}
      </ul>

      {/* Composer */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitComment();
        }}
        className="shrink-0 pt-4 border-t border-zinc-200 dark:border-zinc-800"
      >
        <div className="flex gap-3 items-end">
          <textarea
            value={newComment}
            disabled={isAddingComment}
            onChange={(e) =>
              setNewComment(e.target.value)
            }
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                !e.shiftKey
              ) {
                e.preventDefault();
                submitComment();
              }
            }}
            placeholder="Write a comment..."
            rows={3}
            className="
              flex-1
              resize-none
              rounded-2xl
              border border-zinc-300 dark:border-zinc-700
              bg-white dark:bg-zinc-950
              px-4 py-3
              text-sm
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

          <button
            type="submit"
            disabled={
              isAddingComment ||
              !newComment.trim()
            }
            className="
              size-12
              shrink-0
              rounded-2xl
              bg-blue-600
              hover:bg-blue-700
              disabled:opacity-50
              text-white
              flex items-center justify-center
              transition
            "
          >
            {isAddingComment ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <Send size={18} />
            )}
          </button>
        </div>
      </form>
    </section>
  </section>
);
}