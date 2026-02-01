"use client";

import { useEffect, useState, useRef } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {

  CircleAlert,

  Wheat,
  ArrowRight,
  CloudRainWind,
  Earth,
  ChevronLeft,
  ChevronRight,
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
import SensorStatusComponentHardware from "@/components/dash/sensorstatuscomphardware";
import { NPKDonutComponentHardware } from "@/components/dash/npkdonuthardware";
import { UpcomingEventsComponentHardware } from "@/components/dash/upcomingeventshardware";
import { DockDemo } from "@/components/dash/dockcomponent";

const API_URL = "https://data.cropsense.tech/data";

export default function Page() {
  const { user } = useUser();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sensorData, setSensorData] = useState<any>(null);
  
  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const totalSlides = 5;

  const getRelativeDateString = (daysOffset: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysOffset);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  useEffect(() => {
    // Placeholder data matching /dashboard
    const placeholderData = {
      temperature: 30,
      moisture: 52,
      humidity: 64,
      // Add other fields if necessary based on usage
    };
    setSensorData(placeholderData);
  }, []);

  // Carousel functions
  const goToSlide = (slideIndex: number) => {
    if (slideIndex >= 0 && slideIndex < totalSlides) {
      setCurrentSlide(slideIndex);
    }
  };

  // Arrow navigation functions
  const goToPrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToNextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = dragStart - currentX;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 50;
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0 && currentSlide < totalSlides - 1) {
        setCurrentSlide(currentSlide + 1);
      } else if (dragOffset < 0 && currentSlide > 0) {
        setCurrentSlide(currentSlide - 1);
      }
    }
    setDragOffset(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const diff = dragStart - currentX;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 50;
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0 && currentSlide < totalSlides - 1) {
        setCurrentSlide(currentSlide + 1);
      } else if (dragOffset < 0 && currentSlide > 0) {
        setCurrentSlide(currentSlide - 1);
      }
    }
    setDragOffset(0);
  };

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
      {/* <AppSidebar /> */}
      <SidebarInset>
        {/* <header className="flex h-16 shrink-0 items-center gap-2 text-white theme-color main-topbar-theme">
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
                    <BreadcrumbPage className="text-white">Overview</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <div className="flex flex-row gap-2 items-center mr-[-10px]">
                <NotificationsComponent />
                <Separator orientation="vertical" className="mx-2 h-4" />
                <NavUser user={data.user} />
              </div>
            </div>
          </div>
        </header> */}
      
        {/* Centered Carousel Container */}
        <div className="flex items-center justify-center min-h-screen w-full ">
          <div className="relative w-[1024px] p-4 pb-24">
            {/* Left Arrow */}
            <button
              onClick={goToPrevSlide}
              disabled={currentSlide === 0}
              className={`absolute left-2 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 backdrop-blur-sm ${
                currentSlide === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={goToNextSlide}
              disabled={currentSlide === totalSlides - 1}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 backdrop-blur-sm ${
                currentSlide === totalSlides - 1 ? 'opacity-30 cursor-not-allowed' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <div className="overflow-hidden">
              {/* Carousel Container */}
              <div 
                ref={carouselRef}
                className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing select-none h-fit items-center justify-center"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
            <div 
              className="flex transition-transform duration-300 ease-out h-fit"
              style={{
                transform: `translateX(${(-currentSlide * 100) + (isDragging ? -dragOffset / 10 : 0)}%)`
              }}
            >
              {/* Slide 1: KPI Cards */}
              <div className="w-full flex-shrink-0 px-4 ">
                <div className="w-full flex flex-1 flex-col gap-[1rem] h-full ">
              <div className="flex flex-row gap-[1rem] w-full justify-center mx-auto ">
                {/* Temperature Today Card */}
                <div className="flex flex-row justify-between w-[292px] h-[275px] px-5 py-4 rounded-xl equipment-card-inner border border-zinc-50/10 group relative">
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
                    <h2 className="text-[24px] font-light text-white">Temperature</h2>
                    <div className="flex flex-row gap-1 items-start pt-2">
                      <p className="text-[36px] !leading-10 !font-medium pricing-card-btn-amount">
                        {formatValue(sensorData?.temperature)}
                      </p>
                      <p className="!text-[22px] text-white/70">°C</p>
                    </div>
                    <p className="text-[16px] font-light text-white/80 ">
                      <span className="font-normal text-[16px]">
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
                <div className="flex flex-row justify-between w-[292px] h-[275px] px-5 py-4 rounded-xl equipment-card-inner border border-zinc-50/10 group relative">
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
                    <h2 className="text-[24px] font-light text-white">Soil Organic Carbon</h2>
                    <div className="flex flex-row gap-1 items-start pt-0">
                      <p className="text-[36px] !leading-10 !font-medium pricing-card-btn-amount">2</p>
                      <p className="!text-[22px] text-white/70">g/kg</p>
                    </div>

                    <h2 className="text-[24px] font-light text-white">Soil Oxygen Level</h2>
                    <div className="flex flex-row gap-1 items-start pt-0">
                      <p className="text-[36px] !leading-10 !font-medium pricing-card-btn-amount">9.12</p>
                      <p className="!text-[22px] text-white/70">kPa</p>
                    </div>
                    <p className="text-[15px] font-normal mt-2 text-white">Levels are below optimal range.</p>
                  </div>
                </div>

                {/* Soil Moisture Card */}
                <div className="flex flex-row justify-between w-[292px] h-[275px] px-5 py-4 rounded-xl equipment-card-inner border border-zinc-50/10 group relative">
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
                    <h2 className="text-[24px] font-light text-white">Soil Moisture</h2>
                    <div className="flex flex-row gap-1 items-start pt-2">
                      <p className="text-[36px] !leading-10 !font-medium pricing-card-btn-amount">
                        {formatValue(sensorData?.moisture)}
                      </p>
                      <p className="!text-[22px] text-white/70">%</p>
                    </div>
                    <div className="flex flex-row text-[16px] font-light text-white/80 ">
                      <span className="inline-flex items-center gap-x-1 text-[16px] font-semibold text-red-500">
                        <RiArrowDownLine className="size-4 -mr-1" aria-hidden={true} />
                        8%&nbsp;
                      </span>
                      <p className="font-normal text-[16px]">below optimal level</p>
                    </div>
                    <p className="text-[15px] font-normal mt-2 text-white">
                      Provide more water to maintain optimal soil moisture levels.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-row gap-[1rem] w-full justify-center mx-auto ">
                {/* pH Level Card */}
                <div className="flex flex-row justify-between w-[292px] h-[275px] px-5 py-4 rounded-xl equipment-card-inner border border-zinc-50/10 group relative">
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
                    <h2 className="text-[24px] font-light text-white">pH Level</h2>
                    <div className="flex flex-row gap-1 items-start pt-2">
                      <p className="text-[36px] !leading-10 !font-medium pricing-card-btn-amount">
                        5.7
                      </p>
                    </div>
                    <div className="flex flex-row text-[16px] font-light text-white/80 ">
                      <span className="inline-flex items-center gap-x-1 text-[16px] font-semibold text-orange-300">
                        <RiArrowDownLine className="size-4 -mr-1" aria-hidden={true} />
                        0.3&nbsp;
                      </span>
                      <p className="font-normal text-[16px]">below optimal level</p>
                    </div>
                    <p className="text-[15px] font-normal mt-2 text-white">
                      Add acidic compost to balance pH levels.
                    </p>
                  </div>
                </div>

                {/* Humidity Card */}
                <div className="flex flex-row justify-between w-[292px] h-[275px] px-5 py-4 rounded-xl equipment-card-inner border border-zinc-50/10 group relative">
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
                    <h2 className="text-[24px] font-light text-white">Humidity</h2>
                    <div className="flex flex-row gap-1 items-start pt-2">
                      <p className="text-[36px] !leading-10 !font-medium pricing-card-btn-amount">
                        {formatValue(sensorData?.humidity)}
                      </p>
                      <p className="!text-[22px] text-white/70">%</p>
                    </div>
                    <div className="flex flex-row text-[16px] font-light text-white/80 ">
                      <span className="inline-flex items-center gap-x-1 text-[16px] font-semibold text-red-500">
                        <RiArrowUpLine className="size-4 -mr-1" aria-hidden={true} />
                        12%&nbsp;
                      </span>
                      <p className="font-normal text-[16px]">above optimal level</p>
                    </div>
                    <p className="text-[15px] font-normal mt-2 text-white">
                      Ensure ventilation is sufficient to prevent mold growth.
                    </p>
                  </div>
                </div>

                {/* Plant Health Card */}
                <div className="flex flex-row justify-between w-[292px] h-[275px] px-5 py-4 rounded-xl equipment-card-inner border border-zinc-50/10 group relative">
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
                    <h2 className="text-[24px] font-light text-white">
                      Plant Health
                    </h2>
                    <div className="flex flex-row gap-1 items-start pt-2">
                      <p className="text-[36px] !leading-10 !font-medium pricing-card-btn-amount">
                        91
                      </p>
                      <p className="!text-[22px] text-white/70">%</p>
                    </div>
                    <div className="flex flex-row text-[16px] font-light text-white/80 ">
                      <span className="inline-flex items-center text-[16px] font-semibold text-red-500">
                        <RiCheckboxCircleFill
                          className="-ml-0.5 size-4 shrink-0 text-green-600"
                          aria-hidden={true}
                        />
                        &nbsp;
                      </span>
                      <p className="font-normal text-[16px] text-green-600">
                        Within optimal level!
                      </p>
                    </div>
                    <p className="text-[15px] font-normal mt-2 text-white">
                      Your crops are thriving, and are showing excellent health.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

              {/* Slide 2: Recent Activity */}
              <div className="w-full flex-shrink-0 px-4 h-fit">
                <div className="flex justify-center items-start w-full h-full">
                  {/* Recent Activity Card */}
                  <div className="flex flex-col gap-4 justify-between rounded-xl equipment-card-inner w-full border border-zinc-50/10 h-fit">
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
                      {getRelativeDateString(0)}
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
                      {getRelativeDateString(0)}
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
                      {getRelativeDateString(-1)}
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
                      {getRelativeDateString(0)}
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
                      {getRelativeDateString(0)}
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
                      {getRelativeDateString(0)}
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
                  <div className=" w-full mt-1 flex flex-row justify-between">
                    <p className="text-white text-[14px]">
                      Market price<span className="text-[#9CA3AF]"> for </span>
                      onions <span className="text-[#9CA3AF]">currently</span>{" "}
                      up ₹3{" "}
                      <span className="text-[#9CA3AF]">since last week</span>
                    </p>
                    <p className="text-[#c0c4cc] font-normal text-[13px] tracking-tighter">
                      {getRelativeDateString(-2)}
                    </p>
                  </div>
                </div>
                
                    
                  
                
              </div>
            </div>
                </div>
              </div>

              {/* Slide 3: Sensor Status */}
              <div className="w-full flex-shrink-0 px-4 min-h-[500px]">
                <div className="flex justify-center items-start w-full h-full">
                  <div className="w-full">
                    <SensorStatusComponentHardware />
                  </div>
                </div>
              </div>

              {/* Slide 4: NPK Tracker */}
              <div className="w-full flex-shrink-0 px-4 min-h-[500px]">
                <div className="flex justify-center items-start w-full h-full">
                  <div className="w-full">
                    <NPKDonutComponentHardware/>
                  </div>
                </div>
              </div>

              {/* Slide 5: Upcoming Events */}
              <div className="w-full flex-shrink-0 px-4 min-h-[500px]">
                <div className="flex justify-center items-start w-full h-full">
                  <div className="w-full">
                    <UpcomingEventsComponentHardware />
                  </div>
                </div>
              </div>
              </div>

              

            </div>

            <div className="absolute bottom-[76px] left-1/2 transform -translate-x-1/2 z-50 w-full flex justify-center">
              <DockDemo currentSlide={currentSlide} onSlideChange={goToSlide} />
            </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
