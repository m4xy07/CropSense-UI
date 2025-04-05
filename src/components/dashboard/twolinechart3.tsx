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
    { modal_price: 0, actual: 0.00000, predicted: 0.00000 },
    { modal_price: 1000, actual: 0.00010, predicted: 0.00011 },
    { modal_price: 2000, actual: 0.00020, predicted: 0.00021 },
    { modal_price: 3000, actual: 0.00026, predicted: 0.00025 }, // Peak
    { modal_price: 4000, actual: 0.00023, predicted: 0.00022 },
    { modal_price: 6000, actual: 0.00015, predicted: 0.00014 },
    { modal_price: 8000, actual: 0.00007, predicted: 0.00006 },
    { modal_price: 10000, actual: 0.00003, predicted: 0.00002 },
    { modal_price: 20000, actual: 0.000005, predicted: 0.000004 },
    { modal_price: 30000, actual: 0.000001, predicted: 0.000001 },
    { modal_price: 50000, actual: 0.000000, predicted: 0.000000 },
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

export function TwoLineChart3Component() {
  return (
    <Card className="p-8 w-full max-w-[580px] h-full">
      <CardHeader>
        <CardTitle className="text-[20px] font-normal text-white">
          Random Forest Regression for Modal Price
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
          <LineChart
  data={chartData}
  margin={{ top: 20, right: 20, left: 20, bottom: -10 }}
>
  <XAxis dataKey="modal_price" tick={{ fontSize: 12 }} />
  <YAxis tick={{ fontSize: 12 }} />
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
