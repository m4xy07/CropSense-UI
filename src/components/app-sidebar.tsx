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
  sections: [
    {
      heading: "Farm Dashboard",
      items: [
        { name: "Overview", url: "/dashboard", icon: PanelsTopLeft },
        { name: "Data Insights", url: "/dashboard/insights", icon: TextSearch },
        { name: "Predictions", url: "/dashboard/predictions", icon: TrendingUpDown },
      ],
    },
    {
      heading: "Farm Health",
      items: [
        { name: "Soil Report", url: "/dashboard/soil-report", icon: ClipboardPlus },
        { name: "Disease Detection", url: "/dashboard/disease-detection", icon: ShieldCheck },
      ],
    },
    {
      heading: "Tools and Operations",
      items: [
        { name: "Equipment", url: "/dashboard/equipment", icon: Tractor },
        { name: "Workers", url: "/dashboard/workers", icon: Users },
      ],
    },
    {
      heading: "Knowledge and Support",
      items: [
        { name: "Guides", url: "/dashboard/guides", icon: Library },
        { name: "Forums", url: "/dashboard/forums", icon: Users },
        { name: "Government Schemes", url: "/dashboard/schemes", icon: Landmark },
      ],
    },
  ].map(section => ({
    ...section,
    items: section.items.map(item => ({
      ...item,
      active: pathname === item.url || (item.url !== "/dashboard" && pathname.startsWith(item.url + "/")),
    })),
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
            className="mx-auto "
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavProjects sections={data.sections} />
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
