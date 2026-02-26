import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import { useState, useMemo } from "react"
import { useCalendarEvents } from "../hooks/useCalendarEvents"
import TaskModal from "../components/TaskModel"
import UpcomingTasks from "../components/UpcomingTasks"
import OverdueTasks from "../components/OverdueTasks"
import type { CalendarTask } from "../lib/types"

/*
  Temporary mock data.
  Later this will come from Redux / API.
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
    This keeps transformation logic separate from UI.
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
    Derive upcoming & overdue tasks.
    This is derived state — we do NOT store it separately.
    Production rule: never store what can be derived.
  */
  const today = new Date().toISOString().split("T")[0]

  const upcomingTasks = useMemo(() => {
    return dummyTasks.filter(task => task.date >= today)
  }, [dummyTasks, today])

  const overdueTasks = useMemo(() => {
    return dummyTasks.filter(task => task.date < today)
  }, [dummyTasks, today])


  const eventMap = useMemo(() => {
    const map = new Map<string, any>()
    events.forEach((event) => {
      map.set(event.start as string, event)
    })
    return map
  }, [events])
  /*
    Open modal when a date cell is clicked.
  */
  const handleDateClick = (info: any) => {
    setSelectedDate(info.dateStr)
  }

  /*
    Placeholder for drag-and-drop update logic.
    Later this will dispatch optimistic update to Redux.
  */
  const handleEventDrop = (info: any) => {
    console.log("Task moved to:", info.event.startStr)
  }

  return (
    /*
      Responsive Layout:
      - Mobile → stacked layout
      - Desktop (lg+) → 2/3 Calendar | 1/3 Sidebar
    */
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* 
          LEFT SECTION — CALENDAR
          */}
      <div className="lg:col-span-2 bg-white rounded-2xl p-4 shadow-sm">
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
            - Highlights the full cell if it contains tasks
            - Removes default event bars
            - Injects custom task badge
          */
          dayCellDidMount={(arg) => {
            const dateStr = arg.date.toISOString().split("T")[0]

            /*
              Instead of looping events every time,
              we first check from the precomputed Set (O(1))
            */
            const eventForDay = eventMap.get(dateStr)

            if (eventForDay) {

              const frame = arg.el.querySelector(".fc-daygrid-day-frame")

              // Applies full-cell highlight
              frame?.classList.add("bg-blue-500", "text-white")

              // Removes default FullCalendar event UI
              arg.el.querySelectorAll(".fc-event").forEach((el) => el.remove())

              // Inject custom badge
              const badge = document.createElement("div")
              badge.innerText = eventForDay?.title || ""
              badge.className =
                "absolute bottom-2 left-2 text-xs bg-white text-blue-600 px-2 py-1 rounded-md font-semibold"

              frame?.appendChild(badge)
            }
          }}
        />
      </div>

      {/* 
          RIGHT SECTION — SIDEBAR
         */}
      <div className="space-y-6">

        {/* Upcoming Tasks Component */}
        <UpcomingTasks tasks={upcomingTasks} />

        {/* Overdue Tasks Component */}
        <OverdueTasks tasks={overdueTasks} />

      </div>

      {/* 
          MODAL RENDER
         */}
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