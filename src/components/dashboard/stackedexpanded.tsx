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
import {
  formatChartTickLabel,
  formatChartTooltipLabel,
  formatDateRangeLabel,
} from "@/lib/date-format"

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
  const [ticks, setTicks] = useState<string[]>([])

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
              startDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1)) // ✅ Fix UTC issue
              break
            case "lifetime":
              startDate = new Date(data[0].time)
              break
            default:
              startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          }

          const filteredData = data.filter((entry) => {
            const entryTime = new Date(entry.time)
            return entryTime.getTime() >= startDate.getTime() && entryTime.getTime() <= now.getTime()
          })
    
          if (filteredData.length === 0) {
            console.warn("No data found in the selected time range.")
          }

          if (filteredData.length === 0) {
            setChartData([])
            setTicks([])
            return
          }

          const formattedData = filteredData.map((entry) => ({
            time: entry.time,
            nitrogen: entry.npk_uptake_nitrogen,
            phosphorus: entry.npk_uptake_phosphorus,
            potassium: entry.npk_uptake_potassium,
          }))

          setChartData(formattedData)

          const totalPoints = formattedData.length
          let tickCount = 0
          switch (timeFrame) {
            case "24 hours":
              tickCount = 6 // 2 date points
              break
            case "7 days":
              tickCount = 3 // 3 date points
              break
            case "14 days":
              tickCount = 5 // 6 date points
              break
            case "1 month":
              tickCount = 5 // 5 date points
              break
            case "lifetime":
              tickCount = Math.min(12, totalPoints) // 1 point per month, up to 12 months
              break
          }

          // Ensure ticks are evenly distributed
          const calculatedTicks = Array.from({ length: tickCount }, (_, i) => {
            const index = Math.floor((i * totalPoints) / tickCount)
            return formattedData[index]?.time
          }).filter(Boolean)
          setTicks(calculatedTicks)

          const earliestDate = formattedData[0].time
          const latestDate = formattedData[formattedData.length - 1].time
          setDateRange(formatDateRangeLabel(earliestDate, latestDate))

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
    <Card className="equipment-card-inner border-zinc-50/10">
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
                  <XAxis
                    dataKey="time"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    ticks={ticks}
                    tickFormatter={(time) => formatChartTickLabel(time as string, timeFrame)}
                  />
              <YAxis hide />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    className="w-[175px]"
                    indicator="line"
                        labelFormatter={(time, payload) => {
                          const originalTime = (payload?.[0]?.payload as { time?: string })?.time
                          return formatChartTooltipLabel(originalTime ?? (time as string), timeFrame)
                        }}
                  />
                }
              />
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