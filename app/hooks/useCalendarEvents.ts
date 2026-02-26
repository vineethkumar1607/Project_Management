import { useMemo } from "react"
import type { EventInput } from "@fullcalendar/core"
import type { CalendarTask } from "../lib/types"

/*
 
  groups tasks by date and expose a single event per day
containing the count of tasks for that date.
 
 This keeps the month view clean and avoids rendering
 multiple stacked event bars inside a single cell.
 */
export const useCalendarEvents = (
    tasks: CalendarTask[]
): EventInput[] => {
    return useMemo(() => {
        const grouped: Record<string, CalendarTask[]> = {}

        // Groups tasks by ISO date
        tasks.forEach((task) => {
            if (!grouped[task.date]) {
                grouped[task.date] = []
            }
            grouped[task.date].push(task)
        })

        // Convert grouped tasks into calendar events
        return Object.keys(grouped).map((date) => ({
            title: `${grouped[date].length} Task${grouped[date].length > 1 ? "s" : ""
                }`,
            start: date,
            allDay: true,
        }))
    }, [tasks])
}