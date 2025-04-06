"use client";

import { useEffect, useState, useRef } from "react";
import html2pdf from "html2pdf.js";
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

const API_URL = "https://data.cropsense.tech/data";

export default function Page() {
  const [sensorData, setSensorData] = useState<any[]>([]);
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        const latestThree = data.slice(-3).reverse().map((item) => ({
          ...item,
          timestamp: item.time ? new Date(item.time).toLocaleString() : "No Timestamp Available",
        }));

        setSensorData(latestThree);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const generatePDF = () => {
    const element = reportRef.current;
    if (!element) return;

    const opt = {
      margin: 0.5,
      filename: `Soil_Report_${new Date().toISOString()}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  const renderCard = (title: string, values: (string | number | null | undefined)[], timestamps: (string | undefined)[]) => (
    <div className="rounded-xl bg-muted/50 p-4 shadow-md min-w-[280px] flex-1 border border-gray-600 hover:border-gray-400 transition-colors duration-200">
      <h2 className="text-xl font-bold mb-1 text-gray-200">{title}</h2>
      <h4 className="text-muted-foreground mb-2 text-gray-400">Latest readings</h4>
      <ul className="space-y-1">
        {values.map((val, index) => (
          <li
            key={index}
            className="text-sm flex flex-col gap-1 text-gray-300 hover:text-white transition-colors duration-200"
          >
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {val !== undefined && val !== null ? val : "N/A"}
            </div>
            <span className="text-xs text-gray-400">{timestamps[index] || "Unknown Time"}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <SidebarProvider className="dark font-inter">
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
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Soil Report</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <button
              onClick={generatePDF}
              className="ml-auto px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Generate PDF
            </button>
          </div>
        </header>

        <div ref={reportRef} className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {renderCard(
              "Temperature (°C)",
              sensorData.map((item) => item?.temperature?.toFixed(2) ?? "N/A"),
              sensorData.map((item) => item?.timestamp ?? "")
            )}
            {renderCard("Humidity (%)", sensorData.map((item) => item?.humidity ?? "N/A"), sensorData.map((item) => item?.timestamp ?? ""))}
            {renderCard("AQI", sensorData.map((item) => item?.aqi ?? "N/A"), sensorData.map((item) => item?.timestamp ?? ""))}
            {renderCard("Heat Index", sensorData.map((item) => item?.hi ?? "N/A"), sensorData.map((item) => item?.timestamp ?? ""))}
            {renderCard("Altitude (m)", sensorData.map((item) => item?.alt ?? "N/A"), sensorData.map((item) => item?.timestamp ?? ""))}
            {renderCard("Pressure (hPa)", sensorData.map((item) => item?.pres ?? "N/A"), sensorData.map((item) => item?.timestamp ?? ""))}
            {renderCard("Moisture (%)", sensorData.map((item) => item?.moisture ?? "N/A"), sensorData.map((item) => item?.timestamp ?? ""))}
            {renderCard("Raining", sensorData.map((item) => item?.raining ?? "N/A"), sensorData.map((item) => item?.timestamp ?? ""))}
            {renderCard("Fertilizer", sensorData.map((item) => item?.recommended_fertilizer ?? "N/A"), sensorData.map((item) => item?.timestamp ?? ""))}
            {renderCard("NPK Nitrogen", sensorData.map((item) => item?.npk_uptake_nitrogen ?? "N/A"), sensorData.map((item) => item?.timestamp ?? ""))}
            {renderCard("NPK Phosphorus", sensorData.map((item) => item?.npk_uptake_phosphorus ?? "N/A"), sensorData.map((item) => item?.timestamp ?? ""))}
            {renderCard("NPK Potassium", sensorData.map((item) => item?.npk_uptake_potassium ?? "N/A"), sensorData.map((item) => item?.timestamp ?? ""))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
