"use client";

import React, { useState, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Star,
  AlertTriangle,
  CheckCircle,
  XCircle,
  User,
  Clock,
  Camera,
  MessageCircle,
  Bell,
  MapPin,
  Upload,
  Check,
  FlaskConicalOff,
  CheckCheck,
  MailWarning,
} from "lucide-react";
import Image from "next/image";
import { NavUser } from "@/components/nav-user";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useUser } from "@clerk/nextjs";
import WorkerTable from "@/components/dashboard/workertable";
import NotificationsComponent from "@/components/comp-383";
import StatusTracker from "@/components/dashboard/statuscheck";
import { CropHealthChart } from "@/components/dashboard/areachart";
import { SoilMoistureKPI } from "@/components/dashboard/soilmoisturekpi";

// Sample Data
const workers = [
  {
    name: "Ravi Kumar",
    photo: "/avatar1.jpg",
    area: "Plot A",
    tasksToday: ["Watering", "Weeding"],
    completion: 80,
    lastCheckIn: "7:45 AM",
    score: 4.5,
  },
  {
    name: "Sunita Devi",
    photo: "/avatar2.jpg",
    area: "Plot B",
    tasksToday: ["Spraying", "Soil Test"],
    completion: 60,
    lastCheckIn: "8:10 AM",
    score: 3.8,
  },
  {
    name: "Amit Singh",
    photo: "/avatar3.jpg",
    area: "Plot C",
    tasksToday: ["Fertilizer", "Harvest"],
    completion: 100,
    lastCheckIn: "7:30 AM",
    score: 5,
  },
];


const alerts = [
  {
    icon: <AlertTriangle className="text-yellow-400 size-5" />,
    msg: "No irrigation detected in Plot 3 despite soil moisture being less than 40% — urgent action required",
    time: "Today, 6:30 AM",
  },
  {
    icon: <FlaskConicalOff className="text-red-500 size-5" />,
    msg: "Fertilizer not applied on schedule — soil nutrient levels critical",
    time: "Yesterday, 8:00 PM",
  },
  {
    icon: <Camera className="text-blue-400 size-5" />,
    msg: "Crop stress detected via camera feed — requires inspection",
    time: "Yesterday, 3:15 PM",
  },
];

const tasks = [
  { task: "Watering", time: "6 AM - 8 AM", done: true, proof: true },
  {
    task: "Fertilizer spraying",
    time: "Every Sunday",
    done: false,
    proof: false,
  },
  { task: "Soil test collection", time: "Monthly", done: false, proof: false },
];

const performance = {
  stars: 4,
  warnings: 1,
  suggestions: ["Improve task timeliness", "Respond to alerts faster"],
};



export default function WorkerMonitorPage() {
  const { user } = useUser();

const data = {
    user: {
      name: user?.fullName || "Guest",
      email: user?.primaryEmailAddress?.emailAddress || "guest@example.com",
      avatar: user?.imageUrl || "/avatars/default.jpg",
    },
    
  };
  const [acknowledged, setAcknowledged] = useState({}); // key: msg, value: boolean
  const [alertsList, setAlertsList] = useState(alerts);
  const [allAcknowledged, setAllAcknowledged] = useState(false);
  const [alertFade, setAlertFade] = useState({}); // key: msg, value: boolean
  const [containerFade, setContainerFade] = useState(false);
  const [ackAllDisabled, setAckAllDisabled] = useState(false);

  const handleAcknowledgeAll = () => {
    const fadeObj = {};
    const ackObj = {};
    alertsList.forEach(a => { fadeObj[a.msg] = true; ackObj[a.msg] = true; });
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

  const handleAcknowledge = (i: number) => {
    const msg = alertsList[i].msg;
    setAlertFade(prev => ({ ...prev, [msg]: true }));
    setTimeout(() => {
      setAlertsList(prev => prev.filter((_, idx) => idx !== i));
      setAcknowledged(prev => ({ ...prev, [msg]: true }));
      if (alertsList.length === 1) {
        setAllAcknowledged(true);
        setContainerFade(true);
        setAckAllDisabled(true);
        setAlertFade({});
      }
    }, 400);
  };

  // Re-enable Acknowledge All if new alerts appear
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
                    <BreadcrumbLink href="/dashboard">
                      Dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-white">Workers</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex flex-row gap-4">
              <div className="flex flex-row gap-2 items-center mr-[-10px]">
              <NotificationsComponent />
              <Separator orientation="vertical" className="mx-2 h-4" />
              <NavUser user={data.user} />
              
              </div>
              
            </div>
          </div>
        </header>
        <div className="flex flex-col gap-[1.25rem] p-4 main-dashboard-second-part-theme theme-color min-h-screen">

          <Card className="equipment-card-inner border border-zinc-50/10 rounded-xl">
            <WorkerTable />
          </Card>

          <div className="flex flex-row gap-[1.25rem]">

            <StatusTracker />
            <CropHealthChart />
            <SoilMoistureKPI />

          </div>

          {/* Smart Alerts Panel */}
          <Card className="equipment-card-inner border border-zinc-50/10 rounded-xl p-0 overflow-hidden">
            <CardContent className="p-0">
              <div className='flex flex-row justify-between px-5 py-4 border-b border-b-zinc-50/10 rounded-t-xl'>
                <h2 className='text-[18px] font-normal mt-1'>
                  Active Problems
                </h2>
                <div
                  className={`flex items-center w-fit bg-transparent py-[6px] px-[10px] rounded-[8px] relative group transition-colors ease-in-out duration-200 theme-color dashboard-header-gps ${ackAllDisabled ? 'opacity-50 pointer-events-none' : 'cursor-pointer hover:bg-[rgba(255,255,255,.025)]'}`}
                  onClick={ackAllDisabled ? undefined : handleAcknowledgeAll}
                >
                  <CheckCheck className="h-4 w-4 text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff]" />
                  <span className="text-[14px] font-normal text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff] pl-[6px]">
                    Acknowledge all
                  </span>
                </div>
              </div>
              <div className={`flex flex-col gap-4 px-5 py-4 min-h-[60px] transition-all duration-500 ease-in-out ${containerFade && alertsList.length === 0 ? 'alert-container-fade-out' : ''}`}
                   style={{height: alertsList.length === 0 && allAcknowledged ? 0 : undefined, paddingTop: alertsList.length === 0 && allAcknowledged ? 0 : undefined, paddingBottom: alertsList.length === 0 && allAcknowledged ? 0 : undefined}}>
                {alertsList.length === 0 && allAcknowledged ? (
                  <div className="flex items-center justify-center w-full h-[60px] text-white text-base alert-fade-in">
                    No actions required.
                  </div>
                ) : (
                  alertsList.map((a, i) => (
                    <div
                      key={a.msg}
                      className={`flex items-center gap-3 p-3 smart-alert-theme color-theme transition-transform duration-400 ease-in-out ${alertFade[a.msg] ? 'alert-fade-out-right' : ''}`}
                    >
                      {a.icon}
                      <div className="flex-1 text-white text-sm">{a.msg}</div>
                      <div className="text-xs text-gray-400 mr-2">{a.time}</div>
                      <Button
                        size="sm"
                        className="mr-1 gap-0 equipment-btn transition-all rent-now-btn text-neutral-50 font-normal !rounded-md"
                        onClick={() => handleAcknowledge(i)}
                        disabled={!!acknowledged[a.msg]}
                      ><Check className="h-4 w-4 text-[rgba(255,255,255,.9)] mr-[6px]" />
                        Acknowledge
                      </Button>
                      {/* <Button size="sm" variant="destructive">
                        Escalate
                      </Button> */}
                      <Button size="sm" className="font-normal gap-0 alert-notification-theme border border-zinc-50/10 text-neutral-50 hover:text-white transition-all duration-200 ease-in-out bg-red-800/80 hover:bg-red-700">
                      <MailWarning className="h-4 w-4 text-[rgba(255,255,255,.9)] mr-[6px]" />
                        Issue Warning
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Daily Task Assignment & Logs */}
          <Card className="equipment-card-inner border border-zinc-50/10 rounded-xl">
            <CardContent className="p-4">
              <div className="font-semibold text-lg text-white mb-2">
                Daily Task Assignment & Logs
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Proof</TableHead>
                    <TableHead>Sensor Validation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.map((t, i) => (
                    <TableRow key={i}>
                      <TableCell>{t.task}</TableCell>
                      <TableCell>{t.time}</TableCell>
                      <TableCell>
                        {t.done ? (
                          <span className="text-green-400">Done</span>
                        ) : (
                          <span className="text-red-400">Missed</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {t.proof ? (
                          <CheckCircle className="text-green-400" />
                        ) : (
                          <XCircle className="text-red-400" />
                        )}
                      </TableCell>
                      <TableCell>
                        {t.task === "Watering" && !t.done ? (
                          <Badge variant="destructive">⚠️ Flagged</Badge>
                        ) : (
                          <Badge variant="default">OK</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          
          {/* IVR/SMS Integration Panel */}
            <Card className="equipment-card-inner border border-zinc-50/10 rounded-xl w-fit p-0">
            <div className='flex flex-row justify-between px-5 py-4 border-b border-b-zinc-50/10 rounded-t-xl'>
              IVR / SMS Integration (Simulated)
            </div>
              <CardContent className="px-5 py-4">
                <div className="flex flex-col gap-2 text-sm text-gray-200">
                  <div>
                    📞 <b>IVR:</b> &quot;Soil moisture is critically low for 12
                    hours — no watering detected. Please call worker.&quot;
                  </div>
                  <div>
                    📱 <b>SMS:</b> &quot;Crop disease alert ignored for 2 days —
                    escalation needed.&quot;
                  </div>
                  <div>
                    🌐 <b>Language:</b> Hindi, English (auto-detect)
                  </div>
                </div>
              </CardContent>
            </Card>
          
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

