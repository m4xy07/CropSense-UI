"use client";

import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Sun,
  IndianRupee,
  Users,
  Bell,
  CalendarCheck2,
  CircleAlert,
  Check,
  CircleCheckIcon,
  ListChecks,
  ListCheck,
  Wheat,
  ArrowRight,
  CloudRainWind,
  MapPin,
  Earth,
} from "lucide-react";
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
import {
  ThermometerSun,
  Sprout,
  Droplets,
  Droplet,
  Leaf,
  Download,
  Upload,
} from "lucide-react";
import {
  RiArrowDownLine,
  RiArrowUpLine,
  RiCheckboxCircleFill,
} from "@remixicon/react";
import StatusTracker from "@/components/dashboard/statuscheck";
import SensorStatusComponent from "@/components/comp-485";
import { NPKDonutComponent } from "@/components/dashboard/npkdonut";
import { UpcomingEventsComponent } from "@/components/dashboard/upcomingevents";
import ToastComponent from "@/components/comp-298";
import NotificationsComponent from "@/components/comp-383";

const API_URL = "https://data.cropsense.tech/data";

export default function Page() {
  const { user } = useUser();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sensorData, setSensorData] = useState<any>(null);

  useEffect(() => {
    fetch("https://data.cropsense.tech/")
      .then((res) => res.json())
      .then((data) => {
        // If data is an array, take the latest record
        if (Array.isArray(data)) {
          setSensorData(data[data.length - 1]);
        } else {
          setSensorData(data);
        }
      })
      .catch(() => setSensorData(null));
  }, []);

  // Helper to format values
  const formatValue = (val: number | undefined) =>
    typeof val === "number" ? val.toFixed(2) : "--";

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
              <SidebarTrigger
                className="-ml-1"
                onClick={() => setSidebarOpen((v) => !v)}
              />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-white">
                      Overview
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex flex-row gap-2 items-center">
              {/* <ToastComponent /> */}
              <div className="flex flex-row gap-2 items-center mr-[-10px]">
                            <NotificationsComponent />
                            <Separator orientation="vertical" className="mx-2 h-4" />
                            <NavUser user={data.user} />
                            
                            </div>
            </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-[1.25rem] p-4 w-full">
          <div className="flex flex-row gap-[1.25rem] w-full">
            {/* Temperature Today Card */}
            <div className="flex flex-row justify-between w-1/5 px-5 py-4 rounded-xl equipment-card-inner border border-zinc-50/10 group relative">
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
                <h2 className="text-[18px] font-light text-white">
                  Temperature
                </h2>
                <div className="flex flex-row gap-1 items-start pt-2">
                  <p className="text-[30px] !leading-10 !font-medium pricing-card-btn-amount">
                    30
                  </p>
                  <p className="!text-[22px] text-white/70">°C</p>
                </div>
                <p className="text-[16px] font-light text-white/80 ">
                  <span className="font-normal text-[14px]">
                    <span className="text-yellow-300">H: 30°C</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="text-blue-300">L: 16°C</span>
                  </span>
                </p>
                <p className="text-[15px] font-normal mt-2 text-white">
                  Maintain this temperature for optimal crop growth.
                </p>
              </div>
            </div>

            {/* SOC Card */}
            <div className="flex flex-row justify-between w-1/5 px-5 py-4 rounded-xl equipment-card-inner border border-zinc-50/10 group relative">
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
                <Earth className="size-6" />
                <h2 className="text-[18px] font-light text-white">
                  Soil Organic Carbon
                </h2>
                <div className="flex flex-row gap-1 items-start pt-0">
                  <p className="text-[30px] !leading-10 !font-medium pricing-card-btn-amount">
                    2
                  </p>
                  <p className="!text-[22px] text-white/70">g/kg</p>
                </div>
                <h2 className="text-[18px] font-light text-white">
                  Soil Oxygen Level
                </h2>
                <div className="flex flex-row gap-1 items-start pt-0">
                  <p className="text-[30px] !leading-10 !font-medium pricing-card-btn-amount">
                    9.10
                  </p>
                  <p className="!text-[22px] text-white/70">kPa</p>
                </div>
                {/* <p className="text-[16px] font-light text-white/80 ">
                  <span className="font-normal text-[14px]">
                    <span className="text-yellow-300">H: 29°C</span>&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="text-blue-300">L: 20°C</span>
                  </span>
                </p> */}
                <p className="text-[15px] font-normal mt-2 text-white">
                  Levels are below optimal range.
                </p>
              </div>
            </div>

            {/* Temperature Today Card */}
            <div className="flex flex-row justify-between w-1/5 px-5 py-4 rounded-xl equipment-card-inner border border-zinc-50/10 group relative">
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
                <h2 className="text-[18px] font-light text-white">
                  Soil Moisture
                </h2>
                <div className="flex flex-row gap-1 items-start pt-2">
                  <p className="text-[30px] !leading-10 !font-medium pricing-card-btn-amount">
                   52
                  </p>
                  <p className="!text-[22px] text-white/70">%</p>
                </div>
                <div className="flex flex-row text-[16px] font-light text-white/80 ">
                  <span className="inline-flex items-center gap-x-1 text-[14px] font-semibold text-red-500">
                    <RiArrowDownLine
                      className="size-4 -mr-1"
                      aria-hidden={true}
                    />
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
            <div className="flex flex-row justify-between w-1/5 px-5 py-4 rounded-xl equipment-card-inner border border-zinc-50/10 group relative">
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
                  <p className="text-[30px] !leading-10 !font-medium pricing-card-btn-amount">
                    5.7
                  </p>
                </div>
                <div className="flex flex-row text-[16px] font-light text-white/80 ">
                  <span className="inline-flex items-center gap-x-1 text-[14px] font-semibold text-orange-300">
                    <RiArrowDownLine
                      className="size-4 -mr-1"
                      aria-hidden={true}
                    />
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
            <div className="flex flex-row justify-between w-1/5 px-5 py-4 rounded-xl equipment-card-inner border border-zinc-50/10 group relative">
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
                  <p className="text-[30px] !leading-10 !font-medium pricing-card-btn-amount">
                    64
                  </p>
                  <p className="!text-[22px] text-white/70">%</p>
                </div>
                <div className="flex flex-row text-[16px] font-light text-white/80 ">
                  <span className="inline-flex items-center gap-x-1 text-[14px] font-semibold text-red-500">
                    <RiArrowUpLine
                      className="size-4 -mr-1"
                      aria-hidden={true}
                    />
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
            <div className="flex flex-row justify-between w-1/5 px-5 py-4 rounded-xl equipment-card-inner border border-zinc-50/10 group relative">
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
                <h2 className="text-[18px] font-light text-white">
                  Plant Health
                </h2>
                <div className="flex flex-row gap-1 items-start pt-2">
                  <p className="text-[30px] !leading-10 !font-medium pricing-card-btn-amount">
                    91
                  </p>
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
                  <p className="font-normal text-[14px] text-green-600">
                    Within optimal level!
                  </p>
                </div>
                <p className="text-[15px] font-normal mt-2 text-white">
                  Your crops are thriving, and are showing excellent health.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-[1.25rem] magical-borders-content w-full">
            {/* Recent Activity Card */}
            <div className="flex flex-col gap-4 justify-between rounded-xl equipment-card-inner w-2/5 border border-zinc-50/10 h-fit">
              <div className="flex flex-row justify-between px-5 py-4 border-b border-b-zinc-50/10 rounded-t-xl">
                <h2 className="text-[18px] font-normal mt-1">
                  Recent Activity
                </h2>
                <div className="flex items-center cursor-pointer w-fit bg-transparent py-[6px] px-[10px] rounded-[8px] relative group hover:bg-[rgba(255,255,255,.025)] transition-colors ease-in-out duration-200 theme-color dashboard-header-gps">
                  <Upload className="h-4 w-4 text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff]" />
                  <span className="text-[14px] font-normal text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff] pl-[6px]">
                    Export
                  </span>
                </div>
              </div>
              <div className="flex flex-col p-5 pt-0 gap-4">
                {/* Activity 1 */}
                <div className="bg-transparent flex flex-row gap-4">
                  <div className="bg-green-500/75 rounded-full p-[8px] h-fit w-fit flex items-start mb-3">
                    <Wheat
                      className="inline-flex text-white size-4"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="border-b border-zinc-50/10 w-full mt-1 pb-3 flex flex-row justify-between">
                    <p className="text-white text-[14px]">
                      <span className="text-[#9CA3AF]">Reached</span> 95%{" "}
                      <span className="text-[#9CA3AF]">
                        of projected yields for
                      </span>{" "}
                      rice <span className="text-[#9CA3AF]">this season</span>
                    </p>
                    <p className="text-[#c0c4cc] font-normal text-[13px] tracking-tighter">
                      Feb 2, 2026
                    </p>
                  </div>
                </div>
                {/* Activity 2 */}
                <div className="bg-transparent flex flex-row gap-4">
                  <div className="bg-[rgba(255,86,86,.75)] rounded-full p-[8px] h-fit w-fit flex items-start mb-3">
                    <CircleAlert
                      className="inline-flex text-white size-4"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="border-b border-zinc-50/10 w-full mt-1 pb-3 flex flex-row justify-between">
                    <p className="text-white text-[14px]">
                      <span className="text-[#9CA3AF]">Early signs of</span>{" "}
                      blight{" "}
                      <span className="text-[#9CA3AF]">detected on your</span>{" "}
                      tomato <span className="text-[#9CA3AF]">crop</span>
                    </p>
                    <p className="text-[#c0c4cc] font-normal text-[13px] tracking-tighter">
                      Feb 2, 2026
                    </p>
                  </div>
                </div>
                {/* Activity 3 */}
                <div className="bg-transparent flex flex-row gap-4">
                  <div className="bg-green-600/75 rounded-full p-[8px] h-fit w-fit flex items-start mb-3">
                    <ArrowRight
                      className="inline-flex text-white size-4"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="border-b border-zinc-50/10 w-full mt-1 pb-3 flex flex-row justify-between">
                    <p className="text-white text-[14px]">
                      ₹ 5,000 received{" "}
                      <span className="text-[#9CA3AF]">
                        via Paytm Merchant ID{" "}
                      </span>{" "}
                      234-999
                    </p>
                    <p className="text-[#c0c4cc] font-normal text-[13px] tracking-tighter">
                      Feb 2, 2026
                    </p>
                  </div>
                </div>
                {/* Activity 4 */}
                <div className="bg-transparent flex flex-row gap-4">
                  <div className="bg-[rgba(103,191,255,.75)] rounded-full p-[8px] h-fit w-fit flex items-start mb-3">
                    <CloudRainWind
                      className="inline-flex text-white size-4"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="border-b border-zinc-50/10 w-full mt-1 pb-3 flex flex-row justify-between">
                    <p className="text-white text-[14px]">
                      Light <span className="text-[#9CA3AF]">to</span> moderate
                      showers
                      <span className="text-[#9CA3AF]">
                        {" "}
                        expected in your area
                      </span>{" "}
                      tomorrow
                    </p>
                    <p className="text-[#c0c4cc] font-normal text-[13px] tracking-tighter">
                      Feb 2, 2026
                    </p>
                  </div>
                </div>
                {/* Activity 5 */}
                <div className="bg-transparent flex flex-row gap-4">
                  <div className="bg-green-500/75 rounded-full p-[8px] h-fit w-fit flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white lucide lucide-banknote-arrow-up-icon lucide-banknote-arrow-up"
                    >
                      <path d="M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5" />
                      <path d="M18 12h.01" />
                      <path d="M19 22v-6" />
                      <path d="m22 19-3-3-3 3" />
                      <path d="M6 12h.01" />
                      <circle cx="12" cy="12" r="2" />
                    </svg>
                  </div>
                  <div className="w-full mt-1 flex flex-row justify-between">
                    <p className="text-white text-[14px]">
                      Market price<span className="text-[#9CA3AF]"> for </span>
                      onions <span className="text-[#9CA3AF]">currently</span>{" "}
                      up ₹3{" "}
                      <span className="text-[#9CA3AF]">since last week</span>
                    </p>
                    <p className="text-[#c0c4cc] font-normal text-[13px] tracking-tighter">
                      Feb 2, 2026
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Technical Tracking Card */}
            <div
              className="technical-tracking relative overflow-hidden border-zinc-50/10 rounded-xl border transition-all duration-200 ease-in-out"
              style={sidebarOpen ? { width: "364px" } : {}}
            >
              <div className="technical-tracking-inner technical-tracking-borders-inner">
                <div className="technical-tracking-title">
                  <span>Tracking</span>
                  <span className="technical-tracking-title-big">
                    12 sensors
                  </span>
                  <span>actively</span>
                </div>
                <img
                  src="/technical-tracking-background.png"
                  className="technical-tracking-background"
                />
                <img
                  src="/technical-tracking-lines.png"
                  className="technical-tracking-lines"
                />
                <img
                  src="/technical-tracking-light.png"
                  className="technical-tracking-light"
                />
                <div className="technical-tracking-circles-wrapper lazy-background-image-maskImage">
                  <div className="technical-tracking-circles">
                    {[
                      { t: 0, l: 0, w: 100, h: 100, d: 3.7 },
                      {
                        t: 1.3383720930232528,
                        l: 1.3383720930232528,
                        w: 97.3232558139535,
                        h: 97.3232558139535,
                        d: 3.6,
                      },
                      {
                        t: 2.6534883720930225,
                        l: 2.6534883720930225,
                        w: 94.69302325581396,
                        h: 94.69302325581396,
                        d: 3.5,
                      },
                      {
                        t: 3.945348837209302,
                        l: 3.945348837209302,
                        w: 92.1093023255814,
                        h: 92.1093023255814,
                        d: 3.4,
                      },
                      {
                        t: 5.213953488372091,
                        l: 5.213953488372091,
                        w: 89.57209302325582,
                        h: 89.57209302325582,
                        d: 3.3,
                      },
                      {
                        t: 6.4593023255813975,
                        l: 6.4593023255813975,
                        w: 87.0813953488372,
                        h: 87.0813953488372,
                        d: 3.2,
                      },
                      {
                        t: 7.6813953488372135,
                        l: 7.6813953488372135,
                        w: 84.63720930232557,
                        h: 84.63720930232557,
                        d: 3.1,
                      },
                      {
                        t: 8.88023255813954,
                        l: 8.88023255813954,
                        w: 82.23953488372092,
                        h: 82.23953488372092,
                        d: 3.0,
                      },
                      {
                        t: 10.055813953488375,
                        l: 10.055813953488375,
                        w: 79.88837209302325,
                        h: 79.88837209302325,
                        d: 2.9,
                      },
                      {
                        t: 11.20813953488372,
                        l: 11.20813953488372,
                        w: 77.58372093023256,
                        h: 77.58372093023256,
                        d: 2.8,
                      },
                      {
                        t: 12.337209302325583,
                        l: 12.337209302325583,
                        w: 75.32558139534883,
                        h: 75.32558139534883,
                        d: 2.7,
                      },
                      {
                        t: 13.443023255813955,
                        l: 13.443023255813955,
                        w: 73.11395348837209,
                        h: 73.11395348837209,
                        d: 2.6,
                      },
                      {
                        t: 14.525581395348837,
                        l: 14.525581395348837,
                        w: 70.94883720930233,
                        h: 70.94883720930233,
                        d: 2.5,
                      },
                      {
                        t: 15.584883720930236,
                        l: 15.584883720930236,
                        w: 68.83023255813953,
                        h: 68.83023255813953,
                        d: 2.4,
                      },
                      {
                        t: 16.620930232558138,
                        l: 16.620930232558138,
                        w: 66.75813953488372,
                        h: 66.75813953488372,
                        d: 2.3,
                      },
                      {
                        t: 17.633720930232556,
                        l: 17.633720930232556,
                        w: 64.73255813953489,
                        h: 64.73255813953489,
                        d: 2.2,
                      },
                      {
                        t: 18.62325581395349,
                        l: 18.62325581395349,
                        w: 62.75348837209302,
                        h: 62.75348837209302,
                        d: 2.1,
                      },
                      {
                        t: 19.589534883720933,
                        l: 19.589534883720933,
                        w: 60.82093023255813,
                        h: 60.82093023255813,
                        d: 2.0,
                      },
                      {
                        t: 20.532558139534885,
                        l: 20.532558139534885,
                        w: 58.93488372093023,
                        h: 58.93488372093023,
                        d: 1.9,
                      },
                      {
                        t: 21.45232558139535,
                        l: 21.45232558139535,
                        w: 57.0953488372093,
                        h: 57.0953488372093,
                        d: 1.8,
                      },
                      {
                        t: 22.348837209302328,
                        l: 22.348837209302328,
                        w: 55.302325581395344,
                        h: 55.302325581395344,
                        d: 1.7,
                      },
                      {
                        t: 23.222093023255816,
                        l: 23.222093023255816,
                        w: 53.55581395348837,
                        h: 53.55581395348837,
                        d: 1.6,
                      },
                      {
                        t: 24.072093023255817,
                        l: 24.072093023255817,
                        w: 51.855813953488365,
                        h: 51.855813953488365,
                        d: 1.5,
                      },
                      {
                        t: 24.89883720930233,
                        l: 24.89883720930233,
                        w: 50.20232558139534,
                        h: 50.20232558139534,
                        d: 1.4,
                      },
                      {
                        t: 25.70232558139535,
                        l: 25.70232558139535,
                        w: 48.5953488372093,
                        h: 48.5953488372093,
                        d: 1.3,
                      },
                      {
                        t: 26.482558139534884,
                        l: 26.482558139534884,
                        w: 47.03488372093023,
                        h: 47.03488372093023,
                        d: 1.2,
                      },
                      {
                        t: 27.23953488372093,
                        l: 27.23953488372093,
                        w: 45.52093023255814,
                        h: 45.52093023255814,
                        d: 1.1,
                      },
                      {
                        t: 27.973255813953486,
                        l: 27.973255813953486,
                        w: 44.05348837209303,
                        h: 44.05348837209303,
                        d: 1.0,
                      },
                      {
                        t: 28.683720930232557,
                        l: 28.683720930232557,
                        w: 42.632558139534886,
                        h: 42.632558139534886,
                        d: 0.9,
                      },
                      {
                        t: 29.370930232558145,
                        l: 29.370930232558145,
                        w: 41.25813953488371,
                        h: 41.25813953488371,
                        d: 0.8,
                      },
                      {
                        t: 30.034883720930235,
                        l: 30.034883720930235,
                        w: 39.93023255813953,
                        h: 39.93023255813953,
                        d: 0.7,
                      },
                      {
                        t: 30.67558139534884,
                        l: 30.67558139534884,
                        w: 38.64883720930232,
                        h: 38.64883720930232,
                        d: 0.6,
                      },
                      {
                        t: 31.293023255813956,
                        l: 31.293023255813956,
                        w: 37.41395348837209,
                        h: 37.41395348837209,
                        d: 0.5,
                      },
                      {
                        t: 31.887209302325584,
                        l: 31.887209302325584,
                        w: 36.22558139534883,
                        h: 36.22558139534883,
                        d: 0.4,
                      },
                      {
                        t: 32.45813953488372,
                        l: 32.45813953488372,
                        w: 35.08372093023256,
                        h: 35.08372093023256,
                        d: 0.3,
                      },
                      {
                        t: 33.00581395348837,
                        l: 33.00581395348837,
                        w: 33.98837209302326,
                        h: 33.98837209302326,
                        d: 0.2,
                      },
                      {
                        t: 33.53023255813954,
                        l: 33.53023255813954,
                        w: 32.939534883720924,
                        h: 32.939534883720924,
                        d: 0.1,
                      },
                    ].map((circle, idx) => (
                      <div
                        key={idx}
                        style={{
                          top: `${circle.t}%`,
                          left: `${circle.l}%`,
                          width: `${circle.w}%`,
                          height: `${circle.h}%`,
                          animationDelay: `${circle.d}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className="technical-tracking-background-ellipse technical-tracking-background-ellipse-1" />
                <div className="technical-tracking-background-ellipse technical-tracking-background-ellipse-2" />
              </div>
            </div>

            <SensorStatusComponent />
          </div>
          <div className="flex flex-row gap-[1.25rem] w-full">
            <NPKDonutComponent />
            <UpcomingEventsComponent />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
