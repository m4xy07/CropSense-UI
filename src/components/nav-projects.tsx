"use client";

import { type LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import Link from "next/link";

type Section = {
  heading: string;
  items: {
    name: string;
    url: string;
    icon: LucideIcon;
    active: boolean;
  }[];
};

export function NavProjects({ sections }: { sections: Section[] }) {
  return (
    <div className="space-y-0  group-data-[collapsible=icon]:hidden ">
      {sections.map((section, idx) => (
        <SidebarGroup
          key={section.heading}
          isLast={idx === sections.length - 1}
        >
          <div className="text-[12px] uppercase tracking-[0.1px]  text-white/80 px-4 pt-5 pb-2 font-normal font-inter">
            {section.heading}
          </div>
          <SidebarMenu>
            {section.items.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild>
                  <Link
                    href={item.url}
                    className={`flex items-center gap-2 !px-4 !py-0 transition-all duration-200 ease-in-out rounded-md ${
                      item.active
                        ? "bg-[rgba(255,255,255,.05)] text-primary"
                        : "hover:bg-[rgba(255,255,255,0.05)] hover:text-white"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </div>
  );
}
