"use client"

import { useEffect, useState } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

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
              weekday: timeFrame === "24 hours" || timeFrame === "7 days" ? "short" : undefined,
              month: timeFrame === "1 month" || timeFrame === "lifetime" ? "short" : undefined,
              day: "numeric",
            }),
            nitrogen: entry.npk_uptake_nitrogen,
            phosphorus: entry.npk_uptake_phosphorus,
            potassium: entry.npk_uptake_potassium,
          }))

          setChartData(formattedData)

          // Set date range
          const earliestDate = new Date(filteredData[0].time).toLocaleDateString()
          const latestDate = new Date(filteredData[filteredData.length - 1].time).toLocaleDateString()
          setDateRange(`${earliestDate} - ${latestDate}`)

          // Latest values
          const latestEntry = filteredData[filteredData.length - 1]
          setLatestValues({
            nitrogen: latestEntry.nitrogen,
            phosphorus: latestEntry.phosphorus,
            potassium: latestEntry.potassium,
          })

          // Calculate time-frame average
          const avgValues = filteredData.reduce(
            (acc, entry) => {
              acc.nitrogen += entry.nitrogen
              acc.phosphorus += entry.phosphorus
              acc.potassium += entry.potassium
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
            nitrogen: ((latestEntry.nitrogen - avgNPK.nitrogen) / avgNPK.nitrogen) * 100,
            phosphorus: ((latestEntry.phosphorus - avgNPK.phosphorus) / avgNPK.phosphorus) * 100,
            potassium: ((latestEntry.potassium - avgNPK.potassium) / avgNPK.potassium) * 100,
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
        <div className="space-y-1.5">
          <CardTitle>Soil Nutrient Uptake</CardTitle>
          <CardDescription>{dateRange || "Loading date range..."}</CardDescription>
        </div>
        
      </CardHeader>
      <CardContent>
        {chartData.length === 0 ? <p>Loading chart...</p> : (
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{ left: 0, right: 0, top: 0 }}
              stackOffset="expand"
            >
              <CartesianGrid vertical={false} />
              <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
              <Area dataKey="potassium" type="natural" fill="var(--color-potassium)" fillOpacity={0.1} stroke="var(--color-potassium)" stackId="a" />
              <Area dataKey="phosphorus" type="natural" fill="var(--color-phosphorus)" fillOpacity={0.4} stroke="var(--color-phosphorus)" stackId="a" />
              <Area dataKey="nitrogen" type="natural" fill="var(--color-nitrogen)" fillOpacity={0.4} stroke="var(--color-nitrogen)" stackId="a" />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {loading ? "Calculating change..." : valueChange ? (
          <>
            {`Trending ${valueChange.nitrogen > 0 ? "up" : "down"} by ${Math.abs(Number(valueChange.nitrogen.toFixed(2)))}%`}
            {valueChange.nitrogen > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          </>
        ) : "No data"}
      </CardFooter>
    </Card>
  )
}
