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
          <div className="w-full p-6 pt-0 space-y-6">
          <TracingBeam className="px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <Scheme
                  image="/schemes/PMKISAN.jpg"
                  link="https://pmkisan.gov.in/"
                  title="Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)"
                  description="Launched on February 24, 2019, PM-KISAN provides financial assistance of ₹6,000 annually in three equal installments to landholding farmers via Direct Benefit Transfer (DBT). Over ₹2.81 lakh crore has been disbursed to more than 11 crore beneficiaries."
                />
                <Scheme
                  image="/schemes/PM-KMY.jpg"
                  link="https://www.apagrisnet.gov.in/pdf/PMKMY%20Action%20Plan.pdf"
                  title="Pradhan Mantri Kisan Maandhan Yojana (PM-KMY)"
                  description="Started on September 12, 2019, PM-KMY is a pension scheme for small and marginal farmers. Participants contribute monthly until they reach 60, upon which they receive a ₹3,000 pension. The government matches the farmers' contributions. Around 23.38 lakh farmers have enrolled."
                />
                <Scheme
                  image="/schemes/PMFBY.jpg"
                  link="https://pmfby.gov.in/"
                  title="Pradhan Mantri Fasal Bima Yojana (PMFBY)"
                  description="Launched in 2016, PMFBY provides affordable crop insurance against natural risks. Since its inception, 5549.40 lakh farmer applications have been insured, with ₹1,50,589.10 crore paid out in claims."
                />
                <Scheme
                  image="/schemes/MISS.webp"
                  link="https://www.impriindia.com/insights/policy-update/modified-interest-subventionschememiss/"
                  title="Modified Interest Subvention Scheme (MISS)"
                  description="Provides short-term agricultural loans up to ₹3 lakh at 7% per annum for one year. Farmers repaying on time receive an additional 3% subvention, effectively reducing the interest rate to 4%. Covers post-harvest loans and extends benefits during calamities."
                />
                <Scheme
                  image="/schemes/AIF.jpg"
                  link="https://agriinfra.dac.gov.in/Home/"
                  title="Agriculture Infrastructure Fund (AIF)"
                  description="Part of the Aatmanirbhar Bharat Package, AIF supports post-harvest infrastructure and community farming assets with ₹1 lakh crore funding from FY 2020-21 to FY 2025-26. Offers 3% interest subvention and credit guarantees."
                />
                <Scheme
                  image="/schemes/RAFTAAR.jpg"
                  link="https://rkvy.da.gov.in/"
                  title="Rashtriya Krishi Vikas Yojana - RAFTAAR"
                  description="Approved on November 1, 2017, with a financial allocation of ₹15,722 crore, this scheme incentivizes states to increase agricultural investment."
                />
                <Scheme
                  image="/schemes/NBHM.jpg"
                  link="https://nbb.gov.in/default.html"
                  title="National Beekeeping & Honey Mission (NBHM)"
                  description="Promotes beekeeping and honey production to enhance agricultural productivity and create self-sustaining employment."
                />
                <Scheme
                  image="/schemes/FPOS.jpg"
                  link="https://10kfpomis.dac.gov.in/"
                  title="Formation and Promotion of 10,000 Farmer Producer Organizations (FPOs)"
                  description="Aims to organize farmers into collectives to improve bargaining power, market access, and income levels."
                />
                <Scheme
                  image="/schemes/NMEO-OP.webp"
                  link="https://nmeo.dac.gov.in/"
                  title="National Mission on Edible Oils – Oil Palm (NMEO-OP)"
                  description="Seeks to increase domestic edible oil production, particularly palm oil, reducing dependency on imports."
                />
                
                </div>
                <div className="p-4 pt-12 text-lg w-full">
                <span>
                  Learn more about these schemes and their benefits on the official websites of the Ministry of Agriculture and Farmers Welfare, Government of India:<br/>
                  <a href="https://agriwelfare.gov.in/en/Major" className="link-color pr-2 hover:underline">
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
                  <TextHoverEffect text="CROPSENSE" />
              </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
