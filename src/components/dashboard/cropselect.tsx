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
        <div className="flex items-center cursor-pointer w-fit bg-transparent py-[6px] px-[10px] rounded-[8px] relative group hover:bg-[rgba(255,255,255,.025)] transition-colors ease-in-out duration-200 theme-color dashboard-header-gps">
            <Wheat className="h-4 w-4 text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff]" />
                <span className="text-[14px] font-normal text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff] pl-[6px]">
                <SelectValue />
                </span>
        </div>
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
