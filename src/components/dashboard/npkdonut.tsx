"use client"

import { useEffect, useState } from "react"
import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

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
            fill: "#00E5FF", // Cyan
        },
        {
            label: "Phosphorus",
            value: parseFloat(latest.npk_uptake_phosphorus.toFixed(2)),
            fill: "#FFA726", // Orange
        },
        {
            label: "Potassium",
            value: parseFloat(latest.npk_uptake_potassium.toFixed(2)),
            fill: "#D500F9", // Purple
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
  Nitrogen: { label: "Nitrogen", color: "#00E5FF" },
  Phosphorus: { label: "Phosphorus", color: "#FFA726" },
  Potassium: { label: "Potassium", color: "#D500F9" },
}

  return (
    <Card className="flex flex-col border border-zinc-50/10 rounded-xl equipment-card-inner w-[800px] items-start">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] w-[300px]"
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
              className="-translate-y-2 flex-wrap gap-8 [&>*]:justify-center font-inter"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      
    </Card>
  )
}
