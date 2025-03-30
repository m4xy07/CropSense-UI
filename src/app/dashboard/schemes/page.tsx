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

function Scheme({ title, description }) {
  return (
    <div className="p-4 bg-transparent rounded-xl shadow">
      <h2 className="text-[28px] font-semibold font-rebond scheme-title">{title}</h2>
      <p className="text-[#ffffffc7] mt-2 text-base">{description}</p>
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
                    <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
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
        <div className="max-w-5xl p-6 pt-0 space-y-6">
      
      
      <div className="space-y-4">
        <Scheme
          title="Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)"
          description="Launched on February 24, 2019, PM-KISAN provides financial assistance of ₹6,000 annually in three equal installments to landholding farmers via Direct Benefit Transfer (DBT). Over ₹2.81 lakh crore has been disbursed to more than 11 crore beneficiaries."
        />
        
        <Scheme
          title="Pradhan Mantri Kisan Maandhan Yojana (PM-KMY)"
          description="Started on September 12, 2019, PM-KMY is a pension scheme for small and marginal farmers. Participants contribute monthly until they reach 60, upon which they receive a ₹3,000 pension. The government matches the farmers' contributions. Around 23.38 lakh farmers have enrolled."
        />
        
        <Scheme
          title="Pradhan Mantri Fasal Bima Yojana (PMFBY)"
          description="Launched in 2016, PMFBY provides affordable crop insurance against natural risks. Since its inception, 5549.40 lakh farmer applications have been insured, with ₹1,50,589.10 crore paid out in claims."
        />
        
        <Scheme
          title="Modified Interest Subvention Scheme (MISS)"
          description="Provides short-term agricultural loans up to ₹3 lakh at 7% per annum for one year. Farmers repaying on time receive an additional 3% subvention, effectively reducing the interest rate to 4%. Covers post-harvest loans and extends benefits during calamities."
        />
        
        <Scheme
          title="Agriculture Infrastructure Fund (AIF)"
          description="Part of the Aatmanirbhar Bharat Package, AIF supports post-harvest infrastructure and community farming assets with ₹1 lakh crore funding from FY 2020-21 to FY 2025-26. Offers 3% interest subvention and credit guarantees."
        />
        
        <Scheme
          title="Rashtriya Krishi Vikas Yojana - RAFTAAR"
          description="Approved on November 1, 2017, with a financial allocation of ₹15,722 crore, this scheme incentivizes states to increase agricultural investment."
        />
        
        <Scheme
          title="National Beekeeping & Honey Mission (NBHM)"
          description="Promotes beekeeping and honey production to enhance agricultural productivity and create self-sustaining employment."
        />
        
        <Scheme
          title="Formation and Promotion of 10,000 Farmer Producer Organizations (FPOs)"
          description="Aims to organize farmers into collectives to improve bargaining power, market access, and income levels."
        />
        
        <Scheme
          title="National Mission on Edible Oils – Oil Palm (NMEO-OP)"
          description="Seeks to increase domestic edible oil production, particularly palm oil, reducing dependency on imports."
        />
      </div>
      <div className="p-4">
        <span>
          Learn more about these schemes and their benefits on the official websites of the Ministry of Agriculture and Farmers Welfare, Government of India:
          <a href="https://agriwelfare.gov.in/en/Major" className="link-color hover:underline"> Ministry Major Schemes </a>
          |
          <a href="https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2002012" className="link-color hover:underline"> Schemes for Welfare of Farmers</a>
        </span>
      </div>
    </div>
  
          
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
