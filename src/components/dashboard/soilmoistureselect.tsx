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
import { Grid2x2Check } from "lucide-react"

export function SelectMoisture({ plot, setPlot }: { plot: string, setPlot: (value: string) => void }) {
  return (
    <Select value={plot} onValueChange={setPlot}>
      <SelectTrigger2 className="w-fit">
            <Grid2x2Check className="h-4 w-4 text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff]" />
                <span className="text-[14px] font-normal text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff] pl-[6px]">
                <SelectValue />
                </span>
        {/* <SelectValue placeholder="Select a crop" /> */}
      </SelectTrigger2>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="Plot 1">Plot 1</SelectItem>
          <SelectItem value="Plot 2">Plot 2</SelectItem>
          <SelectItem value="Plot 3">Plot 3</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
