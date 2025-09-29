import { useId } from "react"

import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Generate event dates relative to today
const today = new Date("2025-09-29");
function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result.toISOString().slice(0, 10);
}

const events = [
  {
    id: "1",
    name: "Spring Harvest Workshop",
    date: addDays(today, 2), // 2 days from today
    location: "Punjab",
    organizer: "Bharat Krishi Foundation",
    status: "Open",
  },
  {
    id: "2",
    name: "Organic Farming Seminar",
    date: addDays(today, 10), // 10 days from today
    location: "Bangalore",
    organizer: "Green Roots",
    status: "Open",
  },
  {
    id: "3",
    name: "Dairy Tech Expo",
    date: addDays(today, 20), // 20 days from today
    location: "Ahmedabad",
    organizer: "Amul Research Center",
    status: "Closed",
  },
  {
    id: "4",
    name: "Soil Health Awareness",
    date: addDays(today, 30), // 30 days from today
    location: "Nagpur",
    organizer: "ICAR - Indian Institute of Soil Science",
    status: "Open",
  },
];
  

export default function FarmEventsTable() {
  const id = useId()
  return (
    <div>
      <div className="bg-[rgba(255,255,255,.025)] overflow-hidden rounded-md border border-zinc-50/10">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent ">
              {/* <TableHead className="h-11">
                <Checkbox id={id} />
              </TableHead> */}
              <TableHead className="h-11 !text-[#b2b2b2]">Event</TableHead>
              <TableHead className="h-11 !text-[#b2b2b2]">Date</TableHead>
              <TableHead className="h-11 !text-[#b2b2b2]">Location</TableHead>
              <TableHead className="h-11 !text-[#b2b2b2]">Organizer</TableHead>
              <TableHead className="h-11 text-right !text-[#b2b2b2]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id} className="w-full">
                {/* <TableCell>
                  <Checkbox id={`event-checkbox-${event.id}`} />
                </TableCell> */}
                <TableCell className="font-medium">{event.name}</TableCell>
                <TableCell>{event.date}</TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>{event.organizer}</TableCell>
                <TableCell className="text-right">{event.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          {/* <TableFooter className="bg-transparent">
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={5}>Total Events</TableCell>
              <TableCell className="text-right">{events.length}</TableCell>
            </TableRow>
          </TableFooter> */}
        </Table>
      </div>
      
    </div>
  )
}
