"use client";

import { useState } from "react";
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
import Button from "@/components/Button";
import { equipmentList } from "@/data/equipment/equipmentdata";
import CheckIcon from "@/assets/check.svg";

export default function Page() {
  
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<string>("default");
  
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
    <SidebarProvider className="dark main-dashboard-theme theme-color font-inter">
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2  text-white theme-color main-topbar-theme">
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
                
                <div className="flex items-center bg-[#1e293b] px-4 py-1.5 rounded-full relative group hover:bg-[#2563eb] transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400 group-hover:text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-[14px] font-semibold text-blue-100 group-hover:text-white">Near your location</span>
                  <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 w-max bg-gray-800 text-white text-sm rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Within 3 km
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="main-dashboard-second-part-theme theme-color min-h-screen p-4">
          <div className="bg-transparent rounded-lg mb-4 flex flex-wrap items-center gap-4">
            <div className="relative w-full md:w-1/2">
              <input
                type="text"
                placeholder="Search equipment"
                className="w-full border !border-zinc-50/10 bg-[rgba(255,255,255,.025)] text-white rounded-md p-2 pl-4 "
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
                  className="w-full text-[14px] appearance-none bg-[#0a0118] text-white border !border-zinc-50/10 rounded-md py-2 pl-4 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={maxPrice || ""}
                  onChange={(e) =>
                    setMaxPrice(e.target.value ? parseInt(e.target.value) : null)
                  }
                >
                  <option value="">Max price (Any)</option>
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
                  className="w-full appearance-none text-[14px] bg-[#0a0118] text-white border !border-zinc-50/10 rounded-md py-2 pl-4 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="default">Sort by</option>
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
                className="bg-[#010204] equipment-card-inner shadow-md rounded-lg p-4 border border-zinc-50/10 "
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-36 object-cover rounded-md"
                />
                <h3 className=" mt-4 -mb-2 text-white font-semibold text-[26px] tracking-normal effect-font-gradient">{item.name}</h3>
                <p className="text-xl pricing-card-btn-amount mb-2">{item.rate}</p>
                <Button>
                  Rent now
                </Button>
                <div className="p-6 pb-0 pricing-card-top-div relative" />
                
                <hr className="hr-fade" />
                <div className="mt-4 text-[#d2d0dd] text-sm font-inter tracking-[-.14px] space-y-2 pb-4">
                  {item.details.map((line, i) => (
                    <p key={i} className="flex items-start gap-2">
                      <CheckIcon />
                      {line}
                    </p>
                  ))}
                </div>
                
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
                Reset filters
              </button>
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}