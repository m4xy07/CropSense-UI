"use client";

import { useEffect, useState } from "react";
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
  const [currentTime, setCurrentTime] = useState<string>("");
  const [altitude, setAltitude] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
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
          const latestMonthData =
            latestRecord.harvestable_months[latestRecord.harvestable_months.length - 1];

          setAltitude(parseFloat(latestRecord?.alt?.toFixed(2)));

          setChartData({
            chartData: [
              {
                label: "Wholesale",
                price: parseFloat(latestMonthData.wholesale_price.toFixed(2)),
              },
              {
                label: "Retail",
                price: parseFloat(latestMonthData.retail_price.toFixed(2)),
              },
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

  const equipmentList = [
    {
      name: "Tractor",
      image: "/tract.jpg",
      rate: "₹3,500/day",
      details: [
        "Model: Mahindra 575 DI XP Plus",
        "Engine: 45 HP, 4-cylinder",
        "Transmission: 8F + 2R",
        "Fuel Capacity: 60 L",
      ],
    },
    {
      name: "Tractor",
      image: "/blue-and-white-mild-steel-35hp-swaraj-735-fe-tractor-for-agricultural-usage-47-liter-fuel-tank-capacity--819.jpg",
      rate: "₹2,800/day",
      details: [
        "Model: Swaraj 735 FE",
        "Engine: 40 HP, 3-cylinder",
        "Transmission: 8F + 2R",
        "Fuel Capacity: 48 L",
      ],
    },
    {
      name: "Tractor",
      image: "/b3d23e0ccad7bbbac6f01fe9aa8bb332.jpg",
      rate: "₹4,200/day",
      details: [
        "Model: John Deere 5050D",
        "Engine: 50 HP, 3-cylinder",
        "Transmission: 8F + 4R",
        "Fuel Capacity: 60 L",
      ],
    },
    {
      name: "Cultivator",
      image: "/culti.jpg",
      rate: "₹1,500/day",
      details: [
        "Type: 9-Tyne Spring Loaded",
        "Width: 7 ft",
        "Depth: Up to 12 in",
        "Required HP: 35-45",
      ],
    },
    {
      name: "Cultivator",
      image: "/11-tyne-rigid-cultivator-932.jpg",
      rate: "₹1,800/day",
      details: [
        "Type: 11-Tyne Rigid",
        "Width: 8 ft",
        "Depth: 14 in",
        "Required HP: 45-55",
      ],
    },
    {
      name: "Plough",
      image: "/sddefault.jpg",
      rate: "₹1,000/day",
      details: [
        "Type: MB Reversible",
        "No. of Bottoms: 2",
        "Width: 16 in/bottom",
        "Required HP: 35-40",
      ],
    },
    {
      name: "Harvester",
      image: "/harves.jpg",
      rate: "₹5,000/day",
      details: [
        "Model: John Deere S740",
        "Engine: 248 HP",
        "Grain Tank: 10,600 L",
        "Header Width: 6.1 m",
      ],
    },
    {
      name: "Seeder",
      image: "/seeder.jpg",
      rate: "₹1,200/day",
      details: [
        "Type: Zero Till Seeder",
        "Working Width: 5 ft",
        "Rows: 9",
        "Required HP: 35+",
      ],
    },
    {
      name: "Sprayer",
      image: "/61EJ3SYjKlL.jpg",
      rate: "₹800/day",
      details: [
        "Capacity: 16 L",
        "Type: Knapsack",
        "Pump: Manual",
        "Use: Pesticide & Fertilizer",
      ],
    },
    {
      name: "Rotavator",
      image: "/Shriram_Associate_Shaktiman_6_Feet_Rotavator_2_874x.jpg",
      rate: "₹2,000/day",
      details: [
        "Working Width: 6 ft",
        "Blades: 42",
        "HP Required: 40-55",
        "Used For: Tillage",
      ],
    },
    {
      name: "Baler",
      image: "/baler.jpg",
      rate: "₹3,000/day",
      details: [
        "Type: Round Baler",
        "Bale Size: 4x4 ft",
        "Capacity: 30-50 bales/hr",
        "Required HP: 45+",
      ],
    },
  ];

  const filteredEquipment = equipmentList.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SidebarProvider className="dark font-inter">
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 bg-[#000102] text-white">
          <div className="flex justify-between w-full pr-4">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/dashboard" className="text-white">
                      Dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-white">Equipment</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>
        </header>

        <div className="bg-[#010308] min-h-screen p-4">
          <div className="bg-[#020408] shadow-md rounded-lg p-4 mb-4 flex items-center gap-4">
            <div className="relative w-1/2">
              <input
                type="text"
                placeholder="Search equipment..."
                className="w-full border bg-[#02040a] text-white rounded-md p-2 pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid auto-rows-min gap-4 md:grid-cols-4">
            {filteredEquipment.map((item, index) => (
              <div
                key={index}
                className="bg-[#010204] shadow-md rounded-lg p-4 border border-gray-700"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-32 object-cover rounded-md"
                />
                <h3 className="text-lg font-bold mt-2 text-white">{item.name}</h3>
                <p className="text-sm text-gray-400">{item.rate}</p>
                <div className="mt-2 text-xs text-gray-400 space-y-1">
                  {item.details.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
                <button className="mt-2 w-full bg-[#2563eb] text-white py-1 rounded-md hover:bg-[#1d4ed8]">
                  Rent Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
