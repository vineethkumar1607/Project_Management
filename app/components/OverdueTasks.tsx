import type { CalendarTask } from "../lib/types"

interface Props {
  tasks: CalendarTask[]
}

const OverdueTasks = ({ tasks }: Props) => {
  return (
    <section
      aria-labelledby="overdue-heading"
      className="bg-white rounded-2xl p-4 shadow-sm"
    >
      <h2
        id="overdue-heading"
        className="font-semibold text-lg mb-3 text-red-600"
      >
        Overdue Tasks
      </h2>

      {tasks.length === 0 ? (
        <p className="text-sm text-gray-500">
          No overdue tasks 🚀
        </p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="p-3 rounded-xl border border-red-200 bg-red-50 focus-within:ring-2 focus-within:ring-red-500"
            >
              <p className="font-medium text-red-700">
                {task.title}
              </p>

              <time
                dateTime={task.date}
                className="text-xs text-red-500"
              >
                {task.date}
              </time>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default OverdueTasks