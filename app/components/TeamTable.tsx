import { useState } from "react";
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable, createColumnHelper, } from "@tanstack/react-table";
import type { SortingState } from "@tanstack/react-table";

import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell, } from "~/components/ui/table";

import { ArrowUpDown } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";

/* ---------------- Types ---------------- */

interface Member {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "MEMBER";
}

interface TeamTableProps {
    members: Member[];
}

/* ---------------- Column Setup ---------------- */

const columnHelper = createColumnHelper<Member>();

const columns = [
    columnHelper.accessor("name", {
        header: ({ column }) => (
            <button
                className="flex items-center gap-2"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Name
                <ArrowUpDown size={14} />
            </button>
        ),
        cell: ({ row }) => {
            const member = row.original;
            const initials = member.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase();

            return (
                <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{member.name}</span>
                </div>
            );
        },
    }),

    columnHelper.accessor("email", {
        header: "Email",
        cell: ({ row }) => (
            <span className="text-muted-foreground">
                {row.original.email}
            </span>
        ),
    }),

    columnHelper.accessor("role", {
        header: "Role",
        cell: ({ row }) => {
            const role = row.original.role;

            const roleColorMap: Record<Member["role"], string> = {
                ADMIN:
                    "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
                MEMBER:
                    "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
            };

            return (
                <Badge className={`font-medium ${roleColorMap[role]}`}>
                    {role}
                </Badge>
            );
        },
    }),
];

/* ---------------- Main Component ---------------- */

export default function TeamTable({ members }: TeamTableProps) {
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data: members,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <section className="space-y-4">
            <div className="rounded-md border overflow-hidden">
                <Table className="table-fixed w-full">
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
                                    No team members found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </section>
    );
}