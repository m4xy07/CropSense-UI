"use client";

import { useEffect } from "react";
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

// Static data from provided JSON
const staticData = {
  time: "2025-09-23T18:45:12.000Z",
  temperature: 26.8,
  humidity: 78.5,
  aqi: 58,
  hi: 28.4,
  alt: 560.0,
  pres: 1008.7,
  moisture: 48.3,
  raining: "yes",
  wifi_strength: -54.2,
  best_crop: "soybean",
  recommended_fertilizer: "NPK 15-15-15",
  npk_uptake_nitrogen: 10.9,
  npk_uptake_phosphorus: 5.2,
  npk_uptake_potassium: 8.6,
  harvestable_months: [
    {
      month: "October",
      wholesale_price: 102.4,
      retail_price: 156.7
    }
  ]
};

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

  // Static values instead of dynamic state
  const currentTime = new Date().toLocaleTimeString();
  const altitude = staticData.alt;
  const timeFrame = "7 days";
  const chartData = {
    chartData: [
      { label: "Wholesale", price: staticData.harvestable_months[0].wholesale_price },
      { label: "Retail", price: staticData.harvestable_months[0].retail_price }
    ],
    harvestableMonth: staticData.harvestable_months[0].month,
    bestCrop: staticData.best_crop,
    recommendedFertilizer: staticData.recommended_fertilizer,
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
            <MorphingDialogBasicNine />
            <HarvestableMonthCards />
            
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
