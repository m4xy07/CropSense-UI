"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ReferenceLine } from "recharts"

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import React from "react"
import { SelectMoisture } from "./soilmoistureselect"

export const description = "An area chart with gradient fill"

const cropChartData: Record<string, { data: { month: string; desktop: number }[]; threshold: number }> = {
  "Plot 1": {
    data: [
      { month: 'Week 1', desktop: 91 },
      { month: 'Week 2', desktop: 92 },
      { month: 'Week 3', desktop: 93 },
      { month: 'Week 4', desktop: 94 },
      { month: 'Week 5', desktop: 93 },
      { month: 'Week 6', desktop: 92 },
      { month: 'Week 7', desktop: 93 },
      { month: 'Week 8', desktop: 94 },
    ],
    threshold: 90,
  },
  "Plot 2": {
    data: [
      { month: 'Week 1', desktop: 92 },
      { month: 'Week 2', desktop: 93 },
      { month: 'Week 3', desktop: 94 },
      { month: 'Week 4', desktop: 93 },
      { month: 'Week 5', desktop: 92 },
      { month: 'Week 6', desktop: 93 },
      { month: 'Week 7', desktop: 94 },
      { month: 'Week 8', desktop: 93 },
    ],
    threshold: 90,
  },
  "Plot 3": {
    data: [
      { month: 'Week 1', desktop: 81 },
      { month: 'Week 2', desktop: 60 },
      { month: 'Week 3', desktop: 55 },
      { month: 'Week 4', desktop: 71 },
      { month: 'Week 5', desktop: 50 },
      { month: 'Week 6', desktop: 43 },
      { month: 'Week 7', desktop: 40 },
      { month: 'Week 8', desktop: 35 },
    ],
    threshold: 90,
  },
};

const chartConfig = {
  desktop: {
    label: "Soil Moisture",
    color: "#16a34a",
  },
} satisfies ChartConfig;

export function SoilMoistureKPI() {
  const [plot, setPlot] = React.useState("Plot 1");
  const cropData = cropChartData[plot] || cropChartData["Plot 1"];
  const lastValue = cropData.data[cropData.data.length - 1].desktop;
  const belowThreshold = lastValue < cropData.threshold;
  const healthTextClass = lastValue < 80 ? "text-red-500" : "text-[#4ad476]";

  return (
    <Card className="equipment-card-inner border !p-0 border-zinc-50/10 rounded-xl flex flex-col w-1/3 h-[250px] overflow-hidden">
      <div className='flex flex-row justify-between px-5 py-4 border-b border-b-zinc-50/10 rounded-t-xl'>
        <h2 className='text-[18px] font-normal mt-1'>
          Soil Moisture
        </h2>
        <SelectMoisture plot={plot} setPlot={setPlot} />
      </div>
      <CardContent>
        <div className="py-4 px-5 text-lg font-semibold flex flex-col gap-1 ">
          <p className="text-[14px] font-medium text-white leading-none mt-1">
            {plot}
          </p>
          <div className="flex flex-row justify-between items-center">
            <span>
              <span className={`leading-none ${healthTextClass}`}>
                {lastValue}%
              </span>
              &nbsp;moist
            </span>
            <span className="flex flex-row gap-1 items-center">
              <span className={`text-[14px] font-medium ${belowThreshold ? 'text-red-500' : 'text-green-600'}`}>{belowThreshold ? `-${(cropData.threshold - lastValue).toFixed(1)}%` : `+${(lastValue - cropData.threshold).toFixed(1)}%`}</span>
              <span className="text-[14px] text-white/80 font-normal">
                since last week
              </span>
            </span>
          </div>
        </div>
        <ChartContainer config={chartConfig} className="px-5 w-full h-[110px]">
          <AreaChart
            data={cropData.data}
            margin={{ top: 10, right: 0, bottom: 0, left: 0 }}
          >
            <CartesianGrid vertical={false} horizontal={false} />
            <XAxis dataKey="month" tick={false} axisLine={false} />
            <YAxis domain={[Math.min(...cropData.data.map(d => d.desktop)) - 5, Math.max(...cropData.data.map(d => d.desktop)) + 5]} hide />
            <ReferenceLine
              y={cropData.threshold}
              stroke="#ef4444"
              strokeWidth={1}
            />
            <defs>
              <linearGradient id="fillMoisture" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={belowThreshold ? '#ef4444' : 'var(--color-desktop)'} stopOpacity={0.8} />
                <stop offset="95%" stopColor={belowThreshold ? '#ef4444' : 'var(--color-desktop)'} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              dataKey="desktop"
              type="monotone"
              fill="url(#fillMoisture)"
              fillOpacity={0.4}
              stroke={belowThreshold ? '#ef4444' : 'var(--color-desktop)'}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5 }}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter />
    </Card>
  );
}
