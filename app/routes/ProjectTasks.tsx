import { useState } from "react";

import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable, createColumnHelper, } from "@tanstack/react-table";

import type { SortingState, } from "@tanstack/react-table";

import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell, } from "~/components/ui/table";
import { useMemo } from "react";
import TaskFilterBar from "~/components/TaskFilterBar";
import { filterTasks } from "~/lib/filtertasks";
import StatusSelect from "~/components/StatusSelect";
import { useTaskFilters } from "~/hooks/useTaskFilters";
import { useParams } from "react-router";
import { useGetTasksQuery } from "~/store/api/tasksApi";
import type { Task } from "~/types/workspace";

/* -------------------------------------------------- */
/* Task Type Definition                          */
/* -------------------------------------------------- */



const formatIndianDate = (dateString?: string) => {
  if (!dateString) return "-";

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "-"; //  prevent crash

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

/* -------------------------------------------------- */
/* Column Helper (Official v8 Pattern)           */
/* -------------------------------------------------- */

const columnHelper = createColumnHelper<Task>();

const columns = [
  columnHelper.accessor("title", {
    header: "Task",
    cell: info => (
      <div className="min-w-[200px] truncate">
        {info.getValue()}
      </div>
    ),
  }),

  columnHelper.accessor("type", {
    header: "Type",
    cell: ({ row }) => {
      const type = row.original.type;

      const color =
        type === "BUG"
          ? "bg-red-100 text-red-700"
          : type === "FEATURE"
            ? "bg-blue-100 text-blue-700"
            : "bg-purple-100 text-purple-700";

      return (
        <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${color}`}>
          {type}
        </span>
      );
    },
  }),

  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) => (
      <div className="min-w-[140px]">
        <StatusSelect defaultValue={row.original.status} />
      </div>
    ),
  }),

  columnHelper.accessor("priority", {
    header: "Priority",
    cell: info => (
      <span className="whitespace-nowrap">{info.getValue()}</span>
    ),
  }),

  columnHelper.accessor("assignee", {
    header: "Assignee",
    cell: ({ row }) => {
      const assignee = row.original.assignee;
      return (
        <div className="flex items-center gap-2 min-w-40">
          {assignee.name}
        </div>
      );
    },
  }),

  columnHelper.accessor("due_date", {
    header: "Due Date",
    cell: ({ row }) => (
      <span className="whitespace-nowrap text-sm">
        {formatIndianDate(row.original.due_date)}
      </span>
    ),
  }),
];




/* -------------------------------------------------- */
/* Main Component                                */
/* -------------------------------------------------- */

const ProjectTasks = () => {
  const { filters } = useTaskFilters();
  const [sorting, setSorting] = useState<SortingState>([]);
  const { projectId } = useParams();

  const { data: tasks = [], isLoading, error } = useGetTasksQuery(projectId!);

  // Apply filtering
  const filteredTasks = useMemo(
    () => filterTasks(tasks, filters),
    [tasks, filters]
  );


  const table = useReactTable({
    data: filteredTasks,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // Gets unique assignees
  const assignees = useMemo<string[]>(() => {
    return Array.from(
      new Set(
        tasks
          .map((t: Task) => t.assignee?.name)
          .filter((name: string): name is string => Boolean(name))
      )
    );
  }, [tasks]);


  if (isLoading) return <div>Loading tasks...</div>;
  if (error) return <div>Failed to load tasks</div>;

  return (
    <section className="space-y-5">
      {/* ---------------- Header ---------------- */}
      <header>

        <p className="text-sm text-muted-foreground">
          Manage and track project tasks
        </p>
      </header>
      <TaskFilterBar assignees={assignees} />


      {/* ---------------- Table ---------------- */}
      <div className="rounded-md border overflow-hidden">
        <div className="w-full overflow-x-auto">
          <Table className="min-w-[900px] w-full">
            {/* Header */}
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow role="row" key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead scope="col" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            {/* Body */}
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow role="row" key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell role="cell" key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    role="cell"
                    colSpan={columns.length}
                    className="text-center py-6 text-muted-foreground"
                  >
                    No tasks found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default ProjectTasks;
