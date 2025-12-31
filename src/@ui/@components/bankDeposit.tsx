import * as React from "react";
import {
  addDepositApi,
  approveDepositApi,
  deleteDepositApi,
  getDepositApi,
  rejectDepositApi,
} from "../../@core/api/api";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import type {
  // ColumnDef,
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

import {
  ArrowUpDown,
  Check,
  ChevronDown,
  Loader2,
  PlusIcon,
  Trash2,
  X,
} from "lucide-react";

import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
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

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";
import { CardContent, CardTitle } from "../../components/ui/card";
import { toast } from "sonner";
import { userAuthStore } from "../../store/userAuthStore";

export type Payment = {
  id: string;
  amount: number;
  userid: number;
  depositstatus: "pending" | "approved" | "rejected";
  username: string;
};

export function BankDeposit() {
  const queryClient = useQueryClient();
  const { token, user } = userAuthStore((state) => state);
  const navigate = useNavigate();
  const location = useLocation();

  const [Deposite, setDeposite] = useState("");
  const [Comment, setComment] = useState("");

  const { data } = useQuery({
    queryKey: ["BankDeposite"],
    queryFn: async () => {
      const response = await getDepositApi();
      const deposits = response.deposits;
      if (!Array.isArray(deposits)) {
        toast.error("API did not return an array of deposits");
        return;
      }
      return deposits.map((deposit: any) => ({
        id: String(deposit.depositId),
        amount: Number(deposit.amount),
        userid: deposit.userId,
        comment: deposit.comment,
        depositstatus: deposit.status,
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
    columns: [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
            className="cursor-pointer"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="cursor-pointer"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "id",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="cursor-pointer"
          >
            Deposit ID
            <ArrowUpDown />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("id")}</div>
        ),
      },
      // {
      //   accessorKey: "status",
      //   header: "Status",
      //   cell: ({ row }) => (
      //     <div className="capitalize">{row.getValue("status")}</div>
      //   ),
      // },
      {
        accessorKey: "userid",
        header: "User ID",
        cell: ({ row }) => (
          <div className="lowercase">{row.getValue("userid")}</div>
        ),
      },
      {
        accessorKey: "depositstatus",
        header: "Status",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("depositstatus")}</div>
        ),
      },
      {
        accessorKey: "amount",
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => {
          const amount = parseFloat(row.getValue("amount"));
          const formatted = new Intl.NumberFormat("en-us", {
            style: "currency",
            currency: "usd",
          }).format(amount);
          return <div className="text-right font-medium">{formatted}</div>;
        },
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const depositId = row.original.id;
          const showAproveReject =
            row.original.depositstatus === "pending" && user?.role === "admin";
          const showDelete =
            row.original.depositstatus === "pending" && user?.role === "user";
          return (
            <div className="text-right">
              {showDelete && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-600 hover:bg-red-600 hover:text-white disabled:opacity-50"
                  onClick={() => {
                    if (!depositId) {
                      toast.error("Deposit ID is missing");
                      return;
                    }
                    DeleteDeposit.mutate(depositId);
                  }}
                  disabled={DeleteDeposit.isPending}
                >
                  <Trash2 />
                </Button>
              )}
              {showAproveReject && (
                <>
                  <Button
                    onClick={() => ApproveDeposit.mutate(depositId)}
                    disabled={ApproveDeposit.isPending}
                    size="icon"
                    variant="ghost"
                    className="text-green-500 hover:bg-green-600 hover:text-white"
                  >
                    {ApproveDeposit.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Check />
                    )}
                  </Button>
                  <Button
                    onClick={() => RejectDeposit.mutate(depositId)}
                    disabled={RejectDeposit.isPending}
                    variant="ghost"
                    size="icon"
                    className="hover:bg-red-600 hover:text-white text-red-600"
                  >
                    {RejectDeposit.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <X />
                    )}
                  </Button>
                </>
              )}
            </div>
          );
        },
      },
    ],
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
        pageIndex: InitialPage,
      },
    },
  });

  const pagenummber = (page: number) => {
    table.setPageIndex(page);
    const params = new URLSearchParams(location.search);
    params.set("page", (page + 1).toString());
    navigate(`?${params.toString()}`);
  };

  const AddDeposit = useMutation({
    mutationFn: async () => {
      return await addDepositApi({ amount: Deposite, comment: Comment });
    },
    onSuccess: (msg: any) => {
      toast.success(
        msg?.response?.data?.message || "Deposit added successfully",
        { richColors: true }
      );
      queryClient.invalidateQueries({
        queryKey: ["BankDeposite"],
        refetchType: "active",
      });
      setDeposite("");
      setComment("");
      setDepositOpen(false);
    },
  });

  const ApproveDeposit = useMutation({
    mutationFn: async (id: string) => {
      if (!token) {
        throw new Error("Unauthorized");
      }
      return await approveDepositApi(id, token);
    },
    onSuccess: () => {
      toast.success("Deposit approved successfully", { richColors: true });
      queryClient.invalidateQueries({
        queryKey: ["BankDeposite"],
        refetchType: "active",
      });
    },
    onError: (err: any) => {
       console.log(err?.response?.data?.message);
      toast.error(err?.response?.data?.message || "Approving deposit failed", {
        richColors: true,
      });
     
    },
  });

  const RejectDeposit = useMutation({
    mutationFn: async (id: string) => {
      if (!token) {
        throw new Error("Unauthorized");
      }
      return await rejectDepositApi(id, token);
    },
    onSuccess: () => {
      toast.success("Deposit rejected successfully", { richColors: true });
      queryClient.invalidateQueries({
        queryKey: ["BankDeposite"],
        refetchType: "active",
      });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Rejecting deposit failed", {
        richColors: true,
      });
    },
  });

  const DeleteDeposit = useMutation({
    mutationFn: async (id: string) => {
      if (!token) {
        throw new Error("Unauthorized");
      }
      return await deleteDepositApi(id, token);
    },
    onSuccess: () => {
      toast.success("Deposit deleted successfully", { richColors: true });
      queryClient.invalidateQueries({
        queryKey: ["BankDeposite"],
        refetchType: "active",
      });
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Deleting deposit failed", {
        richColors: true,
      });
    },
  });

  const handleAddDeposit = () => {
    if (!Deposite) {
      toast.error("Please enter a deposit amount", { richColors: true });
      return;
    }
    if (Deposite.length > 10) {
      toast.error("Deposit amount is too large", { richColors: true });
      return;
    }

    AddDeposit.mutate();
  };

  const [depositOpen, setDepositOpen] = useState(false);

  return (
    <div className="w-full p-4 bg-white rounded-md">
      {/* Top controls */}
      <div className="flex py-4 justify-between gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  className="capitalize"
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Add Deposit */}
        <DropdownMenu open={depositOpen} onOpenChange={setDepositOpen}>
          <DropdownMenuTrigger asChild>
            <Button className="bg-green-500 hover:bg-green-600">
              <PlusIcon className="cursor-pointer" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="lg:w-80 lg:mr-18 lg:mt-3 md:w-70 md:mr-18 w-64 mr-13 mt-3">
            <CardContent className="opacity-90 flex flex-col gap-2 p-4">
              <CardTitle>Deposit Amount</CardTitle>

              <Input
                type="number"
                placeholder="Enter deposit amount"
                value={Deposite}
                onChange={(e) => setDeposite(e.target.value)}
              />

              <CardTitle>Comment</CardTitle>
              <Input
                type="text"
                placeholder="Add comment"
                value={Comment}
                onChange={(e) => setComment(e.target.value)}
              />

              <Button type="button" onClick={handleAddDeposit}>
                Add
              </Button>
            </CardContent>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-md border">
        <Table>
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
          <TableBody>
            {table.getRowModel().rows.length ? (
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
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex space-x-2 py-4 items-center justify-end">
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
            {Array.from({ length: table.getPageCount() }).map((_, idx) => (
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
            ))}
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
