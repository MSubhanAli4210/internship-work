import * as React from "react";
import {
  addWithdrawApi,
  approveWithdrawApi,
  deleteWithdrawApi,
  getWithdrawApi,
  rejectWithdrawApi,
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
  withdrawstatus: "pending" | "approved" | "rejected";
  username: string;
};

export function AppTable() {
  const queryClient = useQueryClient();
  const { token, user } = userAuthStore((state) => state);
  const navigate = useNavigate();
  const location = useLocation();

  const [withdraw, setwithdraw] = useState("");
  const [Comment, setComment] = useState("");

  const { data } = useQuery({
    queryKey: ["Bankwithdraw"],
    queryFn: async () => {
      const response = await getWithdrawApi();
      const Withdraws = response.withdraws;
      if (!Array.isArray(Withdraws)) {
        toast.error("API did not return an array of Withdraws");
        return;
      }
      return Withdraws.map((withdraw: any) => ({
        id: String(withdraw.withdrawId),
        amount: Number(withdraw.amount),
        userid: withdraw.userId,
        comment: withdraw.comment,
        withdrawstatus: withdraw.status,
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
            Withdraw ID
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
        accessorKey: "withdrawstatus",
        header: "Status",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("withdrawstatus")}</div>
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
          const WithdrawId = row.original.id;
          const showAproveReject =
            row.original.withdrawstatus === "pending" && user?.role === "admin";
          const showDelete =
            row.original.withdrawstatus === "pending" && user?.role === "user";
          return (
            <div className="text-right">
              {showDelete && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-600 hover:bg-red-600 hover:text-white disabled:opacity-50"
                  onClick={() => {
                    if (!WithdrawId) {
                      toast.error("Withdraw ID is missing");
                      return;
                    }
                    DeleteWithdraw.mutate(WithdrawId);
                  }}
                  disabled={DeleteWithdraw.isPending}
                >
                  <Trash2 />
                </Button>
              )}
              {showAproveReject && (
                <>
                  <Button
                    onClick={() => ApproveWithdraw.mutate(WithdrawId)}
                    disabled={ApproveWithdraw.isPending}
                    size="icon"
                    variant="ghost"
                    className="text-green-500 hover:bg-green-600 hover:text-white"
                  >
                    {ApproveWithdraw.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Check />
                    )}
                  </Button>
                  <Button
                    onClick={() => RejectWithdraw.mutate(WithdrawId)}
                    disabled={RejectWithdraw.isPending}
                    variant="ghost"
                    size="icon"
                    className="hover:bg-red-600 hover:text-white text-red-600"
                  >
                    {RejectWithdraw.isPending ? (
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

  const AddWithdraw = useMutation({
    mutationFn: async () => {
      return await addWithdrawApi({ amount: withdraw, comment: Comment });
    },
    onSuccess: (msg: any) => {
      toast.success(
        msg?.response?.data?.message || "Withdraw added successfully",
        { richColors: true }
      );
      queryClient.invalidateQueries({
        queryKey: ["Bankwithdraw"],
        refetchType: "active",
      });
      setwithdraw("");
      setComment("");
      setWithdrawOpen(false);
    },
  });

  const ApproveWithdraw = useMutation({
    mutationFn: async (id: string) => {
      if (!token) {
        throw new Error("Unauthorized");
      }
      return await approveWithdrawApi(id, token);
    },
    onSuccess: () => {
      toast.success("Withdraw approved successfully", { richColors: true });
      queryClient.invalidateQueries({
        queryKey: ["Bankwithdraw"],
        refetchType: "active",
      });
    },
    onError: (err: any) => {
       console.log(err?.response?.data?.message);
      toast.error(err?.response?.data?.message || "Approving Withdraw failed", {
        richColors: true,
      });
     
    },
  });

  const RejectWithdraw = useMutation({
    mutationFn: async (id: string) => {
      if (!token) {
        throw new Error("Unauthorized");
      }
      return await rejectWithdrawApi(id, token);
    },
    onSuccess: () => {
      toast.success("Withdraw rejected successfully", { richColors: true });
      queryClient.invalidateQueries({
        queryKey: ["Bankwithdraw"],
        refetchType: "active",
      });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Rejecting Withdraw failed", {
        richColors: true,
      });
    },
  });

  const DeleteWithdraw = useMutation({
    mutationFn: async (id: string) => {
      if (!token) {
        throw new Error("Unauthorized");
      }
      return await deleteWithdrawApi(id, token);
    },
    onSuccess: () => {
      toast.success("Withdraw deleted successfully", { richColors: true });
      queryClient.invalidateQueries({
        queryKey: ["Bankwithdraw"],
        refetchType: "active",
      });
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Deleting Withdraw failed", {
        richColors: true,
      });
    },
  });

  const handleAddWithdraw = () => {
    if (!withdraw) {
      toast.error("Please enter a Withdraw amount", { richColors: true });
      return;
    }
    if (withdraw.length > 8) {
      toast.error("Withdraw amount is too large", { richColors: true });
      return;
    }

    AddWithdraw.mutate();
  };

  const [WithdrawOpen, setWithdrawOpen] = useState(false);

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

        {/* Add Withdraw */}
        <DropdownMenu open={WithdrawOpen} onOpenChange={setWithdrawOpen}>
          <DropdownMenuTrigger asChild>
            <Button className="bg-green-500 hover:bg-green-600">
              <PlusIcon className="cursor-pointer" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="lg:w-80 lg:mr-18 lg:mt-3 md:w-70 md:mr-18 w-64 mr-13 mt-3">
            <CardContent className="opacity-90 flex flex-col gap-2 p-4">
              <CardTitle>Withdraw Amount</CardTitle>

              <Input
                type="number"
                placeholder="Enter Withdraw amount"
                value={withdraw}
                onChange={(e) => setwithdraw(e.target.value)}
              />

              <CardTitle>Comment</CardTitle>
              <Input
                type="text"
                placeholder="Add comment"
                value={Comment}
                onChange={(e) => setComment(e.target.value)}
              />

              <Button type="button" onClick={handleAddWithdraw}>
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
