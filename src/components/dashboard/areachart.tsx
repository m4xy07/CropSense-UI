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
import { SelectCrop } from "./cropselect"

export const description = "An area chart with gradient fill"

const cropChartData: Record<string, { data: { month: string; desktop: number }[]; threshold: number }> = {
  Wheat: {
    data: [
      { month: '', desktop: 43 },
      { month: '', desktop: 70 },
      { month: '', desktop: 60 },
      { month: '', desktop: 68 },
      { month: '', desktop: 80 },
      { month: '', desktop: 63 },
      { month: '', desktop: 85 },
      { month: '', desktop: 93 },
    ],
    threshold: 75,
  },
  Rice: {
    data: [
      { month: '', desktop: 60 },
      { month: '', desktop: 65 },
      { month: '', desktop: 70 },
      { month: '', desktop: 72 },
      { month: '', desktop: 68 },
      { month: '', desktop: 74 },
      { month: '', desktop: 77 },
      { month: '', desktop: 69 },
    ],
    threshold: 75,
  },
  Corn: {
    data: [
      { month: '', desktop: 80 },
      { month: '', desktop: 85 },
      { month: '', desktop: 90 },
      { month: '', desktop: 88 },
      { month: '', desktop: 92 },
      { month: '', desktop: 95 },
      { month: '', desktop: 97 },
      { month: '', desktop: 88 },
    ],
    threshold: 75,
  },
};

const chartConfig = {
  desktop: {
    label: "Crop Health",
    color: "#16a34a",
  },
} satisfies ChartConfig;

export function ChartAreaGradient() {
  const [crop, setCrop] = React.useState("Wheat");
  const cropData = cropChartData[crop] || cropChartData["Wheat"];
  const lastValue = cropData.data[cropData.data.length - 1].desktop;
  const belowThreshold = lastValue < cropData.threshold;
  const healthTextClass = lastValue < 80 ? "text-red-500" : "text-[#4ad476]";

  return (
    <Card className="equipment-card-inner border !p-0 border-zinc-50/10 rounded-xl flex flex-col w-[500px] h-[250px] overflow-hidden">
      <div className='flex flex-row justify-between px-5 py-4 border-b border-b-zinc-50/10 rounded-t-xl'>
        <h2 className='text-[18px] font-normal mt-1'>
          Crop Health
        </h2>
        <SelectCrop crop={crop} setCrop={setCrop} />
      </div>
      <CardContent>
        <div className="py-4 px-5 text-lg font-semibold flex flex-col gap-1 ">
          <p className="text-[14px] font-medium text-white">
            {crop}
          </p>
          <div className="flex flex-row justify-between items-center">
            <span>
              <span className={`leading-none ${healthTextClass}`}>
                {lastValue}%
              </span>
              &nbsp;healthy
            </span>
            <span className="flex flex-row gap-1 items-center">
              <span className={`text-[14px] font-medium ${belowThreshold ? 'text-red-500' : 'text-green-600'}`}>{belowThreshold ? `-${(cropData.threshold - lastValue).toFixed(1)}%` : `+${(lastValue - cropData.threshold).toFixed(1)}%`}</span>
              <span className="text-[14px] text-white/80 font-normal">
                since last week
              </span>
            </span>
          </div>
        </div>
        <ChartContainer config={chartConfig} className="px-5 w-full h-[100px]">
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
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={belowThreshold ? '#ef4444' : 'var(--color-desktop)'} stopOpacity={0.8} />
                <stop offset="95%" stopColor={belowThreshold ? '#ef4444' : 'var(--color-desktop)'} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              dataKey="desktop"
              type="monotone"
              fill="url(#fillDesktop)"
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
