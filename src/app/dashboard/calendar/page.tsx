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
                    <BreadcrumbPage>Calendar</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="w-full p-6 pt-0 space-y-6">
            
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
