"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { AppSidebar } from "@/components/app-sidebar";
import { LineChartComponent } from "@/components/dashboard/linecharts";
import { StackedChartExpandedComponent } from "@/components/dashboard/stackedexpanded";
import { ClockIcon, OpacityIcon } from "@radix-ui/react-icons";
import { WifiHigh, WifiLow, WifiZero, WifiOff } from "lucide-react";
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

  const [currentTime, setCurrentTime] = useState<string>("");
  const [altitude, setAltitude] = useState<number | null>(null);
  const [rainStatus, setRainStatus] = useState<string | null>(null);
  const [wifiStrength, setWifiStrength] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [timeFrame, setTimeFrame] = useState<string>(Cookies.get("timeFrame") || "7 days");

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString());
    };
    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          const latestRecord = data[data.length - 1];
          setAltitude(parseFloat(latestRecord?.alt?.toFixed(2)) || null);
          setRainStatus(
            latestRecord?.raining
              ? String(latestRecord.raining).charAt(0).toUpperCase() + String(latestRecord.raining).slice(1)
              : "Unknown"
          );
          setWifiStrength(latestRecord?.wifiStrength || null);
        } else {
          console.warn("API returned an empty or invalid response.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    Cookies.set("timeFrame", timeFrame, { expires: 7 });
  }, [timeFrame]);

  const getWifiStatus = () => {
    if (wifiStrength === null) {
      return { text: "Disconnected", icon: <WifiOff className="w-5 h-5  text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff] mr-[6px]" /> };
    }
    if (wifiStrength > -70) {
      return { text: "High Strength", icon: <WifiHigh className="w-5 h-5  text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff] mr-[6px]" /> };
    }
    if (wifiStrength > -81) {
      return { text: "Low Strength", icon: <WifiLow className="w-5 h-5  text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff] mr-[6px]" /> };
    }
    return { text: "Unstable", icon: <WifiZero className="w-5 h-5  text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff] mr-[6px]" /> };
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
            <div className="flex flex-row items-center gap-6">
              <SelectTime timeFrame={timeFrame} setTimeFrame={setTimeFrame} />
              {loading ? <Skeleton className="h-[32px] w-[98px]  " /> :<>
              <div className="flex items-center w-[98px] bg-transparent p-[6px] rounded-[8px] relative group hover:bg-[rgba(255,255,255,.025)] transition-colors ease-in-out duration-200 theme-color dashboard-header-gps">
                 <ClockIcon className="w-5 h-5 text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff] mr-[6px]" /> <div className="text-white text-sm w-[64px] text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff]">{currentTime}</div>
              </div>
              </>}

              {loading ? <Skeleton className="h-[32px] w-[66px]" /> :<>
              <div className="flex items-center w-[66px] bg-transparent p-[6px] rounded-[8px] relative group hover:bg-[rgba(255,255,255,.025)] transition-colors ease-in-out duration-200 theme-color dashboard-header-gps">
                 <OpacityIcon className="w-5 h-5 text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff] mr-[6px]" /> <div className="text-white text-sm w-[18px] text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff]">{rainStatus !== null ? `${rainStatus} m` : "N/A"}</div>
              </div>
             
              </>}



              {loading ? <Skeleton className="h-[32px] w-[68px]" /> :<>
              <div className="flex items-center w-fit bg-transparent p-[6px] rounded-[8px] relative group hover:bg-[rgba(255,255,255,.025)] transition-colors ease-in-out duration-200 theme-color dashboard-header-gps">
                 <TbMountain className="w-5 h-5 text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff] mr-[6px]" /> <div className="text-white text-sm w-fit text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff]">{altitude !== null ? `${altitude} m` : "N/A"}</div>
              </div>
              </>}

              
              {loading ? <Skeleton className="h-[32px] w-[125px]" /> : <>
              <div className="flex items-center w-fit bg-transparent p-[6px] rounded-[8px] relative group hover:bg-[rgba(255,255,255,.025)] transition-colors ease-in-out duration-200 theme-color dashboard-header-gps">
               {wifiStatus.icon}
               <div className="text-white text-sm w-fit text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff]">{wifiStatus.text}</div>
              </div>
              </>}

              <div className="flex flex-row gap-2">
              <NavUser user={data.user} />
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
