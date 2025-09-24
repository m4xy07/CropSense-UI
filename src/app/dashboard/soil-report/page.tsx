"use client";

import { useRef } from "react";
import CheckIcon from "@/assets/check.svg";
import { AppSidebar } from "@/components/app-sidebar";
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
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FileText } from "lucide-react";
import { NavUser } from "@/components/nav-user";
import { useUser } from "@clerk/nextjs";
import NotificationsComponent from "@/components/comp-383";

// Static sensor data for last 3 days
const staticSensorDataArray = [
  {
    time: "2025-09-24T18:45:12.000Z", // Today
    temperature: 26.8,
    humidity: 78.5,
    aqi: 58,
    hi: 28.4,
    alt: 560.0,
    pres: 1008.7,
    moisture: 48.3,
    raining: "yes",
    recommended_fertilizer: "NPK 15-15-15",
    npk_uptake_nitrogen: 10.9,
    npk_uptake_phosphorus: 5.2,
    npk_uptake_potassium: 8.6,
  },
  {
    time: "2025-09-23T18:45:12.000Z", // Yesterday
    temperature: 25.3,
    humidity: 82.1,
    aqi: 62,
    hi: 27.8,
    alt: 559.5,
    pres: 1009.2,
    moisture: 51.7,
    raining: "no",
    recommended_fertilizer: "NPK 15-15-15",
    npk_uptake_nitrogen: 11.2,
    npk_uptake_phosphorus: 4.8,
    npk_uptake_potassium: 9.1,
  },
  {
    time: "2025-09-22T18:45:12.000Z", // Day before yesterday
    temperature: 27.5,
    humidity: 75.2,
    aqi: 55,
    hi: 29.1,
    alt: 560.2,
    pres: 1007.8,
    moisture: 46.9,
    raining: "no",
    recommended_fertilizer: "NPK 15-15-15",
    npk_uptake_nitrogen: 10.5,
    npk_uptake_phosphorus: 5.6,
    npk_uptake_potassium: 8.2,
  }
];

export default function Page() {
  const reportRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();

  const data = {
    user: {
      name: user?.fullName || "Guest",
      email: user?.primaryEmailAddress?.emailAddress || "guest@example.com",
      avatar: user?.imageUrl || "/avatars/default.jpg",
    },
  };

  // Format the static data with timestamps for last 3 days
  const sensorData = staticSensorDataArray.map(item => ({
    ...item,
    timestamp: new Date(item.time).toLocaleString(),
  }));

  const generatePDF = async () => {
    const element = reportRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("portrait", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Soil_Report_${new Date().toISOString()}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const renderCard = (
    title: string,
    values: (string | number | null | undefined)[],
    timestamps: (string | undefined)[]
  ) => (
    <div className="rounded-lg equipment-card-inner theme-color p-4 shadow-md min-w-[280px] flex-1 border border-zinc-50/10 hover:border-zinc-50/15 ease-in-out transition-all duration-200">
      <h2 className="text-white font-semibold text-[26px] tracking-normal effect-font-gradient">
        {title}
      </h2>
      <h4 className="text-muted-foreground mb-2 text-gray-200">
        Latest readings
      </h4>
      <ul className="space-y-1">
        {values.map((val, index) => (
          <li
            key={index}
            className="text-[18px] flex flex-col gap-1 text-gray-100 hover:text-white transition-colors duration-200"
          >
            <div className="flex items-center gap-2">
              <CheckIcon />
              {val !== undefined && val !== null ? val : "N/A"}
            </div>
            <span className="text-[14px] text-gray-300">
              {timestamps[index] || "Unknown Time"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );

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
                    <BreadcrumbPage className="text-white">
                      Soil Report
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div className="flex flex-row gap-2 items-center">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-8">
                  <div
                    onClick={generatePDF}
                    className="flex cursor-pointer items-center w-[135px] bg-transparent p-[6px] rounded-[8px] relative group hover:bg-[rgba(255,255,255,.025)] transition-colors ease-in-out duration-200 theme-color dashboard-header-gps"
                  >
                    <FileText className="h-5 w-5 text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff]" />
                    <span className="text-[14px] font-normal text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff] pl-[6px]">
                      Generate PDF
                    </span>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <div className="flex flex-row gap-2 items-center mr-[-10px]">
                    <NotificationsComponent />
                      <Separator orientation="vertical" className="mx-2 h-4" />
                        <NavUser user={data.user} />        
                  </div>
                  </div>
              </div>
              
            </div>
          </div>
        </header>

        <div ref={reportRef} className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {renderCard(
              "Temperature (°C)",
              sensorData.map((item) => item?.temperature?.toFixed(2) ?? "N/A"),
              sensorData.map((item) => item?.timestamp ?? "")
            )}
            {renderCard(
              "Humidity (%)",
              sensorData.map((item) => item?.humidity?.toFixed(2) ?? "N/A"),
              sensorData.map((item) => item?.timestamp ?? "")
            )}
            {renderCard(
              "AQI",
              sensorData.map((item) => item?.aqi?.toFixed(2) ?? "N/A"),
              sensorData.map((item) => item?.timestamp ?? "")
            )}
            {renderCard(
              "Heat Index",
              sensorData.map((item) => item?.hi?.toFixed(2) ?? "N/A"),
              sensorData.map((item) => item?.timestamp ?? "")
            )}
            {renderCard(
              "Altitude (m)",
              sensorData.map((item) => item?.alt?.toFixed(2) ?? "N/A"),
              sensorData.map((item) => item?.timestamp ?? "")
            )}
            {renderCard(
              "Pressure (hPa)",
              sensorData.map((item) => item?.pres?.toFixed(2) ?? "N/A"),
              sensorData.map((item) => item?.timestamp ?? "")
            )}
            {renderCard(
              "Moisture (%)",
              sensorData.map((item) => item?.moisture?.toFixed(2) ?? "N/A"),
              sensorData.map((item) => item?.timestamp ?? "")
            )}
            {renderCard(
              "Rain",
              sensorData.map((item) => {
                const raining = item?.raining;
                if (typeof raining === "number") {
                  return (raining as number).toFixed(2);
                } else if (typeof raining === "boolean") {
                  return raining ? "Yes" : "No";
                } else if (typeof raining === "string") {
                  return raining.charAt(0).toUpperCase() + raining.slice(1);
                } else {
                  return "N/A";
                }
              }),
              sensorData.map((item) => item?.timestamp ?? "")
            )}
            {renderCard(
              "Fertilizer",
              sensorData.map((item) => item?.recommended_fertilizer ?? "N/A"),
              sensorData.map((item) => item?.timestamp ?? "")
            )}
            {renderCard(
              "Nitrogen",
              sensorData.map(
                (item) => item?.npk_uptake_nitrogen?.toFixed(2) ?? "N/A"
              ),
              sensorData.map((item) => item?.timestamp ?? "")
            )}
            {renderCard(
              "Phosphorus",
              sensorData.map(
                (item) => item?.npk_uptake_phosphorus?.toFixed(2) ?? "N/A"
              ),
              sensorData.map((item) => item?.timestamp ?? "")
            )}
            {renderCard(
              "Potassium",
              sensorData.map(
                (item) => item?.npk_uptake_potassium?.toFixed(2) ?? "N/A"
              ),
              sensorData.map((item) => item?.timestamp ?? "")
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
