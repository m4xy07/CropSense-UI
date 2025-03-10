"use client"

import * as React from "react"
import { useUser } from "@clerk/nextjs"
import {
  PanelsTopLeft,
  TrendingUpDown,
  Landmark,
  ShieldCheck,
  Users,
} from "lucide-react"

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
import Link from "next/link"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();

  const data = {
    user: {
      name: user?.fullName || "Guest",
      email: user?.primaryEmailAddress?.emailAddress || "guest@example.com",
      avatar: user?.imageUrl || "/avatars/default.jpg", // Corrected property for profile image URL
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
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link href="/">
        <Image 
          src="/Logo_Rev_1_Transparent.png"
          alt="Logo"
          width={150}
          height={50}
          className="mx-auto py-4"
        />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
