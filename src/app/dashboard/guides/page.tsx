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
import { TracingBeam } from "@/components/tracingbeams";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

function Scheme({ title, description, link, image }: { title: string; description: string; link: string; image: string }) {
  return (
    <div className="p-4 bg-transparent rounded-xl shadow">
      <Image src={image} alt={title} width={1200} height={1200} className="w-full h-[350px] object-cover rounded-xl" />
      <h2 className="text-[28px] font-semibold font-rebond scheme-title">{title}</h2>
      <p className="text-[#ffffffc7] mt-2 text-base mb-4">{description}</p>
      <Link href={link}>
      <Button>Learn more</Button>
      </Link>
    </div>
  );
}

export default function Page() {
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
                    <BreadcrumbPage>Government Schemes</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="w-full p-6 pt-0 space-y-6">
          <TracingBeam className="px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <Scheme
                  image="/schemes/PMKISAN.jpg"
                  link="https://pmkisan.gov.in/"
                  title="Soil Preparation and Testing Guide"
                  description="Learn how to assess and improve your soil for better crop yields. This guide covers testing methods, interpreting results, and choosing the right soil amendments for your farm."
                />
                <Scheme
                  image="/schemes/PM-KMY.jpg"
                  link="https://www.apagrisnet.gov.in/pdf/PMKMY%20Action%20Plan.pdf"
                  title="Seasonal Planting Calendar (Region-Specific)"
                  description="This guide provides a practical month-by-month planting schedule tailored to your region's climate. Discover the best times to plant, rotate, and harvest different crops."
                />
                <Scheme
                  image="/schemes/PMFBY.jpg"
                  link="https://pmfby.gov.in/"
                  title="Integrated Pest and Disease Management (IPM)"
                  description="Protect your crops with sustainable pest and disease control strategies. Learn how to identify common issues early and apply natural or chemical solutions effectively."
                />
                <Scheme
                  image="/schemes/MISS.webp"
                  link="https://www.impriindia.com/insights/policy-update/modified-interest-subventionschememiss/"
                  title="Irrigation and Water Conservation Guide"
                  description="Master the basics of efficient irrigation systems, from drip lines to sprinklers. This guide also includes water-saving techniques to help you farm smarter during dry seasons."
                />
                <Scheme
                  image="/schemes/AIF.jpg"
                  link="https://agriinfra.dac.gov.in/Home/"
                  title="Harvesting and Post-Harvest Handling"
                  description="Improve the quality and shelf life of your crops with proper harvesting and storage practices. Reduce losses and maximize profits through careful post-harvest handling."
                />
                <Scheme
                  image="/schemes/RAFTAAR.jpg"
                  link="https://rkvy.da.gov.in/"
                  title="Livestock Health and Nutrition Guide"
                  description="Keep your animals healthy and productive with essential tips on feeding, housing, and disease prevention. Includes vaccination schedules and basic veterinary care."
                />
                <Scheme
                  image="/schemes/NBHM.jpg"
                  link="https://nbb.gov.in/default.html"
                  title="Farm Record Keeping and Budgeting"
                  description="Stay organized and make informed decisions using simple farm records and budgets. This guide provides templates for tracking expenses, yields, and profits."
                />
                <Scheme
                  image="/schemes/FPOS.jpg"
                  link="https://10kfpomis.dac.gov.in/"
                  title="Organic and Compost Farming Techniques"
                  description="Go green with natural farming methods. Learn how to make compost, use organic fertilizers, and manage pests without chemicals for healthier soil and crops."
                />
                <Scheme
                  image="/schemes/NMEO-OP.webp"
                  link="https://nmeo.dac.gov.in/"
                  title="Agribusiness and Market Access Guide"
                  description="Turn your farm into a profitable business. Discover how to find buyers, set prices, and market your products—plus tips on value addition and cooperative selling."
                />
                <Scheme
                  image="/schemes/NMEO-OP.webp"
                  link="https://nmeo.dac.gov.in/"
                  title="Climate-Smart and Resilient Farming Practices"
                  description="Adapt to changing weather patterns with sustainable and resilient farming techniques. This guide covers drought-tolerant crops, soil moisture conservation, and methods to reduce the impact of floods, pests, and unpredictable seasons."
                />
                
                </div>
                <div className="p-4 pt-12 items-center text-center text-lg w-full">
                <span>
                  Learn more about these schemes and their benefits on the official websites of the Ministry of Agriculture and Farmers Welfare, Government of India:<br/>
                  <a href="https://agriwelfare.gov.in/en/Major" className="link-color text-center pr-2 hover:underline">
                    Ministry Major Schemes
                  </a>
                  |
                  <a href="https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2002012" className="link-color pl-2 hover:underline">
                    Schemes for Welfare of Farmers
                  </a>
                </span>
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
