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
import ChatBox from "@/components/chatbox";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { NavUser } from "@/components/nav-user";
import { Bell } from "lucide-react";


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
                    <BreadcrumbPage className="text-white">Forums</BreadcrumbPage>
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
          
          <ChatBox />
          
          
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
