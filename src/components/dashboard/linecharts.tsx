"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

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
import { useEffect, useState } from "react"
import { TemperatureChart } from "./temperaturechart"


const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function LineChartComponent({ cardTitle }: { cardTitle: string }) {

  const [temperature, setTemperature] = useState<number | null>(null);
  const [temperatureChange, setTemperatureChange] = useState<number | null>(null);

  useEffect(() => {
    const fetchTemperature = async () => {
      console.log("Fetching temperature..."); // Debug log
      try {
        const response = await fetch('http://159.65.139.84:3000/data');
        console.log("Response received:", response);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        if (Array.isArray(data) && data.length > 0) {
          const latestTemperature = data[data.length - 1]?.temperature;
          console.log("Latest temperature:", latestTemperature);
          setTemperature(parseFloat(latestTemperature.toFixed(2)));

          // Calculate the average temperature of the week before the recorded week
          const weekBeforeData = data.slice(-14, -7);
          const weekBeforeAvgTemp = weekBeforeData.reduce((sum, entry) => sum + entry.temperature, 0) / weekBeforeData.length;
          console.log("Week before average temperature:", weekBeforeAvgTemp);

          // Calculate the percentage change
          const change = ((latestTemperature - weekBeforeAvgTemp) / weekBeforeAvgTemp) * 100;
          setTemperatureChange(parseFloat(change.toFixed(2)));
        } else {
          console.warn("API returned an empty or invalid response.");
        }
      } catch (error) {
        console.error("Error fetching temperature:", error);
      }
    };

    fetchTemperature();
  }, []);


  return (
    <Card>
      <CardHeader>
        <div className="space-y-1.5">
          <CardTitle>{cardTitle}</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </div>
        <div>
          {temperature !== null ? `${temperature}°C` : 'Loading...'}
        </div>
        
      </CardHeader>
      <CardContent>
        <TemperatureChart/>
        {/* <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="desktop"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer> */}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {temperatureChange !== null ? (
            <>
              
              {`Trending ${temperatureChange > 0 ? 'up' : 'down'} by ${Math.abs(temperatureChange)}% this week`}
              {temperatureChange > 0 ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
            </>
          ) : 'Calculating change...'}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
