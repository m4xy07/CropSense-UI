import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectTime({ timeFrame, setTimeFrame }: { timeFrame: string, setTimeFrame: (value: string) => void }) {
  return (
    <Select value={timeFrame} onValueChange={setTimeFrame}>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Select a time frame" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="24 hours">24 hours</SelectItem>
          <SelectItem value="7 days">7 days</SelectItem>
          <SelectItem value="14 days">14 days</SelectItem>
          <SelectItem value="1 month">1 month</SelectItem>
          <SelectItem value="lifetime">Lifetime</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
