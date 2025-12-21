"use client"

import React from "react"
import { LayoutDashboard, Activity, Radio, PieChart, Calendar } from "lucide-react"

import { Dock, DockIcon } from "./docksource"

export type IconProps = React.HTMLAttributes<SVGElement>

export function DockDemo({ currentSlide, onSlideChange }: { currentSlide?: number, onSlideChange?: (index: number) => void }) {
  return (
    <div className="relative">
      <Dock direction="middle">
        <DockIcon onClick={() => onSlideChange?.(0)}>
          <LayoutDashboard className="size-6" />
        </DockIcon>
        <DockIcon onClick={() => onSlideChange?.(1)}>
          <Activity className="size-6" />
        </DockIcon>
        <DockIcon onClick={() => onSlideChange?.(2)}>
          <Radio className="size-6" />
        </DockIcon>
        <DockIcon onClick={() => onSlideChange?.(3)}>
          <PieChart className="size-6" />
        </DockIcon>
        <DockIcon onClick={() => onSlideChange?.(4)}>
          <Calendar className="size-6" />
        </DockIcon>
      </Dock>
    </div>
  )
}
