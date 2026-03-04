import { memo } from "react"
import type { CalendarTask } from "../lib/types"

interface Props {
    tasks: CalendarTask[]
}

const UpcomingTasks = memo(({ tasks }: Props) => {
    return (
        <section
            aria-labelledby="upcoming-heading"
            className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow-sm"
        >
            <h2
                id="upcoming-heading"
                className="font-semibold text-lg mb-3 text-gray-900 dark:text-white"
            >
                Upcoming Tasks
            </h2>

            {tasks.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-zinc-400">
                    No upcoming tasks
                </p>
            ) : (
                <ul className="space-y-3">
                    {tasks.map((task) => (
                        <li
                            key={task.id}
                            className="p-3 rounded-xl border border-gray-200 dark:border-zinc-700 hover:shadow-sm transition focus-within:ring-2 focus-within:ring-blue-500"
                        >
                            <p className="font-medium text-gray-900 dark:text-white">
                                {task.title}
                            </p>

                            <time
                                dateTime={task.date}
                                className="text-xs text-gray-500 dark:text-zinc-400"
                            >
                                {task.date}
                            </time>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
})

export default UpcomingTasks