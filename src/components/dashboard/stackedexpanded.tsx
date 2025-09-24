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

// Static NPK data based on provided values
const STATIC_NPK_VALUES = {
  nitrogen: 10.9,
  phosphorus: 5.2,
  potassium: 8.6,
};

// Interface for NPK data points
interface NPKDataPoint {
  time: string;
  displayTime: string;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
}

// Generate realistic historical NPK data points
const generateStaticNPKData = (timeFrame: string): NPKDataPoint[] => {
  const now = new Date("2025-09-24T18:45:12.000Z");
  let startDate: Date;
  let pointCount: number;
  
  switch (timeFrame) {
    case "24 hours":
      startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      pointCount = 24;
      break;
    case "7 days":
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      pointCount = 7;
      break;
    case "14 days":
      startDate = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
      pointCount = 14;
      break;
    case "1 month":
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
      pointCount = 30;
      break;
    case "lifetime":
      startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000); // 3 months
      pointCount = 90;
      break;
    default:
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      pointCount = 7;
  }
  
  const data: NPKDataPoint[] = [];
  const timeStep = (now.getTime() - startDate.getTime()) / pointCount;
  
  for (let i = 0; i <= pointCount; i++) {
    const currentTime = new Date(startDate.getTime() + i * timeStep);
    
    // Add realistic variation to NPK values (±15% variation)
    const nitrogenVariation = (Math.random() - 0.5) * 0.3;
    const phosphorusVariation = (Math.random() - 0.5) * 0.3;
    const potassiumVariation = (Math.random() - 0.5) * 0.3;
    
    // Add some cyclical patterns for realism
    const cycleFactor = Math.sin(i / pointCount * Math.PI * 2) * 0.1;
    
    const nitrogen = Math.max(0, STATIC_NPK_VALUES.nitrogen * (1 + nitrogenVariation + cycleFactor));
    const phosphorus = Math.max(0, STATIC_NPK_VALUES.phosphorus * (1 + phosphorusVariation - cycleFactor));
    const potassium = Math.max(0, STATIC_NPK_VALUES.potassium * (1 + potassiumVariation + cycleFactor * 0.5));
    
    data.push({
      time: currentTime.toISOString(),
      displayTime: currentTime.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      nitrogen: parseFloat(nitrogen.toFixed(2)),
      phosphorus: parseFloat(phosphorus.toFixed(2)),
      potassium: parseFloat(potassium.toFixed(2)),
    });
  }
  
  return data;
};

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
    { time: string; displayTime: string; nitrogen: number; phosphorus: number; potassium: number }[]
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
    const generateData = () => {
      setLoading(true)
      setChartData([])
      setLatestValues(null)
      setValueChange(null)
      setDateRange(null)
    
      try {
        // Generate static NPK data
        const data = generateStaticNPKData(timeFrame);
        
        if (data.length > 0) {
          setChartData(data);

          const totalPoints = data.length;
          let tickCount = 0;
          switch (timeFrame) {
            case "24 hours":
              tickCount = 2;
              break;
            case "7 days":
              tickCount = 3;
              break;
            case "14 days":
              tickCount = 5;
              break;
            case "1 month":
              tickCount = 5;
              break;
            case "lifetime":
              tickCount = Math.min(12, totalPoints);
              break;
          }

          // Ensure ticks are evenly distributed
          const calculatedTicks = Array.from({ length: tickCount }, (_, i) => {
            const index = Math.floor((i * (totalPoints - 1)) / (tickCount - 1));
            return data[index]?.displayTime;
          }).filter(Boolean);
          setTicks(calculatedTicks);

          // Set date range with formatted dates
          const formatDate = (dateString: string) => {
            const parsedDate = new Date(dateString);
            const day = parsedDate.getUTCDate();
            const month = parsedDate.toLocaleString("en-US", { month: "long", timeZone: "UTC" });
            const suffix =
              day % 10 === 1 && day !== 11 ? "st" :
              day % 10 === 2 && day !== 12 ? "nd" :
              day % 10 === 3 && day !== 13 ? "rd" : "th";
          
            return `${day}${suffix} ${month}`;
          };

          const earliestDate = formatDate(data[0].time);
          const latestDate = formatDate(data[data.length - 1].time);
          setDateRange(`${earliestDate} - ${latestDate}`);

          // Latest values
          const latestEntry = data[data.length - 1];
          setLatestValues({
            nitrogen: latestEntry.nitrogen,
            phosphorus: latestEntry.phosphorus,
            potassium: latestEntry.potassium,
          });

          // Calculate time-frame average
          const avgValues = data.reduce(
            (acc, entry) => {
              acc.nitrogen += entry.nitrogen;
              acc.phosphorus += entry.phosphorus;
              acc.potassium += entry.potassium;
              return acc;
            },
            { nitrogen: 0, phosphorus: 0, potassium: 0 }
          );

          const totalEntries = data.length;
          const avgNPK = {
            nitrogen: avgValues.nitrogen / totalEntries,
            phosphorus: avgValues.phosphorus / totalEntries,
            potassium: avgValues.potassium / totalEntries,
          };

          // Calculate percentage change
          setValueChange({
            nitrogen: ((latestEntry.nitrogen - avgNPK.nitrogen) / avgNPK.nitrogen) * 100,
            phosphorus: ((latestEntry.phosphorus - avgNPK.phosphorus) / avgNPK.phosphorus) * 100,
            potassium: ((latestEntry.potassium - avgNPK.potassium) / avgNPK.potassium) * 100,
          });
        }
      } catch (error) {
        console.error("Error generating NPK uptake data:", error);
      } finally {
        setLoading(false);
      }
    };

    generateData();
  }, [timeFrame]);

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
              <XAxis dataKey="displayTime" tickLine={false} axisLine={false} tickMargin={8} ticks={ticks} />
              <YAxis hide />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    className="w-[175px]"
                    indicator="line"
                    labelFormatter={(time, payload) => {
                      // Use the original `time` value from the payload
                      const originalTime = payload?.[0]?.payload?.time;
                      const parsedDate = new Date(originalTime); // Parse the original ISO 8601 string
                      console.log("Label formatter date:", parsedDate, "Original time:", originalTime); // Debugging log
                      if (isNaN(parsedDate.getTime())) {
                        console.error("Invalid date:", originalTime);
                        return "Invalid date";
                      }
                      const day = parsedDate.getDate();
                      const month = parsedDate.toLocaleString("en-US", { month: "long" });
                      const suffix =
                        day % 10 === 1 && day !== 11
                          ? "st"
                          : day % 10 === 2 && day !== 12
                          ? "nd"
                          : day % 10 === 3 && day !== 13
                          ? "rd"
                          : "th";
                      return `${day}${suffix} ${month}, ${parsedDate.getFullYear()}`;
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