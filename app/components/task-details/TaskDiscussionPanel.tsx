import { format } from "date-fns";
import { Loader2, MessageCircle, Send, User2 } from "lucide-react";

import type { TaskComment } from "~/types/workspace";

interface TaskDiscussionPanelProps {
  comments: TaskComment[];
  currentUserId?: string;
  newComment: string;
  setNewComment: (value: string) => void;
  submitComment: () => void;
  isAddingComment: boolean;
  isFetching: boolean;
  handleScroll: (event: React.UIEvent<HTMLUListElement>) => void;
  listRef: React.RefObject<HTMLUListElement | null>;
}

export default function TaskDiscussionPanel({
  comments,
  currentUserId,
  newComment,
  setNewComment,
  submitComment,
  isAddingComment,
  isFetching,
  handleScroll,
  listRef,
}: TaskDiscussionPanelProps) {
  return (
    <section className="lg:col-span-7 flex flex-col min-h-[540px] lg:min-h-0 lg:h-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 overflow-hidden">
      <header className="shrink-0 p-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="size-11 shrink-0 rounded-2xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
            <MessageCircle
              size={22}
              className="text-blue-600 dark:text-blue-400"
            />
          </div>

          <div className="min-w-0">
            <h2 className="text-sm font-medium tracking-tight text-zinc-900 dark:text-white">
              Discussion
            </h2>

            <p className="text-sm text-muted-foreground">
              Collaborate with your team
            </p>
          </div>
        </div>

        <span className="shrink-0 text-sm text-muted-foreground">
          {comments.length} comments
        </span>
      </header>

      <ul
        ref={listRef}
        onScroll={handleScroll}
        className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-5 space-y-6 no-scrollbar"
      >
        {comments.map((comment) => {
          const isMe = comment.user.id === currentUserId;

          return (
            <li key={comment.id} className="flex gap-3">
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

              <article className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3
                    className={`text-sm font-medium ${
                      isMe
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-zinc-900 dark:text-white"
                    }`}
                  >
                    {isMe ? "You" : comment.user.name}
                  </h3>

                  <span className="text-xs text-muted-foreground">
                    {format(new Date(comment.createdAt), "dd MMM yyyy - HH:mm")}
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
          <li className="flex justify-center py-4">
            <Loader2 className="size-5 animate-spin text-muted-foreground" />
          </li>
        )}
      </ul>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitComment();
        }}
        className="shrink-0 p-5 border-t border-zinc-200 dark:border-zinc-800"
      >
        <div className="flex gap-3 items-end">
          <textarea
            value={newComment}
            disabled={isAddingComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submitComment();
              }
            }}
            placeholder="Write a comment..."
            rows={3}
            className="flex-1 resize-none rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={isAddingComment || !newComment.trim()}
            className="size-12 shrink-0 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white flex items-center justify-center transition"
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
  );
}
