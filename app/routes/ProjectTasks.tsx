import { useEffect, useState } from "react";

import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable, createColumnHelper, } from "@tanstack/react-table";

import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell, } from "~/components/ui/table";
import { useMemo } from "react";
import TaskFilterBar from "~/components/TaskFilterBar";
import { filterTasks } from "~/lib/filtertasks";
import StatusSelect from "~/components/StatusSelect";
import { useTaskFilters } from "~/hooks/useTaskFilters";
import { useParams } from "react-router";

import type { Task } from "~/types/workspace";

import { useNavigate } from "react-router";

import { useUser } from "@clerk/clerk-react";
import { Button } from "~/components/ui/button";
import ConfirmDialog from "~/components/Common/ConfirmDailog";
import { useGetTasksQuery } from "~/store/api/tasksApi";
import { useDeleteTasksHandler } from "~/hooks/useDeleteTasksHandler";
import { useTaskSelection } from "~/hooks/useTaskSelection";
import type { SortingState } from "@tanstack/react-table";

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
/* Main Component                                */
/* -------------------------------------------------- */

const ProjectTasks = () => {

  const { user } = useUser();
  const navigate = useNavigate();
  const { filters } = useTaskFilters();
  const { projectId } = useParams();

  const { data: tasks = [], isLoading, error } = useGetTasksQuery(projectId!);

  const filteredTasks = useMemo(
    () => filterTasks(tasks, filters),
    [tasks, filters]
  );

  const {
    selectedTaskIds,
    handleCheckboxClick,
    toggleSelectAll,
    isAllSelected,
    clearSelection,
  } = useTaskSelection(filteredTasks);

  const [sorting, setSorting] = useState<SortingState>([]);

  const { handleDelete, isDeleting } = useDeleteTasksHandler(tasks, projectId!);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const assignees = useMemo<string[]>(() => {
    return Array.from(
      new Set(
        tasks
          .map((t: Task) => t.assignee?.name)
          .filter((name): name is string => Boolean(name))
      )
    );
  }, [tasks]);

  useEffect(() => {
    clearSelection();
  }, [filters, tasks]);


  const columnHelper = createColumnHelper<Task>();

  const columns = useMemo(() => [
    // Checkbox column for bulk selection 
    columnHelper.display({
      id: "select",
      header: () => (
        <input
          type="checkbox"
          checked={isAllSelected}
          onChange={toggleSelectAll}
        />
      ),
      cell: ({ row }) => (
        <input
          key={row.original.id}
          type="checkbox"
          checked={selectedTaskIds.includes(row.original.id)}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) =>
            handleCheckboxClick(e, row.original.id, row.index)
          }
        />
      ),
    }),

    // Task title with truncation for long titles
    columnHelper.accessor("title", {
      header: "Task",
      cell: info => (
        <div className="min-w-[200px] truncate">
          {info.getValue()}
        </div>
      ),
    }),

    // Type column with color coding
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
          <span className={`inline-flex justify-center items-center w-[110px] px-2 py-1 rounded text-xs font-medium ${color}`}>
            {type}
          </span>
        );
      },
    }),


    // Status column with inline editing using StatusSelect component. It checks if the user is either the team lead or the assignee to determine if they can update the status.
    columnHelper.accessor("status", {
      header: "Status",
      cell: ({ row }) => {
        const task = row.original;

        const isTeamLead = task.project?.team_lead === user?.id;
        const isAssignee = task.assignee?.id === user?.id;

        const canUpdate = !!user && (isTeamLead || isAssignee);

        return (
          <div className="min-w-[140px]"
            onClick={(e) => e.stopPropagation()} // Prevent row click when interacting with status
          >
            <StatusSelect
              defaultValue={task.status}
              taskId={task.id}
              disabled={!canUpdate}
            />
          </div>
        );
      },
    }),

    // Priority column with simple display. 
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

    // Due date column with Indian date formatting. It also handles cases where the date might be missing or invalid, displaying a placeholder instead of crashing.
    columnHelper.accessor("due_date", {
      header: "Due Date",
      cell: ({ row }) => (
        <span className="whitespace-nowrap text-sm">
          {formatIndianDate(row.original.due_date)}
        </span>
      ),
    }),
  ], [user, selectedTaskIds, isAllSelected, handleCheckboxClick, toggleSelectAll]);

  const table = useReactTable({
    data: filteredTasks,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (isLoading) return <div>Loading tasks...</div>;
  if (error) return <div>Failed to load tasks</div>;

  return (
    <>
      <section className="space-y-5">
        {/* ---------------- Header ---------------- */}
        <header>

          <p className="text-sm text-muted-foreground">
            Manage and track project tasks
          </p>
        </header>
        <div className="flex items-center justify-between gap-4">
          <TaskFilterBar assignees={assignees} />

          {selectedTaskIds.length > 0 && (
            <Button
              variant="destructive"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              Delete ({selectedTaskIds.length})
            </Button>
          )}
        </div>

        {/* ---------------- Table ---------------- */}
        <div className="rounded-md border overflow-hidden">
          <div className="w-full overflow-x-auto">
            <Table className="min-w-[900px] w-full ">
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
                    <TableRow
                      role="row"
                      key={row.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={(e) => {
                        // Prevent navigation when clicking checkbox
                        if ((e.target as HTMLElement).closest("input")) return;

                        navigate(`/tasks/${row.original.id}`);
                      }}
                    >
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
      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete Tasks"
        description={`Are you sure you want to delete ${selectedTaskIds.length} task(s)?`}
        confirmText="Delete"
        onConfirm={() => handleDelete(selectedTaskIds)}
        loading={isDeleting}
      />
    </>
  );
};

export default ProjectTasks;
