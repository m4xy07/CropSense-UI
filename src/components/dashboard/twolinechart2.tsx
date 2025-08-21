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
    { max_price: 0, actual: 0.00000, predicted: 0.00000 },
    { max_price: 500, actual: 0.00008, predicted: 0.00009 },
    { max_price: 1000, actual: 0.00018, predicted: 0.00020 },
    { max_price: 1500, actual: 0.00025, predicted: 0.00023 }, // Peak
    { max_price: 2000, actual: 0.00020, predicted: 0.00021 },
    { max_price: 3000, actual: 0.00010, predicted: 0.00011 },
    { max_price: 5000, actual: 0.00005, predicted: 0.00006 },
    { max_price: 10000, actual: 0.00001, predicted: 0.000015 },
    { max_price: 20000, actual: 0.000003, predicted: 0.000004 },
    { max_price: 50000, actual: 0.000001, predicted: 0.000001 },
    { max_price: 100000, actual: 0.000000, predicted: 0.000000 },
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

export function TwoLineChart2Component() {
  return (
    <Card className="p-8 w-1/3 max-w-[600px] h-full equipment-card-inner border-zinc-50/10">
      <CardHeader>
        <CardTitle className="text-[20px] font-normal text-white">
          Random Forest Regression for Max Price
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: -10 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="max_price" tickLine={false} axisLine={false}  />
              <YAxis  tickLine={false} axisLine={false}/>
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
