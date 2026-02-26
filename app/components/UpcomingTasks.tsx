import { memo } from "react"
import type { CalendarTask } from "../lib/types"

interface Props {
    tasks: CalendarTask[]
}

const UpcomingTasks = memo(({ tasks }: Props) => {
    return (
        <section
            aria-labelledby="upcoming-heading"
            className="bg-white rounded-2xl p-4 shadow-sm"
        >
            <h2
                id="upcoming-heading"
                className="font-semibold text-lg mb-3"
            >
                Upcoming Tasks
            </h2>

            {tasks.length === 0 ? (
                <p className="text-sm text-gray-500">
                    No upcoming tasks
                </p>
            ) : (
                <ul className="space-y-3">
                    {tasks.map((task) => (
                        <li
                            key={task.id}
                            className="p-3 rounded-xl border hover:shadow-sm transition focus-within:ring-2 focus-within:ring-blue-500"
                        >
                            <p className="font-medium">{task.title}</p>

                            <time
                                dateTime={task.date}
                                className="text-xs text-gray-500"
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