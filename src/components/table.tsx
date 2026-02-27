"use client"

import { FormEvent, useEffect, useMemo, useState } from "react"
import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

type EventStatus = "Open" | "Closed"

type FarmEvent = {
  id: string
  name: string
  date: string
  location: string
  organizer: string
  status: EventStatus
}

type EventFormState = Omit<FarmEvent, "id">

const EVENTS_STORAGE_KEY = "cropsense-upcoming-events"
const EVENT_STATUSES: EventStatus[] = ["Open", "Closed"]

function addDays(days: number): string {
  const result = new Date()
  result.setDate(result.getDate() + days)
  return result.toISOString().slice(0, 10)
}

function getDefaultEvents(): FarmEvent[] {
  return [
    {
      id: "1",
      name: "Spring Harvest Workshop",
      date: addDays(2),
      location: "Punjab",
      organizer: "Bharat Krishi Foundation",
      status: "Open",
    },
    {
      id: "2",
      name: "Organic Farming Seminar",
      date: addDays(10),
      location: "Bangalore",
      organizer: "Green Roots",
      status: "Open",
    },
    {
      id: "3",
      name: "Dairy Tech Expo",
      date: addDays(20),
      location: "Ahmedabad",
      organizer: "Amul Research Center",
      status: "Closed",
    },
    {
      id: "4",
      name: "Soil Health Awareness",
      date: addDays(30),
      location: "Nagpur",
      organizer: "ICAR - Indian Institute of Soil Science",
      status: "Open",
    },
  ]
}

function getEmptyEventForm(): EventFormState {
  return {
    name: "",
    date: addDays(1),
    location: "",
    organizer: "",
    status: "Open",
  }
}

function normalizeEvent(raw: Partial<FarmEvent>, index: number): FarmEvent {
  const parsedDate = raw.date ? new Date(raw.date) : new Date(addDays(index + 1))
  const normalizedDate = Number.isNaN(parsedDate.getTime())
    ? addDays(index + 1)
    : parsedDate.toISOString().slice(0, 10)

  const status = EVENT_STATUSES.includes(raw.status as EventStatus)
    ? (raw.status as EventStatus)
    : "Open"

  return {
    id: String(raw.id ?? index + 1),
    name: raw.name?.trim() || `Event ${index + 1}`,
    date: normalizedDate,
    location: raw.location?.trim() || "TBD",
    organizer: raw.organizer?.trim() || "TBD",
    status,
  }
}

export default function FarmEventsTable() {
  const [events, setEvents] = useState<FarmEvent[]>([])
  const [hydrated, setHydrated] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingEventId, setEditingEventId] = useState<string | null>(null)
  const [formState, setFormState] = useState<EventFormState>(getEmptyEventForm())

  useEffect(() => {
    const stored = localStorage.getItem(EVENTS_STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          setEvents(parsed.map((event: Partial<FarmEvent>, index: number) => normalizeEvent(event, index)))
          setHydrated(true)
          return
        }
      } catch {
        // If localStorage value is corrupted, fallback to defaults.
      }
    }

    setEvents(getDefaultEvents())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events))
  }, [events, hydrated])

  const sortedEvents = useMemo(
    () => [...events].sort((a, b) => a.date.localeCompare(b.date)),
    [events]
  )

  const openAddDialog = () => {
    setEditingEventId(null)
    setFormState(getEmptyEventForm())
    setIsDialogOpen(true)
  }

  const openEditDialog = (event: FarmEvent) => {
    setEditingEventId(event.id)
    setFormState({
      name: event.name,
      date: event.date,
      location: event.location,
      organizer: event.organizer,
      status: event.status,
    })
    setIsDialogOpen(true)
  }

  const getNextEventId = () => {
    const numericIds = events
      .map((event) => Number(event.id))
      .filter((value) => Number.isFinite(value))

    return numericIds.length > 0
      ? String(Math.max(...numericIds) + 1)
      : String(Date.now())
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const payload: EventFormState = {
      name: formState.name.trim(),
      date: formState.date,
      location: formState.location.trim(),
      organizer: formState.organizer.trim(),
      status: formState.status,
    }

    if (!payload.name || !payload.date || !payload.location || !payload.organizer) {
      return
    }

    if (editingEventId) {
      setEvents((prev) =>
        prev.map((row) => (row.id === editingEventId ? { ...row, ...payload } : row))
      )
    } else {
      setEvents((prev) => [{ id: getNextEventId(), ...payload }, ...prev])
    }

    setIsDialogOpen(false)
  }

  const handleDelete = (id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id))
  }

  return (
    <div>
      <div className="mb-3 flex justify-end">
        <Button
          className="!border-none flex items-center cursor-pointer w-fit bg-transparent py-[6px] px-[10px] rounded-[8px] relative group hover:bg-[rgba(255,255,255,.025)] transition-colors ease-in-out duration-200 theme-color dashboard-header-gps !h-fit"
          variant="outline"
          onClick={openAddDialog}
        >
          <PlusIcon className="-mr-[8px] h-4 w-4 text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff]" />
          <span className="text-[14px] font-normal text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff] pl-[6px]">
            Add Event
          </span>
        </Button>
      </div>
      <div className="bg-[rgba(255,255,255,.025)] overflow-hidden rounded-md border border-zinc-50/10">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="h-11 !text-[#b2b2b2]">Event</TableHead>
              <TableHead className="h-11 !text-[#b2b2b2]">Date</TableHead>
              <TableHead className="h-11 !text-[#b2b2b2]">Location</TableHead>
              <TableHead className="h-11 !text-[#b2b2b2]">Organizer</TableHead>
              <TableHead className="h-11 !text-[#b2b2b2]">Status</TableHead>
              <TableHead className="h-11 text-right !text-[#b2b2b2]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedEvents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-20 text-center text-[#b2b2b2]">
                  No upcoming events. Add one to get started.
                </TableCell>
              </TableRow>
            ) : (
              sortedEvents.map((event) => (
                <TableRow key={event.id} className="w-full">
                  <TableCell className="font-medium">{event.name}</TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>{event.organizer}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        event.status === "Closed"
                          ? "bg-red-500/20 text-red-200 border border-red-500/30"
                          : "bg-green-500/20 text-green-200 border border-green-500/30"
                      }
                    >
                      {event.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex items-center gap-2">
                      <Button
                        variant="outline"
                        className="h-8 px-2 dashboard-header-gps"
                        onClick={() => openEditDialog(event)}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        className="h-8 px-2 dashboard-header-gps"
                        onClick={() => handleDelete(event.id)}
                      >
                        <TrashIcon className="h-4 w-4 text-red-300" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="font-inter main-dashboard-theme theme-color border !border-zinc-50/10 text-white">
          <DialogHeader>
            <DialogTitle>{editingEventId ? "Edit Event" : "Add Event"}</DialogTitle>
            <DialogDescription className="text-[#b2b2b2]">
              Update the upcoming event details.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="event-name">Event Name</Label>
              <Input
                id="event-name"
                value={formState.name}
                onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
                className="equipment-input"
                placeholder="Enter event name"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="event-date">Date</Label>
                <Input
                  id="event-date"
                  type="date"
                  value={formState.date}
                  onChange={(event) => setFormState((prev) => ({ ...prev, date: event.target.value }))}
                  className="equipment-input"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={formState.status}
                  onValueChange={(value: EventStatus) =>
                    setFormState((prev) => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {EVENT_STATUSES.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="event-location">Location</Label>
                <Input
                  id="event-location"
                  value={formState.location}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, location: event.target.value }))
                  }
                  className="equipment-input"
                  placeholder="Enter location"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-organizer">Organizer</Label>
                <Input
                  id="event-organizer"
                  value={formState.organizer}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, organizer: event.target.value }))
                  }
                  className="equipment-input"
                  placeholder="Enter organizer"
                  required
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="equipment-btn">
                {editingEventId ? "Save Changes" : "Add Event"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
