"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  PanelsTopLeft,
  TrendingUpDown,
  Landmark,
  ShieldCheck,
  Users,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import Image from "next/image"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  
  
  projects: [
    {
      name: "Overview",
      url: "#",
      icon: PanelsTopLeft,
    },
    {
      name: "Predictions",
      url: "#",
      icon: TrendingUpDown,
    },
    {
      name: "Government Schemes",
      url: "#",
      icon: Landmark,
    },
    {
      name: "Disease Detection",
      url: "#",
      icon: ShieldCheck,
    },
    {
      name: "Forums",
      url: "#",
      icon: Users,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar  collapsible="icon" {...props}>
      <SidebarHeader >
        <Image 
          src="/Logo_Rev_1_Transparent.png"
          alt="Logo"
          width={150}
          height={50}
          className="mx-auto py-4"
        />
      </SidebarHeader>
      <SidebarContent >
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
