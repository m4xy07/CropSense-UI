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

const API_URL = "https://data.cropsense.tech/data";

export default function Page() {
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
    <SidebarProvider className="dark">
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex justify-between w-full pr-4">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Soil Report</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex flex-row items-center gap-6">
              <div className="flex">
                <SelectTime timeFrame={timeFrame} setTimeFrame={setTimeFrame} />
              </div>

              <div className="flex flex-row w-[80px] items-center gap-2">
                <ClockIcon className="w-[20px] h-[20px]" />
                <div className="text-[rgba(255,255,255,0.8)] w-[52px] text-sm">
                  {currentTime}
                </div>
              </div>

              <div className="flex flex-row items-center gap-2">
                <OpacityIcon className="w-5 h-5" />
                <div className="text-[rgba(255,255,255,0.8)] text-sm">
                  Not raining
                </div>
              </div>

              <div className="flex flex-row items-center gap-2">
                <FaMountain className="w-5 h-5" />
                <div className="text-[rgba(255,255,255,0.8)] text-sm">
                  {altitude !== null ? `${altitude} m` : "Loading..."}
                </div>
              </div>

              <div className="flex flex-row items-center gap-2">
                <WifiHigh className="w-6 h-6 mb-2 -mr-1" />
                <div className="text-[rgba(255,255,255,0.8)] text-sm">
                  Connected
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50">
              <LineChartComponent cardTitle="Temperature" dataType="temperature" timeFrame={timeFrame} />
            </div>
            <div className="aspect-video rounded-xl bg-muted/50">
              <LineChartComponent cardTitle="Humidity" dataType="humidity" timeFrame={timeFrame} />
            </div>
            <div className="aspect-video rounded-xl bg-muted/50">
              <LineChartComponent cardTitle="Air Quality Index (AQI)" dataType="aqi" timeFrame={timeFrame} />
            </div>
            <div className="aspect-video rounded-xl bg-muted/50">
              <LineChartComponent cardTitle="Heat Index (HI)" dataType="heatIndex" timeFrame={timeFrame} />
            </div>
            <div className="aspect-video rounded-xl bg-muted/50">
            <LineChartComponent cardTitle="Pressure" dataType="pressure" timeFrame={timeFrame} />
          </div>
          <div className="aspect-video rounded-xl bg-muted/50">
            <LineChartComponent cardTitle="Soil Moisture" dataType="moisture" timeFrame={timeFrame} />
          </div>
          <div className="aspect-video rounded-xl bg-muted/50 w-full md:col-span-2">
          <StackedChartExpandedComponent timeFrame={timeFrame} />
        </div>
          </div>

          <div className="flex flex-wrap gap-4">
      
      
      
            {/* <div className="aspect-video rounded-xl bg-muted/50">
              {chartData ? (
                <BarChartComponent cardTitle="Crop Harvest & Pricing" data={chartData} />
              ) : (
                <p className="text-center text-gray-500">Loading...</p>
              )}
            </div> */}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
