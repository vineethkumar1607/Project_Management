import { format } from "date-fns"
import { useMemo, useState } from "react"
import { useParams } from "react-router"
import { Calendar, MessageCircle, Pencil } from "lucide-react"



/* ================= Mock Data ================= */

const mockProjects = [
  {
    id: "1",
    name: "Website Redesign",
    start_date: new Date(),
    status: "ACTIVE",
    priority: "HIGH",
    progress: 60,
    tasks: [
      {
        id: "1",
        title: "Design landing page",
        description: "Create landing UI",
        status: "IN_PROGRESS",
        type: "FEATURE",
        priority: "HIGH",
        due_date: new Date(),
        assignee: { id: "1", name: "Vineeth", image: "https://i.pravatar.cc/40" },
      },
      {
        id: "3",
        title: "Fix navbar bug",
        description: "Fix active link highlighting",
        status: "DONE",
        type: "BUG",
        priority: "MEDIUM",
        due_date: new Date(),
        assignee: { id: "2", name: "Shruthi", image: "https://i.pravatar.cc/41" },
      },
    ],
  },
  {
    id: "2",
    name: "Mobile App MVP",
    start_date: new Date(),
    status: "ACTIVE",
    priority: "MEDIUM",
    progress: 30,
    tasks: [
      {
        id: "2",
        title: "Setup authentication",
        description: "Implement login flow",
        status: "TODO",
        type: "FEATURE",
        priority: "HIGH",
        due_date: new Date(),
        assignee: { id: "3", name: "Rahul", image: "https://i.pravatar.cc/42" },
      },
    ],
  },
]



export default function TaskDetails() {
  const { taskId } = useParams()
  const user = { id: "1" }

  const [comments, setComments] = useState<any[]>([])
  const [newComment, setNewComment] = useState("")

  const { task, project } = useMemo(() => {
    for (const proj of mockProjects) {
      const foundTask = proj.tasks.find(t => t.id === taskId)
      if (foundTask) {
        return { task: foundTask, project: proj }
      }
    }
    return { task: null, project: null }
  }, [taskId])

  if (!task) {
    return (
      <main className="max-w-6xl mx-auto p-6">
        <p role="alert" className="text-red-500">
          Task not found.
        </p>
      </main>
    )
  }

  return (
    <main
      className="max-w-6xl mx-auto p-4 lg:p-6"
      aria-labelledby="task-title"
    >
      <div className="flex flex-col lg:flex-row gap-6">

        {/* ================= Discussion Section ================= */}

        <section
          className="w-full lg:w-2/3"
          aria-labelledby="discussion-heading"
        >
          <div className="border rounded-md border-gray-300 dark:border-zinc-800 p-5 flex flex-col min-h-[60vh] lg:min-h-[75vh]">

            <header>
              <h2
                id="discussion-heading"
                className="text-base font-semibold flex items-center gap-2 mb-4"
              >
                <MessageCircle size={18} aria-hidden="true" />
                Task Discussion
                <span className="text-sm text-muted-foreground">
                  ({comments.length})
                </span>
              </h2>
            </header>

            {/* Comments List */}
            <ul
              className="flex-1 overflow-y-auto space-y-4 pr-2"
              role="list"
              aria-live="polite"
            >
              {comments.length > 0 ? (
                comments.map(comment => (
                  <li key={comment.id}>
                    <article
                      className={`max-w-[85%] p-3 rounded-md border text-sm
                        ${
                          comment.user.id === user.id
                            ? "ml-auto bg-blue-50 dark:bg-zinc-800 border-blue-200"
                            : "mr-auto bg-gray-50 dark:bg-zinc-900 border-gray-200 dark:border-zinc-700"
                        }`}
                    >
                      <header className="flex items-center gap-2 text-xs text-gray-500 dark:text-zinc-400 mb-1">
                        <img
                          src={comment.user.image}
                          alt={`${comment.user.name} avatar`}
                          className="size-5 rounded-full"
                        />
                        <span className="font-medium text-gray-900 dark:text-white">
                          {comment.user.name}
                        </span>
                        <time dateTime={comment.createdAt.toISOString()}>
                          • {format(new Date(comment.createdAt), "dd MMM yyyy, HH:mm")}
                        </time>
                      </header>

                      <p>{comment.content}</p>
                    </article>
                  </li>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  No comments yet. Be the first!
                </p>
              )}
            </ul>

            {/* Comment Form */}
            <footer className="mt-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (!newComment.trim()) return

                  setComments(prev => [
                    ...prev,
                    {
                      id: Date.now(),
                      user: {
                        id: user.id,
                        name: "You",
                        image: "https://i.pravatar.cc/43",
                      },
                      content: newComment,
                      createdAt: new Date(),
                    },
                  ])
                  setNewComment("")
                }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <label htmlFor="new-comment" className="sr-only">
                  Add a comment
                </label>

                <textarea
                  id="new-comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="w-full border rounded-md p-2 text-sm dark:bg-zinc-800 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded text-sm transition-colors"
                >
                  Post
                </button>
              </form>
            </footer>

          </div>
        </section>

        {/* ================= Task + Project Info ================= */}

        <aside
          className="w-full lg:w-1/3 space-y-6"
          aria-labelledby="task-info"
        >
          {/* Task Info */}
          <article
            className="border rounded-md border-gray-300 dark:border-zinc-800 p-5 bg-white dark:bg-zinc-900"
          >
            <header>
              <h1
                id="task-title"
                className="text-lg font-semibold mb-3"
              >
                {task.title}
              </h1>
            </header>

            <div className="flex flex-wrap gap-2 mb-3 text-xs">
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
              <p className="text-sm text-gray-600 dark:text-zinc-400 mb-4">
                {task.description}
              </p>
            )}

            <hr className="my-3 border-zinc-200 dark:border-zinc-700" />

            <dl className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <img
                  src={task.assignee.image}
                  alt={`${task.assignee.name} avatar`}
                  className="size-5 rounded-full"
                />
                <dd>{task.assignee.name}</dd>
              </div>

              <div className="flex items-center gap-2">
                <Calendar size={14} aria-hidden="true" />
                <dd>
                  <time dateTime={task.due_date.toISOString()}>
                    Due: {format(task.due_date, "dd MMM yyyy")}
                  </time>
                </dd>
              </div>
            </dl>
          </article>

          {/* Project Info */}
          {project && (
            <article
              className="border rounded-md border-gray-300 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-900"
            >
              <header>
                <h2 className="text-base font-semibold flex items-center gap-2">
                  <Pencil size={16} aria-hidden="true" />
                  {project.name}
                </h2>
              </header>

              <p className="text-xs mt-3">
                <time dateTime={project.start_date.toISOString()}>
                  Project Start: {format(project.start_date, "dd MMM yyyy")}
                </time>
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-3">
                <span>Status: {project.status}</span>
                <span>Priority: {project.priority}</span>
                <span>Progress: {project.progress}%</span>
              </div>
            </article>
          )}
        </aside>

      </div>
    </main>
  )
}