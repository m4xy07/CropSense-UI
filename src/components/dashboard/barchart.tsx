"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
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

const API_URL = "https://data.cropsense.tech/data";

const chartConfig = {
  wholesale: {
    label: "Wholesale",
    color: "hsl(var(--chart-1))",
  },
  retail: {
    label: "Retail",
    color: "hsl(var(--chart-2))",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig

export function BarChartComponent({ cardTitle }: { cardTitle: string }) {
  const [chartData, setChartData] = useState<{ label: string; price: number }[]>([]);
  const [harvestableMonth, setHarvestableMonth] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          const latestRecord = data[data.length - 1];
          const latestMonthData = latestRecord.harvestable_months[latestRecord.harvestable_months.length - 1];
          setHarvestableMonth(latestMonthData.month);
          setChartData([
            { label: "Wholesale", price: parseFloat(latestMonthData.wholesale_price.toFixed(2)) },
            { label: "Retail", price: parseFloat(latestMonthData.retail_price.toFixed(2)) },
          ]);
        } else {
          console.warn("API returned an empty or invalid response.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="p-6 pt-0">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{ right: 16 }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="label"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              hide // Hide the y-axis labels
            />
            <XAxis type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="price"
              layout="vertical"
              fill="var(--color-wholesale)"
              radius={4}
            >
              <LabelList
                dataKey="label"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="price"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Harvestable month(s): {harvestableMonth || 'Loading...'}
        </div>
        <div className="leading-snug text-muted-foreground">
          Showing the wholesale and retail prices
        </div>
      </CardFooter>
    </Card>
  )
}
