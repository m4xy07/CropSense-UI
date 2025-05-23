"use client";

import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { Sun, IndianRupee, Users, Bell, CalendarCheck2 } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SelectTime } from "@/components/select";
import { StackedChartExpandedComponent } from "@/components/dashboard/stackedexpanded";
import Image from "next/image";
import Alertdemo from "@/components/animatedalert";
import { NumberTicker } from "@/components/magicui/number-ticker";
import Notif1 from "@/components/notif1";
import Notif2 from "@/components/notif2";
import Notif3 from "@/components/notif3";
import Notif4 from "@/components/notif4";
import Notif5 from "@/components/notif5";
import FarmEventsTable from "@/components/table";
import { NavUser } from "@/components/nav-user";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const API_URL = "https://data.cropsense.tech/data";

export default function Page() {

  const { user } = useUser();
  const pathname = usePathname();

  const data = {
    user: {
      name: user?.fullName || "Guest",
      email: user?.primaryEmailAddress?.emailAddress || "guest@example.com",
      avatar: user?.imageUrl || "/avatars/default.jpg",
    },
    
  };
  
  return (
    <SidebarProvider className="dark main-dashboard-theme theme-color font-inter">
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 text-white theme-color main-topbar-theme">
          <div className="flex justify-between w-full pr-4">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-white">Overview</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex flex-row gap-2">
                <NavUser user={data.user} />
            </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex flex-row gap-4">
            {/* Weather Today Card */}
            <div className="flex flex-row justify-between w-1/4 p-8 rounded-xl equipment-card-inner border border-zinc-50/10">
              <div className="flex flex-col gap-2">
                <h2 className="text-[18px] font-normal">Weather Today</h2>
                <p className="text-[28px] font-semibold">Clear & Sunny</p>
                <p className="text-[16px] font-light text-white/80">
                  Feels like <span className="text-yellow-300 font-normal">24 °C</span>
                </p>
              </div>
              <div className="flex items-center justify-center p-2 h-fit rounded-md bg-yellow-400/70 w-fit">
                <Sun className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Total Predicted Revenue Card */}
            <div className="flex flex-row justify-between w-1/4 p-8 rounded-xl equipment-card-inner border border-zinc-50/10">
              <div className="flex flex-col gap-2">
                <h2 className="text-[18px] font-normal">Total Predicted Revenue</h2>
                <div className="text-[28px] font-semibold">
                  ₹{" "}
                  <NumberTicker
                    value={74390}
                    className="whitespace-pre-wrap text-[28px] font-semibold tracking-tighter"
                  />
                </div>
                <p className="text-[16px] font-light text-white/80">
                  <span className="text-green-400 font-normal">+23%</span> from last month
                </p>
              </div>
              <div className="flex items-center justify-center p-2 h-fit rounded-md bg-green-400/70 w-fit">
                <IndianRupee className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Forum Mentions Card */}
            <div className="flex flex-row justify-between w-1/2 p-8 rounded-xl equipment-card-inner border border-zinc-50/10">
              <div className="flex flex-col gap-2">
                <h2 className="text-[18px] font-normal">Forum Mentions (1 mention)</h2>
                <Alertdemo />
              </div>
              <div className="flex items-center justify-center p-2 h-fit rounded-md bg-violet-500 w-fit">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-4">
            <div className="flex flex-col w-1/3 gap-4">
              <div className="flex flex-col gap-4 justify-between p-8 rounded-xl equipment-card-inner border border-zinc-50/10 h-full">
              <div className="flex flex-row justify-between">
              <h2 className="text-[18px] font-normal">
                Notifications (5 new)
              </h2>
              <div className="flex items-center justify-center p-2 h-fit rounded-md bg-red-500 w-fit">
                <Bell className="w-6 h-6 text-white" />
              </div>
              </div>
              <div className="flex flex-col gap-4">
                <Notif1 />
                <Notif2 />
                <Notif3 />
                <Notif4 />
                <Notif5 />
                
              </div>
                
              </div>
            </div>
            <div className="flex flex-col w-2/3 gap-4 p-8 rounded-xl border-zinc-50/10 border equipment-card-inner">
            <div className="flex flex-col gap-4 ">
            <div className="flex flex-row justify-between">
              <h2 className="text-[18px] font-normal">
                Upcoming Events (9 scheduled)
              </h2>
              <div className="flex items-center justify-center p-2 h-fit rounded-md bg-blue-600 w-fit">
                <CalendarCheck2 className="w-6 h-6 text-white" />
              </div>
              </div>
            <FarmEventsTable />
            </div>
            
            </div>
          </div>

        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
