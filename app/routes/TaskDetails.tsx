import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { Calendar, MessageCircle, Pencil, Send } from "lucide-react";

import { useGetTaskByIdQuery, useGetTaskCommentsQuery, useAddCommentMutation } from "~/store/api/tasksApi";
import { useUser } from "@clerk/clerk-react";

//  Local type for comments (based on your backend)
type TaskComment = {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    image?: string;
  };
};

export default function TaskDetails() {
  const { taskId } = useParams();
  const listRef = useRef<HTMLUListElement>(null);

  if (!taskId) {
    return <p>Invalid task</p>;
  }

  const { user } = useUser();

  const [cursor, setCursor] = useState<string | undefined>();

  useEffect(() => {
    setCursor(undefined);
  }, [taskId]);


// Optimistic update for adding a comment
  const { data: task, isLoading } = useGetTaskByIdQuery(taskId!, {
    skip: !taskId,
  });
// Fetch comments with pagination using cursor. The skip option prevents the query from running until we have a valid taskId. The comments are stored in the local state and updated whenever new data is fetched.
  const { data, isFetching } = useGetTaskCommentsQuery(
    { taskId, cursor },
    { skip: !taskId }
  );
  const comments: TaskComment[] = data?.items ?? [];

  // Scroll to bottom when comments change
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [comments]);



  const [addComment, { isLoading: isAdding }] =
    useAddCommentMutation();

  const [newComment, setNewComment] = useState("");


// Function to handle comment submission with optimistic update 
  const submitComment = async () => {
    if (!newComment.trim() || !taskId) return;

    const message = newComment;
    setNewComment("");

    try {
      await addComment({
        taskId,
        message,
        user: {
          id: user?.id!,
          name: user?.fullName ?? "You",
          image: user?.imageUrl,
        },
      }).unwrap();
    } catch (err) {
      console.error(err);
      setNewComment(message);
    }
  };

  // Infinite scroll handler for comments
  const handleScroll = (e: React.UIEvent<HTMLUListElement>) => {
    const bottom =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop <=
      e.currentTarget.clientHeight + 10;

    if (bottom && data?.nextCursor && !isFetching) {
      setCursor(data.nextCursor);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (!task) return <p>Task not found</p>;



  return (
    <section className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-220px)]">

      {/* ================= COMMENTS ================= */}
      <section className="w-full lg:w-2/3 flex flex-col border rounded-xl bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden">

        {/* Header */}
        <header className="px-5 py-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <MessageCircle size={18} />
            Discussion
          </h2>
          <span className="text-sm text-muted-foreground">
            {comments.length} comments
          </span>
        </header>

        {/* Scrollable Comments */}
        <ul
          ref={listRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-5 py-4 space-y-4 hide-scrollbar"
        >
          {comments.length > 0 ? (
            comments.map((comment) => {
              const isMe = comment.user.id === user?.id;

              return (
                <li
                  key={comment.id}
                  className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                >
                  <article
                    className={`inline-block max-w-[70%] w-fit p-3 rounded-lg text-sm border break-words
${isMe
                        ? "ml-auto bg-blue-50 border-blue-200"
                        : "mr-auto bg-muted border-gray-200 dark:border-zinc-700"
                      }`}
                  >
                    <div className="flex items-center gap-2 text-xs mb-1 text-muted-foreground">
                      <img
                        src={comment.user.image || "https://i.pravatar.cc/40"}
                        className="size-6 rounded-full"
                      />
                      <span className="font-medium text-foreground">
                        {comment.user.name}
                      </span>
                      <span>
                        • {format(new Date(comment.createdAt), "dd MMM HH:mm")}
                      </span>
                    </div>

                    <p>{comment.content}</p>
                  </article>
                </li>
              );
            })
          ) : (
            <p className="text-sm text-muted-foreground">
              No comments yet.
            </p>
          )}
        </ul>

        {/* Sticky Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitComment();
          }}
          className="border-t p-4 flex gap-3 items-end bg-background"
        >
          <textarea
            value={newComment}
          
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) { // prevents new line on Enter and submits instead
                e.preventDefault(); // prevents new line
                submitComment();
              }
            }}
            placeholder="Write a comment..."
            className="flex-1 border rounded-md p-2 text-sm resize-none max-h-40 overflow-y-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={2}
          />
         

          <button
            type="submit"
            disabled={isAdding || !newComment.trim()}
            className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white transition"
          >
            {isAdding ? (
              <span className="text-xs">...</span>
            ) : (
              <Send size={18} />
            )}
          </button>
        </form>

      </section>

      {/* ================= TASK INFO ================= */}
      <aside className="w-full lg:w-1/3 flex flex-col gap-4">

        {/* Task */}
        <div className="border rounded-xl p-5 bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 shadow-sm">
          <h1 className="text-xl font-semibold mb-3">
            {task.title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-4 text-xs">
            <span className="px-2 py-1 rounded bg-zinc-200 dark:bg-zinc-700">
              {task.status}
            </span>
            <span className="px-2 py-1 rounded bg-blue-200 dark:bg-blue-900">
              {task.type}
            </span>
            <span className="px-2 py-1 rounded bg-green-200 dark:bg-emerald-900">
              {task.priority}
            </span>
          </div>

          {task.description && (
            <p className="text-sm text-muted-foreground mb-4">
              {task.description}
            </p>
          )}

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <img
                src={task.assignee.image || "https://i.pravatar.cc/41"}
                className="size-6 rounded-full"
              />
              <span>{task.assignee.name}</span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar size={14} />
              <span>
                {format(new Date(task.due_date), "dd MMM yyyy")}
              </span>
            </div>
          </div>
        </div>

        {/* Project */}
        <div className="border rounded-xl p-4 bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 shadow-sm">
          <h2 className="text-sm font-semibold flex items-center gap-2">
            <Pencil size={14} />
            {task.project.name}
          </h2>

          <div className="text-xs mt-2 text-muted-foreground">
            <p>Status: {task.project.status}</p>
            <p>Priority: {task.project.priority}</p>
          </div>
        </div>

      </aside>
    </section>
  );
}