"use client";

import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { Sun, IndianRupee, Users, Bell, CalendarCheck2, CircleAlert, Check, CircleCheckIcon, ListChecks, ListCheck, Wheat, ArrowRight, CloudRainWind, MapPin } from "lucide-react";
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
import { ThermometerSun, Sprout, Droplets, Droplet, Leaf, Download } from 'lucide-react';
import {
  RiArrowDownLine,
  RiArrowUpLine,
  RiCheckboxCircleFill,
} from '@remixicon/react';
import StatusTracker from "@/components/dashboard/statuscheck";


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
                <Bell className="w-[18px] h-[18px] text-[rgba(255,255,255,.75)] group-hover:text-[#fff] transition-all duration-200 ease-in-out" />
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
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="white"
                aria-hidden="true"
                className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-500 duration-200 ease-in-out"
              >
                <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"></path>
              </svg>
              <div className="flex flex-col gap-2 ">
                <ThermometerSun className="size-6" />
                <h2 className="text-[18px] font-light text-white">Temperature</h2>
                <div className="flex flex-row gap-1 items-start pt-2">
                  <p className="text-[30px] !leading-10 !font-medium pricing-card-btn-amount">24</p>
                  <p className="!text-[22px] text-white/70">°C</p>
                </div>
                <p className="text-[16px] font-light text-white/80 ">
                  <span className="font-normal text-[14px]">
                    <span className="text-yellow-300">H: 29°C</span>&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="text-blue-300">L: 20°C</span>
                  </span>
                </p>
                <p className="text-[15px] font-normal mt-2 text-white">
                  Maintain this temperature for optimal crop growth.
                </p>
              </div>
            </div>

            {/* Temperature Today Card */}
            <div className="flex flex-row justify-between w-[308px] px-5 py-4 rounded-xl equipment-card-inner border border-zinc-50/10 group relative">
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="white"
                aria-hidden="true"
                className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-500 duration-200 ease-in-out"
              >
                <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"></path>
              </svg>
              <div className="flex flex-col gap-2 ">
                <Sprout className="size-6" />
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
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="white"
                aria-hidden="true"
                className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-500 duration-200 ease-in-out"
              >
                <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"></path>
              </svg>
              <div className="flex flex-col gap-2 ">
                <Droplets className="size-6" />
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
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="white"
                aria-hidden="true"
                className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-500 duration-200 ease-in-out"
              >
                <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"></path>
              </svg>
              <div className="flex flex-col gap-2 ">
                <Droplet className="size-6" />
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
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="white"
                aria-hidden="true"
                className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-500 duration-200 ease-in-out"
              >
                <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"></path>
              </svg>
              <div className="flex flex-col gap-2 ">
                <Leaf className="size-6" />
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

          </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col w-[635px] gap-4">
                <div className="flex flex-col gap-4 justify-between rounded-xl equipment-card-inner border border-zinc-50/10 h-fit">
                  <div className="flex flex-row justify-between px-5 py-4 border-b border-b-zinc-50/10 rounded-t-xl">
                    <h2 className="text-[18px] font-normal mt-1">
                    Recent Activity
                    </h2>
                    <div className="flex items-center cursor-pointer w-fit bg-transparent py-[6px] px-[10px] rounded-[8px] relative group hover:bg-[rgba(255,255,255,.025)] transition-colors ease-in-out duration-200 theme-color dashboard-header-gps">
                    <Download className="h-4 w-4 text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff]"/>
                    <span className="text-[14px] font-normal text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff] pl-[6px]">Export</span>
                  </div>
                  </div>
                  <div className="flex flex-col p-5 pt-0 gap-4">
                    <div className="bg-transparent flex flex-row gap-4">
                      <div className="bg-green-500/75 rounded-full p-[8px] h-fit w-fit flex items-start mb-3">
                        <Wheat
                            className=" inline-flex text-white size-4"
                            
                            aria-hidden="true"
                        />
                      </div>
                      <div className="border-b border-zinc-50/10 w-full mt-1 pb-3 flex flex-row justify-between">
                          <p className="text-white text-[14px]">
                            <span className="text-[#9CA3AF]">Reached</span> 95% <span className="text-[#9CA3AF]">of projected yields for</span> rice <span className="text-[#9CA3AF]">this season</span>
                          </p>
                          <p className="text-[#c0c4cc] font-normal text-[13px] tracking-tighter">May 24, 2025</p>
                      </div>
                    </div>
                    
                    <div className="bg-transparent flex flex-row gap-4">
                      <div className="bg-[rgba(255,86,86,.75)] rounded-full p-[8px] h-fit w-fit flex items-start mb-3">
                        <CircleAlert
                            className=" inline-flex text-white size-4"
                            
                            aria-hidden="true"
                        />
                      </div>
                      <div className="border-b border-zinc-50/10 w-full mt-1 pb-3 flex flex-row justify-between">
                          <p className="text-white text-[14px]">
                            <span className="text-[#9CA3AF]">Early signs of</span> blight <span className="text-[#9CA3AF]">detected on your</span> tomato <span className="text-[#9CA3AF]">crop</span>
                          </p>
                          <p className="text-[#c0c4cc] font-normal text-[13px] tracking-tighter">May 24, 2025</p>
                      </div>
                    </div>

                    <div className="bg-transparent flex flex-row gap-4">
                      <div className="bg-green-600/75 rounded-full p-[8px] h-fit w-fit flex items-start mb-3">
                        <ArrowRight
                            className=" inline-flex text-white size-4"
                            
                            aria-hidden="true"
                        />
                      </div>
                      <div className="border-b border-zinc-50/10 w-full mt-1 pb-3 flex flex-row justify-between">
                          <p className="text-white text-[14px]">
                            ₹ 5,000 received <span className="text-[#9CA3AF]">via Paytm Merchant ID </span> 234-999
                          </p>
                          <p className="text-[#c0c4cc] font-normal text-[13px] tracking-tighter">May 24, 2025</p>
                      </div>
                    </div>

                    <div className="bg-transparent flex flex-row gap-4">
                      <div className="bg-[rgba(103,191,255,.75)] rounded-full p-[8px] h-fit w-fit flex items-start mb-3">
                        <CloudRainWind
                            className=" inline-flex text-white size-4"
                            aria-hidden="true"
                        />
                      </div>
                      <div className="border-b border-zinc-50/10 w-full mt-1 pb-3 flex flex-row justify-between">
                          <p className="text-white text-[14px]">
                            Light <span className="text-[#9CA3AF]">to</span> moderate showers<span className="text-[#9CA3AF]"> expected in your area</span> tomorrow
                          </p>
                          <p className="text-[#c0c4cc] font-normal text-[13px] tracking-tighter">May 24, 2025</p>
                      </div>
                    </div>

                    <div className="bg-transparent flex flex-row gap-4">
                      <div className="bg-green-500/75 rounded-full p-[8px] h-fit w-fit flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white lucide lucide-banknote-arrow-up-icon lucide-banknote-arrow-up"><path d="M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5"/><path d="M18 12h.01"/><path d="M19 22v-6"/><path d="m22 19-3-3-3 3"/><path d="M6 12h.01"/><circle cx="12" cy="12" r="2"/></svg>
                      </div>
                      <div className=" w-full mt-1 flex flex-row justify-between">
                          <p className="text-white text-[14px]">
                            Market price<span className="text-[#9CA3AF]"> for </span>onions <span className="text-[#9CA3AF]">currently</span> up ₹3 <span className="text-[#9CA3AF]">since last week</span>
                          </p>
                          <p className="text-[#c0c4cc] font-normal text-[13px] tracking-tighter">May 24, 2025</p>
                      </div>
                    </div>
                    
                    
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-start">
                
              </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
