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
import { ClockIcon } from "lucide-react";
import Button from "@/components/Button";

const API_URL = "https://data.cropsense.tech/data";

export default function Page() {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [altitude, setAltitude] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<string>("default");
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
    {
      name: "Oxes",
      image: "/oxes.jpg",
      rate: "₹500/hour",
      details: [
        "Weight: 600–900 kg",
        "Height: ~150 cm",
        "Pull Capacity: High",
        "Use: Cart & Plough"
      ],
    }
    
  ];

  const filteredEquipment = equipmentList
    .filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const priceNumber = parseInt(item.rate.replace(/[^\d]/g, ""));
      const matchesPrice = maxPrice === null || priceNumber <= maxPrice;
      return matchesSearch && matchesPrice;
    })
    .sort((a, b) => {
      // Extract price numbers for sorting
      const priceA = parseInt(a.rate.replace(/[^\d]/g, ""));
      const priceB = parseInt(b.rate.replace(/[^\d]/g, ""));
      
      if (sortOrder === "price_low") {
        return priceA - priceB;
      } else if (sortOrder === "price_high") {
        return priceB - priceA;
      } else if (sortOrder === "name_asc") {
        return a.name.localeCompare(b.name);
      } else if (sortOrder === "name_desc") {
        return b.name.localeCompare(a.name);
      }
      return 0; // Default, no sorting
    });

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
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-8">
                <div className="flex flex-row items-center gap-2 w-[88px]">
                <ClockIcon className="w-5 h-5" /> <div className="text-white text-sm w-[64px]">{currentTime}</div>
              </div>
                <div className="flex items-center bg-[#1e293b] px-4 py-1.5 rounded-full relative group hover:bg-[#2563eb] transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400 group-hover:text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-base font-semibold text-blue-100 group-hover:text-white">Near your location</span>
                  <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 w-max bg-gray-800 text-white text-sm rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Within 3 km
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="bg-[#010308] min-h-screen p-4">
          <div className="bg-[#020408] shadow-md rounded-lg p-4 mb-4 flex flex-wrap items-center gap-4">
            <div className="relative w-full md:w-1/2">
              <input
                type="text"
                placeholder="Search equipment..."
                className="w-full border border-gray-700 bg-[#02040a] text-white rounded-md p-2 pl-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  onClick={() => setSearchQuery("")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
            </div>

            <div className="flex w-full md:w-auto gap-4">
              <div className="relative">
                <select
                  className="w-full appearance-none bg-[#02040a] text-white border border-gray-700 rounded-md py-2 pl-4 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={maxPrice || ""}
                  onChange={(e) =>
                    setMaxPrice(e.target.value ? parseInt(e.target.value) : null)
                  }
                >
                  <option value="">Max Price (Any)</option>
                  <option value="1000">Under ₹1,000</option>
                  <option value="2000">Under ₹2,000</option>
                  <option value="3000">Under ₹3,000</option>
                  <option value="4000">Under ₹4,000</option>
                  <option value="5000">Under ₹5,000</option>
                  <option value="10000">Under ₹10,000</option>
                </select>
              </div>

              <div className="relative">
                <select
                  className="w-full appearance-none bg-[#02040a] text-white border border-gray-700 rounded-md py-2 pl-4 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="default">Sort By</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="name_asc">Name: A-Z</option>
                  <option value="name_desc">Name: Z-A</option>
                </select>
                
              </div>
            </div>
          </div>

          <div className="grid auto-rows-min gap-4 md:grid-cols-4">
            {filteredEquipment.map((item, index) => (
              <div
                key={index}
                className="bg-[#010204] shadow-md rounded-lg p-4 border border-gray-700 hover:border-blue-500 transition-all duration-200"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-36 object-cover rounded-md"
                />
                <h3 className="text-lg font-bold mt-2 text-white">{item.name}</h3>
                <p className="text-sm text-blue-400 font-semibold">{item.rate}</p>
                <div className="mt-2 text-xs text-gray-400 space-y-1.5 pb-4">
                  {item.details.map((line, i) => (
                    <p key={i} className="flex items-start">
                      <svg className="h-3 w-3 text-blue-500 mr-1.5 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {line}
                    </p>
                  ))}
                </div>
                <Button>
                  Rent now
                </Button>
              </div>
            ))}
          </div>
          
          {filteredEquipment.length === 0 && (
            <div className="bg-[#010204] p-8 rounded-lg text-center">
              <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-white mt-4">No equipment found</h3>
              <p className="text-gray-400 mt-2">Try adjusting your search or filter criteria</p>
              <button 
                className="mt-4 bg-[#2563eb] text-white py-2 px-4 rounded-md hover:bg-[#1d4ed8]"
                onClick={() => {
                  setSearchQuery("");
                  setMaxPrice(null);
                  setSortOrder("default");
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}