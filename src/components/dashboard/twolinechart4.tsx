"use client"

import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
    { fertilizer_usage: 0, actual: 0.0000, predicted: 0.0000 },
    { fertilizer_usage: 20, actual: 0.0025, predicted: 0.0026 },
    { fertilizer_usage: 40, actual: 0.0080, predicted: 0.0078 },  // 1st peak
    { fertilizer_usage: 60, actual: 0.0070, predicted: 0.0071 },
    { fertilizer_usage: 80, actual: 0.0120, predicted: 0.0110 },
    { fertilizer_usage: 90, actual: 0.0142, predicted: 0.0135 },  // 2nd peak
    { fertilizer_usage: 100, actual: 0.0125, predicted: 0.0128 },
    { fertilizer_usage: 120, actual: 0.0060, predicted: 0.0055 },
    { fertilizer_usage: 140, actual: 0.0015, predicted: 0.0018 },
    { fertilizer_usage: 160, actual: 0.0003, predicted: 0.0005 },
    { fertilizer_usage: 175, actual: 0.0000, predicted: 0.0000 },
  ];
  

const chartConfig = {
  accuracy1: {
    label: "ResNet-18",
    color: "hsl(var(--chart-1))",
  },
  accuracy2: {
    label: "EfficientNet-B0",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function TwoLineChart4Component() {
  return (
    <Card className="p-8 w-[580px] h-full equipment-card-inner border-zinc-50/10">
      <CardHeader>
        <CardTitle className="text-[20px] font-normal text-white">
          Random Forest Regression for Fertilizer Usage
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: -10 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="fertilizer_usage" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <CartesianGrid strokeDasharray="3 3" />
          <Line type="monotone" dataKey="actual" stroke="#FF0000" name="Actual" />
          <Line type="monotone" dataKey="predicted" stroke="#0000FF" name="Predicted" />
        </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
