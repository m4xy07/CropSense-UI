"use client"

import { useEffect, useState } from "react"
import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"
import Button from "../Button";

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import NPKTableComponent from "./linedtable"
import Link from "next/link";

interface NPKData {
  npk_uptake_nitrogen: number
  npk_uptake_phosphorus: number
  npk_uptake_potassium: number
}

export function NPKDonutComponent() {
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://data.cropsense.tech/")
        const data = await res.json()
        const latest: NPKData = data[0]

        const transformedData = [
        {
            label: "Nitrogen",
            value: parseFloat(latest.npk_uptake_nitrogen.toFixed(2)),
            fill: "#d7721a", // Cyan
        },
        {
            label: "Phosphorus",
            value: parseFloat(latest.npk_uptake_phosphorus.toFixed(2)),
            fill: "#d52c9e", // Orange
        },
        {
            label: "Potassium",
            value: parseFloat(latest.npk_uptake_potassium.toFixed(2)),
            fill: "#974ae5", // Purple
        },
        ]
        setChartData(transformedData)
      } catch (err) {
        console.error("Failed to fetch NPK data:", err)
      }
    }

    fetchData()
  }, [])

  const chartConfig: ChartConfig = {
  value: { label: "Uptake" },
  Nitrogen: { label: "Nitrogen", color: "#d7721a" },
  Phosphorus: { label: "Phosphorus", color: "#d52c9e" },
  Potassium: { label: "Potassium", color: "#974ae5" },
}

  return (
    <Card className="flex flex-col border border-zinc-50/10 rounded-xl equipment-card-inner w-fit items-start p-0">
      <div className="flex w-full border-b border-zinc-50/10 px-5 py-4">
        <h2 className="text-[18px] font-normal mt-1">NPK Tracker</h2>
      </div>
      <div className="px-5 py-4 gap-12 flex flex-row">
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px] w-[300px] -mt-4"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="label"
                innerRadius={60}
                outerRadius={80}
              />
              <ChartLegend
                content={<ChartLegendContent nameKey="label" />}
                className="-translate-y-2 flex-wrap gap-6 [&>*]:justify-center font-inter"
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
        <div className="items-center flex flex-col justify-center gap-4">
          <NPKTableComponent />
          <div className="flex flex-row items-center justify-center gap-2 py-2 px-4 border border-zinc-50/10 alert-dashboard-theme rounded-lg">
            <div className="h-[10px] w-[10px] rounded-full bg-[#d10412] alert-animation" />
            <span className="text-[13px]">Nutrient deficiency detected! Take action now to avoid issues.</span>
          </div>
          <Link href="https://dir.indiamart.com/impcat/npk-fertilizer/npk-ratio-15-15-15-q15410334/"><Button>Order NPK 10-10-10</Button></Link>
        </div>
      </div>
    </Card>
  )
}
