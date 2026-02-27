"use client";

import { ReactNode, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { AlertTriangle, Camera, Check, CheckCheck, FlaskConicalOff, MailWarning } from "lucide-react";

import { AppSidebar } from "@/components/app-sidebar";
import NotificationsComponent from "@/components/comp-383";
import { NavUser } from "@/components/nav-user";
import { CropHealthChart } from "@/components/dashboard/areachart";
import RoutineTable from "@/components/dashboard/routinetable";
import { SoilMoistureKPI } from "@/components/dashboard/soilmoisturekpi";
import StatusTracker from "@/components/dashboard/statuscheck";
import WorkerTable from "@/components/dashboard/workertable";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

type AlertItem = {
  icon: ReactNode;
  msg: string;
  time: string;
};

const initialAlerts: AlertItem[] = [
  {
    icon: <AlertTriangle className="text-yellow-400 size-5" />,
    msg: "No irrigation detected in Plot 3 despite soil moisture being less than 40% - urgent action required",
    time: "Today, 6:30 AM",
  },
  {
    icon: <FlaskConicalOff className="text-red-500 size-5" />,
    msg: "Fertilizer not applied on schedule - soil nutrient levels critical",
    time: "Yesterday, 8:00 PM",
  },
  {
    icon: <Camera className="text-blue-400 size-5" />,
    msg: "Crop stress detected via camera feed - requires inspection",
    time: "Yesterday, 3:15 PM",
  },
];

export default function WorkerMonitorPage() {
  const { user } = useUser();

  const data = {
    user: {
      name: user?.fullName || "Guest",
      email: user?.primaryEmailAddress?.emailAddress || "guest@example.com",
      avatar: user?.imageUrl || "/avatars/default.jpg",
    },
  };

  const [acknowledged, setAcknowledged] = useState<Record<string, boolean>>({});
  const [alertsList, setAlertsList] = useState(initialAlerts);
  const [allAcknowledged, setAllAcknowledged] = useState(false);
  const [alertFade, setAlertFade] = useState<Record<string, boolean>>({});
  const [containerFade, setContainerFade] = useState(false);
  const [ackAllDisabled, setAckAllDisabled] = useState(false);

  const handleAcknowledgeAll = () => {
    const fadeObj: Record<string, boolean> = {};
    const ackObj: Record<string, boolean> = {};

    alertsList.forEach((alert) => {
      fadeObj[alert.msg] = true;
      ackObj[alert.msg] = true;
    });

    setAlertFade(fadeObj);
    setAckAllDisabled(true);

    setTimeout(() => {
      setAlertsList([]);
      setAcknowledged(ackObj);
      setAllAcknowledged(true);
      setContainerFade(true);
      setAlertFade({});
    }, 400);
  };

  const handleAcknowledge = (index: number) => {
    const msg = alertsList[index].msg;
    setAlertFade((prev) => ({ ...prev, [msg]: true }));

    setTimeout(() => {
      setAlertsList((prev) => prev.filter((_, currentIndex) => currentIndex !== index));
      setAcknowledged((prev) => ({ ...prev, [msg]: true }));
      if (alertsList.length === 1) {
        setAllAcknowledged(true);
        setContainerFade(true);
        setAckAllDisabled(true);
        setAlertFade({});
      }
    }, 400);
  };

  useEffect(() => {
    if (alertsList.length > 0) {
      setAckAllDisabled(false);
      setContainerFade(false);
      setAllAcknowledged(false);
    }
  }, [alertsList]);

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
                    <BreadcrumbPage className="text-white">Workers</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div className="flex flex-row gap-2 items-center mr-[-10px]">
              <NotificationsComponent />
              <Separator orientation="vertical" className="mx-2 h-4" />
              <NavUser user={data.user} />
            </div>
          </div>
        </header>

        <div className="flex flex-col gap-[1.25rem] p-4 main-dashboard-second-part-theme theme-color min-h-screen">
          <Card className="equipment-card-inner border border-zinc-50/10 rounded-xl !p-0">
            <div className="flex flex-row justify-between px-5 py-4 border-b border-b-zinc-50/10 rounded-t-xl">
              <h2 className="text-[18px] font-normal mt-1">Worker Management</h2>
            </div>
            <WorkerTable />
          </Card>

          <div className="flex flex-row gap-[1.25rem]">
            <StatusTracker />
            <CropHealthChart />
            <SoilMoistureKPI />
          </div>

          <Card className="equipment-card-inner border border-zinc-50/10 rounded-xl p-0 overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-row justify-between px-5 py-4 border-b border-b-zinc-50/10 rounded-t-xl">
                <h2 className="text-[18px] font-normal mt-1">Active Problems</h2>
                <div
                  className={`flex items-center w-fit bg-transparent py-[6px] px-[10px] rounded-[8px] relative group transition-colors ease-in-out duration-200 theme-color dashboard-header-gps ${ackAllDisabled ? "opacity-50 pointer-events-none" : "cursor-pointer hover:bg-[rgba(255,255,255,.025)]"}`}
                  onClick={ackAllDisabled ? undefined : handleAcknowledgeAll}
                >
                  <CheckCheck className="h-4 w-4 text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff]" />
                  <span className="text-[14px] font-normal text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff] pl-[6px]">
                    Acknowledge all
                  </span>
                </div>
              </div>

              <div
                className={`flex flex-col gap-4 px-5 py-4 min-h-[60px] transition-all duration-500 ease-in-out ${containerFade && alertsList.length === 0 ? "alert-container-fade-out" : ""}`}
                style={{
                  height: alertsList.length === 0 && allAcknowledged ? 0 : undefined,
                  paddingTop: alertsList.length === 0 && allAcknowledged ? 0 : undefined,
                  paddingBottom: alertsList.length === 0 && allAcknowledged ? 0 : undefined,
                }}
              >
                {alertsList.length === 0 && allAcknowledged ? (
                  <div className="flex items-center justify-center w-full h-[60px] text-white text-base alert-fade-in">
                    No actions required.
                  </div>
                ) : (
                  alertsList.map((alert, index) => (
                    <div
                      key={alert.msg}
                      className={`flex items-center gap-3 p-3 smart-alert-theme color-theme transition-transform duration-400 ease-in-out ${alertFade[alert.msg] ? "alert-fade-out-right" : ""}`}
                    >
                      {alert.icon}
                      <div className="flex-1 text-white text-sm">{alert.msg}</div>
                      <div className="text-xs text-gray-400 mr-2">{alert.time}</div>
                      <Button
                        size="sm"
                        className="mr-1 gap-0 equipment-btn transition-all rent-now-btn text-neutral-50 font-normal !rounded-md"
                        onClick={() => handleAcknowledge(index)}
                        disabled={!!acknowledged[alert.msg]}
                      >
                        <Check className="h-4 w-4 text-[rgba(255,255,255,.9)] mr-[6px]" />
                        Acknowledge
                      </Button>
                      <Button
                        size="sm"
                        className="font-normal gap-0 alert-notification-theme border border-zinc-50/10 text-neutral-50 hover:text-white transition-all duration-200 ease-in-out bg-red-800/80 hover:bg-red-700"
                      >
                        <MailWarning className="h-4 w-4 text-[rgba(255,255,255,.9)] mr-[6px]" />
                        Issue Warning
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="equipment-card-inner border border-zinc-50/10 rounded-xl !p-0">
            <div className="flex flex-row justify-between px-5 py-4 border-b border-b-zinc-50/10 rounded-t-xl">
              <h2 className="text-[18px] font-normal mt-1">Routine Management</h2>
            </div>
            <RoutineTable />
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
