"use client";

import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { GroupChartComponent } from "@/components/dashboard/groupchart";
import { LineChartComponent } from "@/components/dashboard/linecharts";
import { StackedChartComponent } from "@/components/dashboard/stackedchart";
import { BarChartComponent } from "@/components/dashboard/barchart";
import { BlendingModeIcon, OpacityIcon, ClockIcon } from "@radix-ui/react-icons";
import { Bell, WifiHigh } from "lucide-react";
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
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SelectTime } from "@/components/select";
import { StackedChartExpandedComponent } from "@/components/dashboard/stackedexpanded";
import { MorphingDialogBasicNine } from "@/components/bestcrop";
import { MorphingDialogBasicFourteen } from "@/components/harvestmonth1";
import { MorphingDialogBasicFifteen } from "@/components/harvestmonth2";
import { MorphingDialogBasicSixteen } from "@/components/harvestmonth3";
import { MorphingDialogBasicTen } from "@/components/bestfert";
import { HarvestableMonthCards } from "@/components/harvestpred";
import { TwoLineChartComponent } from "@/components/dashboard/twolinechart";
import { TwoLineChart2Component } from "@/components/dashboard/twolinechart2";
import { TwoLineChart3Component } from "@/components/dashboard/twolinechart3";
import { TwoLineChart4Component } from "@/components/dashboard/twolinechart4";
import { NavUser } from "@/components/nav-user";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import NotificationsComponent from "@/components/comp-383";

const API_URL = "https://data.cropsense.tech/";

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
  const [timeFrame, setTimeFrame] = useState<string>("7 days");
  const [sensorData, setSensorData] = useState<any>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time as per other pages if needed, but keeping existing localTimeString for now or matching others
       let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; 
      const minutesStr = minutes < 10 ? "0" + minutes : minutes;
      setCurrentTime(`${hours}:${minutesStr} ${ampm}`);
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
          const latestRecord = data[data.length - 1]; // Get the last record which seems to be the latest
          setSensorData(latestRecord);
        } else {
          console.warn("API returned an empty or invalid response.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
                    <BreadcrumbPage className="text-white">Predictions</BreadcrumbPage>
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
        </header>

        <div className="flex flex-1 flex-col items-start justify-start gap-4 p-4">
          <div className="flex flex-row gap-4 w-full">
            <MorphingDialogBasicNine bestCrop={sensorData?.best_crop} />
            <HarvestableMonthCards harvestableMonths={sensorData?.harvestable_months} />
            
          </div>
          <div className="flex flex-row gap-4 w-full overflow-hidden">
          <MorphingDialogBasicTen />
          <TwoLineChartComponent  />
          
          </div>
          <div className="flex flex-row gap-4 w-full overflow-hidden">
            <TwoLineChart2Component />
            <TwoLineChart3Component />
            <TwoLineChart4Component />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
