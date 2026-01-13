"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { AppSidebar } from "@/components/app-sidebar";
import { LineChartComponent } from "@/components/dashboard/linecharts";
import { StackedChartExpandedComponent } from "@/components/dashboard/stackedexpanded";
import { ClockIcon, OpacityIcon } from "@radix-ui/react-icons";
import { WifiHigh, WifiLow, WifiZero, WifiOff, CloudRainWind, Bell } from "lucide-react";
import { FaMountain } from "react-icons/fa";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SelectTime } from "@/components/select";
import { Skeleton } from "@/components/ui/skeleton";
import { TbMountain } from "react-icons/tb";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { NavUser } from "@/components/nav-user";
import NotificationsComponent from "@/components/comp-383";

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

  const [currentTime, setCurrentTime] = useState<string>("");
  const [altitude, setAltitude] = useState<number | null>(null);
  const [rainStatus, setRainStatus] = useState<string | null>(null);
  const [wifiStrength, setWifiStrength] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [timeFrame, setTimeFrame] = useState<string>(Cookies.get("timeFrame") || "7 days");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      const minutesStr = minutes < 10 ? "0" + minutes : minutes;
      setCurrentTime(`${hours}:${minutesStr} ${ampm}`);
    };
    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Artificial data setup
    setAltitude(21.43);
    setRainStatus("Sunny");
    setWifiStrength(-50); // Strong signal
    setLoading(false);
  }, []);

  useEffect(() => {
    Cookies.set("timeFrame", timeFrame, { expires: 7 });
  }, [timeFrame]);

  const getWifiStatus = () => {
    return { text: "Connected", icon: <WifiHigh className="w-5 h-5  text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff] -mt-[6px] mr-[6px]" /> };
  };

  const wifiStatus = getWifiStatus();

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
                    <BreadcrumbPage className="text-white">Data Insights</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex flex-row items-center gap-4">
            {loading ? (
              <Skeleton className="h-[32px] w-[610px]  " />
            ) : (
              <div className="flex flex-row items-center gap-6">
                <div className="flex flex-row items-center gap-6">
                  <SelectTime timeFrame={timeFrame} setTimeFrame={setTimeFrame} />
                
                  <div className="flex items-center w-fit bg-transparent p-[6px] px-[8px] rounded-[8px] relative group hover:bg-[rgba(255,255,255,.025)] transition-colors ease-in-out duration-200 theme-color dashboard-header-gps">
                    <ClockIcon className="w-5 h-5 text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff] mr-[6px]" /> <div className="text-white text-sm w-fit text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff]">{currentTime}</div>
                  </div>
                

                  <div className="flex items-center w-fit bg-transparent p-[6px] px-[8px] rounded-[8px] relative group hover:bg-[rgba(255,255,255,.025)] transition-colors ease-in-out duration-200 theme-color dashboard-header-gps">
                    <CloudRainWind className="w-5 h-5 text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff] mr-[6px]" /> <div className="text-white text-sm w-fit text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff]">{rainStatus !== null ? `${rainStatus}` : "N/A"}</div>
                  </div>
               
            
                  <div className="flex items-center w-fit bg-transparent p-[6px] px-[8px] rounded-[8px] relative group hover:bg-[rgba(255,255,255,.025)] transition-colors ease-in-out duration-200 theme-color dashboard-header-gps">
                    <TbMountain className="w-5 h-5 text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff] mr-[6px]" /> <div className="text-white text-sm w-fit text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff]">{altitude !== null ? `${altitude}m` : "N/A"}</div>
                  </div>
                

                  <div className="flex items-center w-fit bg-transparent p-[6px] px-[8px] rounded-[8px] relative group hover:bg-[rgba(255,255,255,.025)] transition-colors ease-in-out duration-200 theme-color dashboard-header-gps">
                    {wifiStatus.icon}
                    <div className="text-white text-sm w-fit text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff]">{wifiStatus.text}</div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-row gap-2 items-center">
              <div className="flex flex-row gap-2 items-center mr-[-10px]">
                            <NotificationsComponent />
                            <Separator orientation="vertical" className="mx-2 h-4" />
                            <NavUser user={data.user} />
                            
                            </div>
            </div>
            </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <LineChartComponent cardTitle="Temperature" dataType="temperature" timeFrame={timeFrame} />
            <LineChartComponent cardTitle="Humidity" dataType="humidity" timeFrame={timeFrame} />
            <LineChartComponent cardTitle="Air Quality Index (AQI)" dataType="aqi" timeFrame={timeFrame} />
            <LineChartComponent cardTitle="Heat Index (HI)" dataType="heatIndex" timeFrame={timeFrame} />
            <LineChartComponent cardTitle="Pressure" dataType="pressure" timeFrame={timeFrame} />
            <LineChartComponent cardTitle="Soil Moisture" dataType="moisture" timeFrame={timeFrame} />
            <StackedChartExpandedComponent timeFrame={timeFrame} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
