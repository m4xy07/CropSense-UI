"use client"

import { useId, useMemo, useRef, useState } from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import {
  ChartNoAxesColumn,
  ChevronDownIcon,
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CircleAlertIcon,
  CircleXIcon,
  Columns3Icon,
  EllipsisIcon,
  FilterIcon,
  ListFilterIcon,
  PlusIcon,
  TrashIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from "next/image"

type Item = {
  id: string
  task: string
  location: string
  startTime: string
  endTime: string
  sensorValidation: string
  taskTimestamp?: string
  status: "Active" | "Inactive" | "Pending"
  priority: string // new: priority
}

// Custom filter function for multi-column searching
const multiColumnFilterFn: FilterFn<Item> = (row, columnId, filterValue) => {
  // No longer needed since name and tasks columns are removed
  return true;
}

const statusFilterFn: FilterFn<Item> = (
  row,
  columnId,
  filterValue: string[]
) => {
  if (!filterValue?.length) return true
  const status = row.getValue(columnId) as string
  return filterValue.includes(status)
}

// Rearranged columns for better logical order
const columns: ColumnDef<Item>[] = [
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
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    size: 28,
    enableSorting: false,
    enableHiding: false,
  },
  // Task column (first)
  {
    header: "Task",
    accessorKey: "task",
    cell: ({ row }) => <span>{row.getValue("task")}</span>,
    size: 160,
    enableHiding: false,
  },
  // Location column (second)
  {
    header: "Location",
    accessorKey: "location",
    cell: ({ row }) => <span>{row.getValue("location")}</span>,
    size: 120,
    enableHiding: false,
  },
  // Priority column (third)
  {
    header: "Priority",
    accessorKey: "priority",
    cell: ({ row }) => {
      const value = row.getValue("priority") as string;
      let color = "";
      if (value === "High") color = "text-[#12b881] font-normal text-[12px] py-0 px-1 whitespace-nowrap";
      else if (value === "Medium") color = "text-[#c7a004] font-normal text-[12px] py-0 px-1 whitespace-nowrap";
      else color = "text-[#ff6b75] font-normal text-[12px] py-0 px-1 whitespace-nowrap";
      let badge = "";
      if (value === "High") badge = "bg-[rgba(18,184,129,.12)] rounded-[6px] w-fit";
      else if (value === "Medium") badge = "bg-[rgba(250,202,10,.12)] rounded-[6px] w-fit";
      else badge = "bg-[rgba(255,107,117,.12)] rounded-[6px] w-fit";
      return <div className={badge}>
        <span className={color}>{value}
          </span>
          </div>;
    },
    size: 100,
    enableHiding: false,
    sortingFn: (rowA, rowB, columnId) => {
      const order = { High: 3, Medium: 2, Low: 1 };
      const a = order[rowA.getValue(columnId) as string] || 0;
      const b = order[rowB.getValue(columnId) as string] || 0;
      return a - b;
    },
  },
  // Status column (fourth)
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => (
      <Badge
        className={cn(
          row.getValue("status") === "Inactive" &&
            "bg-muted-foreground/60 text-primary-foreground"
        )}
      >
        {row.getValue("status")}
      </Badge>
    ),
    size: 100,
    filterFn: statusFilterFn,
    sortingFn: (rowA, rowB, columnId) => {
      const order = { Active: 3, Pending: 2, Inactive: 1 };
      const a = order[rowA.getValue(columnId) as string] || 0;
      const b = order[rowB.getValue(columnId) as string] || 0;
      return a - b;
    },
  },
  // Start Time column (fifth)
  {
    header: "Start Time",
    accessorKey: "startTime",
    cell: ({ row }) => <span>{row.getValue("startTime")}</span>,
    size: 100,
    enableHiding: false,
  },
  // End Time column (sixth)
  {
    header: "End Time",
    accessorKey: "endTime",
    cell: ({ row }) => <span>{row.getValue("endTime")}</span>,
    size: 100,
    enableHiding: false,
  },
  // Sensor Validation column (seventh)
  {
    header: "Sensor Validation",
    accessorKey: "sensorValidation",
    cell: ({ row }) => <span>{row.getValue("sensorValidation")}</span>,
    size: 160,
    enableHiding: false,
  },
  // Actions column remains
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => <RowActions row={row} />,
    size: 60,
    enableHiding: false,
  },
]


// Cookie helpers
function setCookie(name: string, value: string, days = 365) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
}
function getCookie(name: string) {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=');
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, '');
}

export default function RoutineTable() {
  const id = useId()
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  // Read initial pageSize from cookie, default to 5
  const getInitialPageSize = () => {
    if (typeof window !== 'undefined') {
      const cookieVal = getCookie('routineTablePageSize');
      const parsed = parseInt(cookieVal, 10);
      if (!isNaN(parsed) && [5, 10, 25, 50].includes(parsed)) return parsed;
    }
    return 5;
  };
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: getInitialPageSize(),
  })
  const inputRef = useRef<HTMLInputElement>(null)

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "startTime", // changed from 'time' to 'startTime' since 'time' column no longer exists
      desc: false,
    },
  ])

  // Add more meaningful data records for demonstration
  const initialData: Item[] = [
    {
      id: "1",
      task: "Irrigation",
      location: "Plot 1",
      startTime: "06:00 AM",
      endTime: "08:00 AM",
      sensorValidation: "Valid",
      status: "Active",
      priority: "High",
      taskTimestamp: new Date().toISOString(),
    },
    {
      id: "2",
      task: "Fertilizer Application",
      location: "Plot 2",
      startTime: "09:00 AM",
      endTime: "10:00 AM",
      sensorValidation: "Valid",
      status: "Pending",
      priority: "Medium",
      taskTimestamp: new Date().toISOString(),
    },
    {
      id: "3",
      task: "Weeding",
      location: "Plot 3",
      startTime: "11:00 AM",
      endTime: "12:00 PM",
      sensorValidation: "Sensor Error",
      status: "Inactive",
      priority: "High",
      taskTimestamp: new Date().toISOString(),
    },
    {
      id: "4",
      task: "Harvesting",
      location: "Plot 4",
      startTime: "01:00 PM",
      endTime: "03:00 PM",
      sensorValidation: "Valid",
      status: "Active",
      priority: "Medium",
      taskTimestamp: new Date().toISOString(),
    },
    {
      id: "5",
      task: "Soil Testing",
      location: "Plot 5",
      startTime: "03:30 PM",
      endTime: "04:30 PM",
      sensorValidation: "Pending",
      status: "Pending",
      priority: "Low",
      taskTimestamp: new Date().toISOString(),
    },
    {
      id: "6",
      task: "Pest Control",
      location: "Plot 6",
      startTime: "05:00 PM",
      endTime: "06:00 PM",
      sensorValidation: "Valid",
      status: "Active",
      priority: "High",
      taskTimestamp: new Date().toISOString(),
    },
    {
      id: "7",
      task: "Tractor Maintenance",
      location: "Workshop",
      startTime: "07:00 AM",
      endTime: "08:00 AM",
      sensorValidation: "Valid",
      status: "Inactive",
      priority: "Low",
      taskTimestamp: new Date().toISOString(),
    },
    {
      id: "8",
      task: "Seed Sowing",
      location: "Plot 7",
      startTime: "08:30 AM",
      endTime: "10:00 AM",
      sensorValidation: "Valid",
      status: "Active",
      priority: "Medium",
      taskTimestamp: new Date().toISOString(),
    },
    {
      id: "9",
      task: "Compost Preparation",
      location: "Compost Yard",
      startTime: "10:30 AM",
      endTime: "12:00 PM",
      sensorValidation: "Pending",
      status: "Pending",
      priority: "Low",
      taskTimestamp: new Date().toISOString(),
    },
    {
      id: "10",
      task: "Spraying",
      location: "Plot 8",
      startTime: "02:00 PM",
      endTime: "03:00 PM",
      sensorValidation: "Valid",
      status: "Active",
      priority: "High",
      taskTimestamp: new Date().toISOString(),
    },
  ];

  const [data, setData] = useState<Item[]>(initialData)

  const handleDeleteRows = () => {
    const selectedRows = table.getSelectedRowModel().rows
    const updatedData = data.filter(
      (item) => !selectedRows.some((row) => row.original.id === item.id)
    )
    setData(updatedData)
    table.resetRowSelection()
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: (updater) => {
      setPagination((prev) => {
        const next = typeof updater === 'function' ? updater(prev) : updater;
        // Save pageSize to cookie if changed
        if (next.pageSize !== prev.pageSize) {
          setCookie('routineTablePageSize', String(next.pageSize));
        }
        return next;
      });
    },
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      pagination,
      columnFilters,
      columnVisibility,
    },
  })

  // Get unique status values
  const uniqueStatusValues = useMemo(() => {
    const statusColumn = table.getColumn("status")

    if (!statusColumn) return []

    const values = Array.from(statusColumn.getFacetedUniqueValues().keys())

    return values.sort()
  }, [table.getColumn("status")?.getFacetedUniqueValues()])

  // Get counts for each status
  const statusCounts = useMemo(() => {
    const statusColumn = table.getColumn("status")
    if (!statusColumn) return new Map()
    return statusColumn.getFacetedUniqueValues()
  }, [table.getColumn("status")?.getFacetedUniqueValues()])

  const selectedStatuses = useMemo(() => {
    const filterValue = table.getColumn("status")?.getFilterValue() as string[]
    return filterValue ?? []
  }, [table.getColumn("status")?.getFilterValue()])

  const handleStatusChange = (checked: boolean, value: string) => {
    const filterValue = table.getColumn("status")?.getFilterValue() as string[]
    const newFilterValue = filterValue ? [...filterValue] : []

    if (checked) {
      newFilterValue.push(value)
    } else {
      const index = newFilterValue.indexOf(value)
      if (index > -1) {
        newFilterValue.splice(index, 1)
      }
    }

    table
      .getColumn("status")
      ?.setFilterValue(newFilterValue.length ? newFilterValue : undefined)
  }

  return (
    <div className="space-y-4 px-5 py-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Filter by location */}
          <div className="relative">
            <Input
              id={`${id}-input`}
              ref={inputRef}
              className={cn(
                "peer min-w-60 ps-9 w-full equipment-input theme-color bg-[rgba(255,255,255,.025)] transition-all  text-white rounded-md !py-2 !px-4 !h-9"
              )}
              value={
                (table.getColumn("location")?.getFilterValue() ?? "") as string
              }
              onChange={(e) =>
                table.getColumn("location")?.setFilterValue(e.target.value)
              }
              placeholder="Filter by location..."
              type="text"
              aria-label="Filter by location"
            />
          </div>
          {/* Filter by status */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="!border-none flex items-center cursor-pointer w-fit bg-transparent py-[6px] px-[10px] rounded-[8px] relative group hover:bg-[rgba(255,255,255,.025)] transition-colors ease-in-out duration-200 theme-color dashboard-header-gps !h-fit ">
                <ChartNoAxesColumn className="-mr-[8px] h-4 w-4 text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff]"/>
                {/* <FilterIcon
                  className="-ms-1 opacity-60"
                  size={16}
                  aria-hidden="true"
                /> */}
                <span className="text-[14px] font-normal text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff] pl-[6px]">Status</span>
                {selectedStatuses.length > 0 && (
                  <span className="bg-[#ffffff0a] text-white -me-1 inline-flex h-4 w-4 max-h-full items-center rounded-xl border px-[5px] font-[inherit] text-[0.625rem] font-medium">
                    {selectedStatuses.length}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto min-w-36 p-3 font-inter main-dashboard-theme theme-color border !border-zinc-50/10" align="start">
              <div className="space-y-3">
                <div className="text-[#b2b2b2] text-xs font-medium">
                  Filters
                </div>
                <div className="space-y-3">
                  {uniqueStatusValues.map((value, i) => (
                    <div key={value} className="flex items-center gap-2">
                      <Checkbox
                        id={`${id}-${i}`}
                        checked={selectedStatuses.includes(value)}
                        onCheckedChange={(checked: boolean) =>
                          handleStatusChange(checked, value)
                        }
                      />
                      <Label
                        htmlFor={`${id}-${i}`}
                        className="flex grow justify-between gap-2 font-normal text-white"
                      >
                        {value}{" "}
                        <span className="text-[#b2b2b2] ms-2 text-xs">
                          {statusCounts.get(value)}
                        </span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          {/* Toggle columns visibility */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="!border-none flex items-center cursor-pointer w-fit bg-transparent py-[6px] px-[10px] rounded-[8px] relative group hover:bg-[rgba(255,255,255,.025)] transition-colors ease-in-out duration-200 theme-color dashboard-header-gps !h-fit ">
                <Columns3Icon
                  className="-mr-[8px] h-4 w-4 text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff]"
                  aria-hidden="true"
                />
                <span className="text-[14px] font-normal text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff] pl-[6px]">View</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="font-inter" align="end">
              <DropdownMenuLabel className="text-[#b2b2b2] text-xs font-medium">Toggle columns</DropdownMenuLabel>
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                      onSelect={(event) => event.preventDefault()}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-3">
          {/* Delete button */}
          {table.getSelectedRowModel().rows.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="!border-none flex items-center cursor-pointer w-fit bg-transparent py-[6px] px-[10px] rounded-[8px] relative group hover:bg-[rgba(255,255,255,.025)] transition-colors ease-in-out duration-200 theme-color dashboard-header-gps !h-fit " variant="outline">
                  <TrashIcon
                    className="-mr-[8px] h-4 w-4 text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff]"
                    size={16}
                    aria-hidden="true"
                  />
                  <span className="text-[14px] font-normal text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff] pl-[6px]">
                  Delete
                  </span>
                  <span className="bg-[#ffffff0a] text-white -me-1 inline-flex h-4 w-4 max-h-full items-center rounded-xl border px-[5px] font-[inherit] text-[0.625rem] font-medium">
                    {table.getSelectedRowModel().rows.length}
                  </span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
                  <div
                    className="flex size-9 shrink-0 items-center justify-center rounded-full border"
                    aria-hidden="true"
                  >
                    <CircleAlertIcon className="opacity-80" size={16} />
                  </div>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete{" "}
                      {table.getSelectedRowModel().rows.length} selected{" "}
                      {table.getSelectedRowModel().rows.length === 1
                        ? "row"
                        : "rows"}
                      .
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteRows}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          {/* Set up a Routine button */}
          <Button className="!border-none flex items-center cursor-pointer w-fit bg-transparent py-[6px] px-[10px] rounded-[8px] relative group hover:bg-[rgba(255,255,255,.025)] transition-colors ease-in-out duration-200 theme-color dashboard-header-gps !h-fit " variant="outline">
            <PlusIcon
              className="-mr-[8px] h-4 w-4 text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff]"
              size={16}
              aria-hidden="true"
            />
            <span className="text-[14px] font-normal text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff] pl-[6px]">
            Set up a routine
            </span>
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[rgba(255,255,255,.025)] overflow-hidden rounded-md border border-zinc-50/10">
        <Table className="table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: `${header.getSize()}px` }}
                      className="h-11"
                    >
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <div
                          className={cn(
                            header.column.getCanSort() &&
                              "flex h-full cursor-pointer items-center justify-between gap-2 select-none"
                          )}
                          onClick={header.column.getToggleSortingHandler()}
                          onKeyDown={(e) => {
                            // Enhanced keyboard handling for sorting
                            if (
                              header.column.getCanSort() &&
                              (e.key === "Enter" || e.key === " ")
                            ) {
                              e.preventDefault()
                              header.column.getToggleSortingHandler()?.(e)
                            }
                          }}
                          tabIndex={header.column.getCanSort() ? 0 : undefined}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: (
                              <ChevronUpIcon
                                className="shrink-0 opacity-60"
                                size={16}
                                aria-hidden="true"
                              />
                            ),
                            desc: (
                              <ChevronDownIcon
                                className="shrink-0 opacity-60"
                                size={16}
                                aria-hidden="true"
                              />
                            ),
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                      )}
                    </TableHead>
                  )
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
                    <TableCell key={cell.id} className="last:py-0">
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
      <div className="flex items-center justify-between gap-8">
        {/* Results per page */}
        <div className="flex items-center gap-3">
          <Label htmlFor={id} className="max-sm:sr-only">
            Rows per page
          </Label>
          <Select
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={(value) => {
              const num = Number(value);
              table.setPageSize(num);
              setCookie('routineTablePageSize', String(num));
            }}
          >
            <SelectTrigger id={id} className="w-fit whitespace-nowrap !py-[6px] !px-[10px]">
              <SelectValue placeholder="Select number of results" />
            </SelectTrigger>
            <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
              {[5, 10, 25, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Page number information */}
        <div className="text-muted-foreground flex grow justify-end text-sm whitespace-nowrap">
          <p
            className="text-muted-foreground text-sm whitespace-nowrap"
            aria-live="polite"
          >
            <span className="text-foreground">
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                1}
              -
              {Math.min(
                Math.max(
                  table.getState().pagination.pageIndex *
                    table.getState().pagination.pageSize +
                    table.getState().pagination.pageSize,
                  0
                ),
                table.getRowCount()
              )}
            </span>{" "}
            of{" "}
            <span className="text-foreground">
              {table.getRowCount().toString()}
            </span>
          </p>
        </div>

        {/* Pagination buttons */}
        <div>
          <Pagination>
            <PaginationContent>
              {/* First page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-40 hover:bg-[#ffffff0f] bg-[#ffffff0a] rounded-[4px] px-[2px] py-[6px] text-[12px] !h-6 !w-6 !border !border-zinc-50/10"
                  onClick={() => table.firstPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Go to first page"
                >
                  <ChevronFirstIcon size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
              {/* Previous page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-40 hover:bg-[#ffffff0f] bg-[#ffffff0a] rounded-[4px] px-[2px] py-[6px] text-[12px] !h-6 !w-6 !border !border-zinc-50/10"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Go to previous page"
                >
                  <ChevronLeftIcon size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
              {/* Next page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-40 hover:bg-[#ffffff0f] bg-[#ffffff0a] rounded-[4px] px-[2px] py-[6px] text-[12px] !h-6 !w-6 !border !border-zinc-50/10"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="Go to next page"
                >
                  <ChevronRightIcon size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
              {/* Last page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-40 hover:bg-[#ffffff0f] bg-[#ffffff0a] rounded-[4px] px-[2px] py-[6px] text-[12px] !h-6 !w-6 !border !border-zinc-50/10"
                  onClick={() => table.lastPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="Go to last page"
                >
                  <ChevronLastIcon size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  )
}

function RowActions({ row }: { row: Row<Item> }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex justify-end">
          <Button
            size="icon"
            variant="ghost"
            className="shadow-none dashboard-menu-button theme-color !h-7 !w-7"
            aria-label="Edit item"
          >
            <EllipsisIcon size={16} aria-hidden="true" />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="text-white">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <span>Edit</span>
            <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Duplicate</span>
            <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <span>Archive</span>
            <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="font-inter">More</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="text-white">
                <DropdownMenuItem>Move to project</DropdownMenuItem>
                <DropdownMenuItem>Move to folder</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Advanced options</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Share</DropdownMenuItem>
          <DropdownMenuItem>Add to favorites</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive">
          <span>Delete</span>
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
