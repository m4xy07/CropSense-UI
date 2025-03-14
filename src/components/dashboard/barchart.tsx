"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

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
} satisfies ChartConfig;

interface BarChartData {
  label: string;
  price: number;
}

interface BarChartComponentProps {
  cardTitle: string;
  data: {
    chartData: BarChartData[];
    harvestableMonth: string;
    bestCrop: string;
    recommendedFertilizer: string;
  };
}

export function BarChartComponent({ cardTitle, data }: BarChartComponentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="p-6 pt-0">
          <BarChart accessibilityLayer data={data.chartData} layout="vertical" margin={{ right: 16 }}>
            <CartesianGrid horizontal={false} />
            <YAxis dataKey="label" type="category" tickLine={false} tickMargin={10} axisLine={false} hide />
            <XAxis type="number" hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Bar dataKey="price" layout="vertical" fill="var(--color-wholesale)" radius={4}>
              <LabelList dataKey="label" position="insideLeft" offset={8} className="fill-[--color-label]" fontSize={12} />
              <LabelList dataKey="price" position="right" offset={8} className="fill-foreground" fontSize={12} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">Harvestable month(s): {data.harvestableMonth || "Loading..."}</div>
        <div className="text-[rgba(255,255,255,0.8)] text-sm mt-2">Best Crop: {data.bestCrop || "Loading..."}</div>
        <div className="text-[rgba(255,255,255,0.8)] text-sm">Recommended Fertilizer: {data.recommendedFertilizer || "Loading..."}</div>
      </CardFooter>
    </Card>
  );
}
