"use client"

import { useEffect, useState } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"

const API_URL = "https://data.cropsense.tech/data"

const chartConfig = {
  nitrogen: { label: "Nitrogen", color: "hsl(var(--chart-1))" },
  phosphorus: { label: "Phosphorus", color: "hsl(var(--chart-2))" },
  potassium: { label: "Potassium", color: "hsl(var(--chart-3))" },
} satisfies ChartConfig

interface StackedChartExpandedProps {
  timeFrame: string
}

export function StackedChartExpandedComponent({ timeFrame }: StackedChartExpandedProps) {
  const [chartData, setChartData] = useState<
    { time: string; nitrogen: number; phosphorus: number; potassium: number }[]
  >([])
  const [loading, setLoading] = useState<boolean>(true)
  const [dateRange, setDateRange] = useState<string | null>(null)
  const [latestValues, setLatestValues] = useState<{ nitrogen: number; phosphorus: number; potassium: number } | null>(
    null
  )
  const [valueChange, setValueChange] = useState<{ nitrogen: number; phosphorus: number; potassium: number } | null>(
    null
  )

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setChartData([])
      setLatestValues(null)
      setValueChange(null)
      setDateRange(null)

      try {
        const response = await fetch(API_URL)
        if (!response.ok) throw new Error("Failed to fetch data")
        const data = await response.json()

        if (Array.isArray(data) && data.length > 0) {
          const now = new Date()
          let startDate
          switch (timeFrame) {
            case "24 hours":
              startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000)
              break
            case "7 days":
              startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
              break
            case "14 days":
              startDate = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)
              break
            case "1 month":
              startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
              break
            case "lifetime":
              startDate = new Date(data[0].time)
              break
            default:
              startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          }

          const filteredData = data.filter((entry) => {
            const entryTime = new Date(entry.time)
            return entryTime >= startDate && entryTime <= now
          })

          const formattedData = filteredData.map((entry) => ({
            time: new Date(entry.time).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
            nitrogen: entry.npk_uptake_nitrogen,
            phosphorus: entry.npk_uptake_phosphorus,
            potassium: entry.npk_uptake_potassium,
          }))

          setChartData(formattedData)

          // Set date range
          const earliestDate = formattedData[0].time
          const latestDate = formattedData[formattedData.length - 1].time
          setDateRange(`${earliestDate} - ${latestDate}`)

          // Latest values
          const latestEntry = filteredData[filteredData.length - 1]
          setLatestValues({
            nitrogen: latestEntry.npk_uptake_nitrogen,
            phosphorus: latestEntry.npk_uptake_phosphorus,
            potassium: latestEntry.npk_uptake_potassium,
          })

          // Calculate time-frame average
          const avgValues = filteredData.reduce(
            (acc, entry) => {
              acc.nitrogen += entry.npk_uptake_nitrogen
              acc.phosphorus += entry.npk_uptake_phosphorus
              acc.potassium += entry.npk_uptake_potassium
              return acc
            },
            { nitrogen: 0, phosphorus: 0, potassium: 0 }
          )

          const totalEntries = filteredData.length
          const avgNPK = {
            nitrogen: avgValues.nitrogen / totalEntries,
            phosphorus: avgValues.phosphorus / totalEntries,
            potassium: avgValues.potassium / totalEntries,
          }

          // Calculate percentage change
          setValueChange({
            nitrogen: ((latestEntry.npk_uptake_nitrogen - avgNPK.nitrogen) / avgNPK.nitrogen) * 100,
            phosphorus: ((latestEntry.npk_uptake_phosphorus - avgNPK.phosphorus) / avgNPK.phosphorus) * 100,
            potassium: ((latestEntry.npk_uptake_potassium - avgNPK.potassium) / avgNPK.potassium) * 100,
          })
        }
      } catch (error) {
        console.error("Error fetching NPK uptake data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [timeFrame])

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-2 font-inter">
          <CardTitle className="font-inter">Soil Nutrient Uptake</CardTitle>
          <CardDescription className="font-inter">{loading ? <Skeleton className="h-4 w-32" /> : dateRange}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? <Skeleton className="h-[600px] w-full" /> : (
          <ChartContainer config={chartConfig}>
            <AreaChart data={chartData} margin={{ left: 0, right: 0, top: 0 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis hide />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
              <Area dataKey="potassium" stroke={chartConfig.potassium.color} fillOpacity={0.1} />
              <Area dataKey="phosphorus" stroke={chartConfig.phosphorus.color} fillOpacity={0.4} />
              <Area dataKey="nitrogen" stroke={chartConfig.nitrogen.color} fillOpacity={0.4} />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-row items-start gap-2 text-sm font-inter">
        {loading ? <Skeleton className="h-4 w-40" /> : valueChange && (
          <>
            {`Trending ${valueChange.nitrogen > 0 ? "up" : "down"} by ${Math.abs(Number(valueChange.nitrogen.toFixed(2)))}%`}
            {valueChange.nitrogen > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          </>
        )}
      </CardFooter>
    </Card>
  )
}