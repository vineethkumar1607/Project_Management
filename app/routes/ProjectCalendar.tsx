import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import { useState, useMemo } from "react"
import { useCalendarEvents } from "../hooks/useCalendarEvents"
import TaskModal from "../components/TaskModel"
import UpcomingTasks from "../components/UpcomingTasks"
import OverdueTasks from "../components/OverdueTasks"
import { useParams } from "react-router";
import { useGetTasksQuery } from "~/store/api/tasksApi";
import ErrorState from "~/components/Common/ErrorState"
import CalendarSkeleton from "~/components/Skeletons/CalendarSkeleton"
import EmptyState from "~/components/Common/EmptyState";
import type { CalendarTask } from "~/types/workspace"

//    
const ProjectCalendar = () => {

  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const { projectId } = useParams();

  const formatDateKey = (date: string | Date) =>
    new Date(date).toLocaleDateString("en-CA");

  const {
    data: tasks = [],
    isLoading,
    error,
    refetch,
  } = useGetTasksQuery(projectId!);

  const calendarTasks: CalendarTask[] = useMemo(() => {
    return tasks
      .filter((task) => task.due_date)
      .map((task) => ({
        id: task.id,
        title: task.title,
        date: task.due_date!,
        priority:
          task.priority.toLowerCase() as CalendarTask["priority"],
      }));
  }, [tasks]);


  const events = useCalendarEvents(calendarTasks)

  const today = formatDateKey(new Date());

  // Separate upcoming and overdue tasks for sidebar sections
  const upcomingTasks = useMemo(() => {
    return calendarTasks.filter(
      (task) => formatDateKey(task.date) >= today
    );
  }, [calendarTasks, today]);

  const overdueTasks = useMemo(() => {
    return calendarTasks.filter(
      (task) => formatDateKey(task.date) < today
    );
  }, [calendarTasks, today]);

  // Precompute a date-to-events map for efficient lookups during rendering
  const eventMap = useMemo(() => {
    const map = new Map<string, typeof events>();

    events.forEach((event) => {
      const dateKey = formatDateKey(event.start as string);

      const existingEvents = map.get(dateKey) || [];

      map.set(dateKey, [...existingEvents, event]);
    });

    return map;
  }, [events]);



  const handleDateClick = (info: any) => {
    setSelectedDate(info.dateStr)
  }


  const handleEventDrop = (info: any) => {
    console.log("Task moved to:", info.event.startStr)
  }

  // Compute tasks for the selected date in the modal
  const selectedTasks = useMemo(() => {
    if (!selectedDate) return [];

    return tasks.filter(task => {
      if (!task.due_date) return false;

      return formatDateKey(task.due_date) === selectedDate;
    });
  }, [tasks, selectedDate]);


  if (isLoading) {
    return <CalendarSkeleton />;
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load calendar"
        description="We couldn't fetch calendar tasks right now."
        onRetry={refetch}
      />
    );
  }

  if (!calendarTasks.length) {
    return (
      <EmptyState
        title="No calendar tasks"
        description="Tasks with due dates will appear here."
      />
    );
  }

  return (

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* 
          LEFT SECTION — CALENDAR
          */}
      <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow-sm">
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
            const dateStr = formatDateKey(arg.date)

            /*
              Instead of looping events every time,
              we first check from the precomputed Set (O(1))
            */
            const eventsForDay = eventMap.get(dateStr)

            if (eventsForDay?.length) {

              const frame = arg.el.querySelector(".fc-daygrid-day-frame")

              // Applies full-cell highlight
              frame?.classList.add("bg-blue-500", "dark:bg-blue-600", "text-white")

              // Removes default FullCalendar event UI
              arg.el.querySelectorAll(".fc-event").forEach((el) => el.remove())

              // Inject custom badge
              const badge = document.createElement("div")
              badge.innerText = eventsForDay[0]?.title || ""
              badge.className =
                "absolute bottom-2 left-2 text-xs bg-white dark:bg-zinc-800 text-blue-600 px-2 py-1 rounded-md font-semibold"

              frame?.appendChild(badge)
            }
          }}
        />
      </div>

      {/* 
          RIGHT SECTION — SIDEBAR
         */}
      <div className="space-y-6">

        <UpcomingTasks tasks={upcomingTasks} />


        <OverdueTasks tasks={overdueTasks} />

      </div>

      {selectedDate && (
        <TaskModal
          selectedDate={selectedDate}
          tasks={selectedTasks}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </div>
  )
}

export default ProjectCalendar