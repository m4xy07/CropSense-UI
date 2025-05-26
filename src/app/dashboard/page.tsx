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
import { ThermometerSun, Sprout, Droplets, Droplet, Leaf } from 'lucide-react';
import {
  RiArrowDownLine,
  RiArrowUpLine,
  RiCheckboxCircleFill,
} from '@remixicon/react';


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
            <div className="flex flex-row gap-2 items-center">
              <div className="relative hover:bg-[rgba(255,255,255,0.025)] group p-[6px] rounded-md flex flex-row items-center cursor-pointer transition-all duration-200 ease-in-out">
              <div className="h-[10px] w-[10px] rounded-full bg-[#f4af29] alert-animation absolute top-0 right-0" />
              <Bell className="w-[18px] h-[18px] text-[rgba(255,255,255,.75)] group-hover:text-[#fff] transition-all duration-200 ease-in-out"/>
              </div>
              
              <Separator orientation="vertical" className="mx-2 h-4" />
              <NavUser user={data.user} />
            </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex flex-row gap-[1.2rem]">
            {/* Temperature Today Card */}
            <div className="flex flex-row justify-between w-[308px] px-5 py-4 rounded-xl equipment-card-inner border border-zinc-50/10 group relative">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" aria-hidden="true" className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-500 duration-200 ease-in-out">
                <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"></path>
              </svg>
              <div className="flex flex-col gap-2 ">
                <ThermometerSun className="size-6"/>
                <h2 className="text-[18px] font-light text-white">Temperature</h2>
                <div className="flex flex-row gap-1 items-start pt-2">
                  <p className="text-[30px] !leading-10 !font-medium pricing-card-btn-amount">24</p>
                  <p className="!text-[22px] text-white/70">°C</p>
                </div>
                <p className="text-[16px] font-light text-white/80 ">
                  <span className="font-normal text-[14px]"><span className="text-yellow-300">H: 29°C</span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-300">L: 20°C</span></span>
                </p>
                <p className="text-[15px] font-normal mt-2 text-white">
                  Maintain this temperature for optimal crop growth.
                </p>
              </div>
            </div>

            {/* Temperature Today Card */}
            <div className="flex flex-row justify-between w-[308px] px-5 py-4 rounded-xl equipment-card-inner border border-zinc-50/10 group relative">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" aria-hidden="true" className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-500 duration-200 ease-in-out">
                <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"></path>
              </svg>
              <div className="flex flex-col gap-2 ">
                <Sprout className="size-6"/>
                <h2 className="text-[18px] font-light text-white">Soil Moisture</h2>
                <div className="flex flex-row gap-1 items-start pt-2">
                  <p className="text-[30px] !leading-10 !font-medium pricing-card-btn-amount">65</p>
                  <p className="!text-[22px] text-white/70">%</p>
                </div>
                <div className="flex flex-row text-[16px] font-light text-white/80 ">
                  <span className="inline-flex items-center gap-x-1 text-[14px] font-semibold text-red-500">
                    <RiArrowDownLine className="size-4 -mr-1" aria-hidden={true} />
                    8%&nbsp;
                  </span>
                  <p className="font-normal text-[14px]">below optimal level</p>
                </div>
                <p className="text-[15px] font-normal mt-2 text-white">
                  Provide more water to maintain optimal soil moisture levels.
                </p>
              </div>
            </div>

            {/* Temperature Today Card */}
            <div className="flex flex-row justify-between w-[308px] px-5 py-4 rounded-xl equipment-card-inner border border-zinc-50/10 group relative">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" aria-hidden="true" className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-500 duration-200 ease-in-out">
                <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"></path>
              </svg>
              <div className="flex flex-col gap-2 ">
                <Droplets className="size-6"/>
                <h2 className="text-[18px] font-light text-white">pH Level</h2>
                <div className="flex flex-row gap-1 items-start pt-2">
                  <p className="text-[30px] !leading-10 !font-medium pricing-card-btn-amount">7.6</p>
                  
                </div>
                <div className="flex flex-row text-[16px] font-light text-white/80 ">
                  <span className="inline-flex items-center gap-x-1 text-[14px] font-semibold text-orange-300">
                    <RiArrowDownLine className="size-4 -mr-1" aria-hidden={true} />
                    0.3&nbsp;
                  </span>
                  <p className="font-normal text-[14px]">below optimal level</p>
                </div>
                <p className="text-[15px] font-normal mt-2 text-white">
                  Add acidic compost to balance pH levels.
                </p>
              </div>
            </div>

            {/* Temperature Today Card */}
            <div className="flex flex-row justify-between w-[308px] px-5 py-4 rounded-xl equipment-card-inner border border-zinc-50/10 group relative">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" aria-hidden="true" className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-500 duration-200 ease-in-out">
                <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"></path>
              </svg>
              <div className="flex flex-col gap-2 ">
                <Droplet className="size-6"/>
                <h2 className="text-[18px] font-light text-white">Humidity</h2>
                <div className="flex flex-row gap-1 items-start pt-2">
                  <p className="text-[30px] !leading-10 !font-medium pricing-card-btn-amount">82</p>
                  <p className="!text-[22px] text-white/70">%</p>
                </div>
                <div className="flex flex-row text-[16px] font-light text-white/80 ">
                  <span className="inline-flex items-center gap-x-1 text-[14px] font-semibold text-red-500">
                    <RiArrowUpLine className="size-4 -mr-1" aria-hidden={true} />
                    12%&nbsp;
                  </span>
                  <p className="font-normal text-[14px]">above optimal level</p>
                </div>
                <p className="text-[15px] font-normal mt-2 text-white">
                  Ensure ventilation is sufficient to prevent mold growth.
                </p>
              </div>
            </div>

            {/* Temperature Today Card */}
            <div className="flex flex-row justify-between w-[308px] px-5 py-4 rounded-xl equipment-card-inner border border-zinc-50/10 group relative">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" aria-hidden="true" className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-500 duration-200 ease-in-out">
                <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"></path>
              </svg>
              <div className="flex flex-col gap-2 ">
                <Leaf className="size-6"/>
                <h2 className="text-[18px] font-light text-white">Plant Health</h2>
                <div className="flex flex-row gap-1 items-start pt-2">
                  <p className="text-[30px] !leading-10 !font-medium pricing-card-btn-amount">93</p>
                  <p className="!text-[22px] text-white/70">%</p>
                </div>
                <div className="flex flex-row text-[16px] font-light text-white/80 ">
                  <span className="inline-flex items-center text-[14px] font-semibold text-red-500">
                    <RiCheckboxCircleFill
                      className="-ml-0.5 size-4 shrink-0 text-green-600"
                      aria-hidden={true}
                    />
                    &nbsp;
                  </span>
                  <p className="font-normal text-[14px] text-green-600">Within optimal level!</p>
                </div>
                <p className="text-[15px] font-normal mt-2 text-white">
                  Your crops are thriving, and are showing excellent health.
                </p>
              </div>
            </div>

            {/* Forum Mentions Card
            <div className="flex flex-row justify-between w-1/2 p-8 rounded-xl equipment-card-inner border border-zinc-50/10">
              <div className="flex flex-col gap-2">
                <h2 className="text-[18px] font-normal">Forum Mentions (1 mention)</h2>
                <Alertdemo />
              </div>
              <div className="flex items-center justify-center p-2 h-fit rounded-md bg-violet-500 w-fit">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div> */}

          </div>

          <div className="flex flex-row gap-4">
            <div className="flex flex-col w-1/3 gap-4">
              <div className="flex flex-col gap-4 justify-between rounded-xl equipment-card-inner border border-zinc-50/10 h-fit">
              <div className="flex flex-row justify-between px-5 py-4 border-b border-b-zinc-50/10 rounded-t-xl">
                <h2 className="text-[18px] font-normal ">
                  Recent Activity
                </h2>
                {/* <div className="flex items-center justify-center p-2 h-fit rounded-md bg-red-500 w-fit">
                  <Bell className="w-6 h-6 text-white" />
                </div> */}
              </div>
              <div className="flex flex-col p-5 pt-0 gap-4">
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
              {/* <div className="flex items-center justify-center p-2 h-fit rounded-md bg-blue-600 w-fit">
                <CalendarCheck2 className="w-6 h-6 text-white" />
              </div> */}
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
