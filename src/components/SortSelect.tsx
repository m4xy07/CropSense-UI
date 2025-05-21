import { useId } from "react"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export type SortOrder = "default" | "price_low" | "price_high" | "name_asc" | "name_desc"

interface SortSelectProps {
  value: SortOrder
  onChange: (value: SortOrder) => void
}

export default function SortSelect({ value, onChange }: SortSelectProps) {
  const id = useId()
  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}></Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id}>
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Sort by</SelectItem>
          <SelectItem value="price_low">Price: Low to High</SelectItem>
          <SelectItem value="price_high">Price: High to Low</SelectItem>
          <SelectItem value="name_asc">Name: A-Z</SelectItem>
          <SelectItem value="name_desc">Name: Z-A</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
