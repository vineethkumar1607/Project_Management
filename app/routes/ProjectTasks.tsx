import { useState } from "react";

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  createColumnHelper,
} from "@tanstack/react-table";

import type {
  SortingState,
} from "@tanstack/react-table";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "~/components/ui/table";

import { ArrowUpDown } from "lucide-react";

/* -------------------------------------------------- */
/* 1️⃣ Task Type Definition                          */
/* -------------------------------------------------- */

interface Task {
  id: string;
  title: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate: string;
}

/* -------------------------------------------------- */
/* 2️⃣ Mock Data (Replace With API Later)            */
/* -------------------------------------------------- */

const tasks: Task[] = [
  {
    id: "1",
    title: "Design login page",
    status: "IN_PROGRESS",
    priority: "HIGH",
    dueDate: "2026-02-20",
  },
  {
    id: "2",
    title: "Setup database schema",
    status: "TODO",
    priority: "MEDIUM",
    dueDate: "2026-02-25",
  },
  {
    id: "3",
    title: "Implement authentication",
    status: "DONE",
    priority: "HIGH",
    dueDate: "2026-02-15",
  },
];

/* -------------------------------------------------- */
/* 3️⃣ Column Helper (Official v8 Pattern)           */
/* -------------------------------------------------- */

const columnHelper = createColumnHelper<Task>();

const columns = [
  columnHelper.accessor("title", {
    header: ({ column }) => (
      <button
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Task
        <ArrowUpDown size={14} />
      </button>
    ),
  }),

  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;

      const color =
        status === "DONE"
          ? "bg-green-100 text-green-700"
          : status === "IN_PROGRESS"
          ? "bg-blue-100 text-blue-700"
          : "bg-gray-100 text-gray-700";

      return (
        <span className={`px-2 py-1 rounded text-xs font-medium ${color}`}>
          {status.replace("_", " ")}
        </span>
      );
    },
  }),

  columnHelper.accessor("priority", {
    header: "Priority",
  }),

  columnHelper.accessor("dueDate", {
    header: "Due Date",
  }),
];

/* -------------------------------------------------- */
/* 4️⃣ Main Component                                */
/* -------------------------------------------------- */

const ProjectTasks = () => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: tasks,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <section className="space-y-6">
      {/* ---------------- Header ---------------- */}
      <header>
        <h2 className="text-lg font-semibold">Tasks</h2>
        <p className="text-sm text-muted-foreground">
          Manage and track project tasks
        </p>
      </header>

      {/* ---------------- Table ---------------- */}
      <div className="rounded-md border overflow-hidden">
        <Table>
          {/* Header */}
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
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
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
    </section>
  );
};

export default ProjectTasks;
