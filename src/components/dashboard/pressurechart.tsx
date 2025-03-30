"use client";

import * as React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartConfig = {
  pressure: {
    label: "Pressure",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function PressureChart({
  data,
  ticks,
}: {
  data: { time: string; value: number }[];
  ticks: string[];
}) {
  return (
    <CardContent>
      <ChartContainer config={chartConfig} className="p-0">
        <LineChart accessibilityLayer data={data} margin={{ left: 0, right: 0 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="time"
            tickFormatter={(time) => new Date(time).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
            ticks={ticks} // Ensure ticks are applied here
          />
          <ChartTooltip content={<ChartTooltipContent className="w-[175px]" nameKey="pressure" />} />
          <Line dataKey="value" type="monotone" stroke={`var(--color-pressure)`} strokeWidth={2} dot={false} />
        </LineChart>
      </ChartContainer>
    </CardContent>
  );
}
