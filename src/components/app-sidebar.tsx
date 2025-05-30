"use client";

import * as React from "react";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import {
  PanelsTopLeft,
  TrendingUpDown,
  Landmark,
  ShieldCheck,
  Users,
  ClipboardPlus,
  TextSearch,
  Tractor,
  Library,
  CalendarDaysIcon,
} from "lucide-react";

import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();
  const pathname = usePathname();

  const data = {
    user: {
      name: user?.fullName || "Guest",
      email: user?.primaryEmailAddress?.emailAddress || "guest@example.com",
      avatar: user?.imageUrl || "/avatars/default.jpg",
    },
    projects: [
      {
        name: "Overview",
        url: "/dashboard",
        icon: PanelsTopLeft,
      },
      {
        name: "Predictions",
        url: "/dashboard/predictions",
        icon: TrendingUpDown,
      },
      {
        name: "Data Insights",
        url: "/dashboard/insights",
        icon: TextSearch,
      },
      {
        name: "Government Schemes",
        url: "/dashboard/schemes",
        icon: Landmark,
      },
      {
        name: "Disease Detection",
        url: "/dashboard/disease-detection",
        icon: ShieldCheck,
      },
      {
        name: "Forums",
        url: "/dashboard/forums",
        icon: Users,
      },
      {
        name: "Soil Report",
        url: "/dashboard/soil-report",
        icon: ClipboardPlus,
      },
      {
        name: "Equipment",
        url: "/dashboard/equipment",
        icon: Tractor,
      },
      {
        name: "Guides",
        url: "/dashboard/guides",
        icon: Library,
      },
       {
         name: "Workers",
         url: "/dashboard/workers",
         icon: Users,
       },
    ].map((project) => ({
      ...project,
      active: pathname === project.url || (project.url !== "/dashboard" && pathname.startsWith(project.url + "/")),
    })),
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
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
