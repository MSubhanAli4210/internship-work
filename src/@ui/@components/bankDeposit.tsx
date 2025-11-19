"use client";

import * as React from "react";
import { getData } from "../../@core/api/api";

import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="
          cursor-pointer
        "
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="
          cursor-pointer
        "
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="
            cursor-pointer
          "
        >
          ID
          <ArrowUpDown />
        </Button>
      );
    },
    // header: "User ID",
    cell: ({ row }) => (
      <div
        className="
          capitalize
        "
      >
        {row.getValue("id")}
      </div>
    ),
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div
        className="
          capitalize
        "
      >
        {row.getValue("status")}
      </div>
    ),
  },
  {
    accessorKey: "username",
    header: "User Name",

    cell: ({ row }) => (
      <div
        className="
        lowercase
      "
      >
        {row.getValue("username")}
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: () => (
      <div
        className="
        text-right
      "
      >
        Amount
      </div>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      // Format the amount as any currency.
      const formatted = new Intl.NumberFormat("en-pk", {
        style: "currency",
        currency: "pkr",
      }).format(amount);

      return (
        <div
          className="
          text-right font-medium
        "
        >
          {formatted}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="
                h-8 w-8
                p-0
              "
            >
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function BankDeposit() {
  const { data } = useQuery({
    queryKey: ["BankDeposite"],
    queryFn: async () => {
      const users = await getData();
      return users.map((user: any) => ({
        id: user.id,
        amount: Math.floor(Math.random() * 1000),
        status: ["pending", "processing", "success", "failed"][
          Math.floor(Math.random() * 4)
        ],
        username: user.username,
      }));
    },
    throwOnError: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const navigate = useNavigate();
  const location = useLocation();

  const pagenummber = (page: number) => {
    table.setPageIndex(page);

    const params = new URLSearchParams(location.search);
    params.set("page", (page + 1).toString());

    navigate(`?${params.toString()}`);
  };

  const params = new URLSearchParams(location.search);
  const pageParam = Number(params.get("page"));
  const InitialPage = !isNaN(pageParam) && pageParam > 0 ? pageParam - 1 : 0;
  useEffect(() => {
    if (!isNaN(pageParam) && pageParam > 0) {
      table.setPageIndex(pageParam - 1);
    }
  }, [location.search]);

  const table = useReactTable({
    data: data ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },

    initialState: {
      pagination: {
        pageSize: 5,
        pageIndex: InitialPage,
      },
    },
  });

  const queryClient = useQueryClient();
  const refreshDepositsData = () => {
    queryClient.invalidateQueries({ queryKey: ["BankDeposite"] });
  };

  return (
    <div
      className="
        w-full
        p-4
        bg-white
        rounded-md
      "
    >
      <div
        className="
          flex
          py-4
          items-center
        "
      >
        <Button onClick={refreshDepositsData} className="mr-auto">
          Update Table
        </Button>
        <Input
          placeholder="Filter Users..."
          value={
            (table.getColumn("username")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("username")?.setFilterValue(event.target.value)
          }
          className="
            max-w-sm
          "
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="
                ml-auto
              "
            >
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                    className="
                      capitalize
                    "
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div
        className="
          overflow-hidden
          rounded-md border
        "
      >
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
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
                  className="
                    h-24
                    text-center
                  "
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div
        className="
          flex
          space-x-2 py-4
          items-center justify-end
        "
      >
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  pagenummber(table.getState().pagination.pageIndex - 1);
                }}
                className={
                  !table.getCanPreviousPage()
                    ? "opacity-50 pointer-events-none"
                    : ""
                }
              />
            </PaginationItem>
            {Array.from({ length: table.getPageCount() }).map(
              (_, idx: number) => (
                <PaginationItem key={idx}>
                  <PaginationLink
                    href="#"
                    isActive={table.getState().pagination.pageIndex === idx}
                    onClick={(e) => {
                      e.preventDefault();
                      pagenummber(idx);
                    }}
                  >
                    {idx + 1}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  pagenummber(table.getState().pagination.pageIndex + 1);
                }}
                className={
                  !table.getCanNextPage()
                    ? "opacity-50 pointer-events-none"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
