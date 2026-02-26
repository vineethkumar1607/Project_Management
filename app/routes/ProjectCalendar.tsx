import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import { useState, useMemo } from "react"
import { useCalendarEvents } from "../hooks/useCalendarEvents"
import TaskModal from "../components/TaskModel"
import type { CalendarTask } from "../lib/types"

/*
  Temporary mock data.
 
 */
const dummyTasks: CalendarTask[] = [
  { id: "1", title: "Design Landing Page", date: "2026-02-20", priority: "high" },
  { id: "2", title: "Fix API Bugs", date: "2026-02-22", priority: "medium" },
]

const ProjectCalendar = () => {
  /*
    Local UI state.
    Modal visibility is purely presentation concern,
    so we keep it inside the component.
   */
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  /*
    Convert tasks into grouped calendar events.
   */
  const events = useCalendarEvents(dummyTasks)

  /*
    Create a fast lookup set for dates that contain events.
    This allows O(1) checks when styling cells.
   */
  const taskDateSet = useMemo(() => {
    return new Set(events.map((event) => event.start as string))
  }, [events])

  /*
    Open modal when a date cell is clicked.
   */
  const handleDateClick = (info: any) => {
    setSelectedDate(info.dateStr)
  }

  /*
   Placeholder for drag-and-drop update logic.
   Later  will dispatch optimistic update to store.
   */
  const handleEventDrop = (info: any) => {
    console.log("Task moved to:", info.event.startStr)
  }

  return (
    <div className="bg-white rounded-2xl p-4">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        editable
        selectable
        height="auto"
        dateClick={handleDateClick}
        eventDrop={handleEventDrop}

        /*
         Customize day cells:
          Highlights the  full cell if it contains tasks
          Removes the default event bars
          Injects task count badge 
         */
        dayCellDidMount={(arg) => {
          const dateStr = arg.date.toISOString().split("T")[0]

          const eventForDay = events.find(
            (e) => e.start === dateStr
          )

          if (eventForDay) {
            const frame = arg.el.querySelector(".fc-daygrid-day-frame")

            // Applies full-cell highlight
            frame?.classList.add("bg-blue-500", "text-white")

            // Removes default FullCalendar event UI
            arg.el.querySelectorAll(".fc-event").forEach((el) => el.remove())

            // Injects the  custom count badge
            const badge = document.createElement("div")
            badge.innerText = eventForDay.title || ""
            badge.className =
              "absolute bottom-2 left-2 text-xs bg-white text-blue-600 px-2 py-1 rounded-md font-semibold"

            frame?.appendChild(badge)
          }
        }}
      />

      {selectedDate && (
        <TaskModal
          selectedDate={selectedDate}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </div>
  )
}

export default ProjectCalendar