"use client"

import { FormEvent, useEffect, useId, useRef, useState } from "react"
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
  Table as TanstackTable,
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
  CopyIcon,
  EllipsisIcon,
  PencilIcon,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
  name: string
  image: string // URL to the worker's image
  tasks: string
  location: string
  status: "Active" | "Inactive" | "Pending"
  performance: string
  lastActive: string
}

type WorkerFormState = Omit<Item, "id">

const WORKERS_STORAGE_KEY = "cropsense-workers"
const STATUS_OPTIONS: Item["status"][] = ["Active", "Inactive", "Pending"]

function getEmptyWorkerForm(): WorkerFormState {
  return {
    name: "",
    image: "/avatar1.jpg",
    tasks: "",
    location: "",
    status: "Active",
    performance: "Good",
    lastActive: new Date().toISOString(),
  }
}

function toDateTimeInputValue(value: string): string {
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return ""
  const localDate = new Date(parsed.getTime() - parsed.getTimezoneOffset() * 60000)
  return localDate.toISOString().slice(0, 16)
}

function normalizeWorker(raw: Partial<Item>, index: number): Item {
  const parsed = raw.lastActive ? new Date(raw.lastActive) : new Date()
  const normalizedStatus = STATUS_OPTIONS.includes(raw.status as Item["status"])
    ? (raw.status as Item["status"])
    : "Pending"

  return {
    id: String(raw.id ?? index + 1),
    name: raw.name?.trim() || `Worker ${index + 1}`,
    image: raw.image?.trim() || "/avatar1.jpg",
    tasks: raw.tasks?.trim() || "Not assigned",
    location: raw.location?.trim() || "Unassigned",
    status: normalizedStatus,
    performance: raw.performance?.trim() || "Good",
    lastActive: Number.isNaN(parsed.getTime())
      ? new Date().toISOString()
      : parsed.toISOString(),
  }
}

// Custom filter function for multi-column searching
const multiColumnFilterFn: FilterFn<Item> = (row, columnId, filterValue) => {
  const searchableRowContent =
    `${row.original.name} ${row.original.tasks}`.toLowerCase()
  const searchTerm = (filterValue ?? "").toLowerCase()
  return searchableRowContent.includes(searchTerm)
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
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        {row.original.image && (
        <div className="w-[40px] h-[40px] relative shrink-0 rounded-full overflow-hidden">
          <Image
            src={row.original.image}
            alt={row.original.name}
            sizes="100px"
            fill
            className="object-cover"
          />
          </div>
        )}
        <span className="font-medium">{row.getValue("name")}</span>
      </div>
    ),
    size: 180,
    filterFn: multiColumnFilterFn,
    enableHiding: false,
  },
  {
    header: "Tasks",
    accessorKey: "tasks",
    size: 220,
  },
  {
    header: "Location",
    accessorKey: "location",
    // cell: ({ row }) => (
    //   <div>
    //     <span className="text-lg leading-none">{row.original.flag}</span>{" "}
    //     {row.getValue("location")}
    //   </div>
    // ),
    size: 180,
  },
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
  },
  {
    header: "Performance",
    accessorKey: "performance",
  },
  {
    header: "Last Check-In",
    accessorKey: "lastActive",
    cell: ({ row }) => {
      const value = row.getValue("lastActive")
      if (!value) return null
      const date = new Date(value as string)
      if (isNaN(date.getTime())) return value
      const time = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      const day = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
      return `${time}, ${day}`
    },
    size: 120,
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row, table }) => <RowActions row={row} table={table} />,
    size: 60,
    enableHiding: false,
  },
]

export default function WorkerTable() {
  const id = useId()
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const inputRef = useRef<HTMLInputElement>(null)

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "name",
      desc: false,
    },
  ])

  const [data, setData] = useState<Item[]>([])
  const [hydrated, setHydrated] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingWorkerId, setEditingWorkerId] = useState<string | null>(null)
  const [formState, setFormState] = useState<WorkerFormState>(getEmptyWorkerForm())

  useEffect(() => {
    let mounted = true

    async function fetchWorkers() {
      const stored = localStorage.getItem(WORKERS_STORAGE_KEY)
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          if (Array.isArray(parsed)) {
            if (mounted) {
              setData(parsed.map((worker: Partial<Item>, index: number) => normalizeWorker(worker, index)))
              setHydrated(true)
            }
            return
          }
        } catch {
          // Ignore malformed storage and fallback to seeded data.
        }
      }

      try {
        const res = await fetch("/data/workers.json")
        const fetchedData = await res.json()
        const normalized = Array.isArray(fetchedData)
          ? fetchedData.map((worker: Partial<Item>, index: number) =>
              normalizeWorker(worker, index)
            )
          : []
        if (mounted) {
          setData(normalized)
          setHydrated(true)
        }
      } catch {
        if (mounted) {
          setData([])
          setHydrated(true)
        }
      }
    }

    fetchWorkers()

    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(WORKERS_STORAGE_KEY, JSON.stringify(data))
  }, [data, hydrated])

  const getNextWorkerId = () => {
    const numericIds = data
      .map((worker) => Number(worker.id))
      .filter((value) => Number.isFinite(value))

    return numericIds.length > 0
      ? String(Math.max(...numericIds) + 1)
      : String(Date.now())
  }

  const openAddDialog = () => {
    setEditingWorkerId(null)
    setFormState(getEmptyWorkerForm())
    setIsDialogOpen(true)
  }

  const openEditDialog = (worker: Item) => {
    setEditingWorkerId(worker.id)
    setFormState({
      name: worker.name,
      image: worker.image,
      tasks: worker.tasks,
      location: worker.location,
      status: worker.status,
      performance: worker.performance,
      lastActive: worker.lastActive,
    })
    setIsDialogOpen(true)
  }

  const handleSaveWorker = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const parsedLastActive = new Date(formState.lastActive)
    const payload: WorkerFormState = {
      name: formState.name.trim(),
      image: formState.image.trim() || "/avatar1.jpg",
      tasks: formState.tasks.trim(),
      location: formState.location.trim(),
      status: formState.status,
      performance: formState.performance.trim() || "Good",
      lastActive: Number.isNaN(parsedLastActive.getTime())
        ? new Date().toISOString()
        : parsedLastActive.toISOString(),
    }

    if (!payload.name || !payload.tasks || !payload.location) return

    if (editingWorkerId) {
      setData((prev) =>
        prev.map((worker) =>
          worker.id === editingWorkerId ? { ...worker, ...payload } : worker
        )
      )
    } else {
      setData((prev) => [{ id: getNextWorkerId(), ...payload }, ...prev])
    }

    setIsDialogOpen(false)
  }

  const handleDeleteSingleRow = (workerId: string) => {
    setData((prev) => prev.filter((worker) => worker.id !== workerId))
  }

  const handleDuplicateRow = (worker: Item) => {
    const duplicate: Item = {
      ...worker,
      id: getNextWorkerId(),
      name: `${worker.name} (Copy)`,
      lastActive: new Date().toISOString(),
    }
    setData((prev) => [duplicate, ...prev])
  }

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
    meta: {
      onEditRow: openEditDialog,
      onDeleteRow: handleDeleteSingleRow,
      onDuplicateRow: handleDuplicateRow,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
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

  const statusColumn = table.getColumn("status")
  const uniqueStatusValues = statusColumn
    ? Array.from(statusColumn.getFacetedUniqueValues().keys()).sort()
    : []
  const statusCounts = statusColumn?.getFacetedUniqueValues() ?? new Map()
  const selectedStatuses = (statusColumn?.getFilterValue() as string[]) ?? []

  const handleStatusChange = (checked: boolean, value: string) => {
    const filterValue = statusColumn?.getFilterValue() as string[]
    const newFilterValue = filterValue ? [...filterValue] : []

    if (checked) {
      newFilterValue.push(value)
    } else {
      const index = newFilterValue.indexOf(value)
      if (index > -1) {
        newFilterValue.splice(index, 1)
      }
    }

    statusColumn?.setFilterValue(
      newFilterValue.length ? newFilterValue : undefined
    )
  }

  return (
    <div className="space-y-4 px-5 py-4">
      
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Filter by name or tasks */}
          <div className="relative">
            <Input
              id={`${id}-input`}
              ref={inputRef}
              className={cn(
                "peer min-w-60 ps-9 w-full equipment-input theme-color bg-[rgba(255,255,255,.025)] transition-all  text-white rounded-md !py-2 !px-4 !h-9",
                Boolean(table.getColumn("name")?.getFilterValue()) && "pe-9"
              )}
              value={
                (table.getColumn("name")?.getFilterValue() ?? "") as string
              }
              onChange={(e) =>
                table.getColumn("name")?.setFilterValue(e.target.value)
              }
              placeholder="Filter by name or tasks..."
              type="text"
              aria-label="Filter by name or tasks"
            />
            {/* <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
              <ListFilterIcon size={16} aria-hidden="true" />
            </div> */}
            {Boolean(table.getColumn("name")?.getFilterValue()) && (
              <button
                className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Clear filter"
                onClick={() => {
                  table.getColumn("name")?.setFilterValue("")
                  if (inputRef.current) {
                    inputRef.current.focus()
                  }
                }}
              >
                <CircleXIcon size={16} aria-hidden="true" />
              </button>
            )}
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
          {/* Add user button */}
          <Button
            className="!border-none flex items-center cursor-pointer w-fit bg-transparent py-[6px] px-[10px] rounded-[8px] relative group hover:bg-[rgba(255,255,255,.025)] transition-colors ease-in-out duration-200 theme-color dashboard-header-gps !h-fit "
            variant="outline"
            onClick={openAddDialog}
          >
            <PlusIcon
              className="-mr-[8px] h-4 w-4 text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff]"
              size={16}
              aria-hidden="true"
            />
            <span className="text-[14px] font-normal text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff] pl-[6px]">
            Add worker
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
              table.setPageSize(Number(value))
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="font-inter main-dashboard-theme theme-color border !border-zinc-50/10 text-white">
          <DialogHeader>
            <DialogTitle>{editingWorkerId ? "Edit Worker" : "Add Worker"}</DialogTitle>
            <DialogDescription className="text-[#b2b2b2]">
              Manage worker details and task assignments.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveWorker} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="worker-name">Worker Name</Label>
              <Input
                id="worker-name"
                value={formState.name}
                onChange={(e) =>
                  setFormState((prev) => ({ ...prev, name: e.target.value }))
                }
                className="equipment-input"
                placeholder="Enter worker name"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="worker-tasks">Tasks</Label>
                <Input
                  id="worker-tasks"
                  value={formState.tasks}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, tasks: e.target.value }))
                  }
                  className="equipment-input"
                  placeholder="Watering, Weeding"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="worker-location">Location</Label>
                <Input
                  id="worker-location"
                  value={formState.location}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, location: e.target.value }))
                  }
                  className="equipment-input"
                  placeholder="Plot A"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={formState.status}
                  onValueChange={(value: Item["status"]) =>
                    setFormState((prev) => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="worker-performance">Performance</Label>
                <Input
                  id="worker-performance"
                  value={formState.performance}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, performance: e.target.value }))
                  }
                  className="equipment-input"
                  placeholder="Good"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="worker-last-active">Last Check-In</Label>
                <Input
                  id="worker-last-active"
                  type="datetime-local"
                  value={toDateTimeInputValue(formState.lastActive)}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, lastActive: e.target.value }))
                  }
                  className="equipment-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="worker-image">Avatar Path</Label>
                <Input
                  id="worker-image"
                  value={formState.image}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, image: e.target.value }))
                  }
                  className="equipment-input"
                  placeholder="/avatar1.jpg"
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="equipment-btn">
                {editingWorkerId ? "Save Changes" : "Add Worker"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function RowActions({ row, table }: { row: Row<Item>; table: TanstackTable<Item> }) {
  const tableMeta = table.options.meta as
    | {
        onEditRow?: (worker: Item) => void
        onDeleteRow?: (workerId: string) => void
        onDuplicateRow?: (worker: Item) => void
      }
    | undefined

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
          <DropdownMenuItem onClick={() => tableMeta?.onEditRow?.(row.original)}>
            <PencilIcon className="h-4 w-4 mr-2" />
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => tableMeta?.onDuplicateRow?.(row.original)}>
            <CopyIcon className="h-4 w-4 mr-2" />
            <span>Duplicate</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onClick={() => tableMeta?.onDeleteRow?.(row.original.id)}
        >
          <TrashIcon className="h-4 w-4 mr-2" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
