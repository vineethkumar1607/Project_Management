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
                className="flex items-center gap-2 w-[200px]"
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
                <div className="flex items-center gap-3 w-[200px]">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <span className="font-medium truncate">
                        {member.name}
                    </span>
                </div>
            );
        },
    }),

    columnHelper.accessor("email", {
        header: () => (
            <span className="block w-[250px]">Email</span>
        ),
        cell: ({ row }) => (
            <span className="text-muted-foreground block w-[250px] break-all">
                {row.original.email}
            </span>
        ),
    }),

    columnHelper.accessor("role", {
        header: () => (
            <span className="block w-[120px]">Role</span>
        ),
        cell: ({ row }) => {
            const role = row.original.role;

            const roleColorMap: Record<Member["role"], string> = {
                ADMIN:
                    "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
                MEMBER:
                    "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
            };

            return (
                <div className="w-[120px]">
                    <Badge className={`font-medium ${roleColorMap[role]}`}>
                        {role}
                    </Badge>
                </div>
            );
        },
    }),
]

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
                <div className="w-full overflow-x-auto">

                    <Table className="w-full min-w-[600px]">

                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id} scope="col" className="text-left align-middle px-4 py-3">
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>

                        <TableBody>
                            {table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className="px-4 py-3 align-middle"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>

                </div>
            </div>
        </section>
    );
}