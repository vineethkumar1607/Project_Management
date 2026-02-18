import { useTaskFilters } from "~/hooks/useTaskFilters";

function TaskFilterBar({ assignees }: { assignees: string[] }) {
  const { filters, updateFilter, resetFilters } = useTaskFilters();

  return (
    <div className="flex gap-4 flex-wrap mb-4">

      {/* Status Filter */}
      <select
        value={filters.status || ""}
        onChange={(e) => updateFilter("status", e.target.value)}
        className="border px-3 py-1 rounded text-sm"
      >
        <option value="">All Statuses</option>
        <option value="TODO">To Do</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="DONE">Done</option>
      </select>

      {/* Type Filter */}
      <select
        value={filters.type || ""}
        onChange={(e) => updateFilter("type", e.target.value)}
        className="border px-3 py-1 rounded text-sm"
      >
        <option value="">All Types</option>
        <option value="BUG">Bug</option>
        <option value="FEATURE">Feature</option>
        <option value="TASK">Task</option>
      </select>

      {/* Reset Button */}
      {(filters.status || filters.type || filters.priority || filters.assignee) && (
        <button
          onClick={resetFilters}
          className="px-3 py-1 bg-gray-200 rounded text-sm"
        >
          Reset
        </button>
      )}
    </div>
  );
}


export default TaskFilterBar