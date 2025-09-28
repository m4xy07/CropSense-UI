"use client";

import * as React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { formatChartTickLabel, formatChartTooltipLabel } from "@/lib/date-format";

const chartConfig = {
  heatIndex: {
    label: "Heat Index",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function HeatIndexChart({
  data,
  ticks,
  timeFrame,
}: {
  data: { time: string; value: number }[];
  ticks: string[];
  timeFrame: string;
}) {
  return (
    <CardContent>
      <ChartContainer config={chartConfig} className="p-0">
        <LineChart accessibilityLayer data={data} margin={{ left: 0, right: 0 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="time"
            tickFormatter={(time) => formatChartTickLabel(time as string, timeFrame)}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
            ticks={ticks} // Ensure ticks are applied here
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                className="w-[175px]"
                nameKey="heatIndex"
                labelFormatter={(time) => formatChartTooltipLabel(time as string, timeFrame)}
              />
            }
          />
          <Line dataKey="value" type="monotone" stroke={`var(--color-heatIndex)`} strokeWidth={2} dot={false} />
        </LineChart>
      </ChartContainer>
    </CardContent>
  );
}
