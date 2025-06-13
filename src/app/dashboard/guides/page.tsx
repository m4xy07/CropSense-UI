"use client";

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
import { TracingBeam } from "@/components/tracingbeams";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { NavUser } from "@/components/nav-user";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";

function Scheme({ title, description, link, image }: { title: string; description: string; link: string; image: string }) {
  return (
    <div className="p-4 bg-transparent rounded-xl">
      <Image src={image} alt={title} width={1200} height={1200} className="w-full h-[350px] object-cover rounded-xl" />
      <h2 className="text-[28px] font-semibold font-inter scheme-title">{title}</h2>
      <p className="text-[#ffffffc7] mt-2 text-base mb-4">{description}</p>
      <Link href={link}>
      <Button>Learn more</Button>
      </Link>
    </div>
  );
}

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
                    <BreadcrumbPage className="text-white">Government Schemes</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <div className="relative hover:bg-[rgba(255,255,255,0.025)] group p-[6px] rounded-md flex flex-row items-center cursor-pointer transition-all duration-200 ease-in-out">
                <div className="h-[10px] w-[10px] rounded-full bg-[#f4af29] alert-animation absolute top-0 right-0" />
                <Bell className="w-[18px] h-[18px] text-[rgba(255,255,255,.75)] group-hover:text-[#fff] transition-all duration-200 ease-in-out" />
              </div>
              <Separator orientation="vertical" className="mx-2 h-4" />      
              <NavUser user={data.user} />
            </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="w-full p-6 pt-0 space-y-6">
          <TracingBeam className="px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <Scheme
                  image="/guides/SoilPrep.webp"
                  link="https://pmkisan.gov.in/"
                  title="Soil Preparation and Testing Guide"
                  description="Learn how to assess and improve your soil for better crop yields. This guide covers testing methods, interpreting results, and choosing the right soil amendments for your farm."
                />
                <Scheme
                  image="/guides/SeasonalPlanting.webp"
                  link="https://www.apagrisnet.gov.in/pdf/PMKMY%20Action%20Plan.pdf"
                  title="Seasonal Planting Calendar (Region-Specific)"
                  description="This guide provides a practical month-by-month planting schedule tailored to your region's climate. Discover the best times to plant, rotate, and harvest different crops."
                />
                <Scheme
                  image="/guides/PestManagement.jpg"
                  link="https://pmfby.gov.in/"
                  title="Integrated Pest and Disease Management (IPM)"
                  description="Protect your crops with sustainable pest and disease control strategies. Learn how to identify common issues early and apply natural or chemical solutions effectively."
                />
                <Scheme
                  image="/guides/Irrigation.png"
                  link="https://www.impriindia.com/insights/policy-update/modified-interest-subventionschememiss/"
                  title="Irrigation and Water Conservation Guide"
                  description="Master the basics of efficient irrigation systems, from drip lines to sprinklers. This guide also includes water-saving techniques to help you farm smarter during dry seasons."
                />
                <Scheme
                  image="/guides/PostHarvest.jpg"
                  link="https://agriinfra.dac.gov.in/Home/"
                  title="Harvesting and Post-Harvest Handling"
                  description="Improve the quality and shelf life of your crops with proper harvesting and storage practices. Reduce losses and maximize profits through careful post-harvest handling."
                />
                <Scheme
                  image="/guides/Livestock.jpg"
                  link="https://rkvy.da.gov.in/"
                  title="Livestock Health and Nutrition Guide"
                  description="Keep your animals healthy and productive with essential tips on feeding, housing, and disease prevention. Includes vaccination schedules and basic veterinary care."
                />
                <Scheme
                  image="/guides/FarmRecord.webp"
                  link="https://nbb.gov.in/default.html"
                  title="Farm Record Keeping and Budgeting"
                  description="Stay organized and make informed decisions using simple farm records and budgets. This guide provides templates for tracking expenses, yields, and profits."
                />
                <Scheme
                  image="/guides/Compost.webp"
                  link="https://10kfpomis.dac.gov.in/"
                  title="Organic and Compost Farming Techniques"
                  description="Go green with natural farming methods. Learn how to make compost, use organic fertilizers, and manage pests without chemicals for healthier soil and crops."
                />
                <Scheme
                  image="/guides/Market.jpg"
                  link="https://nmeo.dac.gov.in/"
                  title="Agribusiness and Market Access Guide"
                  description="Turn your farm into a profitable business. Discover how to find buyers, set prices, and market your products—plus tips on value addition and cooperative selling."
                />
                <Scheme
                  image="/guides/Agriculture.jpeg"
                  link="https://nmeo.dac.gov.in/"
                  title="Climate-Smart and Resilient Farming Practices"
                  description="Adapt to changing weather patterns with sustainable and resilient farming techniques. This guide covers drought-tolerant crops, soil moisture conservation, and methods to reduce the impact of floods, pests, and unpredictable seasons."
                />
                
                </div>
                
                </TracingBeam>

              
              <div className="h-fit w-full flex items-center justify-center">
                  <TextHoverEffect text="CropSense" />
              </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
