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

const chartConfig = {
  nitrogen: { label: "Nitrogen", color: "hsl(var(--chart-1))" },
  phosphorus: { label: "Phosphorus", color: "hsl(var(--chart-2))" },
  potassium: { label: "Potassium", color: "hsl(var(--chart-3))" },
} satisfies ChartConfig

interface StackedChartExpandedProps {
  timeFrame: string;
  data?: any[];
}

export function StackedChartExpandedComponent({ timeFrame, data = [] }: StackedChartExpandedProps) {
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
    const processData = () => {
      setLoading(true)
      setChartData([])
      setLatestValues(null)
      setValueChange(null)
      setDateRange(null)
    
      try {
        if (!data || data.length === 0) {
            setLoading(false);
            return;
        }

        // Determine reference time (max time in data)
        const maxDate = data.reduce((max, d) => (new Date(d.time) > max ? new Date(d.time) : max), new Date(0));
        const referenceTime = maxDate.getTime() > 0 ? maxDate : new Date();

        let startTime: number;
        switch (timeFrame) {
          case "24 hours":
            startTime = referenceTime.getTime() - 24 * 60 * 60 * 1000;
            break;
          case "7 days":
            startTime = referenceTime.getTime() - 7 * 24 * 60 * 60 * 1000;
            break;
          case "14 days":
            startTime = referenceTime.getTime() - 14 * 24 * 60 * 60 * 1000;
            break;
          case "1 month":
            startTime = referenceTime.getTime() - 30 * 24 * 60 * 60 * 1000;
            break;
          case "lifetime":
            startTime = 0;
            break;
          default:
            startTime = referenceTime.getTime() - 7 * 24 * 60 * 60 * 1000;
        }

        const filtered = data
            .map((d: any) => ({
                time: d.time,
                nitrogen: d.npk_uptake_nitrogen,
                phosphorus: d.npk_uptake_phosphorus,
                potassium: d.npk_uptake_potassium,
                dt: new Date(d.time).getTime()
            }))
            .filter((d) => d.dt >= startTime && d.dt <= referenceTime.getTime())
            .sort((a, b) => a.dt - b.dt);

        if (filtered.length > 0) {
            const formattedData = filtered.map(d => ({
                time: d.time,
                nitrogen: Number(Number(d.nitrogen).toFixed(2)),
                phosphorus: Number(Number(d.phosphorus).toFixed(2)),
                potassium: Number(Number(d.potassium).toFixed(2))
            }));
            
            setChartData(formattedData);

            // Ticks
            const totalPoints = formattedData.length;
            const tickCount = 6;
             const calculatedTicks = Array.from({ length: tickCount }, (_, i) => {
                const index = Math.floor((i * (totalPoints - 1)) / (tickCount - 1));
                return formattedData[index]?.time;
            }).filter(Boolean);
            setTicks(calculatedTicks);

            const earliestDate = formattedData[0].time;
            const latestDate = formattedData[formattedData.length - 1].time;
            setDateRange(formatDateRangeLabel(earliestDate, latestDate));

            // Latest Value
            const latestEntry = formattedData[formattedData.length - 1];
            setLatestValues({
                nitrogen: latestEntry.nitrogen,
                phosphorus: latestEntry.phosphorus,
                potassium: latestEntry.potassium,
            });

            // Change
            const avgValues = formattedData.reduce((acc, curr) => ({
                nitrogen: acc.nitrogen + curr.nitrogen,
                phosphorus: acc.phosphorus + curr.phosphorus,
                potassium: acc.potassium + curr.potassium
            }), { nitrogen: 0, phosphorus: 0, potassium: 0 });

            const avgNPK = {
                nitrogen: avgValues.nitrogen / totalPoints,
                phosphorus: avgValues.phosphorus / totalPoints,
                potassium: avgValues.potassium / totalPoints
            };
            
            setValueChange({
                nitrogen: avgNPK.nitrogen !== 0 ? ((latestEntry.nitrogen - avgNPK.nitrogen) / avgNPK.nitrogen) * 100 : 0,
                phosphorus: avgNPK.phosphorus !== 0 ? ((latestEntry.phosphorus - avgNPK.phosphorus) / avgNPK.phosphorus) * 100 : 0,
                potassium: avgNPK.potassium !== 0 ? ((latestEntry.potassium - avgNPK.potassium) / avgNPK.potassium) * 100 : 0
            });
        }
      } catch (error) {
        console.error("Error generating NPK uptake data:", error)
      } finally {
        setLoading(false)
      }
    }

    processData()
  }, [timeFrame, data])

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