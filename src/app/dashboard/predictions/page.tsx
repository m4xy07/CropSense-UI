"use client";

import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { GroupChartComponent } from "@/components/dashboard/groupchart";
import { LineChartComponent } from "@/components/dashboard/linecharts";
import { StackedChartComponent } from "@/components/dashboard/stackedchart";
import { BarChartComponent } from "@/components/dashboard/barchart";
import { BlendingModeIcon, OpacityIcon, ClockIcon } from "@radix-ui/react-icons";
import { WifiHigh } from "lucide-react";
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
  const [timeFrame, setTimeFrame] = useState<string>("7 days");
  const [chartData, setChartData] = useState<{
    chartData: { label: string; price: number }[];
    harvestableMonth: string;
    bestCrop: string;
    recommendedFertilizer: string;
  } | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
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
          const latestMonthData = latestRecord.harvestable_months[latestRecord.harvestable_months.length - 1];

          setAltitude(parseFloat(latestRecord?.alt?.toFixed(2)));

          setChartData({
            chartData: [
              { label: "Wholesale", price: parseFloat(latestMonthData.wholesale_price.toFixed(2)) },
              { label: "Retail", price: parseFloat(latestMonthData.retail_price.toFixed(2)) },
            ],
            harvestableMonth: latestMonthData.month,
            bestCrop: latestRecord.best_crop || "Unknown",
            recommendedFertilizer: latestRecord.recommended_fertilizer || "Unknown",
          });
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
                    <BreadcrumbPage>Predictions</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex flex-row gap-2">
              <NavUser user={data.user} />
            </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col items-start justify-start gap-4 p-4">
          <div className="flex flex-row gap-4">
            <MorphingDialogBasicNine />
            <HarvestableMonthCards />
            
          </div>
          <div className="flex flex-row gap-4">
          <MorphingDialogBasicTen />
          <TwoLineChartComponent  />
          <TwoLineChart2Component />
          </div>
          <div className="flex flex-row gap-4">
            <TwoLineChart3Component />
            <TwoLineChart4Component />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
