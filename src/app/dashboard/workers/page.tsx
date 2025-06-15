"use client";

import { useState } from "react";
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
} from "lucide-react";
import Image from "next/image";
import { NavUser } from "@/components/nav-user";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useUser } from "@clerk/nextjs";
import WorkerTable from "@/components/dashboard/workertable";
import NotificationsComponent from "@/components/comp-383";

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

const kpis = [
  {
    kpi: "Soil Moisture",
    threshold: ">30%",
    last: "19%",
    status: "Low",
    action: "Not watered",
  },
  {
    kpi: "Fertilizer Schedule",
    threshold: "Weekly",
    last: "Missed",
    status: "Overdue",
    action: "Not Done",
  },
  {
    kpi: "Crop Health",
    threshold: "Good",
    last: "Poor (yellowing)",
    status: "Alert",
    action: "Unacknowledged",
  },
  {
    kpi: "Task Log (weeding)",
    threshold: "On 6th June",
    last: "Not Logged",
    status: "Missed",
    action: "Worker Ignored",
  },
];

const alerts = [
  {
    icon: <AlertTriangle className="text-yellow-400" />,
    msg: "No irrigation detected despite moisture <15% — Alert sent to Owner",
    time: "Today, 6:30 AM",
  },
  {
    icon: <XCircle className="text-red-500" />,
    msg: "Fertilizer not applied on schedule — SMS sent to Worker",
    time: "Yesterday, 8:00 PM",
  },
  {
    icon: <Camera className="text-blue-400" />,
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
  const [acknowledged, setAcknowledged] = useState([false, false, false]);
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
              {/* <div className="relative hover:bg-[rgba(255,255,255,0.025)] group p-[6px] rounded-md flex flex-row items-center cursor-pointer transition-all duration-200 ease-in-out">
                <div className="h-[10px] w-[10px] rounded-full bg-[#f4af29] alert-animation absolute top-0 right-0" />
                <Bell className="w-[18px] h-[18px] text-[rgba(255,255,255,.75)] group-hover:text-[#fff] transition-all duration-200 ease-in-out" />
              </div> */}
              <NotificationsComponent />
              <Separator orientation="vertical" className="mx-2 h-4" />
              <NavUser user={data.user} />
              
              </div>
              
            </div>
          </div>
        </header>
        <div className="flex flex-col gap-6 p-4 main-dashboard-second-part-theme theme-color min-h-screen">
          {/* Worker Summary Cards */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {workers.map((w, i) => (
              <Card
                key={i}
                className="equipment-card-inner border border-zinc-50/10 rounded-xl"
              >
                <CardContent className="flex flex-col items-center p-4">
                  <Image
                    src={w.photo}
                    alt={w.name}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full mb-2"
                  />
                  <div className="font-semibold text-lg text-white">
                    {w.name}
                  </div>
                  <div className="text-sm text-gray-300 mb-1">
                    Assigned: {w.area}
                  </div>
                  <div className="text-sm text-gray-300 mb-1">
                    Tasks: {w.tasksToday.join(", ")}
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-2 mb-2 mt-1">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${w.completion}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-400 mb-1">
                    Task Completion: {w.completion}%
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400 mb-1">
                    <Clock className="w-4 h-4" />
                    Last check-in: {w.lastCheckIn}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    Performance:{" "}
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-4 h-4 ${
                          idx < Math.round(w.score)
                            ? "text-yellow-400"
                            : "text-gray-600"
                        }`}
                      />
                    ))}{" "}
                    <span className="ml-1">({w.score})</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div> */}
          <Card className="equipment-card-inner border border-zinc-50/10 rounded-xl">
            <WorkerTable />
          </Card>

          {/* KPI Table */}
          <Card className="equipment-card-inner border border-zinc-50/10 rounded-xl">
            <CardContent className="p-4">
              <div className="font-semibold text-lg text-white mb-2">
                Key Performance Indicators
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>KPI</TableHead>
                    <TableHead>Threshold</TableHead>
                    <TableHead>Last Reading</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action Taken</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {kpis.map((k, i) => (
                    <TableRow key={i}>
                      <TableCell>{k.kpi}</TableCell>
                      <TableCell>{k.threshold}</TableCell>
                      <TableCell>{k.last}</TableCell>
                      <TableCell>
                        {k.status === "Low" && (
                          <Badge variant="destructive">⚠️ Low</Badge>
                        )}
                        {k.status === "Overdue" && (
                          <Badge variant="destructive">❗Overdue</Badge>
                        )}
                        {k.status === "Alert" && (
                          <Badge variant="destructive">❗Alert</Badge>
                        )}
                        {k.status === "Missed" && (
                          <Badge variant="destructive">❗Missed</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {k.action.startsWith("Not") ? (
                          <span className="text-red-400">❌ {k.action}</span>
                        ) : (
                          <span className="text-green-400">✅ {k.action}</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Smart Alerts Panel */}
          <Card className="equipment-card-inner border border-zinc-50/10 rounded-xl">
            <CardContent className="p-4">
              <div className="font-semibold text-lg text-white mb-2">
                Smart Alerts
              </div>
              <div className="flex flex-col gap-3">
                {alerts.map((a, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-zinc-900/60 rounded-lg p-3"
                  >
                    {a.icon}
                    <div className="flex-1 text-white text-sm">{a.msg}</div>
                    <div className="text-xs text-gray-400 mr-2">{a.time}</div>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="mr-1"
                      onClick={() =>
                        setAcknowledged((ack) =>
                          ack.map((v, idx) => (idx === i ? true : v))
                        )
                      }
                      disabled={acknowledged[i]}
                    >
                      Acknowledge
                    </Button>
                    <Button size="sm" variant="destructive">
                      Escalate
                    </Button>
                    <Button size="sm" variant="outline">
                      Send Warning
                    </Button>
                  </div>
                ))}
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

          {/* Performance Score Panel */}
          <Card className="equipment-card-inner border border-zinc-50/10 rounded-xl">
            <CardContent className="p-4 flex flex-col gap-2">
              <div className="font-semibold text-lg text-white mb-2">
                Performance Score
              </div>
              <div className="flex items-center gap-2">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className={`w-6 h-6 ${
                      idx < performance.stars
                        ? "text-yellow-400"
                        : "text-gray-600"
                    }`}
                  />
                ))}
                <span className="ml-2 text-white font-bold">
                  {performance.stars} / 5
                </span>
              </div>
              <div className="text-sm text-gray-300">
                Warnings issued:{" "}
                <span className="text-red-400 font-bold">
                  {performance.warnings}
                </span>
              </div>
              <div className="text-sm text-gray-300">
                Improvement Suggestions:
              </div>
              <ul className="list-disc ml-6 text-gray-200">
                {performance.suggestions.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* IVR/SMS Integration Panel */}
          <Card className="equipment-card-inner border border-zinc-50/10 rounded-xl">
            <CardContent className="p-4">
              <div className="font-semibold text-lg text-white mb-2">
                IVR / SMS Integration (Simulated)
              </div>
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
