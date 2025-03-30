"use client";

import * as React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartConfig = {
  humidity: {
    label: "Humidity",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function HumidityChart({ data }: { data: { time: string; value: number }[] }) {
  return (
    <CardContent>
      <ChartContainer config={chartConfig} className="p-0">
        <LineChart accessibilityLayer data={data} margin={{ left: 0, right: 0 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} minTickGap={32} />
          
          <ChartTooltip content={<ChartTooltipContent className="w-[175px]" nameKey="humidity" />} />
          <Line dataKey="value" type="monotone" stroke={`var(--color-humidity)`} strokeWidth={2} dot={false} />
        </LineChart>
      </ChartContainer>
    </CardContent>
  );
}
