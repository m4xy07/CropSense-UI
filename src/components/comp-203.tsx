import { useId } from "react"

import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function PriceSelect({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const id = useId()
  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}></Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id}>
          <SelectValue placeholder="Price" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any">No Price Limit</SelectItem>
          <SelectItem value="1000">Below ₹1,000</SelectItem>
          <SelectItem value="2000">Below ₹2,000</SelectItem>
          <SelectItem value="3000">Below ₹3,000</SelectItem>
          <SelectItem value="4000">Below ₹4,000</SelectItem>
          <SelectItem value="5000">Below ₹5,000</SelectItem>
          <SelectItem value="10000">Below ₹10,000</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
