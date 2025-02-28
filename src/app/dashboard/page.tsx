import { AppSidebar } from "@/components/app-sidebar"
import { GroupChartComponent } from "@/components/dashboard/groupchart"
import { LineChartComponent } from "@/components/dashboard/linecharts"
import { StackedChartComponent } from "@/components/dashboard/stackedchart"
import { BlendingModeIcon, OpacityIcon, ClockIcon } from "@radix-ui/react-icons"
import { FaMountain } from "react-icons/fa";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Page() {
  return (
    <SidebarProvider className="dark">
      <AppSidebar />
      <SidebarInset>
        <header className="flex  h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex justify-between w-full pr-4">
            <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Overview</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            </div>
            <div className="flex flex-row items-center gap-6">

            <div className="flex flex-row  items-center gap-2">
                <ClockIcon className="w-5 h-5 " />
                <div className="text-[rgba(255,255,255,0.8)] text-sm">
                  Current time
                </div>
              </div>
              
              <div className="flex flex-row  items-center gap-2">
                <OpacityIcon className="w-5 h-5 " />
                <div className="text-[rgba(255,255,255,0.8)] text-sm">
                  Not raining
                </div>
              </div>
              
              <div className="flex flex-row  items-center gap-2">
                <FaMountain className="w-5 h-5 " />
                <div className="text-[rgba(255,255,255,0.8)] text-sm">
                  Altitude
                </div>
              </div>
              
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-4">
            <div className="aspect-video rounded-xl bg-muted/50" >
              <LineChartComponent cardTitle="Temperature" />
            </div>
            <div className="aspect-video rounded-xl bg-muted/50" >
              <LineChartComponent cardTitle="Humidity" />
            </div>
            <div className="aspect-video rounded-xl bg-muted/50" >
            <LineChartComponent cardTitle="Air Quality Index (AQI)" />
            </div>
            <div className="aspect-video rounded-xl bg-muted/50" >
            <LineChartComponent cardTitle="Heat Index (HI)" />
            </div>
          </div>
          {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
          <div className="grid auto-rows-min gap-4 md:grid-cols-4">
          <div className="aspect-video rounded-xl bg-muted/50" >
              <LineChartComponent cardTitle="Pressure" />
            </div>
            <div className="aspect-video rounded-xl bg-muted/50" >
              <LineChartComponent cardTitle="Moisture" />
            </div>
            <div className="aspect-video rounded-xl bg-muted/50" >
              <StackedChartComponent cardTitle="Soil Nutrient Uptake" />
            </div>
            <div className="aspect-video rounded-xl bg-muted/50" >
              <GroupChartComponent cardTitle="Crop Harvest & Pricing" />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
