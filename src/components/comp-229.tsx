"use client"

import { useId, useState } from "react"
import { CheckIcon, ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const crops = [
  { value: "wheat", label: "Wheat" },
  { value: "rice", label: "Rice" },
  { value: "maize", label: "Maize" },
  { value: "barley", label: "Barley" },
  { value: "soybean", label: "Soybean" },
  { value: "sorghum", label: "Sorghum" },
  { value: "millet", label: "Millet" },
  { value: "oats", label: "Oats" },
  { value: "cotton", label: "Cotton" },
  { value: "sugarcane", label: "Sugarcane" },
  { value: "groundnut", label: "Groundnut" },
  { value: "mustard", label: "Mustard" },
  { value: "sunflower", label: "Sunflower" },
  { value: "potato", label: "Potato" },
  { value: "tomato", label: "Tomato" },
  { value: "onion", label: "Onion" },
  { value: "chickpea", label: "Chickpea" },
  { value: "pea", label: "Pea" },
  { value: "lentil", label: "Lentil" },
  { value: "sugarbeet", label: "Sugarbeet" },
]

export default function SearchDropComponent() {
  const id = useId()
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState<string>("")

  return (
    <div className="*:not-first:mt-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between !px-3 font-normal transition-all duration-300 equipment-input theme-color"
          >
            <span className={cn("truncate", !value && "text-muted-foreground")}>
              {value
                ? crops.find((crop) => crop.value === value)?.label
                : "Select crops"}
            </span>
            <ChevronDownIcon
              size={16}
              className="text-muted-foreground/80 shrink-0"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="font-inter rounded-xl w-full min-w-[var(--radix-popper-anchor-width)] p-0"
          align="start"
        >
          <Command>
            <CommandInput placeholder="Search crops" />
            <CommandList>
              <CommandEmpty>No crops found.</CommandEmpty>
              <CommandGroup>
                {crops.map((crop) => (
                  <CommandItem
                    key={crop.value}
                    value={crop.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                  >
                    {crop.label}
                    {value === crop.value && (
                      <CheckIcon size={16} className="ml-auto" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
