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
import { Wheat } from "lucide-react"

export function SelectCrop({ crop, setCrop }: { crop: string, setCrop: (value: string) => void }) {
  return (
    <Select value={crop} onValueChange={setCrop}>
      <SelectTrigger2 className="w-fit">
            <Wheat className="h-4 w-4 text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff]" />
                <span className="text-[14px] font-normal text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff] pl-[6px]">
                <SelectValue />
                </span>
        {/* <SelectValue placeholder="Select a crop" /> */}
      </SelectTrigger2>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="Wheat">Wheat</SelectItem>
          <SelectItem value="Rice">Rice</SelectItem>
          <SelectItem value="Corn">Corn</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
