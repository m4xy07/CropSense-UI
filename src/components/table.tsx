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

const events = [
    {
      id: "1",
      name: "Spring Harvest Workshop",
      date: "2025-04-15",
      location: "Iowa, US",
      organizer: "AgriGrow Co.",
      status: "Open",
    },
    {
      id: "2",
      name: "Organic Farming Seminar",
      date: "2025-05-10",
      location: "Bangalore, India",
      organizer: "Green Roots",
      status: "Open",
    },
    {
      id: "3",
      name: "Dairy Tech Expo",
      date: "2025-06-01",
      location: "Auckland, NZ",
      organizer: "MilkTech Ltd.",
      status: "Closed",
    },
    {
      id: "4",
      name: "Soil Health Awareness Camp",
      date: "2025-04-22",
      location: "Nairobi, Kenya",
      organizer: "FarmBetter",
      status: "Open",
    },
    {
      id: "5",
      name: "Smart Irrigation Summit",
      date: "2025-07-05",
      location: "Perth, AU",
      organizer: "AquaSmart",
      status: "Upcoming",
    },
    {
      id: "6",
      name: "Agri Business Meetup",
      date: "2025-04-28",
      location: "Toronto, Canada",
      organizer: "HarvestPro",
      status: "Open",
    },
    {
      id: "7",
      name: "Pest Control Best Practices",
      date: "2025-05-12",
      location: "Accra, Ghana",
      organizer: "CropSafe",
      status: "Upcoming",
    },
    {
      id: "8",
      name: "Greenhouse Farming Bootcamp",
      date: "2025-06-15",
      location: "Amsterdam, NL",
      organizer: "UrbanAgriTech",
      status: "Open",
    },
    {
      id: "9",
      name: "Livestock Management Training",
      date: "2025-05-25",
      location: "Texas, US",
      organizer: "RanchRight",
      status: "Open",
    },
    
  ]
  

export default function FarmEventsTable() {
  const id = useId()
  return (
    <div>
      <div className="bg-[rgba(255,255,255,.025)] overflow-hidden rounded-md border border-zinc-50/10">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="h-11">
                <Checkbox id={id} />
              </TableHead>
              <TableHead className="h-11">Event</TableHead>
              <TableHead className="h-11">Date</TableHead>
              <TableHead className="h-11">Location</TableHead>
              <TableHead className="h-11">Organizer</TableHead>
              <TableHead className="h-11 text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell>
                  <Checkbox id={`event-checkbox-${event.id}`} />
                </TableCell>
                <TableCell className="font-medium">{event.name}</TableCell>
                <TableCell>{event.date}</TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>{event.organizer}</TableCell>
                <TableCell className="text-right">{event.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className="bg-transparent">
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={5}>Total Events</TableCell>
              <TableCell className="text-right">{events.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      
    </div>
  )
}
