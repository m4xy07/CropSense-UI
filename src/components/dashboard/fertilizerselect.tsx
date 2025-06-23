import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectTrigger2,
  SelectValue,
} from "@/components/ui/select"
import { FlaskConical } from "lucide-react"

export function SelectFertilizer({ fertilizer, setFertilizer }: { fertilizer: string, setFertilizer: (value: string) => void }) {
  return (
    <Select value={fertilizer} onValueChange={setFertilizer}>
      <SelectTrigger2 className="w-fit">
            <FlaskConical className="h-4 w-4 text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff]" />
                <span className="text-[14px] font-normal text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff] pl-[6px]">
                <SelectValue />
                </span>
        {/* <SelectValue placeholder="Select a fertilizer" /> */}
      </SelectTrigger2>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="NPK 10-10-10">NPK 10-10-10</SelectItem>
          <SelectItem value="NPK 15-15-15">NPK 15-15-15</SelectItem>
          <SelectItem value="NPK 20-20-20">NPK 20-20-20</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
